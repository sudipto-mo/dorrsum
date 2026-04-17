import type { Metadata } from "next";
import CreditWorkbenchClient from "./CreditWorkbenchClient";
import { requireSession } from "@/lib/require-session";

export const metadata: Metadata = {
  title: "Institutional Credit Desk | Principal AI",
  description:
    "Structured indicative credit briefs with analyst review layer — domain-grounded workflow for institutional credit preparation.",
};

export default async function CreditWorkbenchPage() {
  await requireSession("/credit-workbench");
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <CreditWorkbenchClient />
    </div>
  );
}
