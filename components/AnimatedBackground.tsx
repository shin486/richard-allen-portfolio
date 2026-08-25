"use client";

import React, { useEffect, useState } from "react";

/** Deterministic LCG so the slash layout is identical on server & client (avoids hydration mismatch). */
function lcg(seed: number) {
  let state = seed % 2147483647;
  return () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
}

interface SlashParticle {
  left: number; // %
  top: number; // %
  width: number; // px stroke length
  height: number; // px stroke thickness
  angle: number; // deg
  sway: number; // px horizontal drift
  duration: number; // s
  delay: number; // s (negative pre-phase)
  peak: number; // opacity
  accent: string | undefined;
}

const ANGLES = [30, 35, 45, 50];
const SIZES = [
  { width: 16, height: 1 },
  { width: 26, height: 1.2 },
  { width: 38, height: 1.4 },
];

function buildParticles(): SlashParticle[] {
  const rand = lcg(20260810);
  const out: SlashParticle[] = [];
  const COUNT = 34;
  for (let i = 0; i < COUNT; i++) {
    const size = SIZES[i % SIZES.length];
    out.push({
      left: Math.floor(rand() * 100),
      top: Math.floor(rand() * 88),
      width: size.width,
      height: size.height,
      angle: ANGLES[i % ANGLES.length],
      delay: Math.floor(rand() * 500) / 10,
      duration: 14 + Math.floor(rand() * 120) / 10,
      sway: Math.floor(rand() * 80) - 40,
      peak: 0.35 + Math.round(rand() * 35) / 100,
      accent: i % 7 === 0 ? "rgba(221, 42, 123, 0.32)" : undefined,
    });
  }
  return out;
}

const SLASHES = buildParticles();

export const AnimatedBackground: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Layer 2: Subtle Ambient Radial Glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-transparent blur-3xl dark:from-pink-500/10 dark:via-purple-500/10" />
      <div className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-bl from-orange-500/5 via-pink-500/5 to-transparent blur-3xl dark:from-orange-500/10 dark:via-pink-500/10" />
      <div className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-purple-500/5 via-blue-500/5 to-transparent blur-3xl dark:from-purple-500/10 dark:via-blue-500/10" />

      {/* Layer 3: Floating Diagonal Slash Particles */}
      {SLASHES.map((s, i) => (
        <span
          key={i}
          className={prefersReducedMotion ? "slash-static" : "slash-particle"}
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.width}px`,
              height: `${s.height}px`,
              ...(s.accent ? { "--slash-ink": s.accent } : null),
              "--angle": `${s.angle}deg`,
              "--dur": `${s.duration}s`,
              "--delay": prefersReducedMotion ? "0s" : `-${s.delay}s`,
              "--sway": `${s.sway}px`,
              "--peak": `${s.peak}`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};