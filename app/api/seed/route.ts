export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel Pro allows up to 60s; free tier allows 10s

import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { chunkText } from '@/lib/chunker'
import { embedBatch } from '@/lib/embedder'
import { KNOWLEDGE_BASE, COLLEGE_NAME, BOT_NAME, BOT_ID } from '@/data/college-knowledge-base'
import { buildSystemPrompt } from '@/lib/survey'

// POST /api/seed?doc=0  — seed one document at a time (index passed as query param)
// POST /api/seed        — seed just the bot config + return total doc count
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const docIndex = searchParams.get('doc')
    const supabase = getAdmin()

    // Step 0: upsert bot config
    const survey = {
      industry: 'Education',
      business_type: 'College / University',
      primary_use: 'Student support, admissions, timetable and exam queries',
      tone: 'Professional and Friendly',
      language: 'English',
    }
    const systemPrompt = buildSystemPrompt(COLLEGE_NAME, BOT_NAME, survey)
    const { error: cfgErr } = await supabase.from('bot_config').upsert({
      id: BOT_ID,
      business_name: COLLEGE_NAME,
      bot_name: BOT_NAME,
      survey,
      system_prompt: systemPrompt,
    })
    if (cfgErr) throw new Error(`bot_config upsert: ${cfgErr.message}`)

    // If no doc index, return total count so client can iterate
    if (docIndex === null) {
      return NextResponse.json({ total: KNOWLEDGE_BASE.length, botId: BOT_ID })
    }

    const idx = parseInt(docIndex)
    if (isNaN(idx) || idx < 0 || idx >= KNOWLEDGE_BASE.length)
      return NextResponse.json({ error: 'Invalid doc index' }, { status: 400 })

    const doc = KNOWLEDGE_BASE[idx]

    // Upsert source
    const { data: existing } = await supabase
      .from('sources').select('id').eq('name', doc.name).eq('bot_id', BOT_ID).single()

    let sourceId: string
    if (existing) {
      sourceId = existing.id
      await supabase.from('chunks').delete().eq('source_id', sourceId)
    } else {
      const { data: newSource, error } = await supabase
        .from('sources')
        .insert({ bot_id: BOT_ID, name: doc.name, type: 'faq', raw_text: doc.content })
        .select('id').single()
      if (error || !newSource) throw new Error(`Insert source failed: ${error?.message}`)
      sourceId = newSource.id
    }

    // Chunk + embed + insert
    const chunks = chunkText(doc.content)
    let inserted = 0
    const BATCH = 5
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
      if (error) throw new Error(`Chunk insert failed: ${error.message}`)
      inserted += batch.length
    }

    return NextResponse.json({
      ok: true,
      doc: doc.name,
      chunks: inserted,
      index: idx,
      total: KNOWLEDGE_BASE.length,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Seed failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
