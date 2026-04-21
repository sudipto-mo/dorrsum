import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function ApproachPage() {
  return (
    <div className="relative left-1/2 right-auto w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-[var(--pa-page)] text-[var(--pa-text)] font-sans antialiased">
      <div className="relative z-[1] px-6">
        {/* Hero — compact, front-loaded */}
        <header className="max-w-5xl mx-auto pt-16 pb-12">
          <h1 className="m-0 mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#7b8794]">The Approach</h1>
          <h2 className="m-0 mb-6 text-5xl font-bold tracking-tight text-[var(--pa-navy)]">Origination as Alpha.</h2>
          <p className="m-0 max-w-3xl text-xl leading-relaxed text-[var(--pa-muted)]">
            In fast-moving markets, latency is a deal-killer. This framework equips the Coverage Banker to move from
            &apos;First Meeting&apos; to &apos;Term Sheet&apos; with the speed of a fintech and the structural rigor
            of a Tier-1 Institution.
          </p>
        </header>

        {/* Before & after */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="m-0 mb-3 text-lg font-semibold tracking-tight text-[var(--pa-navy)]">The Origination Bottleneck</h3>
            <p className="m-0 text-base leading-relaxed text-[var(--pa-muted)]">
              The path to a &apos;Go/No-Go&apos; decision is stalled by manual heavy lifting. Precious days are lost
              spreading messy, multi-entity financials from PDFs, and losing 48 hours to a &apos;v0.1&apos; draft means
              losing the mandate.
            </p>
          </div>
          <div>
            <h3 className="m-0 mb-3 text-lg font-semibold tracking-tight text-[var(--pa-navy)]">The Virtual Deal Team</h3>
            <p className="m-0 text-base leading-relaxed text-[var(--pa-muted)]">
              An agentic hierarchy mirroring a classic deal team. A &apos;Deal Coordinator&apos; orchestrates the workstream
              for IC memos, while &apos;Specialist Agents&apos; handle high-fidelity OCR extraction and instant modeling
              of Cash Flow Conversion and Leverage.
            </p>
          </div>
        </div>

        {/* Reality check — full-width band */}
        <div className="relative left-1/2 mb-16 w-screen -translate-x-1/2 border-y border-[color:var(--pa-border)] bg-[var(--pa-band)] px-6 py-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="m-0 mb-4 text-2xl font-semibold tracking-tight text-[var(--pa-navy)]">
              Professional Insight Over &apos;AI Noise&apos;
            </h2>
            <p className="mx-auto m-0 max-w-3xl text-base leading-relaxed text-[var(--pa-muted)] sm:text-lg">
              AI is a high-performance engine, but it requires a &apos;Master Driver&apos;. While screening a global
              Packaging prospect, a generic AI misidentified &apos;Bills Payable&apos; as standard Accounts Payable. To a machine,
              it&apos;s a generic liability; to a Senior Banker, it is Bank Debt that triggers a covenant breach. As the Master
              Driver, I hardwire this credit judgment into the engine to deliver true structuring alpha.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="max-w-5xl mx-auto text-center pb-20" aria-labelledby="approach-cta-heading">
          <h2 id="approach-cta-heading" className="m-0 mb-6 text-2xl font-semibold text-[var(--pa-navy)]">
            Ready to accelerate your deal cycle?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[var(--pa-navy)] bg-[var(--pa-navy)] px-8 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-[var(--pa-navy-deep)] sm:w-auto"
            >
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
              Submit a Mandate
            </Link>
            <a
              href="/Principal_AI_Strategic_Briefing.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[color:var(--pa-border)] bg-white px-8 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--pa-navy)] no-underline transition-colors hover:border-[#bcc4ce] sm:w-auto"
            >
              <Download className="w-4 h-4 shrink-0 opacity-80" aria-hidden />
              Download Strategic Briefing
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
