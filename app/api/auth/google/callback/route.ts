import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  GOOGLE_STATE_COOKIE,
  getCookieHeader,
  signSession,
  buildSetCookie,
} from "@/lib/linkedin-session";
import { logGoogleSignIn } from "@/lib/supabase-signin-log";
import { queryFromUrl, trimEnv, protoSecure } from "@/lib/oauth-query";
import { parseOAuthState } from "@/lib/oauth-return-state";
import { redirectToWorkbench } from "@/lib/workbench-redirect";
import { googleOAuthReady } from "@/lib/auth-oauth-config";
import { googleClientId, googleClientSecret, googleRedirectUri } from "@/lib/google-oauth-env";

export async function GET(request: NextRequest) {
  const clientId = googleClientId();
  const clientSecret = googleClientSecret();
  const redirectUri = googleRedirectUri(request.url);
  const authSecret = trimEnv(process.env.AUTH_SECRET);
  const secure = protoSecure(request);
  const clearState = buildSetCookie(GOOGLE_STATE_COOKIE, "", { maxAge: 0, secure });

  function withClear(redirect: NextResponse): NextResponse {
    redirect.headers.append("Set-Cookie", clearState);
    return redirect;
  }

  if (!googleOAuthReady()) {
    return withClear(redirectToWorkbench(request, { oauth_auth: "missing_config" }));
  }

  if (!redirectUri) {
    return withClear(redirectToWorkbench(request, { oauth_auth: "missing_config" }));
  }

  const q = queryFromUrl(request.url);

  if (q.error) {
    const msg = typeof q.error_description === "string" ? q.error_description : String(q.error);
    return withClear(redirectToWorkbench(request, { oauth_auth: "error", reason: msg.slice(0, 200) }));
  }

  const code = q.code;
  const stateParam = typeof q.state === "string" ? q.state : "";
  const { csrf, returnTo: returnFromState } = parseOAuthState(stateParam);
  const saved = getCookieHeader(request.headers.get("cookie"), GOOGLE_STATE_COOKIE);

  if (!code || !csrf || !saved || csrf !== saved) {
    return withClear(
      redirectToWorkbench(request, {
        oauth_auth: "error",
        reason:
          "Invalid OAuth state (cookie missing or mismatch). Use one canonical site URL, match GOOGLE_REDIRECT_URI in Google Cloud Console, or set SESSION_COOKIE_DOMAIN.",
      })
    );
  }

  let tokenRes: Response;
  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: String(code),
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });
    tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
  } catch {
    return withClear(redirectToWorkbench(request, { oauth_auth: "error", reason: "Token request failed" }));
  }

  const tokenText = await tokenRes.text();
  let tokenJson: Record<string, unknown>;
  try {
    tokenJson = JSON.parse(tokenText) as Record<string, unknown>;
  } catch {
    tokenJson = {};
  }

  if (!tokenRes.ok || !tokenJson.access_token) {
    const gErr =
      trimEnv(String(tokenJson.error_description || "")) ||
      trimEnv(String(tokenJson.error || "")) ||
      tokenText.replace(/\s+/g, " ").slice(0, 280).trim() ||
      "Token exchange failed";
    return withClear(redirectToWorkbench(request, { oauth_auth: "error", reason: gErr }));
  }

  let profile: Record<string, unknown> = {};
  let profileRes: Response | undefined;
  try {
    profileRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: "Bearer " + String(tokenJson.access_token) },
    });
    const profileText = await profileRes.text();
    try {
      profile = JSON.parse(profileText) as Record<string, unknown>;
    } catch {
      profile = {};
    }
  } catch {
    profile = {};
  }

  if (!profile.sub) {
    const detail =
      profileRes && !profileRes.ok ? "userinfo " + profileRes.status : "No sub in Google userinfo";
    return withClear(redirectToWorkbench(request, { oauth_auth: "error", reason: detail }));
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60 * 24 * 7;
  const payload = {
    sub: String(profile.sub),
    name: typeof profile.name === "string" ? profile.name : "",
    email: typeof profile.email === "string" ? profile.email : "",
    provider: "google",
    iat: now,
    exp: exp,
  };

  const fwdFor = trimEnv(request.headers.get("x-forwarded-for") || undefined);
  const clientIp = fwdFor ? fwdFor.split(",")[0].trim() : trimEnv(request.headers.get("x-real-ip") || undefined);
  await logGoogleSignIn({
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    userAgent: request.headers.get("user-agent") || "",
    ip: clientIp,
  });

  const sessionToken = signSession(payload, authSecret);
  const sessionCookie = buildSetCookie(SESSION_COOKIE, sessionToken, {
    maxAge: 60 * 60 * 24 * 7,
    secure: secure,
  });

  const res = redirectToWorkbench(request, { oauth_auth: "success" }, returnFromState);
  res.headers.append("Set-Cookie", clearState);
  res.headers.append("Set-Cookie", sessionCookie);
  return res;
}
