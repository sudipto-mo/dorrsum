"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export type Persona = "providers" | "sponsors" | "cross-border";

const CONTENT: Record<Persona, {
  eyebrow: string;
  title: string;
  description: string;
  forLabel: string;
  scopeItems: string[];
  cta: { label: string; href: string; primary: boolean };
  sample: { label: string; href: string } | null;
}> = {
  providers: {
    eyebrow: "Capital Providers",
    title: "Independent Credit Assessment",
    description:
      "Practitioner-grade credit assessment to stress-test complex digital infrastructure deals. We validate physical risk layers, evaluate borrower resilience, and design covenants that protect lenders through the asset lifecycle.",
    forLabel: "Corporate Banks · Private Credit · PE & Infra Funds",
    scopeItems: [
      "Deal screening & risk framework",
      "Covenant design & protection",
      "Independent credit opinion",
      "Physical risk layer validation",
    ],
    cta: { label: "Commission an Assessment →", href: "/contact", primary: true },
    sample: { label: "Helios Towers plc", href: "/research/helios-towers" },
  },
  sponsors: {
    eyebrow: "Infrastructure Sponsors",
    title: "Bankability & Capital Structuring",
    description:
      "Reverse-engineering institutional credit committee requirements to make your project financeable. We optimise PPAs and MLAs, model debt capacity, and ensure your project secures the lowest weighted average cost of capital.",
    forLabel: "Data Centre Developers · TowerCos · IPPs",
    scopeItems: [
      "Debt capacity modelling",
      "Financing mix optimisation",
      "PPA/MLA bankability review",
      "Term sheet structuring",
    ],
    cta: { label: "Engage Structuring Desk →", href: "/contact", primary: false },
    sample: null,
  },
  "cross-border": {
    eyebrow: "Cross-Border Structuring",
    title: "Coming Soon",
    description: "",
    forLabel: "",
    scopeItems: [],
    cta: { label: "Get in touch →", href: "/contact", primary: false },
    sample: null,
  },
};

const ALL_PERSONAS: Persona[] = ["providers", "sponsors", "cross-border"];

export default function AdvisoryPersonaTabs({
  initialPersona,
  isAuthenticated,
}: {
  initialPersona: Persona;
  isAuthenticated: boolean;
}) {
  const searchParams = useSearchParams();
  const rawPersona = searchParams.get("persona") as Persona | null;
  const active: Persona =
    rawPersona && ALL_PERSONAS.includes(rawPersona) ? rawPersona : initialPersona;
  const c = CONTENT[active];

  return (
    <div className="mt-12 max-w-6xl">
      {/* Active panel */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
        {active === "cross-border" && !c.description ? (
          /* Blank placeholder for Cross-Border Structuring */
          <div className="flex flex-col items-start gap-6 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/80">
              {c.eyebrow}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">{c.title}</h2>
            <p className="max-w-lg text-sm leading-relaxed text-slate-500">
              This service line is being prepared. Check back soon or reach out to discuss your mandate directly.
            </p>
            <Link
              href={c.cta.href}
              className="inline-flex w-fit items-center rounded-md border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-[13px] font-semibold text-slate-200 no-underline transition-colors hover:border-slate-600 hover:bg-slate-800/60"
            >
              {c.cta.label}
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {/* Left: description + CTA */}
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/80">
                {c.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {c.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {c.description}
              </p>

              <div className="mt-auto pt-8 flex flex-col gap-4">
                <Link
                  href={c.cta.href}
                  className={`inline-flex w-fit items-center rounded-md px-5 py-2.5 text-[13px] font-semibold no-underline transition-colors ${
                    c.cta.primary
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-600 hover:bg-slate-800/60"
                  }`}
                >
                  {c.cta.label}
                </Link>
                {c.sample && (
                  <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      Sample Brief
                    </p>
                    <Link
                      href={c.sample.href}
                      className="text-[12px] font-medium text-blue-400/80 no-underline transition-colors hover:text-blue-300"
                    >
                      {c.sample.label} →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right: For / Scope */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">
                  Who this is for
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.forLabel.split(" · ").map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-700/60 bg-slate-800/40 px-3 py-1.5 text-[12px] font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800/60" />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-4">
                  What we deliver
                </p>
                <ul className="space-y-3">
                  {c.scopeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Credit Desk — authenticated clients, Capital Providers only */}
      {isAuthenticated && active === "providers" && (
        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-7">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/80">
                Client Tool
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">Credit Desk</h3>
              <p className="mt-1.5 text-sm text-slate-400">
                Institutional credit assessment environment for active mandates.
              </p>
            </div>
            <Link
              href="/credit-workbench"
              className="shrink-0 rounded-md bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-blue-500"
            >
              Open Credit Desk →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
