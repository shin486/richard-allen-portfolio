"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { profileData } from "@/data/profile";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-zinc-800 bg-white/80 dark:bg-[#0B0B0F]/80 backdrop-blur-sm transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-zinc-400">
        {/* Left: Branding & School */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-neutral-900 dark:text-zinc-100">
            {profileData.name} ({profileData.preferredName})
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-zinc-700">•</span>
          <span className="font-mono">@{profileData.username}</span>
          <span className="hidden sm:inline text-neutral-300 dark:text-zinc-700">•</span>
          <span>{profileData.educationSummary.school}</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-zinc-800/80 hover:bg-neutral-200 dark:hover:bg-zinc-700 text-neutral-800 dark:text-zinc-200 font-semibold transition-colors focus:outline-none border border-neutral-200 dark:border-zinc-700/60"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="border-t border-neutral-100 dark:border-zinc-800/60 py-3 text-center text-[11px] text-neutral-400 dark:text-zinc-500">
        Designed with an Instagram-inspired layout for modern developer portfolios • © {new Date().getFullYear()} {profileData.name}
      </div>
    </footer>
  );
};
