"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface ActiveNoteState {
  text: string;
  x: number;
  y: number;
  tailOffsetX: number;
  placement: "top" | "bottom";
}

/**
 * Universal Cursor-Aware Interactive Button Note
 * - Renders an anchored micro-balloon pointing directly to any hovered button/control with [data-note]
 * - Smart de-duplication: defers to the Avatar's ProfileNote bubble when hovering inside #profile-header while visible
 * - Viewport-clamped (never clips off left, right, or top edges)
 */
export const InteractiveButtonNote: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [noteState, setNoteState] = useState<ActiveNoteState | null>(null);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const computePosition = useCallback((target: HTMLElement, text: string) => {
    // If hovering inside #profile-header and the Avatar Thought Bubble is visible,
    // let the Avatar's ProfileNote display the thought without a duplicate floating tooltip
    const inProfileHeader = Boolean(target.closest("#profile-header"));
    if (inProfileHeader) {
      const avatarAnchor = document.getElementById("profile-avatar-note-anchor");
      if (avatarAnchor) {
        const anchorRect = avatarAnchor.getBoundingClientRect();
        if (anchorRect.top >= 48 && anchorRect.bottom <= window.innerHeight) {
          setNoteState(null);
          return;
        }
      }
    }

    const rect = target.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setNoteState(null);
      return;
    }

    const vw = window.innerWidth;
    const margin = 12;
    const estimatedWidth = Math.min(
      vw - margin * 2,
      Math.max(180, Math.min(340, text.length * 6.8 + 28))
    );

    const targetCenterX = rect.left + rect.width / 2;
    const minCenterX = margin + estimatedWidth / 2;
    const maxCenterX = vw - margin - estimatedWidth / 2;
    const clampedCenterX = Math.max(
      minCenterX,
      Math.min(maxCenterX, targetCenterX)
    );

    const tailOffsetX = Math.max(
      -estimatedWidth / 2 + 16,
      Math.min(estimatedWidth / 2 - 16, targetCenterX - clampedCenterX)
    );

    // Flip below if the button is near the top of the viewport (e.g., Sticky Navbar buttons)
    const placement: "top" | "bottom" = rect.top < 96 ? "bottom" : "top";
    const y = placement === "top" ? rect.top - 10 : rect.bottom + 10;

    setNoteState({
      text,
      x: clampedCenterX,
      y,
      tailOffsetX,
      placement,
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only activate cursor hover notes on fine pointer devices (mouse/trackpad)
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-note]"
      ) as HTMLElement | null;

      if (!target) return;
      const note = target.getAttribute("data-note");
      if (!note) return;

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }

      activeTargetRef.current = target;
      computePosition(target, note);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-note]"
      ) as HTMLElement | null;
      if (!target) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && target.contains(related)) return;

      hideTimerRef.current = setTimeout(() => {
        if (activeTargetRef.current === target) {
          activeTargetRef.current = null;
          setNoteState(null);
        }
      }, 90);
    };

    const handleViewportChange = () => {
      if (activeTargetRef.current) {
        const note = activeTargetRef.current.getAttribute("data-note");
        if (note) {
          computePosition(activeTargetRef.current, note);
        } else {
          setNoteState(null);
        }
      }
    };

    const handleMouseDown = () => {
      setNoteState(null);
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mounted, computePosition]);

  if (!mounted || !noteState) return null;

  return createPortal(
    <div
      ref={bubbleRef}
      role="status"
      aria-live="polite"
      style={{
        left: `${noteState.x}px`,
        top: `${noteState.y}px`,
        transform:
          noteState.placement === "top"
            ? "translate3d(-50%, -100%, 0)"
            : "translate3d(-50%, 0, 0)",
      }}
      className="fixed z-[90] pointer-events-none select-none transition-opacity duration-150 animate-fade-in"
    >
      <div className="relative inline-flex items-center px-3 py-1.5 max-w-[min(340px,calc(100vw-24px))] pixel-balloon text-[9.5px] sm:text-[10px] font-pixel font-semibold leading-snug shadow-lg">
        <span className="whitespace-normal break-words tracking-tight font-pixel text-center">
          {noteState.text}
        </span>

        {/* Directional 8-Bit Pointer Tail */}
        {noteState.placement === "top" ? (
          <span
            aria-hidden="true"
            style={{
              left: `calc(50% + ${noteState.tailOffsetX}px)`,
              transform: "translateX(-50%)",
            }}
            className="absolute -bottom-[6px] w-2.5 h-1.5 pixel-tail-dot"
          />
        ) : (
          <span
            aria-hidden="true"
            style={{
              left: `calc(50% + ${noteState.tailOffsetX}px)`,
              transform: "translateX(-50%)",
            }}
            className="absolute -top-[6px] w-2.5 h-1.5 pixel-tail-dot"
          />
        )}
      </div>
    </div>,
    document.body
  );
};
