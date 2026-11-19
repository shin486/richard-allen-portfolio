"use client";

import React, { useState, useCallback } from "react";
import { profileData } from "@/data/profile";
import { ProfileStats } from "./ProfileStats";
import { VerifiedBadge } from "./VerifiedBadge";
import { ProfileNote } from "./ProfileNote";
import {
  AvatarMode,
  InteractiveAvatarCanvas,
  getAvatarModeConfig,
  getNextAvatarMode,
} from "./InteractiveAvatarCanvas";
import { DeveloperIdBadgeModal } from "./DeveloperIdBadgeModal";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onSwitchToRecruiter?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
  onSwitchToRecruiter,
}) => {
  const [avatarMode, setAvatarMode] = useState<AvatarMode>("photo");
  const [isBadgeOpen, setIsBadgeOpen] = useState(false);

  const emitThoughtNote = useCallback((note: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shin-profile-note", {
          detail: { note },
        })
      );
    }
  }, []);

  const handleCycleAvatarMode = useCallback(() => {
    setAvatarMode((prev) => {
      const next = getNextAvatarMode(prev);
      const cfg = getAvatarModeConfig(next);
      emitThoughtNote(cfg.thoughtNote);
      return next;
    });
  }, [emitThoughtNote]);

  const handleSelectAvatarMode = useCallback(
    (mode: AvatarMode) => {
      setAvatarMode(mode);
      const cfg = getAvatarModeConfig(mode);
      emitThoughtNote(cfg.thoughtNote);
    },
    [emitThoughtNote]
  );

  const activeModeConfig = getAvatarModeConfig(avatarMode);

  return (
    <section
      id="profile-header"
      className="pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6"
    >
      {/* Unified Responsive Instagram Profile Header */}
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-5 sm:gap-x-8 md:gap-x-12">
        {/* Column 1: Interactive Live Canvas Avatar + Emerald 3D Holographic ID Trigger + Thought Bubble Note */}
        <div className="col-start-1 row-start-1 sm:row-span-2 self-start relative flex flex-col items-start flex-shrink-0">
          {/* Retro Pixel Speech Bubble anchored cleanly above upper head */}
          <div
            id="profile-avatar-note-anchor"
            className="absolute bottom-[calc(100%+14px)] sm:bottom-[calc(100%+18px)] left-0 sm:left-1 z-30 pointer-events-auto"
          >
            <ProfileNote tailAlign="left" />
          </div>

          <div className="relative inline-block">
            {/* Primary Avatar Button: Single Click Cycles Live Canvas Portrait Modes */}
            <button
              type="button"
              onClick={handleCycleAvatarMode}
              data-note="Click my portrait to cycle live Canvas lenses (Photo → ASCII → 8-Bit → Cyber Scan)."
              aria-label={`Switch portrait lens mode (currently ${activeModeConfig.label})`}
              title={`Portrait lens: ${activeModeConfig.label} — click to switch`}
              className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-full block text-left"
            >
              <div className="w-[76px] h-[76px] sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-[2.5px] sm:p-[3px] animated-ig-ring shadow-sm sm:shadow-md transition-transform duration-300 group-hover:scale-105 active:scale-95">
                <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] sm:p-[2.5px] transition-colors duration-200">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                    <InteractiveAvatarCanvas
                      mode={avatarMode}
                      sizes="(max-width: 640px) 76px, (max-width: 768px) 128px, 144px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Subtle Micro Lens Badge when a Canvas Mode (ASCII / 8-BIT / SCAN) is active */}
              {avatarMode !== "photo" && (
                <span className="pointer-events-none absolute -top-1 -right-1 sm:top-0 sm:right-0 px-1.5 py-0.5 rounded-full bg-[#0A0A0B]/95 border border-[#10B981]/60 font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-[#10B981] shadow-md">
                  {activeModeConfig.shortTag}
                </span>
              )}
            </button>

            {/* Pulsing Emerald Status / 3D Holographic ID Pass Trigger */}
            <button
              type="button"
              onClick={() => setIsBadgeOpen(true)}
              data-note="Tap the emerald ID pass for my 3D Holographic Dev Badge: live PH clock, scannable Resume QR & .vcf contact."
              aria-label="Open 3D Holographic Developer ID Badge and Live Telemetry"
              title="Open 3D Holographic Developer ID Badge"
              className="group/id absolute -bottom-0.5 -right-1 sm:bottom-1 sm:right-0 md:bottom-1.5 md:right-0.5 z-20 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-[#10B981] hover:bg-[#34D399] text-[#04140D] border-2 border-white dark:border-[#0B0B0F] shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span className="font-mono text-[8px] sm:text-[10px] font-extrabold tracking-wider leading-none">
                ID
              </span>
            </button>
          </div>
        </div>

        {/* Column 2: Username & Interactive 3-Column Stats (Leveled beside Avatar on mobile & desktop) */}
        <div className="col-start-2 row-start-1 self-center sm:self-end flex flex-col justify-center gap-2 sm:gap-2.5 pt-1 sm:pt-2.5 min-w-0">
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
        <div className="col-span-2 sm:col-span-1 sm:col-start-2 row-start-2 sm:row-start-2 self-start flex flex-col gap-0.5 sm:gap-1 pt-3 sm:pt-2.5">
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

      {/* 3D Holographic Developer ID Badge Modal (Live PH Clock + Scannable QR + .vcf + Recruiter Switch) */}
      <DeveloperIdBadgeModal
        isOpen={isBadgeOpen}
        onClose={() => setIsBadgeOpen(false)}
        avatarMode={avatarMode}
        onSelectAvatarMode={handleSelectAvatarMode}
        onSwitchToRecruiter={onSwitchToRecruiter}
      />
    </section>
  );
};
