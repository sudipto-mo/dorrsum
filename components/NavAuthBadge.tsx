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
      className="inline-flex items-center justify-center rounded-md border border-slate-700 px-3 py-1.5 text-[12px] font-semibold text-slate-300 no-underline transition-colors hover:border-slate-500 hover:text-white"
    >
      Sign In
    </Link>
  );
}
