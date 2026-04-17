"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DCInfrastructureLibrary, {
  type AssetDeepFilter,
  type LibraryModule,
} from "@/components/DCInfrastructureLibrary";
import type { PillarResearchFilter } from "@/lib/advisory-pillars";

const FILTER_SET = new Set<PillarResearchFilter>(["CONNECTIVITY", "REAL_ASSETS", "POWER", "EXPERIENCE"]);

function parseLayerParam(raw: string | null): AssetDeepFilter | null {
  if (!raw) return null;
  const u = raw.trim().toUpperCase().replace(/-/g, "_");
  if (u === "ALL") return "ALL";
  if (FILTER_SET.has(u as PillarResearchFilter)) return u as PillarResearchFilter;
  return null;
}

/**
 * Hub shell: syncs Asset Deep Dives filter from `?layer=` when arriving from /research,
 * and smooth-scrolls to `#asset-deep-dives` when the hash is present.
 */
export default function DcInfrastructureStackClient({
  strategicReports,
  assetDeepDives,
}: {
  strategicReports: LibraryModule[];
  assetDeepDives: LibraryModule[];
}) {
  const searchParams = useSearchParams();
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
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#asset-deep-dives") return;
    const t = window.setTimeout(() => scrollToDeepDives(), 100);
    return () => window.clearTimeout(t);
  }, [searchParams, scrollToDeepDives]);

  return (
    <DCInfrastructureLibrary
      strategicReports={strategicReports}
      assetDeepDives={assetDeepDives}
      assetDeepFilter={deepFilter}
      onAssetDeepFilterChange={setDeepFilter}
    />
  );
}
