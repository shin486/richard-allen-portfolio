"use client";

import React, { useState, useEffect } from "react";

interface PixelStickmanJourneyProps {
  onClick?: () => void;
  className?: string;
}

/**
 * 8-Bit Pixel Walking Stickman Journey
 * Abstract black in light mode, pure white in dark mode.
 * Walks along an infinite scrolling pixel journey track.
 * Pauses walking when hovered.
 */
export const PixelStickmanJourney: React.FC<PixelStickmanJourneyProps> = ({
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [frame, setFrame] = useState(0);

  // 4-frame retro 8-bit walk cycle at 130ms cadence
  useEffect(() => {
    if (isHovered) {
      // Idle frame when hovered
      return;
    }

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 130);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="The Journey (Click to scroll to top)"
      aria-label="Interactive 8-bit walking stickman journey"
      className={`group relative flex items-center gap-2 py-1 px-2 -ml-2 rounded-xl focus:outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-zinc-900/90 ${className}`}
    >
      {/* 8-Bit Canvas/SVG Stage */}
      <div className="relative w-16 h-8 flex items-center justify-center overflow-hidden select-none">
        {/* Pixel Horizon Ground Line (Scrolls when walking, pauses on hover) */}
        <div
          className="absolute bottom-1 left-0 w-32 h-[2px] pointer-events-none transition-all"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, currentColor 0px, currentColor 3px, transparent 3px, transparent 6px)",
            color: "currentColor",
            animation: isHovered
              ? "none"
              : "stickman-ground-scroll 0.52s linear infinite",
          }}
        />

        {/* 8-Bit Stickman Pixel Figure (Abstract Black in Light Mode / White in Dark Mode) */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-black dark:text-white fill-current transition-transform duration-75"
          style={{ imageRendering: "pixelated" }}
        >
          {isHovered ? (
            /* IDLE FRAME (Hovered: Stops walking, stands still at rest) */
            <g>
              {/* Head: 4x4 pixel square */}
              <rect x="10" y="2" width="4" height="4" />
              {/* Eye pixel */}
              <rect
                x="12"
                y="3"
                width="1"
                height="1"
                className="text-white dark:text-black fill-current"
              />
              {/* Torso: 2x6 pixels */}
              <rect x="11" y="6" width="2" height="6" />
              {/* Arms: Standing relaxed at sides */}
              <rect x="9" y="8" width="1" height="4" />
              <rect x="14" y="8" width="1" height="4" />
              {/* Left & Right Legs: Standing together on ground */}
              <rect x="10" y="12" width="2" height="7" />
              <rect x="12" y="12" width="2" height="7" />
              <rect x="10" y="19" width="4" height="1" />
            </g>
          ) : frame === 0 ? (
            /* FRAME 0: Contact Stride 1 (Left forward, Right back) */
            <g>
              <rect x="10" y="2" width="4" height="4" />
              <rect x="11" y="6" width="2" height="6" />
              {/* Arms in opposition */}
              <rect x="8" y="7" width="2" height="2" />
              <rect x="7" y="9" width="2" height="3" />
              <rect x="14" y="7" width="2" height="2" />
              <rect x="15" y="9" width="2" height="3" />
              {/* Left leg forward */}
              <rect x="9" y="12" width="2" height="4" />
              <rect x="7" y="16" width="2" height="3" />
              <rect x="6" y="19" width="3" height="1" />
              {/* Right leg back */}
              <rect x="13" y="12" width="2" height="4" />
              <rect x="15" y="16" width="2" height="3" />
              <rect x="16" y="18" width="2" height="1" />
            </g>
          ) : frame === 1 ? (
            /* FRAME 1: Passing Position 1 (Left passing under, body rises) */
            <g>
              <rect x="10" y="1" width="4" height="4" />
              <rect x="11" y="5" width="2" height="6" />
              {/* Arms passing */}
              <rect x="10" y="7" width="1" height="5" />
              <rect x="13" y="7" width="1" height="5" />
              {/* Left leg straight passing under */}
              <rect x="11" y="11" width="2" height="8" />
              <rect x="11" y="19" width="3" height="1" />
              {/* Right leg bent lifting off ground */}
              <rect x="14" y="12" width="2" height="3" />
              <rect x="15" y="15" width="2" height="2" />
            </g>
          ) : frame === 2 ? (
            /* FRAME 2: Contact Stride 2 (Right forward, Left back) */
            <g>
              <rect x="10" y="2" width="4" height="4" />
              <rect x="11" y="6" width="2" height="6" />
              {/* Arms inverted */}
              <rect x="14" y="7" width="2" height="2" />
              <rect x="15" y="9" width="2" height="3" />
              <rect x="8" y="7" width="2" height="2" />
              <rect x="7" y="9" width="2" height="3" />
              {/* Right leg forward */}
              <rect x="13" y="12" width="2" height="4" />
              <rect x="15" y="16" width="2" height="3" />
              <rect x="15" y="19" width="3" height="1" />
              {/* Left leg back */}
              <rect x="9" y="12" width="2" height="4" />
              <rect x="7" y="16" width="2" height="3" />
              <rect x="6" y="18" width="2" height="1" />
            </g>
          ) : (
            /* FRAME 3: Passing Position 2 (Right passing under, body rises) */
            <g>
              <rect x="10" y="1" width="4" height="4" />
              <rect x="11" y="5" width="2" height="6" />
              {/* Arms passing */}
              <rect x="10" y="7" width="1" height="5" />
              <rect x="13" y="7" width="1" height="5" />
              {/* Right leg straight passing under */}
              <rect x="11" y="11" width="2" height="8" />
              <rect x="11" y="19" width="3" height="1" />
              {/* Left leg bent lifting off ground */}
              <rect x="8" y="12" width="2" height="3" />
              <rect x="7" y="15" width="2" height="2" />
            </g>
          )}
        </svg>

        {/* Ambient floating pixel trail / dust behind feet */}
        {!isHovered && (
          <span
            className="absolute bottom-1.5 left-2 w-1 h-1 bg-black/60 dark:bg-white/60 animate-ping pointer-events-none"
            style={{ animationDuration: "0.8s" }}
          />
        )}
      </div>

      {/* Mini "Journey" Status Label */}
      <span className="hidden xs:inline text-[11px] font-mono font-medium tracking-tight text-neutral-800 dark:text-zinc-200 transition-colors">
        {isHovered ? "rest stop." : "the journey."}
      </span>
    </button>
  );
};

