"use client";

import { usePathname } from "next/navigation";
import SiteNavbar from "@/components/SiteNavbar";

const FULLSCREEN_PATHS = ["/credit-workbench"];

/** Full-screen tools: hide marketing chrome for a terminal-style layout. */
export default function ConditionalSiteNavbar({
  authBadge,
  authNavItems,
}: {
  authBadge?: React.ReactNode;
  authNavItems?: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isFullscreen = FULLSCREEN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (isFullscreen) return null;
  return <SiteNavbar authBadge={authBadge} authNavItems={authNavItems} />;
}
