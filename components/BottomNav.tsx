import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface BottomNavProps {
  prevLabel?: string;
  prevHref?: string;
  nextLabel?: string;
  nextHref?: string;
  subText?: string;
  prevDescription?: string;
  nextDescription?: string;
}

function splitInstitutionalLine(text: string): { left: string; right: string } {
  const idx = text.indexOf("—");
  if (idx === -1) {
    return { left: text.trim(), right: "client login" };
  }
  return {
    left: text.slice(0, idx).trim(),
    right: text.slice(idx + 1).trim(),
  };
}

export default function BottomNav({
  prevLabel = "AI infrastructure network",
  prevHref = "/dc-network-map.html",
  nextLabel = "Helios credit brief",
  nextHref = "/research/helios-towers",
  subText = "Full institutional research — client login",
  prevDescription = "Return to ecosystem overview",
  nextDescription = "Explore deeper models & covenants",
}: BottomNavProps) {
  const { left, right } = splitInstitutionalLine(subText);

  return (
    <footer className="w-full border-t border-slate-800 bg-[#050505] text-slate-400">
      <div className="grid grid-cols-1 divide-y divide-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0">
        <Link href={prevHref} className="group p-8 transition-colors hover:bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
            <ArrowLeft className="h-3 w-3 shrink-0" aria-hidden />
            {prevLabel}
          </div>
          <p className="mt-2 text-sm transition-colors group-hover:text-white">{prevDescription}</p>
        </Link>

        <Link href={nextHref} className="group p-8 text-right transition-colors hover:bg-slate-900/50">
          <div className="flex items-center justify-end gap-2 text-xs font-mono uppercase tracking-widest text-blue-500">
            Next: {nextLabel}
            <ArrowRight className="h-3 w-3 shrink-0" aria-hidden />
          </div>
          <p className="mt-2 text-sm transition-colors group-hover:text-white">{nextDescription}</p>
        </Link>
      </div>

      <div className="border-t border-slate-800 py-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">
          {left}
          {" — "}
          <Link href="/login" className="ml-1 text-blue-600 transition-colors hover:text-blue-400">
            {right}
          </Link>
        </p>
      </div>
    </footer>
  );
}
