"use client";

import React from "react";

/**
 * Ambient Layered Background
 * Provides subtle radial color glows (Instagram-tinted ambient warmth)
 * without distracting drifting particles or CPU-heavy animation loops.
 */
export const AnimatedBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-br from-pink-500/[0.04] via-purple-500/[0.04] to-transparent blur-3xl dark:from-pink-500/[0.07] dark:via-purple-500/[0.07]" />
      <div className="absolute top-[35%] -right-[12%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-bl from-amber-500/[0.04] via-rose-500/[0.04] to-transparent blur-3xl dark:from-amber-500/[0.06] dark:via-rose-500/[0.06]" />
      <div className="absolute -bottom-[10%] left-[15%] w-[45vw] h-[45vw] max-w-[480px] max-h-[480px] rounded-full bg-gradient-to-tr from-purple-500/[0.04] via-blue-500/[0.04] to-transparent blur-3xl dark:from-purple-500/[0.06] dark:via-blue-500/[0.06]" />
    </div>
  );
};
