/**
 * Physical Stack report — table of contents (hero preview + report page).
 * Anchors match `<span id="...">` markers in `content/research/dc-physical-stack.md`.
 */
export type PhysicalStackTocItem = {
  /** Section index for supply-chain nodes (1–6). Omitted for front matter like Executive Summary. */
  num?: string;
  title: string;
  status: string;
  statusColor: string;
  /** In-page fragment for full report (authenticated readers). */
  anchorId: string;
};

/** Extra lines for the homepage hero card “Sections” view only. */
export const PHYSICAL_STACK_HERO_DETAILS: {
  stat: string;
  statLabel: string;
  note: string;
}[] = [
  {
    stat: "90%",
    statLabel: "cite grid access as the hard ceiling for project delivery",
    note: "2.6 GW → 10.7 GW SEA power demand by 2035",
  },
  {
    stat: "120 kW",
    statLabel: "per Rubin rack — shifting value to tokens per watt",
    note: "TSMC CoWoS fully booked through 2027",
  },
  {
    stat: "30%",
    statLabel: "energy loss reduction via HVDC + liquid cooling integration",
    note: "Liquid penetration hitting 30% — now mandatory for Tier 1 AI DC",
  },
  {
    stat: "5 yr",
    statLabel: "transmission build cycle vs. 18-month speed-to-market demand",
    note: "Malaysia Oct 2025 framework shifts power permitting to merit system",
  },
  {
    stat: ">70%",
    statLabel: "transcontinental capacity now owned by hyperscalers",
    note: "$13B+ subsea investment 2025–2027 — route, not bandwidth, is the risk",
  },
  {
    stat: "7–10%",
    statLabel: "CAGR in APAC construction costs driven by MEP scarcity",
    note: "IST/commissioning — not concrete — is the execution bottleneck",
  },
];

export const PHYSICAL_STACK_TOC: PhysicalStackTocItem[] = [
  {
    title: "Executive Summary",
    status: "Overview",
    statusColor: "#243b53",
    anchorId: "physical-stack-executive-summary",
  },
  {
    num: "1",
    title: "Power",
    status: "Critical Bottleneck",
    statusColor: "#c0392b",
    anchorId: "physical-stack-power",
  },
  {
    num: "2",
    title: "Silicon",
    status: "Tight",
    statusColor: "#b8600a",
    anchorId: "physical-stack-silicon",
  },
  {
    num: "3",
    title: "Cooling",
    status: "Rapidly Innovating",
    statusColor: "#1a6e3a",
    anchorId: "physical-stack-cooling",
  },
  {
    num: "4",
    title: "Land & Permitting",
    status: "Tightening",
    statusColor: "#7b4a00",
    anchorId: "physical-stack-land",
  },
  {
    num: "5",
    title: "Connectivity",
    status: "Strategic",
    statusColor: "#0a4a8a",
    anchorId: "physical-stack-connectivity",
  },
  {
    num: "6",
    title: "Construction",
    status: "Stressed",
    statusColor: "#5a1a6e",
    anchorId: "physical-stack-construction",
  },
];

/** Six supply-chain sections only — matches `PHYSICAL_STACK_HERO_DETAILS` rows (homepage hero). */
export const PHYSICAL_STACK_SUPPLY_TOC: PhysicalStackTocItem[] = PHYSICAL_STACK_TOC.filter(
  (t) => t.anchorId !== "physical-stack-executive-summary",
);

/** Injected after `remark-html` so in-page TOC links work (raw HTML spans are stripped). */
export function injectPhysicalStackHeadingIds(html: string): string {
  const pairs: [string, string][] = [
    [
      "<h2>Executive Summary</h2>",
      '<h2 id="physical-stack-executive-summary">Executive Summary</h2>',
    ],
    [
      "<h2>1. Power: The New Asset Class Driver</h2>",
      '<h2 id="physical-stack-power">1. Power: The New Asset Class Driver</h2>',
    ],
    [
      "<h2>2. Silicon: The Heterogeneous Compute Era</h2>",
      '<h2 id="physical-stack-silicon">2. Silicon: The Heterogeneous Compute Era</h2>',
    ],
    [
      "<h2>3. Cooling: From Specialty to Standard</h2>",
      '<h2 id="physical-stack-cooling">3. Cooling: From Specialty to Standard</h2>',
    ],
    [
      "<h2>4. Land and Permitting: The Regulatory Variable</h2>",
      '<h2 id="physical-stack-land">4. Land and Permitting: The Regulatory Variable</h2>',
    ],
    [
      "<h2>5. Connectivity: Commoditizing but Strategic</h2>",
      '<h2 id="physical-stack-connectivity">5. Connectivity: Commoditizing but Strategic</h2>',
    ],
    [
      "<h2>6. Construction and Contractors: Cost Pressure</h2>",
      '<h2 id="physical-stack-construction">6. Construction and Contractors: Cost Pressure</h2>',
    ],
  ];
  let out = html;
  for (const [from, to] of pairs) {
    out = out.replace(from, to);
  }
  return out;
}
