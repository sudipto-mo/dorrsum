import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/linkedin-session";
import { allowDcResearchWithoutAuthInDev } from "@/lib/dev-research-auth-bypass";

export type VerifiedSessionUser = {
  sub: string;
  name: string;
  email: string;
  provider?: string;
};

/**
 * Returns true if the current request has a valid session.
 * Never redirects — use this when you want to conditionally show content
 * rather than hard-gating a page.
 */
export async function getSession(): Promise<boolean> {
  if (allowDcResearchWithoutAuthInDev()) return true;
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? "";
  const secret = (process.env.AUTH_SECRET || "").trim();
  if (!secret || !token) return false;
  return verifySession(token, secret) != null;
}

/**
 * Verified OAuth session from the signed cookie (ignores dev “unlock” shortcuts that have no cookie).
 * Use for UI that needs identity (e.g. navbar initials).
 */
export async function getVerifiedSessionPayload(): Promise<VerifiedSessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? "";
  const secret = (process.env.AUTH_SECRET || "").trim();
  if (!secret || !token) return null;
  const raw = verifySession(token, secret);
  if (!raw) return null;
  const sub = typeof raw.sub === "string" ? raw.sub : "";
  if (!sub) return null;
  return {
    sub,
    name: typeof raw.name === "string" ? raw.name : "",
    email: typeof raw.email === "string" ? raw.email : "",
    provider: typeof raw.provider === "string" ? raw.provider : undefined,
  };
}
