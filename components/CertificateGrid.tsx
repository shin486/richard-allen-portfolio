"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
  CheckCircle2,
  Layers,
  Building2,
} from "lucide-react";
import { certificatesData } from "@/data/certificates";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";

export const CertificateGrid: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalSlides = certificatesData.length;
  const safeSlideIndex =
    totalSlides > 0 ? Math.min(currentSlide, totalSlides - 1) : 0;
  const activeCert = certificatesData[safeSlideIndex];

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStartX(null);
  };

  if (!activeCert) return null;

  return (
    <section id="certificates-section" className="py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring flex-shrink-0">
            <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
              <Award className="w-4 h-4 text-ig-orange" />
            </div>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
              Certifications
            </h2>
            <p className="text-xs text-neutral-500 dark:text-zinc-400">
              Verified certifications and technical training
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">
          Viewing{" "}
          <strong className="text-neutral-900 dark:text-zinc-100">
            {safeSlideIndex + 1}
          </strong>{" "}
          of{" "}
          <strong className="text-neutral-900 dark:text-zinc-100">
            {totalSlides}
          </strong>{" "}
          certifications
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Quick Certificate Jump Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar"
          role="tablist"
          aria-label="Select certificate slide"
        >
          {certificatesData.map((cert, index) => {
            const isCurrent = index === safeSlideIndex;
            const shortTitle =
              cert.title.length > 28
                ? `${cert.title.slice(0, 28)}…`
                : cert.title;

            return (
              <button
                key={cert.id}
                onClick={() => setCurrentSlide(index)}
                role="tab"
                aria-selected={isCurrent}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isCurrent
                    ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100 shadow-sm"
                    : "bg-white dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-900 dark:hover:text-zinc-200"
                }`}
              >
                <span
                  className={`text-[10px] font-mono ${
                    isCurrent
                      ? "text-white/80 dark:text-neutral-900/70"
                      : "text-neutral-400 dark:text-zinc-500"
                  }`}
                >
                  0{index + 1}
                </span>
                <span>{shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Single Instagram Multi-Photo Carousel Post for Certificates */}
        <article className="bg-white dark:bg-[#111116] border-y sm:border border-neutral-200 dark:border-zinc-800 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden shadow-sm transition-all">
          {/* Instagram Post Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-neutral-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full p-[2px] animated-ig-ring flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                    {profileData.username}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 flex-shrink-0" />
                  <span className="text-neutral-300 dark:text-zinc-700">•</span>
                  <span className="text-xs font-medium text-neutral-500 dark:text-zinc-400 truncate">
                    {activeCert.issuer}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                  Verified Credential
                </div>
              </div>
            </div>

            {/* Slide Counter Badge (e.g. 1 / 5) */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 dark:bg-zinc-800 text-white text-xs font-semibold tracking-wider flex-shrink-0">
              <Layers className="w-3.5 h-3.5 text-ig-orange" />
              <span>
                {safeSlideIndex + 1} / {totalSlides}
              </span>
            </div>
          </div>

          {/* Swipeable Certificate Slide Track Viewport */}
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral-100 dark:bg-zinc-950 overflow-hidden group select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Horizontal Sliding Track */}
            <div
              className="w-full h-full flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${safeSlideIndex * 100}%)`,
              }}
            >
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="w-full h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center p-2 sm:p-4"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Top-Left Badge */}
            <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-ig-gradient text-white shadow-md">
                <Award className="w-3.5 h-3.5" />
                Certification
              </span>
            </div>

            {/* Previous Slide Arrow Button */}
            {safeSlideIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous certificate"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Slide Arrow Button */}
            {safeSlideIndex < totalSlides - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next certificate"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Bottom Overlay Year Pill (if year exists) */}
            {activeCert.year && (
              <div className="absolute bottom-3.5 left-3.5 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/65 text-zinc-200 backdrop-blur-md border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-ig-orange" />
                  {activeCert.year}
                </span>
              </div>
            )}
          </div>

          {/* Instagram Action Bar & Pagination Dots */}
          <div className="px-4 sm:px-6 pt-3.5 pb-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800/80">
              {/* Left Like Button */}
              <div className="flex items-center gap-3.5 text-neutral-700 dark:text-zinc-300">
                <button
                  onClick={() => toggleLike(activeCert.id)}
                  className={`focus:outline-none transition-transform active:scale-125 ${
                    likedIds[activeCert.id]
                      ? "text-red-500 animate-heart-pop"
                      : "hover:text-red-500"
                  }`}
                  aria-label={
                    likedIds[activeCert.id]
                      ? "Unlike certificate"
                      : "Like certificate"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedIds[activeCert.id]
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                </button>
              </div>

              {/* Authentic Instagram Carousel Dots */}
              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Certificate slides"
              >
                {certificatesData.map((cert, index) => {
                  const isActive = index === safeSlideIndex;
                  return (
                    <button
                      key={cert.id}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to certificate ${index + 1}: ${cert.title}`}
                      aria-selected={isActive}
                      role="tab"
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-2.5 h-2.5 bg-ig-orange scale-110"
                          : "w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-700 hover:bg-neutral-400 dark:hover:bg-zinc-500"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Right Bookmark Icon */}
              <button
                onClick={() => toggleSave(activeCert.id)}
                className={`focus:outline-none transition-transform active:scale-125 ${
                  savedIds[activeCert.id]
                    ? "text-neutral-900 dark:text-zinc-100"
                    : "text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                }`}
                aria-label={
                  savedIds[activeCert.id]
                    ? "Remove bookmark"
                    : "Bookmark certificate"
                }
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    savedIds[activeCert.id] ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>

            {/* Dynamic Certificate Caption */}
            <div className="mt-3.5 space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                  {profileData.username}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100">
                  {activeCert.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 dark:text-zinc-300">
                  <Building2 className="w-3.5 h-3.5 text-ig-orange" />
                  Issued by {activeCert.issuer}
                </span>
                {activeCert.year && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeCert.year}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
