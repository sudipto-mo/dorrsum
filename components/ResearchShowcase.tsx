"use client";

import { useState } from "react";

type ShowcaseItem = {
  Category: string;
  Title: string;
  Subtitle: string;
  Date: string;
  Pages: string;
};

const ITEMS: ShowcaseItem[] = [
  {
    Category: "RESEARCH REPORT",
    Title: "The Physical Stack",
    Subtitle: "Where the Bottlenecks Are - An APAC Supply Chain Map",
    Date: "APRIL 2026",
    Pages: "18 PP",
  },
  {
    Category: "INTERACTIVE TOOL",
    Title: "The AI Infrastructure Network",
    Subtitle: "Ecosystem & Financing Flows",
    Date: "LIVE",
    Pages: "WEB",
  },
  {
    Category: "DATA ASSET",
    Title: "APAC Constraint Matrix",
    Subtitle: "Market Viability Scoring",
    Date: "UPDATED Q2",
    Pages: "EXCEL",
  },
];

export default function ResearchShowcase({ variant = "section" }: { variant?: "section" | "inline" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const outer =
    variant === "section"
      ? "mx-auto w-full max-w-6xl px-6 py-24"
      : "w-full";

  return (
    <div className={outer}>
      <div className="flex h-auto w-full flex-col gap-4 md:h-[600px] md:flex-row">
        {ITEMS.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.Title}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className={[
                "relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-gray-800 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]",
                "min-h-[140px] md:min-h-0",
                isActive ? "flex-[3_3_0%] bg-[#111118]" : "flex-[1_1_0%] bg-[#0a0a0f] hover:bg-[#111118]",
              ].join(" ")}
            >
              <div className="flex h-full flex-col justify-between p-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">{item.Category}</div>

                <div className="flex flex-col">
                  <h3
                    className={`font-serif-display leading-tight transition-all duration-500 ${
                      isActive ? "text-4xl text-white" : "text-xl text-gray-500"
                    }`}
                  >
                    {item.Title}
                  </h3>

                  {isActive ? (
                    <div
                      key={`${item.Title}-detail`}
                      className="mt-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.3s_forwards]"
                    >
                      <p className="mb-8 text-lg font-light text-gray-300">{item.Subtitle}</p>
                      <div className="flex gap-6 border-t border-gray-800 pt-6 text-xs uppercase tracking-widest text-gray-500">
                        <span>{item.Date}</span>
                        <span>{item.Pages}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
