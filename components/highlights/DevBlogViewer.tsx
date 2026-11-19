"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Heart,
  Bookmark,
  Copy,
  Check,
  ArrowUpRight,
  BookOpen,
  Layers,
  LayoutGrid,
  CheckCircle2,
  Link2,
} from "lucide-react";
import {
  BLOG_TAGS,
  BlogDeepLink,
  BlogTag,
  DevBlogPost,
} from "@/data/blogPosts";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { HighlightProgress } from "./HighlightProgress";

export type DevBlogViewerMode = "story" | "article" | "archive";

interface DevBlogViewerProps {
  isOpen: boolean;
  initialMode: DevBlogViewerMode;
  initialPostIndex: number;
  posts: DevBlogPost[];
  seenPostIds: Record<string, boolean>;
  onMarkSeen: (postId: string) => void;
  onDeepLink: (action: BlogDeepLink["action"]) => void;
  onClose: () => void;
}

interface FloatingReaction {
  id: number;
  emoji: string;
  rightPx: number;
  delayMs: number;
}

const LIKED_BLOG_KEY = "shin486-liked-blog-v1";
const SAVED_BLOG_KEY = "shin486-saved-blog-v1";
const SLIDE_DURATION_MS = 6500;

export const DevBlogViewer: React.FC<DevBlogViewerProps> = ({
  isOpen,
  initialMode,
  initialPostIndex,
  posts,
  seenPostIds,
  onMarkSeen,
  onDeepLink,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<DevBlogViewerMode>(initialMode);
  const [activePostIndex, setActivePostIndex] = useState(initialPostIndex);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Archive filters
  const [archiveFilter, setArchiveFilter] = useState<
    "all" | "saved" | BlogTag
  >("all");

  // Engagement state
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const reactionCounterRef = useRef(1);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const rawLiked = localStorage.getItem(LIKED_BLOG_KEY);
      if (rawLiked) setLikedIds(JSON.parse(rawLiked));
      const rawSaved = localStorage.getItem(SAVED_BLOG_KEY);
      if (rawSaved) setSavedIds(JSON.parse(rawSaved));
    } catch {}
  }, []);

  // Sync open props
  useEffect(() => {
    if (isOpen) {
      setViewMode(initialMode);
      setActivePostIndex(initialPostIndex);
      setActiveSlideIndex(0);
      setProgressPercent(0);
      setIsPaused(false);
      if (initialMode !== "archive" && posts[initialPostIndex]) {
        onMarkSeen(posts[initialPostIndex].id);
      }
    }
  }, [isOpen, initialMode, initialPostIndex, posts, onMarkSeen]);

  // Mark post as seen whenever active post changes in story/article mode
  useEffect(() => {
    if (isOpen && viewMode !== "archive" && posts[activePostIndex]) {
      onMarkSeen(posts[activePostIndex].id);
    }
  }, [isOpen, viewMode, activePostIndex, posts, onMarkSeen]);

  // Body scroll lock while modal open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const currentPost = posts[activePostIndex] ?? posts[0];
  const currentSlide =
    currentPost?.slides[activeSlideIndex] ?? currentPost?.slides[0];

  const handleNext = useCallback(() => {
    if (!currentPost) return;
    if (viewMode === "story") {
      if (activeSlideIndex + 1 < currentPost.slides.length) {
        setActiveSlideIndex((prev) => prev + 1);
        setProgressPercent(0);
      } else if (activePostIndex + 1 < posts.length) {
        setActivePostIndex((prev) => prev + 1);
        setActiveSlideIndex(0);
        setProgressPercent(0);
      } else {
        onClose();
      }
    } else if (viewMode === "article") {
      if (activePostIndex + 1 < posts.length) {
        setActivePostIndex((prev) => prev + 1);
        setActiveSlideIndex(0);
      }
    }
  }, [activeSlideIndex, activePostIndex, currentPost, posts.length, viewMode, onClose]);

  const handlePrev = useCallback(() => {
    if (viewMode === "story") {
      if (activeSlideIndex > 0) {
        setActiveSlideIndex((prev) => prev - 1);
        setProgressPercent(0);
      } else if (activePostIndex > 0) {
        const prevPost = posts[activePostIndex - 1];
        setActivePostIndex((prev) => prev - 1);
        setActiveSlideIndex(Math.max(0, prevPost.slides.length - 1));
        setProgressPercent(0);
      } else {
        setProgressPercent(0);
      }
    } else if (viewMode === "article") {
      if (activePostIndex > 0) {
        setActivePostIndex((prev) => prev - 1);
        setActiveSlideIndex(0);
      }
    }
  }, [activeSlideIndex, activePostIndex, posts, viewMode]);

  // Story auto-advance timer (active only in Story Cards mode)
  useEffect(() => {
    if (!isOpen || viewMode !== "story" || isPaused || !currentSlide) return;

    const intervalMs = 40;
    const increment = (intervalMs / SLIDE_DURATION_MS) * 100;

    const timer = window.setInterval(() => {
      setProgressPercent((prev) => {
        if (prev + increment >= 100) {
          window.clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isOpen, viewMode, isPaused, currentSlide, handleNext]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (viewMode === "story") {
        if (e.key === "ArrowRight") handleNext();
        else if (e.key === "ArrowLeft") handlePrev();
        else if (e.key === " " || e.code === "Space") {
          e.preventDefault();
          setIsPaused((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, viewMode, handleNext, handlePrev, onClose]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(LIKED_BLOG_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(SAVED_BLOG_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const triggerReaction = (emoji: string) => {
    const batch: FloatingReaction[] = [0, 1, 2].map((i) => ({
      id: reactionCounterRef.current++,
      emoji,
      rightPx: 18 + Math.round(Math.random() * 52),
      delayMs: i * 75,
    }));
    setReactions((prev) => [...prev, ...batch]);
    window.setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id));
      setReactions((prev) => prev.filter((r) => !ids.has(r.id)));
    }, 1450);
  };

  const handleCopyCode = (code: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCodeKey(key);
    window.setTimeout(() => {
      setCopiedCodeKey((cur) => (cur === key ? null : cur));
    }, 1800);
  };

  const handleOpenPostFromArchive = (
    index: number,
    targetMode: "story" | "article"
  ) => {
    setActivePostIndex(index);
    setActiveSlideIndex(0);
    setProgressPercent(0);
    setIsPaused(false);
    setViewMode(targetMode);
  };

  const handleTriggerDeepLink = (action: BlogDeepLink["action"]) => {
    onClose();
    onDeepLink(action);
  };

  if (!isOpen || !mounted || !currentPost) return null;

  const isLiked = !!likedIds[currentPost.id];
  const isSaved = !!savedIds[currentPost.id];
  const savedCount = posts.filter((p) => savedIds[p.id]).length;
  const prevPeekPost = activePostIndex > 0 ? posts[activePostIndex - 1] : null;
  const nextPeekPost =
    activePostIndex + 1 < posts.length ? posts[activePostIndex + 1] : null;

  const filteredArchivePosts = posts.filter((post) => {
    if (archiveFilter === "all") return true;
    if (archiveFilter === "saved") return !!savedIds[post.id];
    return post.tag === archiveFilter;
  });

  // =========================================================================
  // VIEW 1: ARCHIVE INDEX MODAL ("+ Archive" Circle)
  // =========================================================================
  if (viewMode === "archive") {
    return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dev Journal Archive"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl max-h-[88vh] rounded-2xl bg-[#0D0E13] border border-white/[0.14] shadow-2xl overflow-hidden flex flex-col text-[#F4F4F6]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Archive Header */}
          <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#10B981] font-semibold block">
                DEV JOURNAL // INSTAGRAM ARCHIVE
              </span>
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white mt-0.5">
                Engineering Build Notes ({posts.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Dev Journal Archive"
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setArchiveFilter("all")}
              className={`shrink-0 px-3 py-1 rounded-lg font-mono text-xs border transition-colors ${
                archiveFilter === "all"
                  ? "bg-[#F4F4F6] text-[#0A0A0B] border-transparent font-semibold"
                  : "bg-[#14161F] text-zinc-400 border-white/[0.08] hover:text-white"
              }`}
            >
              All ({posts.length})
            </button>
            <button
              type="button"
              onClick={() => setArchiveFilter("saved")}
              className={`shrink-0 px-3 py-1 rounded-lg font-mono text-xs border transition-colors ${
                archiveFilter === "saved"
                  ? "bg-[#10B981] text-[#05140D] border-transparent font-semibold"
                  : "bg-[#14161F] text-zinc-400 border-white/[0.08] hover:text-white"
              }`}
            >
              Saved ({savedCount})
            </button>
            {BLOG_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setArchiveFilter(tag)}
                className={`shrink-0 px-3 py-1 rounded-lg font-mono text-xs border transition-colors ${
                  archiveFilter === tag
                    ? "bg-[#F4F4F6] text-[#0A0A0B] border-transparent font-semibold"
                    : "bg-[#14161F] text-zinc-400 border-white/[0.08] hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Post List */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
            {filteredArchivePosts.length === 0 ? (
              <div className="py-12 text-center font-mono text-xs text-zinc-400">
                No bookmarked engineering notes yet. Tap the bookmark icon inside
                any note to save it here.
              </div>
            ) : (
              filteredArchivePosts.map((post) => {
                const idx = posts.findIndex((p) => p.id === post.id);
                const isRead = !!seenPostIds[post.id];
                const postSaved = !!savedIds[post.id];

                return (
                  <article
                    key={post.id}
                    className="p-4 rounded-xl bg-[#13151E] border border-white/[0.08] hover:border-white/[0.18] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center flex-wrap gap-2 font-mono text-[10px]">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isRead
                              ? "bg-zinc-600"
                              : post.isCloseFriends
                              ? "bg-[#10B981]"
                              : "bg-pink-500"
                          }`}
                        />
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300 uppercase">
                          {post.tag}
                        </span>
                        <span className="text-zinc-500">{post.date}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400">{post.readTime} read</span>
                        {post.isCloseFriends && (
                          <span className="text-[#10B981] font-bold">
                            ★ Close Friends
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {post.headline}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenPostFromArchive(idx, "story")}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1A1D29] hover:bg-[#232738] border border-white/[0.1] font-mono text-[11px] text-zinc-200 transition-colors"
                      >
                        <Layers className="w-3 h-3 text-pink-400" />
                        <span>Story</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenPostFromArchive(idx, "article")
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] font-mono font-semibold text-[11px] transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Article</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSave(post.id)}
                        aria-label={
                          postSaved ? "Remove bookmark" : "Bookmark note"
                        }
                        className={`p-1.5 rounded-lg border transition-colors ${
                          postSaved
                            ? "border-[#10B981]/50 bg-[#10B981]/15 text-[#10B981]"
                            : "border-white/[0.08] bg-[#1A1D29] text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            postSaved ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // =========================================================================
  // VIEW 2: FULL EDITORIAL ARTICLE MODE ("Article" Toggle)
  // =========================================================================
  if (viewMode === "article") {
    return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label={currentPost.headline}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-5 bg-black/82 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-[680px] max-h-[92vh] sm:max-h-[88vh] rounded-2xl bg-[#0D0E13] border border-white/[0.14] shadow-2xl overflow-hidden flex flex-col text-[#F4F4F6]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Reactions Layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden z-40"
          >
            {reactions.map((r) => (
              <span
                key={r.id}
                className="animate-story-reaction absolute text-xl"
                style={{
                  right: `${r.rightPx}px`,
                  bottom: "72px",
                  animationDelay: `${r.delayMs}ms`,
                }}
              >
                {r.emoji}
              </span>
            ))}
          </div>

          {/* Sticky Editorial Header with Story <-> Article Switcher */}
          <div className="px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#0D0E13]/95 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full p-[1.5px] animated-ig-ring shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-900">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-white truncate">
                    {profileData.username}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400 shrink-0" />
                  {currentPost.isCloseFriends && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 font-mono text-[9px] font-bold text-[#10B981]">
                      ★ CLOSE FRIENDS
                    </span>
                  )}
                </div>
                <p className="font-mono text-[10px] text-zinc-400 truncate">
                  {currentPost.tag} · {currentPost.readTime} read ·{" "}
                  {currentPost.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Story <-> Article Mode Switcher */}
              <div className="inline-flex items-center p-0.5 rounded-full bg-[#161822] border border-white/[0.1] font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("story");
                    setProgressPercent(0);
                    setIsPaused(false);
                  }}
                  className="px-2.5 py-1 rounded-full text-zinc-400 hover:text-white transition-colors"
                >
                  Story
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full bg-[#F4F4F6] text-[#0A0A0B] font-bold"
                >
                  Article
                </button>
              </div>

              <button
                type="button"
                onClick={() => setViewMode("archive")}
                title="All Dev Journal Posts"
                aria-label="Open Dev Journal Archive"
                className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close article"
                className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Engineering Essay Body */}
          <div className="px-5 sm:px-8 py-6 overflow-y-auto space-y-6 flex-1">
            {/* Title Block */}
            <header className="space-y-2 pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#10B981] uppercase tracking-wider">
                <span>
                  {String(activePostIndex + 1).padStart(2, "0")} //{" "}
                  {currentPost.tag}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{currentPost.readTime} read</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {currentPost.headline}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                {currentPost.subtitle}
              </p>
            </header>

            {/* Article Sections */}
            {currentPost.articleSections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h2 className="text-sm sm:text-base font-semibold text-white">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-xs sm:text-sm text-zinc-300 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
                {section.code && (
                  <div className="rounded-xl bg-[#08090C] border border-white/[0.1] overflow-hidden">
                    <div className="px-3.5 py-2 border-b border-white/[0.08] bg-[#11131A] flex items-center justify-between font-mono text-[10.5px]">
                      <span className="text-zinc-300">
                        {section.code.filename}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            section.code!.code,
                            `art-${currentPost.id}-${sIdx}`
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 transition-colors"
                      >
                        {copiedCodeKey === `art-${currentPost.id}-${sIdx}` ? (
                          <>
                            <Check className="w-3 h-3 text-[#10B981]" />
                            <span className="text-[#10B981]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3.5 overflow-x-auto text-[11px] sm:text-xs font-mono text-emerald-200/95 leading-relaxed">
                      <code>{section.code.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* Key Engineering Takeaways */}
            <div className="rounded-xl bg-[#13161E] border border-[#10B981]/25 p-4 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#10B981] block">
                KEY ENGINEERING TAKEAWAYS
              </span>
              <ul className="space-y-1.5">
                {currentPost.keyTakeaways.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-zinc-200 leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Portfolio Deep-Link Card */}
            <button
              type="button"
              onClick={() => handleTriggerDeepLink(currentPost.deepLink.action)}
              className="w-full p-3.5 rounded-xl bg-white hover:bg-zinc-100 text-[#0A0A0B] flex items-center justify-between gap-3 transition-all active:scale-[0.99] shadow-md"
            >
              <div className="flex items-center gap-2.5 text-left">
                <Link2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-neutral-500 block">
                    Interactive Proof on Portfolio
                  </span>
                  <span className="text-xs sm:text-sm font-bold">
                    {currentPost.deepLink.label}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Sticky Bottom Engagement & Prev/Next Bar */}
          <div className="px-4 sm:px-6 py-3 border-t border-white/[0.08] bg-[#0D0E13] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleLike(currentPost.id)}
                aria-label={isLiked ? "Unlike note" : "Like note"}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isLiked
                    ? "border-red-500/40 bg-red-500/15 text-red-500"
                    : "border-white/[0.08] bg-[#14161F] text-zinc-300 hover:text-red-400"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                />
              </button>
              <button
                type="button"
                onClick={() => toggleSave(currentPost.id)}
                aria-label={isSaved ? "Remove bookmark" : "Save note"}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isSaved
                    ? "border-[#10B981]/40 bg-[#10B981]/15 text-[#10B981]"
                    : "border-white/[0.08] bg-[#14161F] text-zinc-300 hover:text-white"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                />
              </button>
              <div className="hidden xs:flex items-center gap-1 pl-1">
                {["🔥", "💡", "👏"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => triggerReaction(emoji)}
                    className="w-7 h-7 rounded-full bg-[#14161F] hover:bg-[#1E2230] border border-white/[0.08] text-xs flex items-center justify-center transition-transform active:scale-125"
                    aria-label={`React with ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                disabled={activePostIndex === 0}
                onClick={handlePrev}
                className="px-2.5 py-1.5 rounded-lg bg-[#14161F] hover:bg-[#1E2230] disabled:opacity-35 border border-white/[0.08] text-zinc-200 transition-colors"
              >
                ← Prev
              </button>
              <button
                type="button"
                disabled={activePostIndex === posts.length - 1}
                onClick={handleNext}
                className="px-2.5 py-1.5 rounded-lg bg-[#14161F] hover:bg-[#1E2230] disabled:opacity-35 border border-white/[0.08] text-zinc-200 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // =========================================================================
  // VIEW 3: INSTAGRAM 9:16 STORY CARDS MODE (Default Highlight View)
  // =========================================================================
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentPost.shortTitle} Engineering Story`}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Desktop Left Side-Peek Card (Previous Post) */}
      <div className="hidden lg:flex items-center mr-6">
        {prevPeekPost ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePostIndex((p) => p - 1);
              setActiveSlideIndex(0);
              setProgressPercent(0);
            }}
            className={`w-[210px] h-[340px] rounded-2xl bg-gradient-to-b ${prevPeekPost.accentGradient} border border-white/15 p-4 opacity-55 hover:opacity-90 hover:scale-[1.03] transition-all text-left flex flex-col justify-between shadow-xl`}
          >
            <span className="font-mono text-[10px] text-zinc-300 uppercase">
              ← Previous Note
            </span>
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[9px] text-emerald-300 uppercase">
                {prevPeekPost.tag}
              </span>
              <div className="text-sm font-bold text-white leading-snug line-clamp-3">
                {prevPeekPost.headline}
              </div>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              {prevPeekPost.readTime} read
            </span>
          </button>
        ) : (
          <div className="w-[210px]" />
        )}
      </div>

      {/* Desktop Left Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white mr-4 transition-all active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main 9:16 Instagram Story-Blog Stage */}
      <div
        className="relative w-full h-full sm:h-[88vh] sm:max-h-[820px] sm:w-[420px] md:w-[435px] bg-[#0B0C10] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border sm:border-white/15"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartYRef.current = e.touches[0].clientY;
          setIsPaused(true);
        }}
        onTouchEnd={(e) => {
          setIsPaused(false);
          if (touchStartYRef.current !== null) {
            const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
            if (diffY > 120) onClose();
            touchStartYRef.current = null;
          }
        }}
      >
        {/* Per-Post Dynamic Atmospheric Background */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-b ${currentPost.accentGradient} z-0 pointer-events-none`}
        />

        {/* Floating IG Reactions Layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden z-40"
        >
          {reactions.map((r) => (
            <span
              key={r.id}
              className="animate-story-reaction absolute text-2xl"
              style={{
                right: `${r.rightPx}px`,
                bottom: "76px",
                animationDelay: `${r.delayMs}ms`,
              }}
            >
              {r.emoji}
            </span>
          ))}
        </div>

        {/* Top Bar: Progress Segments + Author Header + Story/Article Switcher */}
        <div className="relative z-30 flex flex-col bg-gradient-to-b from-black/75 via-black/35 to-transparent">
          <HighlightProgress
            totalStories={currentPost.slides.length}
            activeStoryIndex={activeSlideIndex}
            progressPercent={progressPercent}
          />

          <div className="flex items-center justify-between gap-2 px-3.5 py-2 text-white">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-8 h-8 rounded-full p-[1.5px] shrink-0 ${
                  currentPost.isCloseFriends ? "bg-[#10B981]" : "bg-ig-gradient"
                }`}
              >
                <div className="w-full h-full bg-slate-900 rounded-full overflow-hidden relative">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0 leading-tight">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-white truncate">
                    {profileData.username}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400 shrink-0" />
                  {currentPost.isCloseFriends ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#10B981] text-[#05140D] font-mono text-[9px] font-black">
                      ★ CLOSE FRIENDS
                    </span>
                  ) : (
                    <span className="text-white/70 text-[11px] truncate">
                      · {currentPost.shortTitle}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-white/60">
                  {currentPost.tag} · {currentPost.readTime} read
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* 1-Click Switch to Full Editorial Article */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode("article");
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 font-mono text-[10px] font-semibold text-white transition-colors"
                title="Switch to Full Editorial Article View"
              >
                <BookOpen className="w-3 h-3" />
                <span>Article</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused((prev) => !prev);
                }}
                className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label={isPaused ? "Resume story" : "Pause story"}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Pause className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Story Card Content */}
        <div
          className="relative z-20 flex-1 overflow-y-auto no-scrollbar px-5 py-3 flex flex-col justify-center gap-3.5 text-white"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">
              {currentSlide.kicker}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug text-white drop-shadow">
              {currentSlide.heading}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {currentSlide.body}
            </p>
          </div>

          {currentSlide.image && (
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/50 border border-white/15 shadow-lg">
              <Image
                src={currentSlide.image}
                alt={currentSlide.heading}
                fill
                sizes="380px"
                className="object-contain p-2"
              />
            </div>
          )}

          {currentSlide.bullets && (
            <div className="space-y-1.5 rounded-2xl bg-black/35 border border-white/10 p-3.5 backdrop-blur-md">
              {currentSlide.bullets.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-white/90 leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}

          {currentSlide.codeSnippet && (
            <div
              className="relative z-30 rounded-xl bg-[#07080B]/95 border border-white/15 overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1.5 border-b border-white/10 bg-white/[0.04] flex items-center justify-between font-mono text-[10px]">
                <span className="text-zinc-300">
                  {currentSlide.codeSnippet.filename}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyCode(
                      currentSlide.codeSnippet!.code,
                      `slide-${currentPost.id}-${activeSlideIndex}`
                    )
                  }
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCodeKey ===
                  `slide-${currentPost.id}-${activeSlideIndex}` ? (
                    <>
                      <Check className="w-3 h-3 text-[#10B981]" />
                      <span className="text-[#10B981]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-[10.5px] font-mono text-emerald-200/95 leading-relaxed">
                <code>{currentSlide.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {currentSlide.quote && (
            <blockquote className="pl-3 border-l-2 border-[#10B981] italic text-xs sm:text-sm text-emerald-200/95">
              &ldquo;{currentSlide.quote}&rdquo;
            </blockquote>
          )}

          {/* Authentic Instagram White-Pill Link Sticker */}
          <div className="pt-1 flex flex-wrap items-center gap-2 relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleTriggerDeepLink(currentPost.deepLink.action);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-zinc-100 text-[#0A0A0B] font-bold text-xs shadow-lg transition-transform active:scale-95"
            >
              <Link2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentPost.deepLink.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode("article");
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-semibold backdrop-blur-md transition-colors"
            >
              <span>Read Full Essay →</span>
            </button>
          </div>
        </div>

        {/* Invisible Tap Zones (Left 24% & Right 24%, strictly behind interactive controls) */}
        <div
          onClick={handlePrev}
          className="absolute top-20 bottom-20 left-0 w-[22%] z-10 cursor-pointer"
          aria-label="Previous slide zone"
        />
        <div
          onClick={handleNext}
          className="absolute top-20 bottom-20 right-0 w-[22%] z-10 cursor-pointer"
          aria-label="Next slide zone"
        />

        {/* Authentic Instagram Story Bottom Bar */}
        <div className="relative z-30 px-3.5 py-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode("archive");
            }}
            className="flex-1 text-left px-3.5 py-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/15 backdrop-blur-md text-xs text-white/85 font-medium truncate transition-colors"
          >
            Browse all {posts.length} Dev Notes…
          </button>

          {/* Quick Floating Emoji Reactions */}
          <div className="flex items-center gap-1">
            {["🔥", "💡", "👏"].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerReaction(emoji);
                }}
                aria-label={`React with ${emoji}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm flex items-center justify-center transition-transform active:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(currentPost.id);
            }}
            aria-label={isLiked ? "Unlike note" : "Like note"}
            className={`p-2 rounded-full transition-transform active:scale-125 ${
              isLiked ? "text-red-500" : "text-white hover:text-red-400"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(currentPost.id);
            }}
            aria-label={isSaved ? "Remove bookmark" : "Bookmark note"}
            className={`p-2 rounded-full transition-transform active:scale-125 ${
              isSaved ? "text-[#10B981]" : "text-white hover:text-emerald-300"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Desktop Right Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white ml-4 transition-all active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Desktop Right Side-Peek Card (Next Post) */}
      <div className="hidden lg:flex items-center ml-6">
        {nextPeekPost ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActivePostIndex((p) => p + 1);
              setActiveSlideIndex(0);
              setProgressPercent(0);
            }}
            className={`w-[210px] h-[340px] rounded-2xl bg-gradient-to-b ${nextPeekPost.accentGradient} border border-white/15 p-4 opacity-55 hover:opacity-90 hover:scale-[1.03] transition-all text-left flex flex-col justify-between shadow-xl`}
          >
            <span className="font-mono text-[10px] text-zinc-300 uppercase">
              Next Note →
            </span>
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[9px] text-emerald-300 uppercase">
                {nextPeekPost.tag}
              </span>
              <div className="text-sm font-bold text-white leading-snug line-clamp-3">
                {nextPeekPost.headline}
              </div>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              {nextPeekPost.readTime} read
            </span>
          </button>
        ) : (
          <div className="w-[210px]" />
        )}
      </div>
    </div>,
    document.body
  );
};
