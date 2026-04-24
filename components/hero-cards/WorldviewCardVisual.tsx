"use client";

import { useState } from "react";

const LAYERS = [
  {
    id: "demand",
    label: "DEMAND LAYER / Hyperscalers",
    darkColor: "#1a4a8a",
    stat: "US$660–690B",
    statLabel: "Hyperscale capex envelope (illustrative)",
    players: [
      { name: "Microsoft", note: "US$1.7B Indonesia · Azure 8 markets" },
      { name: "Google", note: "US$15B AdaniConneX · 1 GW" },
      { name: "Amazon", note: "largest APAC colo tenant" },
      { name: "Meta", note: "Candle 570 Tbps · 2028" },
      { name: "Oracle", note: "US$50B capex" },
    ],
  },
  {
    id: "supply",
    label: "SUPPLY LAYER / Who Is Building",
    darkColor: "#4a2a8a",
    stat: "18.3% CAGR",
    statLabel: "APAC DC capacity (indicative)",
    players: [
      { name: "Equinix", note: "SG6 US$260M · S$650M green bonds" },
      { name: "Digital Realty", note: "S$7B Singapore · 150kW/cabinet" },
      { name: "AirTrunk", note: "A$24B Blackstone" },
      { name: "NEXTDC", note: "A$7B OpenAI MoU · 550 MW" },
      { name: "STT GDC", note: "S$13.8B EV · 2.3 GW" },
      { name: "GDS/DayOne", note: "RM 15B green · 750 MW" },
    ],
  },
  {
    id: "capital",
    label: "CAPITAL LAYER / Who Is Financing",
    darkColor: "#0a6640",
    stat: "A$24B",
    statLabel: "Representative platform scale",
    players: [
      { name: "Blackstone", note: "AirTrunk · A$100B target" },
      { name: "KKR+Singtel", note: "S$13.8B EV" },
      { name: "CPP Investments", note: "co-investor" },
      { name: "Domestic India", note: "Reliance+Adani balance sheet" },
      { name: "Green Bonds", note: "now default instrument" },
    ],
  },
  {
    id: "geo",
    label: "GEO HEAT MAP / Where Capital Flows",
    darkColor: "#7a4800",
    stat: "3 GW",
    statLabel: "Illustrative corridor concentration",
    players: [
      { name: "Singapore", note: "hub under pressure" },
      { name: "Japan", note: "nuclear baseload" },
      { name: "India", note: "1.7GW → 4× by 2030" },
      { name: "Australia", note: "NEXTDC-OpenAI sovereign play" },
      { name: "SEA Corridor", note: "Malaysia leads · Vietnam emerging" },
    ],
  },
] as const;

export default function WorldviewCardVisual() {
  const [open, setOpen] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[oklch(95%_0.014_82)] font-[family-name:var(--font-brand)]">
      <div className="shrink-0 border-b border-black/[0.08] px-3 pb-2 pt-3">
        <p className="text-[7.5px] font-bold uppercase tracking-[0.18em] text-[oklch(33%_0.05_258)]">
          Capital Intelligence · APAC 2026
        </p>
        <p className="mt-1.5 font-[family-name:var(--font-serif)] text-[9.5px] italic leading-snug text-[oklch(33%_0.05_258)]">
          Who finances, who builds, and where the stack actually binds.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="divide-y divide-black/[0.06]">
          {LAYERS.map((layer) => {
            const expanded = open === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setOpen(expanded ? null : layer.id)}
                onMouseEnter={() => setHoverId(layer.id)}
                onMouseLeave={() => setHoverId(null)}
                className="w-full border-l-2 border-l-transparent text-left transition-colors duration-200 hover:bg-[rgba(80,60,20,0.07)]"
                style={{
                  borderLeftColor:
                    expanded || hoverId === layer.id ? layer.darkColor : "transparent",
                }}
              >
                <div className="px-2 py-2">
                  <p className="text-[8px] font-bold uppercase tracking-[0.12em]" style={{ color: layer.darkColor }}>
                    {layer.label}
                  </p>
                </div>
                {expanded ? (
                  <div className="border-t border-black/[0.06] px-2 pb-2 pt-2">
                    <p className="font-[family-name:var(--font-serif)] text-base font-bold text-[oklch(14%_0.07_258)]">
                      {layer.stat}
                    </p>
                    <p className="mt-0.5 text-[7.5px] text-[oklch(45%_0.04_70)]">{layer.statLabel}</p>
                    <ul className="mt-2 space-y-1.5 border-t border-black/[0.06] pt-2">
                      {layer.players.map((p) => (
                        <li key={p.name} className="text-[7.5px] leading-snug">
                          <span className="font-semibold" style={{ color: layer.darkColor }}>
                            {p.name}
                          </span>{" "}
                          <span className="text-[oklch(45%_0.04_70)]">· {p.note}</span>
                        </li>
                      ))}
                    </ul>
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
