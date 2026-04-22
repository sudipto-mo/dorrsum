import { trimEnv } from "@/lib/oauth-query";

function joinOriginAndPath(siteBase: string, path: string): string {
  const base = siteBase.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : "/" + path;
  return base + p;
}

/**
 * Must match an entry in LinkedIn Developer app → Auth → OAuth 2.0 → Authorized redirect URLs.
 *
 * Resolution order: LINKEDIN_REDIRECT_URI → AUTH_URL / NEXTAUTH_URL / NEXT_PUBLIC_SITE_URL + path → request URL
 * (same idea as {@link googleRedirectUri} so each Vercel deployment can use its own host when env is not pinned).
 */
export function linkedinRedirectUri(requestUrl: string): string {
  const fromEnv = trimEnv(process.env.LINKEDIN_REDIRECT_URI);
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const site =
    trimEnv(process.env.AUTH_URL) ||
    trimEnv(process.env.NEXTAUTH_URL) ||
    trimEnv(process.env.NEXT_PUBLIC_SITE_URL);
  if (site) {
    return joinOriginAndPath(site, "/api/auth/linkedin/callback");
  }

  try {
    return new URL("/api/auth/linkedin/callback", requestUrl).href.replace(/\/+$/, "");
  } catch {
    return "";
  }
}
