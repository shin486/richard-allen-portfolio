"use client";

import React, { useEffect } from "react";

interface KeyboardShortcutsHUDProps {
  onToggleRecruiter: () => void;
  isRecruiterView: boolean;
}

export const KeyboardShortcutsHUD: React.FC<KeyboardShortcutsHUDProps> = ({
  onToggleRecruiter,
  isRecruiterView,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Alt + K: Open Byte AI Assistant
      if (e.altKey && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-byte-chat"));
      }

      // Alt + R: Toggle Recruiter Dossier
      if (e.altKey && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        onToggleRecruiter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggleRecruiter]);

  const handleOpenByte = () => {
    window.dispatchEvent(new CustomEvent("open-byte-chat"));
  };

  return (
    <aside
      aria-label="Developer Keyboard Shortcuts"
      className="fixed bottom-5 left-5 z-40 hidden xl:flex flex-col gap-1.5 pointer-events-auto select-none"
    >
      <button
        type="button"
        onClick={handleOpenByte}
        data-note="Press Alt + K anywhere to chat with Byte AI."
        className="group flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-[#101116]/90 backdrop-blur-md border border-neutral-200/80 dark:border-zinc-800/80 text-[11px] font-mono text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:border-neutral-300 dark:hover:border-zinc-700 shadow-xs transition-all text-left cursor-pointer"
      >
        <span>Ask anything</span>
        <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 border border-neutral-200/80 dark:border-zinc-700/80 text-[10px] text-neutral-700 dark:text-zinc-300 font-mono">
          Alt + K
        </kbd>
      </button>

      <button
        type="button"
        onClick={onToggleRecruiter}
        data-note="Press Alt + R anywhere to toggle the Recruiter Dossier."
        className="group flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-[#101116]/90 backdrop-blur-md border border-neutral-200/80 dark:border-zinc-800/80 text-[11px] font-mono text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:border-neutral-300 dark:hover:border-zinc-700 shadow-xs transition-all text-left cursor-pointer"
      >
        <span>{isRecruiterView ? "Studio view" : "Recruiter view"}</span>
        <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 border border-neutral-200/80 dark:border-zinc-700/80 text-[10px] text-neutral-700 dark:text-zinc-300 font-mono">
          Alt + R
        </kbd>
      </button>
    </aside>
  );
};
