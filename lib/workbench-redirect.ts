import { NextRequest, NextResponse } from "next/server";

/** Path to static credit draft (default `/credit-workbench/`). Override with NEXT_PUBLIC_CREDIT_WORKBENCH_PATH */
export function creditWorkbenchPathname(): string {
  const p = (process.env.NEXT_PUBLIC_CREDIT_WORKBENCH_PATH || "/credit-workbench").trim() || "/credit-workbench";
  const noTrail = p.replace(/\/+$/, "");
  return noTrail.startsWith("/") ? noTrail : "/" + noTrail;
}

/** Absolute redirect to workbench with query params (OAuth return landing). */
export function redirectToWorkbench(request: NextRequest, params: Record<string, string>): NextResponse {
  const path = creditWorkbenchPathname() + "/";
  const u = new URL(path, request.url);
  for (const [k, v] of Object.entries(params)) {
    u.searchParams.set(k, v);
  }
  return NextResponse.redirect(u);
}
