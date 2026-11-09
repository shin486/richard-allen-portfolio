"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProfileStats } from "./ProfileStats";
import { VerifiedBadge } from "./VerifiedBadge";
import { ProfileNote } from "./ProfileNote";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenStories?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
  onOpenStories,
}) => {
  const handleAvatarClick = () => {
    if (onOpenStories) {
      onOpenStories();
    } else {
      onSelectTab("projects");
      onNavigateToSection("portfolio-grid");
    }
  };

  return (
    <section
      id="profile-header"
      className="pt-14 sm:pt-16 md:pt-20 pb-4 sm:pb-6"
    >
      {/* Unified Responsive Instagram Profile Header */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 sm:gap-x-8 md:gap-x-12">
        {/* Column 1: Circular Avatar with Functional Instagram Story Ring + Thought Bubble Note */}
        <div className="col-start-1 row-start-1 sm:row-span-2 self-center relative flex flex-col items-start flex-shrink-0">
          {/* Retro Pixel Speech Bubble anchored cleanly above upper head */}
          <div
            id="profile-avatar-note-anchor"
            className="absolute bottom-[calc(100%+10px)] sm:bottom-[calc(100%+14px)] left-0 sm:left-1 z-30 pointer-events-auto"
          >
            <ProfileNote tailAlign="left" />
          </div>

          <button
            type="button"
            onClick={handleAvatarClick}
            data-note="Click my story ring to watch my developer highlights, or just hire me already."
            aria-label="Open developer story highlights"
            className="relative group cursor-pointer focus:outline-none text-left"
          >
            <div className="w-[76px] h-[76px] sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-[2.5px] sm:p-[3px] animated-ig-ring shadow-sm sm:shadow-md transition-transform duration-300 group-hover:scale-105 active:scale-95">
              <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] sm:p-[2.5px] transition-colors duration-200">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 640px) 76px, (max-width: 768px) 128px, 144px"
                    className="object-cover"
                    priority
                  />
                  {/* Subtle inner vignette so the bright studio backdrop bridges smoothly into dark mode */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_16px_rgba(0,0,0,0.22)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.38)]"
                  />
                </div>
              </div>
            </div>

            {/* Active Status Dot */}
            <div className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 bg-emerald-500 text-white rounded-full p-0.5 sm:p-1 border-2 border-white dark:border-[#0B0B0F] shadow-sm">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
            </div>
          </button>
        </div>

        {/* Column 2: Username & Interactive 3-Column Stats (Leveled beside Avatar on mobile & desktop) */}
        <div className="col-start-2 row-start-1 self-center sm:self-end flex flex-col justify-center gap-2 sm:gap-3 min-w-0">
          {/* Username & Verified Rosette */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold sm:font-semibold text-base sm:text-xl md:text-2xl text-neutral-900 dark:text-zinc-100 tracking-tight leading-none">
              {profileData.username}
            </span>
            <div
              data-note="Yes, verified. De La Salle Lipa certified, zero buzzword fluff."
              className="cursor-help inline-flex items-center"
            >
              <VerifiedBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Interactive 3-Column Stats Row ("Followers" theme directly below username) */}
          <div className="min-w-0 w-full">
            <ProfileStats
              onStatClick={(sectionId, tabName) => {
                if (tabName) onSelectTab(tabName);
                onNavigateToSection(sectionId);
              }}
            />
          </div>
        </div>

        {/* Bio & Identity Block (Stacked underneath Avatar/Stats in mobile view, leveled in Column 2 on desktop) */}
        <div className="col-span-2 sm:col-span-1 sm:col-start-2 row-start-2 sm:row-start-2 self-start flex flex-col gap-0.5 sm:gap-1 pt-3 sm:pt-3">
          <h1 className="font-bold text-xs sm:text-base text-neutral-900 dark:text-zinc-100 leading-snug">
            {profileData.name}
          </h1>
          <p className="text-neutral-500 dark:text-zinc-400 font-normal text-xs sm:text-sm leading-snug">
            {profileData.title}
          </p>
          <p className="text-neutral-700 dark:text-zinc-300 text-xs sm:text-sm leading-snug">
            4th-year BSIT @{" "}
            <span className="font-semibold text-neutral-900 dark:text-zinc-100">
              De La Salle Lipa
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
