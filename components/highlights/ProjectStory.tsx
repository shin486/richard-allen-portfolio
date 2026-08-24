"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Sparkles, Layers, Check } from "lucide-react";
import { HighlightStory } from "@/data/highlights";

interface ProjectStoryProps {
  story: HighlightStory;
  onInteract?: () => void;
}

export const ProjectStory: React.FC<ProjectStoryProps> = ({ story, onInteract }) => {
  const [imgSrc, setImgSrc] = useState(story.image || "/projects/palengkehub.svg");

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-white select-none overflow-y-auto no-scrollbar">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between z-20">
        {story.badge && (
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {story.badge}
          </span>
        )}
      </div>

      {/* Project Visual Graphic */}
      <div className="my-2 relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/20 shadow-lg flex-shrink-0">
        <Image
          src={imgSrc}
          alt={story.heading}
          fill
          sizes="400px"
          className="object-contain"
          onError={() => setImgSrc("/projects/palengkehub.svg")}
        />
      </div>

      {/* Project Info Details */}
      <div className="flex flex-col gap-2.5 flex-1 justify-center z-20">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow">
            {story.heading}
          </h2>
          {story.subheading && (
            <p className="text-xs sm:text-sm font-semibold text-pink-200">
              {story.subheading}
            </p>
          )}
        </div>

        {story.description && (
          <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed bg-black/40 p-3 rounded-xl backdrop-blur-md border border-white/10">
            {story.description}
          </p>
        )}

        {/* Feature Highlights */}
        {story.features && story.features.length > 0 && (
          <div className="space-y-1 bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200 block mb-1">
              Key Highlights
            </span>
            {story.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-white/95">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        {story.technologies && story.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {story.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div
        className="pt-2 flex items-center gap-2 z-30"
        onMouseEnter={onInteract}
        onTouchStart={onInteract}
      >
        {story.githubUrl && (
          <a
            href={story.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-3 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}

        {story.liveDemoUrl && (
          <a
            href={story.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-3 rounded-xl bg-ig-gradient hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 border border-white/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};
