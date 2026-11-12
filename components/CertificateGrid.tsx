"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { certificatesData } from "@/data/certificates";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";

const LIKED_STORAGE_KEY = "shin486-liked-certs-v1";
const COUNTED_STORAGE_KEY = "shin486-counted-certs-v1";
const SAVED_STORAGE_KEY = "shin486-saved-certs-v1";

export const CertificateGrid: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [countsLoaded, setCountsLoaded] = useState(false);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [heartPopId, setHeartPopId] = useState<string | null>(null);
  const heartPopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ id: string; time: number }>({ id: "", time: 0 });
  const countedIdsRef = useRef<Record<string, boolean>>({});

  const totalSlides = certificatesData.length;
  const safeSlideIndex =
    totalSlides > 0 ? Math.min(currentSlide, totalSlides - 1) : 0;
  const activeCert = certificatesData[safeSlideIndex];

  // Load persisted visitor like/save state + fetch real global like counts from /api/likes
  useEffect(() => {
    try {
      const rawLiked = localStorage.getItem(LIKED_STORAGE_KEY);
      if (rawLiked) setLikedIds(JSON.parse(rawLiked));

      const rawCounted = localStorage.getItem(COUNTED_STORAGE_KEY);
      if (rawCounted) countedIdsRef.current = JSON.parse(rawCounted);

      const rawSaved = localStorage.getItem(SAVED_STORAGE_KEY);
      if (rawSaved) setSavedIds(JSON.parse(rawSaved));
    } catch {
      // Ignore storage errors
    }

    const ids = certificatesData.map((c) => c.id).join(",");
    fetch(`/api/likes?ids=${encodeURIComponent(ids)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (data?.counts) {
          setLikeCounts(data.counts);
        }
        setCountsLoaded(true);
      })
      .catch(() => {
        setCountsLoaded(true);
      });
  }, []);

  const recordLikeOnServer = useCallback((id: string) => {
    // Optimistically increment local state
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));

    // Only hit the global increment endpoint once per certificate per browser
    if (countedIdsRef.current[id]) return;
    countedIdsRef.current = { ...countedIdsRef.current, [id]: true };
    try {
      localStorage.setItem(
        COUNTED_STORAGE_KEY,
        JSON.stringify(countedIdsRef.current)
      );
    } catch {}

    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { id?: string; count?: number } | null) => {
        if (typeof data?.count === "number") {
          setLikeCounts((prev) => ({
            ...prev,
            [id]: data.count!,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const triggerDoubleTapHeart = useCallback(
    (id: string) => {
      setLikedIds((prev) => {
        const wasLiked = !!prev[id];
        const next = { ...prev, [id]: true };
        try {
          localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        if (!wasLiked) {
          recordLikeOnServer(id);
        }
        return next;
      });

      setHeartPopId(id);
      if (heartPopTimerRef.current) {
        clearTimeout(heartPopTimerRef.current);
      }
      heartPopTimerRef.current = setTimeout(() => {
        setHeartPopId(null);
      }, 900);
    },
    [recordLikeOnServer]
  );

  useEffect(() => {
    return () => {
      if (heartPopTimerRef.current) {
        clearTimeout(heartPopTimerRef.current);
      }
    };
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const wasLiked = !!prev[id];
      const nowLiked = !wasLiked;
      const next = { ...prev, [id]: nowLiked };
      try {
        localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(next));
      } catch {}

      if (nowLiked) {
        recordLikeOnServer(id);
      } else {
        setLikeCounts((counts) => ({
          ...counts,
          [id]: Math.max(0, (counts[id] ?? 1) - 1),
        }));
      }

      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
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
    } else if (activeCert) {
      // Tap without swipe -> detect double-tap for Instagram heart pop
      const now = Date.now();
      if (
        lastTapRef.current.id === activeCert.id &&
        now - lastTapRef.current.time < 320 &&
        now - lastTapRef.current.time > 30
      ) {
        triggerDoubleTapHeart(activeCert.id);
        lastTapRef.current = { id: "", time: 0 };
      } else {
        lastTapRef.current = { id: activeCert.id, time: now };
      }
    }
    setTouchStartX(null);
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById("contact-section");
    if (contactEl) {
      const navOffset = 70;
      const elementPosition = contactEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!activeCert) return null;

  const isLiked = !!likedIds[activeCert.id];
  const isSaved = !!savedIds[activeCert.id];
  const rawCount = likeCounts[activeCert.id] ?? 0;
  const displayLikeCount = isLiked ? Math.max(1, rawCount) : rawCount;

  return (
    <section id="certificates-section" className="py-6 sm:py-8">
      {/* Bryl Lim Minimalist Numbered Section Header */}
      <div className="flex items-baseline justify-between border-b border-neutral-200/80 dark:border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-neutral-400 dark:text-zinc-500">
            04 —
          </span>
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-semibold text-neutral-900 dark:text-zinc-100">
            Verified Certifications &amp; Accreditations
          </h2>
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-zinc-500">
          CISCO CCNA &amp; AI
        </span>
      </div>

      <div className="w-full">
        {/* Quick Certificate Jump Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x"
          role="tablist"
          aria-label="Select certificate slide"
        >
          {certificatesData.map((cert, index) => {
            const isCurrent = index === safeSlideIndex;

            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                data-note={`Verified credential: ${cert.title} (${cert.issuer}).`}
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
                <span className="whitespace-nowrap">{cert.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Clean Authentic Instagram Multi-Photo Carousel Post */}
        <article className="milled-card bg-white dark:bg-[#111116] border-y sm:border border-neutral-200 dark:border-zinc-800 sm:border-t-neutral-300/80 dark:sm:border-t-zinc-700/70 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden transition-all">
          {/* 1. Instagram Post Header */}
          <div className="flex items-center justify-between gap-2 px-3.5 sm:px-5 py-3 border-b border-neutral-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] animated-ig-ring flex-shrink-0">
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
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 truncate">
                    {profileData.username}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate leading-tight">
                  {activeCert.issuer}
                </p>
              </div>
            </div>

            {/* Slide Counter Pill (1 / 5) */}
            <div className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-800 dark:text-zinc-200 text-xs font-semibold tabular-nums tracking-wider flex-shrink-0">
              {safeSlideIndex + 1} / {totalSlides}
            </div>
          </div>

          {/* 2. Clean Certificate Photo Stage (Double-Tap / Double-Click to Like) */}
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral-50 dark:bg-zinc-950 overflow-hidden select-none cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={() => triggerDoubleTapHeart(activeCert.id)}
            title="Double-tap or double-click to like"
          >
            {/* Instagram Big Heart Double-Tap Pop Overlay */}
            {heartPopId === activeCert.id && (
              <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                <div className="animate-ig-doubletap-heart filter drop-shadow-[0_0_24px_rgba(237,73,86,0.9)]">
                  <svg
                    className="w-24 h-24 sm:w-28 sm:h-28 fill-[#ED4956] stroke-white stroke-[1.5]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            )}

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
                  className="w-full h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center p-2 sm:p-5"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain p-1 sm:p-3"
                  />
                </div>
              ))}
            </div>

            {/* Previous Slide Arrow Button */}
            {safeSlideIndex > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                data-note="Previous certification slide."
                aria-label="Previous certificate"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* Next Slide Arrow Button */}
            {safeSlideIndex < totalSlides - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                data-note="Next certification slide."
                aria-label="Next certificate"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          {/* 3. Instagram Action Bar, Real Likes Count, Caption & Timestamp */}
          <div className="px-4 sm:px-5 pt-3.5 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              {/* Left: Heart + Live Count & Comment */}
              <div className="flex items-center gap-4 text-neutral-700 dark:text-zinc-200">
                <button
                  type="button"
                  onClick={() => toggleLike(activeCert.id)}
                  data-note={
                    isLiked
                      ? "Certificate liked."
                      : "Like this credential (or double-tap the certificate)."
                  }
                  className={`inline-flex items-center gap-1.5 focus:outline-none transition-transform active:scale-125 ${
                    isLiked
                      ? "text-red-500 animate-heart-pop"
                      : "hover:text-red-500"
                  }`}
                  aria-label={isLiked ? "Unlike certificate" : "Like certificate"}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {countsLoaded && displayLikeCount > 0 && (
                    <span className="text-xs font-bold tabular-nums text-neutral-900 dark:text-zinc-100">
                      {displayLikeCount.toLocaleString()}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={scrollToContact}
                  data-note="Send a message about this certification."
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                  aria-label="Message about this certification"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Center: Authentic Instagram Carousel Dots */}
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
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to certificate ${index + 1}: ${cert.title}`}
                      aria-selected={isActive}
                      role="tab"
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-2 h-2 bg-sky-500 scale-110"
                          : "w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-700 hover:bg-neutral-400 dark:hover:bg-zinc-500"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Right: Bookmark Icon */}
              <button
                type="button"
                onClick={() => toggleSave(activeCert.id)}
                data-note={
                  isSaved
                    ? "Credential bookmarked."
                    : "Bookmark this certification."
                }
                className={`focus:outline-none transition-transform active:scale-125 ${
                  isSaved
                    ? "text-neutral-900 dark:text-zinc-100"
                    : "text-neutral-700 dark:text-zinc-200 hover:text-black dark:hover:text-white"
                }`}
                aria-label={isSaved ? "Remove bookmark" : "Bookmark certificate"}
              >
                <Bookmark
                  className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Real Instagram Likes Counter Line */}
            <p className="text-xs font-semibold text-neutral-900 dark:text-zinc-100 tabular-nums">
              {!countsLoaded ? (
                <span className="text-neutral-400 dark:text-zinc-500 font-normal">
                  Loading likes…
                </span>
              ) : displayLikeCount === 0 ? (
                <span className="text-neutral-500 dark:text-zinc-400 font-normal">
                  Be the first to like this certification
                </span>
              ) : displayLikeCount === 1 ? (
                isLiked ? (
                  <>
                    1 like{" "}
                    <span className="font-normal text-neutral-500 dark:text-zinc-400">
                      · Liked by{" "}
                      <strong className="font-semibold text-neutral-800 dark:text-zinc-200">
                        you
                      </strong>
                    </span>
                  </>
                ) : (
                  "1 like"
                )
              ) : isLiked ? (
                <>
                  {displayLikeCount.toLocaleString()} likes{" "}
                  <span className="font-normal text-neutral-500 dark:text-zinc-400">
                    · Liked by{" "}
                    <strong className="font-semibold text-neutral-800 dark:text-zinc-200">
                      you
                    </strong>{" "}
                    and{" "}
                    <strong className="font-semibold text-neutral-800 dark:text-zinc-200">
                      {displayLikeCount - 1}{" "}
                      {displayLikeCount - 1 === 1 ? "other" : "others"}
                    </strong>
                  </span>
                </>
              ) : (
                `${displayLikeCount.toLocaleString()} likes`
              )}
            </p>

            {/* Authentic Instagram Caption */}
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-800 dark:text-zinc-200">
              <span className="font-bold mr-1.5 text-neutral-900 dark:text-zinc-100">
                {profileData.username}
              </span>
              <span className="font-semibold text-neutral-900 dark:text-zinc-100">
                {activeCert.title}
              </span>{" "}
              <span className="text-neutral-600 dark:text-zinc-400">
                — {activeCert.caption}
              </span>
            </p>

            {/* Instagram Post Timestamp */}
            <p className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 font-mono pt-0.5">
              {activeCert.postDate}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
