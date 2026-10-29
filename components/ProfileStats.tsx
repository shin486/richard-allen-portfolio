"use client";

import React, { useEffect, useState } from "react";
import { profileData } from "@/data/profile";
import { skillsData } from "@/data/skills";

interface ProfileStatsProps {
  onStatClick?: (sectionId: string, tabName?: string) => void;
}

function useOdometerCount(target: number, durationMs = 620, delayMs = 80) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      setValue(target);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const timeoutId = window.setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / durationMs);
        // Cubic ease-out for crisp mechanical deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [target, durationMs, delayMs]);

  return String(value).padStart(2, "0");
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ onStatClick }) => {
  const totalTechnologies =
    skillsData.reduce((total, category) => total + category.skills.length, 0) ||
    Number(profileData.stats.technologies) ||
    28;

  const projectsTarget = Number(profileData.stats.projects) || 6;
  const certsTarget = Number(profileData.stats.certificates) || 5;

  const projectsCount = useOdometerCount(projectsTarget, 580, 60);
  const techCount = useOdometerCount(totalTechnologies, 680, 120);
  const certsCount = useOdometerCount(certsTarget, 580, 180);

  const handleScroll = (id: string, tab?: string) => {
    if (onStatClick) {
      onStatClick(id, tab);
    }
  };

  return (
    <div className="flex items-center justify-around sm:justify-start gap-3 sm:gap-9 w-full sm:w-auto">
      <button
        type="button"
        onClick={() => handleScroll("portfolio-grid", "projects")}
        data-note="Six full production projects. Built with late nights and black coffee."
        className="group flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        <span className="font-bold tabular-nums text-neutral-900 dark:text-zinc-100 text-sm sm:text-lg group-hover:text-ig-pink transition-colors leading-none">
          {projectsCount}
        </span>
        <span className="text-[11px] sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors mt-0.5 sm:mt-0">
          projects
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleScroll("skills-section", "skills")}
        data-note="Twenty-eight technologies. React Native, Next.js, and Supabase ready."
        className="group flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        <span className="font-bold tabular-nums text-neutral-900 dark:text-zinc-100 text-sm sm:text-lg group-hover:text-ig-purple transition-colors leading-none">
          {techCount}
        </span>
        <span className="text-[11px] sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors mt-0.5 sm:mt-0">
          technologies
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleScroll("certificates-section", "certificates")}
        data-note="Dual Cisco CCNA certified. Yes, I know how to subnet in my head."
        className="group flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        <span className="font-bold tabular-nums text-neutral-900 dark:text-zinc-100 text-sm sm:text-lg group-hover:text-ig-orange transition-colors leading-none">
          {certsCount}
        </span>
        <span className="text-[11px] sm:text-sm text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200 transition-colors mt-0.5 sm:mt-0">
          certificates
        </span>
      </button>
    </div>
  );
};
