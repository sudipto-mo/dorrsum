import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookieHeader } from "@/lib/http-cookies";
import { SESSION_COOKIE, POST_LOGIN_RETURN_COOKIE } from "@/lib/oauth-cookie-names";
import {
  formatClearReturnPathCookie,
  formatReturnPathCookie,
  sanitizeReturnPath,
} from "@/lib/post-login-return";
import { verifySessionEdge } from "@/lib/session-edge";
import { creditWorkbenchPathname } from "@/lib/workbench-redirect";
import { allowDcResearchWithoutAuthInDev } from "@/lib/dev-research-auth-bypass";
import { protoSecure } from "@/lib/oauth-query";

/**
 * Skip the login screen when the session cookie is already valid (zero-click return).
 * OAuth uses Next.js API routes + signed cookies, not Supabase Auth.
 * Honors `returnTo` query and {@link POST_LOGIN_RETURN_COOKIE} for post-login destination.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Gate the full map — but let the teaser iframe (showroom mode) and dev bypass through.
  if (pathname === "/dc-network-map.html") {
    const isShowroom = request.nextUrl.searchParams.get("showroom") === "1";
    if (!isShowroom && !allowDcResearchWithoutAuthInDev()) {
      const secret = (process.env.AUTH_SECRET || "").trim();
      const token = getCookieHeader(request.headers.get("cookie"), SESSION_COOKIE);
      const session = secret && token ? await verifySessionEdge(token, secret) : null;
      if (!session) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("returnTo", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
    return NextResponse.next();
  }

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

export const config = {
  matcher: ["/login", "/dc-network-map.html"],
};
