"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

const IDLE_NOTES: string[] = [
  "Looking for a full-stack developer? I am right here.",
  "Take your time browsing. Everything here is responsive.",
  "Grab some coffee first, then check out my projects.",
  "Feel free to click around. No broken links on my watch.",
  "Senior developer mindset, junior developer enthusiasm.",
];

interface ProfileNoteProps {
  className?: string;
  tailAlign?: "center" | "left";
}

/**
 * Interactive Cursor-Aware Instagram Thought Bubble Note
 * - Floats above Richard's avatar in ProfileHeader
 * - Responds in real-time with sharp, witty English developer lines
 *   whenever the visitor's cursor hovers over key interactive elements
 * - Responsive layout: never clips on mobile, tablet, or desktop
 * - Strictly zero emojis (clean typography only)
 * - Tapping the note immediately cycles to the next witty thought
 */
export const ProfileNote: React.FC<ProfileNoteProps> = ({
  className = "",
  tailAlign = "left",
}) => {
  const [currentNote, setCurrentNote] = useState<string>(IDLE_NOTES[0]);
  const [isPopping, setIsPopping] = useState<boolean>(false);
  const idleIndexRef = useRef<number>(0);
  const isHoveringTargetRef = useRef<boolean>(false);
  const revertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const applyNote = useCallback((msg: string) => {
    setCurrentNote((prev) => {
      if (prev === msg) return prev;
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 240);
      return msg;
    });
  }, []);

  // Global cursor tracking for elements with data-note
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-note]"
      ) as HTMLElement | null;

      if (target) {
        const note = target.getAttribute("data-note");
        if (note) {
          if (revertTimeoutRef.current) {
            clearTimeout(revertTimeoutRef.current);
            revertTimeoutRef.current = null;
          }
          isHoveringTargetRef.current = true;
          applyNote(note);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-note]"
      ) as HTMLElement | null;

      if (target) {
        if (revertTimeoutRef.current) {
          clearTimeout(revertTimeoutRef.current);
        }
        revertTimeoutRef.current = setTimeout(() => {
          isHoveringTargetRef.current = false;
          applyNote(IDLE_NOTES[idleIndexRef.current]);
        }, 1400);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (revertTimeoutRef.current) {
        clearTimeout(revertTimeoutRef.current);
      }
    };
  }, [applyNote]);

  // Cycle idle notes periodically when user is not hovering any target
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveringTargetRef.current) {
        idleIndexRef.current = (idleIndexRef.current + 1) % IDLE_NOTES.length;
        applyNote(IDLE_NOTES[idleIndexRef.current]);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [applyNote]);

  // Click/tap handler to immediately cycle thoughts
  const handleNoteClick = () => {
    idleIndexRef.current = (idleIndexRef.current + 1) % IDLE_NOTES.length;
    applyNote(IDLE_NOTES[idleIndexRef.current]);
  };

  const isLeft = tailAlign === "left";

  return (
    <div
      onClick={handleNoteClick}
      title="Click to cycle thoughts"
      className={`group/note cursor-pointer select-none transition-all duration-200 w-max max-w-[calc(100vw-32px)] sm:max-w-none ${className}`}
    >
      <div
        className={`relative inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 w-max max-w-full pixel-balloon text-[9px] sm:text-[10px] md:text-[10.5px] font-pixel font-semibold leading-none transition-transform duration-200 active:scale-95 group-hover/note:scale-105 ${
          isPopping ? "scale-105" : "scale-100"
        }`}
      >
        {/* Note Text Message (Wraps gracefully on mobile, single-line on desktop) */}
        <span className="whitespace-normal sm:whitespace-nowrap break-words tracking-tight font-pixel text-left leading-tight sm:leading-none">
          {currentNote}
        </span>

        {/* Authentic 8-bit Retro RPG Thought Tail Blocks leading down to avatar */}
        <div
          aria-hidden="true"
          className={`absolute -bottom-3 flex flex-col items-center gap-0.5 pointer-events-none ${
            isLeft
              ? "left-8 sm:left-14 md:left-16"
              : "left-1/2 -translate-x-1/2"
          }`}
        >
          <span className="w-1.5 h-1.5 pixel-tail-dot flex-shrink-0" />
          <span className="w-1 h-1 pixel-tail-dot flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};
