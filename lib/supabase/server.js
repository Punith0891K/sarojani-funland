// SERVER-ONLY Supabase client (API routes / server code).
// Uses the secret key, which bypasses Row Level Security and has full access
// to the database. Never import this file from a 'use client' component and
// never expose SUPABASE_SECRET_KEY with a NEXT_PUBLIC_ prefix.
import { createClient } from '@supabase/supabase-js'

let admin = null

export function getSupabaseAdmin() {
  if (admin) return admin

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY

  if (!url || !key) {
    throw new Error('Supabase is not configured: set SUPABASE_URL and SUPABASE_SECRET_KEY')
  }

  admin = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return admin
}
