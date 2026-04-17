import type { Metadata } from "next";
import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import AdvisoryPersonaTabs, { type Persona } from "@/components/AdvisoryPersonaTabs";

const PERSONA_META: Record<Persona, { title: string; description: string }> = {
  providers: {
    title: "Advisory — Capital Providers | Principal AI",
    description:
      "Independent credit assessment for banks, private credit, and infrastructure funds evaluating APAC digital infrastructure deals.",
  },
  sponsors: {
    title: "Advisory — Infrastructure Sponsors | Principal AI",
    description:
      "Bankability and capital structuring advisory for data centre developers, TowerCos, and IPPs across APAC.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const persona = sp.persona === "sponsors" ? "sponsors" : "providers";
  return PERSONA_META[persona];
}

export default async function AdvisoryPage({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}) {
  const sp = await searchParams;
  const initialPersona: Persona = sp.persona === "sponsors" ? "sponsors" : "providers";
  const isAuthenticated = await getSession();

  return (
    <div className="w-full">
      {/* Header */}
      <header className="max-w-6xl border-b border-slate-800 pb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/80">
          Independent Advisory
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Across the Capital Stack
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          For those evaluating deals and those building them — practitioner-grade
          advisory on APAC digital infrastructure transactions.
        </p>
      </header>

      <Suspense>
        <AdvisoryPersonaTabs
          initialPersona={initialPersona}
          isAuthenticated={isAuthenticated}
        />
      </Suspense>
    </div>
  );
}
