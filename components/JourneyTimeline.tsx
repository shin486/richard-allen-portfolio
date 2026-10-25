"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Route } from "lucide-react";
import { projectsData } from "@/data/projects";

interface JourneyTimelineProps {
  /** Called when a visitor wants to open the project behind a milestone */
  onViewProject: (projectId: string) => void;
}

interface TimelineEntry {
  key: string;
  date: string;
  label: string;
  projectId: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  technologies: string[];
  inProgress: boolean;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-09" -> "Sep 2025" */
const formatDate = (date: string) => {
  const [year, month] = date.split("-");
  const monthIndex = Number(month) - 1;
  return `${MONTHS[monthIndex] ?? ""} ${year}`.trim();
};

/** "Automated Visitor Management System (AVMS)" -> "AVMS" */
const getShortTitle = (title: string) => {
  const match = title.match(/\(([^)]+)\)/);
  return match ? match[1] : title;
};

/**
 * Horizontal, fixed-height Journey Timeline.
 * Built automatically from `milestones` in data/projects.ts, so new projects
 * extend the rail sideways instead of making the page taller.
 */
export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ onViewProject }) => {
  const entries: TimelineEntry[] = useMemo(() => {
    const list = projectsData.flatMap((project) =>
      (project.milestones ?? []).map((milestone) => ({
        key: `${project.id}-${milestone.date}`,
        date: milestone.date,
        label: milestone.label,
        projectId: project.id,
        title: project.title,
        shortTitle: getShortTitle(project.title),
        subtitle: project.subtitle,
        technologies: project.technologies,
        // Live indicator for projects that are still being built
        inProgress: Boolean(project.inProgress),
      }))
    );
    return list.sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const [activeIndex, setActiveIndex] = useState(Math.max(entries.length - 1, 0));
  const [hasMounted, setHasMounted] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const centerNode = useCallback((index: number, behavior: ScrollBehavior) => {
    const rail = railRef.current;
    const node = nodeRefs.current[index];
    if (!rail || !node) return;
    const railRect = rail.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    rail.scrollTo({
      left:
        rail.scrollLeft +
        (nodeRect.left - railRect.left) -
        rail.clientWidth / 2 +
        nodeRect.width / 2,
      behavior,
    });
  }, []);

  // On mount: let the nodes fade in, then glide to the latest milestone and draw the progress line
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHasMounted(true);
      centerNode(entries.length - 1, "smooth");
    }, 250);
    return () => window.clearTimeout(timer);
  }, [centerNode, entries.length]);

  const selectIndex = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), entries.length - 1);
    setActiveIndex(clamped);
    centerNode(clamped, "smooth");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectIndex(activeIndex - 1);
    }
  };

  if (entries.length === 0) return null;

  const total = entries.length;
  const active = entries[activeIndex];
  // Node centers sit at (i + 0.5) / total of the track width
  const edgeInset = `${50 / total}%`;
  const progressWidth = hasMounted ? `${(activeIndex / total) * 100}%` : "0%";

  return (
    <section
      aria-label="Journey Timeline"
      className="py-5 border-b border-neutral-200 dark:border-zinc-800"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3 px-1">
        <div className="flex items-center gap-2">
          <Route className="w-4 h-4 text-ig-pink" />
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-zinc-400">
            My Journey
          </h2>
        </div>
        <span className="text-[11px] font-mono text-neutral-400 dark:text-zinc-500">
          {formatDate(entries[0].date)} — {formatDate(entries[total - 1].date)}
        </span>
      </div>

      {/* Rail */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => selectIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous milestone"
          className="hidden sm:flex w-8 h-8 flex-shrink-0 rounded-full items-center justify-center border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:border-neutral-300 dark:hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={railRef}
          className="timeline-mask no-scrollbar flex-1 overflow-x-auto snap-x snap-mandatory"
        >
          <div className="w-max mx-auto px-6 sm:px-10">
            <div className="relative">
            {/* Base line */}
            <div
              className="absolute top-[29px] h-[2px] bg-neutral-200 dark:bg-zinc-800 rounded-full"
              style={{ left: edgeInset, right: edgeInset }}
            />
            {/* Animated gradient progress line */}
            <div
              className="absolute top-[29px] h-[2px] bg-ig-gradient rounded-full transition-[width] duration-700 ease-out pointer-events-none"
              style={{ left: edgeInset, width: progressWidth }}
            />

            <div className="relative flex" role="tablist" aria-label="Milestones">
              {entries.map((entry, index) => {
                const isActive = index === activeIndex;
                const isPassed = index <= activeIndex;

                return (
                  <button
                    key={entry.key}
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                    onClick={() => selectIndex(index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${entry.shortTitle} — ${entry.label}, ${formatDate(entry.date)}`}
                    className="group snap-center w-28 sm:w-32 flex-shrink-0 flex flex-col items-center gap-2 py-1 opacity-0 animate-fade-in focus:outline-none"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <span
                      className={`text-[11px] font-mono transition-colors ${
                        isActive
                          ? "text-neutral-900 dark:text-zinc-100 font-bold"
                          : "text-neutral-400 dark:text-zinc-500 group-hover:text-neutral-600 dark:group-hover:text-zinc-300"
                      }`}
                    >
                      {formatDate(entry.date)}
                    </span>

                    {/* Node */}
                    <span className="relative flex items-center justify-center w-5 h-5">
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-ig-pink/30 animate-ping [animation-duration:2s]" />
                      )}
                      <span
                        className={`relative rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-4 h-4 bg-ig-gradient ring-4 ring-ig-pink/15 scale-110"
                            : isPassed
                            ? "w-3 h-3 bg-ig-gradient group-hover:scale-125"
                            : "w-3 h-3 bg-white dark:bg-[#111116] border-2 border-neutral-300 dark:border-zinc-700 group-hover:scale-125 group-hover:border-ig-pink"
                        }`}
                      />
                      {entry.inProgress && (
                        <span className="absolute -top-0.5 -right-0.5 flex w-2 h-2">
                          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-[#0B0B0F]" />
                        </span>
                      )}
                    </span>

                    <span
                      className={`text-xs font-semibold text-center leading-tight px-1 line-clamp-2 transition-colors ${
                        isActive
                          ? "text-neutral-900 dark:text-zinc-100"
                          : "text-neutral-500 dark:text-zinc-500 group-hover:text-neutral-800 dark:group-hover:text-zinc-300"
                      }`}
                    >
                      {entry.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => selectIndex(activeIndex + 1)}
          disabled={activeIndex === total - 1}
          aria-label="Next milestone"
          className="hidden sm:flex w-8 h-8 flex-shrink-0 rounded-full items-center justify-center border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:border-neutral-300 dark:hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detail card — re-keyed so it softly fades in on every change */}
      <div
        key={active.key}
        className="mt-3 mx-auto max-w-2xl animate-fade-in bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider ig-gradient-text">
              {active.label}
            </span>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-zinc-500">
              {formatDate(active.date)}
            </span>
            {active.inProgress && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Progress
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-zinc-100 mt-0.5 truncate">
            {active.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-zinc-400 truncate">
            {active.subtitle}
          </p>
        </div>

        <button
          onClick={() => onViewProject(active.projectId)}
          className="group/btn flex-shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-100 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
        >
          View project
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
