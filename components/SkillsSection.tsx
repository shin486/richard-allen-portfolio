"use client";

import React, { useMemo, useState } from "react";
import {
  Terminal,
  Code,
  Cpu,
  Database,
  Wrench,
  Sparkles,
  FolderCode,
} from "lucide-react";
import { skillsData, SkillItem } from "@/data/skills";

type FilterKey = "all" | "core" | "languages" | "frontend" | "backend" | "tools";

interface FlattenedSkill extends SkillItem {
  categoryTitle: string;
  categoryKey: string;
}

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const allSkills: FlattenedSkill[] = useMemo(() => {
    return skillsData.flatMap((cat) =>
      cat.skills.map((skill) => ({
        ...skill,
        categoryTitle: cat.title,
        categoryKey: cat.categoryKey,
      }))
    );
  }, []);

  const coreCount = useMemo(
    () => allSkills.filter((s) => s.highlight).length,
    [allSkills]
  );

  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") return allSkills;
    if (activeFilter === "core") return allSkills.filter((s) => s.highlight);
    return allSkills.filter((s) => s.categoryKey === activeFilter);
  }, [allSkills, activeFilter]);

  const filterTabs: {
    key: FilterKey;
    label: string;
    count: number;
    icon: React.ElementType;
  }[] = [
    {
      key: "all",
      label: "All Stack",
      count: allSkills.length,
      icon: Terminal,
    },
    {
      key: "core",
      label: "Core Stack",
      count: coreCount,
      icon: Sparkles,
    },
    {
      key: "languages",
      label: "Languages",
      count:
        skillsData.find((c) => c.categoryKey === "languages")?.skills.length ||
        0,
      icon: Code,
    },
    {
      key: "frontend",
      label: "Frontend & Mobile",
      count:
        skillsData.find((c) => c.categoryKey === "frontend")?.skills.length ||
        0,
      icon: Cpu,
    },
    {
      key: "backend",
      label: "Backend & DB",
      count:
        skillsData.find((c) => c.categoryKey === "backend")?.skills.length || 0,
      icon: Database,
    },
    {
      key: "tools",
      label: "Tools & Workflow",
      count:
        skillsData.find((c) => c.categoryKey === "tools")?.skills.length || 0,
      icon: Wrench,
    },
  ];

  return (
    <section id="skills-section" className="py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring flex-shrink-0">
            <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-ig-purple" />
            </div>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
              Technical Skills &amp; Stack
            </h2>
            <p className="text-xs text-neutral-500 dark:text-zinc-400">
              Filter by domain and see which projects use each technology
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">
          Showing{" "}
          <strong className="text-neutral-900 dark:text-zinc-100">
            {filteredSkills.length}
          </strong>{" "}
          of {allSkills.length} technologies
        </div>
      </div>

      {/* Interactive Filter Pills */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto pb-4 no-scrollbar"
        role="tablist"
        aria-label="Filter technologies by category"
      >
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              role="tab"
              aria-selected={isActive}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                isActive
                  ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100 shadow-sm"
                  : "bg-white dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-900 dark:hover:text-zinc-200"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive
                    ? "text-ig-pink"
                    : "text-neutral-400 dark:text-zinc-500"
                }`}
              />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-white/20 dark:bg-neutral-900/15 text-white dark:text-neutral-900"
                    : "bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Skill Cards Grid with Project Cross-Reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={`${skill.categoryKey}-${skill.name}`}
            className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-3"
          >
            <div>
              {/* Top Row: Name + Core / Category Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-zinc-100">
                    {skill.name}
                  </h3>
                  {skill.highlight && (
                    <span
                      className="w-2 h-2 rounded-full bg-ig-pink flex-shrink-0"
                      title="Core Stack Technology"
                    />
                  )}
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 text-neutral-500 dark:text-zinc-400 border border-neutral-200/60 dark:border-zinc-700/60 flex-shrink-0">
                  {skill.categoryTitle}
                </span>
              </div>

              {/* Description */}
              {skill.description && (
                <p className="text-xs text-neutral-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {skill.description}
                </p>
              )}
            </div>

            {/* Project Cross-Reference ("Used in") */}
            {skill.usedIn && skill.usedIn.length > 0 && (
              <div className="pt-2.5 border-t border-neutral-100 dark:border-zinc-800/80 flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 flex items-center gap-1">
                  <FolderCode className="w-3 h-3 text-ig-purple" />
                  Used in Projects
                </span>
                <div className="flex flex-wrap gap-1">
                  {skill.usedIn.map((projName) => (
                    <span
                      key={projName}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-50 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 border border-neutral-200/70 dark:border-zinc-800"
                    >
                      {projName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
