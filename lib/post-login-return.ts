import { POST_LOGIN_RETURN_COOKIE } from "@/lib/oauth-cookie-names";

/**
 * Same-origin path only — blocks open redirects and odd characters.
 * Allows static files like `/dc-network-map.html`.
 */
export function sanitizeReturnPath(raw: string | null | undefined): string | null {
  if (raw == null || typeof raw !== "string") return null;
  const t = raw.trim();
  if (!t.startsWith("/")) return null;
  if (t.startsWith("//")) return null;
  if (t.includes("..")) return null;
  if (t.length > 512) return null;
  if (t.includes("?") || t.includes("#")) return null;
  if (!/^[/a-zA-Z0-9._-]+$/.test(t)) return null;
  return t;
}

/** Edge-safe Set-Cookie line (no Node crypto). */
export function formatReturnPathCookie(value: string, secure: boolean, maxAgeSec: number): string {
  const enc = encodeURIComponent(value);
  const parts = [`${POST_LOGIN_RETURN_COOKIE}=${enc}`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=" + maxAgeSec];
  if (secure) parts.push("Secure");
  const domain = (process.env.SESSION_COOKIE_DOMAIN || "").trim().replace(/^\./, "");
  if (domain && /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(domain)) {
    parts.push("Domain=" + domain);
  }
  return parts.join("; ");
}

export function formatClearReturnPathCookie(secure: boolean): string {
  const parts = [`${POST_LOGIN_RETURN_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (secure) parts.push("Secure");
  const domain = (process.env.SESSION_COOKIE_DOMAIN || "").trim().replace(/^\./, "");
  if (domain && /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(domain)) {
    parts.push("Domain=" + domain);
  }
  return parts.join("; ");
}
