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
} from "./InteractiveAvatarCanvas";
import { DeveloperIdBadgeModal } from "./DeveloperIdBadgeModal";

interface ProfileHeaderProps {
  onSelectTab: (tab: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onSelectTab,
  onNavigateToSection,
}) => {
  const [avatarMode, setAvatarMode] = useState<AvatarMode>("photo");
  const [portalState, setPortalState] = useState<{
    open: boolean;
    side: "front" | "back";
  }>({ open: false, side: "front" });

  const emitThoughtNote = useCallback((note: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shin-profile-note", {
          detail: { note },
        })
      );
    }
  }, []);

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
        {/* Column 1: Circular Avatar (Opens Real Instagram Portal Card) + Active Status Dot (Opens Close Friends Perks) */}
        <div className="col-start-1 row-start-1 sm:row-span-2 self-start relative flex flex-col items-start flex-shrink-0">
          {/* Retro Pixel Speech Bubble anchored cleanly above upper head */}
          <div
            id="profile-avatar-note-anchor"
            className="absolute bottom-[calc(100%+14px)] sm:bottom-[calc(100%+18px)] left-0 sm:left-1 z-30 pointer-events-auto"
          >
            <ProfileNote tailAlign="left" />
          </div>

          <div className="relative inline-block">
            {/* Primary Avatar Click: Opens "Visit the real @richardallen0901?" Portal Card */}
            <button
              type="button"
              onClick={() => setPortalState({ open: true, side: "front" })}
              data-note="Click my profile to visit my real Instagram (@richardallen0901) or unlock Close Friends perks."
              aria-label="Open Instagram Profile Portal for @richardallen0901"
              title="Visit @richardallen0901 on Instagram or unlock perks"
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

            {/* Authentic Instagram Pulsing Active Dot -> Direct Shortcut to Close Friends Perks (☕ Coffee & Native QR) */}
            <button
              type="button"
              onClick={() => setPortalState({ open: true, side: "back" })}
              data-note="Active in Lipa City, PH — tap the green dot for ☕ Virtual Coffee & instant Contact QR."
              aria-label="Open Close Friends Perks: Virtual Coffee and Native Contact QR"
              title="Close Friends Perks: Virtual Coffee & Contact QR"
              className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 z-20 bg-[#10B981] hover:bg-[#34D399] text-white rounded-full p-1 sm:p-1.5 border-2 border-white dark:border-[#0B0B0F] shadow-md transition-transform duration-200 hover:scale-125 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
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

      {/* Flippable Instagram Profile Portal Card */}
      <DeveloperIdBadgeModal
        isOpen={portalState.open}
        initialSide={portalState.side}
        onClose={() => setPortalState((prev) => ({ ...prev, open: false }))}
        avatarMode={avatarMode}
        onSelectAvatarMode={handleSelectAvatarMode}
      />
    </section>
  );
};
