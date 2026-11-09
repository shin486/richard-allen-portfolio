"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Tag,
  Copy,
  Check,
  Maximize2,
  X,
  ArrowUpRight,
  Keyboard,
  Sparkles,
  FileCheck2,
  MapPin,
  UserCheck,
} from "lucide-react";
import { certificatesData, CertificateImageTag } from "@/data/certificates";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";

interface CertificateGridProps {
  onSelectProject?: (projectId: string) => void;
}

export const CertificateGrid: React.FC<CertificateGridProps> = ({
  onSelectProject,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"scan" | "dossier">("scan");
  const [showTags, setShowTags] = useState(true);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeKeyId, setActiveKeyId] = useState<string | null>(null);

  // 3D Holographic Tilt & Glare state for the Certificate Scan stage
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{
    rx: number;
    ry: number;
    glareX: number;
    glareY: number;
    active: boolean;
  }>({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [heartPopId, setHeartPopId] = useState<string | null>(null);
  const heartPopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ id: string; time: number }>({ id: "", time: 0 });

  const totalSlides = certificatesData.length;
  const safeSlideIndex =
    totalSlides > 0 ? Math.min(currentSlide, totalSlides - 1) : 0;
  const activeCert = certificatesData[safeSlideIndex];

  // Dispatch 3D Mechanical Keyboard highlight event
  const triggerKeyboardKey = useCallback((techId: string) => {
    setActiveKeyId(techId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shin-tech-hover", {
          detail: { tech: techId },
        })
      );
    }
  }, []);

  // Automatically sync the primary keycap on the 3D keyboard when switching certificates
  useEffect(() => {
    if (!activeCert || !activeCert.keyboardKeys.length) return;
    const primaryKey = activeCert.keyboardKeys[0].id;
    setActiveKeyId(primaryKey);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shin-tech-hover", {
          detail: { tech: primaryKey },
        })
      );
    }
  }, [activeCert]);

  const triggerDoubleTapHeart = useCallback((id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: true }));
    setHeartPopId(id);
    if (heartPopTimerRef.current) {
      clearTimeout(heartPopTimerRef.current);
    }
    heartPopTimerRef.current = setTimeout(() => {
      setHeartPopId(null);
    }, 920);
  }, []);

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

  // Keyboard navigation when Full-Screen Lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goNext, goPrev]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCredentialId = (uuid: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(uuid).catch(() => {});
    }
    setCopiedId(uuid);
    setTimeout(() => {
      setCopiedId((prev) => (prev === uuid ? null : prev));
    }, 2000);
  };

  const handleTagClick = (tag: CertificateImageTag, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tag.type === "serial" && activeCert.credentialId) {
      handleCopyCredentialId(activeCert.credentialId);
      return;
    }
    if (tag.type === "project" && tag.projectId) {
      if (onSelectProject) {
        onSelectProject(tag.projectId);
      } else {
        setViewMode("dossier");
      }
      return;
    }
    setViewMode("dossier");
  };

  const handleMouseMoveStage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 9; // -4.5deg to +4.5deg
    const rx = (0.5 - py) * 7; // -3.5deg to +3.5deg
    setTilt({
      rx,
      ry,
      glareX: Math.round(px * 100),
      glareY: Math.round(py * 100),
      active: true,
    });
  };

  const handleMouseLeaveStage = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });
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
      const now = Date.now();
      if (
        lastTapRef.current.id === activeCert.id &&
        now - lastTapRef.current.time < 320 &&
        now - lastTapRef.current.time > 40
      ) {
        triggerDoubleTapHeart(activeCert.id);
        lastTapRef.current = { id: "", time: 0 };
      } else {
        lastTapRef.current = { id: activeCert.id, time: now };
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
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
                Verified Credentials Vault
              </h2>
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                5 AUTHENTICATED
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-zinc-400">
              Interactive holographic scans, tagged signatories &amp; production proof of work
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-500 dark:text-zinc-400 font-mono">
          CREDENTIAL{" "}
          <strong className="text-neutral-900 dark:text-zinc-100">
            0{safeSlideIndex + 1}
          </strong>{" "}
          / 0{totalSlides}
        </div>
      </div>

      <div className="w-full">
        {/* Quick Certificate Jump Pills (Single horizontal swipe rail on mobile, wraps on sm+) */}
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
                onClick={() => setCurrentSlide(index)}
                onMouseEnter={() => {
                  if (cert.keyboardKeys[0]) {
                    triggerKeyboardKey(cert.keyboardKeys[0].id);
                  }
                }}
                data-note={`Verified credential: ${cert.title} (${cert.issuer} · ${cert.issuedDate}).`}
                role="tab"
                aria-selected={isCurrent}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isCurrent
                    ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100 shadow-sm"
                    : "bg-white dark:bg-[#111116] text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-900 dark:hover:text-zinc-200"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cert.accentColor }}
                />
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

        {/* Main Instagram Studio Credential Frame */}
        <article className="milled-card bg-white dark:bg-[#111116] border-y sm:border border-neutral-200 dark:border-zinc-800 sm:border-t-neutral-300/80 dark:sm:border-t-zinc-700/70 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden transition-all">
          {/* Instagram Post Header with Dual-View Toggle (Document Scan | Verified Dossier) */}
          <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 border-b border-neutral-100 dark:border-zinc-800/80">
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
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 truncate">
                    {profileData.username}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 flex-shrink-0" />
                  <span className="hidden sm:inline text-neutral-300 dark:text-zinc-700">
                    •
                  </span>
                  <span className="hidden sm:inline text-xs font-medium text-neutral-500 dark:text-zinc-400 truncate">
                    {activeCert.issuer}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-500 dark:text-zinc-400 truncate leading-tight">
                  <span className="sm:hidden truncate">{activeCert.issuer}</span>
                  <span className="hidden sm:inline font-mono text-emerald-600 dark:text-emerald-400">
                    {activeCert.domain}
                  </span>
                  <span>•</span>
                  <span className="font-mono shrink-0">{activeCert.issuedDate}</span>
                </div>
              </div>
            </div>

            {/* Dual-Mode Segmented Pill (Document Scan | Verified Dossier) + Slide Counter */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="relative grid grid-cols-2 items-center bg-neutral-100 dark:bg-zinc-800 p-0.5 rounded-full border border-neutral-200 dark:border-zinc-700/60 text-xs min-w-[148px] sm:min-w-[196px]">
                <span
                  aria-hidden="true"
                  className={`spring-pill absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full shadow-xs pointer-events-none ${
                    viewMode === "scan"
                      ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "bg-white dark:bg-zinc-700"
                  }`}
                  style={{
                    transform:
                      viewMode === "scan"
                        ? "translateX(2px)"
                        : "translateX(calc(100% + 2px))",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setViewMode("scan")}
                  data-note="Holographic Document Scan with interactive Instagram verification tags."
                  className={`relative z-10 px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold transition-colors duration-200 flex items-center justify-center gap-1 whitespace-nowrap ${
                    viewMode === "scan"
                      ? "text-white dark:text-zinc-950"
                      : "text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span className="hidden sm:inline">Document Scan</span>
                  <span className="sm:hidden">Scan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("dossier")}
                  data-note="Flip to Verified Dossier for signatories, UUID serials, and project proof."
                  className={`relative z-10 px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-semibold transition-colors duration-200 flex items-center justify-center gap-1 whitespace-nowrap ${
                    viewMode === "dossier"
                      ? "text-neutral-900 dark:text-white font-bold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="hidden sm:inline">Verified Dossier</span>
                  <span className="sm:hidden">Dossier</span>
                </button>
              </div>

              {/* Slide Counter Badge */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900/90 dark:bg-zinc-800 text-white text-xs font-semibold tabular-nums tracking-wider">
                <span>
                  {safeSlideIndex + 1} / {totalSlides}
                </span>
              </div>
            </div>
          </div>

          {/* STAGE VIEWPORT: Document Scan (3D Holographic + Instagram Tags) vs Verified Dossier */}
          {viewMode === "scan" ? (
            <div
              ref={stageRef}
              onMouseMove={handleMouseMoveStage}
              onMouseLeave={handleMouseLeaveStage}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={() => triggerDoubleTapHeart(activeCert.id)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral-950 overflow-hidden group select-none"
              style={{ perspective: "1200px" }}
            >
              {/* Ambient Accent Backlight behind the certificate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25 pointer-events-none transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, ${activeCert.accentColor}66 0%, transparent 65%)`,
                }}
              />

              {/* Instagram Big Heart Double-Tap Pop Overlay */}
              {heartPopId === activeCert.id && (
                <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
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

              {/* 3D Tilted Certificate Slab Container */}
              <div
                className="w-full h-full transition-transform duration-200 ease-out"
                style={{
                  transform: tilt.active
                    ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.01)`
                    : "rotateX(0deg) rotateY(0deg) scale(1)",
                  transformStyle: "preserve-3d",
                }}
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
                      onClick={() => setShowTags((prev) => !prev)}
                      className="w-full h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center p-2.5 sm:p-5 cursor-pointer"
                    >
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] ring-1 ring-white/15">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          className="object-contain bg-white"
                          priority={cert.id === "python-essentials-1"}
                        />

                        {/* Holographic Collector Foil Sheen & Specular Glare Overlay */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                          style={{
                            opacity: tilt.active ? 0.32 : 0.12,
                            background: `linear-gradient(125deg, transparent 20%, rgba(56,189,248,0.22) 38%, rgba(236,72,153,0.22) 50%, rgba(16,185,129,0.22) 62%, transparent 80%), radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.55) 0%, transparent 50%)`,
                            mixBlendMode: "overlay",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* INSTAGRAM "TAP TO VIEW TAGS" FLOATING PINS OVERLAY */}
                {showTags && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {activeCert.imageTags.map((tag, idx) => {
                      const isSerial = tag.type === "serial";
                      const isProject = tag.type === "project";
                      const isCopied =
                        isSerial &&
                        activeCert.credentialId &&
                        copiedId === activeCert.credentialId;

                      // Clamp horizontal position so edge tags never clip off-screen
                      const clampedX = Math.max(16, Math.min(84, tag.x));

                      return (
                        <button
                          key={`${activeCert.id}-tag-${idx}`}
                          type="button"
                          onClick={(e) => handleTagClick(tag, e)}
                          data-note={`${tag.handle} — ${tag.sublabel}`}
                          style={{
                            left: `${clampedX}%`,
                            top: `${tag.y}%`,
                          }}
                          className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group/tag flex flex-col items-center transition-all duration-200 hover:scale-105 hover:z-30 focus:outline-none ${
                            idx > 2 ? "hidden sm:flex" : "flex"
                          }`}
                        >
                          {/* Little upward Instagram pointer triangle */}
                          <span
                            aria-hidden="true"
                            className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] ${
                              isProject
                                ? "border-b-emerald-600/95"
                                : "border-b-black/85"
                            }`}
                          />

                          {/* Tag Bubble Body */}
                          <div
                            className={`px-2.5 py-1 rounded-lg backdrop-blur-md shadow-lg border text-left transition-colors ${
                              isProject
                                ? "bg-emerald-950/90 border-emerald-400/50 text-white hover:bg-emerald-900"
                                : isSerial
                                ? "bg-zinc-900/90 border-amber-400/40 text-white hover:border-amber-400"
                                : "bg-black/85 border-white/20 text-white hover:border-white/40"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                              {isProject && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              )}
                              {isSerial && (
                                <>
                                  {isCopied ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-amber-400" />
                                  )}
                                </>
                              )}
                              <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">
                                {isCopied ? "Copied Verified UUID!" : tag.handle}
                              </span>
                              {isProject && (
                                <ArrowUpRight className="w-3 h-3 text-emerald-300" />
                              )}
                            </div>
                            <p className="hidden sm:block text-[9.5px] text-zinc-300/90 font-mono leading-tight">
                              {tag.sublabel}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Top-Left Domain & Holographic Status Pill */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md backdrop-blur-md border border-white/20"
                  style={{ backgroundColor: `${activeCert.accentColor}dd` }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{activeCert.domain}</span>
                </span>
              </div>

              {/* Top-Right Full-Screen Zoom Lightbox Trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                data-note="Open full-screen high-resolution certificate scan."
                className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95"
                title="Inspect full-screen certificate scan"
              >
                <Maximize2 className="w-3 h-3 text-ig-orange" />
                <span className="hidden xs:inline">Inspect Scan</span>
              </button>

              {/* Previous Slide Arrow Button */}
              {safeSlideIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  data-note="Previous certification slide."
                  aria-label="Previous certificate"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
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
                  data-note="Next certification slide."
                  aria-label="Next certificate"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Bottom-Left Authentic Instagram "Tap to View Tags" Toggle Button */}
              <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTags((prev) => !prev);
                  }}
                  data-note={
                    showTags
                      ? "Hide verification tags on this certificate."
                      : "Show interactive verification tags (Signatories, UUID & Applied Projects)."
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border transition-all shadow-md ${
                    showTags
                      ? "bg-white text-neutral-950 border-white"
                      : "bg-black/75 text-white border-white/20 hover:bg-black/90"
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{showTags ? "Hide Tags" : "View Tags (5)"}</span>
                </button>
              </div>

              {/* Bottom-Right Flip to Verified Dossier CTA */}
              <div className="absolute bottom-3 right-3 z-30">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("dossier");
                  }}
                  data-note="Open Verified Dossier to inspect signatories, competencies, and project proof."
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-md transition-all"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify &amp; Proof →</span>
                </button>
              </div>
            </div>
          ) : (
            /* MODE 2: VERIFIED DOSSIER & PROOF OF APPLICATION SPEC SHEET */
            <div className="w-full bg-neutral-50/90 dark:bg-[#0c0c12] p-4 sm:p-6 border-b border-neutral-200/80 dark:border-zinc-800 space-y-4 animate-fade-in">
              {/* Top Cryptographic Verification Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-[#13131B] border border-neutral-200 dark:border-zinc-800 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        AUTHENTICATED CREDENTIAL
                      </span>
                      <span className="text-neutral-300 dark:text-zinc-700">•</span>
                      <span className="font-mono text-[11px] text-neutral-600 dark:text-zinc-300">
                        Issued to: <strong>{activeCert.awardedTo}</strong>
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400 font-mono">
                      Completion Date: {activeCert.issuedDate}
                      {activeCert.venue ? ` · ${activeCert.venue}` : ""}
                    </p>
                  </div>
                </div>

                {/* Copyable UUID Serial Badge (if printed on certificate) or Thumbnail Preview */}
                <div className="flex items-center gap-2">
                  {activeCert.credentialId && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyCredentialId(activeCert.credentialId!)
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700/80 hover:border-amber-500/60 text-[11px] font-mono text-neutral-800 dark:text-zinc-200 transition-colors"
                      title="Copy official certificate UUID"
                    >
                      {copiedId === activeCert.credentialId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            Copied UUID
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-500" />
                          <span className="truncate max-w-[160px] sm:max-w-none">
                            ID: {activeCert.credentialId}
                          </span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 text-[11px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>View Scan</span>
                  </button>
                </div>
              </div>

              {/* 2-Column Issuing Authority & Signatories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Column 1: Issuing Institutions */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#13131B] border border-neutral-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                    <Building2 className="w-3.5 h-3.5 text-ig-orange" />
                    <span>Issuing Authority</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                      {activeCert.issuer}
                    </p>
                    {activeCert.coIssuer && (
                      <p className="text-xs text-neutral-600 dark:text-zinc-400 mt-0.5">
                        in partnership with{" "}
                        <span className="font-semibold text-neutral-800 dark:text-zinc-200">
                          {activeCert.coIssuer}
                        </span>
                      </p>
                    )}
                  </div>
                  {activeCert.venue && (
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-zinc-400 pt-1">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{activeCert.venue}</span>
                    </div>
                  )}
                </div>

                {/* Column 2: Authenticated Signatories */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#13131B] border border-neutral-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Official Signatories</span>
                  </div>
                  <div className="space-y-2">
                    {activeCert.signatories.map((sig) => (
                      <div key={sig.name} className="leading-snug">
                        <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                          {sig.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                          {sig.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Engineering Competencies */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#13131B] border border-neutral-200 dark:border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                    Validated Technical Competencies
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300">
                    {activeCert.domain}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {activeCert.competencies.map((comp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-neutral-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proof of Application in Production (Clickable Portfolio Linkages) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-ig-pink" />
                    <span>Proof of Application in Production Builds</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500">
                    Click to jump to project
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCert.appliedProjects.map((app) => (
                    <button
                      key={app.projectId}
                      type="button"
                      onClick={() => onSelectProject?.(app.projectId)}
                      className="group text-left p-3 rounded-xl bg-white dark:bg-[#13131B] border border-neutral-200 dark:border-zinc-800 hover:border-neutral-400 dark:hover:border-zinc-600 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                              {app.projectTitle}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                              {app.handle}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                        </div>
                        <p className="text-[11px] text-neutral-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {app.applicationSummary}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instagram Action Bar, Pagination Dots & 3D Keyboard Sync Bar */}
          <div className="px-4 sm:px-6 pt-3.5 pb-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800/80">
              {/* Left Action Icons */}
              <div className="flex items-center gap-3.5 text-neutral-700 dark:text-zinc-300">
                <button
                  onClick={() => toggleLike(activeCert.id)}
                  data-note={
                    likedIds[activeCert.id]
                      ? "Certificate liked."
                      : "Like this credential (or double-tap the certificate)."
                  }
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

                <button
                  type="button"
                  onClick={() => {
                    if (viewMode !== "scan") setViewMode("scan");
                    setShowTags((prev) => !prev);
                  }}
                  data-note="Toggle Instagram verification tags on the certificate."
                  className={`focus:outline-none transition-colors ${
                    showTags && viewMode === "scan"
                      ? "text-ig-orange"
                      : "hover:text-neutral-900 dark:hover:text-white"
                  }`}
                  aria-label="Toggle certificate verification tags"
                  title="Toggle verification tags"
                >
                  <Tag className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setViewMode((prev) =>
                      prev === "scan" ? "dossier" : "scan"
                    )
                  }
                  data-note="Switch between Holographic Scan and Verified Engineering Dossier."
                  className={`focus:outline-none transition-colors ${
                    viewMode === "dossier"
                      ? "text-emerald-500"
                      : "hover:text-neutral-900 dark:hover:text-white"
                  }`}
                  aria-label="Toggle Verified Dossier view"
                  title="Toggle Verified Dossier view"
                >
                  <ShieldCheck className="w-5 h-5" />
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
                data-note={
                  savedIds[activeCert.id]
                    ? "Credential bookmarked."
                    : "Bookmark this certification."
                }
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

            {/* Dynamic Certificate Caption & Metadata */}
            <div className="mt-3.5 space-y-3">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                    {profileData.username}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100">
                    {activeCert.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-neutral-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 dark:text-zinc-300">
                    <Building2 className="w-3.5 h-3.5 text-ig-orange shrink-0" />
                    <span>
                      {activeCert.issuer}
                      {activeCert.coIssuer ? ` × ${activeCert.coIssuer}` : ""}
                    </span>
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    {activeCert.issuedDate}
                  </span>
                </div>
              </div>

              {/* 3D Mechanical Keyboard Synchronization & Applied Project Bar */}
              <div className="p-3 rounded-xl bg-neutral-50/80 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                    <Keyboard className="w-3.5 h-3.5 text-ig-pink" />
                    <span>3D Keyboard Sync:</span>
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeCert.keyboardKeys.map((keyItem) => {
                      const isKeyActive = activeKeyId === keyItem.id;
                      return (
                        <button
                          key={keyItem.id}
                          type="button"
                          onMouseEnter={() => triggerKeyboardKey(keyItem.id)}
                          onClick={() => triggerKeyboardKey(keyItem.id)}
                          data-note={`Trigger ${keyItem.label} keycap on the 3D Mechanical Keyboard.`}
                          className={`px-2 py-1 rounded-md text-[11px] font-mono font-semibold border transition-all flex items-center gap-1 shadow-2xs active:translate-y-0.5 ${
                            isKeyActive
                              ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-zinc-100"
                              : "bg-white dark:bg-zinc-800/90 text-neutral-700 dark:text-zinc-200 border-neutral-200 dark:border-zinc-700 hover:border-ig-pink"
                          }`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: activeCert.accentColor }}
                          />
                          <span>{keyItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Applied Project Jump Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                    Applied in:
                  </span>
                  {activeCert.appliedProjects.map((proj) => (
                    <button
                      key={proj.projectId}
                      type="button"
                      onClick={() => onSelectProject?.(proj.projectId)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors"
                    >
                      <span>{proj.projectTitle}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Full-Screen High-Res Certificate Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full-screen certificate view: ${activeCert.title}`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {activeCert.title}
                  </h3>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono truncate">
                  {activeCert.issuer}
                  {activeCert.coIssuer ? ` × ${activeCert.coIssuer}` : ""} ·{" "}
                  {activeCert.issuedDate}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeCert.credentialId && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyCredentialId(activeCert.credentialId!)
                    }
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-mono border border-zinc-700 transition-colors"
                  >
                    {copiedId === activeCert.credentialId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied UUID</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copy Cert ID</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Close full-screen preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Res Certificate Canvas */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[480px] bg-black flex items-center justify-center p-3 sm:p-6">
              <div className="relative w-full h-[55dvh] sm:h-[66dvh]">
                <Image
                  src={activeCert.image}
                  alt={activeCert.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {safeSlideIndex > 0 && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous certificate"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {safeSlideIndex < totalSlides - 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next certificate"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-zinc-300">
                  Signatories:{" "}
                  {activeCert.signatories.map((s) => s.name).join(" • ")}
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                Slide {safeSlideIndex + 1} of {totalSlides}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
