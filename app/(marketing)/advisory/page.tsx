import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import AdvisoryPersonaTabs, { type Persona } from "@/components/AdvisoryPersonaTabs";

const VALID_PERSONAS: Persona[] = ["providers", "sponsors", "cross-border"];

function parsePersona(raw: string | undefined): Persona {
  if (raw && (VALID_PERSONAS as string[]).includes(raw)) return raw as Persona;
  return "providers";
}

const PERSONA_META: Record<Persona, { title: string; description: string }> = {
  providers: {
    title: "Advisory — Credit Assessment | Principal AI",
    description:
      "Independent credit assessment for banks, private credit, and infrastructure funds evaluating APAC digital infrastructure deals.",
  },
  sponsors: {
    title: "Advisory — Capital Structuring | Principal AI",
    description:
      "Bankability and capital structuring advisory for data centre developers, TowerCos, and IPPs across APAC.",
  },
  "cross-border": {
    title: "Advisory — Cross-Border Structuring | Principal AI",
    description:
      "Cross-border capital structures for TMT and digital infrastructure across GIFT IFSC, Singapore, Mauritius, and onshore India.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  return PERSONA_META[parsePersona(sp.persona)];
}

export default async function AdvisoryPage({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}) {
  const sp = await searchParams;
  const initialPersona: Persona = parsePersona(sp.persona);

  /** Gate cross-border in production — same pattern as Origination. */
  const crossBorderEnabled =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENABLE_CROSS_BORDER === "1";
  if (initialPersona === "cross-border" && !crossBorderEnabled) {
    redirect("/advisory");
  }

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
