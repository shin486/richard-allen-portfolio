"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [imgSrc, setImgSrc] = useState(project?.image || "");

  useEffect(() => {
    if (project) {
      setImgSrc(project.image);
    }
  }, [project]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-neutral-200 dark:border-zinc-800 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Project Image */}
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain sm:object-cover"
            onError={() => setImgSrc(project.image)}
            priority
          />
          {project.featured && (
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-ig-gradient text-white">
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Right: Project Details */}
        <div className="w-full md:w-1/2 flex flex-col overflow-y-auto no-scrollbar">
          <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
            {/* Title & Description */}
            <div>
              <h3
                id="project-modal-title"
                className="font-bold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-zinc-100"
              >
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 mb-2">
                Technology
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-100 dark:bg-zinc-800/80 text-neutral-600 dark:text-zinc-300 border border-neutral-200/70 dark:border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer / Action Buttons */}
          <div className="p-5 sm:p-6 pt-0 mt-auto">
            <div className="flex items-center gap-2 pt-4 border-t border-neutral-100 dark:border-zinc-800">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-ig-gradient hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              ) : (
                <span className="flex-1 py-2 px-3 rounded-lg text-xs text-center font-medium text-neutral-500 dark:text-zinc-400 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800">
                  Repository available upon request
                </span>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 border border-neutral-200 dark:border-zinc-700/60 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};