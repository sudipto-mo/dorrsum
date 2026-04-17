import { redirect } from "next/navigation";

/** /coverage is the legacy URL — canonical page is /research */
export default function CoveragePage() {
  redirect("/research");
}
