import type { Metadata } from "next";
import CoverageSectors from "@/components/CoverageSectors";
import { getSession } from "@/lib/get-session";

export const metadata: Metadata = {
  title: "Coverage & Research | Principal AI",
  description:
    "Institutional credit briefs, covenant stress-testing, and Telecom infrastructure deep-dives. Access is strictly gated for authenticated clients.",
};

export default async function ProductsPage() {
  const isAuthenticated = await getSession();
  return <CoverageSectors isAuthenticated={isAuthenticated} />;
}
