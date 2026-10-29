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
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 sm:gap-x-8 md:gap-x-12">
        {/* Mobile-only thought bubble row above header */}
        <div className="col-span-2 row-start-1 sm:hidden flex justify-start px-0.5 pb-3 max-w-full min-w-0">
          <ProfileNote tailAlign="left" />
        </div>

        {/* Column 1: Avatar with Instagram Animated Story Ring + Desktop Thought Bubble + Title Underneath */}
        <div className="col-start-1 row-start-2 relative flex flex-col items-center sm:items-start flex-shrink-0">
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

          {/* Under Profile Pic: Authentic Instagram Bio Title */}
          <div className="mt-2 sm:mt-2.5 text-center sm:text-left">
            <h1 className="text-xs sm:text-sm md:text-[15px] font-semibold text-neutral-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap">
              Full Stack Developer
            </h1>
          </div>
        </div>

        {/* Column 2: Username & Stats */}
        <div className="col-start-2 row-start-2 flex flex-col justify-center gap-2 sm:gap-4 min-w-0 pt-0.5 sm:pt-2">
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
      </div>
    </section>
  );
};
