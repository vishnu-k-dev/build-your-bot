export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { chunkText } from '@/lib/chunker'
import { embedBatch } from '@/lib/embedder'

export async function POST(req: NextRequest) {
  const { sourceId } = await req.json()

  if (!sourceId) return NextResponse.json({ error: 'Missing sourceId' }, { status: 400 })

  try {
    const { data: source, error: srcErr } = await getAdmin()
      .from('sources')
      .select('id, name, raw_text')
      .eq('id', sourceId)
      .single()

    if (srcErr || !source) throw new Error('Source not found')

    const chunks = chunkText(source.raw_text || '')
    if (!chunks.length) throw new Error('No content to train on')

    // Delete old chunks if retraining
    await getAdmin().from('chunks').delete().eq('source_id', sourceId)

    // Embed in batches of 10
    const BATCH = 10
    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH)
      const embeddings = await embedBatch(batch)
      const rows = batch.map((content, j) => ({
        source_id: sourceId,
        content,
        embedding: embeddings[j],
        metadata: { source_name: source.name, chunk_index: i + j },
      }))
      const { error } = await getAdmin().from('chunks').insert(rows)
      if (error) throw error
    }

    return NextResponse.json({ success: true, chunks: chunks.length })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Training failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
