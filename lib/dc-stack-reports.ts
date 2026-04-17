import type { CoverageSector, PillarResearchFilter } from "@/lib/advisory-pillars";

/** Canonical parent name for breadcrumbs and hub links site-wide. */
export const DIGITAL_INFRASTRUCTURE_STACK = "Digital Infrastructure Stack";

export const STACK_HUB_PATH = "/research/dc-infrastructure" as const;

export type StackReportId = "worldview" | "physical-stack";

export type StackReportTier = "STRATEGY" | "ASSETS";

export type StackReport = {
  id: StackReportId;
  /** Single source of truth for the report name in UI. */
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tags: string[];
  /** Hub strategic card top-line prefix (strategic intelligence, not a layer filter). */
  pillarKey: string;
  region: "APAC";
  releaseMonthLong: "APRIL";
  releaseMonthShort: "APR";
  releaseYear: "2026";
  releaseYear2: "26";
  tier: StackReportTier;
  matchSectors: Exclude<CoverageSector, "ALL">[];
  sortRank: Partial<Record<Exclude<CoverageSector, "ALL">, number>>;
  defaultOrder: number;
  /** Layer filters this report appears under in the Research Library. */
  pillarResearchCategories: PillarResearchFilter[];
};

export const STACK_REPORTS: Record<StackReportId, StackReport> = {
  worldview: {
    id: "worldview",
    title: "The Worldview",
    subtitle: "Who Is Building the AI Cloud",
    description:
      "The APAC operator landscape: hyperscalers, Tier 1–4 colocation platforms, and the capital layer financing the buildout.",
    href: "/research/dc-infrastructure/worldview",
    tags: ["#APAC", "#OPERATORS", "#HYPERSCALE", "#COLOCATION"],
    pillarKey: "STRATEGY",
    region: "APAC",
    releaseMonthLong: "APRIL",
    releaseMonthShort: "APR",
    releaseYear: "2026",
    releaseYear2: "26",
    tier: "STRATEGY",
    matchSectors: ["communications", "real_assets", "power", "experience"],
    sortRank: { communications: 2, real_assets: 1, power: 2, experience: 1 },
    defaultOrder: 1,
    pillarResearchCategories: ["CONNECTIVITY", "REAL_ASSETS", "POWER", "EXPERIENCE"],
  },
  "physical-stack": {
    id: "physical-stack",
    title: "The Physical Stack",
    subtitle: "Where the Bottlenecks Are",
    description:
      "Six supply chain nodes — power, silicon, cooling, land, connectivity, construction — mapped by constraint status across APAC.",
    href: "/research/dc-infrastructure/physical-stack",
    tags: ["#LIQUID-COOLING", "#RUBIN-NVL72", "#HBM4", "#TSMC"],
    pillarKey: "STRATEGY",
    region: "APAC",
    releaseMonthLong: "APRIL",
    releaseMonthShort: "APR",
    releaseYear: "2026",
    releaseYear2: "26",
    tier: "ASSETS",
    matchSectors: ["communications", "real_assets", "power"],
    sortRank: { communications: 1, real_assets: 2, power: 1 },
    defaultOrder: 2,
    pillarResearchCategories: ["CONNECTIVITY", "REAL_ASSETS", "POWER", "EXPERIENCE"],
  },
};

/** Order used on hub and /research coverage sidebar. */
export const STACK_REPORT_LIST: StackReport[] = [STACK_REPORTS.worldview, STACK_REPORTS["physical-stack"]];

export function stackReportMainPillarLine(r: StackReport): string {
  return `${r.pillarKey} · ${r.region} · ${r.releaseMonthLong} ${r.releaseYear}`;
}

/** Latest Intelligence sidebar — date + region only (no pillar prefix). */
export function stackReportSidebarMetaLine(r: StackReport): string {
  return `${r.releaseMonthLong} ${r.releaseYear} · ${r.region}`;
}

export function getStackReport(id: StackReportId): StackReport {
  return STACK_REPORTS[id];
}
