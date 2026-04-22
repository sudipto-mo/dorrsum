import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function hostNoPort(host: string): string {
  return host.split(":")[0].toLowerCase();
}

/**
 * When `CANONICAL_HOST` (or `NEXT_PUBLIC_CANONICAL_HOST`) is set, redirect any
 * request on a different hostname to that host (308). Stops www / apex
 * (and other host mismatches) from breaking OAuth `state` cookies, which
 * are scoped to a single host unless `SESSION_COOKIE_DOMAIN` is set.
 *
 * Skips: localhost, 127.0.0.1, and `*.vercel.app` (so preview URLs keep working
 * when this env is only set in Production in Vercel).
 */
export function redirectIfCanonicalHostMismatch(request: NextRequest): NextResponse | null {
  const raw = (process.env.CANONICAL_HOST || process.env.NEXT_PUBLIC_CANONICAL_HOST || "").trim();
  if (!raw) return null;
  const canonical = hostNoPort(
    raw.replace(/^https?:\/\//, "").split("/")[0] || ""
  );
  if (!canonical) return null;
  const current = hostNoPort(request.headers.get("host") || "");
  if (!current || current === canonical) return null;
  if (current === "localhost" || current.startsWith("127.0.0.1")) return null;
  if (current.endsWith(".vercel.app")) return null;

  const u = new URL(request.url);
  u.hostname = canonical;
  u.port = "";
  u.protocol = "https:";
  return NextResponse.redirect(u, 308);
}
