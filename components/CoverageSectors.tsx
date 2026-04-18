"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AdvisoryScopeCards from "@/components/AdvisoryScopeCards";
import ResearchVault from "@/components/ResearchVault";
import { ADVISORY_TO_RESEARCH_FILTER } from "@/lib/advisory-pillars";

export default function CoverageSectors({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const router = useRouter();

  return (
    <div className="w-full">
      <header className="max-w-6xl border-b border-slate-800 pb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-white m-0 sm:text-4xl md:text-5xl">
          TMT &amp; Digital Infrastructure Research
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          Sector intelligence across the convergence of Connectivity, Real Assets, and Power.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {isAuthenticated && (
            <Link
              href="/dc-network-map.html"
              className="inline-flex items-center justify-center rounded-lg bg-[#3b82f6] px-4 py-2.5 text-[13px] font-semibold text-white no-underline shadow-[0_0_14px_rgba(59,130,246,0.20)] transition-all hover:bg-[#60a5fa] hover:shadow-[0_0_22px_rgba(96,165,250,0.45)]"
            >
              Explore the Ecosystem Web
            </Link>
          )}
          <Link
            href="/research/dc-infrastructure"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2.5 text-[13px] font-semibold text-slate-200 no-underline transition-colors hover:border-slate-600 hover:bg-slate-900/60"
          >
            Explore the Digital Stack →
          </Link>
        </div>
      </header>

      {/* Master–detail split */}
      <div className="mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: taxonomy master */}
        <section className="col-span-1 lg:col-span-8">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/70">
            Advisory Scope
          </p>
          <AdvisoryScopeCards
            selected="ALL"
            onPillarClick={(id) =>
              router.push(`/research/dc-infrastructure?layer=${ADVISORY_TO_RESEARCH_FILTER[id]}#asset-deep-dives`)
            }
          />

          <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/30 px-5 py-4">
            <p className="text-sm text-slate-400">
              Have a deal to assess or a project to structure?
            </p>
            <Link
              href="/advisory"
              className="shrink-0 rounded-md border border-slate-700 bg-slate-900/60 px-4 py-2 text-[12px] font-semibold text-slate-200 no-underline transition-colors hover:border-slate-600 hover:bg-slate-800/60"
            >
              View Advisory Services →
            </Link>
          </div>
        </section>

        {/* Right: Research & Advisory Vault — sticky */}
        <aside className="col-span-1 lg:col-span-4">
          <div className="sticky top-16">
            <ResearchVault />
          </div>
        </aside>
      </div>
    </div>
  );
}
