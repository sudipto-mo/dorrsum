import Link from "next/link";
import type { ResearchArtifact } from "@/lib/research-archive";

/**
 * HeroBriefSlide
 *
 * A single-page representation of a research brief, sized to sit inside the
 * hero-column carousel. Styled as if you are looking at the cover page of a
 * printed institutional brief: oxblood masthead, serif headline, byline rule,
 * excerpt, and a quiet CTA at the foot.
 */
export default function HeroBriefSlide({ item }: { item: ResearchArtifact }) {
  const body = (
    <article className="relative flex h-full w-full flex-col overflow-hidden rounded-sm border border-[color:var(--pa-border)] bg-white shadow-[0_10px_28px_-14px_rgba(31,36,48,0.25)]">
      {/* Oxblood masthead */}
      <div className="flex items-center justify-between bg-[var(--pa-signature)] px-5 py-3 text-white sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
          {item.issueLabel}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-90">
          {item.category}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--pa-border)] pb-3 text-[11px] uppercase tracking-[0.18em] text-[#7b8794]">
          <span className="font-semibold">{item.date}</span>
          <span className="truncate">
            {item.authors.join(" · ")}
            {item.pages ? ` · ${item.pages} pp` : ""}
          </span>
        </div>

        <h3 className="font-serif-display text-[1.5rem] font-normal leading-[1.15] text-[var(--pa-navy)] sm:text-[1.75rem]">
          {item.title}
        </h3>

        <p className="text-[14px] leading-[1.75] text-[var(--pa-muted)]">
          {item.excerpt}
        </p>

        {/* Footer row — access + CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-[color:var(--pa-border)] pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b8794]">
            {accessLabel(item.access)}
          </span>
          {item.href ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pa-signature)]">
              Read brief →
            </span>
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8794]">
              Forthcoming
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block h-full w-full no-underline">
        {body}
      </Link>
    );
  }

  return <div className="h-full w-full">{body}</div>;
}

function accessLabel(a: ResearchArtifact["access"]) {
  if (a === "open") return "Open Access";
  if (a === "teaser") return "Excerpt · Full Piece Gated";
  if (a === "client") return "Client Access";
  return "Open Access";
}
