import type { PhysicalStackTocItem } from "@/lib/physical-stack-contents";

/**
 * Worldview report — table of contents (same row shape as Physical Stack).
 * Anchors are injected on `<h2>` via `injectWorldviewHeadingIds`.
 */
export const WORLDVIEW_TOC: PhysicalStackTocItem[] = [
  {
    title: "Executive Summary",
    status: "Overview",
    statusColor: "#243b53",
    anchorId: "worldview-executive-summary",
  },
  {
    num: "1",
    title: "Demand Layer",
    status: "Hyperscale demand",
    statusColor: "#1a4a8a",
    anchorId: "worldview-demand-layer",
  },
  {
    num: "2",
    title: "Supply Layer",
    status: "Operators",
    statusColor: "#4a2a8a",
    anchorId: "worldview-supply-layer",
  },
  {
    num: "3",
    title: "Capital Layer",
    status: "Financing",
    statusColor: "#0a6640",
    anchorId: "worldview-capital-layer",
  },
  {
    num: "4",
    title: "Geographic Heat Map",
    status: "Allocation",
    statusColor: "#7a4800",
    anchorId: "worldview-geo-heat-map",
  },
];

/** Injected after `remark-html` for in-page Contents links. */
export function injectWorldviewHeadingIds(html: string): string {
  const pairs: [string, string][] = [
    [
      "<h2>Executive Summary</h2>",
      '<h2 id="worldview-executive-summary">Executive Summary</h2>',
    ],
    [
      "<h2>The Demand Layer: Hyperscalers in APAC</h2>",
      '<h2 id="worldview-demand-layer">The Demand Layer: Hyperscalers in APAC</h2>',
    ],
    [
      "<h2>The Supply Layer: Who Is Building the Facilities</h2>",
      '<h2 id="worldview-supply-layer">The Supply Layer: Who Is Building the Facilities</h2>',
    ],
    [
      "<h2>The Capital Layer: Who Is Financing This</h2>",
      '<h2 id="worldview-capital-layer">The Capital Layer: Who Is Financing This</h2>',
    ],
    [
      "<h2>Geographic Heat Map: Where Capital Is Flowing</h2>",
      '<h2 id="worldview-geo-heat-map">Geographic Heat Map: Where Capital Is Flowing</h2>',
    ],
  ];
  let out = html;
  for (const [from, to] of pairs) {
    out = out.replace(from, to);
  }
  return out;
}
