"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
}) => {
  return (
    <section id="profile-header" className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7">
        {/* Step 1: Clean, High-End Avatar Frame (No SVG ring, No level badge, No tooltip) */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 shadow-xl flex-shrink-0">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900">
            <Image
              src={profilePic}
              alt={profileData.name}
              fill
              sizes="(max-width: 640px) 80px, 112px"
              className="w-full h-full rounded-full object-cover object-top filter contrast-[1.02]"
              priority
            />
          </div>
        </div>

        {/* Step 2: Streamlined Bio Hierarchy & Integrated Academic Timeline */}
        <div className="flex flex-col justify-center space-y-2 min-w-0">
          {/* Handle & Verification & Availability */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-base sm:text-lg font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
              {profileData.username}
            </span>
            {/* Clean SVG Verified Checkmark */}
            <svg
              className="w-4 h-4 text-sky-400 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-label="Verified Developer Profile"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <span className="text-neutral-400 dark:text-zinc-600 font-mono text-xs hidden sm:inline">
              •
            </span>
            {/* Availability Pulse Badge */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for OJT / Junior Roles
            </span>
          </div>

          {/* Quantitative Stats Row */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-neutral-600 dark:text-zinc-400 py-0.5">
            <button
              type="button"
              onClick={() => {
                onSelectTab("projects");
                onNavigateToSection("portfolio-grid");
              }}
              className="hover:text-neutral-950 dark:hover:text-zinc-100 transition-colors focus:outline-none"
            >
              <span className="font-bold text-neutral-950 dark:text-zinc-100">06</span> projects
            </button>
            <span className="text-neutral-300 dark:text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => {
                onSelectTab("skills");
                onNavigateToSection("skills-section");
              }}
              className="hover:text-neutral-950 dark:hover:text-zinc-100 transition-colors focus:outline-none"
            >
              <span className="font-bold text-neutral-950 dark:text-zinc-100">28</span> technologies
            </button>
            <span className="text-neutral-300 dark:text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => {
                onSelectTab("certificates");
                onNavigateToSection("certificates-section");
              }}
              className="hover:text-neutral-950 dark:hover:text-zinc-100 transition-colors focus:outline-none"
            >
              <span className="font-bold text-neutral-950 dark:text-zinc-100">05</span> credentials
            </button>
          </div>

          {/* Name, Focus & Academic Credentials */}
          <div className="space-y-0.5">
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-950 dark:text-zinc-100">
              {profileData.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 font-normal">
              {profileData.title}
            </p>
            <p className="text-xs font-mono text-neutral-500 dark:text-zinc-500">
              4th-Year BSIT Senior @ De La Salle Lipa{" "}
              <span className="text-neutral-700 dark:text-zinc-400">(Graduating June 2027)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
