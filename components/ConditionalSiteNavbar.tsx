"use client";

import { usePathname } from "next/navigation";
import SiteNavbar from "@/components/SiteNavbar";

/** Full-screen workbench: hide marketing chrome for a terminal-style layout. */
export default function ConditionalSiteNavbar() {
  const pathname = usePathname() || "";
  if (pathname === "/credit-workbench" || pathname.startsWith("/credit-workbench/")) {
    return null;
  }
  return <SiteNavbar />;
}
