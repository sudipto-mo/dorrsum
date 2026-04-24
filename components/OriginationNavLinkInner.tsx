"use client";

import Link from "next/link";
import { marketingNavLinkStyle } from "@/lib/marketing-nav-styles";

export default function OriginationNavLinkInner() {
  return (
    <Link
      href="/origination"
      style={{
        ...marketingNavLinkStyle,
        gap: 8,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.opacity = "0.68";
      }}
    >
      Origination
    </Link>
  );
}
