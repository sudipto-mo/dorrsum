import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { allowDcResearchWithoutAuthInDev } from "@/lib/dev-research-auth-bypass";
import { SESSION_COOKIE, verifySession } from "@/lib/linkedin-session";

export async function requireSession(returnTo: string) {
  if (allowDcResearchWithoutAuthInDev()) {
    return;
  }
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? "";
  const secret = (process.env.AUTH_SECRET || "").trim();
  if (!secret || !token || !verifySession(token, secret)) {
    redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
}
