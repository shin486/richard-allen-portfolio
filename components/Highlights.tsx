"use client";

import React from "react";
import {
  Trophy,
  ShieldCheck,
  Sparkles,
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
      case "Sparkles":
        return Sparkles;
      case "GraduationCap":
        return GraduationCap;
      case "Briefcase":
        return Briefcase;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      aria-label="Story Highlights"
      className="py-4 border-b border-neutral-200/80 dark:border-zinc-800/80"
    >
      <div className="flex items-center gap-4 sm:gap-7 overflow-x-auto no-scrollbar py-2 px-1 sm:justify-start">
        {highlightsData.map((highlight, index) => {
          const Icon = getHighlightIcon(highlight.coverIcon);

          return (
            <button
              key={highlight.id}
              onClick={() => onOpenHighlight(index)}
              className="flex flex-col items-center gap-2 group flex-shrink-0 focus:outline-none transition-transform active:scale-95"
              aria-label={`View ${highlight.title} story highlight`}
            >
              {/* Instagram Animated Gradient Story Ring */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] animated-ig-ring transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                {/* Inner white / dark gap */}
                <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] flex items-center justify-center transition-colors duration-200">
                  {/* Bubble interior */}
                  <div className="w-full h-full rounded-full bg-neutral-50 dark:bg-[#16161D] group-hover:bg-pink-50 dark:group-hover:bg-pink-950/30 text-neutral-700 dark:text-zinc-300 group-hover:text-ig-pink dark:group-hover:text-pink-400 flex items-center justify-center transition-colors duration-200">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                </div>
              </div>

              {/* Highlight Label */}
              <div className="flex flex-col items-center leading-tight">
                <span className="text-xs sm:text-xs font-semibold tracking-tight text-neutral-800 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {highlight.title}
                </span>
                {highlight.timeAgo && (
                  <span className="text-[10px] text-neutral-400 dark:text-zinc-500 font-mono">
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
