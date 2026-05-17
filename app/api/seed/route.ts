export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { chunkText } from '@/lib/chunker'
import { embedBatch } from '@/lib/embedder'
import { KNOWLEDGE_BASE, COLLEGE_NAME, BOT_NAME, BOT_ID } from '@/data/college-knowledge-base'
import { buildSystemPrompt } from '@/lib/survey'

export async function POST() {
  try {
    const supabase = getAdmin()

    // Upsert bot config for WCT
    const survey = {
      industry: 'Education',
      business_type: 'College / University',
      primary_use: 'Student support, admissions, timetable and exam queries',
      tone: 'Professional and Friendly',
      language: 'English',
    }
    const systemPrompt = buildSystemPrompt(COLLEGE_NAME, BOT_NAME, survey)
    await supabase.from('bot_config').upsert({
      id: BOT_ID,
      business_name: COLLEGE_NAME,
      bot_name: BOT_NAME,
      survey,
      system_prompt: systemPrompt,
    })

    let totalChunks = 0
    const sourceIds: string[] = []

    for (const doc of KNOWLEDGE_BASE) {
      // Check if source already exists
      const { data: existing } = await supabase
        .from('sources')
        .select('id')
        .eq('name', doc.name)
        .eq('bot_id', BOT_ID)
        .single()

      let sourceId: string
      if (existing) {
        sourceId = existing.id
        // Delete old chunks
        await supabase.from('chunks').delete().eq('source_id', sourceId)
      } else {
        const { data: newSource, error } = await supabase
          .from('sources')
          .insert({ bot_id: BOT_ID, name: doc.name, type: 'faq', raw_text: doc.content })
          .select('id')
          .single()
        if (error || !newSource) throw new Error(`Failed to insert source: ${doc.name}`)
        sourceId = newSource.id
      }

      sourceIds.push(sourceId)

      const chunks = chunkText(doc.content)
      const BATCH = 10
      for (let i = 0; i < chunks.length; i += BATCH) {
        const batch = chunks.slice(i, i + BATCH)
        const embeddings = await embedBatch(batch)
        const rows = batch.map((content, j) => ({
          source_id: sourceId,
          content,
          embedding: embeddings[j],
          metadata: { source_name: doc.name, chunk_index: i + j },
        }))
        const { error } = await supabase.from('chunks').insert(rows)
        if (error) throw error
        totalChunks += batch.length
      }
    }

    return NextResponse.json({
      ok: true,
      botId: BOT_ID,
      sources: KNOWLEDGE_BASE.length,
      chunks: totalChunks,
      message: `WCT knowledge base seeded successfully with ${totalChunks} chunks across ${KNOWLEDGE_BASE.length} documents.`,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Seed failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
