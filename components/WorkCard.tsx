"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type WorkCardProps = {
  type: string;
  title: string;
  subtitle?: string;
  date: string;
  region: string;
  accent: string;
  light: boolean;
  href: string;
  children: ReactNode;
};

export default function WorkCard({
  type,
  title,
  subtitle,
  date,
  region,
  accent,
  light,
  href,
  children,
}: WorkCardProps) {
  const bg = light ? "bg-[oklch(95%_0.014_82)]" : "bg-[oklch(10%_0.048_255)]";
  const titleColor = light ? "text-[oklch(14%_0.07_258)]" : "text-white";
  const subtitleColor = light ? "text-[oklch(35%_0.05_70)]" : "text-white/80";
  const metaColor = light ? "text-[oklch(48%_0.04_70)]" : "text-white/55";
  const fadeTo = light
    ? "from-transparent via-[oklch(95%_0.014_82/0.4)] to-[oklch(95%_0.014_82)]"
    : "from-transparent via-[oklch(10%_0.048_255/0.5)] to-[oklch(10%_0.048_255)]";

  return (
    <article
      className={`group relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-md border border-black/[0.06] shadow-[0_18px_40px_-20px_rgba(15,25,55,0.25)] transition-[box-shadow] duration-300 hover:shadow-[0_28px_56px_-18px_rgba(15,25,55,0.38)] ${bg}`}
      style={{ borderLeftWidth: 3, borderLeftColor: accent }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {children}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t ${fadeTo}`}
          style={{ height: "45%" }}
          aria-hidden
        />
        <Link
          href={href}
          className="absolute right-3 top-3 flex h-9 w-9 scale-90 items-center justify-center rounded-full border border-black/10 bg-white/90 text-[oklch(15%_0.07_258)] opacity-0 shadow-sm transition-all duration-300 hover:bg-white group-hover:scale-100 group-hover:opacity-100"
          aria-label={`Open ${title}`}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <footer className="shrink-0 px-5 pb-5 pt-4">
        <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${metaColor}`}>{type}</p>
        <h3 className={`mt-2 font-[family-name:var(--font-serif)] text-xl font-bold leading-snug ${titleColor}`}>
          {title}
        </h3>
        {subtitle ? (
          <p className={`mt-1.5 font-[family-name:var(--font-serif)] text-sm italic leading-snug ${subtitleColor}`}>
            {subtitle}
          </p>
        ) : null}
        <p className={`mt-2.5 text-[12px] font-medium uppercase tracking-[0.12em] ${metaColor}`}>
          {date} · {region}
        </p>
      </footer>
    </article>
  );
}
