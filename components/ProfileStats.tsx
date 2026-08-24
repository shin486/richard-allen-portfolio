"use client";

import React from "react";
import { profileData } from "@/data/profile";

interface ProfileStatsProps {
  onStatClick?: (sectionId: string, tabName?: string) => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ onStatClick }) => {
  const handleScroll = (id: string, tab?: string) => {
    if (onStatClick) {
      onStatClick(id, tab);
    }
  };

  return (
    <div className="flex items-center gap-6 sm:gap-9 py-2 border-y border-neutral-200 dark:border-zinc-800 sm:border-y-0 justify-around sm:justify-start">
      <button
        onClick={() => handleScroll("portfolio-grid", "projects")}
        className="group flex flex-col sm:flex-row items-center sm:gap-1.5 text-left focus:outline-none transition-transform active:scale-95"
      >
        <span className="font-bold text-neutral-900 dark:text-zinc-100 text-base sm:text-lg group-hover:text-ig-pink transition-colors">
          {profileData.stats.projects}
        </span>
        <span className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors">
          projects
        </span>
      </button>

      <button
        onClick={() => handleScroll("skills-section", "skills")}
        className="group flex flex-col sm:flex-row items-center sm:gap-1.5 text-left focus:outline-none transition-transform active:scale-95"
      >
        <span className="font-bold text-neutral-900 dark:text-zinc-100 text-base sm:text-lg group-hover:text-ig-purple transition-colors">
          {profileData.stats.technologies}
        </span>
        <span className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors">
          technologies
        </span>
      </button>

      <button
        onClick={() => handleScroll("certificates-section", "certificates")}
        className="group flex flex-col sm:flex-row items-center sm:gap-1.5 text-left focus:outline-none transition-transform active:scale-95"
      >
        <span className="font-bold text-neutral-900 dark:text-zinc-100 text-base sm:text-lg group-hover:text-ig-orange transition-colors">
          {profileData.stats.certificates}
        </span>
        <span className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors">
          certificates
        </span>
      </button>
    </div>
  );
};
