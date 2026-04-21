import HeroPreview from "@/components/HeroPreview";

const expertise = [
  {
    title: "Credit Assessment",
    items: ["6-layer TMT ecosystem framework", "Risk transformation analysis", "Sector-specific covenants"],
  },
  {
    title: "Capital Structuring",
    items: ["Debt capacity & leverage modeling", "Optimal financing mix", "Term sheet review"],
  },
  {
    title: "Trend Intelligence",
    items: ["AI infrastructure demand", "Power & energy transition impact", "Regulatory risk"],
  },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-full w-full bg-[var(--pa-page)] text-[var(--pa-text)]">
      <HeroPreview />

      <section id="the-commitment" className="scroll-mt-24 border-b border-[color:var(--pa-border)] bg-[var(--pa-band)]">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b7280]">What We Believe</p>
          <p className="font-serif-display mt-8 text-3xl font-light leading-[1.22] text-[var(--pa-navy)] sm:text-4xl md:text-[2.5rem]">
            Better capital allocation is a strategic{" "}
            <span className="italic text-[var(--pa-signature)]">infrastructure question.</span>
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[var(--pa-muted)] sm:text-lg">
            We help institutions evaluate the physical and contractual layers that determine whether digital
            infrastructure can scale with resilience, bankability, and discipline.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-20">
          <h2 className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b7280]">
            Advisory Across the Capital Stack
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-sm border border-[color:var(--pa-border)] bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">Capital Providers</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--pa-navy)]">
                Independent Credit Assessment
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--pa-muted)]">
                Credit frameworks to stress-test complex digital infrastructure deals, validate physical risk layers,
                and identify structural weaknesses before capital is committed.
              </p>
              <div className="mt-6 border-t border-[color:var(--pa-border)] pt-4">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">For</p>
                <p className="mt-2 text-sm text-[var(--pa-text)]">Corporate banks, private credit, PE and infra funds.</p>
                <p className="mt-4 m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">Mandate</p>
                <p className="mt-2 text-sm text-[var(--pa-text)]">Independent credit assessment.</p>
              </div>
            </article>

            <article className="rounded-sm border border-[color:var(--pa-border)] bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Infrastructure Sponsors
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--pa-navy)]">
                Bankability &amp; Capital Structuring
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--pa-muted)]">
                Structuring support built around how investment committees, lenders, and credit providers actually
                evaluate cash flows, contracts, and downside protection.
              </p>
              <div className="mt-6 border-t border-[color:var(--pa-border)] pt-4">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">For</p>
                <p className="mt-2 text-sm text-[var(--pa-text)]">Data centre developers, TowerCos, and IPPs.</p>
                <p className="mt-4 m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">Mandate</p>
                <p className="mt-2 text-sm text-[var(--pa-text)]">Bankability and capital structuring.</p>
              </div>
            </article>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {expertise.map((col) => (
              <article
                key={col.title}
                className="rounded-sm border border-[color:var(--pa-border)] bg-white p-7"
                aria-label={col.title}
              >
                <h3 className="text-base font-semibold tracking-tight text-[var(--pa-navy)]">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--pa-muted)]">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7b8794]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
