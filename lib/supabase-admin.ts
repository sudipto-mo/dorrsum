/**
 * Server-only Supabase REST helpers using the service role key.
 * Matches the pattern in `lib/supabase-signin-log.ts` (no @supabase/supabase-js dependency).
 */

function trimEnv(s: string | undefined): string {
  return typeof s === "string" ? s.trim() : "";
}

export function normalizeSupabaseBaseUrl(raw: string | undefined): string {
  let s = trimEnv(raw);
  if (!s) return "";
  s = s.replace(/\/+$/, "");
  if (/^https?:\/\//i.test(s)) return s;
  s = s.replace(/^\/+/, "");
  if (s.includes(".")) return `https://${s}`;
  if (/^[a-z0-9_-]+$/i.test(s)) return `https://${s}.supabase.co`;
  return s;
}

export function getSupabaseServiceConfig(): { url: string; key: string } | null {
  const url = normalizeSupabaseBaseUrl(process.env.SUPABASE_URL);
  const key = trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) return null;
  return { url, key };
}
