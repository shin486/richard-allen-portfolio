"use client";

import React from "react";
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

  const handleTabClick = (tabId: PortfolioTabType, sectionId: string) => {
    onTabChange(tabId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav aria-label="Portfolio Navigation Tabs" className="border-t border-neutral-200 dark:border-zinc-800 -mt-[1px]">
      <div className="flex items-center justify-center sm:justify-center gap-3 sm:gap-12">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.sectionId)}
              className={`flex items-center gap-2 py-3.5 sm:py-4 px-2 -mt-[1px] border-t transition-all focus:outline-none ${
                isActive
                  ? "border-neutral-900 dark:border-zinc-100 text-neutral-900 dark:text-zinc-100 font-semibold"
                  : "border-transparent text-neutral-500 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-zinc-200"
              }`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-neutral-900 dark:text-zinc-100" : "text-neutral-500 dark:text-zinc-500"}`} />
              <span className="text-xs tracking-wider uppercase font-bold">
                {tab.label}
              </span>
              {typeof tab.count === "number" && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full hidden sm:inline transition-colors ${
                  isActive
                    ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 font-bold"
                    : "bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
                }`}>
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
