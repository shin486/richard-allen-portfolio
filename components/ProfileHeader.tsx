"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProfileStats } from "./ProfileStats";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

/**
 * Calculates live BSIT degree completion percentage toward June 2, 2027.
 * Start of 4-year BSIT: August 15, 2023 -> Target Graduation: June 2, 2027.
 */
function calculateGraduationXp(): number {
  const startMs = new Date("2023-08-15T00:00:00+08:00").getTime();
  const gradMs = new Date("2027-06-02T00:00:00+08:00").getTime();
  const now = new Date();

  if (now.getTime() >= gradMs) {
    now.setFullYear(2026);
  }

  const clampedNow = Math.max(startMs, Math.min(now.getTime(), gradMs));
  const rawPct = Math.round(((clampedNow - startMs) / (gradMs - startMs)) * 100);
  return Math.max(75, Math.min(97, rawPct));
}

const CIRCUMFERENCE = 2 * Math.PI * 54; // ≈ 339.292

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
}) => {
  const [targetPct, setTargetPct] = useState<number>(85);
  const [animatedPct, setAnimatedPct] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    const pct = calculateGraduationXp();
    setTargetPct(pct);

    // Smooth mechanical fill on initial load
    const timer = setTimeout(() => {
      setAnimatedPct(pct);
    }, 180);

    return () => clearTimeout(timer);
  }, []);

  const strokeDashoffset = CIRCUMFERENCE * (1 - animatedPct / 100);

  return (
    <section id="profile-header" className="pt-4 sm:pt-6 md:pt-8 pb-2 sm:pb-3">
      {/* Unified Responsive Instagram Profile Header */}
      <div className="grid grid-cols-[auto_1fr] items-center sm:items-start gap-x-4 sm:gap-x-7 md:gap-x-10">
        {/* Column 1: Circular Avatar with SVG Progress Ring & Pinned LVL 4 Badge */}
        <div className="col-start-1 row-start-1 sm:row-span-2 relative flex flex-col items-center flex-shrink-0">
          <div
            className="relative group cursor-pointer"
            onClick={() => setShowTooltip((prev) => !prev)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowTooltip((prev) => !prev);
              }
            }}
            aria-label="View BSIT Graduation Progress"
          >
            {/* SVG Circular Progress Ring */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full select-none overflow-visible"
                aria-label={`Graduation progress: ${targetPct}% toward June 2027`}
              >
                <defs>
                  <linearGradient
                    id="emeraldProgressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Background Track */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  strokeWidth="4"
                  className="stroke-neutral-200 dark:stroke-zinc-800"
                  fill="transparent"
                />

                {/* Progress Stroke with Subtle Emerald Glow */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  strokeWidth="4"
                  stroke="url(#emeraldProgressGradient)"
                  fill="transparent"
                  strokeDasharray={CIRCUMFERENCE.toFixed(2)}
                  strokeDashoffset={strokeDashoffset.toFixed(2)}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(16, 185, 129, 0.4))",
                    transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </svg>

              {/* Inner Circular Avatar Image with gap */}
              <div className="absolute inset-[6px] sm:inset-[7px] rounded-full overflow-hidden bg-neutral-900 border border-neutral-100 dark:border-zinc-800 shadow-sm">
                <Image
                  src={profilePic}
                  alt={profileData.name}
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Pinned LVL 4 Badge overlapping bottom */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-zinc-950 border border-emerald-500/60 text-emerald-400 font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 select-none z-20 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LVL 4
              </div>
            </div>

            {/* Interactive Milestone Tooltip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2.5 z-40 w-60 sm:w-64 p-3 rounded-lg bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl transition-all duration-200 pointer-events-none font-mono text-left ${
                showTooltip
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>BSIT Senior • Level 4</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400">
                  {targetPct}%
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1.5 leading-snug">
                {targetPct}% Completed to Graduation (Target: June 2027)
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                De La Salle Lipa • Lipa City, Batangas
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Username & Stats */}
        <div className="col-start-2 row-start-1 flex flex-col justify-center gap-1.5 sm:gap-2.5 min-w-0">
          {/* Handle Row with Verified Badge & Availability */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-bold sm:font-semibold text-base sm:text-xl text-neutral-900 dark:text-zinc-100 tracking-tight">
              {profileData.username}
            </span>
            <div
              title="Verified Developer Profile — De La Salle Lipa"
              className="cursor-help inline-flex items-center"
            >
              <VerifiedBadge className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-sky-400" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Open for OJT / Junior Roles
            </span>
          </div>

          {/* Stats Row */}
          <div className="min-w-0 w-full">
            <ProfileStats
              onStatClick={(sectionId, tabName) => {
                if (tabName) onSelectTab(tabName);
                onNavigateToSection(sectionId);
              }}
            />
          </div>
        </div>

        {/* Bio & Identity Block */}
        <div className="col-span-2 sm:col-span-1 sm:col-start-2 row-start-2 flex flex-col gap-0.5 pt-2 sm:pt-1">
          <h1 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-zinc-100 leading-snug tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-snug font-mono">
            {profileData.title} • De La Salle Lipa
          </p>
        </div>
      </div>
    </section>
  );
};
