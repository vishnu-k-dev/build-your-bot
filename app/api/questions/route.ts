export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/supabase'
import { requireAdmin } from '@/lib/admin-auth'

// Admin-only: list logged questions (used for the accurate "Questions Asked" count)
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const botId = req.nextUrl.searchParams.get('botId')
    const query = getAdmin()
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (botId) query.eq('bot_id', botId)
    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed' }, { status: 500 })
  }
}
