"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdvisoryScopeCards from "@/components/AdvisoryScopeCards";
import DCInfrastructureLibrary, {
  type AssetDeepFilter,
  type LibraryModule,
} from "@/components/DCInfrastructureLibrary";
import {
  ADVISORY_TO_RESEARCH_FILTER,
  type AdvisoryPillarId,
  type PillarResearchFilter,
} from "@/lib/advisory-pillars";
import type { CoverageSector } from "@/lib/coverage-sector";

const FILTER_SET = new Set<PillarResearchFilter>(["CONNECTIVITY", "REAL_ASSETS", "POWER", "EXPERIENCE"]);

function parseLayerParam(raw: string | null): AssetDeepFilter | null {
  if (!raw) return null;
  const u = raw.trim().toUpperCase().replace(/-/g, "_");
  if (u === "ALL") return "ALL";
  if (FILTER_SET.has(u as PillarResearchFilter)) return u as PillarResearchFilter;
  return null;
}

function advisoryIdForFilter(f: PillarResearchFilter): AdvisoryPillarId | undefined {
  const found = Object.entries(ADVISORY_TO_RESEARCH_FILTER).find(([, v]) => v === f);
  return found?.[0] as AdvisoryPillarId | undefined;
}

export default function DcInfrastructureStackClient({
  strategicReports,
  assetDeepDives,
}: {
  strategicReports: LibraryModule[];
  assetDeepDives: LibraryModule[];
}) {
  const searchParams = useSearchParams();
  const [scopeSelected, setScopeSelected] = useState<CoverageSector>("ALL");
  const [deepFilter, setDeepFilter] = useState<AssetDeepFilter>("ALL");

  const scrollToDeepDives = useCallback(() => {
    requestAnimationFrame(() => {
      document.getElementById("asset-deep-dives")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  useEffect(() => {
    const layer = searchParams.get("layer");
    const parsed = parseLayerParam(layer);
    if (parsed === null) return;
    setDeepFilter(parsed);
    if (parsed === "ALL") {
      setScopeSelected("ALL");
    } else {
      const id = advisoryIdForFilter(parsed);
      if (id) setScopeSelected(id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#asset-deep-dives") return;
    const t = window.setTimeout(() => scrollToDeepDives(), 100);
    return () => window.clearTimeout(t);
  }, [searchParams, scrollToDeepDives]);

  function handlePillarClick(id: AdvisoryPillarId) {
    const next: CoverageSector = scopeSelected === id ? "ALL" : id;
    setScopeSelected(next);
    setDeepFilter(next === "ALL" ? "ALL" : ADVISORY_TO_RESEARCH_FILTER[id]);
    scrollToDeepDives();
  }

  function handleAssetFilterChange(f: AssetDeepFilter) {
    setDeepFilter(f);
    if (f === "ALL") {
      setScopeSelected("ALL");
    } else {
      const adv = advisoryIdForFilter(f);
      if (adv) setScopeSelected(adv);
    }
  }

  const advisoryScopeBlock = (
    <section className="mb-14 border-b border-slate-800/80 pb-12" aria-labelledby="advisory-scope-heading">
      <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/70">
        Advisory Scope
      </p>
      <h2 id="advisory-scope-heading" className="sr-only">
        Advisory scope pillars
      </h2>
      <AdvisoryScopeCards selected={scopeSelected} onPillarClick={handlePillarClick} />
    </section>
  );

  return (
    <DCInfrastructureLibrary
      strategicReports={strategicReports}
      assetDeepDives={assetDeepDives}
      assetDeepFilter={deepFilter}
      onAssetDeepFilterChange={handleAssetFilterChange}
      betweenHeaderAndStrategic={advisoryScopeBlock}
    />
  );
}
