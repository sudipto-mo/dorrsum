import type { CSSProperties } from "react";

/** Primary row links — same as the original `HeroPreview` fixed bar. */
export const marketingNavLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  flexShrink: 0,
  boxSizing: "border-box",
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: "oklch(20% 0.06 258)",
  cursor: "pointer",
  opacity: 0.68,
  transition: "opacity 0.2s",
  textDecoration: "none",
  whiteSpace: "nowrap",
  padding: "0 10px",
  fontFamily: "var(--font-hero-sans), DM Sans, ui-sans-serif, system-ui, sans-serif",
};

export const marketingNavShellStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: 58,
  background: "oklch(95.5% 0.010 82 / 0.9)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderBottom: "1px solid rgba(20,40,80,0.07)",
  display: "flex",
  alignItems: "center",
  padding: "0 clamp(16px, 4vw, 44px)",
  fontFamily: "var(--font-hero-sans), DM Sans, ui-sans-serif, system-ui, sans-serif",
};

export const marketingNavInnerRowStyle: CSSProperties = {
  width: "100%",
  maxWidth: 1440,
  margin: "0 auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
};

export const marketingNavBrandMarkStyle: CSSProperties = {
  width: 32,
  height: 32,
  background: "oklch(15% 0.07 258)",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: 'Libre Baskerville, var(--font-hero-serif), ui-serif, Georgia, serif',
  fontSize: 14,
  fontWeight: 700,
  color: "white",
};

export const marketingNavTitleStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "oklch(15% 0.07 258)",
};

export const marketingNavTaglineStyle: CSSProperties = {
  fontSize: 8.5,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "oklch(38% 0.06 258)",
  fontWeight: 400,
};

export const marketingNavWipBadgeStyle: CSSProperties = {
  flexShrink: 0,
  fontSize: 7.5,
  padding: "3px 7px",
  background: "oklch(46% 0.14 253)",
  color: "white",
  borderRadius: 2,
  letterSpacing: "0.07em",
  fontWeight: 700,
  textTransform: "uppercase",
};
