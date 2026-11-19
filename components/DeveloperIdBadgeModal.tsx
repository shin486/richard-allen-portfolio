"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Instagram, ExternalLink } from "lucide-react";
import profilePic from "@/assets/PROFILEPIC.png";
import { profileData } from "@/data/profile";
import { VerifiedBadge } from "./VerifiedBadge";

interface DeveloperIdBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperIdBadgeModal: React.FC<DeveloperIdBadgeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Open Instagram Profile"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[340px] rounded-2xl bg-white dark:bg-[#111216] border border-neutral-200 dark:border-zinc-800 shadow-2xl p-6 text-center animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Avatar with Instagram Ring */}
        <div className="mx-auto w-20 h-20 rounded-full p-[2.5px] animated-ig-ring shadow-md">
          <div className="w-full h-full rounded-full bg-white dark:bg-[#111216] p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
              <Image
                src={profilePic}
                alt={profileData.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Handle & Prompt */}
        <div className="mt-4 space-y-1.5">
          <div className="inline-flex items-center justify-center gap-1.5">
            <h2 className="text-base font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
              @richardallen0901
            </h2>
            <VerifiedBadge className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
            Would you like to open my main Instagram profile in a new tab?
          </p>
        </div>

        {/* Clean 2-Button Choice */}
        <div className="mt-5 flex flex-col gap-2">
          <a
            href={profileData.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ig-gradient hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            <span>Open Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-85" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 font-semibold text-xs sm:text-sm transition-colors"
          >
            Stay on Portfolio
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
