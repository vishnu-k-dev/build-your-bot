export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { xai, CHAT_MODEL } from '@/lib/xai'
import { embed } from '@/lib/embedder'

const DEFAULT_PROMPT = `You are a helpful customer support assistant.
Answer ONLY using the provided context. If the answer is not in the context, say: "I couldn't find this in the provided information."
Keep answers short and clear.

CONTEXT FROM KNOWLEDGE BASE:
{context}`

export async function POST(req: NextRequest) {
  const { question, botId } = await req.json()
  if (!question) return NextResponse.json({ error: 'Missing question' }, { status: 400 })

  try {
    // Load bot config if botId provided
    let systemPromptTemplate = DEFAULT_PROMPT
    if (botId) {
      const { data: config } = await getAdmin()
        .from('bot_config')
        .select('system_prompt')
        .eq('id', botId)
        .single()
      if (config?.system_prompt) systemPromptTemplate = config.system_prompt
    }

    const queryEmbedding = await embed(question)
    const { data: matches, error } = await getAdmin().rpc('match_chunks', {
      query_embedding: queryEmbedding,
      top_k: 3,
      p_bot_id: botId || null,
    })

    if (error) throw error

    type Match = { content: string; source_name: string; similarity: number }
    const context = (matches as Match[]).map((m, i) => `[${i + 1}] ${m.content}`).join('\n\n')
    const sources = (matches as Match[]).map(m => ({ name: m.source_name, snippet: m.content.slice(0, 200) }))

    const systemPrompt = systemPromptTemplate.replace('{context}', context)

    const completion = await xai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      max_tokens: 512,
    })

    const answer = completion.choices[0].message.content || ''
    return NextResponse.json({ answer, sources })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Chat failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
