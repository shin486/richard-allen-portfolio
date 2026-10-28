"use client";

import React from "react";
import {
  Trophy,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { highlightsData, HighlightGroup } from "@/data/highlights";

interface HighlightsProps {
  onOpenHighlight: (index: number) => void;
}

export const Highlights: React.FC<HighlightsProps> = ({ onOpenHighlight }) => {
  const getHighlightIcon = (iconName: HighlightGroup["coverIcon"]) => {
    switch (iconName) {
      case "Trophy":
        return Trophy;
      case "ShieldCheck":
        return ShieldCheck;
      case "Cpu":
        return Cpu;
      case "GraduationCap":
        return GraduationCap;
      case "Briefcase":
        return Briefcase;
      default:
        return Cpu;
    }
  };

  return (
    <section
      aria-label="Story Highlights"
      className="pb-5 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
        {highlightsData.map((highlight, index) => {
          const Icon = getHighlightIcon(highlight.coverIcon);

          return (
            <button
              key={highlight.id}
              type="button"
              onClick={() => onOpenHighlight(index)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-neutral-200 dark:border-zinc-800/90 bg-white dark:bg-[#0f0f13] hover:border-neutral-400 dark:hover:border-zinc-600 group flex-shrink-0 focus:outline-none transition-all active:scale-95"
              aria-label={`View ${highlight.title} story highlight`}
            >
              <div className="w-7 h-7 rounded-full p-[1.5px] animated-ig-ring shrink-0">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0f0f13] flex items-center justify-center text-neutral-700 dark:text-zinc-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex flex-col items-start text-left leading-tight">
                <span className="font-mono text-[11px] font-semibold text-neutral-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {highlight.title}
                </span>
                {highlight.timeAgo && (
                  <span className="font-mono text-[9.5px] text-neutral-400 dark:text-zinc-500">
                    {highlight.timeAgo}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
