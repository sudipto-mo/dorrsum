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
  /** Post-login return path (passed as `/login?returnTo=…`). Defaults to Helios sample brief. */
  loginHref?: string;
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

const DEFAULT_LOGIN_HREF = "/login?returnTo=" + encodeURIComponent("/research/helios-towers");

export default function BottomNav({
  prevLabel = "AI infrastructure network",
  prevHref = "/dc-network-map.html",
  nextLabel = "Helios credit brief",
  nextHref = "/research/helios-towers",
  subText = "Full institutional research — client login",
  prevDescription = "Return to ecosystem overview",
  nextDescription = "Explore deeper models & covenants",
  loginHref = DEFAULT_LOGIN_HREF,
}: BottomNavProps) {
  const { left, right } = splitInstitutionalLine(subText);

  return (
    <footer className="w-full border-t border-[color:var(--pa-border)] bg-[#faf8f2] text-[var(--pa-muted)]">
      <div className="grid grid-cols-1 divide-y divide-[color:var(--pa-border)] md:grid-cols-2 md:divide-x md:divide-y-0">
        <Link href={prevHref} className="group p-8 transition-colors hover:bg-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8794]">
            <ArrowLeft className="h-3 w-3 shrink-0" aria-hidden />
            {prevLabel}
          </div>
          <p className="mt-2 text-sm transition-colors group-hover:text-[var(--pa-text)]">{prevDescription}</p>
        </Link>

        <Link href={nextHref} className="group p-8 text-right transition-colors hover:bg-white">
          <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pa-navy)]">
            Next: {nextLabel}
            <ArrowRight className="h-3 w-3 shrink-0" aria-hidden />
          </div>
          <p className="mt-2 text-sm transition-colors group-hover:text-[var(--pa-text)]">{nextDescription}</p>
        </Link>
      </div>

      <div className="border-t border-[color:var(--pa-border)] py-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7b8794]">
          {left}
          {" — "}
          <Link href={loginHref} className="ml-1 text-[var(--pa-link)] transition-colors hover:text-[var(--pa-link-hover)]">
            {right}
          </Link>
        </p>
      </div>
    </footer>
  );
}
