"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

interface TargetAnchor {
  text: string;
  targetCenterX: number;
  targetTop: number;
  targetBottom: number;
  placement: "top" | "bottom";
}

/**
 * Universal Cursor-Aware Interactive Button Note
 * - Matches the exact leveled single-line geometry, padding, and 2-dot thought tail of ProfileNote.tsx
 * - Never uses CSS keyframe animations on the positioned wrapper (so translate3d(-50%, -100%, 0) is never overridden)
 * - Measures real bubble width via useLayoutEffect so single-line bubbles stay leveled and clamped inside the viewport
 */
export const InteractiveButtonNote: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [anchor, setAnchor] = useState<TargetAnchor | null>(null);
  const [clampedX, setClampedX] = useState<number>(0);
  const [tailOffsetX, setTailOffsetX] = useState<number>(0);
  const [isPopping, setIsPopping] = useState<boolean>(false);

  const activeTargetRef = useRef<HTMLElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const updateTargetAnchor = useCallback((target: HTMLElement, text: string) => {
    // Defer to the Avatar's upper-head ProfileNote when hovering inside #profile-header while visible
    const inProfileHeader = Boolean(target.closest("#profile-header"));
    if (inProfileHeader) {
      const avatarAnchor = document.getElementById("profile-avatar-note-anchor");
      if (avatarAnchor) {
        const anchorRect = avatarAnchor.getBoundingClientRect();
        if (anchorRect.top >= 48 && anchorRect.bottom <= window.innerHeight) {
          setAnchor(null);
          return;
        }
      }
    }

    const rect = target.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setAnchor(null);
      return;
    }

    const targetCenterX = rect.left + rect.width / 2;
    // Flip below only if the button is near the very top edge of the viewport (e.g. Sticky Navbar)
    const placement: "top" | "bottom" = rect.top < 84 ? "bottom" : "top";

    setAnchor((prev) => {
      if (!prev || prev.text !== text) {
        setIsPopping(true);
        setTimeout(() => setIsPopping(false), 200);
      }
      return {
        text,
        targetCenterX,
        targetTop: rect.top,
        targetBottom: rect.bottom,
        placement,
      };
    });
  }, []);

  // Measure actual rendered single-line bubble width so it stays leveled and clamped within viewport
  useLayoutEffect(() => {
    if (!anchor) return;
    const vw = window.innerWidth;
    const margin = 16;
    const bubbleEl = bubbleRef.current;
    const bubbleWidth = bubbleEl ? bubbleEl.offsetWidth : 260;

    const halfWidth = bubbleWidth / 2;
    const minCenterX = margin + halfWidth;
    const maxCenterX = Math.max(minCenterX, vw - margin - halfWidth);
    const nextClampedX = Math.max(
      minCenterX,
      Math.min(maxCenterX, anchor.targetCenterX)
    );

    const maxTailShift = Math.max(0, halfWidth - 18);
    const nextTailOffset = Math.max(
      -maxTailShift,
      Math.min(maxTailShift, anchor.targetCenterX - nextClampedX)
    );

    setClampedX(nextClampedX);
    setTailOffsetX(nextTailOffset);
  }, [anchor]);

  useEffect(() => {
    if (!mounted) return;

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
      updateTargetAnchor(target, note);
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
          setAnchor(null);
        }
      }, 90);
    };

    const handleViewportChange = () => {
      if (activeTargetRef.current) {
        const note = activeTargetRef.current.getAttribute("data-note");
        if (note) {
          updateTargetAnchor(activeTargetRef.current, note);
        } else {
          setAnchor(null);
        }
      }
    };

    const handleMouseDown = () => {
      setAnchor(null);
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
  }, [mounted, updateTargetAnchor]);

  if (!mounted || !anchor) return null;

  // 16px vertical clearance so the 2-dot thought tail floats cleanly above/below the button without overlapping it
  const y =
    anchor.placement === "top"
      ? anchor.targetTop - 16
      : anchor.targetBottom + 16;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      style={{
        left: `${clampedX || anchor.targetCenterX}px`,
        top: `${y}px`,
        transform:
          anchor.placement === "top"
            ? "translate3d(-50%, -100%, 0)"
            : "translate3d(-50%, 0, 0)",
      }}
      className="fixed z-[90] pointer-events-none select-none"
    >
      {/* Leveled Single-Line Conversational Bubble (Matches ProfileNote.tsx in Upper Head) */}
      <div
        ref={bubbleRef}
        className={`relative inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 w-max max-w-[calc(100vw-32px)] sm:max-w-none pixel-balloon text-[9px] sm:text-[10px] md:text-[10.5px] font-pixel font-semibold leading-none transition-transform duration-200 ${
          isPopping ? "scale-105" : "scale-100"
        }`}
      >
        <span className="whitespace-normal sm:whitespace-nowrap break-words tracking-tight font-pixel text-left leading-tight sm:leading-none">
          {anchor.text}
        </span>

        {/* Authentic 2-Dot Thought Tail (Matches ProfileNote.tsx) */}
        {anchor.placement === "top" ? (
          <div
            aria-hidden="true"
            style={{
              left: `calc(50% + ${tailOffsetX}px)`,
              transform: "translateX(-50%)",
            }}
            className="absolute -bottom-3 flex flex-col items-center gap-0.5 pointer-events-none"
          >
            <span className="w-1.5 h-1.5 pixel-tail-dot flex-shrink-0" />
            <span className="w-1 h-1 pixel-tail-dot flex-shrink-0" />
          </div>
        ) : (
          <div
            aria-hidden="true"
            style={{
              left: `calc(50% + ${tailOffsetX}px)`,
              transform: "translateX(-50%)",
            }}
            className="absolute -top-3 flex flex-col items-center gap-0.5 pointer-events-none"
          >
            <span className="w-1 h-1 pixel-tail-dot flex-shrink-0" />
            <span className="w-1.5 h-1.5 pixel-tail-dot flex-shrink-0" />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
