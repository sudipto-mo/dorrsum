import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { getSession } from "@/lib/get-session";
import { getResearchContent } from "@/lib/markdown";
import {
  DIGITAL_INFRASTRUCTURE_STACK,
  getStackReport,
  stackReportFullTitle,
} from "@/lib/dc-stack-reports";
import ResearchReportContents from "@/components/ResearchReportContents";
import { paEditorialTitleModule } from "@/lib/editorial-typography";
import { WORLDVIEW_TOC } from "@/lib/worldview-contents";

const report = getStackReport("worldview");
const nextReport = getStackReport("physical-stack");

export const metadata: Metadata = {
  title: `${stackReportFullTitle(report)} (APAC) | Principal AI`,
  description:
    "Digital Infrastructure Stack — APAC colocation and hyperscaler landscape: who is building, where, and with whose capital. Tier 1–4 operators, hyperscaler commitments, and the capital layer financing the buildout.",
  robots: { index: true, follow: true },
};

export default async function WorldviewPage() {
  const isAuthenticated = await getSession();
  const content = isAuthenticated ? await getResearchContent("dc-worldview") : null;

  return (
    <div className="min-h-full w-full bg-[var(--pa-page)] text-[var(--pa-text)]">
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8 sm:pt-14 md:pt-16">

        {/* Breadcrumb — brand is in site nav */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8794]">
          <Link href="/research" className="transition-colors no-underline hover:text-[var(--pa-navy)]">
            ← Research
          </Link>
          {" · "}
          <Link href="/research/dc-infrastructure" className="transition-colors no-underline hover:text-[var(--pa-navy)]">
            {DIGITAL_INFRASTRUCTURE_STACK}
          </Link>
        </p>

        {/* Header */}
        <header className="mb-10 border-b border-[color:var(--pa-border)] pb-8">
          <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className={paEditorialTitleModule}>
              {stackReportFullTitle(report)}
            </h1>
          </div>
          <p className="mt-2 text-sm text-[#7b8794]">April 2026</p>
        </header>

        {/* Free teaser — visible to everyone */}
        <div className="prose-research">
          <p>
            The AI infrastructure buildout in Asia-Pacific is no longer a story about a few hyperscalers leasing space
            in Singapore. It has become a multi-layered capital deployment involving sovereign wealth, private equity,
            domestic conglomerates, and a new class of AI-native operators — each occupying a distinct position in the
            supply chain and financing stack. This note maps who is building, where, and with whose capital.
          </p>
          <p>
            The APAC colocation market is projected to grow from US$29.6 billion in 2025 to US$68.5 billion by 2030
            (18.3% CAGR). Hyperscale capacity alone is forecast to reach US$196.7 billion by 2031. But the headline
            numbers obscure the real story: the market is stratifying into distinct tiers, each with different
            risk-return profiles and credit dynamics.
          </p>
        </div>

        <ResearchReportContents items={WORLDVIEW_TOC} linkable={Boolean(isAuthenticated && content)} />

        {/* Authenticated: full content */}
        {isAuthenticated && content ? (
          <>
            <article
              className="prose-research mt-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="mt-16 flex items-center justify-between border-t border-[color:var(--pa-border)] pb-20 pt-8 text-sm">
              <a href="/research/dc-infrastructure/physical-stack" className="text-[var(--pa-muted)] transition-colors no-underline hover:text-[var(--pa-text)]">
                ← {stackReportFullTitle(nextReport)}
              </a>
              <Link href="/research/dc-infrastructure" className="text-[var(--pa-link)] transition-colors no-underline hover:text-[var(--pa-link-hover)]">
                {DIGITAL_INFRASTRUCTURE_STACK}
              </Link>
            </div>
          </>
        ) : (
          /* Unauthenticated: blurred hint + paywall card */
          <div className="relative mt-8 pb-20">
            {/* Blurred continuation hint */}
            <div className="pointer-events-none select-none overflow-hidden rounded-sm opacity-30 blur-[3px]">
              <p className="text-[15px] leading-relaxed text-[var(--pa-muted)]">
                The five largest US cloud and AI infrastructure providers — Microsoft, Alphabet, Amazon, Meta, and
                Oracle — have collectively committed US$660–690 billion in global capex for 2026, nearly doubling
                2025 levels. A meaningful share is flowing into APAC, where Equinix, AirTrunk, Digital Realty,
                STT GDC and a new class of domestic operators are racing to build...
              </p>
            </div>

            {/* Gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent to-[var(--pa-page)]"
            />

            {/* Paywall card */}
            <div className="relative mt-4 flex items-center justify-between gap-4 rounded-sm border border-[color:var(--pa-border)] bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 shrink-0 text-[#7b8794]" aria-hidden />
                <p className="text-[12px] font-semibold text-[var(--pa-navy)]">Client Access Required</p>
              </div>
              <Link
                href={`/login?returnTo=${encodeURIComponent("/research/dc-infrastructure/worldview")}`}
                className="shrink-0 rounded-sm border border-[var(--pa-navy)] bg-[var(--pa-navy)] px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-[var(--pa-navy-deep)]"
              >
                Client Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
