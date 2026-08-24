"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HighlightGroup } from "@/data/highlights";
import { HighlightProgress } from "./HighlightProgress";
import { HighlightHeader } from "./HighlightHeader";
import { HighlightStoryRenderer } from "./HighlightStoryRenderer";

interface HighlightViewerProps {
  isOpen: boolean;
  initialHighlightIndex?: number;
  initialStoryIndex?: number;
  highlights: HighlightGroup[];
  onClose: () => void;
}

export const HighlightViewer: React.FC<HighlightViewerProps> = ({
  isOpen,
  initialHighlightIndex = 0,
  initialStoryIndex = 0,
  highlights,
  onClose,
}) => {
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(initialHighlightIndex);
  const [activeStoryIndex, setActiveStoryIndex] = useState(initialStoryIndex);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch tracking for swipe down gesture
  const touchStartY = useRef<number | null>(null);

  // Sync initial indices when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveHighlightIndex(initialHighlightIndex);
      setActiveStoryIndex(initialStoryIndex);
      setProgressPercent(0);
      setIsPaused(false);
    }
  }, [isOpen, initialHighlightIndex, initialStoryIndex]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentHighlight = highlights[activeHighlightIndex] || highlights[0];
  const currentStory = currentHighlight?.stories[activeStoryIndex] || currentHighlight?.stories[0];
  const storyDuration = currentStory?.duration || 5000;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!currentHighlight) return;

    if (activeStoryIndex + 1 < currentHighlight.stories.length) {
      setActiveStoryIndex((prev) => prev + 1);
      setProgressPercent(0);
    } else if (activeHighlightIndex + 1 < highlights.length) {
      // Transition to next highlight group
      setActiveHighlightIndex((prev) => prev + 1);
      setActiveStoryIndex(0);
      setProgressPercent(0);
    } else {
      // Reached final story of final highlight -> close
      onClose();
    }
  }, [activeStoryIndex, activeHighlightIndex, currentHighlight, highlights.length, onClose]);

  const handlePrev = useCallback(() => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1);
      setProgressPercent(0);
    } else if (activeHighlightIndex > 0) {
      const prevHighlight = highlights[activeHighlightIndex - 1];
      setActiveHighlightIndex((prev) => prev - 1);
      setActiveStoryIndex(Math.max(0, prevHighlight.stories.length - 1));
      setProgressPercent(0);
    } else {
      setProgressPercent(0);
    }
  }, [activeStoryIndex, activeHighlightIndex, highlights]);

  // Single active timer engine using precise interval
  useEffect(() => {
    if (!isOpen || isPaused || !currentStory) return;

    const intervalMs = 30;
    const increment = (intervalMs / storyDuration) * 100;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, isPaused, activeHighlightIndex, activeStoryIndex, storyDuration, handleNext, currentStory]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentHighlight || !currentStory) return null;

  // Touch handlers for swipe down to close
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartY.current !== null) {
      const diffY = e.changedTouches[0].clientY - touchStartY.current;
      if (diffY > 120) {
        onClose();
      }
      touchStartY.current = null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentHighlight.title} Story Viewer`}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Desktop Outside Left Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white mr-6 transition-all active:scale-95 focus:outline-none backdrop-blur-sm"
        aria-label="Previous story"
        title="Previous (←)"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Main Story Container Stage (9:16 Aspect Ratio on Desktop) */}
      <div
        className="relative w-full h-full sm:h-[88vh] sm:max-h-[820px] sm:w-[420px] md:w-[440px] bg-slate-950 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border sm:border-white/15 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dynamic Background Gradient / Mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-slate-950 to-pink-950/70 z-0 pointer-events-none" />

        {/* Top Floating Controls Layer */}
        <div className="relative z-30 flex flex-col bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          {/* Segmented Progress Bars */}
          <HighlightProgress
            totalStories={currentHighlight.stories.length}
            activeStoryIndex={activeStoryIndex}
            progressPercent={progressPercent}
          />

          {/* Story Header */}
          <HighlightHeader
            highlightTitle={currentHighlight.title}
            timeAgo={currentStory.timeAgo || currentHighlight.timeAgo}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((prev) => !prev)}
            onClose={onClose}
          />
        </div>

        {/* Middle Stage: Story Content */}
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          <HighlightStoryRenderer
            story={currentStory}
            onInteract={() => setIsPaused(true)}
          />
        </div>

        {/* Invisible Click Navigation Zones (Left 30% & Right 30%) */}
        <div
          onClick={handlePrev}
          className="absolute inset-y-16 left-0 w-[30%] z-20 cursor-pointer focus:outline-none"
          aria-label="Previous story zone"
        />
        <div
          onClick={handleNext}
          className="absolute inset-y-16 right-0 w-[30%] z-20 cursor-pointer focus:outline-none"
          aria-label="Next story zone"
        />
      </div>

      {/* Desktop Outside Right Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white ml-6 transition-all active:scale-95 focus:outline-none backdrop-blur-sm"
        aria-label="Next story"
        title="Next (→)"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  );
};
