import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { redirectIfCanonicalHostMismatch } from "@/lib/canonical-host-redirect";
import { getCookieHeader } from "@/lib/http-cookies";
import { SESSION_COOKIE, POST_LOGIN_RETURN_COOKIE } from "@/lib/oauth-cookie-names";
import {
  formatClearReturnPathCookie,
  formatReturnPathCookie,
  sanitizeReturnPath,
} from "@/lib/post-login-return";
import { verifySessionEdge } from "@/lib/session-edge";
import { protoSecure } from "@/lib/oauth-query";

/**
 * Optional 308 to CANONICAL_HOST: same host for /login, OAuth, and session cookies.
 * @see {@link redirectIfCanonicalHostMismatch}
 *
 * On `/login` only: skip the login screen when the session cookie is already valid
 * (zero-click return). OAuth uses Next.js API routes + signed cookies, not Supabase.
 * Honors `returnTo` query and {@link POST_LOGIN_RETURN_COOKIE} for post-login destination.
 */
export async function middleware(request: NextRequest) {
  const toCanonical = redirectIfCanonicalHostMismatch(request);
  if (toCanonical) {
    return toCanonical;
  }

  const pathname = request.nextUrl.pathname;

  if (pathname !== "/login") {
    return NextResponse.next();
  }

  const secure = protoSecure(request);
  const returnToParam = request.nextUrl.searchParams.get("returnTo");
  const sanitizedQuery = sanitizeReturnPath(returnToParam);

  const secret = (process.env.AUTH_SECRET || "").trim();
  const token = getCookieHeader(request.headers.get("cookie"), SESSION_COOKIE);

  if (secret && token) {
    const session = await verifySessionEdge(token, secret);
    if (session) {
      const savedPath = getCookieHeader(request.headers.get("cookie"), POST_LOGIN_RETURN_COOKIE);
      const dest =
        sanitizedQuery ?? sanitizeReturnPath(savedPath) ?? "/research";
      const url = new URL(dest, request.url);
      const res = NextResponse.redirect(url);
      res.headers.append("Set-Cookie", formatClearReturnPathCookie(secure));
      return res;
    }
  }

  // Keep returnTo in the URL so the login page can pass it to OAuth authorize routes.
  // (Previously we stripped the query and relied only on a short-lived cookie.)
  if (sanitizedQuery) {
    const res = NextResponse.next();
    res.headers.append("Set-Cookie", formatReturnPathCookie(sanitizedQuery, secure, 86_400));
    return res;
  }

  return NextResponse.next();
}

/**
 * All non-static app routes: canonical host runs first, then /login session shortcut.
 * Preview (`*.vercel.app`) is left alone when `CANONICAL_HOST` is production-only in Vercel.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)"],
};
