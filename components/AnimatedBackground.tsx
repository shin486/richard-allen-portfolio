"use client";

import React, { useEffect, useState } from "react";

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

      {/* Layer 3: Floating Technical Lines & Abstract Network Paths */}
      <svg
        className={`absolute inset-0 w-full h-full opacity-60 dark:opacity-40 transition-opacity duration-1000 ${
          prefersReducedMotion ? "" : "animate-drift-slow"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          {/* Light Mode Gradient Strokes */}
          <linearGradient id="techLineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e5e5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4d4d8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="techLineGradDark1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3f3f46" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#27272a" stopOpacity="0.1" />
          </linearGradient>

          {/* Accent Color Hint */}
          <linearGradient id="accentLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F58529" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#DD2A7B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8134AF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Technical Path Group 1 - Top Left Flow */}
        <g className="text-neutral-300 dark:text-zinc-800">
          <path
            d="M -100 120 L 220 120 L 340 240 L 680 240 L 740 300 L 980 300"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="opacity-70 dark:opacity-60"
          />
          <circle cx="220" cy="120" r="3" fill="currentColor" className="opacity-80" />
          <circle cx="340" cy="240" r="2.5" fill="currentColor" className="opacity-80" />
          <circle cx="680" cy="240" r="3" fill="currentColor" className="opacity-80" />
          <circle cx="740" cy="300" r="2.5" fill="currentColor" className="opacity-80" />
        </g>

        {/* Technical Path Group 2 - Diagonal Accent Connector */}
        <g>
          <path
            d="M 120 -50 L 120 180 L 280 340 L 280 580 L 420 720 L 800 720"
            stroke="url(#accentLineGrad)"
            strokeWidth="1.2"
          />
          <circle cx="120" cy="180" r="3" fill="#DD2A7B" fillOpacity="0.5" />
          <circle cx="280" cy="340" r="3.5" fill="#8134AF" fillOpacity="0.5" />
          <circle cx="280" cy="580" r="3" fill="#F58529" fillOpacity="0.5" />
          <circle cx="420" cy="720" r="3" fill="#DD2A7B" fillOpacity="0.5" />
        </g>

        {/* Technical Path Group 3 - Right Side Geometric Grid Flow */}
        <g className="text-neutral-300 dark:text-zinc-800">
          <path
            d="M 1100 80 L 880 80 L 800 160 L 620 160 L 520 260 L 520 540 L 640 660 L 960 660"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-60 dark:opacity-50"
          />
          <circle cx="880" cy="80" r="2.5" fill="currentColor" />
          <circle cx="800" cy="160" r="3" fill="currentColor" />
          <circle cx="620" cy="160" r="2.5" fill="currentColor" />
          <circle cx="520" cy="260" r="3" fill="currentColor" />
          <circle cx="520" cy="540" r="2.5" fill="currentColor" />
          <circle cx="640" cy="660" r="3" fill="currentColor" />
        </g>

        {/* Technical Path Group 4 - Bottom Cross Grid */}
        <g className="text-neutral-300 dark:text-zinc-800">
          <path
            d="M -50 640 L 260 640 L 380 760 L 600 760 L 720 880 L 1200 880"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 6"
            className="opacity-50 dark:opacity-40"
          />
          <circle cx="260" cy="640" r="2.5" fill="currentColor" />
          <circle cx="380" cy="760" r="3" fill="currentColor" />
          <circle cx="600" cy="760" r="2.5" fill="currentColor" />
          <circle cx="720" cy="880" r="3" fill="currentColor" />
        </g>

        {/* Geometric Technical Cross Marks */}
        <g className="text-neutral-400 dark:text-zinc-700 opacity-60">
          {/* Cross 1 */}
          <path d="M 450 140 L 460 140 M 455 135 L 455 145" stroke="currentColor" strokeWidth="1" />
          {/* Cross 2 */}
          <path d="M 780 420 L 790 420 M 785 415 L 785 425" stroke="currentColor" strokeWidth="1" />
          {/* Cross 3 */}
          <path d="M 180 480 L 190 480 M 185 475 L 185 485" stroke="currentColor" strokeWidth="1" />
          {/* Cross 4 */}
          <path d="M 940 220 L 950 220 M 945 215 L 945 225" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
