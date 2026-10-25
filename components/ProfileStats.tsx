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
    <div className="flex items-center justify-around sm:justify-start gap-3 sm:gap-9 w-full sm:w-auto">
      <button
        onClick={() => handleScroll("portfolio-grid", "projects")}
        className="group flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none transition-transform active:scale-95"
      >
        <span className="font-bold text-neutral-900 dark:text-zinc-100 text-sm sm:text-lg group-hover:text-ig-pink transition-colors leading-none">
          {profileData.stats.projects}
        </span>
        <span className="text-[11px] sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors mt-0.5 sm:mt-0">
          projects
        </span>
      </button>

      <button
        onClick={() => handleScroll("skills-section", "skills")}
        className="group flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none transition-transform active:scale-95"
      >
        <span className="font-bold text-neutral-900 dark:text-zinc-100 text-sm sm:text-lg group-hover:text-ig-purple transition-colors leading-none">
          {profileData.stats.technologies}
        </span>
        <span className="text-[11px] sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors mt-0.5 sm:mt-0">
          technologies
        </span>
      </button>

      <button
        onClick={() => handleScroll("certificates-section", "certificates")}
        className="group flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none transition-transform active:scale-95"
      >
        <span className="font-bold text-neutral-900 dark:text-zinc-100 text-sm sm:text-lg group-hover:text-ig-orange transition-colors leading-none">
          {profileData.stats.certificates}
        </span>
        <span className="text-[11px] sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors mt-0.5 sm:mt-0">
          certificates
        </span>
      </button>
    </div>
  );
};
