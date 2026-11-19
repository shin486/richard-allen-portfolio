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
  Code2,
  Layers,
  MessageCircle,
  Calendar,
  User,
  Play,
  Cpu,
  QrCode,
  LayoutGrid,
  Database,
  Server,
  Shield,
} from "lucide-react";
import {
  PROJECT_CLASSIFICATIONS,
  Project,
  ProjectClassification,
  projectsData,
} from "@/data/projects";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ProjectModal } from "./ProjectModal";
import { ProjectDemoHost } from "./demos/ProjectDemoHost";

interface ProjectGridProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  /** When set (e.g. from the 3D Keyboard or Skills), jumps to this project's classification post & slide */
  focusRequest?: { projectId: string; nonce: number } | null;
  /** Notifies parent when the active viewed project changes (e.g. to sync the 3D keyboard) */
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
        qualityTag: "✓ 100% Test Pass · 4.17/5 UAT",
        nodes: [
          {
            layer: "Client",
            tech: "React Native + React.js",
            techKey: "React Native",
            note: "Cross-platform mobile & web marketplace for Lipa City Public Market stalls.",
            brandClass:
              "border-cyan-500/50 bg-cyan-950/20 text-cyan-300 dark:text-cyan-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(6,182,212,0.3)]",
            icon: (
              <svg
                className="w-3.5 h-3.5 text-cyan-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.5"
                  transform="rotate(30 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.5"
                  transform="rotate(90 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.5"
                  transform="rotate(150 12 12)"
                />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ),
          },
          {
            layer: "Logic",
            tech: "TypeScript",
            techKey: "TypeScript",
            note: "Strict type contracts across buyer, vendor, and admin transactional flows.",
            brandClass:
              "border-blue-500/50 bg-blue-950/20 text-blue-300 dark:text-blue-200",
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
            note: "ACID PostgreSQL schemas, Row-Level Security (RLS), and realtime price updates.",
            brandClass:
              "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(16,185,129,0.3)]",
            icon: (
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
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
            note: "Server Components, Server Actions, and lightning SSR deployed on Vercel.",
            brandClass: "border-white/50 bg-zinc-800/40 text-zinc-100",
            haloClass: "hover:shadow-[0_0_14px_rgba(255,255,255,0.25)]",
            icon: (
              <span className="font-mono font-black text-[10px] text-white">
                N
              </span>
            ),
          },
          {
            layer: "Logic & UI",
            tech: "TypeScript (Tailwind)",
            techKey: "TypeScript",
            note: "Philippine statutory tax computations (SSS, PhilHealth, Pag-IBIG) & tenant isolation.",
            brandClass:
              "border-blue-500/50 bg-blue-950/20 text-blue-300 dark:text-blue-200",
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
            note: "Multi-tenant isolated schemas with strict Row-Level Security policies.",
            brandClass:
              "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(16,185,129,0.3)]",
            icon: (
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
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
            note: "High-performance SPA with modern component state and clean styling.",
            brandClass:
              "border-cyan-500/50 bg-cyan-950/20 text-cyan-300 dark:text-cyan-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(6,182,212,0.3)]",
            icon: (
              <svg
                className="w-3.5 h-3.5 text-cyan-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.5"
                  transform="rotate(30 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.5"
                  transform="rotate(90 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.5"
                  transform="rotate(150 12 12)"
                />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ),
          },
          {
            layer: "Server & AI",
            tech: "Express + Gemini AI",
            techKey: "Express",
            note: "Rate-limited POST /api/ai endpoint returning Zod-validated JSON evaluations.",
            brandClass:
              "border-amber-500/50 bg-amber-950/20 text-amber-300 dark:text-amber-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(245,158,11,0.3)]",
            icon: <Cpu className="w-3.5 h-3.5 text-amber-400" />,
          },
          {
            layer: "Database",
            tech: "MongoDB",
            techKey: "MongoDB",
            note: "Document collections with indexed Mongoose ODM models.",
            brandClass:
              "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
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
            note: "Rapid, accessible dashboard layout designed for auto repair shop technicians.",
            brandClass:
              "border-purple-500/50 bg-purple-950/20 text-purple-300 dark:text-purple-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(168,85,247,0.3)]",
            icon: <Code2 className="w-3.5 h-3.5 text-purple-400" />,
          },
          {
            layer: "Backend",
            tech: "PHP REST Engine",
            techKey: "PHP",
            note: "Automated stock reorder calculation and direct POS transactional sync.",
            brandClass:
              "border-indigo-500/50 bg-indigo-950/20 text-indigo-300 dark:text-indigo-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(99,102,241,0.3)]",
            icon: <Server className="w-3.5 h-3.5 text-indigo-400" />,
          },
          {
            layer: "Database",
            tech: "MySQL Relational DB",
            techKey: "MySQL",
            note: "Relational inventory schemas with transactional integrity and reorder alerts.",
            brandClass:
              "border-sky-500/50 bg-sky-950/20 text-sky-300 dark:text-sky-200",
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
            note: "Online pre-registration, QR-coded badges, and host notifications.",
            brandClass:
              "border-orange-500/50 bg-orange-950/20 text-orange-300 dark:text-orange-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(249,115,22,0.3)]",
            icon: <QrCode className="w-3.5 h-3.5 text-orange-400" />,
          },
          {
            layer: "Security Core",
            tech: "RBAC + MFA + Encryption",
            techKey: "RBAC & MFA",
            note: "Role-based access control, multi-factor auth, and encrypted audit trails.",
            brandClass:
              "border-rose-500/50 bg-rose-950/20 text-rose-300 dark:text-rose-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(244,63,94,0.3)]",
            icon: <Shield className="w-3.5 h-3.5 text-rose-400" />,
          },
          {
            layer: "Operations",
            tech: "ITSM Framework (99.9% SLA)",
            techKey: "ITSM",
            note: "Structured incident/problem lifecycles and 99.9% uptime SLA.",
            brandClass:
              "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 dark:text-emerald-200",
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
            note: "Digital food kiosk browser with embedded Google Maps store locator.",
            brandClass:
              "border-teal-500/50 bg-teal-950/20 text-teal-300 dark:text-teal-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(20,184,166,0.3)]",
            icon: <LayoutGrid className="w-3.5 h-3.5 text-teal-400" />,
          },
          {
            layer: "API Server",
            tech: "Node.js + Express",
            techKey: "Node.js",
            note: "Lightweight REST routing, order validation, and receipt formatting.",
            brandClass:
              "border-green-500/50 bg-green-950/20 text-green-300 dark:text-green-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(34,197,94,0.3)]",
            icon: <Server className="w-3.5 h-3.5 text-green-400" />,
          },
          {
            layer: "Storage",
            tech: "Local Storage & JSON Store",
            techKey: "Local Storage",
            note: "Client state cart persistence and file-based feedback logging.",
            brandClass:
              "border-amber-500/50 bg-amber-950/20 text-amber-300 dark:text-amber-200",
            haloClass: "hover:shadow-[0_0_14px_rgba(245,158,11,0.3)]",
            icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
          },
        ],
      };
  }
};

const getProjectPillLabel = (proj: Project): string => {
  if (proj.id === "avms") return "AVMS";
  if (proj.id === "auto-avenue-ims") return "Auto Avenue";
  if (proj.id === "itelect4-project") return "Submission Tracker";
  return proj.title;
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  searchQuery,
  focusRequest,
  onActiveProjectChange,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ProjectClassification
  >("all");
  const [focusedCategory, setFocusedCategory] =
    useState<ProjectClassification>("mobile-platform");

  const [slideByCategory, setSlideByCategory] = useState<
    Record<ProjectClassification, number>
  >({
    "mobile-platform": 0,
    "fullstack-saas-ai": 0,
    "web-itsm": 0,
  });

  const [liveDemoByCategory, setLiveDemoByCategory] = useState<
    Record<ProjectClassification, boolean>
  >({
    "mobile-platform": true,
    "fullstack-saas-ai": true,
    "web-itsm": true,
  });

  const [expandedByCategory, setExpandedByCategory] = useState<
    Record<ProjectClassification, boolean>
  >({
    "mobile-platform": false,
    "fullstack-saas-ai": false,
    "web-itsm": false,
  });

  const [demoSpotlitCategory, setDemoSpotlitCategory] =
    useState<ProjectClassification | null>(null);

  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [countsLoaded, setCountsLoaded] = useState(false);
  const countedProjectIdsRef = useRef<Record<string, boolean>>({});
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const touchStartRef = useRef<{
    catId: ProjectClassification;
    x: number;
  } | null>(null);
  const postArticleRefs = useRef<
    Partial<Record<ProjectClassification, HTMLElement | null>>
  >({});
  const demoStageRefs = useRef<
    Partial<Record<ProjectClassification, HTMLDivElement | null>>
  >({});

  const [heartPopId, setHeartPopId] = useState<string | null>(null);
  const heartPopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ id: string; time: number }>({ id: "", time: 0 });

  // Filter projects by search query (title, subtitle, description, operationsNote, classification, or technologies)
  const searchFilteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return projectsData;
    return projectsData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.classificationLabel.toLowerCase().includes(query) ||
        (project.operationsNote &&
          project.operationsNote.toLowerCase().includes(query)) ||
        project.technologies.some((t) => t.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Group search-filtered projects by classification
  const visibleGroups = useMemo(() => {
    const cats =
      selectedCategory === "all"
        ? PROJECT_CLASSIFICATIONS
        : PROJECT_CLASSIFICATIONS.filter((c) => c.id === selectedCategory);

    return cats
      .map((meta) => ({
        meta,
        projects: searchFilteredProjects.filter(
          (p) => p.classification === meta.id
        ),
      }))
      .filter((group) => group.projects.length > 0);
  }, [selectedCategory, searchFilteredProjects]);

  // Reset slide indices when search changes
  useEffect(() => {
    setSlideByCategory({
      "mobile-platform": 0,
      "fullstack-saas-ai": 0,
      "web-itsm": 0,
    });
  }, [searchQuery]);

  // Jump to a specific project when requested (e.g. from 3D Keyboard or SkillsSection)
  useEffect(() => {
    if (!focusRequest) return;
    const targetProject = projectsData.find(
      (p) => p.id === focusRequest.projectId
    );
    if (!targetProject) return;

    const targetCat = targetProject.classification;
    if (selectedCategory !== "all" && selectedCategory !== targetCat) {
      setSelectedCategory("all");
    }

    const groupProjects = searchFilteredProjects.filter(
      (p) => p.classification === targetCat
    );
    const indexInGroup = groupProjects.findIndex(
      (p) => p.id === targetProject.id
    );

    if (indexInGroup !== -1) {
      setSlideByCategory((prev) => ({
        ...prev,
        [targetCat]: indexInGroup,
      }));
      setExpandedByCategory((prev) => ({
        ...prev,
        [targetCat]: false,
      }));
      setFocusedCategory(targetCat);

      window.setTimeout(() => {
        const postEl = postArticleRefs.current[targetCat];
        if (postEl) {
          postEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest]);

  // Observe which classification post is currently in view so TechKeyboard3D auto-syncs on scroll
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (
              !bestEntry ||
              entry.intersectionRatio > bestEntry.intersectionRatio
            ) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) {
          const catAttr = bestEntry.target.getAttribute(
            "data-project-classification"
          ) as ProjectClassification | null;
          if (catAttr) {
            setFocusedCategory(catAttr);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.15, 0.4, 0.7],
      }
    );

    visibleGroups.forEach(({ meta }) => {
      const el = postArticleRefs.current[meta.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleGroups]);

  // Notify parent (TechKeyboard3D) of the currently focused project
  useEffect(() => {
    if (visibleGroups.length === 0) {
      onActiveProjectChange?.(null);
      return;
    }

    const matchedGroup =
      visibleGroups.find((g) => g.meta.id === focusedCategory) ??
      visibleGroups[0];
    const rawSlide = slideByCategory[matchedGroup.meta.id] ?? 0;
    const safeIdx = Math.min(rawSlide, matchedGroup.projects.length - 1);
    const activeProj = matchedGroup.projects[safeIdx] ?? null;

    onActiveProjectChange?.(activeProj);
  }, [visibleGroups, focusedCategory, slideByCategory, onActiveProjectChange]);

  const launchInteractiveDemo = useCallback((catId: ProjectClassification) => {
    setLiveDemoByCategory((prev) => ({ ...prev, [catId]: true }));
    setFocusedCategory(catId);
    setDemoSpotlitCategory(catId);
    window.setTimeout(() => {
      demoStageRefs.current[catId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 40);
    window.setTimeout(() => {
      setDemoSpotlitCategory((current) => (current === catId ? null : current));
    }, 1200);
  }, []);

  const setSlideForCategory = useCallback(
    (catId: ProjectClassification, index: number) => {
      setSlideByCategory((prev) => ({
        ...prev,
        [catId]: index,
      }));
      setFocusedCategory(catId);
    },
    []
  );

  const goNextInCategory = useCallback(
    (catId: ProjectClassification, totalSlides: number) => {
      setSlideByCategory((prev) => {
        const current = prev[catId] ?? 0;
        return {
          ...prev,
          [catId]: current < totalSlides - 1 ? current + 1 : current,
        };
      });
      setFocusedCategory(catId);
    },
    []
  );

  const goPrevInCategory = useCallback((catId: ProjectClassification) => {
    setSlideByCategory((prev) => {
      const current = prev[catId] ?? 0;
      return {
        ...prev,
        [catId]: current > 0 ? current - 1 : 0,
      };
    });
    setFocusedCategory(catId);
  }, []);

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
    countedProjectIdsRef.current = {
      ...countedProjectIdsRef.current,
      [id]: true,
    };
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
          localStorage.setItem(
            "shin486-liked-projects-v1",
            JSON.stringify(next)
          );
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

  const handleTouchStart = (
    catId: ProjectClassification,
    e: React.TouchEvent
  ) => {
    touchStartRef.current = {
      catId,
      x: e.changedTouches[0].screenX,
    };
  };

  const handleTouchEnd = (
    catId: ProjectClassification,
    totalSlides: number,
    activeProjectId: string,
    e: React.TouchEvent
  ) => {
    if (!touchStartRef.current || touchStartRef.current.catId !== catId) return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartRef.current.x - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNextInCategory(catId, totalSlides);
      } else {
        goPrevInCategory(catId);
      }
    } else if (activeProjectId) {
      // Tap without horizontal swipe -> detect double-tap
      const now = Date.now();
      if (
        lastTapRef.current.id === activeProjectId &&
        now - lastTapRef.current.time < 320 &&
        now - lastTapRef.current.time > 40
      ) {
        triggerDoubleTapHeart(activeProjectId);
        lastTapRef.current = { id: "", time: 0 };
      } else {
        lastTapRef.current = { id: activeProjectId, time: now };
      }
    }
    touchStartRef.current = null;
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById("contact-section");
    if (contactEl) {
      const navOffset = 70;
      const elementPosition = contactEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="portfolio-grid" className="py-6 sm:py-8">
      {/* Bryl Lim Minimalist Numbered Section Header */}
      <div className="flex items-baseline justify-between border-b border-neutral-200/80 dark:border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-neutral-400 dark:text-zinc-500">
            02 —
          </span>
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-semibold text-neutral-900 dark:text-zinc-100">
            Featured Systems &amp; Deployments
          </h2>
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500">
          {PROJECT_CLASSIFICATIONS.length} CLASSIFIED IG POSTS ·{" "}
          {projectsData.length} APPS
        </span>
      </div>

      {/* Top Classification Filter Bar (Matches Certifications Classified IG Feed) */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto pb-4 no-scrollbar sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x"
        role="tablist"
        aria-label="Filter project posts by classification"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs tracking-wide transition-all flex items-center gap-1.5 border ${
            selectedCategory === "all"
              ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100 font-semibold shadow-sm"
              : "bg-neutral-50 dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-900 dark:hover:text-zinc-200"
          }`}
        >
          <span>All Posts</span>
          <span
            className={`px-1.5 py-0.2 rounded text-[10px] tabular-nums ${
              selectedCategory === "all"
                ? "bg-white/20 dark:bg-black/15 text-white dark:text-neutral-900"
                : "bg-neutral-200/70 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
            }`}
          >
            {PROJECT_CLASSIFICATIONS.length}
          </span>
        </button>

        {PROJECT_CLASSIFICATIONS.map((cat) => {
          const count = searchFilteredProjects.filter(
            (p) => p.classification === cat.id
          ).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setSelectedCategory(cat.id);
                setFocusedCategory(cat.id);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs tracking-wide transition-all flex items-center gap-1.5 border ${
                isSelected
                  ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100 font-semibold shadow-sm"
                  : "bg-neutral-50 dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-900 dark:hover:text-zinc-200"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] tabular-nums ${
                  isSelected
                    ? "bg-white/20 dark:bg-black/15 text-white dark:text-neutral-900"
                    : "bg-neutral-200/70 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visibleGroups.length === 0 ? (
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
        /* Classified Instagram Feed — Each Project Classification Is Its Own Instagram Post */
        <div className="space-y-8">
          {visibleGroups.map(({ meta: cat, projects: groupProjects }) => {
            const totalSlides = groupProjects.length;
            const rawSlide = slideByCategory[cat.id] ?? 0;
            const safeSlideIndex = Math.min(rawSlide, totalSlides - 1);
            const activeProject =
              groupProjects[safeSlideIndex] ?? groupProjects[0];

            const isLiveDemoView = liveDemoByCategory[cat.id] ?? true;
            const isBreakdownExpanded = expandedByCategory[cat.id] ?? false;
            const isSpotlit = demoSpotlitCategory === cat.id;
            const pipeline = getProjectPipeline(activeProject);

            const isProjectLiked = !!likedIds[activeProject.id];
            const isProjectSaved = !!savedIds[activeProject.id];
            const rawProjectCount = likeCounts[activeProject.id] ?? 0;
            const displayProjectLikes = isProjectLiked
              ? Math.max(1, rawProjectCount)
              : rawProjectCount;

            return (
              <div key={cat.id} className="space-y-2.5">
                {/* Bryl Lim Classification Section Divider */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-zinc-100">
                      {cat.label}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 font-mono text-[10px] font-semibold text-neutral-600 dark:text-zinc-400 tabular-nums">
                      {totalSlides} {totalSlides === 1 ? "project" : "projects"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-zinc-400">
                    {cat.description}
                  </p>
                </div>

                {/* Quick Project Jump Pills (Shown for Multi-Slide Project Classifications) */}
                {totalSlides > 1 && (
                  <div
                    className="flex items-center gap-1.5 pb-1 overflow-x-auto no-scrollbar sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x"
                    role="tablist"
                    aria-label={`Select ${cat.label} project slide`}
                  >
                    {groupProjects.map((proj, index) => {
                      const isCurrent = index === safeSlideIndex;
                      const pillLabel = getProjectPillLabel(proj);

                      return (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => setSlideForCategory(cat.id, index)}
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
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="whitespace-nowrap">{pillLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Authentic Instagram Post for This Project Classification */}
                <article
                  ref={(el) => {
                    postArticleRefs.current[cat.id] = el;
                  }}
                  data-project-classification={cat.id}
                  onMouseEnter={() => setFocusedCategory(cat.id)}
                  className="milled-card bg-white dark:bg-[#111116] border-y sm:border border-neutral-200 dark:border-zinc-800 sm:border-t-neutral-300/80 dark:sm:border-t-zinc-700/70 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden transition-all"
                >
                  {/* 1. Instagram Post Header */}
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
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 truncate">
                            {profileData.username}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 flex-shrink-0" />
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700/80 font-mono text-[10px] uppercase tracking-wider text-neutral-700 dark:text-zinc-300">
                            {cat.label}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-neutral-500 dark:text-zinc-400 truncate leading-tight mt-0.5">
                          {activeProject.role}
                          {activeProject.badge
                            ? ` · ${activeProject.badge}`
                            : ""}
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
                          onClick={() => {
                            setLiveDemoByCategory((prev) => ({
                              ...prev,
                              [cat.id]: true,
                            }));
                            setFocusedCategory(cat.id);
                          }}
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
                          onClick={() => {
                            setLiveDemoByCategory((prev) => ({
                              ...prev,
                              [cat.id]: false,
                            }));
                            setFocusedCategory(cat.id);
                          }}
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

                  {/* 2. Viewport: Live Interactive Sandbox vs Image Carousel */}
                  {isLiveDemoView ? (
                    <div
                      ref={(el) => {
                        demoStageRefs.current[cat.id] = el;
                      }}
                      onDoubleClick={() =>
                        triggerDoubleTapHeart(activeProject.id)
                      }
                      className={`relative w-full bg-neutral-100/70 dark:bg-[#0c0c10] p-1.5 sm:p-5 border-b border-neutral-100 dark:border-zinc-800 flex flex-col items-center justify-center transition-shadow duration-300 ${
                        isSpotlit ? "ring-2 ring-inset ring-pink-500/60" : ""
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
                      onTouchStart={(e) => handleTouchStart(cat.id, e)}
                      onTouchEnd={(e) =>
                        handleTouchEnd(
                          cat.id,
                          totalSlides,
                          activeProject.id,
                          e
                        )
                      }
                      onDoubleClick={() =>
                        triggerDoubleTapHeart(activeProject.id)
                      }
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
                        {groupProjects.map((project) => {
                          const imgSrc = imgErrors[project.id]
                            ? "/placeholder-project.svg"
                            : project.image;

                          return (
                            <div
                              key={project.id}
                              onClick={() =>
                                setExpandedByCategory((prev) => ({
                                  ...prev,
                                  [cat.id]: !prev[cat.id],
                                }))
                              }
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
                          {activeProject.classificationLabel}
                        </span>
                      </div>

                      {/* Previous Slide Arrow Button */}
                      {totalSlides > 1 && safeSlideIndex > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            goPrevInCategory(cat.id);
                          }}
                          data-note="Previous project slide."
                          aria-label="Previous project"
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}

                      {/* Next Slide Arrow Button */}
                      {totalSlides > 1 && safeSlideIndex < totalSlides - 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            goNextInCategory(cat.id, totalSlides);
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
                            launchInteractiveDemo(cat.id);
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

                  {/* 3. Instagram Action Bar & Pagination Dots */}
                  <div className="px-4 sm:px-6 pt-3.5 pb-5">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800/80">
                      {/* Left Interaction Icons */}
                      <div className="flex items-center gap-3.5 text-neutral-700 dark:text-zinc-300">
                        <button
                          type="button"
                          onClick={(e) => toggleLike(activeProject.id, e)}
                          data-note={
                            isProjectLiked
                              ? "You liked this build. Taste recognized."
                              : "Drop a heart on this project (or double-tap the poster)."
                          }
                          className={`inline-flex items-center gap-1.5 focus:outline-none transition-transform active:scale-125 ${
                            isProjectLiked
                              ? "text-red-500 animate-heart-pop"
                              : "hover:text-red-500"
                          }`}
                          aria-label={
                            isProjectLiked ? "Unlike project" : "Like project"
                          }
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isProjectLiked ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                          {displayProjectLikes > 0 && (
                            <span className="text-xs font-bold tabular-nums text-neutral-900 dark:text-zinc-100">
                              {displayProjectLikes.toLocaleString()}
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={scrollToContact}
                          data-note="Have questions about this architecture? Send me a direct message."
                          className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                          aria-label="Inquire or message about this project"
                          title="Send a message or inquire about this project"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Authentic Instagram Carousel Dots (Only on Multi-Project Posts) */}
                      {totalSlides > 1 && (
                        <div
                          className="flex items-center gap-1.5"
                          role="tablist"
                          aria-label={`${cat.label} project slides`}
                        >
                          {groupProjects.map((proj, index) => {
                            const isActive = index === safeSlideIndex;
                            return (
                              <button
                                key={proj.id}
                                type="button"
                                onClick={() =>
                                  setSlideForCategory(cat.id, index)
                                }
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
                      )}

                      {/* Right Bookmark Icon */}
                      <button
                        type="button"
                        onClick={(e) => toggleSave(activeProject.id, e)}
                        data-note={
                          isProjectSaved
                            ? "Saved to your shortlist."
                            : "Bookmark this project to your recruiter shortlist."
                        }
                        className={`focus:outline-none transition-transform active:scale-125 ${
                          isProjectSaved
                            ? "text-neutral-900 dark:text-zinc-100"
                            : "text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                        }`}
                        aria-label={
                          isProjectSaved
                            ? "Remove bookmark"
                            : "Bookmark project"
                        }
                      >
                        <Bookmark
                          className={`w-5 h-5 ${
                            isProjectSaved ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Real Instagram Likes Counter Line */}
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
                              {displayProjectLikes - 1 === 1
                                ? "other"
                                : "others"}
                            </strong>
                          </span>
                        </>
                      ) : (
                        `${displayProjectLikes.toLocaleString()} likes`
                      )}
                    </p>

                    {/* Dynamic Post Caption Content */}
                    <div className="mt-2 space-y-3">
                      {/* Title, Role & Timeline */}
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <h4 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100">
                            {activeProject.title}
                          </h4>
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
                        {activeProject.keyFeatures &&
                          activeProject.keyFeatures.length > 0 && (
                            <div>
                              {isBreakdownExpanded ? (
                                <div className="pt-2.5 border-t border-neutral-100 dark:border-zinc-800/80 space-y-1.5 animate-fade-in">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-zinc-300 flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                    Key Features &amp; Architecture
                                  </span>
                                  <ul className="space-y-1.5 pl-1">
                                    {activeProject.keyFeatures.map(
                                      (feature, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-2 text-xs text-neutral-600 dark:text-zinc-400"
                                        >
                                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ig-pink flex-shrink-0" />
                                          <span className="leading-relaxed">
                                            {feature}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedByCategory((prev) => ({
                                        ...prev,
                                        [cat.id]: false,
                                      }))
                                    }
                                    className="text-neutral-400 hover:text-neutral-600 dark:text-zinc-500 dark:hover:text-zinc-300 font-semibold text-xs cursor-pointer inline-block pt-1"
                                  >
                                    Hide key features
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedByCategory((prev) => ({
                                      ...prev,
                                      [cat.id]: true,
                                    }))
                                  }
                                  className="text-neutral-500 hover:text-neutral-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                                >
                                  <span>
                                    View {activeProject.keyFeatures.length} key
                                    engineering features
                                  </span>
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

                      {/* System Architecture Specification */}
                      <div className="pt-4 mt-1 border-t border-neutral-200/70 dark:border-zinc-800">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-neutral-400 dark:text-zinc-500">
                            // SYSTEM ARCHITECTURE
                          </span>
                          <span className="text-[10.5px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                            {pipeline.qualityTag}
                          </span>
                        </div>

                        {/* Clean Non-Nested Architectural Flow */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 sm:divide-x divide-neutral-200/70 dark:divide-zinc-800/80">
                          {pipeline.nodes.map((node, idx) => {
                            const handleMouseEnter = () => {
                              setFocusedCategory(cat.id);
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
                                className="group/node flex flex-col gap-1 sm:px-3.5 first:pl-0 last:pr-0 cursor-default transition-colors"
                              >
                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 dark:text-zinc-500">
                                  <span>0{idx + 1} //</span>
                                  <span className="uppercase tracking-wider font-semibold">
                                    {node.layer}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-zinc-100">
                                  <div className="flex-shrink-0">
                                    {node.icon}
                                  </div>
                                  <span>{node.tech}</span>
                                </div>

                                <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed pt-0.5">
                                  {node.note}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
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
