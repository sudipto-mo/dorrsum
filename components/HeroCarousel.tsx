"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * HeroCarousel
 *
 * Compact editorial carousel for the hero right-column. Shows ONE slide at a time
 * with a crossfade, because the hero column is narrower and must stay legible.
 *
 * Slides are rendered ahead of time (server-rendered or client-rendered) and
 * passed in by the parent — so the Ecosystem Map (an async server component)
 * and research brief previews can live side-by-side in the same strip.
 *
 * Controls:
 *   · Eyebrow label for the active slide
 *   · Progress pips + prev/next arrows (top-right)
 *   · Dot pagination (bottom)
 *   · Keyboard ← → when anywhere on the page
 */
export type HeroSlide = {
  /** Stable key. */
  id: string;
  /** Short label surfaced in the eyebrow ("Ecosystem Map", "Credit Brief · No. 003"). */
  label: string;
  /** Pre-rendered slide content. */
  content: ReactNode;
};

export default function HeroCarousel({
  slides,
  sectionLabel = "Featured",
  initialSlideId,
  /** Lock the slide stage to a consistent height so the hero column does not jump. */
  minHeight = "h-[620px] sm:h-[660px]",
}: {
  slides: HeroSlide[];
  sectionLabel?: string;
  initialSlideId?: string;
  minHeight?: string;
}) {
  const total = slides.length;
  const [active, setActive] = useState(() => {
    if (!initialSlideId) return 0;
    const idx = slides.findIndex((slide) => slide.id === initialSlideId);
    return idx >= 0 ? idx : 0;
  });

  const goTo = useCallback(
    (i: number) => {
      if (total === 0) return;
      const next = ((i % total) + total) % total;
      setActive(next);
    },
    [total],
  );
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      /** Only hijack arrows when no input / textarea / contenteditable has focus. */
      const t = document.activeElement;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          (t as HTMLElement).isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  useEffect(() => {
    if (!initialSlideId) return;
    const idx = slides.findIndex((slide) => slide.id === initialSlideId);
    if (idx >= 0) setActive(idx);
  }, [initialSlideId, slides]);

  if (total === 0) return null;

  const activeSlide = slides[active];

  return (
    <div className="relative w-full">
      {/* Top strip: eyebrow + progress pips + arrows */}
      <div className="flex items-center justify-between gap-4 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7b8794]">
          <span className="text-[var(--pa-navy)]">{sectionLabel}</span>
          <span className="mx-2 text-[color:var(--pa-border)]">/</span>
          <span>{activeSlide.label}</span>
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            {slides.map((s, i) => (
              <span
                key={s.id}
                className={`h-[2px] transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-[var(--pa-signature)]"
                    : "w-3 bg-[color:var(--pa-border)]"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--pa-border)] bg-white text-[var(--pa-navy)] transition-colors hover:border-[var(--pa-navy)] hover:text-[var(--pa-signature)]"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--pa-border)] bg-white text-[var(--pa-navy)] transition-colors hover:border-[var(--pa-navy)] hover:text-[var(--pa-signature)]"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      {/* Stage — all slides mounted, only active is visible; crossfades on change. */}
      <div
        className={`relative w-full overflow-hidden ${minHeight}`}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${sectionLabel} — ${active + 1} of ${total}`}
      >
        {slides.map((s, i) => {
          const isActive = i === active;
          return (
            <div
              key={s.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[420ms] ease-out ${
                isActive
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {s.content}
            </div>
          );
        })}
      </div>

      {/* Dot pagination */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === active
                ? "bg-[var(--pa-signature)]"
                : "bg-[color:var(--pa-border)] hover:bg-[var(--pa-muted)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
