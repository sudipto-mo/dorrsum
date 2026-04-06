"use client";

/**
 * Desk UI lives in public/credit-workbench/index.html (single compact header + export).
 */
export default function CreditWorkbenchClient() {
  return (
    <iframe
      title="Institutional Credit Desk"
      src="/credit-workbench/index.html?embed=1"
      className="block min-h-0 min-h-[100dvh] w-full flex-1 border-0 bg-[#0B0F19]"
    />
  );
}
