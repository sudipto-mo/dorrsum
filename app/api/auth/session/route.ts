import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, getCookieHeader, verifySession } from "@/lib/linkedin-session";
import {
  anyOAuthReady,
  authSecretMissingKeys,
  googleOAuthReady,
  linkedinOAuthReady,
  googleProviderMissingKeys,
  linkedinProviderMissingKeys,
} from "@/lib/auth-oauth-config";

export async function GET(request: NextRequest) {
  const secret = (process.env.AUTH_SECRET || "").trim();
  const token = getCookieHeader(request.headers.get("cookie"), SESSION_COOKIE);
  const session = secret ? verifySession(token, secret) : null;

  const hasAuthSecret = authSecretMissingKeys().length === 0;
  const linkedinConfigured = linkedinOAuthReady();
  const googleConfigured = googleOAuthReady();
  const configured = anyOAuthReady();

  const linkedinMissingKeys = hasAuthSecret ? linkedinProviderMissingKeys() : [...authSecretMissingKeys(), ...linkedinProviderMissingKeys()];
  const googleMissingKeys = hasAuthSecret ? googleProviderMissingKeys() : [...authSecretMissingKeys(), ...googleProviderMissingKeys()];

  if (!configured) {
    return NextResponse.json({
      configured: false,
      linkedinConfigured: false,
      googleConfigured: false,
      authenticated: false,
      linkedinMissingKeys,
      googleMissingKeys,
    });
  }

  if (!session) {
    return NextResponse.json({
      configured: true,
      linkedinConfigured,
      googleConfigured,
      authenticated: false,
      linkedinMissingKeys: linkedinConfigured ? [] : linkedinProviderMissingKeys(),
      googleMissingKeys: googleConfigured ? [] : googleProviderMissingKeys(),
    });
  }

  return NextResponse.json({
    configured: true,
    linkedinConfigured,
    googleConfigured,
    authenticated: true,
    name: (typeof session.name === "string" ? session.name : null) || null,
    email: (typeof session.email === "string" ? session.email : null) || null,
    linkedinMissingKeys: linkedinConfigured ? [] : linkedinProviderMissingKeys(),
    googleMissingKeys: googleConfigured ? [] : googleProviderMissingKeys(),
  });
}
