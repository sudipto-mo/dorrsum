import Link from "next/link";
import { getSession } from "@/lib/get-session";

/**
 * Origination nav link — dev/staging only.
 * Hidden in production unless ENABLE_ORIGINATION=1 is set in Vercel env vars.
 */
export default async function NavOriginationLink() {
  const enabled =
    process.env.NODE_ENV === "development" ||
    process.env.ENABLE_ORIGINATION === "1";

  if (!enabled) return null;

  const isAuthenticated = await getSession();
  if (!isAuthenticated) return null;

  return (
    <Link
      href="/origination"
      className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium tracking-wide text-slate-400 transition-colors no-underline hover:bg-white/[0.04] hover:text-slate-100"
    >
      Origination
      {process.env.NODE_ENV === "development" && (
        <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/25">
          WIP
        </span>
      )}
    </Link>
  );
}
