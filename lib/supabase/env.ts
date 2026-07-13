import "server-only";

// Supabase's dashboard has shifted from calling this the "anon key" to the
// "publishable key" (newer projects issue sb_publishable_... keys instead of
// a legacy anon JWT) — accept either env var name so setup isn't blocked by
// which label a given project shows.
function firstDefined(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
}

const ANON_KEY_VARS = [
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];

export function hasSupabaseConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && firstDefined(...ANON_KEY_VARS),
  );
}

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Add it to .env.local — see .env.example.",
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key = firstDefined(...ANON_KEY_VARS);
  if (!key) {
    throw new Error(
      "Supabase anon/publishable key is not set. Add NEXT_PUBLIC_SUPABASE_ANON_KEY " +
        "(or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, the label newer Supabase projects use) " +
        "to .env.local — see .env.example.",
    );
  }
  return key;
}
