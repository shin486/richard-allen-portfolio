"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Bookmark, ArrowUpRight, Code2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState(project.image);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <article
      onClick={() => onOpenModal(project)}
      className="group relative bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/80 rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-neutral-300 dark:hover:border-zinc-700"
    >
      {/* Square Project Visual Container */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(project.image)}
        />

        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 text-white z-20">
          <span className="flex items-center gap-1.5 text-sm font-bold">
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "fill-white text-white"}`} />
            <span>View Details</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md">
            View Project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Caption Area */}
      <div className="flex flex-col gap-1 p-3.5">
        {/* Interaction Bar */}
        <div className="flex items-center justify-between text-neutral-700 dark:text-zinc-300 pb-1">
          <button
            onClick={handleLike}
            className={`focus:outline-none transition-transform active:scale-125 ${
              isLiked ? "text-red-500 animate-heart-pop" : "hover:text-red-500"
            }`}
            aria-label={isLiked ? "Unlike project" : "Like project"}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </button>

          <button
            onClick={handleSave}
            className={`focus:outline-none transition-transform active:scale-125 ${
              isSaved ? "text-neutral-900 dark:text-zinc-100" : "hover:text-black dark:hover:text-white"
            }`}
            aria-label={isSaved ? "Remove bookmark" : "Bookmark project"}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-zinc-100 group-hover:text-ig-pink transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1 mt-1 pt-2 border-t border-neutral-100 dark:border-zinc-800">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-neutral-100 dark:bg-zinc-800/70 text-neutral-600 dark:text-zinc-400 hover:text-black dark:hover:text-white text-[10px] font-medium rounded transition-colors flex items-center gap-1"
            >
              <Code2 className="w-2.5 h-2.5" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
