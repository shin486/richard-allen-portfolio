"use client";

import React from "react";
import { Terminal, Code, Cpu, Database, Wrench, CheckCircle } from "lucide-react";
import { skillsData } from "@/data/skills";

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "languages":
        return Code;
      case "frontend":
        return Cpu;
      case "backend":
        return Database;
      case "tools":
        return Wrench;
      default:
        return Terminal;
    }
  };

  return (
    <section id="skills-section" className="py-8 sm:py-10 border-t border-neutral-200 dark:border-zinc-800">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring">
          <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-ig-purple" />
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
            Technical Skills &amp; Stack
          </h2>
          <p className="text-xs text-neutral-500 dark:text-zinc-400">
            Languages, frameworks, databases, and development tooling
          </p>
        </div>
      </div>

      {/* Grid of Categorized Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skillsData.map((category) => {
          const Icon = getCategoryIcon(category.categoryKey);

          return (
            <div
              key={category.categoryKey}
              className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              {/* Category Header */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-zinc-800">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-zinc-100">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Badges List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                        skill.highlight
                          ? "bg-neutral-50 dark:bg-zinc-900/80 border-neutral-200 dark:border-zinc-700/80"
                          : "bg-white dark:bg-[#16161D] border-neutral-100 dark:border-zinc-800/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-neutral-900 dark:text-zinc-100">
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="w-2 h-2 rounded-full bg-ig-pink" title="Primary Focus" />
                        )}
                      </div>
                      {skill.description && (
                        <span className="text-[10px] text-neutral-500 dark:text-zinc-400 mt-1 line-clamp-1">
                          {skill.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Count Indicator */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-zinc-400">
                <span>{category.skills.length} Technologies</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" /> Active in Projects
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
