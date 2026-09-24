// BROWSER Supabase client. Uses the publishable key, which is safe to expose:
// it is limited by Row Level Security (the tables in supabase/schema.sql have
// RLS enabled with no public policies, so this key cannot read or write them).
import { createClient } from '@supabase/supabase-js'

let browser = null

export function getSupabaseBrowser() {
  if (browser) return browser

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    throw new Error('Supabase is not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY')
  }

  browser = createClient(url, key)
  return browser
}
