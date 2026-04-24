"use client";

import { useState } from "react";

export default function LogoutButton() {
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Logout failed");
      window.location.assign("/");
    } catch {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-sm border border-[var(--pa-nav-border)] bg-white/90 px-3 py-1.5 font-[family-name:var(--font-brand),sans-serif] text-[10px] font-semibold uppercase tracking-[0.13em] text-[oklch(20%_0.06_258/0.85)] transition-colors hover:border-[rgba(20,40,80,0.14)] hover:text-[oklch(20%_0.06_258)] disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Log out"}
    </button>
  );
}
