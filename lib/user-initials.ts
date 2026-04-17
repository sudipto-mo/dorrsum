/** Two-letter initials for avatar chips — prefers name, then email local-part. */
export function userInitialsFromNameOrEmail(name: string, email: string): string {
  const n = name.trim();
  if (n) {
    const parts = n.split(/\s+/).filter((p) => p.length > 0);
    if (parts.length >= 2) {
      const a = parts[0][0];
      const b = parts[parts.length - 1][0];
      return (a + b).toUpperCase();
    }
    const w = parts[0] ?? "";
    if (w.length >= 2) return w.slice(0, 2).toUpperCase();
    if (w.length === 1) return (w[0] + w[0]).toUpperCase();
  }
  const local = (email.split("@")[0] ?? "").replace(/[^a-zA-Z0-9]/g, "");
  if (local.length >= 2) return local.slice(0, 2).toUpperCase();
  if (local.length === 1) return (local[0] + local[0]).toUpperCase();
  return "U";
}
