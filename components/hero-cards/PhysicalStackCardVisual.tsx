"use client";

import { useState } from "react";

const ROWS = [
  {
    id: "power",
    row: "Power",
    badge: "Critical Bottleneck",
    statusColor: "#c0392b",
    stat: "90%",
    statLabel: "cite grid access as the hard ceiling for project delivery",
    note: "2.6 GW → 10.7 GW SEA power demand by 2035",
  },
  {
    id: "silicon",
    row: "Silicon",
    badge: "Tight",
    statusColor: "#b8600a",
    stat: "120 kW",
    statLabel: "per Rubin rack — shifting value to tokens per watt",
    note: "TSMC CoWoS fully booked through 2027",
  },
  {
    id: "cooling",
    row: "Cooling",
    badge: "Rapidly Innovating",
    statusColor: "#1a6e3a",
    stat: "30%",
    statLabel: "energy loss reduction via HVDC + liquid cooling integration",
    note: "Liquid penetration hitting 30% — now mandatory for Tier 1 AI DC",
  },
  {
    id: "land",
    row: "Land & Permitting",
    badge: "Tightening",
    statusColor: "#7b4a00",
    stat: "5 yr",
    statLabel: "transmission build cycle vs. 18-month speed-to-market demand",
    note: "Malaysia Oct 2025 framework shifts power permitting to merit system",
  },
  {
    id: "connectivity",
    row: "Connectivity",
    badge: "Strategic",
    statusColor: "#0a4a8a",
    stat: ">70%",
    statLabel: "transcontinental capacity now owned by hyperscalers",
    note: "$13B+ subsea investment 2025–2027 — route, not bandwidth, is the risk",
  },
  {
    id: "construction",
    row: "Construction",
    badge: "Stressed",
    statusColor: "#5a1a6e",
    stat: "7–10%",
    statLabel: "CAGR in APAC construction costs driven by MEP scarcity",
    note: "IST/commissioning — not concrete — is the execution bottleneck",
  },
] as const;

export default function PhysicalStackCardVisual() {
  const [open, setOpen] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[oklch(95%_0.014_82)] font-[family-name:var(--font-hero-sans)]">
      <div className="shrink-0 border-b border-black/[0.08] px-3 pb-2 pt-3">
        <p className="text-[7.5px] font-bold uppercase tracking-[0.18em] text-[oklch(33%_0.05_258)]">
          Supply Chain Intelligence · APAC 2026
        </p>
        <p className="mt-1.5 font-[family-name:var(--font-hero-serif)] text-[9.5px] italic leading-snug text-[oklch(33%_0.05_258)]">
          Independent read on where physical constraints bind before covenants do.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="divide-y divide-black/[0.06]">
          {ROWS.map((r) => {
            const expanded = open === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setOpen(expanded ? null : r.id)}
                onMouseEnter={() => setHoverId(r.id)}
                onMouseLeave={() => setHoverId(null)}
                className="w-full border-l-2 border-l-transparent text-left transition-colors duration-200 hover:bg-[rgba(80,60,20,0.07)]"
                style={{
                  borderLeftColor:
                    expanded || hoverId === r.id ? r.statusColor : "transparent",
                }}
              >
                <div className="flex items-start gap-2 px-2 py-2">
                  <span className="min-w-0 flex-1 text-[9px] font-semibold text-[oklch(14%_0.07_258)]">{r.row}</span>
                  <span
                    className="shrink-0 rounded px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: r.statusColor }}
                  >
                    {r.badge}
                  </span>
                </div>
                {expanded ? (
                  <div className="border-t border-black/[0.06] px-2 pb-2 pt-2">
                    <p className="font-[family-name:var(--font-hero-serif)] text-base font-bold text-[oklch(14%_0.07_258)]">
                      {r.stat}
                    </p>
                    <p className="mt-0.5 text-[7.5px] leading-snug text-[oklch(33%_0.05_258)]">{r.statLabel}</p>
                    <p className="mt-2 border-t border-black/[0.06] pt-2 text-[7.5px] italic leading-relaxed text-[oklch(40%_0.04_70)]">
                      {r.note}
                    </p>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
