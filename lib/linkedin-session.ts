/**
 * Signed session cookie for OAuth "full report" demo gate. Node crypto only.
 */

import crypto from "crypto";

export const SESSION_COOKIE = "pa_full_report";
/** CSRF state for LinkedIn authorization. */
export const STATE_COOKIE = "pa_linkedin_oauth_state";
/** CSRF state for Google authorization (separate cookie so both flows never clash). */
export const GOOGLE_STATE_COOKIE = "pa_google_oauth_state";

export function getCookieHeader(cookieHeader: string | null, name: string): string {
  const raw = cookieHeader;
  if (!raw) return "";
  const parts = raw.split(";");
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    const k = p.slice(0, idx).trim();
    const v = p.slice(idx + 1).trim();
    if (k === name) {
      try {
        return decodeURIComponent(v);
      } catch {
        return v;
      }
    }
  }
  return "";
}

export function signSession(payload: Record<string, unknown>, secret: string): string {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return data + "." + sig;
}

export function verifySession(token: string, secret: string): Record<string, unknown> | null {
  if (!token || typeof token !== "string") return null;
  const dot = token.indexOf(".");
  if (dot === -1) return null;
  const data = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as Record<string, unknown>;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export function buildSetCookie(name: string, value: string, opts: { maxAge?: number; secure?: boolean }): string {
  const enc = value === "" ? "" : encodeURIComponent(value);
  const parts = [`${name}=${enc}`, "Path=/", "HttpOnly", "SameSite=Lax"];
  if (opts.maxAge != null) parts.push("Max-Age=" + opts.maxAge);
  if (opts.secure) parts.push("Secure");
  const domain = (process.env.SESSION_COOKIE_DOMAIN || "").trim().replace(/^\./, "");
  if (domain && /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(domain)) {
    parts.push("Domain=" + domain);
  }
  return parts.join("; ");
}
