import { NextRequest, NextResponse } from "next/server";
import { getCookieHeader } from "@/lib/http-cookies";
import { POST_LOGIN_RETURN_COOKIE } from "@/lib/oauth-cookie-names";
import { formatClearReturnPathCookie, sanitizeReturnPath } from "@/lib/post-login-return";
import { protoSecure } from "@/lib/oauth-query";

/** Path to static credit draft (default `/credit-workbench`). Override with NEXT_PUBLIC_CREDIT_WORKBENCH_PATH */
export function creditWorkbenchPathname(): string {
  const p = (process.env.NEXT_PUBLIC_CREDIT_WORKBENCH_PATH || "/credit-workbench").trim() || "/credit-workbench";
  const noTrail = p.replace(/\/+$/, "");
  return noTrail.startsWith("/") ? noTrail : "/" + noTrail;
}

/**
 * Path users land on after OAuth completes (success / error / config flash via query).
 * Defaults to {@link creditWorkbenchPathname} (live workbench). Override with OAUTH_SUCCESS_REDIRECT.
 */
export function oauthSuccessRedirectPath(): string {
  const raw = (process.env.OAUTH_SUCCESS_REDIRECT || "").trim();
  if (raw) return raw.startsWith("/") ? raw : "/" + raw;
  return "/research";
}

/**
 * Redirect after OAuth flow with query params (e.g. oauth_auth=success).
 * Prefer `returnFromOAuthState` (from signed-in-flow OAuth `state`) over {@link POST_LOGIN_RETURN_COOKIE}.
 */
export function redirectToWorkbench(
  request: NextRequest,
  params: Record<string, string>,
  returnFromOAuthState?: string | null,
): NextResponse {
  const saved = getCookieHeader(request.headers.get("cookie"), POST_LOGIN_RETURN_COOKIE);
  const fromState = returnFromOAuthState ? sanitizeReturnPath(returnFromOAuthState) : null;
  const fromCookie = sanitizeReturnPath(saved);
  const path = fromState ?? fromCookie ?? oauthSuccessRedirectPath();
  const u = new URL(path, request.url);
  for (const [k, v] of Object.entries(params)) {
    u.searchParams.set(k, v);
  }
  const res = NextResponse.redirect(u);
  res.headers.append("Set-Cookie", formatClearReturnPathCookie(protoSecure(request)));
  return res;
}
