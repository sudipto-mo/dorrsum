import type { PhysicalStackTocItem } from "@/lib/physical-stack-contents";

type Props = {
  items: PhysicalStackTocItem[];
  /** Optional intro line under the Contents heading (omit when redundant with the list). */
  description?: string;
  /** When true, rows link to in-page anchors in the full report. */
  linkable: boolean;
};

function StatusLine({ status, statusColor }: { status: string; statusColor: string }) {
  return (
    <span
      className="max-w-[11rem] shrink-0 border-l-2 pl-2.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-[var(--pa-muted)] sm:max-w-[13rem] sm:text-[11px]"
      style={{ borderColor: statusColor }}
    >
      {status}
    </span>
  );
}

/** Shared Contents block for Digital Infrastructure Stack reports (Physical Stack, Worldview, …). */
export default function ResearchReportContents({ items, description, linkable }: Props) {
  const deck = description?.trim();

  const rowLayout =
    "flex w-full items-baseline gap-3 border-b border-[color:var(--pa-border)] py-3.5 last:border-b-0 sm:gap-4";

  const interactive =
    "-mx-1 rounded-sm px-1 py-0.5 no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--pa-band)_60%,var(--pa-page))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa-focus)]";

  return (
    <nav
      className="mb-10 border-y border-[color:var(--pa-border)] bg-[color-mix(in_srgb,var(--pa-band)_32%,var(--pa-page))] py-7 sm:py-8"
      aria-label="Report contents"
    >
      <h2 className="mt-0 border-b border-[color:var(--pa-border)] pb-2 text-xl font-semibold leading-snug text-[var(--pa-navy-deep)]">
        Contents
      </h2>
      {deck ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--pa-muted)] sm:text-base sm:leading-7">
          {deck}
        </p>
      ) : null}
      <ol className={deck ? "mt-6 list-none space-y-0 p-0" : "mt-4 list-none space-y-0 p-0"}>
        {items.map((item) => {
          const inner = (
            <>
              {item.num != null && item.num.length > 0 ? (
                <span className="w-7 shrink-0 pt-0.5 text-sm tabular-nums text-[var(--pa-muted)]">{item.num}.</span>
              ) : (
                <span className="w-7 shrink-0" aria-hidden />
              )}
              <span className="min-w-0 flex-1 font-serif-display text-[1.0625rem] font-medium leading-snug text-[var(--pa-navy)] sm:text-lg">
                {item.title}
              </span>
              <StatusLine status={item.status} statusColor={item.statusColor} />
            </>
          );

          if (linkable) {
            return (
              <li key={item.anchorId}>
                <a href={`#${item.anchorId}`} className={`${rowLayout} ${interactive}`}>
                  {inner}
                </a>
              </li>
            );
          }

          return (
            <li key={item.anchorId} className={rowLayout}>
              {inner}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
