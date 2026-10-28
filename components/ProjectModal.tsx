"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  Github,
  Heart,
  Bookmark,
  CheckCircle,
  Layers,
  Calendar,
  User,
  Tag,
  Play,
  RotateCcw,
} from "lucide-react";
import { Project } from "@/data/projects";
import { ProjectDemoHost } from "./demos/ProjectDemoHost";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiveDemo, setIsLiveDemo] = useState(false);
  const [imgSrc, setImgSrc] = useState(project?.image || "");

  useEffect(() => {
    if (project) {
      setImgSrc(project.image);
      setIsLiked(false);
      setIsSaved(false);
      setIsLiveDemo(false);
    }
  }, [project]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh] md:h-[620px] border border-neutral-200 dark:border-zinc-800 animate-scale-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors focus:outline-none backdrop-blur-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isLiveDemo ? (
          /* Full-Modal Live Interactive Sandbox Mode */
          <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-[#111116] animate-fade-in">
            {/* Modal Demo Top Bar */}
            <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between pr-14 bg-neutral-50/50 dark:bg-zinc-900/40">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100 truncate">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold flex-shrink-0">
                    Live Sandbox
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-zinc-400 truncate">
                  {project.subtitle}
                </p>
              </div>

              <button
                onClick={() => setIsLiveDemo(false)}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-xs font-semibold text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors flex-shrink-0"
              >
                Back to Details
              </button>
            </div>

            {/* Scrollable Demo Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
              <ProjectDemoHost projectId={project.id} />
            </div>

            {/* Bottom Controls */}
            <div className="border-t border-neutral-200 dark:border-zinc-800 p-3 sm:p-4 flex items-center justify-between bg-neutral-50 dark:bg-zinc-900/60">
              <span className="text-xs text-neutral-500">
                Functional demo running directly in client sandbox.
              </span>
              <button
                onClick={() => setIsLiveDemo(false)}
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Return to Overview &amp; Specs
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Left: Project Image */}
        <div className="relative w-full md:w-[45%] aspect-video md:aspect-auto md:h-full bg-slate-950 flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-contain sm:object-cover"
            onError={() => setImgSrc("/placeholder-project.svg")}
            priority
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-ig-gradient text-white shadow-sm">
                Featured Project
              </span>
            )}
            {project.badge && !project.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-sm border border-white/20">
                {project.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right: Project Details (scrollable with min-h-0 to avoid flex scroll locking) */}
        <div className="w-full md:w-[55%] flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Scrollable details area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5 overscroll-contain">
            {/* Title + Meta */}
            <div>
              <h3
                id="project-modal-title"
                className="font-bold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-zinc-100"
              >
                {project.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-zinc-400 mt-0.5 font-medium">
                {project.subtitle}
              </p>

              {/* Meta Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700">
                  <User className="w-3 h-3 text-ig-purple" />
                  {project.role}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700">
                  <Tag className="w-3 h-3 text-ig-pink" />
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700">
                  <Calendar className="w-3 h-3 text-ig-orange" />
                  {project.year}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed">
                {project.description}
              </p>
              {project.operationsNote && (
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/80 border border-neutral-200/80 dark:border-zinc-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 block mb-1">
                    Service Management &amp; Operations
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
                    {project.operationsNote}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-zinc-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ig-pink flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-ig-purple" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-100 dark:bg-zinc-800/80 text-neutral-700 dark:text-zinc-300 border border-neutral-200/70 dark:border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer / Social & Actions (fixed at bottom of modal) */}
          <div className="border-t border-neutral-100 dark:border-zinc-800 p-4 sm:p-5 flex flex-col gap-3 flex-shrink-0 bg-white dark:bg-[#111116]">
            {/* Interaction Row */}
            <div className="flex items-center justify-between text-neutral-600 dark:text-zinc-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`focus:outline-none transition-transform active:scale-125 ${
                    isLiked ? "text-red-500" : "hover:text-red-500"
                  }`}
                  aria-label={isLiked ? "Unlike" : "Like project"}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`focus:outline-none transition-transform active:scale-125 ${
                  isSaved
                    ? "text-neutral-900 dark:text-zinc-100"
                    : "hover:text-black dark:hover:text-white"
                }`}
                aria-label={isSaved ? "Remove bookmark" : "Bookmark"}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiveDemo(true)}
                className="flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-ig-gradient hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>⚡ Use Project Live</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 border border-neutral-200 dark:border-zinc-700/60 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 border border-neutral-200 dark:border-zinc-700/60 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </>
    )}
      </div>
    </div>
  );
};
