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
  Smartphone,
  Database,
  Server,
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
                  data-note={proj.id === "palengkehub" ? "PalengkeHub. Defended capstone, zero bugs surrendered." : proj.id === "shinpay-plus" ? "ShinPay+. Automated payroll calculation so devs get paid on time." : "Defended capstones and real SaaS tools. Test them live in-browser."}
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
                        ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
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
                    aria-label="Launch live interactive UI"
                    className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors duration-200 flex items-center justify-center gap-1.5 ${
                      isLiveDemoView
                        ? "text-white dark:text-zinc-950"
                        : "text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Live UI</span>
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
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 dark:bg-zinc-800 text-white text-xs font-semibold tabular-nums tracking-wider">
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
                className={`relative w-full bg-neutral-100/70 dark:bg-[#0c0c10] p-3 sm:p-5 border-b border-neutral-100 dark:border-zinc-800 flex flex-col items-center justify-center transition-shadow duration-300 ${
                  demoSpotlit ? "ring-2 ring-inset ring-pink-500/60" : ""
                }`}
              >
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
                    className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 shadow-md transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Live Demo</span>
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

                {/* Instagram-Style Post Caption Body with "... more" / "less" Expansion */}
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed">
                  {isBreakdownExpanded ? (
                    <div className="space-y-2.5 animate-fade-in">
                      <p>{activeProject.description}</p>

                      {/* Detailed Key Features & Architecture */}
                      {activeProject.keyFeatures && activeProject.keyFeatures.length > 0 && (
                        <div className="pt-2.5 border-t border-neutral-100 dark:border-zinc-800/80 space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-zinc-300 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            Key Features &amp; Architecture
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {activeProject.keyFeatures.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-neutral-600 dark:text-zinc-400"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ig-pink flex-shrink-0" />
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setIsBreakdownExpanded(false)}
                        className="text-neutral-400 hover:text-neutral-600 dark:text-zinc-500 dark:hover:text-zinc-300 font-semibold text-xs cursor-pointer inline-block"
                      >
                        less
                      </button>
                    </div>
                  ) : (
                    <p>
                      {activeProject.description.length > 135
                        ? `${activeProject.description.slice(0, 135).trim()}... `
                        : `${activeProject.description} `}
                      <button
                        type="button"
                        onClick={() => setIsBreakdownExpanded(true)}
                        className="text-neutral-400 hover:text-neutral-600 dark:text-zinc-500 dark:hover:text-zinc-300 font-semibold text-xs cursor-pointer inline-block"
                      >
                        more
                      </button>
                    </p>
                  )}
                </div>

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

                {/* Tech Stack Chips with Branded Micro-Halos & 3D Keyboard Reactive Link */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-zinc-800/80">
                  {activeProject.technologies.map((tech) => {
                    const t = tech.toLowerCase();

                    let brandColor = "hover:border-zinc-500 hover:text-white";
                    let haloGlow = "hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]";
                    let icon = <Code2 className="w-3 h-3 text-ig-pink" />;
                    let note = `${tech} in production architecture.`;

                    if (t.includes("react native") || t === "react") {
                      brandColor = "hover:border-cyan-500/60 hover:bg-cyan-950/20 hover:text-cyan-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]";
                      icon = (
                        <svg className="w-3 h-3 text-cyan-400 group-hover/tech:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
                          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
                          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
                          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        </svg>
                      );
                      note = "React Native: Smooth cross-platform mobile apps for iOS and Android.";
                    } else if (t.includes("expo")) {
                      brandColor = "hover:border-white/60 hover:bg-zinc-800/40 hover:text-white";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]";
                      icon = (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
                        </svg>
                      );
                      note = "Expo: EAS updates, camera, geolocation, and native mobile modules.";
                    } else if (t.includes("typescript")) {
                      brandColor = "hover:border-blue-500/60 hover:bg-blue-950/20 hover:text-blue-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]";
                      icon = (
                        <span className="w-3 h-3 rounded-[2.5px] bg-[#3178C6] text-[8px] font-black text-white flex items-center justify-center font-mono leading-none">
                          TS
                        </span>
                      );
                      note = "TypeScript: Strict type safety, generics, and zero runtime surprises.";
                    } else if (t.includes("supabase")) {
                      brandColor = "hover:border-emerald-500/60 hover:bg-emerald-950/20 hover:text-emerald-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]";
                      icon = (
                        <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.5 2L3 14.5h7.5L9 22l12-13.5h-8.5L13.5 2z" />
                        </svg>
                      );
                      note = "Supabase: Realtime subscriptions, Auth, Storage, and PostgreSQL RLS.";
                    } else if (t.includes("postgres") || t.includes("sql")) {
                      brandColor = "hover:border-sky-500/60 hover:bg-sky-950/20 hover:text-sky-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(14,165,233,0.25)]";
                      icon = (
                        <svg className="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="7" rx="8" ry="3" />
                          <path d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
                          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
                        </svg>
                      );
                      note = "PostgreSQL: ACID-compliant relational schemas, indexed queries, and foreign keys.";
                    } else if (t.includes("next")) {
                      brandColor = "hover:border-white/60 hover:bg-zinc-800/40 hover:text-white";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]";
                      icon = <span className="font-mono font-black text-[9px] text-white">N</span>;
                      note = "Next.js App Router: Server Components, Server Actions, and lightning SSR.";
                    } else if (t.includes("node") || t.includes("express")) {
                      brandColor = "hover:border-green-500/60 hover:bg-green-950/20 hover:text-green-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(34,197,94,0.25)]";
                      icon = <Server className="w-3 h-3 text-green-400" />;
                      note = "Node.js & Express: Lightweight REST APIs, middleware, and route handlers.";
                    } else if (t.includes("mongo")) {
                      brandColor = "hover:border-emerald-500/60 hover:bg-emerald-950/20 hover:text-emerald-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]";
                      icon = <Database className="w-3 h-3 text-emerald-400" />;
                      note = "MongoDB: NoSQL document store with Mongoose ODM schemas.";
                    } else if (t.includes("tailwind") || t.includes("css")) {
                      brandColor = "hover:border-teal-400/60 hover:bg-teal-950/20 hover:text-teal-300";
                      haloGlow = "hover:shadow-[0_0_12px_rgba(45,212,191,0.25)]";
                      icon = <Sparkles className="w-3 h-3 text-teal-400" />;
                      note = "Tailwind CSS: Utility-first styling with dark-mode responsiveness.";
                    }

                    const handleMouseEnter = () => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("shin-tech-hover", { detail: { tech } })
                        );
                      }
                    };

                    return (
                      <span
                        key={tech}
                        data-note={note}
                        onMouseEnter={handleMouseEnter}
                        className={`group/tech px-2.5 py-1 bg-neutral-100 dark:bg-zinc-900/90 text-neutral-700 dark:text-zinc-300 text-xs font-medium rounded-md border border-neutral-200/80 dark:border-zinc-800 transition-all duration-200 cursor-default flex items-center gap-1.5 active:scale-95 hover:-translate-y-0.5 ${brandColor} ${haloGlow}`}
                      >
                        {icon}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Action Footer Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Primary CTA: Linear/Apple Specular Shimmer Beam Button */}
                    <button
                      type="button"
                      onClick={launchInteractiveDemo}
                      data-note="Launch the interactive in-browser phone simulator. No setup needed."
                      className="specular-beam beacon-pulse bg-white text-zinc-950 hover:bg-zinc-100 active:scale-95 font-bold px-4 py-2 rounded-lg transition-all inline-flex items-center gap-2 text-xs sm:text-sm shadow-sm"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Live Demo</span>
                    </button>

                    {/* Secondary CTA: Clean Bordered GitHub */}
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-note="Explore raw commits, clean architecture, and modular code on GitHub."
                        className="bg-zinc-900 hover:bg-zinc-850 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 active:scale-95 px-3.5 py-2 rounded-lg transition-all inline-flex items-center gap-2 text-xs sm:text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {/* Segmented View Mode Switcher: Eliminates "Live UI" ambiguity! */}
                    <div className="inline-flex items-center p-0.5 rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setIsLiveDemoView(true)}
                        data-note="Switch to in-browser mobile phone simulator."
                        className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                          isLiveDemoView
                            ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-xs"
                            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-zinc-200"
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>App UI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsLiveDemoView(false)}
                        data-note="Switch to high-resolution poster photo preview."
                        className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                          !isLiveDemoView
                            ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-xs"
                            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-zinc-200"
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5 text-ig-pink" />
                        <span>Poster</span>
                      </button>
                    </div>
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
