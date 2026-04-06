import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, buildSetCookie } from "@/lib/linkedin-session";
import { protoSecure } from "@/lib/oauth-query";

export async function POST(request: NextRequest) {
  const secure = protoSecure(request);
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", buildSetCookie(SESSION_COOKIE, "", { maxAge: 0, secure }));
  return res;
}
