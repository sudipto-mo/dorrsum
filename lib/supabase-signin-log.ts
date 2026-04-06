import { getSupabaseServiceConfig } from "@/lib/supabase-admin";

type SignInRow = {
  sub: string;
  email?: string;
  name?: string;
  userAgent?: string;
  ip?: string;
};

export async function logLinkedInSignIn(row: SignInRow): Promise<void> {
  const cfg = getSupabaseServiceConfig();
  if (!cfg || !row.sub) return;

  const url = `${cfg.url}/rest/v1/linkedin_sign_ins`;
  const body = {
    linkedin_sub: String(row.sub).slice(0, 512),
    email: row.email ? String(row.email).slice(0, 512) : null,
    name: row.name ? String(row.name).slice(0, 512) : null,
    user_agent: row.userAgent ? String(row.userAgent).slice(0, 2000) : null,
    ip: row.ip ? String(row.ip).slice(0, 128) : null,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: cfg.key,
        Authorization: "Bearer " + cfg.key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const t = await res.text();
      console.warn("[linkedin_sign_ins]", res.status, t.slice(0, 300));
    } else {
      console.info("[linkedin_sign_ins] insert ok");
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("[linkedin_sign_ins]", msg);
  }
}
