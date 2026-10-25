"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProfileStats } from "./ProfileStats";

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
      {/* Top Section: Avatar on left, Stats on right (authentic Instagram mobile layout) */}
      <div className="flex items-center gap-4 sm:gap-12 md:gap-16">
        {/* Profile Picture with Animated IG Gradient Story Ring */}
        <div
          className="relative group cursor-pointer flex-shrink-0"
          onClick={handleViewProjects}
        >
          <div className="w-[78px] h-[78px] sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[2.5px] sm:p-[3px] animated-ig-ring shadow-md transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] transition-colors duration-200">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
                <Image
                  src={profilePic}
                  alt={profileData.name}
                  fill
                  sizes="(max-width: 640px) 78px, (max-width: 768px) 144px, 160px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Active Status Indicator */}
          <div
            className="absolute bottom-0.5 right-0.5 sm:bottom-2 sm:right-2 bg-emerald-500 text-white rounded-full p-0.5 sm:p-1 border-2 border-white dark:border-[#0B0B0F] shadow-sm"
            title="Open to OJT / Internship"
          >
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        {/* Right Side: Desktop Username + Stats */}
        <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-4 min-w-0">
          {/* Username Row (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <h1 className="font-bold text-xl sm:text-2xl text-neutral-900 dark:text-zinc-100 tracking-tight">
              {profileData.username}
            </h1>
            <div title="Verified Developer Profile" className="cursor-help">
              <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500 inline" />
            </div>
          </div>

          {/* Stats Row */}
          <ProfileStats
            onStatClick={(sectionId, tabName) => {
              if (tabName) onSelectTab(tabName);
              onNavigateToSection(sectionId);
            }}
          />
        </div>
      </div>

      {/* Bio Block (Directly beneath avatar + stats, exactly like Instagram mobile) */}
      <div className="mt-3 sm:mt-4 flex flex-col gap-1 text-sm sm:text-[15px]">
        {/* Name and Mobile Username */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <h1 className="font-bold text-[15px] sm:text-xl text-neutral-900 dark:text-white tracking-tight">
            {profileData.name}
          </h1>
          <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 sm:hidden inline flex-shrink-0" />
          <span className="text-xs text-neutral-400 dark:text-zinc-500 font-mono sm:hidden">
            @{profileData.username}
          </span>
        </div>

        {/* Professional Category / Title */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 font-medium">
          {profileData.title}
        </p>

        {/* Education Line */}
        <p className="text-xs sm:text-sm text-neutral-700 dark:text-zinc-300 leading-snug">
          4th-year BSIT @ <span className="font-medium text-neutral-900 dark:text-zinc-100">De La Salle Lipa</span>
        </p>

        {/* OJT Availability Badge */}
        <div className="pt-1 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open for OJT &amp; Internships
          </span>
        </div>
      </div>
    </section>
  );
};
