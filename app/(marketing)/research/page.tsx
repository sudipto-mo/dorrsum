import type { Metadata } from "next";
import CoverageSectors from "@/components/CoverageSectors";
import { getSession } from "@/lib/get-session";

export const metadata: Metadata = {
  title: "Research | Principal AI",
  description:
    "APAC digital infrastructure sector research — operator landscape, supply chain analysis, and full-stack coverage for Capital Providers and Infrastructure Sponsors.",
};

export default async function ResearchPage() {
  const isAuthenticated = await getSession();
  return <CoverageSectors isAuthenticated={isAuthenticated} />;
}
