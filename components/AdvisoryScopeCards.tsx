"use client";

import { ADVISORY_CARD_HEADING, type AdvisoryPillarId } from "@/lib/advisory-pillars";
import type { CoverageSector } from "@/lib/coverage-sector";

function TerminalLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8794]">
      {children}
    </span>
  );
}

export type AdvisoryScopeCardsProps = {
  /** When set, the matching card shows selected styling (dim others if not ALL). */
  selected?: CoverageSector;
  /** Called when a pillar card is activated (parent handles toggle, navigation, or deep-dive sync). */
  onPillarClick: (id: AdvisoryPillarId) => void;
};

export default function AdvisoryScopeCards({ selected = "ALL", onPillarClick }: AdvisoryScopeCardsProps) {
  const cardBase =
    "relative cursor-pointer select-none overflow-hidden rounded-sm border p-6 transition-colors duration-200";

  function cardClass(sector: AdvisoryPillarId) {
    const isActive = selected === sector;
    const isDimmed = selected !== "ALL" && !isActive;
    return [
      cardBase,
      isActive
        ? "border-[#8da2b8] bg-white"
        : "border-[color:var(--pa-border)] bg-white hover:border-[#bcc4ce]",
      isDimmed ? "opacity-40" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <div className="flex flex-col gap-6">
      <article
        className={cardClass("communications")}
        aria-labelledby="pillar-digital-networks"
        onClick={() => onPillarClick("communications")}
        aria-pressed={selected === "communications"}
      >
        <TerminalLabel>The Demand &amp; Plumbing</TerminalLabel>
        <h2
          id="pillar-digital-networks"
          className={`mt-3 text-lg font-semibold tracking-tight transition-colors ${selected === "communications" ? "text-[var(--pa-navy)]" : "text-[var(--pa-text)]"}`}
        >
          {ADVISORY_CARD_HEADING.communications}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-4 py-3.5">
            <TerminalLabel>Asset Focus</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
              Fiber-to-the-X (FTTX), Subsea cables, Edge compute, hyperscale transit.
            </p>
          </div>
          <div className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-4 py-3.5">
            <TerminalLabel>Structuring Levers</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
              IRU contract securitization, sovereign routing arbitrage, and capacity yield optimization.
            </p>
          </div>
        </div>
      </article>

      <article
        className={cardClass("real_assets")}
        aria-labelledby="pillar-digital-real-estate"
        onClick={() => onPillarClick("real_assets")}
        aria-pressed={selected === "real_assets"}
      >
        <TerminalLabel>The Physical &amp; Active Shell</TerminalLabel>
        <h2
          id="pillar-digital-real-estate"
          className={`mt-3 text-lg font-semibold tracking-tight transition-colors ${selected === "real_assets" ? "text-[var(--pa-navy)]" : "text-[var(--pa-text)]"}`}
        >
          {ADVISORY_CARD_HEADING.real_assets}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-4 py-3.5">
            <TerminalLabel>Asset Focus</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
              Hyperscale colocation, AI Silicon (GPUs/ASICs), TowerCos, and liquid-cooling infrastructure.
            </p>
          </div>
          <div className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-4 py-3.5">
            <TerminalLabel>Structuring Levers</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
              Master Lease Agreement (MLA) bankability, asset lifecycle management, and thermal retrofit premiums.
            </p>
          </div>
        </div>
      </article>

      <article
        className={cardClass("power")}
        aria-labelledby="pillar-power-energy"
        onClick={() => onPillarClick("power")}
        aria-pressed={selected === "power"}
      >
        <TerminalLabel>The Bottleneck</TerminalLabel>
        <h2
          id="pillar-power-energy"
          className={`mt-3 text-lg font-semibold tracking-tight transition-colors ${selected === "power" ? "text-[var(--pa-navy)]" : "text-[var(--pa-text)]"}`}
        >
          {ADVISORY_CARD_HEADING.power}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-4 py-3.5">
            <TerminalLabel>Asset Focus</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
              Grid capacity, behind-the-meter renewables, AI liquid-cooling retrofits.
            </p>
          </div>
          <div className="rounded-sm border border-[color:var(--pa-border)] bg-[#faf8f2] px-4 py-3.5">
            <TerminalLabel>Structuring Levers</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
              PUE efficiency arbitrage, LCOE impact modeling, and transition-finance structuring.
            </p>
          </div>
        </div>
      </article>

      <article
        className={cardClass("experience")}
        aria-labelledby="pillar-experience-layer"
        onClick={() => onPillarClick("experience")}
        aria-pressed={selected === "experience"}
      >
        <div className="border-b border-[color:var(--pa-border)] pb-4">
          <TerminalLabel>The Adoption &amp; Monetization</TerminalLabel>
        </div>
        <h2
          id="pillar-experience-layer"
          className={`mt-4 text-lg font-semibold tracking-tight transition-colors ${selected === "experience" ? "text-[var(--pa-navy)]" : "text-[var(--pa-text)]"}`}
        >
          {ADVISORY_CARD_HEADING.experience}
        </h2>
        <div className="mt-4 border-t border-[color:var(--pa-border)] pt-5">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <TerminalLabel>Asset Focus</TerminalLabel>
              <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
                Agentic AI platforms (SaaS 2.0), immersive spatial media, and direct-to-device (D2D) satellite/edge
                services.
              </p>
            </div>
            <div className="border-t border-[color:var(--pa-border)] pt-6 sm:border-l sm:border-t-0 sm:border-[color:var(--pa-border)] sm:pl-8 sm:pt-0">
              <TerminalLabel>Structuring Levers</TerminalLabel>
              <p className="mt-2 text-sm leading-relaxed text-[var(--pa-muted)]">
                Outcome-based tokenomics, proprietary data retention moats, and sovereignty-compliant arbitrage.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
