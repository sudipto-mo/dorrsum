import Link from "next/link";
import { getVerifiedSessionPayload } from "@/lib/get-session";
import LogoutButton from "@/components/LogoutButton";
import UserSessionAvatar from "@/components/UserSessionAvatar";

export default async function NavAuthBadge() {
  const user = await getVerifiedSessionPayload();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <UserSessionAvatar name={user.name} email={user.email} />
        <LogoutButton />
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center rounded-sm border border-[var(--pa-nav-border)] bg-white/90 px-3 py-1.5 font-[family-name:var(--font-brand),sans-serif] text-[11px] font-semibold uppercase tracking-[0.1em] text-[oklch(20%_0.06_258/0.9)] no-underline transition-colors hover:border-[rgba(20,40,80,0.18)] hover:text-[oklch(20%_0.06_258)]"
    >
      Sign In
    </Link>
  );
}
