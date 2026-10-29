"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProfileStats } from "./ProfileStats";
import { VerifiedBadge } from "./VerifiedBadge";
import { ProfileNote } from "./ProfileNote";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

const ROLE_TEXT = "Full Stack Developer";
const TOTAL_XP_BLOCKS = 20;

/**
 * Calculates live BSIT degree completion percentage toward June 2, 2026.
 * Start of 4-year BSIT: August 15, 2022 -> Target Graduation: June 2, 2026.
 * Handles local dev clocks skewed ahead of June 2, 2026 by normalizing the year.
 */
function calculateGraduationXp(): number {
  const startMs = new Date("2022-08-15T00:00:00+08:00").getTime();
  const gradMs = new Date("2026-06-02T00:00:00+08:00").getTime();
  const now = new Date();

  // If a local dev machine clock is set past June 2, 2026, normalize back 1 year
  // so pre-graduation progress remains live (~84%–96%) rather than clamping at 100%.
  if (now.getTime() >= gradMs) {
    now.setFullYear(2025);
  }

  const clampedNow = Math.max(startMs, Math.min(now.getTime(), gradMs));
  const rawPct = Math.round(((clampedNow - startMs) / (gradMs - startMs)) * 100);
  return Math.max(75, Math.min(97, rawPct));
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
}) => {
  const [targetPct, setTargetPct] = useState<number>(85);
  const [animatedBlocks, setAnimatedBlocks] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(ROLE_TEXT.length);
  const [replayNonce, setReplayNonce] = useState<number>(0);

  useEffect(() => {
    setTargetPct(calculateGraduationXp());
  }, []);

  const targetBlocks = Math.max(
    1,
    Math.min(
      TOTAL_XP_BLOCKS - 1,
      Math.round((targetPct / 100) * TOTAL_XP_BLOCKS)
    )
  );

  // Chunky 8-bit step fill for the XP bar & RPG typewriter for the role title
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAnimatedBlocks(targetBlocks);
      setTypedChars(ROLE_TEXT.length);
      return;
    }

    setAnimatedBlocks(0);
    setTypedChars(0);

    let currentBlock = 0;
    const xpInterval = window.setInterval(() => {
      currentBlock += 1;
      setAnimatedBlocks(currentBlock);
      if (currentBlock >= targetBlocks) {
        window.clearInterval(xpInterval);
      }
    }, 42);

    let currentChar = 0;
    const typeInterval = window.setInterval(() => {
      currentChar += 1;
      setTypedChars(currentChar);
      if (currentChar >= ROLE_TEXT.length) {
        window.clearInterval(typeInterval);
      }
    }, 38);

    return () => {
      window.clearInterval(xpInterval);
      window.clearInterval(typeInterval);
    };
  }, [targetBlocks, replayNonce]);

  const displayedPct =
    targetBlocks > 0
      ? Math.min(
          targetPct,
          Math.round((animatedBlocks / targetBlocks) * targetPct)
        )
      : targetPct;

  const handleViewProjects = () => {
    onSelectTab("projects");
    onNavigateToSection("portfolio-grid");
  };

  const handleReplayXp = useCallback(() => {
    setReplayNonce((n) => n + 1);
  }, []);

  return (
    <section id="profile-header" className="pt-6 sm:pt-16 md:pt-20 pb-3 sm:pb-6">
      {/* Unified Responsive Instagram Profile Header */}
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 sm:gap-x-8 md:gap-x-12">
        {/* Mobile-only thought bubble row above header */}
        <div className="col-span-2 row-start-1 sm:hidden flex justify-start px-0.5 pb-3 max-w-full min-w-0">
          <ProfileNote tailAlign="left" />
        </div>

        {/* Column 1: Avatar with Instagram Animated Story Ring + Desktop Thought Bubble + RPG Role Title */}
        <div className="col-start-1 row-start-2 sm:row-span-2 relative flex flex-col items-center sm:items-start flex-shrink-0">
          {/* Desktop Thought Bubble Note anchored cleanly above avatar */}
          <div className="hidden sm:block absolute bottom-[calc(100%+12px)] left-0 sm:left-2 z-30 pointer-events-auto">
            <ProfileNote tailAlign="left" />
          </div>

          <div
            className="relative group cursor-pointer"
            onClick={handleViewProjects}
            data-note="Why are you staring at my 2x2 ID photo? Just hire me already."
            title="Click to view featured projects"
          >
            <div className="w-[72px] h-[72px] sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-[2.5px] sm:p-[3px] animated-ig-ring shadow-sm sm:shadow-md transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] sm:p-[2.5px] transition-colors duration-200">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 640px) 72px, (max-width: 768px) 128px, 144px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Active Status Dot */}
            <div className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 bg-emerald-500 text-white rounded-full p-0.5 sm:p-1 border-2 border-white dark:border-[#0B0B0F] shadow-sm">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Under Profile Pic: RPG Dialogue Typewriter Bio Title + Blinking 8-Bit Cursor */}
          <div
            onClick={handleReplayXp}
            data-note="Full Stack Developer. React Native on mobile, Next.js and Supabase on web."
            title="Click to replay animation"
            className="mt-2 sm:mt-2.5 text-center sm:text-left cursor-pointer select-none"
          >
            <h1 className="inline-flex items-center text-[11px] sm:text-sm md:text-[15px] font-semibold text-neutral-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap">
              <span>{ROLE_TEXT.slice(0, typedChars)}</span>
              <span
                aria-hidden="true"
                className="inline-block w-[5px] h-[11px] sm:w-[6px] sm:h-[13px] bg-ig-pink ml-1 align-middle pixel-blink flex-shrink-0"
              />
            </h1>
          </div>
        </div>

        {/* Column 2, Top: Username & Stats */}
        <div className="col-start-2 row-start-2 flex flex-col justify-center gap-2 sm:gap-3.5 min-w-0 pt-0.5 sm:pt-1">
          {/* Username & Verified Rosette */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold sm:font-semibold text-base sm:text-xl md:text-2xl text-neutral-900 dark:text-zinc-100 tracking-tight">
              {profileData.username}
            </span>
            <div
              title="Verified Developer Profile"
              data-note="Yes, verified. De La Salle Lipa certified, zero buzzword fluff."
              className="cursor-help inline-flex items-center"
            >
              <VerifiedBadge className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Stats Row */}
          <div className="min-w-0">
            <ProfileStats
              onStatClick={(sectionId, tabName) => {
                if (tabName) onSelectTab(tabName);
                onNavigateToSection(sectionId);
              }}
            />
          </div>
        </div>

        {/* Column 2, Bottom (Spans full width on mobile, sits cleanly under stats on desktop): 8-Bit Graduation XP Bar */}
        <div className="col-span-2 row-start-3 sm:col-span-1 sm:col-start-2 sm:row-start-3 mt-3 sm:mt-3.5 max-w-md">
          <div
            onClick={handleReplayXp}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleReplayXp();
              }
            }}
            data-note={`${targetPct}% loaded. Graduation DLC drops June 2, 2026. Hire me before the patch.`}
            title="Click to replay XP bar animation"
            className="group/xp cursor-pointer select-none rounded-lg px-3 py-2 bg-neutral-100/90 dark:bg-[#14141d] border border-neutral-300/90 dark:border-[#2e2e3e] shadow-2xs transition-transform duration-150 active:scale-[0.99]"
          >
            {/* Top Metadata Line */}
            <div className="flex items-center justify-between gap-2 mb-1.5 font-pixel text-[8px] sm:text-[9px] leading-none tracking-tight">
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <span className="px-1.5 py-0.5 bg-ig-pink/15 dark:bg-ig-pink/20 text-ig-pink border border-ig-pink/40 font-bold">
                  LV.4
                </span>
                <span className="text-neutral-700 dark:text-zinc-200 truncate">
                  BSIT @ DE LA SALLE LIPA
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 tabular-nums">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {displayedPct}%
                </span>
                <span className="text-neutral-400 dark:text-zinc-500 hidden xs:inline sm:inline">
                  · JUN 2, 2026
                </span>
              </div>
            </div>

            {/* 8-Bit Segmented XP Track (20 discrete blocks) */}
            <div
              className="grid gap-[2px] sm:gap-[2.5px] p-[2.5px] bg-neutral-200/80 dark:bg-[#0B0B0F] border border-neutral-300 dark:border-[#262635]"
              style={{
                gridTemplateColumns: `repeat(${TOTAL_XP_BLOCKS}, minmax(0, 1fr))`,
              }}
              aria-label={`Graduation progress: ${targetPct}% toward June 2, 2026`}
            >
              {Array.from({ length: TOTAL_XP_BLOCKS }).map((_, idx) => {
                const isFilled = idx < animatedBlocks;
                const isLeadingEdge =
                  idx === animatedBlocks - 1 && animatedBlocks === targetBlocks;

                return (
                  <span
                    key={idx}
                    className={`h-2 sm:h-2.5 relative transition-none ${
                      isFilled
                        ? "bg-gradient-to-b from-emerald-400 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
                        : "bg-neutral-300/60 dark:bg-zinc-800/70"
                    } ${isLeadingEdge ? "pixel-blink" : ""}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
