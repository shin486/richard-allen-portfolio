"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  KEYCAP_SKILLS,
  KeycapSkill,
  SoundProfile,
} from "./TechKeyboard3D";

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

interface TechTier {
  id: string;
  number: string;
  title: string;
  description: string;
  filter: (skill: KeycapSkill) => boolean;
}

const TECH_TIERS: TechTier[] = [
  {
    id: "languages",
    number: "01",
    title: "Languages & Runtimes",
    description: "Typed contracts, algorithms, scripting & query engines",
    filter: (s) => s.category === "languages",
  },
  {
    id: "frontend",
    number: "02",
    title: "Client & Mobile",
    description: "Cross-platform mobile apps, SSR architectures & design tokens",
    filter: (s) => s.category === "frontend",
  },
  {
    id: "backend",
    number: "03",
    title: "Backend & Persistence",
    description: "Cloud BaaS, relational PostgreSQL, RLS policies & REST APIs",
    filter: (s) => s.category === "backend",
  },
  {
    id: "tools",
    number: "04",
    title: "Tooling & Infrastructure",
    description: "Version control, cloud deployment, UI prototyping & dev tooling",
    filter: (s) => s.category === "tools",
  },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onSelectProject,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<KeycapSkill | null>(null);
  const [soundProfile, setSoundProfile] = useState<SoundProfile>("thocky");
  const [activeKeyTrigger, setActiveKeyTrigger] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundProfileRef = useRef<SoundProfile>(soundProfile);

  useEffect(() => {
    soundProfileRef.current = soundProfile;
  }, [soundProfile]);

  // All 28 real technology keycaps (excluding the 2U macro wave key)
  const allSkillKeys = useMemo(
    () => KEYCAP_SKILLS.filter((k) => k.category !== "macro"),
    []
  );

  // Synthesize realistic mechanical switch audio via Web Audio API
  const playSwitchSound = useCallback(
    (profile: SoundProfile, pitchIndex = 0) => {
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

        // Switch leaf click
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
          profile === "clicky" ? 0.28 : profile === "thocky" ? 0.18 : 0.1;
        clickGain.gain.setValueAtTime(Math.max(0.002, rawClickPeak), now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        clickOsc.connect(filter);
        filter.connect(clickGain);
        clickGain.connect(ctx.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.026);

        // Keycap bottom-out thock
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
          profile === "thocky" ? 0.38 : profile === "linear" ? 0.28 : 0.18;
        bodyGain.gain.setValueAtTime(Math.max(0.002, rawBodyPeak), now);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);

        bodyOsc.start(now);
        bodyOsc.stop(now + 0.065);
      } catch {
        // AudioContext may be blocked before first user interaction
      }
    },
    []
  );

  // Dispatch interactive hover to 3D mechanical keyboard in right sidebar
  const handleHoverSkill = useCallback(
    (skill: KeycapSkill) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("shin-tech-hover", {
            detail: { tech: skill.id },
          })
        );
      }
    },
    []
  );

  // Select skill and trigger sound & highlight
  const handleSelectSkill = useCallback(
    (skill: KeycapSkill, index = 0) => {
      playSwitchSound(soundProfileRef.current, index);
      handleHoverSkill(skill);
      setSelectedSkill((prev) => (prev?.id === skill.id ? null : skill));
      setActiveKeyTrigger(skill.keyTrigger);
      setTimeout(() => setActiveKeyTrigger(null), 300);
    },
    [playSwitchSound, handleHoverSkill]
  );

  // Global physical keyboard listener (press A-Z to trigger tech pill)
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

      if (e.key === "Escape") {
        setSelectedSkill(null);
        return;
      }

      const keyUpper = e.key.toUpperCase();
      const matchedIdx = allSkillKeys.findIndex(
        (s) => s.keyTrigger === keyUpper
      );
      if (matchedIdx !== -1) {
        const matched = allSkillKeys[matchedIdx];
        handleSelectSkill(matched, matchedIdx);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allSkillKeys, handleSelectSkill]);

  return (
    <section id="skills-section" className="py-6 sm:py-8 space-y-4">
      {/* Bryl Lim Minimalist Numbered Section Header */}
      <div className="flex items-baseline justify-between border-b border-neutral-200/80 dark:border-zinc-800/80 pb-3 mb-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-neutral-400 dark:text-zinc-500">
            03 —
          </span>
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-semibold text-neutral-900 dark:text-zinc-100">
            Technical Stack &amp; Specifications
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setSoundProfile((prev) =>
                prev === "thocky"
                  ? "clicky"
                  : prev === "clicky"
                  ? "mute"
                  : "thocky"
              )
            }
            className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Toggle switch audio profile"
          >
            Sound: {soundProfile === "mute" ? "Off" : soundProfile}
          </button>
          <span className="text-neutral-300 dark:text-zinc-700">·</span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500">
            {allSkillKeys.length} TECHNOLOGIES
          </span>
        </div>
      </div>

      {/* Apple Minimalist Hardware Tech Specifications Ledger */}
      <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0c0d12] divide-y divide-neutral-100 dark:divide-zinc-800/70 overflow-hidden shadow-xs transition-colors duration-200">
        {TECH_TIERS.map((tier) => {
          const tierSkills = allSkillKeys.filter(tier.filter);

          return (
            <div
              key={tier.id}
              className="p-4 sm:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6 hover:bg-neutral-50/40 dark:hover:bg-zinc-900/20 transition-colors"
            >
              {/* Left Column: Category Spec Descriptor */}
              <div className="md:w-56 shrink-0 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-neutral-400 dark:text-zinc-500">
                    {tier.number} //
                  </span>
                  <h3 className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                    {tier.title}
                  </h3>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed font-mono">
                  {tier.description}
                </p>
              </div>

              {/* Right Column: High-Density Interactive Tech Pills (Zero Symbols) */}
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {tierSkills.map((skill, idx) => {
                  const isSelected = selectedSkill?.id === skill.id;
                  const isKeyboardActive = activeKeyTrigger === skill.keyTrigger;

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => handleSelectSkill(skill, idx)}
                      onMouseEnter={() => handleHoverSkill(skill)}
                      className={`group relative px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-2 border select-none cursor-pointer ${
                        isSelected
                          ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold border-neutral-900 dark:border-zinc-100 shadow-xs scale-[1.02]"
                          : isKeyboardActive
                          ? "bg-neutral-800 text-white dark:bg-zinc-200 dark:text-zinc-900 scale-95 border-neutral-800"
                          : "bg-neutral-50/70 dark:bg-zinc-900/50 text-neutral-700 dark:text-zinc-300 border-neutral-200/80 dark:border-zinc-800/80 hover:border-neutral-400 dark:hover:border-zinc-600 hover:bg-neutral-100/90 dark:hover:bg-zinc-800/60"
                      }`}
                      title={`Press [${skill.keyTrigger}] on keyboard or click to inspect applied proof`}
                      aria-label={`${skill.name} (${skill.keyTrigger} key)`}
                    >
                      <span className="leading-none">{skill.name}</span>
                      <span
                        className={`text-[10px] font-mono transition-opacity ${
                          isSelected
                            ? "text-neutral-400 dark:text-zinc-500"
                            : "text-neutral-400 dark:text-zinc-500 opacity-60 group-hover:opacity-100"
                        }`}
                      >
                        [{skill.keyTrigger}]
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apple-Style Inline Proof & Verification Bar (No Modal Popups) */}
      {selectedSkill && (
        <div className="p-4 rounded-xl border border-neutral-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#0c0d12] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-neutral-900 dark:text-zinc-100 font-mono">
                  {selectedSkill.name}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500">
                  [{selectedSkill.keyTrigger} KEY]
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-zinc-400 font-mono mt-0.5 truncate">
                {selectedSkill.usedIn && selectedSkill.usedIn.length > 0
                  ? `Applied in ${selectedSkill.usedIn.map((u) => u.label).join(", ")}`
                  : "Core Academic & Systems Curriculum"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {selectedSkill.usedIn?.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.projectId && onSelectProject) {
                    onSelectProject(item.projectId);
                  }
                }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-neutral-300 dark:border-zinc-700 bg-neutral-100 dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 hover:bg-neutral-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 hover:border-neutral-900 dark:hover:border-zinc-100 transition-all cursor-pointer"
              >
                View {item.label} →
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="px-2 py-1 rounded-md text-[10px] font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
