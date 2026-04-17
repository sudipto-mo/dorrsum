import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { getSession } from "@/lib/get-session";
import { getResearchContent } from "@/lib/markdown";
import { DIGITAL_INFRASTRUCTURE_STACK, getStackReport } from "@/lib/dc-stack-reports";

const report = getStackReport("worldview");

export const metadata: Metadata = {
  title: `${report.title} — Who Is Building the AI Cloud (APAC) | Principal AI`,
  description:
    "Digital Infrastructure Stack — APAC colocation and hyperscaler landscape: who is building, where, and with whose capital. Tier 1–4 operators, hyperscaler commitments, and the capital layer financing the buildout.",
  robots: { index: true, follow: true },
};

export default async function WorldviewPage() {
  const isAuthenticated = await getSession();
  const content = isAuthenticated ? await getResearchContent("dc-worldview") : null;

  return (
    <div className="min-h-full w-full bg-[#0B0F19] text-slate-50">
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8 sm:pt-14 md:pt-16">

        {/* Breadcrumb */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Link href="/research" className="transition-colors no-underline hover:text-slate-400">
            ← Research
          </Link>
          {" · "}
          <span className="text-slate-500">Principal AI</span>
          {" · "}
          <Link href="/research/dc-infrastructure" className="transition-colors no-underline hover:text-slate-400">
            {DIGITAL_INFRASTRUCTURE_STACK}
          </Link>
          {" · "}Module 01
        </p>

        {/* Header */}
        <header className="mb-10 border-b border-slate-800/80 pb-8">
          <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {report.title}
            </h1>
          </div>
          <p className="mt-2 text-lg text-slate-400">Who Is Building the AI Cloud — APAC Edition</p>
          <p className="mt-2 text-sm text-slate-500">
            Principal AI · {DIGITAL_INFRASTRUCTURE_STACK} · April 2026
          </p>
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

        {/* Authenticated: full content */}
        {isAuthenticated && content ? (
          <>
            <article
              className="prose-research mt-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="mt-16 flex items-center justify-between border-t border-slate-800 pt-8 text-sm pb-20">
              <a href="/research/dc-infrastructure/physical-stack" className="text-slate-400 transition-colors no-underline hover:text-slate-200">
                ← Module 02: The Physical Stack
              </a>
              <Link href="/research/dc-infrastructure" className="text-blue-400 transition-colors no-underline hover:text-blue-300">
                {DIGITAL_INFRASTRUCTURE_STACK} →
              </Link>
            </div>
          </>
        ) : (
          /* Unauthenticated: blurred hint + paywall card */
          <div className="relative mt-8 pb-20">
            {/* Blurred continuation hint */}
            <div className="pointer-events-none select-none overflow-hidden rounded-lg opacity-30 blur-[3px]">
              <p className="text-[15px] leading-relaxed text-slate-300">
                The five largest US cloud and AI infrastructure providers — Microsoft, Alphabet, Amazon, Meta, and
                Oracle — have collectively committed US$660–690 billion in global capex for 2026, nearly doubling
                2025 levels. A meaningful share is flowing into APAC, where Equinix, AirTrunk, Digital Realty,
                STT GDC and a new class of domestic operators are racing to build...
              </p>
            </div>

            {/* Gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent to-[#0B0F19]"
            />

            {/* Paywall card */}
            <div className="relative mt-4 flex items-center justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-900/80 px-5 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                <p className="text-[12px] font-semibold text-slate-100">Client Access Required</p>
              </div>
              <Link
                href={`/login?returnTo=${encodeURIComponent("/research/dc-infrastructure/worldview")}`}
                className="shrink-0 rounded-md bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-blue-500"
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
