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
import { PHYSICAL_STACK_TOC } from "@/lib/physical-stack-contents";
import { paEditorialTitleModule } from "@/lib/editorial-typography";

const report = getStackReport("physical-stack");
const prevReport = getStackReport("worldview");

export const metadata: Metadata = {
  title: `${stackReportFullTitle(report)} | Principal AI`,
  description:
    "Digital Infrastructure Stack — where the bottlenecks are: an APAC supply chain map across power, silicon, cooling, land, connectivity, and construction — mapped by constraint status.",
  robots: { index: true, follow: true },
};

export default async function PhysicalStackPage() {
  const isAuthenticated = await getSession();
  const content = isAuthenticated ? await getResearchContent("dc-physical-stack") : null;

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
            Asia-Pacific&apos;s AI infrastructure buildout has moved from ambition to large-scale execution. By end-2025,
            the region&apos;s total development pipeline reached a record 19.4 GW — with 13.8 GW operational, 3.7 GW under
            construction, and 15.7 GW in planning (Cushman &amp; Wakefield, March 2026). Southeast Asia alone accounts
            for 31% of capacity currently under construction, with a significant delivery cycle expected through 2026.
            But capital is no longer the binding constraint — the physical supply chain is. Power interconnection
            timelines of 18–36 months, transmission grid limits in key markets like Singapore, and a global scramble
            for liquid cooling hardware are reshaping where and how fast AI data centres can be built.
          </p>
          <p>
            This note maps the six critical supply chain nodes that determine project timelines across APAC. Each node
            is classified by its current constraint status — from binding bottleneck to commoditising — to help
            investors and operators identify where risk and opportunity sit in the infrastructure stack.
          </p>
        </div>

        <ResearchReportContents items={PHYSICAL_STACK_TOC} linkable={Boolean(isAuthenticated && content)} />

        {/* Authenticated: full content */}
        {isAuthenticated && content ? (
          <>
            <article
              className="prose-research mt-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="mt-16 flex items-center justify-between border-t border-[color:var(--pa-border)] pb-20 pt-8 text-sm">
              <Link href="/research/dc-infrastructure" className="text-[var(--pa-muted)] transition-colors no-underline hover:text-[var(--pa-text)]">
                ← {DIGITAL_INFRASTRUCTURE_STACK}
              </Link>
              <a href="/research/dc-infrastructure/worldview" className="text-[var(--pa-link)] transition-colors no-underline hover:text-[var(--pa-link-hover)]">
                {stackReportFullTitle(prevReport)}
              </a>
            </div>
          </>
        ) : (
          /* Unauthenticated: gradient fade + paywall card */
          <div className="relative mt-8 pb-20">
            {/* Blurred continuation hint */}
            <div className="pointer-events-none select-none overflow-hidden rounded-sm opacity-30 blur-[3px]">
              <p className="text-[15px] leading-relaxed text-[var(--pa-muted)]">
                Power availability — not capital, not demand — is the single largest determinant of APAC data centre
                project completion. Nearly half of industry respondents cite grid access as the primary barrier to
                delivery. Southeast Asian data centre power demand is set to quadruple from 2.6 GW to 10.7 GW between
                2025 and 2035...
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
                href={`/login?returnTo=${encodeURIComponent("/research/dc-infrastructure/physical-stack")}`}
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
