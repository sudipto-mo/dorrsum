import { trimEnv } from "@/lib/oauth-query";

/**
 * Google OAuth env resolution. This app uses custom routes (`/api/auth/google/*`), not Auth.js/NextAuth.
 * Accepts common Vercel / Auth.js-style aliases so production matches whatever names you configured.
 */

export function googleClientId(): string {
  return (
    trimEnv(process.env.GOOGLE_CLIENT_ID) ||
    trimEnv(process.env.AUTH_GOOGLE_ID) ||
    trimEnv(process.env.GOOGLE_ID) ||
    ""
  );
}

export function googleClientSecret(): string {
  return (
    trimEnv(process.env.GOOGLE_CLIENT_SECRET) ||
    trimEnv(process.env.AUTH_GOOGLE_SECRET) ||
    trimEnv(process.env.GOOGLE_SECRET) ||
    ""
  );
}

function joinOriginAndPath(siteBase: string, path: string): string {
  const base = siteBase.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : "/" + path;
  return base + p;
}

/**
 * Must match an entry under Google Cloud Console → OAuth client → Authorized redirect URIs exactly
 * (scheme, host, path; no trailing slash unless you registered one).
 *
 * Resolution order: GOOGLE_REDIRECT_URI → AUTH_URL / NEXTAUTH_URL / NEXT_PUBLIC_SITE_URL + path → derive from request URL.
 */
export function googleRedirectUri(requestUrl: string): string {
  const fromEnv = trimEnv(process.env.GOOGLE_REDIRECT_URI);
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const site =
    trimEnv(process.env.AUTH_URL) ||
    trimEnv(process.env.NEXTAUTH_URL) ||
    trimEnv(process.env.NEXT_PUBLIC_SITE_URL);
  if (site) {
    return joinOriginAndPath(site, "/api/auth/google/callback");
  }

  try {
    return new URL("/api/auth/google/callback", requestUrl).href.replace(/\/+$/, "");
  } catch {
    return "";
  }
}
