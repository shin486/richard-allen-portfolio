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
  Shield,
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

interface PipelineNode {
  layer: string;
  tech: string;
  techKey: string;
  note: string;
  brandClass: string;
  haloClass: string;
  icon: React.ReactNode;
}

interface ProjectPipeline {
  nodes: PipelineNode[];
  qualityTag: string;
}

const getProjectPipeline = (project: Project): ProjectPipeline => {
  switch (project.id) {
    case "palengkehub":
      return {
        qualityTag: "✓ iOS & Android Tested",
        nodes: [
          {
            layer: "Client",
            tech: "React Native (Expo)",
            techKey: "React Native",
            note: "React Native (Expo): Cross-platform mobile client with gesture nav and camera integration.",
            brandClass: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300 dark:text-cyan-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(6,182,212,0.3)]",
            icon: (
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ),
          },
          {
            layer: "Logic",
            tech: "TypeScript",
            techKey: "TypeScript",
            note: "TypeScript: Strict type contracts across buyer, vendor, and admin transactional flows.",
            brandClass: "border-blue-500/50 bg-blue-950/20 text-blue-300 dark:text-blue-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(59,130,246,0.3)]",
            icon: (
              <span className="w-4 h-4 rounded-[3px] bg-[#3178C6] text-[10px] font-black text-white flex items-center justify-center font-mono leading-none">
                TS
              </span>
            ),
          },
          {
            layer: "DB & Auth",
            tech: "Supabase (PostgreSQL)",
            techKey: "Supabase",
            note: "Supabase: ACID PostgreSQL schemas, Row-Level Security (RLS), and realtime price updates.",
            brandClass: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(16,185,129,0.3)]",
            icon: (
              <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 2L3 14.5h7.5L9 22l12-13.5h-8.5L13.5 2z" />
              </svg>
            ),
          },
        ],
      };
    case "shinpay-plus":
      return {
        qualityTag: "Multi-Tenant Architecture",
        nodes: [
          {
            layer: "Frontend",
            tech: "Next.js 14 App Router",
            techKey: "Next.js",
            note: "Next.js 14: Server Components, Server Actions, and lightning SSR deployed on Vercel.",
            brandClass: "border-white/50 bg-zinc-800/40 text-zinc-100",
            haloClass: "hover:shadow-[0_0_14px_rgba(255,255,255,0.25)]",
            icon: <span className="font-mono font-black text-[10px] text-white">N</span>,
          },
          {
            layer: "Logic & UI",
            tech: "TypeScript (Tailwind)",
            techKey: "TypeScript",
            note: "TypeScript: Philippine statutory tax math (SSS, PhilHealth, Pag-IBIG) & tenant isolation.",
            brandClass: "border-blue-500/50 bg-blue-950/20 text-blue-300 dark:text-blue-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(59,130,246,0.3)]",
            icon: (
              <span className="w-4 h-4 rounded-[3px] bg-[#3178C6] text-[10px] font-black text-white flex items-center justify-center font-mono leading-none">
                TS
              </span>
            ),
          },
          {
            layer: "Database",
            tech: "Supabase (PostgreSQL RLS)",
            techKey: "PostgreSQL",
            note: "PostgreSQL: Multi-tenant isolated schemas with strict Row-Level Security policies.",
            brandClass: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(16,185,129,0.3)]",
            icon: (
              <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 2L3 14.5h7.5L9 22l12-13.5h-8.5L13.5 2z" />
              </svg>
            ),
          },
        ],
      };
    case "itelect4-project":
      return {
        qualityTag: "Google Gemini AI Integrated",
        nodes: [
          {
            layer: "Client",
            tech: "React (Vite)",
            techKey: "React",
            note: "React + Vite: High-performance SPA with modern component state and clean styling.",
            brandClass: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300 dark:text-cyan-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(6,182,212,0.3)]",
            icon: (
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ),
          },
          {
            layer: "Server & AI",
            tech: "Express + Gemini AI",
            techKey: "Express",
            note: "Express + Gemini AI: Rate-limited POST /api/ai returning Zod-validated JSON evaluations.",
            brandClass: "border-amber-500/50 bg-amber-950/20 text-amber-300 dark:text-amber-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(245,158,11,0.3)]",
            icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          },
          {
            layer: "Database",
            tech: "MongoDB",
            techKey: "MongoDB",
            note: "MongoDB: Document collections with indexed Mongoose ODM models.",
            brandClass: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(16,185,129,0.3)]",
            icon: <Database className="w-3.5 h-3.5 text-emerald-400" />,
          },
        ],
      };
    case "auto-avenue-ims":
      return {
        qualityTag: "Real-Time POS Integration",
        nodes: [
          {
            layer: "UI Layer",
            tech: "Bootstrap UI",
            techKey: "Bootstrap",
            note: "Bootstrap: Rapid, accessible dashboard layout designed for auto repair shop technicians.",
            brandClass: "border-purple-500/50 bg-purple-950/20 text-purple-300 dark:text-purple-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(168,85,247,0.3)]",
            icon: <Code2 className="w-3.5 h-3.5 text-purple-400" />,
          },
          {
            layer: "Backend",
            tech: "PHP REST Engine",
            techKey: "PHP",
            note: "PHP REST Engine: Automated stock reorder calculation and direct POS transactional sync.",
            brandClass: "border-indigo-500/50 bg-indigo-950/20 text-indigo-300 dark:text-indigo-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(99,102,241,0.3)]",
            icon: <Server className="w-3.5 h-3.5 text-indigo-400" />,
          },
          {
            layer: "Database",
            tech: "MySQL Relational DB",
            techKey: "MySQL",
            note: "MySQL: Relational inventory schemas with transactional integrity and reorder alerts.",
            brandClass: "border-sky-500/50 bg-sky-950/20 text-sky-300 dark:text-sky-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(14,165,233,0.3)]",
            icon: <Database className="w-3.5 h-3.5 text-sky-400" />,
          },
        ],
      };
    case "avms":
      return {
        qualityTag: "ITSM Certified Framework",
        nodes: [
          {
            layer: "Access Portal",
            tech: "Campus QR Scanner",
            techKey: "QR Access Control",
            note: "Campus QR Portal: Online pre-registration, QR-coded badges, and host notifications.",
            brandClass: "border-orange-500/50 bg-orange-950/20 text-orange-300 dark:text-orange-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(249,115,22,0.3)]",
            icon: <Sparkles className="w-3.5 h-3.5 text-orange-400" />,
          },
          {
            layer: "Security Core",
            tech: "RBAC + MFA + Encryption",
            techKey: "RBAC & MFA",
            note: "Security: Role-based access control, multi-factor auth, and encrypted audit trails.",
            brandClass: "border-rose-500/50 bg-rose-950/20 text-rose-300 dark:text-rose-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(244,63,94,0.3)]",
            icon: <Shield className="w-3.5 h-3.5 text-rose-400" />,
          },
          {
            layer: "Operations",
            tech: "ITSM Framework (99.9% SLA)",
            techKey: "ITSM",
            note: "ITSM Framework: Structured incident/problem lifecycles and 99.9% uptime SLA.",
            brandClass: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(16,185,129,0.3)]",
            icon: <Server className="w-3.5 h-3.5 text-emerald-400" />,
          },
        ],
      };
    case "crave-cart":
    default:
      return {
        qualityTag: "Lightweight Microservice",
        nodes: [
          {
            layer: "Client UI",
            tech: "Interactive Menu + Maps",
            techKey: "JavaScript",
            note: "Interactive Menu: Digital food kiosk browser with embedded Google Maps store locator.",
            brandClass: "border-teal-500/50 bg-teal-950/20 text-teal-300 dark:text-teal-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(20,184,166,0.3)]",
            icon: <Sparkles className="w-3.5 h-3.5 text-teal-400" />,
          },
          {
            layer: "API Server",
            tech: "Node.js + Express",
            techKey: "Node.js",
            note: "Node.js + Express: Lightweight REST routing, order validation, and receipt formatting.",
            brandClass: "border-green-500/50 bg-green-950/20 text-green-300 dark:text-green-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(34,197,94,0.3)]",
            icon: <Server className="w-3.5 h-3.5 text-green-400" />,
          },
          {
            layer: "Storage",
            tech: "Local Storage & JSON Store",
            techKey: "Local Storage",
            note: "Local Storage: Client state cart persistence and file-based feedback logging.",
            brandClass: "border-amber-500/50 bg-amber-950/20 text-amber-300 dark:text-amber-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(245,158,11,0.3)]",
            icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
          },
        ],
      };
  }
};

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
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [countsLoaded, setCountsLoaded] = useState(false);
  const countedProjectIdsRef = useRef<Record<string, boolean>>({});
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

  const pipeline = useMemo(() => {
    if (!activeProject) return { nodes: [], qualityTag: "" };
    return getProjectPipeline(activeProject);
  }, [activeProject]);

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

  const [heartPopId, setHeartPopId] = useState<string | null>(null);
  const heartPopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ id: string; time: number }>({ id: "", time: 0 });

  // Load persisted project likes & fetch real global like counts from /api/likes
  useEffect(() => {
    try {
      const rawLiked = localStorage.getItem("shin486-liked-projects-v1");
      if (rawLiked) setLikedIds(JSON.parse(rawLiked));

      const rawCounted = localStorage.getItem("shin486-counted-projects-v1");
      if (rawCounted) countedProjectIdsRef.current = JSON.parse(rawCounted);

      const rawSaved = localStorage.getItem("shin486-saved-projects-v1");
      if (rawSaved) setSavedIds(JSON.parse(rawSaved));
    } catch {}

    const ids = projectsData.map((p) => p.id).join(",");
    fetch(`/api/likes?ids=${encodeURIComponent(ids)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (data?.counts) {
          setLikeCounts(data.counts);
        }
        setCountsLoaded(true);
      })
      .catch(() => {
        setCountsLoaded(true);
      });
  }, []);

  const recordProjectLikeOnServer = useCallback((id: string) => {
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));

    if (countedProjectIdsRef.current[id]) return;
    countedProjectIdsRef.current = { ...countedProjectIdsRef.current, [id]: true };
    try {
      localStorage.setItem(
        "shin486-counted-projects-v1",
        JSON.stringify(countedProjectIdsRef.current)
      );
    } catch {}

    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { id?: string; count?: number } | null) => {
        if (typeof data?.count === "number") {
          setLikeCounts((prev) => ({
            ...prev,
            [id]: data.count!,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const triggerDoubleTapHeart = useCallback(
    (id: string) => {
      setLikedIds((prev) => {
        const wasLiked = !!prev[id];
        const next = { ...prev, [id]: true };
        try {
          localStorage.setItem("shin486-liked-projects-v1", JSON.stringify(next));
        } catch {}
        if (!wasLiked) {
          recordProjectLikeOnServer(id);
        }
        return next;
      });
      setHeartPopId(id);
      if (heartPopTimerRef.current) {
        clearTimeout(heartPopTimerRef.current);
      }
      heartPopTimerRef.current = setTimeout(() => {
        setHeartPopId(null);
      }, 920);
    },
    [recordProjectLikeOnServer]
  );

  useEffect(() => {
    return () => {
      if (heartPopTimerRef.current) {
        clearTimeout(heartPopTimerRef.current);
      }
    };
  }, []);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedIds((prev) => {
      const wasLiked = !!prev[id];
      const nowLiked = !wasLiked;
      const next = { ...prev, [id]: nowLiked };
      try {
        localStorage.setItem("shin486-liked-projects-v1", JSON.stringify(next));
      } catch {}

      if (nowLiked) {
        recordProjectLikeOnServer(id);
      } else {
        setLikeCounts((counts) => ({
          ...counts,
          [id]: Math.max(0, (counts[id] ?? 1) - 1),
        }));
      }
      return next;
    });
  };

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("shin486-saved-projects-v1", JSON.stringify(next));
      } catch {}
      return next;
    });
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
    } else if (activeProject) {
      // Tap without horizontal swipe -> detect double-tap
      const now = Date.now();
      if (
        lastTapRef.current.id === activeProject.id &&
        now - lastTapRef.current.time < 320 &&
        now - lastTapRef.current.time > 40
      ) {
        triggerDoubleTapHeart(activeProject.id);
        lastTapRef.current = { id: "", time: 0 };
      } else {
        lastTapRef.current = { id: activeProject.id, time: now };
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
          {/* Quick Project Jump Pills (Single horizontal swipe row on mobile, wraps cleanly on sm+) */}
          <div
            className="flex items-center gap-1.5 pb-3 overflow-x-auto no-scrollbar sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x"
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
                  data-note={
                    proj.id === "palengkehub"
                      ? "PalengkeHub. Defended capstone, zero bugs surrendered."
                      : proj.id === "shinpay-plus"
                      ? "ShinPay+. Multi-tenant SaaS payroll engine on Next.js & Supabase."
                      : `${proj.title}: ${proj.subtitle}`
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border shrink-0 ${
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
            <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 border-b border-neutral-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] animated-ig-ring flex-shrink-0">
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
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 truncate">
                      {profileData.username}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 flex-shrink-0" />
                    <span className="hidden sm:inline text-neutral-300 dark:text-zinc-700">•</span>
                    <span className="hidden sm:inline text-xs font-medium text-neutral-500 dark:text-zinc-400 truncate">
                      {activeProject.role}
                    </span>
                  </div>
                  <p className="sm:hidden text-[10px] font-medium text-neutral-500 dark:text-zinc-400 truncate leading-tight">
                    {activeProject.role}
                  </p>
                </div>
              </div>

              {/* Mode Toggle & Slide Counter Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {/* Live Interactive UI vs Static Poster Switcher with Spring-Physics Pill */}
                <div className="relative grid grid-cols-2 items-center bg-neutral-100 dark:bg-zinc-800 p-0.5 rounded-full border border-neutral-200 dark:border-zinc-700/60 text-xs min-w-[128px] sm:min-w-[162px]">
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
                    data-note="Interactive sandbox mode. Test the real UI right inside your browser."
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
                    data-note="Switch to poster carousel view. Double-tap the image to drop a heart."
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
                onDoubleClick={() => triggerDoubleTapHeart(activeProject.id)}
                className={`relative w-full bg-neutral-100/70 dark:bg-[#0c0c10] p-1.5 sm:p-5 border-b border-neutral-100 dark:border-zinc-800 flex flex-col items-center justify-center transition-shadow duration-300 ${
                  demoSpotlit ? "ring-2 ring-inset ring-pink-500/60" : ""
                }`}
              >
                {/* Instagram Big Heart Double-Tap Pop Overlay */}
                {heartPopId === activeProject.id && (
                  <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
                    <div className="animate-ig-doubletap-heart filter drop-shadow-[0_0_24px_rgba(237,73,86,0.9)]">
                      <svg
                        className="w-24 h-24 sm:w-28 sm:h-28 fill-[#ED4956] stroke-white stroke-[1.5]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Functional Interactive Demo Host */}
                <ProjectDemoHost projectId={activeProject.id} />
              </div>
            ) : (
              /* Swipeable Slide Track Viewport */
              <div
                className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-950 overflow-hidden group select-none cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={() => triggerDoubleTapHeart(activeProject.id)}
                title="Double-tap or double-click to like"
              >
                {/* Instagram Big Heart Double-Tap Pop Overlay */}
                {heartPopId === activeProject.id && (
                  <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <div className="animate-ig-doubletap-heart filter drop-shadow-[0_0_24px_rgba(237,73,86,0.9)]">
                      <svg
                        className="w-24 h-24 sm:w-28 sm:h-28 fill-[#ED4956] stroke-white stroke-[1.5]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                )}

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
                    data-note="Previous project slide."
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
                    data-note="Swipe or click for the next project."
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
                    data-note="Launch the interactive sandbox and test this project live."
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
                    data-note={
                      likedIds[activeProject.id]
                        ? "You liked this build. Taste recognized."
                        : "Drop a heart on this project (or double-tap the poster)."
                    }
                    className={`inline-flex items-center gap-1.5 focus:outline-none transition-transform active:scale-125 ${
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
                    {(likedIds[activeProject.id]
                      ? Math.max(1, likeCounts[activeProject.id] ?? 0)
                      : likeCounts[activeProject.id] ?? 0) > 0 && (
                      <span className="text-xs font-bold tabular-nums text-neutral-900 dark:text-zinc-100">
                        {(likedIds[activeProject.id]
                          ? Math.max(1, likeCounts[activeProject.id] ?? 0)
                          : likeCounts[activeProject.id] ?? 0
                        ).toLocaleString()}
                      </span>
                    )}
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
                    data-note="Have questions about this architecture? Send me a direct message."
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
                  data-note={
                    savedIds[activeProject.id]
                      ? "Saved to your shortlist."
                      : "Bookmark this project to your recruiter shortlist."
                  }
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

              {/* Real Instagram Likes Counter Line */}
              {(() => {
                const isProjectLiked = !!likedIds[activeProject.id];
                const rawProjectCount = likeCounts[activeProject.id] ?? 0;
                const displayProjectLikes = isProjectLiked
                  ? Math.max(1, rawProjectCount)
                  : rawProjectCount;

                return (
                  <p className="mt-2.5 text-xs font-semibold text-neutral-900 dark:text-zinc-100 tabular-nums">
                    {!countsLoaded || displayProjectLikes === 0 ? (
                      <span className="text-neutral-500 dark:text-zinc-400 font-normal">
                        Double-tap poster or tap heart to like this project
                      </span>
                    ) : displayProjectLikes === 1 ? (
                      isProjectLiked ? (
                        <>
                          1 like{" "}
                          <span className="font-normal text-neutral-500 dark:text-zinc-400">
                            · Liked by{" "}
                            <strong className="font-semibold text-neutral-800 dark:text-zinc-200">
                              you
                            </strong>
                          </span>
                        </>
                      ) : (
                        "1 like"
                      )
                    ) : isProjectLiked ? (
                      <>
                        {displayProjectLikes.toLocaleString()} likes{" "}
                        <span className="font-normal text-neutral-500 dark:text-zinc-400">
                          · Liked by{" "}
                          <strong className="font-semibold text-neutral-800 dark:text-zinc-200">
                            you
                          </strong>{" "}
                          and{" "}
                          <strong className="font-semibold text-neutral-800 dark:text-zinc-200">
                            {displayProjectLikes - 1}{" "}
                            {displayProjectLikes - 1 === 1 ? "other" : "others"}
                          </strong>
                        </span>
                      </>
                    ) : (
                      `${displayProjectLikes.toLocaleString()} likes`
                    )}
                  </p>
                );
              })()}

              {/* Dynamic Post Caption Content */}
              <div className="mt-2 space-y-3">
                {/* Title, Role & Timeline */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100">
                      {activeProject.title}
                    </h3>
                    <span className="text-xs font-medium text-neutral-500 dark:text-zinc-400">
                      · {activeProject.subtitle}
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

                {/* Full Un-truncated Engineering Summary + Expandable Key Features */}
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed space-y-2">
                  <p>{activeProject.description}</p>
                  {activeProject.keyFeatures && activeProject.keyFeatures.length > 0 && (
                    <div>
                      {isBreakdownExpanded ? (
                        <div className="pt-2.5 border-t border-neutral-100 dark:border-zinc-800/80 space-y-1.5 animate-fade-in">
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
                          <button
                            type="button"
                            onClick={() => setIsBreakdownExpanded(false)}
                            className="text-neutral-400 hover:text-neutral-600 dark:text-zinc-500 dark:hover:text-zinc-300 font-semibold text-xs cursor-pointer inline-block pt-1"
                          >
                            Hide key features
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsBreakdownExpanded(true)}
                          className="text-neutral-500 hover:text-neutral-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>View {activeProject.keyFeatures.length} key engineering features</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
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

                {/* Visual System Architecture Pipeline (With Permanently Visible Node Notes) */}
                <div className="pt-3 border-t border-neutral-100 dark:border-zinc-800/80">
                  <div className="p-3 sm:p-4 rounded-xl bg-neutral-50/80 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800/90 shadow-2xs">
                    {/* Pipeline Header with Quality Indicator */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 font-mono">
                          Architecture Pipeline
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 font-mono flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/50">
                        {pipeline.qualityTag}
                      </span>
                    </div>

                    {/* Connected Data Flow Nodes with Exposed Sub-copy */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {pipeline.nodes.map((node, idx) => {
                        const handleMouseEnter = () => {
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(
                              new CustomEvent("shin-tech-hover", {
                                detail: { tech: node.techKey },
                              })
                            );
                          }
                        };

                        return (
                          <div
                            key={node.layer}
                            onMouseEnter={handleMouseEnter}
                            className="group/node flex flex-col justify-between gap-1.5 p-2.5 rounded-lg border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 text-xs transition-all duration-200 hover:border-emerald-500/45 shadow-2xs"
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="flex-shrink-0">{node.icon}</div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 font-mono shrink-0">
                                0{idx + 1} · {node.layer}:
                              </span>
                              <span className="font-semibold text-neutral-900 dark:text-zinc-100 truncate">
                                {node.tech}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-snug">
                              {node.note}
                            </p>
                          </div>
                        );
                      })}
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
