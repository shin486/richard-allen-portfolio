"use client";

import React from "react";
import {
  WifiOff,
  Calculator,
  ShieldCheck,
  Sparkles,
  Keyboard,
  Cloud,
  Briefcase,
  Plus,
} from "lucide-react";
import { devBlogPosts, BlogCoverIcon } from "@/data/blogPosts";

interface HighlightsProps {
  seenPostIds: Record<string, boolean>;
  onOpenPost: (index: number) => void;
  onOpenArchive: () => void;
}

const getCoverIcon = (iconName: BlogCoverIcon) => {
  switch (iconName) {
    case "WifiOff":
      return WifiOff;
    case "Calculator":
      return Calculator;
    case "ShieldCheck":
      return ShieldCheck;
    case "Sparkles":
      return Sparkles;
    case "Keyboard":
      return Keyboard;
    case "Cloud":
      return Cloud;
    case "Briefcase":
      return Briefcase;
    default:
      return Sparkles;
  }
};

export const Highlights: React.FC<HighlightsProps> = ({
  seenPostIds,
  onOpenPost,
  onOpenArchive,
}) => {
  return (
    <section
      aria-label="Engineering Dev Journal Highlights"
      className="py-2.5 sm:py-3.5 border-b border-neutral-200/70 dark:border-zinc-800/80 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex items-center gap-3.5 xs:gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-1.5 px-0.5 touch-pan-x overscroll-x-contain">
        {devBlogPosts.map((post, index) => {
          const Icon = getCoverIcon(post.coverIcon);
          const isSeen = !!seenPostIds[post.id];

          const ringClass = isSeen
            ? "p-[1.5px] bg-neutral-200 dark:bg-zinc-800 group-hover:bg-neutral-300 dark:group-hover:bg-zinc-700"
            : post.isCloseFriends
            ? "p-[2px] bg-[#10B981] shadow-[0_0_12px_-3px_rgba(16,185,129,0.5)]"
            : "p-[2px] animated-ig-ring";

          return (
            <button
              key={post.id}
              type="button"
              onClick={() => onOpenPost(index)}
              data-note={`Dev Note (${post.readTime}): ${post.headline}`}
              className="flex flex-col items-center gap-1.5 group flex-shrink-0 focus:outline-none transition-transform active:scale-95"
              aria-label={`Read ${post.shortTitle} engineering note (${post.readTime})`}
            >
              {/* Authentic Instagram Highlight Ring: Unseen Sunset/Close-Friends Ring -> Seen Muted Grey */}
              <div className="relative">
                <div
                  className={`w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] rounded-full transition-all duration-300 group-hover:scale-105 ${ringClass}`}
                >
                  {/* Inner White / Dark Gap */}
                  <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] flex items-center justify-center transition-colors duration-200">
                    {/* Curated Tinted Icon Cover */}
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center border transition-all duration-200 ${post.coverTintClass}`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>
                </div>

                {/* Instagram Close Friends Star Micro-Badge on OJT Log */}
                {post.isCloseFriends && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-[#10B981] text-[#05140D] border-2 border-white dark:border-[#0B0B0F] flex items-center justify-center text-[9px] font-black leading-none shadow-sm"
                  >
                    ★
                  </span>
                )}
              </div>

              {/* Highlight Title & Read Time */}
              <div className="flex flex-col items-center leading-tight">
                <span
                  className={`text-xs tracking-tight transition-colors truncate max-w-[68px] sm:max-w-[76px] text-center ${
                    isSeen
                      ? "font-normal text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-zinc-200"
                      : "font-semibold text-neutral-800 dark:text-zinc-200 group-hover:text-neutral-950 dark:group-hover:text-white"
                  }`}
                >
                  {post.shortTitle}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 tabular-nums hidden sm:inline mt-0.5">
                  {post.readTime}
                </span>
              </div>
            </button>
          );
        })}

        {/* 8th Authentic Instagram '+ Archive' Circle -> Opens Full Filterable Dev Journal Index */}
        <button
          type="button"
          onClick={onOpenArchive}
          data-note="Open the full Dev Journal archive — filter all 7 engineering posts by topic or bookmarks."
          className="flex flex-col items-center gap-1.5 group flex-shrink-0 focus:outline-none transition-transform active:scale-95"
          aria-label="Open Dev Journal Archive (All 7 engineering posts)"
        >
          <div className="w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] rounded-full p-[2px] border border-dashed border-neutral-300 dark:border-zinc-700 group-hover:border-neutral-500 dark:group-hover:border-zinc-500 transition-all duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-full p-[2px] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-neutral-50 dark:bg-[#13141B] text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-white flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:rotate-90" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center leading-tight">
            <span className="text-xs font-medium tracking-tight text-neutral-600 dark:text-zinc-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors text-center">
              Archive
            </span>
            <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 tabular-nums hidden sm:inline mt-0.5">
              All {devBlogPosts.length}
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};
