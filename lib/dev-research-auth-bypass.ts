/**
 * Local development without OAuth: allow DC research routes without a session.
 *
 * - In production this always returns false.
 * - In development: bypass if AUTH_SECRET is unset, or if DEV_UNLOCK_RESEARCH=1
 *   (use the latter when you have AUTH_SECRET set but still want open research locally).
 */
export function allowDcResearchWithoutAuthInDev(): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  if ((process.env.DEV_UNLOCK_RESEARCH || "").trim() === "1") return true;
  if (!(process.env.AUTH_SECRET || "").trim()) return true;
  return false;
}
