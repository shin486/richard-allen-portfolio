"use client";

import React from "react";
import Image from "next/image";
import { X, CheckCircle2, Pause, Play } from "lucide-react";
import { profileData } from "@/data/profile";

interface HighlightHeaderProps {
  highlightTitle: string;
  timeAgo?: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onClose: () => void;
}

export const HighlightHeader: React.FC<HighlightHeaderProps> = ({
  highlightTitle,
  timeAgo = "1d ago",
  isPaused,
  onTogglePause,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between px-3.5 py-2 z-30 text-white select-none">
      {/* Left: Author Profile Info */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full p-[1.5px] bg-ig-gradient shadow-sm">
          <div className="w-full h-full bg-slate-900 rounded-full overflow-hidden relative">
            <Image
              src={profileData.avatarUrl}
              alt={profileData.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-white drop-shadow-sm">
              {profileData.username}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span className="text-white/70 text-[11px] font-normal">• {highlightTitle}</span>
          </div>
          <span className="text-[10px] text-white/60 font-medium">{timeAgo}</span>
        </div>
      </div>

      {/* Right: Controls (Pause Toggle & Close Button) */}
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePause();
          }}
          className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none"
          title={isPaused ? "Resume (Space)" : "Pause (Space)"}
          aria-label={isPaused ? "Resume story" : "Pause story"}
        >
          {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none"
          title="Close (Esc)"
          aria-label="Close story viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
