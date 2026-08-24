"use client";

import React from "react";
import { Sparkles, Quote, CheckCircle2 } from "lucide-react";
import { HighlightStory } from "@/data/highlights";

interface TextStoryProps {
  story: HighlightStory;
}

export const TextStory: React.FC<TextStoryProps> = ({ story }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-7 text-white select-none">
      {/* Top Badge */}
      <div className="flex items-center justify-between">
        {story.badge && (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {story.badge}
          </span>
        )}
      </div>

      {/* Main Content Body */}
      <div className="flex flex-col gap-4 my-auto">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            {story.heading}
          </h2>
          {story.subheading && (
            <p className="text-sm sm:text-base font-semibold text-pink-200 mt-1">
              {story.subheading}
            </p>
          )}
        </div>

        {story.description && (
          <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-normal bg-black/30 p-4 rounded-2xl backdrop-blur-md border border-white/10">
            {story.description}
          </p>
        )}

        {/* Optional Bullet/List Items */}
        {story.items && story.items.length > 0 && (
          <div className="space-y-2 mt-1">
            {story.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/10 text-xs sm:text-sm"
              >
                <div>
                  <span className="font-bold text-white block">{item.title}</span>
                  {item.subtitle && (
                    <span className="text-[11px] text-white/75">{item.subtitle}</span>
                  )}
                </div>
                {item.tag && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Optional Quote / Highlight Note */}
        {story.quote && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
            <Quote className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium italic text-white/95 leading-snug">
              &ldquo;{story.quote}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center pt-2">
        <span className="text-[11px] text-white/60 tracking-wider">
          Tap right to next story →
        </span>
      </div>
    </div>
  );
};
