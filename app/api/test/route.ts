export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  const results: Record<string, string> = {}

  // Check env vars
  results.COHERE_API_KEY = process.env.COHERE_API_KEY ? '✅ set' : '❌ missing'
  results.GROQ_API_KEY = process.env.GROQ_API_KEY ? '✅ set' : '❌ missing'
  results.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ set' : '❌ missing'
  results.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ set' : '❌ missing'

  // Test Cohere embedding
  try {
    const { embed } = await import('@/lib/embedder')
    const vec = await embed('test')
    results.cohere_embed = `✅ works — ${vec.length} dims`
  } catch (e) {
    results.cohere_embed = `❌ ${e instanceof Error ? e.message : String(e)}`
  }

  // Test Supabase
  try {
    const { getAdmin } = await import('@/lib/supabase')
    const { data, error } = await getAdmin().from('bot_config').select('id').limit(1)
    results.supabase = error ? `❌ ${error.message}` : `✅ connected (${data?.length ?? 0} rows)`
  } catch (e) {
    results.supabase = `❌ ${e instanceof Error ? e.message : String(e)}`
  }

  return NextResponse.json(results)
}
