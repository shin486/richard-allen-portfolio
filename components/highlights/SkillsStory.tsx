"use client";

import React from "react";
import { Terminal, Sparkles, CheckCircle } from "lucide-react";
import { HighlightStory } from "@/data/highlights";

interface SkillsStoryProps {
  story: HighlightStory;
}

export const SkillsStory: React.FC<SkillsStoryProps> = ({ story }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 text-white select-none overflow-y-auto no-scrollbar">
      {/* Top Badge */}
      <div className="flex items-center justify-between">
        {story.badge && (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-300" />
            {story.badge}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-3 my-auto">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow">
            {story.heading}
          </h2>
          {story.subheading && (
            <p className="text-sm font-semibold text-purple-200 mt-0.5">
              {story.subheading}
            </p>
          )}
        </div>

        {story.description && (
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed bg-black/30 p-3.5 rounded-xl backdrop-blur-md border border-white/10">
            {story.description}
          </p>
        )}

        {/* Skill Items List */}
        {story.items && (
          <div className="space-y-2 mt-1">
            {story.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/10 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-white block">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[11px] text-white/70 block leading-tight">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                {item.tag && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/10">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center pt-2">
        <span className="text-[11px] text-white/60">Tap to continue →</span>
      </div>
    </div>
  );
};
