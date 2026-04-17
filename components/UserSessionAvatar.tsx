import { userInitialsFromNameOrEmail } from "@/lib/user-initials";

export default function UserSessionAvatar({ name, email }: { name: string; email: string }) {
  const initials = userInitialsFromNameOrEmail(name, email);
  const label = name.trim() || email || "Signed in";

  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] via-[#6366f1] to-[#c026d3] text-[11px] font-bold leading-none tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] shadow-lg shadow-blue-500/20"
      title={label}
      aria-label={`Signed in as ${label}`}
    >
      <span aria-hidden="true">{initials}</span>
    </span>
  );
}
