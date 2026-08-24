"use client";

import React from "react";
import Image from "next/image";
import { Github, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface FeaturedProjectProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

/**
 * Premium Featured Project section (PalengkeHub).
 * Large image, clean typography, subtle accent treatment.
 */
export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  onOpenModal,
}) => {
  const [imgSrc, setImgSrc] = React.useState(project.image);

  return (
    <article
      onClick={() => onOpenModal(project)}
      className="group relative bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-neutral-300 dark:hover:border-zinc-700"
    >
      {/* Featured label */}
      <div className="flex items-center gap-3 px-5 sm:px-8 pt-6">
        <span className="text-[11px] font-bold tracking-[0.15em] uppercase ig-gradient-text">
          Featured Project
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-neutral-200 dark:from-zinc-800 to-transparent" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 p-5 sm:p-8 pt-4">
        {/* Text content */}
        <div className="flex flex-col gap-4 lg:w-2/5 order-2 lg:order-1">
          <div>
            <h3 className="font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-zinc-100 group-hover:text-ig-pink transition-colors">
              {project.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-zinc-800/80 text-neutral-600 dark:text-zinc-300 border border-neutral-200/70 dark:border-zinc-700/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div
            className="flex flex-wrap items-center gap-2 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-ig-gradient hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm"
            >
              View Project
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Large project visual */}
        <div className="lg:w-3/5 order-1 lg:order-2">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-neutral-200 dark:border-zinc-800">
            <Image
              src={imgSrc}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImgSrc("/projects/palengkehub.svg")}
              priority
            />
          </div>
        </div>
      </div>
    </article>
  );
};