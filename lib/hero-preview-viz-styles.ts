import type { CSSProperties } from "react";

/**
 * Shared type scale for hero carousel **report preview** panes (Physical Stack + Worldview).
 * Keeps tab-to-tab density and hierarchy aligned.
 */
export const heroPreviewViz = {
  pad: "16px 20px 0" as const,
  rowGap: 4,
  /** STRATEGY · APAC / Capital Intelligence — eyebrow */
  eyebrow: {
    fontSize: 9.5,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "oklch(48% 0.08 70)",
    fontWeight: 600,
  } satisfies CSSProperties,
  /** Physical: report title in-card */
  reportTitle: {
    fontSize: 12.5,
    fontWeight: 700,
    color: "oklch(16% 0.06 70)",
    fontFamily: "var(--font-serif), ui-serif, Georgia, Cambria, serif",
    lineHeight: 1.28,
  } satisfies CSSProperties,
  /** Italic deck / preview hint (Worldview intro + Physical hint) */
  deckItalic: {
    fontSize: 10.5,
    color: "oklch(38% 0.05 70)",
    lineHeight: 1.55,
    fontStyle: "italic" as const,
    fontFamily: "var(--font-serif), ui-serif, Georgia, Cambria, serif",
  } satisfies CSSProperties,
  /** Section number */
  rowNum: {
    fontSize: 9.5,
    color: "oklch(48% 0.04 70)",
    fontWeight: 500,
  } satisfies CSSProperties,
  /** Primary row label (Power, DEMAND LAYER, …) */
  rowPrimary: {
    fontSize: 11,
    fontWeight: 600,
    color: "oklch(18% 0.06 70)",
  } satisfies CSSProperties,
  /** Worldview uppercase layer tag — slightly smaller than mixed-case titles */
  layerTag: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.11em",
    textTransform: "uppercase" as const,
  } satisfies CSSProperties,
  /** Secondary line next to layer (Hyperscalers in APAC) */
  rowSecondary: {
    fontSize: 9.5,
    color: "oklch(42% 0.04 70)",
    letterSpacing: "0.03em",
  } satisfies CSSProperties,
  /** Status chip in Physical preview */
  statusBadge: {
    fontSize: 8,
    padding: "2px 6px",
    borderRadius: 2,
    fontWeight: 700,
    letterSpacing: "0.04em",
  } satisfies CSSProperties,
  /** Large stat on expand */
  statFigure: {
    fontSize: 18,
    fontWeight: 700,
    color: "oklch(18% 0.06 70)",
    fontFamily: "var(--font-serif), ui-serif, Georgia, Cambria, serif",
  } satisfies CSSProperties,
  /** Stat description line */
  statCaption: {
    fontSize: 9,
    color: "oklch(40% 0.04 70)",
    lineHeight: 1.45,
  } satisfies CSSProperties,
  /** Notes / player lines */
  detailText: {
    fontSize: 9,
    color: "oklch(44% 0.04 70)",
    lineHeight: 1.45,
    fontStyle: "italic" as const,
    fontFamily: "var(--font-serif), ui-serif, Georgia, Cambria, serif",
  } satisfies CSSProperties,
  playerName: {
    fontSize: 9.5,
    fontWeight: 600,
    minWidth: 78,
    flexShrink: 0,
  } satisfies CSSProperties,
  playerNote: {
    fontSize: 9,
    color: "oklch(44% 0.04 70)",
    lineHeight: 1.45,
  } satisfies CSSProperties,
  rowPadding: "10px 12px",
  rowPaddingWorldview: "10px 12px",
} as const;
