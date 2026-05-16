export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { buildSystemPrompt } from '@/lib/survey'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, botName, survey } = body

    if (!businessName || !botName)
      return NextResponse.json({ error: 'Business name and bot name are required' }, { status: 400 })

    const systemPrompt = buildSystemPrompt(businessName, botName, survey || {})

    // Accept client-generated ID so the client doesn't need to parse the response
    const botId = body.botId || crypto.randomUUID()

    const { error } = await getAdmin()
      .from('bot_config')
      .insert({ id: botId, business_name: businessName, bot_name: botName, survey, system_prompt: systemPrompt })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ botId, ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Something went wrong'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const botId = req.nextUrl.searchParams.get('botId')
    if (!botId) return NextResponse.json({ error: 'Missing botId' }, { status: 400 })

    const { data, error } = await getAdmin()
      .from('bot_config')
      .select('*')
      .eq('id', botId)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Something went wrong'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
