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
}

/**
 * Interactive Cursor-Aware Instagram Thought Bubble Note
 * - Floats above Richard's avatar in ProfileHeader
 * - Responds in real-time with sharp, witty English developer lines
 *   whenever the visitor's cursor hovers over key interactive elements
 *   (Stickman, Avatar, 3D Keyboard, Projects, Resume, Contact, Verified badge)
 * - Strictly zero emojis (clean typography only)
 * - Tapping the note immediately cycles to the next witty thought
 */
export const ProfileNote: React.FC<ProfileNoteProps> = ({ className = "" }) => {
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

  return (
    <div
      onClick={handleNoteClick}
      title="Click to cycle thoughts"
      className={`group/note cursor-pointer select-none transition-all duration-200 ${className}`}
    >
      <div
        className={`relative inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white dark:bg-[#18181f] text-neutral-900 dark:text-neutral-100 text-[11px] sm:text-[11.5px] font-semibold leading-tight shadow-md dark:shadow-xl border border-neutral-200/90 dark:border-zinc-700/80 transition-transform duration-200 active:scale-95 group-hover/note:scale-105 ${
          isPopping ? "scale-105" : "scale-100"
        }`}
      >
        {/* Subtle Instagram pink pulsar dot */}
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-ig-pink flex-shrink-0 animate-pulse"
        />

        {/* Note Text Message */}
        <span className="whitespace-nowrap tracking-tight font-medium">
          {currentNote}
        </span>

        {/* Authentic Instagram thought bubble tails leading down to avatar */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white dark:bg-[#18181f] border-b border-r border-neutral-200/90 dark:border-zinc-700/80 shadow-xs pointer-events-none"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white dark:bg-[#18181f] border-b border-r border-neutral-200/90 dark:border-zinc-700/80 shadow-2xs pointer-events-none"
        />
      </div>
    </div>
  );
};

