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
      label: "PROJECTS",
      subLabel: "Projects",
      icon: Grid,
      count: projectCount,
      sectionId: "portfolio-grid",
    },
    {
      id: "skills" as PortfolioTabType,
      label: "TECH STACK",
      subLabel: "Tech Stack",
      icon: Tag,
      count: skillCategoriesCount,
      sectionId: "skills-section",
    },
    {
      id: "certificates" as PortfolioTabType,
      label: "CERTIFICATES",
      subLabel: "Certifications",
      icon: Bookmark,
      count: certCount,
      sectionId: "certificates-section",
    },
    {
      id: "about" as PortfolioTabType,
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
      className="border-t border-neutral-200 dark:border-zinc-800 -mx-4 sm:mx-0 -mt-[1px] relative"
    >
      <div
        ref={containerRef}
        className="flex items-center justify-around sm:justify-center sm:gap-10 relative"
      >
        {/* Spring-Physics Sliding Top Bar & Subtle Pill Highlight */}
        {indicatorStyle.ready && (
          <>
            <span
              aria-hidden="true"
              className="spring-pill absolute -top-[1px] h-[2px] bg-neutral-900 dark:bg-zinc-100 rounded-full z-10 pointer-events-none"
              style={{
                width: `${indicatorStyle.width}px`,
                transform: `translateX(${indicatorStyle.left}px)`,
                left: 0,
              }}
            />
            <span
              aria-hidden="true"
              className="spring-pill absolute inset-y-1.5 rounded-lg bg-neutral-900/[0.04] dark:bg-white/[0.05] pointer-events-none"
              style={{
                width: `${indicatorStyle.width}px`,
                transform: `translateX(${indicatorStyle.left}px)`,
                left: 0,
              }}
            />
          </>
        )}

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[tab.id] = el;
              }}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`relative z-10 flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 sm:py-3.5 px-3 transition-colors duration-200 focus:outline-none ${
                isActive
                  ? "text-neutral-900 dark:text-zinc-100 font-semibold"
                  : "text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-zinc-200"
              }`}
              aria-selected={isActive}
              role="tab"
              title={tab.subLabel}
            >
              <Icon
                className={`w-5 h-5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                  isActive
                    ? "text-neutral-900 dark:text-zinc-100 scale-105"
                    : "text-neutral-400 dark:text-zinc-500"
                }`}
              />
              <span className="text-xs tracking-wider uppercase font-bold hidden sm:inline">
                {tab.label}
              </span>
              {typeof tab.count === "number" && (
                <span
                  className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-full hidden sm:inline transition-all duration-200 ${
                    isActive
                      ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 font-bold"
                      : "bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
