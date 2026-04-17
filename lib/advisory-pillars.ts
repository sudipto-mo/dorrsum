/**
 * Canonical naming map: Advisory Scope cards ↔ Research Library filters ↔ card metadata.
 * Filter pill text must match `PILLAR_FILTER_LABEL` values exactly.
 */

export type AdvisoryPillarId = "communications" | "real_assets" | "power" | "experience";

export type CoverageSector = "ALL" | AdvisoryPillarId;

/** Filter pill + metadata line prefix (exact string, uppercase where noted). */
export const PILLAR_FILTER_LABEL: Record<AdvisoryPillarId, string> = {
  communications: "CONNECTIVITY",
  real_assets: "REAL ASSETS",
  power: "POWER",
  experience: "EXPERIENCE",
};

/** Primary H2 on each Advisory Scope card — vocabulary aligned to the filter label. */
export const ADVISORY_CARD_HEADING: Record<AdvisoryPillarId, string> = {
  communications: "Connectivity Infrastructure",
  real_assets: "Real Assets",
  power: "Power & Energy",
  experience: "Experience Layer (TMT)",
};

export const COVERAGE_SECTOR_LABEL: Record<CoverageSector, string> = {
  ALL: "Full catalog",
  communications: ADVISORY_CARD_HEADING.communications,
  real_assets: ADVISORY_CARD_HEADING.real_assets,
  power: ADVISORY_CARD_HEADING.power,
  experience: ADVISORY_CARD_HEADING.experience,
};

/** Research Library (/research/dc-infrastructure) asset filter ids — same strings as labels. */
export type PillarResearchFilter = "CONNECTIVITY" | "REAL_ASSETS" | "POWER" | "EXPERIENCE";

export const PILLAR_RESEARCH_FILTER_IDS: PillarResearchFilter[] = [
  "CONNECTIVITY",
  "REAL_ASSETS",
  "POWER",
  "EXPERIENCE",
];

export function researchFilterLabel(id: PillarResearchFilter): string {
  const map: Record<PillarResearchFilter, string> = {
    CONNECTIVITY: "CONNECTIVITY",
    REAL_ASSETS: "REAL ASSETS",
    POWER: "POWER",
    EXPERIENCE: "EXPERIENCE",
  };
  return map[id];
}

/** Map advisory card id → research filter id (for cross-linking data). */
export const ADVISORY_TO_RESEARCH_FILTER: Record<AdvisoryPillarId, PillarResearchFilter> = {
  communications: "CONNECTIVITY",
  real_assets: "REAL_ASSETS",
  power: "POWER",
  experience: "EXPERIENCE",
};
