import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Helios Towers — Indicative Credit Brief (Teaser) | Principal AI",
  description:
    "Preview a rating-style credit summary: profile, strengths, concerns, committee-style decision, covenant package, and debt capacity. Full briefs for commissioned clients.",
  openGraph: {
    title: "Helios Towers — Indicative Credit Brief (Teaser)",
    description:
      "Preview the quality of Principal AI proprietary credit research before client access.",
  },
};

const sectionLabel = "mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500";
const sectionBody = "text-[15px] leading-relaxed text-slate-300 sm:text-base sm:leading-7";
const bulletList =
  "list-disc list-inside space-y-2 text-[15px] leading-relaxed text-slate-300 marker:text-slate-500 sm:text-base sm:leading-7";

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

        <div className="space-y-8">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5 shrink-0 text-blue-400/90" aria-hidden />
            <h2 className="text-lg font-bold uppercase tracking-wide text-slate-100 sm:text-xl">Rating Summary</h2>
          </div>

          <section aria-labelledby="credit-profile-label">
            <p id="credit-profile-label" className={sectionLabel}>
              Credit profile
            </p>
            <p className={sectionBody}>
              Sub-investment grade credit (implied BB+). Contracted tower-lease business model with top-tier MNO
              counterparties across Sub-Saharan Africa.
            </p>
          </section>

          <section aria-labelledby="business-strengths-label">
            <p id="business-strengths-label" className={sectionLabel}>
              Business strengths
            </p>
            <p className={sectionBody}>
              ~52% Adjusted EBITDA margin reflects structural strength of TowerCo model.
            </p>
          </section>

          <section aria-labelledby="credit-concerns-label">
            <p id="credit-concerns-label" className={sectionLabel}>
              Credit concerns
            </p>
            <ul className={`${bulletList} pl-0.5`} aria-label="Credit concerns">
              <li>
                Elevated leverage (~4.5× Debt/EBITDA FY2024; verify Net Debt/Adj. EBITDA per draft tables)
              </li>
              <li>FX mismatch: USD-denominated debt vs. local currency revenues</li>
              <li>Refinancing profile requires close monitoring</li>
            </ul>
          </section>

          <section aria-labelledby="recommended-decision-label">
            <p id="recommended-decision-label" className={sectionLabel}>
              Recommended decision
            </p>
            <p className={`${sectionBody} font-semibold text-white`}>Proceed with Conditions</p>
          </section>

          <section aria-labelledby="covenant-package-label">
            <p id="covenant-package-label" className={sectionLabel}>
              Suggested covenant package
            </p>
            <ul className={`${bulletList} pl-0.5`} aria-label="Suggested covenant package">
              <li>Net leverage step-down to 5.0× by FY2026</li>
              <li>Mandatory FX hedging on ≥70% of USD obligations</li>
              <li>Cash sweep mechanism triggered above 6.0× leverage</li>
            </ul>
          </section>

          <section aria-labelledby="debt-capacity-label" className="pb-2">
            <p id="debt-capacity-label" className={sectionLabel}>
              Debt capacity
            </p>
            <p className={sectionBody}>
              Estimated headroom for additional debt: USD ~140m at 5.0× covenant level (on current EBITDA base).
            </p>
          </section>
        </div>
      </article>

      {/* Paywall band: gradient + glass card — immediately after Rating Summary / Debt capacity */}
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
    </div>
  );
}
