"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  PILLAR_RESEARCH_FILTER_IDS,
  type PillarResearchFilter,
  researchFilterLabel,
} from "@/lib/advisory-pillars";
import { DIGITAL_INFRASTRUCTURE_STACK } from "@/lib/dc-stack-reports";

export type AssetDeepFilter = "ALL" | PillarResearchFilter;

export type LibraryModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  status: "Available" | "Coming Soon";
  /** Hub strategic cards: full line STRATEGY · APAC · APRIL 2026 (single source from stack reports). */
  pillarLineMain?: string;
  /** Default metadata prefix when filter is ALL (e.g. STRATEGY or CONNECTIVITY) — must match filter label when layer-specific. */
  pillar: string;
  releaseMonth: string;
  /** Layer filters for asset notes (# tags override). */
  categories?: PillarResearchFilter[];
  tags?: string[];
};

const ASSET_FILTERS: { id: AssetDeepFilter; label: string }[] = [
  { id: "ALL", label: "ALL" },
  ...PILLAR_RESEARCH_FILTER_IDS.map((id) => ({ id, label: researchFilterLabel(id) })),
];

/** Map layer filter to hashtag on cards (uppercase for match). */
const FILTER_TO_TAG: Record<PillarResearchFilter, string> = {
  CONNECTIVITY: "#CONNECTIVITY",
  REAL_ASSETS: "#REAL-ASSETS",
  POWER: "#POWER",
  EXPERIENCE: "#EXPERIENCE",
};

function matchesAssetDeepFilter(mod: LibraryModule, active: AssetDeepFilter): boolean {
  if (active === "ALL") return true;
  const needle = FILTER_TO_TAG[active];
  if (needle && mod.tags?.some((t) => t.toUpperCase() === needle.toUpperCase())) return true;
  return mod.categories?.includes(active) ?? false;
}

/** Top line on asset cards: `{FILTER_LABEL} · {releaseMonth}` — label matches Research Library pills. */
function assetCardMetadataLine(mod: LibraryModule, active: AssetDeepFilter): string {
  if (active === "ALL") {
    return `${mod.pillar} · ${mod.releaseMonth}`;
  }
  return `${researchFilterLabel(active)} · ${mod.releaseMonth}`;
}

type Props = {
  strategicReports: LibraryModule[];
  assetDeepDives: LibraryModule[];
  /** Controlled asset filter (pill state). When both are set, internal state is ignored. */
  assetDeepFilter?: AssetDeepFilter;
  onAssetDeepFilterChange?: (filter: AssetDeepFilter) => void;
  /** Rendered after the page header, before Strategic Intelligence (e.g. Advisory Scope). */
  betweenHeaderAndStrategic?: ReactNode;
};

export default function DCInfrastructureLibrary({
  strategicReports,
  assetDeepDives,
  assetDeepFilter: controlledActive,
  onAssetDeepFilterChange,
  betweenHeaderAndStrategic,
}: Props) {
  const [uncontrolledActive, setUncontrolledActive] = useState<AssetDeepFilter>("ALL");
  const controlled =
    controlledActive !== undefined && onAssetDeepFilterChange !== undefined;
  const active = controlled ? controlledActive! : uncontrolledActive;
  const setActive = (next: AssetDeepFilter) => {
    if (controlled) onAssetDeepFilterChange!(next);
    else setUncontrolledActive(next);
  };

  const visibleAssetModules = useMemo(
    () => assetDeepDives.filter((m) => matchesAssetDeepFilter(m, active)),
    [assetDeepDives, active],
  );

  return (
    <>
      <header className="mb-10 border-b border-slate-800/80 pb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Link href="/research" className="no-underline text-slate-500 transition-colors hover:text-slate-400">
            ← Research
          </Link>
          {" · "}
          <span className="text-slate-500">Principal AI</span>
          {" · "}
          <span className="text-slate-400">{DIGITAL_INFRASTRUCTURE_STACK}</span>
        </p>
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          The {DIGITAL_INFRASTRUCTURE_STACK}
        </h1>
        <p className="text-base leading-relaxed text-slate-400">
          APAC-focused research covering the full stack: supply chain constraints, operator landscape, and company-level
          credit analysis.
        </p>
      </header>

      {betweenHeaderAndStrategic}

      {/* Pinned strategic intelligence — ignores filters */}
      <section className="mb-12" aria-labelledby="strategic-heading">
        <h2
          id="strategic-heading"
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 uppercase"
        >
          Strategic Intelligence
        </h2>
        <div className="space-y-4">
          {strategicReports.map((mod) => (
            <StrategicFeaturedCard key={mod.id} mod={mod} />
          ))}
        </div>
      </section>

      {/* Asset deep dives — filter controlled */}
      <section
        id="asset-deep-dives"
        className="scroll-mt-28 mb-10"
        aria-labelledby="asset-heading"
      >
        <h2
          id="asset-heading"
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 uppercase"
        >
          Asset Deep Dives
        </h2>

        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter asset deep dives by layer">
          {ASSET_FILTERS.map((f) => {
            const isOn = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isOn}
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  isOn
                    ? "border-blue-500/50 bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30"
                    : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {visibleAssetModules.length === 0 ? (
            <p className="rounded-xl border border-slate-800/80 bg-slate-950/30 px-5 py-8 text-center text-sm leading-relaxed text-slate-500">
              {assetDeepDives.length === 0 ? (
                <>
                  No layer-specific briefs are published yet. The stack-wide reports above are the current release;
                  tagged deep dives will appear here as they ship.
                </>
              ) : (
                <>
                  No asset notes match this filter. Try <strong className="text-slate-400">ALL</strong> or another
                  layer — or use Strategic intelligence above for cross-stack coverage.
                </>
              )}
            </p>
          ) : (
            visibleAssetModules.map((mod) => <AssetDeepCard key={mod.id} mod={mod} active={active} />)
          )}
        </div>
      </section>

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Coverage Region</p>
        <p className="text-sm leading-relaxed text-slate-400">
          Current coverage is <strong className="text-slate-300">Asia-Pacific</strong>. For other regions,{" "}
          <Link href="/contact" className="text-blue-400 hover:text-blue-300">
            contact us
          </Link>{" "}
          to register interest.
        </p>
      </div>
    </>
  );
}

function StrategicFeaturedCard({ mod }: { mod: LibraryModule }) {
  if (mod.status === "Available") {
    return (
      <Link
        href={mod.href}
        className="group block rounded-xl border border-amber-500/15 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 p-6 shadow-[0_0_0_1px_rgba(251,191,36,0.08)] ring-1 ring-inset ring-amber-500/10 transition-all no-underline hover:border-amber-500/25 hover:ring-amber-500/20"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-slate-100">
              {mod.pillarLineMain ?? `${mod.pillar} · ${mod.releaseMonth}`}
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              <span className="mt-px rounded-full border border-amber-400/35 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200/90">
                Featured
              </span>
              <span className="mt-px rounded-full border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-400">
                {mod.status}
              </span>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-white">
            {mod.title}
          </h3>
          <p className="mt-1 text-sm italic text-slate-500">{mod.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{mod.description}</p>
          {mod.tags && mod.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {mod.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-slate-800/80 bg-slate-950/50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <div className="block rounded-xl border border-slate-800/50 bg-slate-900/20 p-6 opacity-60">
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-slate-400">
            {mod.pillarLineMain ?? `${mod.pillar} · ${mod.releaseMonth}`}
          </p>
          <span className="mt-px rounded-full border border-amber-400/25 bg-amber-400/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200/70">
            Featured
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-500">{mod.title}</h3>
        <p className="mt-1 text-sm italic text-slate-600">{mod.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{mod.description}</p>
      </div>
    </div>
  );
}

function AssetDeepCard({ mod, active }: { mod: LibraryModule; active: AssetDeepFilter }) {
  if (mod.status === "Available") {
    return (
      <Link
        href={mod.href}
        className="group block rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-all no-underline hover:border-slate-700 hover:bg-slate-900/60"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-slate-100">
              {assetCardMetadataLine(mod, active)}
            </p>
            <span className="mt-px shrink-0 rounded-full border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-400">
              {mod.status}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-white">
            {mod.title}
          </h3>
          <p className="mt-1 text-sm italic text-slate-500">{mod.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{mod.description}</p>
          {mod.tags && mod.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {mod.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-slate-800/80 bg-slate-950/50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <div className="block rounded-xl border border-slate-800/50 bg-slate-900/20 p-6 opacity-60">
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-slate-400">
            {assetCardMetadataLine(mod, active)}
          </p>
          <span className="mt-px shrink-0 rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {mod.status}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-500">{mod.title}</h3>
        <p className="mt-1 text-sm italic text-slate-600">{mod.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{mod.description}</p>
      </div>
    </div>
  );
}
