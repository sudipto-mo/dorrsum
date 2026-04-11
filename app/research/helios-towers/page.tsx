import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Lock } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Helios Towers — Indicative Credit Brief (Teaser) | Principal AI",
  description:
    "Public excerpt: illustrative summary (financial, equity, and refinancing risk). Full institutional briefs for commissioned clients.",
  openGraph: {
    title: "Helios Towers — Indicative Credit Brief (Teaser)",
    description:
      "Preview the quality of Principal AI proprietary credit research before client access.",
  },
};

const body = "text-[15px] leading-relaxed text-slate-300 sm:text-base sm:leading-7";
const riskLabel = "text-sm font-bold text-cyan-500/95 sm:text-[15px]";

export default function HeliosTowersResearchTeaserPage() {
  return (
    <div className="min-h-full w-full bg-[#0B0F19] text-slate-50">
      <article className="relative mx-auto max-w-3xl px-5 pb-8 pt-10 sm:px-8 sm:pt-14 md:pt-16">
        <header className="mb-10 border-b border-slate-800/80 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Indicative Credit Brief · Flagship Teaser
          </p>
          <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Helios Towers plc
            </h1>
            <span className="text-sm font-medium text-slate-500">Telecom / Tower Infrastructure</span>
          </div>
          <p className="text-sm text-slate-500">London · March 2026 · Excerpt for qualified counterparties only</p>
        </header>

        <div className="mb-2 flex flex-wrap items-center gap-2">
          <FileText className="h-5 w-5 shrink-0 text-cyan-500/90" aria-hidden />
          <h2
            id="teaser-summary-heading"
            className="m-0 text-lg font-extrabold uppercase tracking-[0.14em] text-slate-100 sm:text-xl"
          >
            Summary{" "}
            <span className="normal-case font-extrabold tracking-[0.06em] text-slate-400">( Illustrative )</span>
          </h2>
        </div>

        <section aria-labelledby="teaser-summary-heading" className="pb-2">
          <p className={`${riskLabel} mt-3`}>
            <strong className="font-bold">Financial Risk: Moderate</strong>
          </p>
          <p className={body}>
            Liquidity is strong; while cash flow generation has improved, enabling Helios to easily cover investment and
            debt servicing. It is targeting debt reduction; any significant reduction may prove difficult to achieve in the
            short term unless it sees further tenancy/margin improvement given the planned CAPEX.
          </p>
          <p className={`${riskLabel} mt-6`}>
            <strong className="font-bold">Equity Risk: High</strong>
          </p>
          <p className={body}>
            Given the low level of permanent equity and the lack of share price performance. Doubtful of its attractiveness
            to investors, thus equity refinancing is unlikely in short term.
          </p>
          <p className={`${riskLabel} mt-6`}>
            <strong className="font-bold">Refinancing Risk: Medium</strong>
          </p>
          <p className={body}>
            The $300M convertible bond maturing in 2027 requires a clear plan. If the stock price doesn&apos;t rise enough
            for investors to convert to shares, Helios must find cash or new loans.
          </p>
        </section>
      </article>

      {/* Paywall band: gradient + glass card — immediately after summary */}
      <div className="relative mx-auto max-w-3xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[-10rem] z-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/85 to-transparent sm:top-[-14rem]"
        />

        <div className="relative z-10 mx-auto flex justify-center pt-2 sm:pt-4">
          <div className="max-w-lg rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-2xl shadow-black/40 backdrop-blur-md sm:px-10 sm:py-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/50">
              <Lock className="h-5 w-5 text-blue-400" aria-hidden />
            </div>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Client Access Required
            </p>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              Unlock Full Institutional Brief. Access complete financial reconstructions, covenant analysis, and debt
              serviceability models.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.25)] transition-colors hover:bg-blue-700 no-underline"
              >
                Commission a Mandate
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-slate-600 bg-slate-800/60 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 no-underline"
              >
                Client Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BottomNav
        nextHref="/contact"
        nextLabel="Commission a mandate"
        nextDescription="Scope institutional credit research on your timeline"
      />
    </div>
  );
}
