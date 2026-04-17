"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock, Shield } from "lucide-react";

type ToolKey = "map" | "sim" | "risk";

const tools: Array<{
  key: ToolKey;
  label: string;
  description: string;
}> = [
  {
    key: "map",
    label: "TMT Ecosystem Map",
    description: "Visualizing capital flows and supply chains.",
  },
  {
    key: "sim",
    label: "Bankability Simulator",
    description: "Stress-testing PUE, Leverage, and DSCR.",
  },
  {
    key: "risk",
    label: "Sovereign Risk Matrix",
    description: "Geopolitical and grid capacity screening.",
  },
];

function ToolBackdrop({ active }: { active: ToolKey }) {
  const layer = useMemo(() => {
    if (active === "map") {
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-90">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_78%_18%,rgba(99,102,241,0.32),transparent_30%),radial-gradient(circle_at_54%_72%,rgba(14,165,233,0.25),transparent_35%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.0),rgba(2,6,23,0.55))]" />
          </div>

          {/* Node network */}
          <div className="absolute inset-0 opacity-55">
            <div className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-blue-400/90 shadow-[0_0_18px_rgba(59,130,246,0.55)]" />
            <div className="absolute left-[24%] top-[46%] h-2.5 w-2.5 rounded-full bg-indigo-300/90 shadow-[0_0_20px_rgba(99,102,241,0.55)]" />
            <div className="absolute left-[45%] top-[26%] h-2 w-2 rounded-full bg-sky-300/90 shadow-[0_0_18px_rgba(56,189,248,0.45)]" />
            <div className="absolute left-[62%] top-[56%] h-2 w-2 rounded-full bg-blue-300/90 shadow-[0_0_18px_rgba(59,130,246,0.45)]" />
            <div className="absolute left-[78%] top-[30%] h-2.5 w-2.5 rounded-full bg-indigo-200/90 shadow-[0_0_22px_rgba(99,102,241,0.55)]" />
            <div className="absolute left-[34%] top-[72%] h-2 w-2 rounded-full bg-blue-200/90 shadow-[0_0_16px_rgba(59,130,246,0.35)]" />

            <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_70%)]">
              <svg className="h-full w-full" viewBox="0 0 100 100" aria-hidden>
                <path d="M8 18 L24 46 L45 26 L62 56 L78 30" stroke="rgba(59,130,246,0.35)" strokeWidth="0.6" fill="none" />
                <path d="M24 46 L34 72 L62 56" stroke="rgba(99,102,241,0.28)" strokeWidth="0.6" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    if (active === "sim") {
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.28),transparent_40%),radial-gradient(circle_at_85%_50%,rgba(14,165,233,0.18),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.0),rgba(2,6,23,0.6))]" />

          {/* Sliders + chart skeleton */}
          <div className="absolute left-8 right-8 top-10 opacity-60">
            <div className="grid gap-4 md:grid-cols-3">
              {["PUE", "Leverage", "DSCR"].map((k) => (
                <div key={k} className="rounded-xl border border-slate-700/40 bg-slate-950/30 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">{k}</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-slate-800/70">
                    <div className="h-2 w-[58%] rounded-full bg-blue-500/70" />
                  </div>
                  <div className="mt-3 h-2 w-2/3 rounded bg-slate-800/60" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-8 right-8 opacity-60">
            <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Scenario output</p>
              <div className="mt-4 grid grid-cols-12 gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-span-2 h-6 rounded bg-slate-800/70"
                    style={{ opacity: 0.4 + (i % 6) * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(99,102,241,0.24),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.20),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.0),rgba(2,6,23,0.62))]" />

        {/* Heatmap */}
        <div className="absolute inset-x-8 top-12 opacity-60">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-950/30 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Matrix</p>
            <div className="mt-4 grid grid-cols-8 gap-2">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 rounded"
                  style={{
                    background:
                      i % 9 === 0
                        ? "rgba(59,130,246,0.65)"
                        : i % 7 === 0
                          ? "rgba(99,102,241,0.55)"
                          : "rgba(30,41,59,0.55)",
                    border: "1px solid rgba(148,163,184,0.10)",
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono uppercase tracking-[0.22em]">Geopolitical</span>
              <span className="font-mono uppercase tracking-[0.22em]">Grid</span>
            </div>
          </div>
        </div>
      </div>
    );
  }, [active]);

  return layer;
}

export default function TerminalTeaser() {
  const [active, setActive] = useState<ToolKey>("map");
  const overlayIcon = active === "risk" ? Shield : Lock;
  const OverlayIcon = overlayIcon;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Proprietary Intelligence Terminal
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Practitioner-grade credit assessment models and ecosystem maps, engineered for the Digital Infrastructure
            Nexus.
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/30 shadow-[0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur-md">
          {/* Tabs */}
          <div className="flex flex-col gap-3 border-b border-slate-800/70 bg-slate-950/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2" aria-hidden>
              <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tools.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`rounded-lg px-3 py-2 text-left transition-colors ${
                    active === t.key
                      ? "bg-blue-500/10 text-blue-200 border border-blue-500/25"
                      : "bg-transparent text-slate-300 border border-transparent hover:bg-white/[0.04] hover:text-slate-100"
                  }`}
                  aria-pressed={active === t.key}
                >
                  <p className="m-0 text-[12px] font-semibold tracking-tight">{t.label}</p>
                  <p className="m-0 mt-0.5 hidden text-[11px] text-slate-500 sm:block">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Display */}
          <div className="relative h-[340px] sm:h-[380px] md:h-[420px]">
            <div className="absolute inset-0 transition-opacity duration-300">
              <ToolBackdrop active={active} />
            </div>

            {/* Heavy blur veil */}
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-2xl transition-all duration-300" />

            {/* Gated overlay (sharp) */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-slate-950/70 p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-300">
                  <OverlayIcon className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-5 text-sm font-semibold text-slate-100">Client Access Required</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Interactive models and live data feeds are restricted to active mandates and platform subscribers.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#3b82f6] px-5 py-3 text-sm font-semibold text-white no-underline shadow-[0_0_24px_rgba(59,130,246,0.25)] transition-colors hover:bg-[#2563eb]"
                  >
                    Request Access
                  </Link>
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Preview mode · details obscured
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

