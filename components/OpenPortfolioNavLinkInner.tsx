"use client";

import Link from "next/link";
import { marketingNavLinkStyle } from "@/lib/marketing-nav-styles";

export default function OpenPortfolioNavLinkInner() {
  return (
    <Link
      href="/open-portfolio"
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
      Dorrsum Score
    </Link>
  );
}

