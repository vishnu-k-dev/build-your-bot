export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { botId, question, answer, rating } = await req.json()
    if (!rating || !['up', 'down'].includes(rating))
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })

    const { error } = await getAdmin()
      .from('feedback')
      .insert({ bot_id: botId || null, question, answer, rating })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const botId = req.nextUrl.searchParams.get('botId')
    const query = getAdmin()
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (botId) query.eq('bot_id', botId)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed' }, { status: 500 })
  }
}
