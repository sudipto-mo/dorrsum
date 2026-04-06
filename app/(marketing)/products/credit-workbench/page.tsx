import Link from "next/link";

export const metadata = {
  title: "Institutional Credit Desk | Principal AI",
};

export default function CreditWorkbenchProductPage() {
  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-3xl sm:text-4xl text-slate-50 tracking-tight font-semibold mb-4">Institutional Credit Desk</h1>
      <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-8 m-0">
        Telecom and infrastructure-style indicative credit briefs: structured sections, screened metrics, and an explicit
        analyst review layer. Indicative quantitative output — analyst verification required prior to committee submission.
      </p>
      <p className="mb-8">
        <Link
          href="/credit-workbench"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold no-underline transition-colors shadow-[0_0_20px_rgba(37,99,235,0.2)]"
        >
          Open Institutional Credit Desk
        </Link>
      </p>
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 m-0">Sign-in</h2>
        <p className="text-slate-300 leading-relaxed text-sm m-0">
          Full-report actions use LinkedIn and/or Google OAuth where configured. API routes live under{" "}
          <code className="text-slate-400 bg-slate-950/60 px-1.5 py-0.5 rounded text-xs border border-slate-800">
            /api/auth/
          </code>{" "}
          on the same host.
        </p>
      </div>
      <p className="m-0">
        <Link href="/products" className="text-blue-500 hover:text-blue-400 font-medium no-underline text-sm">
          ← All products
        </Link>
      </p>
    </div>
  );
}
