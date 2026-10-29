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
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
}) => {
  const handleViewProjects = () => {
    onSelectTab("projects");
    onNavigateToSection("portfolio-grid");
  };

  return (
    <section id="profile-header" className="pt-6 sm:pt-16 md:pt-20 pb-3 sm:pb-6">
      {/* Unified Responsive Instagram Profile Header */}
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 sm:gap-x-8 md:gap-x-12">
        {/* Mobile-only thought bubble row above header */}
        <div className="col-span-2 row-start-1 sm:hidden flex justify-start px-0.5 pb-3 max-w-full min-w-0">
          <ProfileNote tailAlign="left" />
        </div>

        {/* Avatar with Instagram Animated Story Ring + Desktop Thought Bubble */}
        <div className="col-start-1 row-start-2 sm:row-start-1 sm:row-span-3 relative flex flex-col items-start flex-shrink-0">
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
        </div>

        {/* Username & Verified Rosette (Row 1 on desktop, Row 3 on mobile) */}
        <div className="col-span-2 sm:col-span-1 sm:col-start-2 row-start-3 sm:row-start-1 flex items-center gap-1.5 pt-2 sm:pt-0">
          <span className="font-bold sm:font-semibold text-sm sm:text-xl md:text-2xl text-neutral-900 dark:text-zinc-100 tracking-tight">
            {profileData.username}
          </span>
          <div
            title="Verified Developer Profile"
            data-note="Yes, verified. De La Salle Lipa certified, zero buzzword fluff."
            className="cursor-help inline-flex items-center"
          >
            <VerifiedBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>
        </div>

        {/* Stats Row (Row 2 beside Avatar on mobile, Row 2 below Username on desktop) */}
        <div className="col-start-2 row-start-2 sm:col-start-2 sm:row-start-2 self-center sm:self-auto min-w-0 sm:pt-1">
          <ProfileStats
            onStatClick={(sectionId, tabName) => {
              if (tabName) onSelectTab(tabName);
              onNavigateToSection(sectionId);
            }}
          />
        </div>

        {/* Bio & Information (Row 4 on mobile, Row 3 on desktop) */}
        <div className="col-span-2 sm:col-span-1 sm:col-start-2 row-start-4 sm:row-start-3 flex flex-col gap-0.5 sm:gap-1 text-xs sm:text-sm sm:text-[15px] pt-1">
          <h1 className="font-semibold sm:font-bold text-xs sm:text-base text-neutral-900 dark:text-zinc-100 leading-snug">
            {profileData.name}
          </h1>
          <p className="text-neutral-500 dark:text-zinc-400 font-medium">
            {profileData.title}
          </p>
          <p className="text-neutral-700 dark:text-zinc-300 leading-snug">
            4th-year BSIT @{" "}
            <span className="font-semibold text-neutral-900 dark:text-zinc-100">
              De La Salle Lipa
            </span>
          </p>

          {/* OJT Availability Badge */}
          <div className="pt-1 sm:pt-1.5 flex items-center gap-2">
            <span
              data-note="Open for OJT and junior engineering roles. Ready to deploy."
              className="inline-flex items-center gap-1 sm:gap-1.5 text-[10.5px] sm:text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 shadow-2xs w-fit cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open for OJT &amp; Opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
