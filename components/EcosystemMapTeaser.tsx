import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/linkedin-session";

export default async function EcosystemMapTeaser({ compact = false, minHeight = "min-h-[600px]" }: { compact?: boolean; minHeight?: string }) {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? "";
  const secret = (process.env.AUTH_SECRET || "").trim();
  const isAuthenticated = !!(secret && token && verifySession(token, secret));
  return (
    <section className="w-full h-full">
      <div className={compact ? "" : "mx-auto max-w-6xl px-6"}>
        {compact ? null : (
          <header className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Interactive Ecosystem Web</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Map the financing flows, supply chain dependencies, and capital relationships across the digital
              infrastructure stack.
            </p>
          </header>
        )}

        <div
          className={`relative w-full h-full overflow-hidden rounded-2xl border border-slate-800/70 bg-[#070A12] shadow-[0_22px_70px_rgba(0,0,0,0.55)] ${
            compact ? minHeight : ""
          }`}
        >
          {/* Map iframe */}
          <div className="absolute inset-0">
            <iframe
              title="Interactive Ecosystem Web — preview"
              src="/dc-network-map.html?embed=1&showroom=1"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>


          {/* Height anchor (non-compact only) */}
          {compact ? null : <div className="h-[520px]" />}

          {/* Pinned bottom bar — does not obscure the map */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="pointer-events-auto flex w-full items-center justify-between gap-4 border-t border-slate-700/60 bg-slate-950/80 px-5 py-4 backdrop-blur-md sm:px-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60">
                  <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  {isAuthenticated ? (
                    <p className="text-[12px] font-semibold text-slate-100 leading-tight">Ecosystem Web · Interactive</p>
                  ) : (
                    <p className="text-[12px] font-semibold text-slate-100 leading-tight">Client Access Required</p>
                  )}
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                    {isAuthenticated
                      ? "You're authenticated — open the map to trace live capital flows."
                      : "Authenticate to trace live capital flows, map physical constraints, and access proprietary deal-level research."}
                  </p>
                </div>
              </div>
              {isAuthenticated ? (
                <Link
                  href="/dc-network-map.html"
                  className="shrink-0 rounded-md bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-blue-500"
                >
                  Explore the Ecosystem Web
                </Link>
              ) : (
                <Link
                  href="/login?returnTo=%2Fcoverage"
                  className="shrink-0 rounded-md bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-blue-500"
                >
                  Client Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

