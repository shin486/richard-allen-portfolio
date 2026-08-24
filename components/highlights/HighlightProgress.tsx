"use client";

import React from "react";

interface HighlightProgressProps {
  totalStories: number;
  activeStoryIndex: number;
  progressPercent: number; // 0 to 100
}

export const HighlightProgress: React.FC<HighlightProgressProps> = ({
  totalStories,
  activeStoryIndex,
  progressPercent,
}) => {
  return (
    <div className="flex items-center gap-1.5 w-full px-3 pt-3 pb-1 z-30">
      {Array.from({ length: totalStories }).map((_, index) => {
        let width = "0%";
        if (index < activeStoryIndex) {
          width = "100%";
        } else if (index === activeStoryIndex) {
          width = `${Math.min(100, Math.max(0, progressPercent))}%`;
        }

        return (
          <div
            key={index}
            className="flex-1 h-1 sm:h-1.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm shadow-sm"
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
              style={{ width }}
            />
          </div>
        );
      })}
    </div>
  );
};
