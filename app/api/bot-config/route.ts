export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { buildSystemPrompt } from '@/lib/survey'

export async function POST(req: NextRequest) {
  const { businessName, botName, survey } = await req.json()
  if (!businessName || !botName) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const systemPrompt = buildSystemPrompt(businessName, botName, survey || {})

  const { data, error } = await getAdmin()
    .from('bot_config')
    .insert({ business_name: businessName, bot_name: botName, survey, system_prompt: systemPrompt })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ botId: data.id, systemPrompt })
}

export async function GET(req: NextRequest) {
  const botId = req.nextUrl.searchParams.get('botId')
  if (!botId) return NextResponse.json({ error: 'Missing botId' }, { status: 400 })

  const { data, error } = await getAdmin()
    .from('bot_config')
    .select('*')
    .eq('id', botId)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
