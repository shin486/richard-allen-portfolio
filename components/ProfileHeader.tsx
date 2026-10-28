"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { skillsData } from "@/data/skills";
import { highlightsData } from "@/data/highlights";
import profilePic from "@/assets/PROFILEPIC.png";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenHighlight?: (index: number) => void;
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

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
  onOpenHighlight,
}) => {
  const totalTechnologies =
    skillsData.reduce((total, category) => total + category.skills.length, 0) ||
    Number(profileData.stats.technologies) ||
    28;

  const projectsTarget = Number(profileData.stats.projects) || 6;
  const certsTarget = Number(profileData.stats.certificates) || 5;

  const projectsCount = useOdometerCount(projectsTarget, 580, 60);
  const techCount = useOdometerCount(totalTechnologies, 680, 120);
  const certsCount = useOdometerCount(certsTarget, 580, 180);

  const handleStatNavigate = (sectionId: string, tabName: string) => {
    onSelectTab(tabName);
    onNavigateToSection(sectionId);
  };

  return (
    <section id="profile-header" className="pt-4 sm:pt-8 pb-6 space-y-8">
      {/* A. MINIMALIST EDITORIAL PROFILE HERO (Bryl Lim Layout + IG Identity) */}
      <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-9">
        {/* Square Editorial Portrait (Monochrome -> Color on hover) + Highlights Trigger */}
        <div className="relative group shrink-0">
          <div
            onClick={() => handleStatNavigate("portfolio-grid", "projects")}
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg overflow-hidden border border-neutral-200 dark:border-zinc-800 bg-neutral-900 relative cursor-pointer"
          >
            <Image
              src={profilePic}
              alt={profileData.name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-cover portrait-bw group-hover:scale-[1.02]"
              priority
            />
          </div>

          {onOpenHighlight && (
            <button
              type="button"
              onClick={() => onOpenHighlight(0)}
              className="mt-2 w-full py-1.5 px-2.5 rounded-md border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-[11px] font-mono text-neutral-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500 shrink-0" />
              <span>View {highlightsData.length} Highlights</span>
            </button>
          )}
        </div>

        {/* Right Editorial Bio Column */}
        <div className="space-y-3.5 flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {profileData.name}
            </h1>
            <span title="Verified Developer Profile" className="cursor-help shrink-0">
              <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500" />
            </span>
          </div>

          <div className="space-y-3 text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed max-w-xl">
            <p>
              I&apos;m an aspiring full-stack &amp; mobile developer. I build modern web
              systems and cross-platform apps, with a focus on real-world
              operations, clean database architecture, and AI integration.
            </p>
            <p className="text-neutral-500 dark:text-zinc-400">
              Right now I&apos;m completing my 4th-year BSIT degree at{" "}
              <strong className="text-neutral-900 dark:text-zinc-200 font-medium">
                De La Salle Lipa
              </strong>{" "}
              and shipping production-ready tools people can actually use.
            </p>
          </div>

          {/* Inline Minimalist Monospace Social Links */}
          <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-neutral-500 dark:text-zinc-400">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              github ↗
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              linkedin ↗
            </a>
            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              resume.pdf ↗
            </a>
            <a
              href={`mailto:${profileData.socials.email}`}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              email ↗
            </a>
          </div>
        </div>
      </div>

      {/* B. 2x3 HAIRLINE CREDENTIALS & IG STATS MATRIX */}
      <div className="border-y border-neutral-200 dark:border-zinc-800/90 divide-y divide-neutral-200 dark:divide-zinc-800/90">
        {/* Row 1: Identity & Affiliations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-zinc-800/90">
          <div className="py-3.5 px-4 sm:first:pl-0">
            <div className="text-xs font-semibold text-neutral-900 dark:text-white">
              De La Salle Lipa
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mt-0.5">
              4TH-YEAR BSIT · 2027
            </div>
          </div>

          <div className="py-3.5 px-4">
            <div className="text-xs font-semibold text-neutral-900 dark:text-white">
              Full-Stack &amp; Mobile
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mt-0.5">
              NEXT.JS · REACT NATIVE · TS
            </div>
          </div>

          <div className="py-3.5 px-4">
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open for OJT</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mt-0.5">
              LIPA CITY, PH · AVAILABLE
            </div>
          </div>
        </div>

        {/* Row 2: Clickable Instagram Profile Stats in Minimalist Hairline Cells */}
        <div className="grid grid-cols-3 divide-x divide-neutral-200 dark:divide-zinc-800/90">
          <button
            type="button"
            onClick={() => handleStatNavigate("portfolio-grid", "projects")}
            className="py-4 px-4 first:pl-0 text-left group focus:outline-none transition-colors hover:bg-neutral-100/60 dark:hover:bg-zinc-900/40"
          >
            <div className="font-mono text-xl font-bold tabular-nums text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-zinc-300 flex items-baseline gap-1">
              <span>{projectsCount}</span>
              <span className="text-xs text-neutral-400 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mt-1">
              PROJECTS SHIPPED
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleStatNavigate("skills-section", "skills")}
            className="py-4 px-4 text-left group focus:outline-none transition-colors hover:bg-neutral-100/60 dark:hover:bg-zinc-900/40"
          >
            <div className="font-mono text-xl font-bold tabular-nums text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-zinc-300 flex items-baseline gap-1">
              <span>{techCount}</span>
              <span className="text-xs text-neutral-400 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mt-1">
              TECHNOLOGIES
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              handleStatNavigate("certificates-section", "certificates")
            }
            className="py-4 px-4 text-left group focus:outline-none transition-colors hover:bg-neutral-100/60 dark:hover:bg-zinc-900/40"
          >
            <div className="font-mono text-xl font-bold tabular-nums text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-zinc-300 flex items-baseline gap-1">
              <span>{certsCount}</span>
              <span className="text-xs text-neutral-400 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mt-1">
              CERTIFICATES
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
