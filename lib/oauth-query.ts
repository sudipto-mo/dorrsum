export function queryFromUrl(fullUrl: string): Record<string, string> {
  try {
    const u = new URL(fullUrl);
    const q: Record<string, string> = Object.create(null);
    u.searchParams.forEach((v, k) => {
      q[k] = v;
    });
    return q;
  } catch {
    return Object.create(null);
  }
}

export function trimEnv(s: string | undefined): string {
  return typeof s === "string" ? s.trim() : "";
}

export function protoSecure(request: NextRequestLike): boolean {
  const xf = (request.headers.get("x-forwarded-proto") || "").split(",")[0].trim();
  return xf === "https";
}

type NextRequestLike = { headers: { get(name: string): string | null } };

export function decodeJwtPayload(jwt: string | null | undefined): Record<string, unknown> | null {
  if (!jwt || typeof jwt !== "string") return null;
  const parts = jwt.split(".");
  if (parts.length < 2) return null;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}
