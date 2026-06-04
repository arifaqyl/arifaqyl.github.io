"use client";

import { useState } from "react";
import { RichContent } from "@/components/rich-content";
import { PortfolioTab } from "@/lib/types";

export function ProjectTabs({ tabs }: { tabs: PortfolioTab[] }) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");
  const current = tabs.find((tab) => tab.key === active) ?? tabs[0];

  if (!current) return null;

  return (
    <div className="project-tabs">
      <div className="tab-list" role="tablist" aria-label="Project case study sections">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={tab.key === current.key}
            className={tab.key === current.key ? "tab-button active" : "tab-button"}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        <RichContent blocks={current.richContent} />
      </div>
    </div>
  );
}
