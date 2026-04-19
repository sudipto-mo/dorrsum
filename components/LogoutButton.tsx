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
      className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-md border border-slate-600 bg-transparent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition-colors hover:border-slate-400 hover:bg-white/[0.04] hover:text-white disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Log out"}
    </button>
  );
}
