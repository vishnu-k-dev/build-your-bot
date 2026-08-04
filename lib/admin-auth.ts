import { NextRequest } from 'next/server'

// Shared-secret gate for admin-only read endpoints. Client sends the password
// as the `x-admin-key` header; it must match ADMIN_PASSWORD (server-only env).
export function requireAdmin(req: NextRequest): boolean {
  const pw = process.env.ADMIN_PASSWORD
  return !!pw && req.headers.get('x-admin-key') === pw
}
