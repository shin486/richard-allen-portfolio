"use client";

import React, { useMemo, useState } from "react";
import { FolderCode } from "lucide-react";
import { Project, projectsData, featuredProject, regularProjects } from "@/data/projects";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

interface ProjectGridProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  searchQuery,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Search matches ONLY the five real projects (title, description, technology)
  const matches = (project: Project) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some((t) => t.toLowerCase().includes(query))
    );
  };

  const featuredMatch = featuredProject && matches(featuredProject) ? featuredProject : null;
  const filteredRegular = useMemo(
    () => regularProjects.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery]
  );

  const hasResults = Boolean(featuredMatch) || filteredRegular.length > 0;

  return (
    <section id="portfolio-grid" className="py-6 sm:py-8">
      {/* Count indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100">
          Projects
        </h2>
        <div className="text-xs text-neutral-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
          <span>
            Showing{" "}
            <strong className="text-neutral-900 dark:text-zinc-100">
              {(featuredMatch ? 1 : 0) + filteredRegular.length}
            </strong>{" "}
            of {projectsData.length} projects
          </span>
        </div>
      </div>

      {!hasResults ? (
        /* Empty State */
        <div className="py-16 px-4 text-center bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-400 dark:text-zinc-500">
            <FolderCode className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg text-neutral-900 dark:text-zinc-100">No projects found</h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 max-w-sm">
            No projects match &ldquo;
            <span className="font-semibold text-neutral-900 dark:text-zinc-200">{searchQuery}</span>&rdquo;.
          </p>
        </div>
      ) : (
        <>
          {/* Featured Project (PalengkeHub) */}
          {featuredMatch && (
            <div className="mb-6 sm:mb-8">
              <FeaturedProject
                project={featuredMatch}
                onOpenModal={(p) => setActiveModalProject(p)}
              />
            </div>
          )}

          {/* Regular Projects Grid: 2 columns on desktop, 1 on mobile */}
          {filteredRegular.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {filteredRegular.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenModal={(p) => setActiveModalProject(p)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Instagram-Style Post Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};