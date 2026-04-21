"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PILLAR_RESEARCH_FILTER_IDS,
  type PillarResearchFilter,
  researchFilterLabel,
} from "@/lib/advisory-pillars";
import { DIGITAL_INFRASTRUCTURE_STACK } from "@/lib/dc-stack-reports";
import { paEditorialTitleResearchHub } from "@/lib/editorial-typography";

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

function strategicCardTopLine(mod: LibraryModule): string {
  return mod.pillarLineMain ?? `${mod.pillar} · ${mod.releaseMonth}`;
}

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
};

export default function DCInfrastructureLibrary({
  strategicReports,
  assetDeepDives,
  assetDeepFilter: controlledActive,
  onAssetDeepFilterChange,
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
      <header className="mb-10 border-b border-[color:var(--pa-border)] pb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8794]">
          <Link href="/research" className="no-underline text-[#7b8794] transition-colors hover:text-[var(--pa-navy)]">
            ← Research
          </Link>
          {" · "}
          <span className="text-[var(--pa-muted)]">{DIGITAL_INFRASTRUCTURE_STACK}</span>
        </p>
        <h1 className={`mb-3 ${paEditorialTitleResearchHub}`}>
          The {DIGITAL_INFRASTRUCTURE_STACK}
        </h1>
        <p className="text-base leading-[1.8] text-[var(--pa-muted)] sm:text-lg">
          APAC-focused research covering the full stack: supply chain constraints, operator landscape, and company-level
          credit analysis.
        </p>
      </header>

      {/* Pinned strategic intelligence — ignores filters */}
      <section className="mb-12" aria-labelledby="strategic-heading">
        <h2
          id="strategic-heading"
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b8794] uppercase"
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
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b8794] uppercase"
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
                className={`rounded-sm border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  isOn
                    ? "border-[#8da2b8] bg-white text-[var(--pa-navy)]"
                    : "border-[color:var(--pa-border)] bg-[#faf8f2] text-[var(--pa-muted)] hover:border-[#bcc4ce] hover:text-[var(--pa-text)]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {visibleAssetModules.length === 0 ? (
            <p className="rounded-sm border border-[color:var(--pa-border)] bg-white px-5 py-8 text-center text-sm leading-relaxed text-[var(--pa-muted)]">
              {assetDeepDives.length === 0 ? (
                <>
                  No layer-specific briefs are published yet. The stack-wide reports above are the current release;
                  tagged deep dives will appear here as they ship.
                </>
              ) : (
                <>
                  No asset notes match this filter. Try <strong className="text-[var(--pa-text)]">ALL</strong> or another
                  layer — or use Strategic intelligence above for cross-stack coverage.
                </>
              )}
            </p>
          ) : (
            visibleAssetModules.map((mod) => <AssetDeepCard key={mod.id} mod={mod} active={active} />)
          )}
        </div>
      </section>

      <div className="mt-10 rounded-sm border border-[color:var(--pa-border)] bg-white p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8794]">Coverage Region</p>
        <p className="text-sm leading-relaxed text-[var(--pa-muted)]">
          Current coverage is <strong className="text-[var(--pa-text)]">Asia-Pacific</strong>. For other regions,{" "}
          <Link href="/contact" className="text-[var(--pa-link)] hover:text-[var(--pa-link-hover)]">
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
        className="group block rounded-sm border border-[color:var(--pa-border)] bg-white p-6 transition-colors no-underline hover:border-[#bcc4ce] hover:bg-[#faf8f2]"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-[#7b8794]">
              {strategicCardTopLine(mod)}
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              <span className="mt-px rounded-sm border border-[#d8d3c8] bg-[#faf8f2] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a6d3b]">
                Featured
              </span>
              <span className="mt-px rounded-sm border border-[#d8d3c8] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#3f6b4f]">
                {mod.status}
              </span>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--pa-navy)] transition-colors group-hover:text-[var(--pa-navy-deep)]">
            {mod.title}: {mod.subtitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--pa-muted)]">{mod.description}</p>
          {mod.tags && mod.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {mod.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#7b8794]"
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
    <div className="block rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] p-6 opacity-70">
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-[#7b8794]">
            {strategicCardTopLine(mod)}
          </p>
          <span className="mt-px rounded-sm border border-[#d8d3c8] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a6d3b]">
            Featured
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--pa-muted)]">
          {mod.title}: {mod.subtitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--pa-muted)]">{mod.description}</p>
      </div>
    </div>
  );
}

function AssetDeepCard({ mod, active }: { mod: LibraryModule; active: AssetDeepFilter }) {
  if (mod.status === "Available") {
    return (
      <Link
        href={mod.href}
        className="group block rounded-sm border border-[color:var(--pa-border)] bg-white p-6 transition-colors no-underline hover:border-[#bcc4ce] hover:bg-[#faf8f2]"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-[#7b8794]">
              {assetCardMetadataLine(mod, active)}
            </p>
            <span className="mt-px shrink-0 rounded-sm border border-[#d8d3c8] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#3f6b4f]">
              {mod.status}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--pa-navy)] transition-colors group-hover:text-[var(--pa-navy-deep)]">
            {mod.title}
          </h3>
          <p className="mt-1 text-sm italic text-[#7b8794]">{mod.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--pa-muted)]">{mod.description}</p>
          {mod.tags && mod.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {mod.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#7b8794]"
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
    <div className="block rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] p-6 opacity-70">
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <p className="min-w-0 flex-1 pr-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-[#7b8794]">
            {assetCardMetadataLine(mod, active)}
          </p>
          <span className="mt-px shrink-0 rounded-sm border border-[color:var(--pa-border)] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#7b8794]">
            {mod.status}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--pa-muted)]">{mod.title}</h3>
        <p className="mt-1 text-sm italic text-[#7b8794]">{mod.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--pa-muted)]">{mod.description}</p>
      </div>
    </div>
  );
}
