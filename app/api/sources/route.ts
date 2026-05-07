export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const botId = req.nextUrl.searchParams.get('botId')
  let query = getAdmin().from('sources').select('id, name, type, created_at').order('created_at', { ascending: false })
  if (botId) query = query.eq('bot_id', botId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const { error } = await getAdmin().from('sources').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
