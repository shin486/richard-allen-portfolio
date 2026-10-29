"use client";

import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  FolderCode,
  Heart,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  CheckCircle2,
  ArrowUpRight,
  Github,
  ExternalLink,
  Code2,
  Layers,
  MessageCircle,
  Calendar,
  User,
  Play,
  Sparkles,
} from "lucide-react";
import { Project, projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProjectModal } from "./ProjectModal";
import { ProjectDemoHost } from "./demos/ProjectDemoHost";

interface ProjectGridProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  /** When set (e.g. from the Journey Timeline), the carousel jumps to this project */
  focusRequest?: { projectId: string; nonce: number } | null;
  /** Notifies parent when the active slide project changes (e.g. to sync the 3D keyboard) */
  onActiveProjectChange?: (project: Project | null) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  searchQuery,
  focusRequest,
  onActiveProjectChange,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);
  const [isLiveDemoView, setIsLiveDemoView] = useState(true);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [demoSpotlit, setDemoSpotlit] = useState(false);
  const demoStageRef = useRef<HTMLDivElement | null>(null);

  const launchInteractiveDemo = useCallback(() => {
    setIsLiveDemoView(true);
    setDemoSpotlit(true);
    window.setTimeout(() => {
      demoStageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 40);
    window.setTimeout(() => setDemoSpotlit(false), 1200);
  }, []);

  // Filter projects by search query (title, subtitle, description, operationsNote, or technologies)
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return projectsData;
    return projectsData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.operationsNote &&
          project.operationsNote.toLowerCase().includes(query)) ||
        project.technologies.some((t) => t.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Reset slide index when search changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [searchQuery]);

  // Jump to a specific project when requested (declared after the reset so it wins)
  useEffect(() => {
    if (!focusRequest) return;
    const index = filteredProjects.findIndex(
      (p) => p.id === focusRequest.projectId
    );
    if (index !== -1) {
      setCurrentSlide(index);
      setIsBreakdownExpanded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest]);

  const totalSlides = filteredProjects.length;
  const safeSlideIndex =
    totalSlides > 0 ? Math.min(currentSlide, totalSlides - 1) : 0;
  const activeProject =
    totalSlides > 0 ? filteredProjects[safeSlideIndex] : null;

  useEffect(() => {
    onActiveProjectChange?.(activeProject);
  }, [activeProject, onActiveProjectChange]);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) =>
      prev < totalSlides - 1 ? prev + 1 : prev
    );
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section id="portfolio-grid" className="py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100">
            Projects
          </h2>
        </div>

        <div className="text-xs text-neutral-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
          {totalSlides > 0 ? (
            <span>
              Viewing{" "}
              <strong className="text-neutral-900 dark:text-zinc-100">
                {safeSlideIndex + 1}
              </strong>{" "}
              of{" "}
              <strong className="text-neutral-900 dark:text-zinc-100">
                {totalSlides}
              </strong>{" "}
              projects
            </span>
          ) : (
            <span>0 of {projectsData.length} projects</span>
          )}
        </div>
      </div>

      {!activeProject ? (
        /* Empty Search State */
        <div className="py-16 px-4 text-center bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-400 dark:text-zinc-500">
            <FolderCode className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg text-neutral-900 dark:text-zinc-100">
            No projects found
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 max-w-sm">
            No projects match &ldquo;
            <span className="font-semibold text-neutral-900 dark:text-zinc-200">
              {searchQuery}
            </span>
            &rdquo;.
          </p>
        </div>
      ) : (
        <div className="w-full">
          {/* Quick Project Jump Pills (Wraps cleanly so no project pill gets cut off) */}
          <div
            className="flex flex-wrap items-center gap-1.5 pb-3"
            role="tablist"
            aria-label="Select project slide"
          >
            {filteredProjects.map((proj, index) => {
              const isCurrent = index === safeSlideIndex;
              const pillLabel =
                proj.id === "avms"
                  ? "AVMS"
                  : proj.id === "auto-avenue-ims"
                  ? "Auto Avenue"
                  : proj.id === "itelect4-project"
                  ? "IT Elective 4"
                  : proj.title;

              return (
                <button
                  key={proj.id}
                  onClick={() => setCurrentSlide(index)}
                  role="tab"
                  aria-selected={isCurrent}
                  title={`${proj.title} — ${proj.subtitle}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isCurrent
                      ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100 shadow-sm"
                      : "bg-white dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isCurrent
                        ? "text-white/80 dark:text-neutral-900/70"
                        : "text-neutral-400 dark:text-zinc-500"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="whitespace-nowrap">{pillLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Single Authentic Instagram Multi-Photo Carousel Post */}
          <article className="milled-card bg-white dark:bg-[#111116] border-y sm:border border-neutral-200 dark:border-zinc-800 sm:border-t-neutral-300/80 dark:sm:border-t-zinc-700/70 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden transition-all">
            {/* Instagram Post Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-neutral-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full p-[2px] animated-ig-ring flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                    <Image
                      src={profilePic}
                      alt={profileData.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                      {profileData.username}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 flex-shrink-0" />
                    <span className="text-neutral-300 dark:text-zinc-700">•</span>
                    <span className="text-xs font-medium text-neutral-500 dark:text-zinc-400 truncate">
                      {activeProject.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-zinc-400">
                    <span className="truncate">{activeProject.subtitle}</span>
                  </div>
                </div>
              </div>

              {/* Mode Toggle & Slide Counter Badge */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Live Interactive UI vs Static Poster Switcher with Spring-Physics Pill */}
                <div className="relative grid grid-cols-2 items-center bg-neutral-100 dark:bg-zinc-800 p-0.5 rounded-full border border-neutral-200 dark:border-zinc-700/60 text-xs min-w-[146px] sm:min-w-[162px]">
                  <span
                    aria-hidden="true"
                    className={`spring-pill absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full shadow-xs pointer-events-none ${
                      isLiveDemoView
                        ? "bg-ig-gradient"
                        : "bg-white dark:bg-zinc-700"
                    }`}
                    style={{
                      transform: isLiveDemoView
                        ? "translateX(2px)"
                        : "translateX(calc(100% + 2px))",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsLiveDemoView(true)}
                    title="Simulate live in-browser — no setup or download required"
                    aria-label="Launch live interactive UI"
                    className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors duration-200 flex items-center justify-center gap-1.5 ${
                      isLiveDemoView
                        ? "text-white"
                        : "text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Live UI</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLiveDemoView(false)}
                    aria-label="View static poster preview"
                    className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 flex items-center justify-center gap-1 ${
                      !isLiveDemoView
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <Layers className="w-3 h-3 text-ig-pink" />
                    <span>Poster</span>
                  </button>
                </div>

                {/* Instagram Slide Counter */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 dark:bg-zinc-800 text-white text-xs font-semibold tabular-nums tracking-wider">
                  <span>
                    {safeSlideIndex + 1} / {totalSlides}
                  </span>
                </div>
              </div>
            </div>

            {/* Viewport: Live Interactive Sandbox vs Image Carousel */}
            {isLiveDemoView ? (
              <div
                ref={demoStageRef}
                className={`relative w-full bg-neutral-100/70 dark:bg-[#0c0c10] p-3 sm:p-5 border-b border-neutral-100 dark:border-zinc-800 flex flex-col items-center transition-shadow duration-300 ${
                  demoSpotlit ? "ring-2 ring-inset ring-pink-500/60" : ""
                }`}
              >
                {/* Project Switcher Navigation Rail in Sandbox Mode */}
                <div className="w-full max-w-2xl flex items-center justify-between pb-3 text-xs font-semibold text-neutral-600 dark:text-zinc-400">
                  <button
                    onClick={goPrev}
                    disabled={safeSlideIndex === 0}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-850 border border-neutral-200 dark:border-zinc-700/80 flex items-center gap-1 disabled:opacity-30 hover:text-black dark:hover:text-white transition-all shadow-xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-neutral-900 dark:text-zinc-100">
                        {activeProject.title}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        ({safeSlideIndex + 1}/{totalSlides})
                      </span>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Simulate live in-browser — no setup or download required
                    </span>
                  </div>

                  <button
                    onClick={goNext}
                    disabled={safeSlideIndex === totalSlides - 1}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-850 border border-neutral-200 dark:border-zinc-700/80 flex items-center gap-1 disabled:opacity-30 hover:text-black dark:hover:text-white transition-all shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Functional Interactive Demo Host */}
                <ProjectDemoHost projectId={activeProject.id} />
              </div>
            ) : (
              /* Swipeable Slide Track Viewport */
              <div
                className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-950 overflow-hidden group select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Horizontal Sliding Track */}
                <div
                  className="w-full h-full flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${safeSlideIndex * 100}%)`,
                  }}
                >
                  {filteredProjects.map((project) => {
                    const imgSrc = imgErrors[project.id]
                      ? "/placeholder-project.svg"
                      : project.image;

                    return (
                      <div
                        key={project.id}
                        onClick={() => setIsBreakdownExpanded((prev) => !prev)}
                        className="w-full h-full flex-shrink-0 relative cursor-pointer overflow-hidden"
                      >
                        <Image
                          src={imgSrc}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          onError={() =>
                            setImgErrors((prev) => ({
                              ...prev,
                              [project.id]: true,
                            }))
                          }
                          priority={project.featured}
                        />

                        {/* Subtle Bottom Gradient Overlay for readability */}
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                      </div>
                    );
                  })}
                </div>

                {/* Top-Left Category & Project Status Badges */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 pointer-events-none">
                  {activeProject.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-ig-gradient text-white shadow-md">
                      {activeProject.badge}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/65 text-white backdrop-blur-md border border-white/15">
                    {activeProject.category}
                  </span>
                </div>

                {/* Previous Slide Arrow Button */}
                {safeSlideIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    aria-label="Previous project"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Next Slide Arrow Button */}
                {safeSlideIndex < totalSlides - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    aria-label="Next project"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Bottom Overlay Bar: Date & 1-Click Live Demo CTA */}
                <div className="absolute bottom-3.5 inset-x-3.5 z-10 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/65 text-zinc-200 backdrop-blur-md border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-ig-pink" />
                    {activeProject.year}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      launchInteractiveDemo();
                    }}
                    title="Simulate live in-browser — no setup or download required"
                    className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-ig-gradient text-white shadow-lg shadow-pink-500/30 border border-white/25 hover:opacity-95 active:scale-95 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span>⚡ Try Interactive Live Demo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Instagram Action Bar & Pagination Dots */}
            <div className="px-4 sm:px-6 pt-3.5 pb-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800/80">
                {/* Left Interaction Icons */}
                <div className="flex items-center gap-3.5 text-neutral-700 dark:text-zinc-300">
                  <button
                    onClick={(e) => toggleLike(activeProject.id, e)}
                    className={`focus:outline-none transition-transform active:scale-125 ${
                      likedIds[activeProject.id]
                        ? "text-red-500 animate-heart-pop"
                        : "hover:text-red-500"
                    }`}
                    aria-label={
                      likedIds[activeProject.id]
                        ? "Unlike project"
                        : "Like project"
                    }
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedIds[activeProject.id]
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      const contactEl = document.getElementById("contact-section");
                      if (contactEl) {
                        const navOffset = 70;
                        const elementPosition =
                          contactEl.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.pageYOffset - navOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                    aria-label="Inquire or message about this project"
                    title="Send a message or inquire about this project"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                      aria-label="Open GitHub repository"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Authentic Instagram Carousel Dots */}
                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Project slides"
                >
                  {filteredProjects.map((proj, index) => {
                    const isActive = index === safeSlideIndex;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}: ${proj.title}`}
                        aria-selected={isActive}
                        role="tab"
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-2.5 h-2.5 bg-ig-pink scale-110"
                            : "w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-700 hover:bg-neutral-400 dark:hover:bg-zinc-500"
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Right Bookmark Icon */}
                <button
                  onClick={(e) => toggleSave(activeProject.id, e)}
                  className={`focus:outline-none transition-transform active:scale-125 ${
                    savedIds[activeProject.id]
                      ? "text-neutral-900 dark:text-zinc-100"
                      : "text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                  }`}
                  aria-label={
                    savedIds[activeProject.id]
                      ? "Remove bookmark"
                      : "Bookmark project"
                  }
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      savedIds[activeProject.id] ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Dynamic Post Caption Content */}
              <div className="mt-3.5 space-y-3">
                {/* Title, Role & Timeline */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                      {profileData.username}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100">
                      {activeProject.title}
                    </h3>
                    <span className="text-xs font-medium text-neutral-500 dark:text-zinc-400">
                      — {activeProject.subtitle}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-neutral-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1 font-medium text-neutral-700 dark:text-zinc-300">
                      <User className="w-3.5 h-3.5 text-ig-purple" />
                      {activeProject.role}
                    </span>
                    <span>•</span>
                    <span>{activeProject.year}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Optional Service Management & Operations Callout (e.g., AVMS) */}
                {activeProject.operationsNote && (
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 block mb-1">
                      Service Management &amp; Operations
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed">
                      {activeProject.operationsNote}
                    </p>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-zinc-800/80">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-neutral-100 dark:bg-zinc-800/80 text-neutral-700 dark:text-zinc-300 text-xs font-medium rounded-md border border-neutral-200/60 dark:border-zinc-700/60 flex items-center gap-1"
                    >
                      <Code2 className="w-3 h-3 text-ig-pink" />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Inline Project Breakdown (Expands directly on the page, no modal layer lock) */}
                {isBreakdownExpanded && (
                  <div className="pt-3.5 pb-1 space-y-3 border-t border-neutral-100 dark:border-zinc-800/80 animate-fade-in">
                    {/* Key Features */}
                    {activeProject.keyFeatures &&
                      activeProject.keyFeatures.length > 0 && (
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 mb-2 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            Key Features &amp; Architecture
                          </h4>
                          <ul className="space-y-2">
                            {activeProject.keyFeatures.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-zinc-300"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ig-pink flex-shrink-0" />
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}

                {/* Action Footer Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative group/demo-cta inline-flex">
                      <button
                        type="button"
                        onClick={launchInteractiveDemo}
                        title="Simulate live in-browser — no setup or download required"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-ig-gradient text-white shadow-md shadow-pink-500/20 hover:opacity-95 active:scale-95 transition-all"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shadow-[0_0_8px_#6ee7b7]" />
                        <span>⚡ Try Interactive Live Demo</span>
                      </button>
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute -top-9 left-0 whitespace-nowrap rounded-md bg-neutral-900 dark:bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-white dark:text-neutral-900 opacity-0 shadow-md transition-opacity duration-150 group-hover/demo-cta:opacity-100 z-20"
                      >
                        Simulate live in-browser — no setup or download required
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsLiveDemoView((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-zinc-200 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5 text-ig-pink" />
                      <span>
                        {isLiveDemoView
                          ? "View Photo Preview"
                          : "Back to Live UI"}
                      </span>
                    </button>

                    <button
                      onClick={() => setIsBreakdownExpanded((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-zinc-200 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
                    >
                      <span>
                        {isBreakdownExpanded
                          ? "Hide Breakdown"
                          : "View Specs & Breakdown"}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isBreakdownExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {activeProject.liveDemoUrl && (
                      <a
                        href={activeProject.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Instagram-Style Post Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
