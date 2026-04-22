"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function GlobalOAuthFlashInner() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<{ text: string; kind: "ok" | "warn" | "err" } | null>(null);

  useEffect(() => {
    const mode = searchParams.get("oauth_auth") || searchParams.get("linkedin_auth");
    if (!mode) return;

    if (mode === "success") {
      setMessage({
        text: "You’re signed in. Your name will show in the header where sign-in is supported.",
        kind: "ok",
      });
    } else if (mode === "missing_config") {
      try {
        const u = new URL(window.location.href);
        u.searchParams.delete("oauth_auth");
        u.searchParams.delete("linkedin_auth");
        u.searchParams.delete("reason");
        window.history.replaceState({}, "", u.pathname + u.search + u.hash);
      } catch {
        /* ignore */
      }
      return;
    } else if (mode === "error") {
      const reason = searchParams.get("reason") || "Unknown error";
      setMessage({ text: `Sign-in did not complete: ${reason}`, kind: "err" });
    } else return;

    try {
      const u = new URL(window.location.href);
      u.searchParams.delete("oauth_auth");
      u.searchParams.delete("linkedin_auth");
      u.searchParams.delete("reason");
      window.history.replaceState({}, "", u.pathname + u.search + u.hash);
    } catch {
      /* ignore */
    }
  }, [searchParams]);

  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(() => setMessage(null), 12000);
    return () => window.clearTimeout(t);
  }, [message]);

  if (!message) return null;

  const bar =
    message.kind === "ok"
      ? "border-[#cdd9cc] bg-[#f4f7f1] text-[#355244]"
      : message.kind === "warn"
        ? "border-[#ddd3be] bg-[#faf6eb] text-[#715f32]"
        : "border-[#e0c8c8] bg-[#fbf2f2] text-[#7a3b3b]";

  return (
    <div
      className={`mx-auto mt-4 max-w-4xl rounded-sm border px-4 py-3 text-sm leading-relaxed print:hidden ${bar}`}
      role="status"
    >
      {message.text}
    </div>
  );
}

export default function GlobalOAuthFlash() {
  return (
    <Suspense fallback={null}>
      <GlobalOAuthFlashInner />
    </Suspense>
  );
}
