"use client";

import React from "react";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import { HighlightStory } from "@/data/highlights";

interface EducationStoryProps {
  story: HighlightStory;
}

export const EducationStory: React.FC<EducationStoryProps> = ({ story }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 text-white select-none overflow-y-auto no-scrollbar">
      {/* Top Badge */}
      <div className="flex items-center justify-between">
        {story.badge && (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
            {story.badge}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-3 my-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white drop-shadow">
              {story.heading}
            </h2>
            {story.subheading && (
              <p className="text-sm font-semibold text-emerald-200">
                {story.subheading}
              </p>
            )}
          </div>
        </div>

        {story.description && (
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed bg-black/30 p-3.5 rounded-xl backdrop-blur-md border border-white/10">
            {story.description}
          </p>
        )}

        {/* Education Details List */}
        {story.items && (
          <div className="space-y-2 mt-1">
            {story.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-xs text-white block">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="text-[11px] text-white/75">
                      {item.subtitle}
                    </span>
                  )}
                </div>
                {item.tag && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
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
