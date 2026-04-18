"use client";

import { ADVISORY_CARD_HEADING, type AdvisoryPillarId } from "@/lib/advisory-pillars";
import type { CoverageSector } from "@/lib/coverage-sector";

function TerminalLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
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
    "relative overflow-hidden rounded-2xl border p-6 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur-md cursor-pointer select-none transition-all duration-200";

  function cardClass(sector: AdvisoryPillarId) {
    const isActive = selected === sector;
    const isDimmed = selected !== "ALL" && !isActive;
    return [
      cardBase,
      isActive
        ? "border-blue-500/60 bg-slate-900/50 ring-1 ring-blue-500/40 shadow-[0_0_32px_rgba(59,130,246,0.12)]"
        : "border-slate-800/80 bg-slate-900/25 hover:border-slate-700/80 hover:bg-white/[0.04]",
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
          className={`mt-3 text-lg font-semibold tracking-tight transition-colors ${selected === "communications" ? "text-white" : "text-slate-100"}`}
        >
          {ADVISORY_CARD_HEADING.communications}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/35 px-4 py-3.5">
            <TerminalLabel>Asset Focus</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Fiber-to-the-X (FTTX), Subsea cables, Edge compute, hyperscale transit.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/35 px-4 py-3.5">
            <TerminalLabel>Structuring Levers</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
          className={`mt-3 text-lg font-semibold tracking-tight transition-colors ${selected === "real_assets" ? "text-white" : "text-slate-100"}`}
        >
          {ADVISORY_CARD_HEADING.real_assets}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/35 px-4 py-3.5">
            <TerminalLabel>Asset Focus</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Hyperscale colocation, AI Silicon (GPUs/ASICs), TowerCos, and liquid-cooling infrastructure.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/35 px-4 py-3.5">
            <TerminalLabel>Structuring Levers</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
          className={`mt-3 text-lg font-semibold tracking-tight transition-colors ${selected === "power" ? "text-white" : "text-slate-100"}`}
        >
          {ADVISORY_CARD_HEADING.power}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/35 px-4 py-3.5">
            <TerminalLabel>Asset Focus</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Grid capacity, behind-the-meter renewables, AI liquid-cooling retrofits.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/35 px-4 py-3.5">
            <TerminalLabel>Structuring Levers</TerminalLabel>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
        <div className="border-b border-slate-800/70 pb-4">
          <TerminalLabel>The Adoption &amp; Monetization</TerminalLabel>
        </div>
        <h2
          id="pillar-experience-layer"
          className={`mt-4 text-lg font-semibold tracking-tight transition-colors ${selected === "experience" ? "text-white" : "text-slate-100"}`}
        >
          {ADVISORY_CARD_HEADING.experience}
        </h2>
        <div className="mt-4 border-t border-slate-800/70 pt-5">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <TerminalLabel>Asset Focus</TerminalLabel>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Agentic AI platforms (SaaS 2.0), immersive spatial media, and direct-to-device (D2D) satellite/edge
                services.
              </p>
            </div>
            <div className="border-t border-slate-800/70 pt-6 sm:border-t-0 sm:border-l sm:border-slate-800/70 sm:pl-8 sm:pt-0">
              <TerminalLabel>Structuring Levers</TerminalLabel>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Outcome-based tokenomics, proprietary data retention moats, and sovereignty-compliant arbitrage.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
