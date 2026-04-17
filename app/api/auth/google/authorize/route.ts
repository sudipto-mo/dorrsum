import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_STATE_COOKIE, buildSetCookie } from "@/lib/linkedin-session";
import { POST_LOGIN_RETURN_COOKIE } from "@/lib/oauth-cookie-names";
import { googleOAuthReady } from "@/lib/auth-oauth-config";
import { redirectToWorkbench } from "@/lib/workbench-redirect";
import { protoSecure } from "@/lib/oauth-query";
import { googleClientId, googleRedirectUri } from "@/lib/google-oauth-env";
import { buildOAuthState } from "@/lib/oauth-return-state";
import { sanitizeReturnPath } from "@/lib/post-login-return";

export async function GET(request: NextRequest) {
  if (!googleOAuthReady()) {
    return redirectToWorkbench(request, { oauth_auth: "missing_config" });
  }

  const clientId = googleClientId();
  const redirectUri = googleRedirectUri(request.url);
  if (!redirectUri) {
    return redirectToWorkbench(request, { oauth_auth: "missing_config" });
  }

  const csrf = crypto.randomBytes(24).toString("hex");
  const returnTo = sanitizeReturnPath(request.nextUrl.searchParams.get("returnTo"));
  const state = buildOAuthState(csrf, returnTo);
  const secure = protoSecure(request);
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("access_type", "online");

  const res = NextResponse.redirect(authUrl.toString());
  res.headers.append("Set-Cookie", buildSetCookie(GOOGLE_STATE_COOKIE, csrf, { maxAge: 600, secure }));

  if (returnTo) {
    res.headers.append("Set-Cookie", buildSetCookie(POST_LOGIN_RETURN_COOKIE, returnTo, { maxAge: 900, secure }));
  }

  return res;
}
