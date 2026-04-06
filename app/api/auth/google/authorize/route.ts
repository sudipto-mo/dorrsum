import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_STATE_COOKIE, buildSetCookie } from "@/lib/linkedin-session";
import { googleOAuthReady } from "@/lib/auth-oauth-config";
import { redirectToWorkbench } from "@/lib/workbench-redirect";
import { protoSecure } from "@/lib/oauth-query";
import { googleClientId, googleRedirectUri } from "@/lib/google-oauth-env";

export async function GET(request: NextRequest) {
  if (!googleOAuthReady()) {
    return redirectToWorkbench(request, { oauth_auth: "missing_config" });
  }

  const clientId = googleClientId();
  const redirectUri = googleRedirectUri(request.url);
  if (!redirectUri) {
    return redirectToWorkbench(request, { oauth_auth: "missing_config" });
  }

  const state = crypto.randomBytes(24).toString("hex");
  const secure = protoSecure(request);
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("access_type", "online");

  const res = NextResponse.redirect(authUrl.toString());
  res.headers.append("Set-Cookie", buildSetCookie(GOOGLE_STATE_COOKIE, state, { maxAge: 600, secure }));
  return res;
}
