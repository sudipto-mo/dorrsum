import Link from "next/link";
import {
  CheckCircle2,
  FileSearch,
  GitBranch,
  LineChart,
  Network,
} from "lucide-react";

export function ApproachPage() {
  return (
    <div className="relative left-1/2 right-auto w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-[#0B0F19] text-slate-300 font-sans antialiased selection:bg-blue-500/25 pb-20 pt-2 sm:pt-0">
      {/* Subtle page texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay z-0"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[1]">
        {/* HERO */}
        <header className="relative overflow-hidden border-b border-slate-800/80">
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)] pointer-events-none"
            aria-hidden
          />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-8 py-20 lg:py-28 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-6">
              Approach
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tighter text-slate-50 leading-[1.08] mb-6">
              Accelerating the Deal Cycle
            </h1>
            <h2 className="text-lg sm:text-xl text-slate-300 font-light leading-loose max-w-2xl mx-auto border-t border-slate-800/80 pt-8 mt-2 font-normal">
              Institutional-Grade Credit Structuring: The New Standard for Deal Screening.
            </h2>
          </div>
        </header>

        {/* SECTION I */}
        <section
          className="max-w-5xl mx-auto px-6 sm:px-8 py-16 lg:py-24 border-b border-slate-800/60"
          aria-labelledby="approach-bottleneck"
        >
          <h2 id="approach-bottleneck" className="sr-only">
            The origination bottleneck
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-loose max-w-3xl mb-12 lg:mb-14">
            For Coverage Bankers and Private Credit Fund Managers, the most critical asset is{" "}
            <span className="text-slate-100 font-semibold">Time</span>. Yet, the path from a first meeting to a
            credible &apos;Go/No-Go&apos; decision is often stalled by the manual heavy lifting of deal screening:
          </p>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 lg:p-8 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-50 tracking-tight mb-3">The Data Ingestion Lag</h3>
              <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed m-0">
                Precious days are lost waiting for an analyst to manually &apos;spread&apos; messy, unaudited, or
                multi-entity financials from a prospect&apos;s PDFs into a pitch-ready format.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 lg:p-8 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-50 tracking-tight mb-3">The &apos;v0.1&apos; Delay</h3>
              <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed m-0">
                In competitive bilateral or club deals, losing 48 hours to a &apos;blank page&apos; draft can mean
                losing the mandate or the &apos;First Look&apos; advantage.
              </p>
            </article>
          </div>

          <p className="text-center text-lg sm:text-xl font-semibold text-slate-50 tracking-tight px-4 py-5 rounded-lg border border-slate-700/80 bg-slate-900/60 leading-relaxed">
            In fast-moving markets, latency is a deal-killer.
          </p>
        </section>

        {/* SECTION II */}
        <section
          className="max-w-5xl mx-auto px-6 sm:px-8 py-16 lg:py-24 border-b border-slate-800/60"
          aria-labelledby="approach-virtual-team"
        >
          <h2 id="approach-virtual-team" className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight mb-10">
            The Virtual Deal Team
          </h2>

          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 lg:p-8 mb-8 shadow-[0_0_0_1px_rgba(59,130,246,0.06)]">
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-500/25 bg-blue-500/10 text-blue-400"
                aria-hidden
              >
                <Network className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">The Deal Coordinator (Orchestrator)</h3>
                <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed m-0">
                  Manages the workflow to ensure the output is ready for a client pitch, a term sheet draft, or an
                  Investment Committee (IC) memo.
                </p>
              </div>
            </div>
          </div>

          <div className="relative pl-4 md:pl-6 border-l border-slate-700/80 ml-3 md:ml-5 space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 -ml-4 md:-ml-6 pl-4 md:pl-6 mb-2">
              Specialist agents
            </p>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <article className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 lg:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <GitBranch className="h-4 w-4 text-slate-500 shrink-0" strokeWidth={1.75} aria-hidden />
                  <h3 className="text-base font-semibold text-slate-50 m-0">Data Extraction (OCR)</h3>
                </div>
                <div className="flex gap-3">
                  <FileSearch className="h-5 w-5 text-blue-400/90 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    High-fidelity capture of financials directly from bespoke management accounts or data rooms.
                  </p>
                </div>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 lg:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <GitBranch className="h-4 w-4 text-slate-500 shrink-0" strokeWidth={1.75} aria-hidden />
                  <h3 className="text-base font-semibold text-slate-50 m-0">Instant Modeling</h3>
                </div>
                <div className="flex gap-3">
                  <LineChart className="h-5 w-5 text-blue-400/90 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    AI assisted generation of core analysis—Cash Flow Conversion, Leverage, and Debt Serviceability—
                    without the wait time for an interim spreadsheet.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION III */}
        <section
          className="max-w-5xl mx-auto px-6 sm:px-8 py-16 lg:py-24 border-b border-slate-800/60"
          aria-labelledby="approach-driver"
        >
          <h2 id="approach-driver" className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight mb-6">
            Professional Insight Over &apos;AI Noise&apos;
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-loose max-w-3xl mb-10">
            The goal isn&apos;t to replace the Banker&apos;s intuition, but to fuel it. AI is a high-performance
            engine, but it requires a &apos;Master Driver&apos; with sector expertise to ensure the analysis holds up
            under the scrutiny of a Credit Committee.
          </p>

          <figure className="rounded-xl border border-slate-700/90 bg-slate-800/35 p-6 lg:p-8 mb-10 backdrop-blur-sm">
            <figcaption className="text-sm font-semibold text-blue-200/80 tracking-tight mb-3">
              The Reality Check: The Materials Sector Pilot
            </figcaption>
            <blockquote className="text-sm sm:text-[15px] text-slate-300 leading-loose m-0 border-l-2 border-blue-500/40 pl-5">
              While screening a global Packaging prospect, a generic AI misidentified &apos;Bills Payable&apos; as
              standard A/P. To a machine, it&apos;s a generic liability; to a Senior Banker or Private Credit
              Investor, it is Bank Debt that could trigger a covenant breach or sit senior to a new facility.
            </blockquote>
          </figure>

          <p className="text-base text-slate-300 leading-loose max-w-3xl m-0">
            <span className="text-slate-100 font-medium">My framework</span> allows the professional to catch these
            nuances in minutes. We use AI to surface the &apos;truth&apos; in the data so you can focus on Structuring
            and Covenants, not data entry.
          </p>
        </section>

        {/* SECTION IV */}
        <section
          className="max-w-5xl mx-auto px-6 sm:px-8 py-16 lg:py-24 border-b border-slate-800/60"
          aria-labelledby="approach-edge"
        >
          <h2 id="approach-edge" className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight mb-8">
            The Edge
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-loose max-w-3xl mb-10">
            While the AI handles the Deterministic (the hard math), its true power is the Stochastic (the narrative).
            It synthesizes vast industry data into a cohesive Credit Rationale. This allows for:
          </p>
          <ul className="space-y-6 max-w-3xl list-none p-0 m-0">
            <li className="flex gap-4">
              <CheckCircle2
                className="h-6 w-6 text-emerald-500/90 shrink-0 mt-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
              <div>
                <p className="text-base font-semibold text-slate-50 m-0 mb-1">Faster Term Sheets</p>
                <p className="text-sm text-slate-300 leading-relaxed m-0">
                  Moving from raw data to a professional &quot;summary of terms&quot; in record time.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2
                className="h-6 w-6 text-emerald-500/90 shrink-0 mt-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
              <div>
                <p className="text-base font-semibold text-slate-50 m-0 mb-1">Higher Deal Certainty</p>
                <p className="text-sm text-slate-300 leading-relaxed m-0">
                  Identifying &quot;deal-breakers&quot; and structural risks early in the screening process.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* CONCLUSION — Enterprise CTA banner */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 lg:py-24" aria-labelledby="approach-origination-alpha">
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-10 md:p-16 shadow-lg shadow-black/20">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
              <div className="max-w-2xl text-left">
                <h2
                  id="approach-origination-alpha"
                  className="text-3xl font-semibold tracking-tight text-slate-50 mb-4"
                >
                  Origination as Alpha
                </h2>
                <p className="text-slate-300 leading-relaxed text-base sm:text-[17px] m-0">
                  This framework serves as a live demonstration of what the new baseline in credit origination must
                  look like. Having tested the boundaries of agentic AI in complex sectors like Materials, and now
                  scaling to Telecom Infrastructure, the conclusion is definitive. This architecture equips the Fund
                  Manager and the Coverage Banker to move from &apos;First Meeting&apos; to &apos;Term Sheet&apos; with
                  the speed of a fintech and the structural rigor of a Tier-1 Institution.
                </p>
              </div>
              <div className="w-full shrink-0 md:w-auto md:min-w-[220px]">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors no-underline w-full md:w-auto text-center"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
