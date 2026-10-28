"use client";

import React, { useRef, useEffect, useState } from "react";
import { Grid, Bookmark, Tag, UserCheck } from "lucide-react";

export type PortfolioTabType = "projects" | "skills" | "certificates" | "about";

interface PortfolioTabsProps {
  activeTab: string;
  onTabChange: (tab: PortfolioTabType) => void;
  projectCount: number;
  skillCategoriesCount: number;
  certCount: number;
}

export const PortfolioTabs: React.FC<PortfolioTabsProps> = ({
  activeTab,
  onTabChange,
  projectCount,
  skillCategoriesCount,
  certCount,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  const tabs = [
    {
      id: "projects" as PortfolioTabType,
      index: "01",
      label: "PROJECTS",
      subLabel: "Projects",
      icon: Grid,
      count: projectCount,
      sectionId: "portfolio-grid",
    },
    {
      id: "skills" as PortfolioTabType,
      index: "02",
      label: "TECH STACK",
      subLabel: "Tech Stack",
      icon: Tag,
      count: skillCategoriesCount,
      sectionId: "skills-section",
    },
    {
      id: "certificates" as PortfolioTabType,
      index: "03",
      label: "CERTIFICATES",
      subLabel: "Certifications",
      icon: Bookmark,
      count: certCount,
      sectionId: "certificates-section",
    },
    {
      id: "about" as PortfolioTabType,
      index: "04",
      label: "ABOUT",
      subLabel: "Bio & Story",
      icon: UserCheck,
      sectionId: "about-section",
    },
  ];

  useEffect(() => {
    const updatePosition = () => {
      const activeBtn = buttonRefs.current[activeTab];
      const container = containerRef.current;
      if (activeBtn && container) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        setIndicatorStyle({
          left: btnRect.left - containerRect.left,
          width: btnRect.width,
          ready: true,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeTab]);

  const handleTabClick = (tabId: PortfolioTabType) => {
    onTabChange(tabId);
  };

  return (
    <nav
      aria-label="Portfolio Navigation Tabs"
      className="border-b border-neutral-200 dark:border-zinc-800/90 -mx-4 px-4 sm:mx-0 sm:px-0 relative"
    >
      <div
        ref={containerRef}
        className="flex items-center justify-between sm:justify-start sm:gap-8 relative"
      >
        {/* Spring-Physics Sliding Bottom Indicator Bar */}
        {indicatorStyle.ready && (
          <span
            aria-hidden="true"
            className="spring-pill absolute -bottom-[1px] h-[2px] bg-neutral-900 dark:bg-white rounded-full z-10 pointer-events-none"
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
              left: 0,
            }}
          />
        )}

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const paddedCount =
            typeof tab.count === "number"
              ? String(tab.count).padStart(2, "0")
              : null;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[tab.id] = el;
              }}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`relative z-10 flex items-center gap-1.5 py-3 px-1 font-mono text-xs transition-colors duration-200 focus:outline-none ${
                isActive
                  ? "text-neutral-900 dark:text-white font-semibold"
                  : "text-neutral-400 dark:text-zinc-500 hover:text-neutral-800 dark:hover:text-zinc-300"
              }`}
              aria-selected={isActive}
              role="tab"
              title={tab.subLabel}
            >
              <Icon className="w-4 h-4 sm:hidden" />
              <span className="text-[11px] text-neutral-400 dark:text-zinc-600 hidden sm:inline">
                {tab.index}.
              </span>
              <span className="tracking-wider uppercase">{tab.label}</span>
              {paddedCount && (
                <span
                  className={`text-[10.5px] tabular-nums ${
                    isActive
                      ? "text-neutral-900 dark:text-zinc-200 font-bold"
                      : "text-neutral-400 dark:text-zinc-600"
                  }`}
                >
                  ({paddedCount})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
