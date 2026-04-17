import { sanitizeReturnPath } from "@/lib/post-login-return";

/** Not allowed in {@link sanitizeReturnPath} output, so it cannot appear inside the path segment. */
const SEP = "~";

/**
 * Packs an optional same-origin return path into the OAuth `state` value so it survives the
 * provider round-trip without relying on `pa_post_login_return` (which can be dropped on
 * cross-site redirects in some browsers / privacy modes).
 */
export function buildOAuthState(csrfHex: string, returnToSanitized: string | null): string {
  if (!returnToSanitized) return csrfHex;
  const b64 = Buffer.from(returnToSanitized, "utf8").toString("base64url");
  return `${csrfHex}${SEP}${b64}`;
}

export function parseOAuthState(state: string): { csrf: string; returnTo: string | null } {
  if (!state || typeof state !== "string") return { csrf: "", returnTo: null };
  const i = state.indexOf(SEP);
  if (i === -1) return { csrf: state, returnTo: null };
  const csrf = state.slice(0, i);
  const b64 = state.slice(i + SEP.length);
  try {
    const raw = Buffer.from(b64, "base64url").toString("utf8");
    return { csrf, returnTo: sanitizeReturnPath(raw) };
  } catch {
    return { csrf, returnTo: null };
  }
}
