import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { STATE_COOKIE, buildSetCookie } from "@/lib/linkedin-session";
import { linkedinOAuthReady } from "@/lib/auth-oauth-config";
import { redirectToWorkbench } from "@/lib/workbench-redirect";
import { trimEnv, protoSecure } from "@/lib/oauth-query";

export async function GET(request: NextRequest) {
  if (!linkedinOAuthReady()) {
    return redirectToWorkbench(request, { oauth_auth: "missing_config" });
  }

  const clientId = trimEnv(process.env.LINKEDIN_CLIENT_ID);
  const redirectUri = trimEnv(process.env.LINKEDIN_REDIRECT_URI);

  const state = crypto.randomBytes(24).toString("hex");
  const secure = protoSecure(request);
  const liUrl = new URL("https://www.linkedin.com/oauth/v2/authorization");
  liUrl.searchParams.set("response_type", "code");
  liUrl.searchParams.set("client_id", clientId);
  liUrl.searchParams.set("redirect_uri", redirectUri);
  liUrl.searchParams.set("state", state);
  liUrl.searchParams.set("scope", "openid profile email");

  const res = NextResponse.redirect(liUrl.toString());
  res.headers.append("Set-Cookie", buildSetCookie(STATE_COOKIE, state, { maxAge: 600, secure }));
  return res;
}
