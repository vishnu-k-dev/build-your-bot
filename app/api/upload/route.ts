export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { chunkText } from '@/lib/chunker'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const type = formData.get('type') as string
  const botId = formData.get('botId') as string

  let name = ''
  let rawText = ''

  try {
    if (type === 'pdf') {
      const file = formData.get('file') as File
      name = file.name
      const buffer = Buffer.from(await file.arrayBuffer())
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse')
      const parsed = await pdfParse(buffer)
      rawText = parsed.text
    } else if (type === 'url') {
      const url = formData.get('url') as string
      name = url
      const res = await fetch(url)
      const html = await res.text()
      const { load } = await import('cheerio')
      const $ = load(html)
      $('script,style,nav,footer,header').remove()
      rawText = $('body').text().replace(/\s+/g, ' ').trim()
    } else if (type === 'faq') {
      name = formData.get('name') as string || 'FAQ'
      rawText = formData.get('text') as string
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    if (!rawText.trim()) return NextResponse.json({ error: 'No text extracted' }, { status: 400 })

    const chunks = chunkText(rawText)
    const { data, error } = await getAdmin()
      .from('sources')
      .insert({ name, type, raw_text: rawText, bot_id: botId || null })
      .select('id')
      .single()

    if (error) throw error
    return NextResponse.json({ sourceId: data.id, name, chunkCount: chunks.length })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Upload failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
