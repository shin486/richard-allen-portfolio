"use client";

import React from "react";
import Image from "next/image";
import { Mail, Send, Linkedin, Github, MessageSquare, Sparkles } from "lucide-react";
import { HighlightStory } from "@/data/highlights";
import { profileData } from "@/data/profile";

interface ContactStoryProps {
  story: HighlightStory;
  onInteract?: () => void;
}

export const ContactStory: React.FC<ContactStoryProps> = ({ story, onInteract }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 text-white select-none overflow-y-auto no-scrollbar">
      {/* Top Badge */}
      <div className="flex items-center justify-between">
        {story.badge && (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-pink-300" />
            {story.badge}
          </span>
        )}
      </div>

      {/* Main Profile & Contact Box */}
      <div className="flex flex-col items-center text-center gap-3.5 my-auto">
        <div className="w-20 h-20 rounded-full p-[2.5px] bg-ig-gradient shadow-xl">
          <div className="w-full h-full bg-white rounded-full p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
              <Image
                src={profileData.avatarUrl}
                alt={profileData.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow">
            {story.heading}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-pink-200 mt-0.5">
            {profileData.name} • @{profileData.username}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-white/90 leading-relaxed bg-black/30 p-3.5 rounded-xl backdrop-blur-md border border-white/10 max-w-sm">
          {story.description}
        </p>

        {/* Contact Quick Buttons */}
        <div
          className="flex flex-col gap-2 w-full pt-1 z-30"
          onMouseEnter={onInteract}
          onTouchStart={onInteract}
        >
          {story.buttonUrl && (
            <a
              href={story.buttonUrl}
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2.5 px-4 rounded-xl bg-ig-gradient hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all border border-white/20"
            >
              <Send className="w-4 h-4 -rotate-45" />
              <span>{story.buttonText || "Email Me"}</span>
            </a>
          )}

          <div className="flex items-center gap-2">
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 backdrop-blur-md border border-white/10 active:scale-95 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-300" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 backdrop-blur-md border border-white/10 active:scale-95 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center pt-2">
        <span className="text-[11px] text-white/60">Thanks for visiting my portfolio.</span>
      </div>
    </div>
  );
};
