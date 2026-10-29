"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProfileStats } from "./ProfileStats";
import { VerifiedBadge } from "./VerifiedBadge";

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
    <section id="profile-header" className="pt-3 sm:pt-8 pb-3 sm:pb-6">
      {/* DESKTOP LAYOUT (sm and up): Clean Instagram Web 2-Column Structure */}
      <div className="hidden sm:flex items-start gap-8 md:gap-12">
        {/* Left Column: Avatar with Instagram Animated Story Ring */}
        <div
          className="relative group cursor-pointer flex-shrink-0"
          onClick={handleViewProjects}
          title="Click to view featured projects"
        >
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-[3px] animated-ig-ring shadow-md transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2.5px] transition-colors duration-200">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
                <Image
                  src={profilePic}
                  alt={profileData.name}
                  fill
                  sizes="(max-width: 768px) 128px, 144px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Active Status Dot */}
          <div
            className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white dark:border-[#0B0B0F] shadow-sm"
            title="Open for OJT & Full-Stack Opportunities"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        {/* Right Column: Identity, Stats & Bio Docked Beside Avatar */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Row 1: Username & Verified Rosette */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xl md:text-2xl text-neutral-900 dark:text-zinc-100 tracking-tight">
              {profileData.username}
            </span>
            <div title="Verified Developer Profile" className="cursor-help inline-flex items-center">
              <VerifiedBadge className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Row 2: Stats Row */}
          <div className="pt-0.5">
            <ProfileStats
              onStatClick={(sectionId, tabName) => {
                if (tabName) onSelectTab(tabName);
                onNavigateToSection(sectionId);
              }}
            />
          </div>

          {/* Row 3: Name & Bio Information */}
          <div className="flex flex-col gap-1 text-sm sm:text-[15px] pt-1">
            <h1 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-zinc-100 leading-snug">
              {profileData.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 font-medium">
              {profileData.title}
            </p>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-zinc-300 leading-snug">
              4th-year BSIT @{" "}
              <span className="font-semibold text-neutral-900 dark:text-zinc-100">
                De La Salle Lipa
              </span>
            </p>

            {/* OJT Availability Badge */}
            <div className="pt-1.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 shadow-2xs w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open for OJT &amp; Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (< sm): Clean Instagram Mobile App Structure */}
      <div className="sm:hidden flex flex-col gap-3">
        {/* Mobile Top Row: Avatar on Left, Stats on Right */}
        <div className="flex items-center gap-4">
          <div
            className="relative group cursor-pointer flex-shrink-0"
            onClick={handleViewProjects}
          >
            <div className="w-[74px] h-[74px] rounded-full p-[2.5px] animated-ig-ring shadow-sm">
              <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="74px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white dark:border-[#0B0B0F]">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Stats on the right */}
          <div className="flex-1">
            <ProfileStats
              onStatClick={(sectionId, tabName) => {
                if (tabName) onSelectTab(tabName);
                onNavigateToSection(sectionId);
              }}
            />
          </div>
        </div>

        {/* Mobile Middle: Name, Title, Education, Badge */}
        <div className="flex flex-col gap-0.5 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm text-neutral-900 dark:text-zinc-100">
              {profileData.name}
            </span>
            <VerifiedBadge className="w-3.5 h-3.5" />
          </div>
          <p className="text-neutral-500 dark:text-zinc-400 font-medium">
            {profileData.title}
          </p>
          <p className="text-neutral-700 dark:text-zinc-300">
            4th-year BSIT @{" "}
            <span className="font-semibold text-neutral-900 dark:text-zinc-100">
              De La Salle Lipa
            </span>
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open for OJT &amp; Opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
