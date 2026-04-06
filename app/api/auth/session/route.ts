import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, getCookieHeader, verifySession } from "@/lib/linkedin-session";

function linkedInEnvMissingKeys(): string[] {
  const missing: string[] = [];
  if (!(process.env.LINKEDIN_CLIENT_ID || "").trim()) missing.push("LINKEDIN_CLIENT_ID");
  if (!(process.env.LINKEDIN_CLIENT_SECRET || "").trim()) missing.push("LINKEDIN_CLIENT_SECRET");
  if (!(process.env.LINKEDIN_REDIRECT_URI || "").trim()) missing.push("LINKEDIN_REDIRECT_URI");
  if (!(process.env.AUTH_SECRET || "").trim()) missing.push("AUTH_SECRET");
  return missing;
}

export async function GET(request: NextRequest) {
  const secret = (process.env.AUTH_SECRET || "").trim();
  const linkedinMissingKeys = linkedInEnvMissingKeys();
  const linkedinConfigured = linkedinMissingKeys.length === 0;

  if (!linkedinConfigured) {
    return NextResponse.json({
      configured: false,
      linkedinConfigured: false,
      authenticated: false,
      linkedinMissingKeys,
    });
  }

  const token = getCookieHeader(request.headers.get("cookie"), SESSION_COOKIE);
  const session = verifySession(token, secret);

  if (!session) {
    return NextResponse.json({
      configured: true,
      linkedinConfigured: true,
      authenticated: false,
      linkedinMissingKeys: [],
    });
  }

  return NextResponse.json({
    configured: true,
    linkedinConfigured: true,
    authenticated: true,
    name: (typeof session.name === "string" ? session.name : null) || null,
    email: (typeof session.email === "string" ? session.email : null) || null,
    linkedinMissingKeys: [],
  });
}
