"use client";

import React, { useState, useEffect } from "react";

/**
 * Minimalist Instagram + 8-Bit Stickman Loading Screen
 * - Glowing Instagram Story gradient ring
 * - 8-Bit walking stickman on infinite pixel horizon
 * - Monospaced 'shin.dev_' signature below
 * - Auto-fades out after ~1.3s with smooth spring-scale exit
 */
export const LoadingScreen: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [frame, setFrame] = useState(0);

  // 4-frame retro 8-bit walk cycle (130ms interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 130);
    return () => clearInterval(interval);
  }, []);

  // Control loading sequence and exit transition
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock page scroll while loader is visible
    document.body.style.overflow = "hidden";

    const holdDuration = prefersReducedMotion ? 100 : 1300;
    const fadeDuration = prefersReducedMotion ? 50 : 500;

    const timer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = "";

      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
      }, fadeDuration);

      return () => clearTimeout(unmountTimer);
    }, holdDuration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      aria-label="Loading shin.dev portfolio"
      role="status"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0B0B0F] select-none transition-all duration-500 ease-out ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background soft glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-orange-500/10 via-pink-500/10 to-purple-600/10 blur-3xl pointer-events-none" />

      {/* Instagram Story Gradient Ring */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] animated-ig-ring shadow-xl shadow-pink-500/20 transition-transform duration-300">
        {/* Inner Circle Well (Matches theme background) */}
        <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0B0F] flex items-center justify-center p-2 relative overflow-hidden transition-colors duration-200">
          {/* Stickman Canvas Box */}
          <div className="relative w-16 h-10 flex items-center justify-center overflow-hidden">
            {/* Infinite scrolling pixel horizon track */}
            <div
              className="absolute bottom-1 left-0 w-32 h-[2px] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, currentColor 0px, currentColor 3px, transparent 3px, transparent 6px)",
                color: "currentColor",
                animation: "stickman-ground-scroll 0.52s linear infinite",
              }}
            />

            {/* 8-Bit Pixel Figure (Black in light mode, White in dark mode) */}
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 text-neutral-950 dark:text-white fill-current transition-transform duration-75 mb-0.5"
              style={{ imageRendering: "pixelated" }}
            >
              {frame === 0 ? (
                /* FRAME 0: Contact Stride 1 */
                <g>
                  <rect x="10" y="2" width="4" height="4" />
                  <rect x="11" y="6" width="2" height="6" />
                  <rect x="8" y="7" width="2" height="2" />
                  <rect x="7" y="9" width="2" height="3" />
                  <rect x="14" y="7" width="2" height="2" />
                  <rect x="15" y="9" width="2" height="3" />
                  <rect x="9" y="12" width="2" height="4" />
                  <rect x="7" y="16" width="2" height="3" />
                  <rect x="6" y="19" width="3" height="1" />
                  <rect x="13" y="12" width="2" height="4" />
                  <rect x="15" y="16" width="2" height="3" />
                  <rect x="16" y="18" width="2" height="1" />
                </g>
              ) : frame === 1 ? (
                /* FRAME 1: Passing Position 1 */
                <g>
                  <rect x="10" y="1" width="4" height="4" />
                  <rect x="11" y="5" width="2" height="6" />
                  <rect x="10" y="7" width="1" height="5" />
                  <rect x="13" y="7" width="1" height="5" />
                  <rect x="11" y="11" width="2" height="8" />
                  <rect x="11" y="19" width="3" height="1" />
                  <rect x="14" y="12" width="2" height="3" />
                  <rect x="15" y="15" width="2" height="2" />
                </g>
              ) : frame === 2 ? (
                /* FRAME 2: Contact Stride 2 */
                <g>
                  <rect x="10" y="2" width="4" height="4" />
                  <rect x="11" y="6" width="2" height="6" />
                  <rect x="14" y="7" width="2" height="2" />
                  <rect x="15" y="9" width="2" height="3" />
                  <rect x="8" y="7" width="2" height="2" />
                  <rect x="7" y="9" width="2" height="3" />
                  <rect x="13" y="12" width="2" height="4" />
                  <rect x="15" y="16" width="2" height="3" />
                  <rect x="15" y="19" width="3" height="1" />
                  <rect x="9" y="12" width="2" height="4" />
                  <rect x="7" y="16" width="2" height="3" />
                  <rect x="6" y="18" width="2" height="1" />
                </g>
              ) : (
                /* FRAME 3: Passing Position 2 */
                <g>
                  <rect x="10" y="1" width="4" height="4" />
                  <rect x="11" y="5" width="2" height="6" />
                  <rect x="10" y="7" width="1" height="5" />
                  <rect x="13" y="7" width="1" height="5" />
                  <rect x="11" y="11" width="2" height="8" />
                  <rect x="11" y="19" width="3" height="1" />
                  <rect x="8" y="12" width="2" height="3" />
                  <rect x="7" y="15" width="2" height="2" />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Minimalist Wordmark: shin.dev_ */}
      <div className="mt-5 flex items-baseline font-mono text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-200">
        <span>shin</span>
        <span className="text-neutral-400 dark:text-zinc-500">.dev</span>
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-[7px] h-[2px] bg-current self-end mb-[3px] animate-pulse"
        />
      </div>
    </div>
  );
};

