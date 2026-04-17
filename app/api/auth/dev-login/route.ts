import { NextRequest, NextResponse } from "next/server";
import { signSession, buildSetCookie, SESSION_COOKIE } from "@/lib/linkedin-session";

// Dev-only shortcut: sets a real session cookie without going through OAuth.
// Only works when NODE_ENV === "development" AND AUTH_SECRET is set.
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const secret = (process.env.AUTH_SECRET || "").trim();
  if (!secret) {
    return new NextResponse(
      "AUTH_SECRET not set — start the dev server with AUTH_SECRET=test-local npm run dev",
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const action = url.searchParams.get("action") ?? "login";
  const returnTo = url.searchParams.get("returnTo") ?? "/research";

  if (action === "logout") {
    const clearCookie = buildSetCookie(SESSION_COOKIE, "", { maxAge: 0, secure: false });
    const res = NextResponse.redirect(new URL(returnTo, request.url));
    res.headers.append("Set-Cookie", clearCookie);
    return res;
  }

  // action === "login"
  const payload = {
    sub: "dev-user",
    name: "Dev User",
    email: "dev@localhost",
    provider: "dev",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 h
  };
  const token = signSession(payload, secret);
  const cookie = buildSetCookie(SESSION_COOKIE, token, { maxAge: 60 * 60 * 24, secure: false });
  const res = NextResponse.redirect(new URL(returnTo, request.url));
  res.headers.append("Set-Cookie", cookie);
  return res;
}
