import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null
let _admin: SupabaseClient | null = null

export function getClient(): SupabaseClient {
  if (!_client) _client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  return _client
}

export function getAdmin(): SupabaseClient {
  if (!_admin) _admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  return _admin
}

export const supabase = { from: (...a: Parameters<SupabaseClient['from']>) => getClient().from(...a), rpc: (...a: Parameters<SupabaseClient['rpc']>) => getClient().rpc(...a) }
export const supabaseAdmin = { from: (...a: Parameters<SupabaseClient['from']>) => getAdmin().from(...a), rpc: (...a: Parameters<SupabaseClient['rpc']>) => getAdmin().rpc(...a) }
