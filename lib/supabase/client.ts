import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  // Next.js inlines NEXT_PUBLIC_* vars via static replacement, so both names
  // must be referenced literally here (not through a shared dynamic lookup)
  // to end up in the browser bundle. See lib/supabase/env.ts for why there
  // are two names — Supabase now calls this the "publishable key".
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, anonKey);
}
