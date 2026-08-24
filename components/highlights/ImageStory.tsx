"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { HighlightStory } from "@/data/highlights";

interface ImageStoryProps {
  story: HighlightStory;
}

export const ImageStory: React.FC<ImageStoryProps> = ({ story }) => {
  const [imgSrc, setImgSrc] = useState(story.image || "/projects/palengkehub.svg");

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 text-white select-none relative overflow-hidden">
      {/* Top Badge */}
      {story.badge && (
        <div className="z-20">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {story.badge}
          </span>
        </div>
      )}

      {/* Main Center Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgSrc}
          alt={story.heading}
          fill
          className="object-cover"
          onError={() => setImgSrc("/projects/palengkehub.svg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      </div>

      {/* Bottom Caption */}
      <div className="z-20 mt-auto p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
        <h2 className="text-xl font-bold text-white drop-shadow">
          {story.heading}
        </h2>
        {story.subheading && (
          <p className="text-xs font-semibold text-pink-300 mt-0.5">
            {story.subheading}
          </p>
        )}
        {story.description && (
          <p className="text-xs text-white/90 mt-1 leading-relaxed">
            {story.description}
          </p>
        )}
      </div>
    </div>
  );
};
