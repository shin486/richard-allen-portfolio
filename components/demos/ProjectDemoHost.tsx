"use client";

import React, { useState, useRef } from "react";
import PalengkeHubDemo from "./PalengkeHubDemo";
import ShinPayDemo from "./ShinPayDemo";
import ItElectDemo from "./ItElectDemo";
import AutoAvenueDemo from "./AutoAvenueDemo";
import { AvmsDemo } from "./AvmsDemo";
import CraveCartDemo from "./CraveCartDemo";
import { Lock, Smartphone, Laptop } from "lucide-react";

interface ProjectDemoHostProps {
  projectId: string;
  className?: string;
}

const PROJECT_GLOWS: Record<string, string> = {
  palengkehub: "rgba(232, 131, 58, 0.28)",
  "shinpay-plus": "rgba(83, 108, 81, 0.32)",
  "itelect4-project": "rgba(37, 99, 235, 0.28)",
  "auto-avenue-ims": "rgba(66, 169, 111, 0.28)",
  avms: "rgba(168, 85, 247, 0.28)",
  "crave-cart": "rgba(255, 107, 107, 0.30)",
};

const PROJECT_URLS: Record<string, string> = {
  palengkehub: "palengkehub.ph/market/lipa",
  "shinpay-plus": "shinpay.ph/app/dashboard",
  "itelect4-project": "itelect4-project-nine.vercel.app",
  "auto-avenue-ims": "autoavenue.ph/ims/dashboard.php",
  "crave-cart": "cravecart.local/menu",
  avms: "avms.dlsl.edu.ph/portal",
};

export const ProjectDemoHost: React.FC<ProjectDemoHostProps> = ({
  projectId,
  className = "",
}) => {
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(projectId === "palengkehub");

  // Stationary outer measurement ref + 3D tilting inner chassis ref
  // Measuring on the stationary wrapper guarantees 1:1 cursor accuracy even while tilting in 3D
  const measureRef = useRef<HTMLDivElement>(null);
  const chassisRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const measureEl = measureRef.current;
    const chassisEl = chassisRef.current;
    if (!measureEl || !chassisEl) return;

    const rect = measureEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    // 1:1 pixel-locked cursor light (never inverted)
    chassisEl.style.setProperty("--spot-x", `${x}px`);
    chassisEl.style.setProperty("--spot-y", `${y}px`);
    chassisEl.style.setProperty("--spot-opacity", "1");

    // Smooth 3D magnetic micro-tilt (direct DOM update for zero React state lag)
    const rotateY = (px - 0.5) * 5.2;
    const rotateX = (0.5 - py) * 4.2;
    chassisEl.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    chassisEl.style.transition = "transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)";
  };

  const handleMouseLeave = () => {
    const chassisEl = chassisRef.current;
    if (!chassisEl) return;
    chassisEl.style.setProperty("--spot-opacity", "0");
    chassisEl.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    chassisEl.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
  };

  const renderDemo = () => {
    switch (projectId) {
      case "palengkehub":
        return <PalengkeHubDemo />;
      case "shinpay-plus":
        return <ShinPayDemo />;
      case "itelect4-project":
        return <ItElectDemo />;
      case "auto-avenue-ims":
        return <AutoAvenueDemo />;
      case "avms":
        return <AvmsDemo />;
      case "crave-cart":
        return <CraveCartDemo />;
      default:
        return (
          <div className="p-8 text-center text-neutral-500">
            Interactive demo is being prepared for this project.
          </div>
        );
    }
  };

  const activeGlow = PROJECT_GLOWS[projectId] || "rgba(236,72,153,0.22)";
  const activeUrl = PROJECT_URLS[projectId] || "app.local";

  return (
    <div className={`w-full flex flex-col items-center relative ${className}`}>
      {/* Dynamic Project-Themed Ambient Glow behind chassis */}
      <div
        className="absolute -top-10 -right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ease-out opacity-60 dark:opacity-40 -z-10"
        style={{
          background: `radial-gradient(circle, ${activeGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Stationary Measurement Wrapper -> 3D Tilting Chassis + 1:1 Pixel-Locked Cursor Spotlight */}
      <div
        ref={measureRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative flex items-center justify-center"
      >
        <div ref={chassisRef} className="w-full relative will-change-transform">
          {/* Subtle Cursor Spotlight Overlay (100% locked to exact mouse coordinates, pointer-events-none) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-200"
            style={{
              opacity: "var(--spot-opacity, 0)",
              background:
                "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 255, 255, 0.08), rgba(221, 42, 123, 0.04) 45%, transparent 75%)",
            }}
          />

          {/* Render Authentic Hardware Device Viewport */}
          {projectId === "palengkehub" && isPhoneMode ? (
            /* Authentic Mobile Phone Frame Chassis for PalengkeHub */
            <div className="w-full h-[510px] sm:h-[530px] rounded-2xl border border-neutral-200 dark:border-zinc-800 milled-card shadow-xl overflow-hidden bg-neutral-100/70 dark:bg-[#0c0c10] p-2 sm:p-3 flex items-center justify-center relative">
              {/* Chassis Top Controls */}
              <div className="absolute top-2.5 right-3.5 z-30 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsPhoneMode(false)}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-zinc-850/90 border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-1 shadow-2xs transition-transform active:scale-95"
                  title="Expand to Full Width"
                >
                  <Laptop className="w-3 h-3" />
                  <span>Full View</span>
                </button>
              </div>

              {/* Curved Phone Chassis */}
              <div className="w-full max-w-[340px] sm:max-w-[350px] h-full rounded-[38px] border-[4px] border-zinc-800 dark:border-zinc-700 bg-[#F7F5F0] shadow-2xl relative flex flex-col overflow-hidden">
                {/* Dynamic Island Pill */}
                <div className="absolute top-1.5 inset-x-0 mx-auto w-24 h-3.5 bg-black rounded-full flex items-center justify-end pr-2 z-30 shadow-xs pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
                </div>

                {/* Inner Mobile Screen */}
                <div className="flex-1 w-full overflow-hidden pt-1.5">
                  <PalengkeHubDemo />
                </div>

                {/* Home Indicator Bar */}
                <div className="w-24 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full mx-auto my-1 shrink-0 pointer-events-none" />
              </div>
            </div>
          ) : (
            /* Authentic macOS / Desktop Browser Chrome Window */
            <div className="w-full h-[490px] sm:h-[520px] rounded-2xl border border-neutral-200 dark:border-zinc-800 milled-card shadow-xl overflow-hidden bg-white dark:bg-zinc-950 flex flex-col">
              {/* macOS Window Header */}
              <div className="px-3 py-2 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between gap-2 shrink-0">
                {/* Traffic Lights */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                </div>

                {/* Center SSL Address Bar */}
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-[10.5px] font-mono text-neutral-600 dark:text-zinc-300 max-w-xs truncate shadow-2xs">
                  <Lock className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{activeUrl}</span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {projectId === "palengkehub" && (
                    <button
                      type="button"
                      onClick={() => setIsPhoneMode(true)}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-1 transition-transform active:scale-95"
                      title="Switch to Mobile Chassis"
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Phone Frame</span>
                    </button>
                  )}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live System Online" />
                </div>
              </div>

              {/* Main Demo Content */}
              <div className="flex-1 w-full overflow-hidden">
                {renderDemo()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
