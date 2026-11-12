"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { projectsData } from "@/data/projects";
import {
  ExposedSwitchStem,
  KEYCAP_SKILLS,
  Keycap3DSurface,
  KeycapSkill,
  SoundProfile,
  TechKeyboard3D,
} from "./TechKeyboard3D";

type DomainFilterKey =
  | "all"
  | "core"
  | "frontend"
  | "backend"
  | "languages"
  | "tools";

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

const SHIPPED_SYSTEMS = [
  {
    id: "palengkehub",
    label: "PalengkeHub",
    architecture:
      "React Native ▸ Expo ▸ TypeScript ▸ Supabase Realtime (<250ms) ▸ PostgreSQL RLS",
    summary: "Offline-First Public Market Mobile App",
  },
  {
    id: "shinpay-plus",
    label: "ShinPay+",
    architecture:
      "Next.js 14 App Router ▸ TypeScript ▸ TRAIN Tax Engine ▸ Supabase ▸ PostgreSQL RLS",
    summary: "Multi-Tenant Enterprise Payroll & HR SaaS",
  },
  {
    id: "itelect4-project",
    label: "IT Elective 4",
    architecture:
      "React + Vite ▸ TypeScript ▸ Node.js & Express ▸ Gemini AI ▸ MongoDB",
    summary: "Full-Stack JWT CRUD & Google Gemini AI Endpoint",
  },
  {
    id: "auto-avenue-ims",
    label: "Auto Avenue",
    architecture: "PHP ▸ MySQL Relational Engine ▸ Bootstrap 5 ▸ POS Sync",
    summary: "150+ SKU Inventory Management & POS System",
  },
  {
    id: "crave-cart",
    label: "Crave Cart",
    architecture: "JavaScript ES6+ ▸ Node.js & Express ▸ REST API ▸ Local I/O",
    summary: "Interactive Food Ordering Kiosk & Receipt Engine",
  },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onSelectProject,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [domainFilter, setDomainFilter] = useState<DomainFilterKey>("all");
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [soundProfile, setSoundProfile] = useState<SoundProfile>("thocky");
  const [pressedIds, setPressedIds] = useState<Record<string, boolean>>({});
  const [spotlightSkill, setSpotlightSkill] = useState<KeycapSkill | null>(null);
  const [isAutoWaving, setIsAutoWaving] = useState(false);

  // Flight choreography state
  const [flightNonce, setFlightNonce] = useState<number>(0);
  const [isFlying, setIsFlying] = useState<boolean>(true);
  const [landedIds, setLandedIds] = useState<Set<string>>(new Set());
  const [justLandedIds, setJustLandedIds] = useState<Record<string, boolean>>(
    {}
  );

  const audioCtxRef = useRef<AudioContext | null>(null);
  const flyingNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number | null>(null);
  const soundProfileRef = useRef<SoundProfile>(soundProfile);

  useEffect(() => {
    soundProfileRef.current = soundProfile;
  }, [soundProfile]);

  // All 28 real technology keycaps (excluding the 2U macro wave key)
  const allSkillKeys = useMemo(
    () => KEYCAP_SKILLS.filter((k) => k.category !== "macro"),
    []
  );

  // Filtered skills based on Domain + Shipped System X-Ray
  const filteredSkills = useMemo(() => {
    return allSkillKeys.filter((skill) => {
      if (projectFilter) {
        const matchesProject = skill.usedIn.some(
          (u) => u.projectId === projectFilter
        );
        if (!matchesProject) return false;
      }
      if (domainFilter === "all") return true;
      if (domainFilter === "core") return Boolean(skill.highlight);
      return skill.category === domainFilter;
    });
  }, [allSkillKeys, domainFilter, projectFilter]);

  // Sync Dark / Light theme
  useEffect(() => {
    setMounted(true);
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
      // Reset sidebar deployed state when unmounting SkillsSection
      window.dispatchEvent(
        new CustomEvent("shin-deployed-keys-change", {
          detail: { deployedIds: [] },
        })
      );
    };
  }, []);

  // Synthesize realistic mechanical switch audio via Web Audio API
  const playSwitchSound = useCallback(
    (profile: SoundProfile, pitchIndex = 0, gainScale = 1) => {
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

        // 1. Switch leaf ping
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "bandpass";
        const baseFreq =
          profile === "clicky" ? 2200 : profile === "thocky" ? 1350 : 950;
        filter.frequency.setValueAtTime(
          baseFreq + (pitchIndex % 7) * 28,
          now
        );
        filter.Q.setValueAtTime(profile === "clicky" ? 5 : 3, now);

        clickOsc.type = profile === "clicky" ? "sawtooth" : "triangle";
        clickOsc.frequency.setValueAtTime(baseFreq, now);
        clickOsc.frequency.exponentialRampToValueAtTime(280, now + 0.022);

        const rawClickPeak =
          (profile === "clicky" ? 0.32 : profile === "thocky" ? 0.22 : 0.12) *
          gainScale;
        clickGain.gain.setValueAtTime(Math.max(0.002, rawClickPeak), now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        clickOsc.connect(filter);
        filter.connect(clickGain);
        clickGain.connect(ctx.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.026);

        // 2. Keycap bottom-out thock
        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();

        bodyOsc.type = "sine";
        const thockStart = profile === "thocky" ? 165 : 135;
        bodyOsc.frequency.setValueAtTime(
          thockStart + (pitchIndex % 7) * 5,
          now
        );
        bodyOsc.frequency.exponentialRampToValueAtTime(48, now + 0.055);

        const rawBodyPeak =
          (profile === "thocky" ? 0.48 : profile === "linear" ? 0.34 : 0.24) *
          gainScale;
        bodyGain.gain.setValueAtTime(Math.max(0.002, rawBodyPeak), now);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);

        bodyOsc.start(now);
        bodyOsc.stop(now + 0.062);
      } catch {
        // Ignore autoplay restrictions before user interaction
      }
    },
    []
  );

  // Trigger a docked 3D keycap inside SkillsSection
  const triggerDockedSkill = useCallback(
    (skill: KeycapSkill, index = 0, openSpotlight = true) => {
      playSwitchSound(soundProfileRef.current, index, 1);

      setPressedIds((prev) => ({ ...prev, [skill.id]: true }));
      setTimeout(() => {
        setPressedIds((prev) => ({ ...prev, [skill.id]: false }));
      }, 160);

      if (openSpotlight) {
        setSpotlightSkill(skill);
      }
    },
    [playSwitchSound]
  );

  // Listen for "Replay Flight" events from the sidebar keyboard HUD + sync physical keyboard keydowns
  useEffect(() => {
    const handleReplay = () => {
      setFlightNonce((n) => n + 1);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSpotlightSkill(null);
        return;
      }
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
      const matched = allSkillKeys.find((s) => s.keyTrigger === keyUpper);
      if (matched) {
        setPressedIds((prev) => ({ ...prev, [matched.id]: true }));
        setTimeout(() => {
          setPressedIds((prev) => ({ ...prev, [matched.id]: false }));
        }, 160);
      }
    };
    window.addEventListener("shin-replay-keycap-flight", handleReplay);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("shin-replay-keycap-flight", handleReplay);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allSkillKeys]);

  // Coordinate-tracked 3D Keycap Flight Engine (Sidebar Keyboard -> Per-Skill Switch Sockets)
  useEffect(() => {
    if (!mounted) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const skillsToFly = filteredSkills;
    if (skillsToFly.length === 0) {
      setIsFlying(false);
      setLandedIds(new Set());
      window.dispatchEvent(
        new CustomEvent("shin-deployed-keys-change", {
          detail: { deployedIds: [] },
        })
      );
      return;
    }

    // Step 1: Reset all sockets to exposed switch stems & put keycaps back on sidebar briefly
    setIsFlying(true);
    setLandedIds(new Set());
    window.dispatchEvent(
      new CustomEvent("shin-deployed-keys-change", {
        detail: { deployedIds: [] },
      })
    );

    const FLIGHT_DURATION = 640; // ms per individual keycap flight
    const STAGGER_MS = 28; // ms delay between each keycap peeling off the keyboard
    const INITIAL_HOLD_MS = 90; // brief beat so visitor sees the sidebar keyboard before launch

    const launchedTracker = new Set<string>();
    const landedTracker = new Set<string>();
    let startTime: number | null = null;

    const stepFrame = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime - INITIAL_HOLD_MS;

      // Batch-read all source (sidebar/inline keyboard) and destination (skill socket) rects
      const sourceRects: Record<string, DOMRect | null> = {};
      const destRects: Record<string, DOMRect | null> = {};

      for (let i = 0; i < skillsToFly.length; i++) {
        const id = skillsToFly[i].id;
        const sidebarEl = document.querySelector<HTMLElement>(
          `[data-sidebar-keycap="${id}"]`
        );
        const inlineEl = document.querySelector<HTMLElement>(
          `[data-inline-keycap="${id}"]`
        );

        let srcRect: DOMRect | null = null;
        if (sidebarEl) {
          const r = sidebarEl.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) srcRect = r;
        }
        if (!srcRect && inlineEl) {
          const r = inlineEl.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) srcRect = r;
        }
        sourceRects[id] = srcRect;

        const socketEl = document.querySelector<HTMLElement>(
          `[data-skill-socket="${id}"]`
        );
        destRects[id] = socketEl ? socketEl.getBoundingClientRect() : null;
      }

      let newlyLaunched = false;
      let newlyLanded = false;
      const newlyLandedList: { id: string; index: number }[] = [];

      for (let i = 0; i < skillsToFly.length; i++) {
        const skill = skillsToFly[i];
        const id = skill.id;
        const delay = i * STAGGER_MS;
        const localElapsed = elapsed - delay;
        const flyNode = flyingNodeRefs.current[id];

        if (localElapsed < 0) {
          // Waiting on the sidebar keyboard
          if (flyNode) {
            flyNode.style.opacity = "0";
          }
          continue;
        }

        if (!launchedTracker.has(id)) {
          launchedTracker.add(id);
          newlyLaunched = true;
        }

        const rawProgress = Math.min(1, localElapsed / FLIGHT_DURATION);

        if (rawProgress >= 1) {
          // Keycap has landed in its target socket
          if (flyNode) {
            flyNode.style.opacity = "0";
          }
          if (!landedTracker.has(id)) {
            landedTracker.add(id);
            newlyLanded = true;
            newlyLandedList.push({ id, index: i });
          }
          continue;
        }

        // Keycap is actively in flight across the viewport
        const destRect = destRects[id];
        if (!destRect || !flyNode) continue;

        // Fallback origin if neither sidebar nor inline keyboard is visible
        const fallbackX = window.innerWidth - 180;
        const fallbackY = 180 + (i % 6) * 40;
        const srcRect = sourceRects[id];

        const startX = srcRect ? srcRect.left : fallbackX;
        const startY = srcRect ? srcRect.top : fallbackY;
        const startW = srcRect ? srcRect.width : 38;
        const startH = srcRect ? srcRect.height : 40;

        // Smooth cubic-out easing for X/Y translation + parabolic upward lift
        const ease = 1 - Math.pow(1 - rawProgress, 3.1);
        const arcLift = Math.sin(rawProgress * Math.PI) * -42;

        const curX = startX + (destRect.left - startX) * ease;
        const curY = startY + (destRect.top - startY) * ease + arcLift;
        const curW = startW + (destRect.width - startW) * ease;
        const curH = startH + (destRect.height - startH) * ease;

        // Smoothly un-tilt from the sidebar's isometric 3D angle (25deg X, -14deg Z, 5deg Y) to 0deg
        const rotX = 25 * (1 - ease);
        const rotZ = -14 * (1 - ease);
        const rotY = 5 * (1 - ease);
        const midScale = 1 + Math.sin(rawProgress * Math.PI) * 0.22;

        flyNode.style.opacity = "1";
        flyNode.style.width = `${curW}px`;
        flyNode.style.height = `${curH}px`;
        flyNode.style.transform = `translate3d(${curX}px, ${curY}px, 0) perspective(700px) rotateX(${rotX.toFixed(
          2
        )}deg) rotateZ(${rotZ.toFixed(2)}deg) rotateY(${rotY.toFixed(
          2
        )}deg) scale(${midScale.toFixed(3)})`;
      }

      if (newlyLaunched) {
        window.dispatchEvent(
          new CustomEvent("shin-deployed-keys-change", {
            detail: { deployedIds: Array.from(launchedTracker) },
          })
        );
      }

      if (newlyLanded) {
        setLandedIds(new Set(landedTracker));
        const pulsePatch: Record<string, boolean> = {};
        newlyLandedList.forEach(({ id, index }) => {
          pulsePatch[id] = true;
          // Subtle low-volume mechanical bottom-out tick as each keycap snaps into its socket
          if (index % 2 === 0) {
            playSwitchSound(soundProfileRef.current, index, 0.22);
          }
        });
        setJustLandedIds((prev) => ({ ...prev, ...pulsePatch }));
        setTimeout(() => {
          setJustLandedIds((prev) => {
            const next = { ...prev };
            newlyLandedList.forEach(({ id }) => {
              delete next[id];
            });
            return next;
          });
        }, 190);
      }

      const totalDuration =
        (skillsToFly.length - 1) * STAGGER_MS + FLIGHT_DURATION + 40;
      if (elapsed < totalDuration) {
        rafRef.current = requestAnimationFrame(stepFrame);
      } else {
        setIsFlying(false);
        setLandedIds(new Set(skillsToFly.map((s) => s.id)));
      }
    };

    rafRef.current = requestAnimationFrame(stepFrame);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [mounted, filteredSkills, flightNonce, playSwitchSound]);

  // Auto-Demo Wave across all docked keycaps in SkillsSection
  useEffect(() => {
    if (!isAutoWaving) return;
    let step = 0;
    const interval = setInterval(() => {
      if (step < filteredSkills.length) {
        const target = filteredSkills[step];
        triggerDockedSkill(target, step, false);
        step++;
      } else {
        setIsAutoWaving(false);
      }
    }, 140);

    return () => clearInterval(interval);
  }, [isAutoWaving, filteredSkills, triggerDockedSkill]);

  const cycleSoundProfile = () => {
    const order: SoundProfile[] = ["thocky", "clicky", "linear", "mute"];
    const next = order[(order.indexOf(soundProfile) + 1) % order.length];
    setSoundProfile(next);
    if (next !== "mute") {
      playSwitchSound(next, 3, 0.8);
    }
  };

  const activeSystemInfo = useMemo(
    () => SHIPPED_SYSTEMS.find((s) => s.id === projectFilter) || null,
    [projectFilter]
  );

  const domainTabs: { key: DomainFilterKey; label: string; count: number }[] = [
    { key: "all", label: "All 28 Keys", count: allSkillKeys.length },
    {
      key: "core",
      label: "Core Stack",
      count: allSkillKeys.filter((s) => s.highlight).length,
    },
    {
      key: "frontend",
      label: "Frontend & Mobile",
      count: allSkillKeys.filter((s) => s.category === "frontend").length,
    },
    {
      key: "backend",
      label: "Backend & DB",
      count: allSkillKeys.filter((s) => s.category === "backend").length,
    },
    {
      key: "languages",
      label: "Languages",
      count: allSkillKeys.filter((s) => s.category === "languages").length,
    },
    {
      key: "tools",
      label: "Tools & Cloud",
      count: allSkillKeys.filter((s) => s.category === "tools").length,
    },
  ];

  return (
    <section id="skills-section" className="py-5 sm:py-7">
      {/* On screens < xl where the right sidebar is hidden, render the 3D Keyboard Dock here so keycaps visibly fly out of it */}
      <div className="xl:hidden mb-6">
        <TechKeyboard3D
          onSelectProject={onSelectProject}
          variant="inline"
          isDeployedToStage={true}
        />
      </div>

      {/* Bryl Lim Minimalist Numbered Section Header */}
      <div className="flex items-baseline justify-between border-b border-neutral-200/80 dark:border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-neutral-400 dark:text-zinc-500">
            03 —
          </span>
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-semibold text-neutral-900 dark:text-zinc-100">
            3D Switch Matrix &amp; Hardware Stack
          </h2>
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500">
          28 HARDWARE KEYS
        </span>
      </div>

      {/* Hardware Console & Switch Matrix Header (Apple Minimalist Professional) */}
      <div className="rounded-2xl border border-neutral-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#0d0e13] p-4 sm:p-5 mb-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-100 dark:border-zinc-800/80">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-zinc-100">
                Switch Matrix
              </h2>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-zinc-500">
                {isFlying
                  ? `Deploying (${landedIds.size}/${filteredSkills.length})`
                  : `${landedIds.size}/${filteredSkills.length} Docked`}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5">
              Click any keycap or press A–Z to test switch travel and inspect live source code.
            </p>
          </div>

          {/* Minimalist Apple Text Actions (Zero Symbols) */}
          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={() => setFlightNonce((n) => n + 1)}
              data-note="Replay flight animation for all 3D keycaps."
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isFlying ? "Deploying..." : "Reset"}
            </button>

            <button
              type="button"
              onClick={() => setIsAutoWaving((prev) => !prev)}
              data-note="Run mechanical typing wave across keycaps."
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isAutoWaving
                  ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold"
                  : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:bg-neutral-100 dark:hover:bg-zinc-800"
              }`}
            >
              {isAutoWaving ? "Stop Wave" : "Wave"}
            </button>

            <button
              type="button"
              onClick={cycleSoundProfile}
              data-note="Cycle mechanical switch acoustics."
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-colors capitalize"
              title="Cycle switch acoustics: Thocky, Clicky, Linear, Mute"
            >
              Sound: {soundProfile}
            </button>
          </div>
        </div>

        {/* Apple Segmented Controls & System Filter */}
        <div className="pt-3.5 space-y-2.5">
          {/* Apple Segmented Domain Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500 shrink-0">
              Domain
            </span>
            <div
              className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/70 dark:border-zinc-800 shrink-0"
              role="tablist"
              aria-label="Filter keycaps by architectural domain"
            >
              {domainTabs.map((tab) => {
                const isActive = domainFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setDomainFilter(tab.key)}
                    className={`px-3 py-1 rounded-lg text-xs transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 shadow-xs font-semibold"
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-zinc-200 font-medium"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] font-mono ml-1.5 opacity-60">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Scope: Subtle Text Filter for Systems */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar pt-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500 shrink-0">
              Project
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setProjectFilter(null)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  projectFilter === null
                    ? "text-neutral-900 dark:text-zinc-100 font-bold underline underline-offset-4"
                    : "text-neutral-400 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"
                }`}
              >
                All
              </button>
              {SHIPPED_SYSTEMS.map((sys) => {
                const isSelected = projectFilter === sys.id;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() =>
                      setProjectFilter((prev) => (prev === sys.id ? null : sys.id))
                    }
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      isSelected
                        ? "text-neutral-900 dark:text-zinc-100 font-bold underline underline-offset-4"
                        : "text-neutral-400 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    {sys.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Shipped System Pipeline Banner (When a project X-Ray is selected) */}
        {activeSystemInfo && (
          <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-fade-in">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                  {activeSystemInfo.label} Pipeline
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-zinc-400">
                  · {activeSystemInfo.summary}
                </span>
              </div>
              <p className="text-[11px] font-mono text-ig-pink mt-0.5 truncate">
                {activeSystemInfo.architecture}
              </p>
            </div>

            {onSelectProject && (
              <button
                type="button"
                onClick={() => onSelectProject(activeSystemInfo.id)}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 transition-opacity self-start sm:self-auto shrink-0"
              >
                <span>Open {activeSystemInfo.label} Demo</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Docked Mechanical Switch Socket Matrix (Apple Minimalist Hardware Ledger) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {filteredSkills.map((skill, idx) => {
          const isLanded = landedIds.has(skill.id);
          const isJustLanded = Boolean(justLandedIds[skill.id]);
          const isPressed = Boolean(pressedIds[skill.id]) || isJustLanded;

          return (
            <div
              key={skill.id}
              className="group/module rounded-xl border transition-all duration-200 bg-white dark:bg-[#0e0f15] border-neutral-200/80 dark:border-zinc-800/80 hover:border-neutral-300 dark:hover:border-zinc-700"
            >
              <div className="p-3.5 sm:px-4 sm:py-3.5 flex items-center justify-between gap-4">
                {/* LEFT: Recessed Mechanical Switch Socket + Docked 3D Keycap */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-11 shrink-0 flex flex-col items-center gap-1">
                    <button
                      type="button"
                      data-skill-socket={skill.id}
                      onClick={() => triggerDockedSkill(skill, idx, true)}
                      title={`Press ${skill.name} keycap (or [${skill.keyTrigger}] on keyboard) to view applied proof`}
                      aria-label={`${skill.name} mechanical switch keycap`}
                      className="group relative w-[40px] h-[42px] rounded-[9px] focus:outline-none select-none cursor-pointer shrink-0"
                    >
                      {/* Anodized Aluminum Switch Socket Bezel */}
                      <div
                        className={`absolute -inset-[2.5px] rounded-[10px] pointer-events-none transition-all duration-300 ${
                          isDark
                            ? "bg-[#07080c] border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)]"
                            : "bg-[#e2e8f0] border border-neutral-300 shadow-[inset_0_2px_3px_rgba(0,0,0,0.15)]"
                        }`}
                      />

                      {/* Socket Landing Flash Ring */}
                      {isJustLanded && (
                        <span
                          className="pointer-events-none absolute -inset-[3px] rounded-[11px] z-30 animate-ping"
                          style={{
                            border: `2px solid ${skill.color}`,
                            boxShadow: `0 0 14px ${skill.color}`,
                          }}
                        />
                      )}

                      {!isLanded ? (
                        <ExposedSwitchStem
                          skill={skill}
                          isDark={isDark}
                          isIncoming={true}
                        />
                      ) : (
                        <Keycap3DSurface
                          skill={skill}
                          isDark={isDark}
                          isPressed={isPressed}
                        />
                      )}
                    </button>
                    <span className="text-[9px] font-mono font-medium text-neutral-400 dark:text-zinc-500 leading-none">
                      [{skill.keyTrigger}]
                    </span>
                  </div>

                  {/* Identification & Applied Production Systems */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-zinc-100 truncate">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 shrink-0">
                        {skill.categoryLabel}
                      </span>
                    </div>

                    {/* Applied Projects Row */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                      {skill.usedIn.map((item, pIdx) => {
                        const isClickable =
                          Boolean(item.projectId) && Boolean(onSelectProject);

                        return (
                          <span
                            key={item.label}
                            className="inline-flex items-center text-[11px] font-mono text-neutral-400 dark:text-zinc-500"
                          >
                            {isClickable ? (
                              <button
                                type="button"
                                onClick={() =>
                                  item.projectId &&
                                  onSelectProject?.(item.projectId)
                                }
                                className="hover:text-neutral-900 dark:hover:text-zinc-200 hover:underline underline-offset-2 transition-colors"
                                title={`Jump to ${item.label}`}
                              >
                                {item.label}
                              </button>
                            ) : (
                              <span>{item.label}</span>
                            )}
                            {pIdx < skill.usedIn.length - 1 && (
                              <span className="ml-1.5 text-neutral-300 dark:text-zinc-700">·</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Understated Apple Text Action */}
                <button
                  type="button"
                  onClick={() => triggerDockedSkill(skill, idx, true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800/80 transition-colors shrink-0"
                >
                  View Proof
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apple-Style Minimalist Hardware Spotlight Sheet */}
      {spotlightSkill && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${spotlightSkill.name} Technical Details`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSpotlightSkill(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#111218] border border-neutral-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xl relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-11 shrink-0 flex items-center justify-center">
                  <Keycap3DSurface
                    skill={spotlightSkill}
                    isDark={isDark}
                    isPressed={false}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-zinc-100">
                      {spotlightSkill.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400">
                      [{spotlightSkill.keyTrigger}]
                    </span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 dark:text-zinc-400 mt-0.5">
                    {spotlightSkill.categoryLabel}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSpotlightSkill(null)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Close
              </button>
            </div>

            {/* Applied Systems Body */}
            <div className="py-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-400 dark:text-zinc-500 block">
                // APPLIED IN {spotlightSkill.usedIn.length} PRODUCTION APPS
              </span>

              <div className="space-y-2.5">
                {spotlightSkill.usedIn.map((item) => {
                  const matched = item.projectId
                    ? projectsData.find((p) => p.id === item.projectId)
                    : null;

                  return (
                    <div
                      key={item.label}
                      className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-neutral-900 dark:text-zinc-100">
                            {matched ? matched.title : item.label}
                          </span>
                          {matched && (
                            <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500">
                              · {matched.year}
                            </span>
                          )}
                        </div>
                        {matched && (
                          <p className="text-[11px] text-neutral-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                            {matched.subtitle || matched.role}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {matched && onSelectProject && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectProject(matched.id);
                              setSpotlightSkill(null);
                            }}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 transition-opacity"
                          >
                            Live Demo
                          </button>
                        )}
                        {matched?.githubUrl && (
                          <a
                            href={matched.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 border border-neutral-200 dark:border-zinc-800 hover:border-neutral-400 dark:hover:border-zinc-600 transition-colors"
                          >
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-neutral-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-zinc-500">
              <span>PRESS [ESC] TO CLOSE</span>
              <span>VERIFIED PRODUCTION STACK</span>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Full-Viewport 3D Keycap Flight Portal (Renders Flying Keycaps from Sidebar Keyboard -> Skill Sockets) */}
      {mounted &&
        isFlying &&
        createPortal(
          <div
            aria-hidden="true"
            className="fixed inset-0 z-[85] pointer-events-none select-none overflow-hidden"
          >
            {filteredSkills.map((skill) => (
              <div
                key={`flying-${skill.id}`}
                ref={(el) => {
                  flyingNodeRefs.current[skill.id] = el;
                }}
                style={{
                  opacity: 0,
                  left: 0,
                  top: 0,
                  width: "40px",
                  height: "42px",
                  transformOrigin: "center center",
                  willChange: "transform, width, height, opacity",
                  filter: `drop-shadow(0 14px 20px ${skill.color}66)`,
                }}
                className="fixed pointer-events-none"
              >
                <Keycap3DSurface
                  skill={skill}
                  isDark={isDark}
                  isPressed={false}
                />
              </div>
            ))}
          </div>,
          document.body
        )}
    </section>
  );
};
