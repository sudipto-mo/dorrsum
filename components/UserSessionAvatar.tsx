import { userInitialsFromNameOrEmail } from "@/lib/user-initials";

export default function UserSessionAvatar({ name, email }: { name: string; email: string }) {
  const initials = userInitialsFromNameOrEmail(name, email);
  const label = name.trim() || email || "Signed in";

  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8d3c8] bg-[#243b53] text-[11px] font-bold leading-none tracking-tight text-white"
      title={label}
      aria-label={`Signed in as ${label}`}
    >
      <span aria-hidden="true">{initials}</span>
    </span>
  );
}
