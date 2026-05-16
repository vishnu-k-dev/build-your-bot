export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { groq, CHAT_MODEL } from '@/lib/xai'
import { embed } from '@/lib/embedder'

const DEFAULT_PROMPT = `You are a helpful customer support assistant.
{context}
Keep answers short and clear. If no context is provided, let the user know they can add documents via the dashboard to train you on their business information.`

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

    let context = ''
    let sources: { name: string; snippet: string }[] = []

    try {
      const queryEmbedding = await embed(question)
      const { data: matches, error } = await getAdmin().rpc('match_chunks', {
        query_embedding: queryEmbedding,
        top_k: 3,
        p_bot_id: botId || null,
      })
      if (!error && matches?.length) {
        type Match = { content: string; source_name: string; similarity: number }
        context = (matches as Match[]).map((m, i) => `[${i + 1}] ${m.content}`).join('\n\n')
        sources = (matches as Match[]).map(m => ({ name: m.source_name, snippet: m.content.slice(0, 200) }))
      }
    } catch {
      // No knowledge base yet — answer from system prompt only
    }

    const contextBlock = context
      ? `Answer ONLY using the provided context below. If the answer is not in the context, say: "I couldn't find this in the provided information."\n\nCONTEXT:\n${context}`
      : ''
    const systemPrompt = systemPromptTemplate.replace('{context}', contextBlock)

    const completion = await groq.chat.completions.create({
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
