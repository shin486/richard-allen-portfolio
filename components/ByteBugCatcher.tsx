"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Sparkles, RotateCcw } from "lucide-react";

interface Bug {
  id: number;
  x: number; // percentage from right: 0 to 100%
  type: string;
  caught: boolean;
}

const BUG_TYPES = ["🐛", "🪲", "🐞", "👾"];

export const ByteBugCatcher: React.FC = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // default mute for polite audio UX
  const [milestone, setMilestone] = useState<string | null>(null);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const nextBugId = useRef(1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Synthesize lightweight 8-bit chimes via native Web Audio API (zero external assets)
  const playSfx = useCallback(
    (type: "jump" | "catch" | "milestone") => {
      if (isMuted || typeof window === "undefined") return;

      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (type === "jump") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
        } else if (type === "catch") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(587.33, now); // D5
          osc.frequency.setValueAtTime(880, now + 0.06); // A5
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.24);
        } else if (type === "milestone") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
          osc.frequency.setValueAtTime(1046.5, now + 0.24); // C6
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.48);
        }
      } catch {
        // audio fallback
      }
    },
    [isMuted]
  );

  // Jump Action
  const triggerJump = useCallback(() => {
    if (isJumping) return;
    setIsJumping(true);
    playSfx("jump");

    setTimeout(() => {
      setIsJumping(false);
    }, 380);
  }, [isJumping, playSfx]);

  // Spacebar key listener to jump when focused or hovered
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag === "input" || activeTag === "textarea") return;
        // if user presses space, jump
        triggerJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerJump]);

  // Bug spawning and movement loop
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBugs((prevBugs) => {
        return prevBugs
          .map((bug) => ({
            ...bug,
            x: bug.x + 2.2, // move right-to-left
          }))
          .filter((bug) => bug.x < 105);
      });
    }, 45);

    const spawnInterval = setInterval(() => {
      setBugs((prevBugs) => {
        // limit on-screen bugs to avoid clutter
        if (prevBugs.length >= 2) return prevBugs;
        const newBug: Bug = {
          id: nextBugId.current++,
          x: 0,
          type: BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)],
          caught: false,
        };
        return [...prevBugs, newBug];
      });
    }, 2800);

    return () => {
      clearInterval(moveInterval);
      clearInterval(spawnInterval);
    };
  }, []);

  // Collision detection: Byte is at left: 24px (~10-18% of stage)
  useEffect(() => {
    setBugs((prevBugs) => {
      let scoreGained = 0;
      const updated = prevBugs.map((bug) => {
        // Collision window (when bug is near Byte's horizontal position)
        if (!bug.caught && bug.x >= 70 && bug.x <= 88) {
          if (isJumping) {
            // Byte leaped over or caught bug in mid-air
            scoreGained += 1;
            return { ...bug, caught: true };
          }
        }
        return bug;
      });

      if (scoreGained > 0) {
        setScore((s) => {
          const newScore = s + scoreGained;
          setHighScore((hs) => Math.max(hs, newScore));
          playSfx("catch");

          if (newScore === 5) {
            setMilestone("🎉 5 Bugs Squashed! Production Ready!");
            playSfx("milestone");
            setTimeout(() => setMilestone(null), 3000);
          } else if (newScore === 10) {
            setMilestone("🏆 10 Bugs Squashed! Senior Debugger!");
            playSfx("milestone");
            setTimeout(() => setMilestone(null), 3000);
          }
          return newScore;
        });
      }

      return updated;
    });
  }, [isJumping, bugs, playSfx]);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore(0);
    setBugs([]);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <div
      ref={stageRef}
      onClick={triggerJump}
      role="button"
      tabIndex={0}
      aria-label="Byte's Bug Catcher mini-game. Click to jump!"
      className="group relative w-full h-[60px] sm:h-[66px] rounded-xl sm:rounded-2xl border transition-all duration-200 select-none cursor-pointer overflow-hidden focus:outline-none focus:ring-1 focus:ring-ig-pink/50 bg-neutral-100/90 hover:bg-neutral-100/95 border-neutral-200/90 dark:bg-[#13141d]/90 dark:hover:bg-[#161724] dark:border-white/10 shadow-xs"
    >
      {/* Top Meta Header: Mascot label & Controls */}
      <div className="absolute top-1.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono z-20 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-neutral-800 dark:text-zinc-200 tracking-tight flex items-center gap-1">
            <span>BYTE&apos;S BUG CATCHER</span>
          </span>
          <span className="text-[9px] text-neutral-500 dark:text-zinc-400 hidden xs:inline">
            (tap / space to jump)
          </span>
        </div>

        {/* Live Score Counter & Sound Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
            <span>SQUASHED:</span>
            <span className="tabular-nums text-xs sm:text-sm font-black">{score}</span>
          </span>

          {highScore > 0 && (
            <span className="hidden sm:inline text-neutral-400 dark:text-zinc-500 text-[9px]">
              BEST: {highScore}
            </span>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 dark:text-zinc-400 transition-colors"
            title={isMuted ? "Unmute 8-bit sound effects" : "Mute audio"}
            aria-label="Toggle game audio"
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-neutral-400" />
            ) : (
              <Volume2 className="w-3 h-3 text-ig-pink animate-pulse" />
            )}
          </button>

          {/* Reset button */}
          {score > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 dark:text-zinc-400 transition-colors"
              title="Reset score"
              aria-label="Reset score"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Track Floor Line */}
      <div className="absolute bottom-2 left-0 right-0 h-[1.5px] bg-neutral-200 dark:bg-zinc-800" />

      {/* Milestone Toast Overlay */}
      {milestone && (
        <div className="absolute inset-x-2 top-6 z-30 flex items-center justify-center pointer-events-none animate-scale-up">
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-ig-pink text-white shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{milestone}</span>
          </span>
        </div>
      )}

      {/* Running Byte Mascot */}
      <div
        className="absolute left-4 sm:left-6 text-xl sm:text-2xl select-none transition-transform duration-150 z-10"
        style={{
          bottom: isJumping ? "24px" : "4px",
          transform: isJumping ? "rotate(-12deg) scale(1.15)" : "rotate(0deg)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
        }}
      >
        🐶
      </div>

      {/* Bugs Crawling from Right to Left */}
      {bugs.map((bug) => {
        return (
          <div
            key={bug.id}
            className="absolute bottom-2 text-base sm:text-lg select-none transition-all duration-75 z-10"
            style={{
              right: `${bug.x}%`,
              opacity: bug.caught ? 0 : 1,
              transform: bug.caught ? "scale(1.8) translateY(-14px)" : "scale(1)",
              filter: bug.caught ? "drop-shadow(0 0 6px #10b981)" : "none",
            }}
          >
            {bug.caught ? "⭐" : bug.type}
          </div>
        );
      })}

      {/* Subtle Ambient Background Grid Dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
    </div>
  );
};

