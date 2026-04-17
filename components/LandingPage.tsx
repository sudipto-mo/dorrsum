import Link from "next/link";
import EcosystemMapTeaser from "@/components/EcosystemMapTeaser";

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
    <div className="min-h-full w-full text-slate-50 font-sans selection:bg-blue-500/25">
      {/* 1) Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-56 right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-indigo-500/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.10),transparent_35%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-16 md:pb-20 md:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* Left: text stack */}
            <div className="min-w-0">
              <p className="inline-flex items-center rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200/90">
                APAC · Digital Infrastructure Advisory
              </p>

              <h1 className="mt-6 text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
                Pricing Risk at the Digital Infrastructure Nexus.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Independent, practitioner-grade credit assessment and capital structuring. We evaluate the physical
                layer where Tech, Real Estate, and Power converge.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/research"
                  className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-blue-500"
                >
                  Explore Research
                </Link>
                <Link
                  href="/advisory"
                  className="inline-flex items-center rounded-md border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-[13px] font-semibold text-slate-200 no-underline transition-colors hover:border-slate-600 hover:bg-slate-900/60"
                >
                  Advisory Services
                </Link>
              </div>

            </div>

            {/* Right: map showroom window */}
            <div className="min-w-0">
              <EcosystemMapTeaser compact />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Conviction */}
      <section id="the-commitment" className="scroll-mt-24 border-t border-slate-800/80 bg-[#070B12]">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-300/80">THE CONVICTION</p>
          <p className="mt-10 text-3xl font-semibold leading-[1.18] tracking-[-0.01em] text-white sm:text-4xl md:text-[2.75rem]">
            Efficient capital is the backbone of digital sovereignty.
          </p>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Better capital allocation for TMT means more data centers and towers built at a lower cost of capital. We
            de-risk the infrastructure that powers the modern economy.
          </p>
        </div>
      </section>

      {/* 4) Dual-sided mandates */}
      <section className="border-t border-slate-800/80 bg-[#0B0F19]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Advising Across the Capital Stack
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/80">Capital Providers</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Independent Credit Assessment</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Practitioner-grade credit assessment frameworks to stress-test complex digital infrastructure deals,
                validate physical risk layers, and screen for structural alpha before deployment.
              </p>
              <div className="mt-6 rounded-xl border border-slate-800/70 bg-slate-950/40 px-5 py-4">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Target</p>
                <p className="mt-2 text-sm text-slate-300">For Corporate Banks, Private Credit, PE.</p>
                <p className="mt-4 m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Mandate</p>
                <p className="mt-2 text-sm text-slate-300">Independent Credit Assessment.</p>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300/80">
                Infrastructure Sponsors
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Bankability &amp; Capital Structuring</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Reverse-engineering institutional credit committee requirements to optimize PPAs and MLAs, ensuring
                projects secure the lowest weighted average cost of capital.
              </p>
              <div className="mt-6 rounded-xl border border-slate-800/70 bg-slate-950/40 px-5 py-4">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Target</p>
                <p className="mt-2 text-sm text-slate-300">For Data Centre Developers, TowerCos, IPPs.</p>
                <p className="mt-4 m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Mandate</p>
                <p className="mt-2 text-sm text-slate-300">Bankability &amp; Capital Structuring.</p>
              </div>
            </article>
          </div>

          {/* 4) Expertise grid */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {expertise.map((col) => (
              <article
                key={col.title}
                className="rounded-2xl border border-slate-800/70 bg-slate-950/20 p-7"
                aria-label={col.title}
              >
                <h3 className="text-base font-semibold tracking-tight text-slate-100">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/80" aria-hidden />
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
