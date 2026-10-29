"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  ArrowUpRight,
  Keyboard,
  Minimize2,
  Maximize2,
  Layers,
} from "lucide-react";
import { Project, projectsData } from "@/data/projects";

export interface KeycapSkill {
  id: string;
  name: string;
  shortLabel: string;
  keyTrigger: string;
  category: "frontend" | "languages" | "backend" | "tools" | "macro";
  categoryLabel: string;
  color: string;
  wallColor: string;
  textColor?: string;
  highlight?: boolean;
  description: string;
  usedIn: { label: string; projectId?: string }[];
  renderIcon: () => React.ReactNode;
}

type SoundProfile = "thocky" | "clicky" | "linear" | "mute";

interface TechKeyboard3DProps {
  activeProject?: Project | null;
  onSelectProject?: (projectId: string) => void;
  variant?: "sidebar" | "inline";
}

/**
 * Custom crisp SVG icons for all 28 technologies + 1 mechanical 2U Wave keycap
 * Automatically matches system / site Dark Mode and Light Mode
 */
export const KEYCAP_SKILLS: KeycapSkill[] = [
  // ================= ROW 1: CORE LANGUAGES & WEB =================
  {
    id: "javascript",
    name: "JavaScript",
    shortLabel: "JS",
    keyTrigger: "J",
    category: "languages",
    categoryLabel: "Language",
    color: "#F59E0B",
    wallColor: "#B45309",
    textColor: "#111827",
    highlight: true,
    description: "ES6+, Async/Await, DOM manipulation, and interactive client logic.",
    usedIn: [
      { label: "PalengkeHub", projectId: "palengkehub" },
      { label: "Crave Cart", projectId: "crave-cart" },
    ],
    renderIcon: () => (
      <span className="font-mono font-black text-[11px] sm:text-xs tracking-tighter text-neutral-950 leading-none">
        JS
      </span>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    shortLabel: "TS",
    keyTrigger: "T",
    category: "languages",
    categoryLabel: "Language",
    color: "#2563EB",
    wallColor: "#1E40AF",
    highlight: true,
    description: "Type-safe interfaces, generics, and end-to-end full-stack safety.",
    usedIn: [
      { label: "ShinPay+", projectId: "shinpay-plus" },
      { label: "IT Elective 4", projectId: "itelect4-project" },
    ],
    renderIcon: () => (
      <span className="font-mono font-black text-[11px] sm:text-xs tracking-tighter text-white leading-none">
        TS
      </span>
    ),
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    shortLabel: "HTML5",
    keyTrigger: "5",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    color: "#EA580C",
    wallColor: "#9A3412",
    description: "Semantic markup, Flexbox, CSS Grid, and hardware-accelerated animations.",
    usedIn: [
      { label: "PalengkeHub", projectId: "palengkehub" },
      { label: "Crave Cart", projectId: "crave-cart" },
      { label: "AVMS", projectId: "avms" },
    ],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
        <path d="M4 2h16l-1.4 16.2L12 22l-6.6-3.8L4 2zm12.7 5.3H7.2l.2 2.4h9.1l-.7 7.3-3.8 1.1-3.8-1.1-.3-3h2.4l.1 1.5 1.6.4 1.6-.4.2-2.5H7.7l-.5-5.7h9.7l-.2 2z" />
      </svg>
    ),
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    shortLabel: "BS5",
    keyTrigger: "B",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    color: "#7C3AED",
    wallColor: "#5B21B6",
    description: "Responsive UI components, modals, and layout grid systems.",
    usedIn: [{ label: "Auto Avenue", projectId: "auto-avenue-ims" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[11px] sm:text-xs text-white leading-none">
        B
      </span>
    ),
  },
  {
    id: "react",
    name: "React",
    shortLabel: "React",
    keyTrigger: "R",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    color: "#0891B2",
    wallColor: "#155E75",
    highlight: true,
    description: "Hooks, state management, and modular component architecture.",
    usedIn: [
      { label: "IT Elective 4", projectId: "itelect4-project" },
      { label: "ShinPay+", projectId: "shinpay-plus" },
    ],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-cyan-200 fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="2.2" className="fill-cyan-200" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: "react-native",
    name: "React Native",
    shortLabel: "RN",
    keyTrigger: "M",
    category: "frontend",
    categoryLabel: "Mobile App",
    color: "#0284C7",
    wallColor: "#075985",
    highlight: true,
    description: "Cross-platform mobile marketplace development for Android & iOS.",
    usedIn: [{ label: "PalengkeHub", projectId: "palengkehub" }],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="1.8">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <line x1="10" y1="18.5" x2="14" y2="18.5" />
      </svg>
    ),
  },

  // ================= ROW 2: MODERN FRONTEND & BACKEND =================
  {
    id: "nextjs",
    name: "Next.js 14",
    shortLabel: "Next",
    keyTrigger: "N",
    category: "frontend",
    categoryLabel: "Full-Stack SSR",
    color: "#18181B",
    wallColor: "#09090B",
    highlight: true,
    description: "App Router, Multi-tenant SaaS architecture, Server Actions & SSR.",
    usedIn: [{ label: "ShinPay+", projectId: "shinpay-plus" }],
    renderIcon: () => (
      <div className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center font-mono font-black text-[9px]">
        N
      </div>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    shortLabel: "TW",
    keyTrigger: "W",
    category: "frontend",
    categoryLabel: "Styling System",
    color: "#06B6D4",
    wallColor: "#0E7490",
    highlight: true,
    description: "Utility-first responsive design, dark mode tokens & micro-animations.",
    usedIn: [{ label: "ShinPay+", projectId: "shinpay-plus" }],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z" />
      </svg>
    ),
  },
  {
    id: "node-express",
    name: "Node.js & Express",
    shortLabel: "Node",
    keyTrigger: "E",
    category: "backend",
    categoryLabel: "Backend & API",
    color: "#16A34A",
    wallColor: "#14532D",
    highlight: true,
    description: "REST APIs, JWT auth, rate-limiting, and local file handling.",
    usedIn: [
      { label: "IT Elective 4", projectId: "itelect4-project" },
      { label: "Crave Cart", projectId: "crave-cart" },
    ],
    renderIcon: () => (
      <span className="font-mono font-bold text-[9px] px-0.5 py-0.2 rounded border border-white/60 text-white leading-none">
        JS
      </span>
    ),
  },
  {
    id: "supabase",
    name: "Supabase",
    shortLabel: "Supa",
    keyTrigger: "S",
    category: "backend",
    categoryLabel: "Cloud BaaS",
    color: "#10B981",
    wallColor: "#047857",
    highlight: true,
    description: "PostgreSQL backend, Row-Level Security (RLS), Auth, and Storage.",
    usedIn: [
      { label: "PalengkeHub", projectId: "palengkehub" },
      { label: "ShinPay+", projectId: "shinpay-plus" },
    ],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
        <path d="M13.5 2L4 14h7.5l-1 8L20 10h-7.5l1-8z" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    shortLabel: "Mongo",
    keyTrigger: "D",
    category: "backend",
    categoryLabel: "NoSQL DB",
    color: "#15803D",
    wallColor: "#052E16",
    description: "Document data modeling and tenant-isolated CRUD operations.",
    usedIn: [{ label: "IT Elective 4", projectId: "itelect4-project" }],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-emerald-200">
        <path d="M12 2C8 6.5 6.5 10.5 6.5 14.2 6.5 18 9 20.5 12 22c3-1.5 5.5-4 5.5-7.8C17.5 10.5 16 6.5 12 2zm0 17.5v-13" />
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    shortLabel: "PG",
    keyTrigger: "G",
    category: "backend",
    categoryLabel: "Relational DB",
    color: "#3B82F6",
    wallColor: "#1D4ED8",
    highlight: true,
    description: "Multi-tenant relational schemas, foreign keys, and RLS policies.",
    usedIn: [
      { label: "ShinPay+", projectId: "shinpay-plus" },
      { label: "PalengkeHub", projectId: "palengkehub" },
    ],
    renderIcon: () => (
      <span className="font-mono font-black text-[11px] sm:text-xs text-white leading-none">
        PG
      </span>
    ),
  },

  // ================= ROW 3: LANGUAGES & DATABASES =================
  {
    id: "python",
    name: "Python",
    shortLabel: "Py",
    keyTrigger: "P",
    category: "languages",
    categoryLabel: "Language",
    color: "#0D9488",
    wallColor: "#115E59",
    highlight: true,
    description: "Python Essentials 1 & 2 (Cisco certified), automation & data structures.",
    usedIn: [{ label: "Cisco Certifications" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[11px] sm:text-xs text-amber-300 leading-none">
        Py
      </span>
    ),
  },
  {
    id: "php",
    name: "PHP",
    shortLabel: "PHP",
    keyTrigger: "H",
    category: "languages",
    categoryLabel: "Language",
    color: "#6366F1",
    wallColor: "#3730A3",
    description: "Server-side scripting and real-time POS / IMS integration.",
    usedIn: [{ label: "Auto Avenue", projectId: "auto-avenue-ims" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[10px] sm:text-[11px] italic text-white leading-none">
        php
      </span>
    ),
  },
  {
    id: "sql",
    name: "SQL",
    shortLabel: "SQL",
    keyTrigger: "Q",
    category: "languages",
    categoryLabel: "Query Language",
    color: "#D97706",
    wallColor: "#92400E",
    highlight: true,
    description: "Relational queries, joins, indexing, and normalized schema design.",
    usedIn: [
      { label: "PalengkeHub", projectId: "palengkehub" },
      { label: "ShinPay+", projectId: "shinpay-plus" },
      { label: "Auto Avenue", projectId: "auto-avenue-ims" },
    ],
    renderIcon: () => (
      <span className="font-mono font-black text-[10px] sm:text-[11px] text-white leading-none">
        SQL
      </span>
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    shortLabel: "MySQL",
    keyTrigger: "Y",
    category: "backend",
    categoryLabel: "Relational DB",
    color: "#0284C7",
    wallColor: "#0369A1",
    highlight: true,
    description: "Relational inventory and POS database management.",
    usedIn: [{ label: "Auto Avenue", projectId: "auto-avenue-ims" }],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    ),
  },
  {
    id: "java",
    name: "Java",
    shortLabel: "Java",
    keyTrigger: "A",
    category: "languages",
    categoryLabel: "Language",
    color: "#DC2626",
    wallColor: "#991B1B",
    description: "Object-Oriented Programming and core algorithmic design.",
    usedIn: [{ label: "Academic Coursework" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[10px] sm:text-[11px] text-white leading-none">
        JV
      </span>
    ),
  },
  {
    id: "cpp",
    name: "C++",
    shortLabel: "C++",
    keyTrigger: "C",
    category: "languages",
    categoryLabel: "Language",
    color: "#1D4ED8",
    wallColor: "#1E3A8A",
    description: "Data structures, algorithmic logic, and memory fundamentals.",
    usedIn: [{ label: "Academic Coursework" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[10px] sm:text-[11px] text-white leading-none">
        C++
      </span>
    ),
  },

  // ================= ROW 4: DEV TOOLS & CLOUD WORKFLOW =================
  {
    id: "git-github",
    name: "Git & GitHub",
    shortLabel: "Git",
    keyTrigger: "I",
    category: "tools",
    categoryLabel: "Version Control",
    color: "#EA580C",
    wallColor: "#9A3412",
    highlight: true,
    description: "Multi-branch workflows, Pull Requests, and collaborative version control.",
    usedIn: [
      { label: "IT Elective 4", projectId: "itelect4-project" },
      { label: "Auto Avenue", projectId: "auto-avenue-ims" },
      { label: "PalengkeHub", projectId: "palengkehub" },
    ],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M6 8.5v7M18 8.5c0 4.5-12 2.5-12 7" />
      </svg>
    ),
  },
  {
    id: "vercel",
    name: "Vercel",
    shortLabel: "Vercel",
    keyTrigger: "V",
    category: "tools",
    categoryLabel: "Cloud Deploy",
    color: "#18181B",
    wallColor: "#09090B",
    highlight: true,
    description: "Full-stack & frontend cloud deployment with environment configs.",
    usedIn: [
      { label: "ShinPay+", projectId: "shinpay-plus" },
      { label: "IT Elective 4", projectId: "itelect4-project" },
    ],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
        <path d="M12 3l10 18H2L12 3z" />
      </svg>
    ),
  },
  {
    id: "vite",
    name: "Vite",
    shortLabel: "Vite",
    keyTrigger: "Z",
    category: "tools",
    categoryLabel: "Build Tool",
    color: "#8B5CF6",
    wallColor: "#5B21B6",
    description: "Lightning-fast frontend build tooling and HMR dev server.",
    usedIn: [{ label: "IT Elective 4", projectId: "itelect4-project" }],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-amber-300">
        <path d="M13 2L4 14h7l-1 8 10-12h-7l0-8z" />
      </svg>
    ),
  },
  {
    id: "postman",
    name: "Postman",
    shortLabel: "API",
    keyTrigger: "O",
    category: "tools",
    categoryLabel: "API Testing",
    color: "#F97316",
    wallColor: "#C2410C",
    highlight: true,
    description: "REST API testing, endpoint debugging, and payload validation.",
    usedIn: [{ label: "IT Elective 4", projectId: "itelect4-project" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[9px] sm:text-[10px] text-white leading-none">
        API
      </span>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    shortLabel: "Figma",
    keyTrigger: "F",
    category: "tools",
    categoryLabel: "UI/UX Design",
    color: "#EC4899",
    wallColor: "#9D174D",
    highlight: true,
    description: "Wireframing, high-fidelity UI prototyping, and design systems.",
    usedIn: [
      { label: "PalengkeHub", projectId: "palengkehub" },
      { label: "ShinPay+", projectId: "shinpay-plus" },
    ],
    renderIcon: () => (
      <span className="font-mono font-black text-[9px] sm:text-[10px] text-white leading-none">
        FIG
      </span>
    ),
  },
  {
    id: "sqlite",
    name: "SQLite",
    shortLabel: "SQLite",
    keyTrigger: "L",
    category: "backend",
    categoryLabel: "Embedded DB",
    color: "#475569",
    wallColor: "#1E293B",
    description: "Lightweight embedded local relational database.",
    usedIn: [{ label: "Academic Coursework" }],
    renderIcon: () => (
      <span className="font-mono font-bold text-[9px] sm:text-[10px] text-sky-200 leading-none">
        Lite
      </span>
    ),
  },

  // ================= ROW 5: ENVIRONMENT & 2U MECHANICAL WAVE KEY =================
  {
    id: "linux",
    name: "Linux",
    shortLabel: "Linux",
    keyTrigger: "X",
    category: "tools",
    categoryLabel: "OS & Shell",
    color: "#27272A",
    wallColor: "#09090B",
    description: "Shell navigation, CLI scripting, and server environment management.",
    usedIn: [{ label: "Development & Servers" }],
    renderIcon: () => (
      <span className="font-mono font-bold text-[9px] sm:text-[10px] text-amber-400 leading-none">
        SH
      </span>
    ),
  },
  {
    id: "vscode",
    name: "VS Code",
    shortLabel: "VSC",
    keyTrigger: "K",
    category: "tools",
    categoryLabel: "IDE Workflow",
    color: "#0284C7",
    wallColor: "#075985",
    description: "Primary code editor, TypeScript debugging, and Git integration.",
    usedIn: [
      { label: "PalengkeHub", projectId: "palengkehub" },
      { label: "ShinPay+", projectId: "shinpay-plus" },
    ],
    renderIcon: () => (
      <span className="font-mono font-black text-[9px] sm:text-[10px] text-white leading-none">
        {"</>"}
      </span>
    ),
  },
  {
    id: "expo",
    name: "Expo",
    shortLabel: "Expo",
    keyTrigger: "U",
    category: "tools",
    categoryLabel: "Mobile Tooling",
    color: "#334155",
    wallColor: "#0F172A",
    highlight: true,
    description: "React Native mobile development, device testing, and builds.",
    usedIn: [{ label: "PalengkeHub", projectId: "palengkehub" }],
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2.4">
        <path d="M4 18L12 5l8 13" />
      </svg>
    ),
  },
  {
    id: "powerbi-uipath",
    name: "PowerBI & UiPath",
    shortLabel: "BI/RPA",
    keyTrigger: "1",
    category: "tools",
    categoryLabel: "Analytics & RPA",
    color: "#EAB308",
    wallColor: "#A16207",
    textColor: "#111827",
    description: "Business data visualization dashboards & Robotic Process Automation.",
    usedIn: [{ label: "Academic Coursework" }],
    renderIcon: () => (
      <span className="font-mono font-black text-[9px] sm:text-[10px] text-neutral-950 leading-none">
        BI
      </span>
    ),
  },
  // 2U Wide Mechanical Wave Keycap (completes the 6-column matrix)
  {
    id: "macro-play",
    name: "Auto-Demo Wave",
    shortLabel: "WAVE 28",
    keyTrigger: "ENTER",
    category: "macro",
    categoryLabel: "Mechanical Macro",
    color: "#18181B",
    wallColor: "#09090B",
    description: "Plays an automated mechanical typing wave across all 28 skills on the board.",
    usedIn: [{ label: "3D Keyboard Lab" }],
    renderIcon: () => (
      <div className="flex items-center justify-center gap-1">
        <Play className="w-2.5 h-2.5 text-white fill-white" />
        <span className="text-[7.5px] font-mono font-bold text-white tracking-wider">
          WAVE 28
        </span>
      </div>
    ),
  },
];

export const TechKeyboard3D: React.FC<TechKeyboard3DProps> = ({
  activeProject,
  onSelectProject,
  variant = "sidebar",
}) => {
  const [selectedSkill, setSelectedSkill] = useState<KeycapSkill>(KEYCAP_SKILLS[4]); // Default: React
  const [pressedIds, setPressedIds] = useState<Record<string, boolean>>({});
  const [soundProfile, setSoundProfile] = useState<SoundProfile>("thocky");
  const [isDark, setIsDark] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [tilt, setTilt] = useState({ x: 25, z: -14, y: 5 });
  const [isMobile, setIsMobile] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Synchronize design directly with Dark Mode and Light Mode (zero manual color buttons)
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Check screen width for mobile-friendly initial rotation
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setTilt({ x: 20, z: -8, y: 3 });
      } else {
        setTilt({ x: 25, z: -14, y: 5 });
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Synthesize realistic mechanical switch audio via native Web Audio API (zero external MP3s)
  const playMechanicalSound = useCallback(
    (profile: SoundProfile, pitchOffset = 0) => {
      if (profile === "mute" || typeof window === "undefined") return;

      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;

        // 1. Switch leaf transient ping
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "bandpass";
        const baseFreq =
          profile === "clicky" ? 2200 : profile === "thocky" ? 1350 : 950;
        filter.frequency.setValueAtTime(baseFreq + (pitchOffset % 6) * 30, now);
        filter.Q.setValueAtTime(profile === "clicky" ? 5 : 3, now);

        clickOsc.type = profile === "clicky" ? "sawtooth" : "triangle";
        clickOsc.frequency.setValueAtTime(baseFreq, now);
        clickOsc.frequency.exponentialRampToValueAtTime(280, now + 0.022);

        clickGain.gain.setValueAtTime(
          profile === "clicky" ? 0.35 : profile === "thocky" ? 0.25 : 0.12,
          now
        );
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        clickOsc.connect(filter);
        filter.connect(clickGain);
        clickGain.connect(ctx.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.026);

        // 2. PBT Keycap + Case Bottom-Out "Thock"
        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();

        bodyOsc.type = "sine";
        const thockStart = profile === "thocky" ? 165 : 135;
        bodyOsc.frequency.setValueAtTime(thockStart + (pitchOffset % 6) * 5, now);
        bodyOsc.frequency.exponentialRampToValueAtTime(48, now + 0.055);

        bodyGain.gain.setValueAtTime(
          profile === "thocky" ? 0.52 : profile === "linear" ? 0.38 : 0.28,
          now
        );
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);

        bodyOsc.start(now);
        bodyOsc.stop(now + 0.062);
      } catch {
        // Ignore audio errors if blocked by browser autoplay policy
      }
    },
    []
  );

  const triggerKeycap = useCallback(
    (skill: KeycapSkill, index = 0) => {
      playMechanicalSound(soundProfile, index);

      setPressedIds((prev) => ({ ...prev, [skill.id]: true }));
      setTimeout(() => {
        setPressedIds((prev) => ({ ...prev, [skill.id]: false }));
      }, 150);

      if (skill.id === "macro-play") {
        setIsAutoPlaying((prev) => !prev);
        return;
      }

      setSelectedSkill(skill);
    },
    [playMechanicalSound, soundProfile]
  );

  // Auto-Demo Wave across ALL 28 skills on the board
  useEffect(() => {
    if (!isAutoPlaying) return;
    const allSkills = KEYCAP_SKILLS.filter((s) => s.category !== "macro");
    let step = 0;

    const interval = setInterval(() => {
      if (step < allSkills.length) {
        const target = allSkills[step];
        triggerKeycap(target, step);
        step++;
      } else {
        setIsAutoPlaying(false);
      }
    }, 220);

    return () => clearInterval(interval);
  }, [isAutoPlaying, triggerKeycap]);

  // Listen to physical keyboard typing anywhere on the page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const keyUpper = e.key.toUpperCase();
      const matchedIndex = KEYCAP_SKILLS.findIndex(
        (s) => s.keyTrigger === keyUpper
      );
      if (matchedIndex !== -1) {
        triggerKeycap(KEYCAP_SKILLS[matchedIndex], matchedIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerKeycap]);

  // Check if a keycap belongs to the currently active project in the feed
  const isSkillInActiveProject = useCallback(
    (skill: KeycapSkill) => {
      if (!activeProject || skill.category === "macro") return false;
      return skill.usedIn.some((u) => u.projectId === activeProject.id);
    },
    [activeProject]
  );

  // Subtle interactive 3D tilt when moving cursor over the stage (desktop only)
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: 25 - ny * 6,
      z: -14 + nx * 5,
      y: 5 + nx * 4,
    });
  };

  const handleStageMouseLeave = () => {
    if (isMobile) {
      setTilt({ x: 20, z: -8, y: 3 });
    } else {
      setTilt({ x: 25, z: -14, y: 5 });
    }
  };

  const cycleSoundProfile = () => {
    const order: SoundProfile[] = ["thocky", "clicky", "linear", "mute"];
    const next = order[(order.indexOf(soundProfile) + 1) % order.length];
    setSoundProfile(next);
    if (next !== "mute") {
      playMechanicalSound(next, 2);
    }
  };

  if (variant === "sidebar" && isMinimized) {
    return (
      <div className="flex justify-end pr-1">
        <button
          onClick={() => setIsMinimized(false)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#111116]/95 backdrop-blur-md border border-neutral-200 dark:border-zinc-800 shadow-md text-xs font-semibold text-neutral-800 dark:text-zinc-200 hover:border-ig-pink transition-all"
        >
          <Keyboard className="w-3.5 h-3.5 text-ig-pink" />
          <span>Expand 3D Keyboard</span>
          <Maximize2 className="w-3 h-3 text-neutral-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full select-none">
      {/* Top Floating Header — Clean & minimal (zero unwanted buttons) */}
      <div className="flex items-center justify-between mb-2 px-1 gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm sm:text-base xl:text-lg font-black tracking-wider uppercase bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-400 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
              SKILLS
            </h2>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-ig-pink/15 text-ig-pink border border-ig-pink/30">
              28 KEYS
            </span>
          </div>
          <p className="text-[10px] font-mono text-neutral-500 dark:text-zinc-400 truncate">
            {isMobile
              ? "(tap any keycap below)"
              : "(press a key or tap below)"}
          </p>
        </div>

        {/* Minimal Audio & Minimize Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={cycleSoundProfile}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-neutral-100 dark:bg-zinc-900/90 border border-neutral-200/90 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 hover:border-ig-pink transition-colors"
            title="Cycle mechanical switch sound profile"
          >
            {soundProfile === "mute" ? (
              <VolumeX className="w-3 h-3 text-neutral-400" />
            ) : (
              <Volume2 className="w-3 h-3 text-ig-pink" />
            )}
            <span className="capitalize">{soundProfile}</span>
          </button>

          {variant === "sidebar" && (
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-md bg-neutral-100 dark:bg-zinc-900/90 border border-neutral-200/90 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              title="Minimize 3D Keyboard"
              aria-label="Minimize 3D Keyboard"
            >
              <Minimize2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 3D Isometric Mechanical Keypad Stage — Generous bottom clearance */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="relative w-full pt-2 pb-6 sm:pb-8 flex items-center justify-center touch-manipulation overflow-visible"
        style={{ perspective: "1000px" }}
      >
        {/* Dynamic Ambient Underglow — Matches Dark Mode vs Light Mode */}
        <div
          className="absolute w-56 h-40 sm:w-64 sm:h-48 rounded-full blur-2xl pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(221,42,123,0.34) 0%, rgba(245,133,41,0.15) 45%, transparent 75%)"
              : "radial-gradient(circle, rgba(221,42,123,0.18) 0%, rgba(59,130,246,0.12) 45%, transparent 70%)",
          }}
        />

        {/* Sculpted Anodized Aluminum 3D Keyboard Case (Dark Obsidian in Dark Mode / Frosted Silver in Light Mode) */}
        <div
          className={`relative p-2 rounded-[16px] sm:rounded-[20px] transition-all duration-300 ease-out origin-center ${
            isDark
              ? "bg-[#14151c] border border-white/15"
              : "bg-white border border-neutral-200 shadow-md"
          }`}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateZ(${tilt.z}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            boxShadow: isDark
              ? `
                -2px 2px 0 #0b0c10,
                -3px 3px 0 #0b0c10,
                -4px 5px 0 #090a0e,
                -5px 7px 0 #08090c,
                -7px 9px 0 #060709,
                -8px 14px 20px rgba(0, 0, 0, 0.7)
              `
              : `
                -2px 2px 0 #cbd5e1,
                -3px 3px 0 #cbd5e1,
                -4px 5px 0 #94a3b8,
                -5px 7px 0 #64748b,
                -7px 9px 0 #475569,
                -8px 14px 22px rgba(0, 0, 0, 0.16)
              `,
          }}
        >
          {/* Recessed Switch Plate (Dark in Dark Mode / Clean Light in Light Mode) */}
          <div
            className={`p-1.5 rounded-[13px] sm:rounded-[15px] border shadow-inner transition-colors duration-300 ${
              isDark
                ? "bg-[#090a0f] border-white/5"
                : "bg-[#f1f5f9] border-neutral-200"
            }`}
          >
            {/* 6 Columns Grid: Rows 1-4 = 24 skills, Row 5 = 4 skills + 1 2U Wave Keycap */}
            <div className="grid grid-cols-6 gap-1 xs:gap-1.5 sm:gap-1.5">
              {KEYCAP_SKILLS.map((skill, idx) => {
                const isPressed = !!pressedIds[skill.id];
                const isSelected = selectedSkill.id === skill.id;
                const isProjectMatch = isSkillInActiveProject(skill);
                const isWideKey = skill.id === "macro-play";

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => triggerKeycap(skill, idx)}
                    aria-label={`${skill.name} (${skill.keyTrigger})`}
                    className={`group relative ${
                      isWideKey
                        ? "col-span-2 w-full"
                        : "w-[34px] xs:w-[37px] sm:w-[40px] xl:w-[36px] 2xl:w-[40px]"
                    } h-[34px] xs:h-[37px] sm:h-[40px] xl:h-[36px] 2xl:h-[40px] rounded-[7px] sm:rounded-[8px] focus:outline-none transition-transform duration-75 active:scale-95`}
                    style={{
                      backgroundColor: skill.color,
                      transform: isPressed
                        ? "translate(-1px, 3px)"
                        : "translate(0px, 0px)",
                      boxShadow: isPressed
                        ? `
                          -1px 1px 0 ${skill.wallColor},
                          0 0 8px ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}
                        `
                        : isDark
                        ? `
                          -1px 1px 0 ${skill.wallColor},
                          -2px 2px 0 ${skill.wallColor},
                          -2.5px 3px 0 #050608,
                          -4px 5px 6px rgba(0,0,0,0.55)
                        `
                        : `
                          -1px 1px 0 ${skill.wallColor},
                          -2px 2px 0 ${skill.wallColor},
                          -2.5px 3px 0 rgba(0,0,0,0.25),
                          -4px 5px 6px rgba(0,0,0,0.2)
                        `,
                    }}
                  >
                    {/* Active Selection / Synced Project Halo Ring */}
                    {(isSelected || isProjectMatch) && (
                      <span
                        className={`pointer-events-none absolute -inset-[2px] rounded-[8px] sm:rounded-[9px] ${
                          isSelected
                            ? "ring-2 ring-white shadow-[0_0_8px_rgba(255,255,255,0.55)]"
                            : "ring-1 ring-amber-300/80 animate-pulse"
                        }`}
                      />
                    )}

                    {/* Sculpted Concave Keycap Dish */}
                    <div
                      className="absolute inset-[2px] rounded-[5px] sm:rounded-[6px] flex flex-col items-center justify-center p-0.5 overflow-hidden"
                      style={{
                        background: isDark
                          ? "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.18) 100%)"
                          : "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%)",
                        borderTop: isDark
                          ? "1px solid rgba(255,255,255,0.28)"
                          : "1px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      {/* Keycap Icon / Label */}
                      <div className="transform group-hover:scale-105 transition-transform flex items-center justify-center">
                        {isWideKey && isAutoPlaying ? (
                          <div className="flex items-center gap-1">
                            <Square className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                            <span className="text-[7.5px] font-mono font-bold text-rose-400">
                              STOP
                            </span>
                          </div>
                        ) : (
                          skill.renderIcon()
                        )}
                      </div>

                      {/* Tiny Sub-Legend (for normal keys only) */}
                      {!isWideKey && (
                        <span
                          className="text-[6px] xs:text-[6.5px] font-mono font-bold tracking-tighter leading-none mt-0.5 opacity-90 truncate max-w-full"
                          style={{ color: skill.textColor || "#ffffff" }}
                        >
                          {skill.shortLabel}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Metallic Chassis Status Strip — Automatically shows Dark Mode / Light Mode */}
          <div className="mt-1 px-0.5 flex items-center justify-between text-[8px] font-mono">
            <span
              className={`inline-flex items-center gap-1 transition-colors ${
                isDark ? "text-zinc-400" : "text-neutral-600 font-semibold"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SHIN-28</span>
            </span>
            <span
              className={`uppercase tracking-tight transition-colors ${
                isDark ? "text-zinc-500" : "text-neutral-500"
              }`}
            >
              {isDark ? "DARK CHASSIS" : "SILVER CHASSIS"}
            </span>
          </div>
        </div>
      </div>

      {/* Streamlined, Compact Skill Inspector HUD — Dark/Light responsive */}
      <div className="mt-6 sm:mt-8 rounded-xl bg-white/95 dark:bg-[#111116]/95 backdrop-blur-md border border-neutral-200/90 dark:border-zinc-800/90 p-2.5 shadow-md transition-all">
        {/* Row 1: Skill Icon + Name + Key badge + Wave button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-white/15"
              style={{ backgroundColor: selectedSkill.color }}
            >
              {selectedSkill.renderIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 truncate">
                  {selectedSkill.name}
                </h3>
                <span className="px-1 py-0.2 rounded text-[9px] font-mono font-semibold bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-700 flex-shrink-0">
                  [{selectedSkill.keyTrigger}]
                </span>
              </div>
              <p className="text-[10px] font-medium text-ig-pink truncate">
                {selectedSkill.categoryLabel}
              </p>
            </div>
          </div>

          {/* Auto-Wave across all 28 keys button */}
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-semibold border transition-all flex-shrink-0 ${
              isAutoPlaying
                ? "bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse"
                : "bg-neutral-100 dark:bg-zinc-800/90 text-neutral-700 dark:text-zinc-300 border-neutral-200 dark:border-zinc-700 hover:border-ig-pink"
            }`}
            title="Play an automated mechanical typing wave across all 28 skills"
          >
            {isAutoPlaying ? (
              <>
                <Square className="w-2.5 h-2.5 fill-current" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Wave 28</span>
              </>
            )}
          </button>
        </div>

        {/* Row 2: Short 1-line description */}
        <p className="mt-1 text-[11px] text-neutral-600 dark:text-zinc-400 leading-snug line-clamp-2">
          {selectedSkill.description}
        </p>

        {/* Row 3: Connected Project Pills */}
        <div className="mt-1.5 pt-1.5 border-t border-neutral-100 dark:border-zinc-800/80 flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500 flex items-center gap-0.5">
            <Layers className="w-2.5 h-2.5 text-ig-purple" />
            Used in:
          </span>
          {selectedSkill.usedIn.map((item) => {
            const isClickable = !!item.projectId && !!onSelectProject;
            const matchedProject = item.projectId
              ? projectsData.find((p) => p.id === item.projectId)
              : null;

            return isClickable ? (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  item.projectId && onSelectProject?.(item.projectId)
                }
                className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-ig-pink/10 hover:bg-ig-pink/20 text-ig-pink border border-ig-pink/25 transition-colors active:scale-95"
                title={
                  matchedProject
                    ? `Jump to ${matchedProject.title} live demo`
                    : item.label
                }
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </button>
            ) : (
              <span
                key={item.label}
                className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300"
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
