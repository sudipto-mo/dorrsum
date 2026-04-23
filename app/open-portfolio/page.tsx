import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Portfolio — DORRSUM",
  description:
    "A live, public portfolio of global TMT and digital infrastructure equities. Real fills, full transparency, updated daily.",
};

export default function OpenPortfolioPage() {
  return (
    <div className="flex min-h-0 min-h-[100dvh] flex-1 flex-col bg-[var(--pa-page)]">
      <iframe
        title="Open Portfolio"
        src="/open-portfolio/index.html?embed=1"
        className="min-h-0 w-full flex-1 border-0 bg-[var(--pa-page)]"
      />
    </div>
  );
}

