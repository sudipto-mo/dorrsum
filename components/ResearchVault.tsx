import Link from "next/link";
import {
  DIGITAL_INFRASTRUCTURE_STACK,
  STACK_HUB_PATH,
  STACK_REPORT_LIST,
  type StackReport,
  stackReportSidebarMetaLine,
} from "@/lib/dc-stack-reports";

/** Reverse-chronological: higher defaultOrder (newer module) first. */
function reportsNewestFirst(list: StackReport[]): StackReport[] {
  return [...list].sort((a, b) => b.defaultOrder - a.defaultOrder);
}

export default function ResearchVault() {
  const items = reportsNewestFirst(STACK_REPORT_LIST);

  return (
    <div className="overflow-hidden border border-slate-800/70 bg-slate-950/50 backdrop-blur-md">
      <div className="border-b border-slate-800/70 px-4 py-4">
        <Link
          href={STACK_HUB_PATH}
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white no-underline transition-colors hover:text-blue-300 uppercase"
        >
          Latest intelligence
        </Link>
      </div>

      <div className="flex flex-col">
        {items.length === 0 ? (
          <div className="px-5 py-8">
            <p className="text-sm leading-relaxed text-slate-500">
              No reports listed. Open the{" "}
              <Link href={STACK_HUB_PATH} className="text-blue-400 no-underline hover:text-blue-300">
                {DIGITAL_INFRASTRUCTURE_STACK}
              </Link>{" "}
              library.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block border-b border-gray-900 px-5 py-8 no-underline transition-colors last:border-b-0 hover:bg-slate-900/40"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {stackReportSidebarMetaLine(item)}
              </p>
              <span className="mt-2 block text-[15px] font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-blue-300">
                {item.title}
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug text-slate-500">{item.subtitle}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
