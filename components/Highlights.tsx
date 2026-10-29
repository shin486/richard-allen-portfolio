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
      className="py-2.5 sm:py-3.5 border-b border-neutral-200/70 dark:border-zinc-800/80 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
        {highlightsData.map((highlight, index) => {
          const Icon = getHighlightIcon(highlight.coverIcon);

          return (
            <button
              key={highlight.id}
              onClick={() => onOpenHighlight(index)}
              className="flex flex-col items-center gap-1.5 group flex-shrink-0 focus:outline-none transition-transform active:scale-95"
              aria-label={`View ${highlight.title} story highlight`}
            >
              {/* Authentic Instagram Highlight Ring: Subtle neutral border that illuminates with IG gradient on hover */}
              <div className="w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] rounded-full p-[2px] border border-neutral-200 dark:border-zinc-800 group-hover:border-transparent group-hover:bg-gradient-to-tr group-hover:from-amber-400 group-hover:via-rose-500 group-hover:to-purple-600 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                {/* Inner White / Dark Gap */}
                <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] flex items-center justify-center transition-colors duration-200">
                  {/* Clean Bubble Interior */}
                  <div className="w-full h-full rounded-full bg-neutral-100/80 dark:bg-[#16161F] group-hover:bg-neutral-50 dark:group-hover:bg-[#1C1C26] text-neutral-700 dark:text-zinc-300 group-hover:text-neutral-950 dark:group-hover:text-white flex items-center justify-center border border-neutral-200/60 dark:border-zinc-800/80 transition-colors duration-200">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                </div>
              </div>

              {/* Highlight Label */}
              <div className="flex flex-col items-center leading-tight">
                <span className="text-[11px] sm:text-xs font-medium tracking-tight text-neutral-700 dark:text-zinc-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors truncate max-w-[64px] sm:max-w-none text-center">
                  {highlight.title}
                </span>
                {highlight.timeAgo && (
                  <span className="text-[9px] sm:text-[10px] text-neutral-400 dark:text-zinc-500 font-mono hidden sm:inline">
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
