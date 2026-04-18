"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-md px-3 py-2 text-[13px] font-medium tracking-wide text-slate-400 transition-colors no-underline hover:bg-white/[0.04] hover:text-slate-100 md:inline-block md:py-2 ${className}`}
    >
      {children}
    </Link>
  );
}

type AdvisoryItem = { href: string; label: string; isWip?: boolean };

const ADVISORY_ITEMS_BASE: AdvisoryItem[] = [
  { href: "/advisory?persona=providers", label: "Credit Assessment" },
  { href: "/advisory?persona=sponsors", label: "Capital Structuring" },
];

/** Cross-Border is WIP — visible in dev or when NEXT_PUBLIC_ENABLE_CROSS_BORDER=1. */
const isCrossBorderEnabled =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_ENABLE_CROSS_BORDER === "1";

const ADVISORY_ITEMS: AdvisoryItem[] = isCrossBorderEnabled
  ? [
      ...ADVISORY_ITEMS_BASE,
      { href: "/advisory?persona=cross-border", label: "Cross-Border Structuring", isWip: true },
    ]
  : ADVISORY_ITEMS_BASE;

function AdvisoryDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/advisory"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium tracking-wide text-slate-400 transition-colors no-underline hover:bg-white/[0.04] hover:text-slate-100"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Advisory
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </Link>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-1.5">
          <div className="min-w-[230px] overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1220] shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {ADVISORY_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setOpen(false); onNavigate?.(); }}
                className="flex items-center justify-between px-4 py-3 no-underline transition-colors hover:bg-white/[0.05] group"
              >
                <p className="text-[13px] font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {item.label}
                </p>
                {"isWip" in item && item.isWip && (
                  <span className="ml-3 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/25">
                    WIP
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteNavbar({ authBadge, authNavItems }: { authBadge?: React.ReactNode; authNavItems?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      ref={navRef}
      className="print:hidden sticky top-0 z-50 border-b border-slate-800/70 bg-[#0B0F19]/92 backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="mx-auto flex h-[3.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-16 md:gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 no-underline hover:opacity-95 sm:gap-3"
          onClick={() => {
            closeMobile();
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/15">
            P
          </div>
          <span className="text-[15px] font-semibold tracking-wide text-slate-100">Principal AI</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-8 lg:gap-10">
          <div className="hidden shrink-0 items-center md:flex md:gap-8 lg:gap-10">
            <NavLink href="/research" className="px-2 md:px-3">
              Research
            </NavLink>
            {authNavItems}
            <AdvisoryDropdown />
            <NavLink href="/contact" className="px-2 md:px-3">
              Contact
            </NavLink>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {authBadge}
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-300 hover:bg-white/[0.06] md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="site-nav-mobile"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div id="site-nav-mobile" className="border-t border-slate-800/80 bg-[#0B0F19] md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 pb-6">
            <NavLink href="/research" onClick={closeMobile}>
              Research
            </NavLink>
            {authNavItems}
            <div>
              <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                Advisory
              </p>
              {ADVISORY_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href} onClick={closeMobile} className="pl-6">
                  <span className="flex items-center gap-2">
                    {item.label}
                    {"isWip" in item && item.isWip && (
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/25">
                        WIP
                      </span>
                    )}
                  </span>
                </NavLink>
              ))}
            </div>
            <NavLink href="/contact" onClick={closeMobile}>
              Contact
            </NavLink>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
