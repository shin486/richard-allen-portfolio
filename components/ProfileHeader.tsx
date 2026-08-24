"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Download, Code2 } from "lucide-react";
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
    <section id="profile-header" className="pt-6 sm:pt-10 pb-6 sm:pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 md:gap-16">
        {/* Profile Picture with Animated IG Gradient Story Ring */}
        <div className="flex sm:flex-col items-center gap-4 sm:gap-3 mx-auto sm:mx-0">
          <div className="relative group cursor-pointer" onClick={handleViewProjects}>
            {/* Outer animated gradient story ring */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[2.5px] sm:p-[3px] animated-ig-ring shadow-md transition-transform duration-300 group-hover:scale-105">
              {/* Gap between ring and avatar */}
              <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] transition-colors duration-200">
                {/* Avatar Image container */}
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900 flex items-center justify-center">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 160px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Active Status Indicator */}
            <div
              className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white dark:border-[#0B0B0F] shadow-sm"
              title="Open to OJT / Internship"
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Mobile-only username snippet next to photo */}
          <div className="sm:hidden flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-lg text-neutral-900 dark:text-zinc-100">
                {profileData.username}
              </h1>
              <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
            </div>
            <span className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">
              {profileData.title}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-medium mt-1 w-fit border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Open for OJT
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Username & Action Buttons Row (Desktop) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <h1 className="font-bold text-xl sm:text-2xl text-neutral-900 dark:text-zinc-100 tracking-tight">
                {profileData.username}
              </h1>
              <div title="Verified Developer Profile" className="cursor-help">
                <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500 inline" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleViewProjects}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold text-white bg-ig-gradient hover:opacity-95 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Code2 className="w-4 h-4" />
                <span>View Projects</span>
              </button>

              <a
                href={profileData.socials.resumeUrl}
                download="Richard_Allen_Liman_Resume.pdf"
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800/90 hover:bg-neutral-200 dark:hover:bg-zinc-700/90 border border-neutral-200 dark:border-zinc-700/60 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <ProfileStats
            onStatClick={(sectionId, tabName) => {
              if (tabName) onSelectTab(tabName);
              onNavigateToSection(sectionId);
            }}
          />

          {/* Name, Handle & Professional Summary */}
          <div className="flex flex-col gap-2 text-sm sm:text-[15px]">
            {/* Primary Name + muted sub-label */}
            <div>
              <h1 className="font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight">
                {profileData.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-zinc-500 mt-0.5">
                @{profileData.username}
                <span className="text-neutral-300 dark:text-zinc-700"> · </span>
                {profileData.title}
              </p>
            </div>

            {/* Single high-impact summary line */}
            <p className="text-neutral-700 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {profileData.bio}
            </p>

            {/* Metadata: Education · Stack · Status (pipe/dot divided, no emojis) */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-600 dark:text-zinc-400">
              <span className="font-semibold text-neutral-900 dark:text-zinc-100">
                Education: <span>BS Information Technology</span>
              </span>
              <span className="text-neutral-400 dark:text-zinc-500">{profileData.educationSummary.school}</span>
              <span className="text-neutral-300 dark:text-zinc-700">|</span>
              <span className="font-semibold text-neutral-900 dark:text-zinc-100">
                Stack: <span>React · React Native · Node.js · TypeScript · Tailwind CSS</span>
              </span>
              <span className="text-neutral-300 dark:text-zinc-700">|</span>
              <span className="font-medium text-emerald-700 dark:text-emerald-400">
                {profileData.statusMessage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
