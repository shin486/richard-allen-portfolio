"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import {
  X,
  RotateCw,
  QrCode,
  Copy,
  Check,
  FileText,
  UserPlus,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { certificatesData } from "@/data/certificates";
import { skillsData } from "@/data/skills";
import { VerifiedBadge } from "./VerifiedBadge";
import {
  AVATAR_MODES,
  AvatarMode,
  InteractiveAvatarCanvas,
} from "./InteractiveAvatarCanvas";

interface DeveloperIdBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarMode: AvatarMode;
  onSelectAvatarMode: (mode: AvatarMode) => void;
  onSwitchToRecruiter?: () => void;
}

function getManilaClock(): { time: string; isDaytime: boolean; periodLabel: string } {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  const hour24 = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      hour12: false,
    }).format(now)
  );

  const isDaytime = hour24 >= 7 && hour24 <= 23;
  const periodLabel = isDaytime
    ? "ACTIVE · OJT READY"
    : "ASYNC · REPLIES IN AM";

  return { time, isDaytime, periodLabel };
}

function buildVCardContent(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Liman;Richard Allen;;;",
    `FN:${profileData.name}`,
    `NICKNAME:@${profileData.username}`,
    `ORG:${profileData.educationSummary.school}`,
    `TITLE:${profileData.title}`,
    `EMAIL;TYPE=INTERNET,WORK:${profileData.socials.email}`,
    ...(profileData.socials.phone
      ? [`TEL;TYPE=CELL:${profileData.socials.phone}`]
      : []),
    `URL;TYPE=GitHub:${profileData.socials.github}`,
    `URL;TYPE=LinkedIn:${profileData.socials.linkedin}`,
    `ADR;TYPE=HOME:;;Lipa City;Batangas;;Philippines`,
    "NOTE:4th-year BS Information Technology at De La Salle Lipa (Graduating June 2027). Open for 500+ hr OJT & Full-Stack / Mobile Developer roles.",
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export const DeveloperIdBadgeModal: React.FC<DeveloperIdBadgeModalProps> = ({
  isOpen,
  onClose,
  avatarMode,
  onSelectAvatarMode,
  onSwitchToRecruiter,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrTarget, setQrTarget] = useState<"resume" | "portfolio">("resume");
  const [qrSvg, setQrSvg] = useState<string>("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [vcardDownloaded, setVcardDownloaded] = useState(false);
  const [clock, setClock] = useState(() => getManilaClock());

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3D pointer tilt & holographic foil sheen
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  const totalTechCount =
    skillsData.reduce((acc, cat) => acc + cat.skills.length, 0) || 32;

  // Lock body scroll & handle Escape key while open
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

  // Reset flip state when closing
  useEffect(() => {
    if (!isOpen) {
      setIsFlipped(false);
      setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
    }
  }, [isOpen]);

  // Tick Lipa City (Asia/Manila) clock every second while modal is open
  useEffect(() => {
    if (!isOpen) return;
    setClock(getManilaClock());
    const interval = window.setInterval(() => {
      setClock(getManilaClock());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Generate real ISO-18004 scannable SVG QR Code
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    const origin =
      typeof window !== "undefined" &&
      window.location.origin &&
      !window.location.origin.includes("localhost")
        ? window.location.origin
        : typeof window !== "undefined"
        ? window.location.origin
        : "https://richard-allen-portfolio.vercel.app";

    const targetUrl =
      qrTarget === "resume" ? `${origin}${profileData.socials.resumeUrl}` : origin;

    QRCode.toString(targetUrl, {
      type: "svg",
      margin: 1,
      width: 176,
      color: {
        dark: "#0A0A0B",
        light: "#FFFFFF",
      },
    })
      .then((svg) => {
        if (!cancelled) setQrSvg(svg);
      })
      .catch(() => {
        if (!cancelled) setQrSvg("");
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, qrTarget]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = cardWrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 18;
    const rx = (0.5 - py) * 14;
    setTilt({
      rx,
      ry,
      mx: Math.round(px * 100),
      my: Math.round(py * 100),
      active: true,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
  }, []);

  const handleCopyEmail = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profileData.socials.email).catch(() => {});
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2000);
  }, []);

  const handleDownloadVCard = useCallback(() => {
    const vcf = buildVCardContent();
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Richard_Allen_Liman.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setVcardDownloaded(true);
    window.setTimeout(() => setVcardDownloaded(false), 2200);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto overscroll-contain animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="3D Holographic Developer ID Badge"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[385px] my-auto flex flex-col items-center gap-2.5 sm:gap-3 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div className="w-full flex items-center justify-between px-1">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Holographic Dev ID · NFC Pass</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Developer ID Badge"
            className="w-8 h-8 rounded-full bg-zinc-900/95 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Tilt + Flip Holographic Badge Container */}
        <div
          ref={cardWrapperRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="holo-perspective w-full select-none"
        >
          <div
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.active
                ? "transform 0.08s ease-out"
                : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              transformStyle: "preserve-3d",
            }}
            className="w-full"
          >
            <div
              className={`holo-flip-inner relative w-full min-h-[505px] sm:min-h-[535px] ${
                isFlipped ? "is-flipped" : ""
              }`}
            >
              {/* ============================================================
                  FRONT FACE: IDENTITY, LIVE CANVAS PORTRAIT & PH TELEMETRY
                 ============================================================ */}
              <div
                className={`holo-face absolute inset-0 rounded-[24px] bg-[#0D0E12] border border-white/[0.14] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.16)] overflow-hidden flex flex-col justify-between p-4 sm:p-5 ${
                  isFlipped ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                {/* Cursor-reactive holographic rainbow sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: tilt.active ? 0.9 : 0.32,
                    background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(16,185,129,0.18) 0%, rgba(221,42,123,0.14) 30%, rgba(81,91,212,0.12) 55%, transparent 78%)`,
                  }}
                />

                {/* Top Lanyard Slot + Pass Header */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    aria-hidden="true"
                    className="w-14 h-2.5 rounded-full bg-[#060608] border border-white/[0.14] shadow-inner mb-3"
                  />
                  <div className="w-full flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-zinc-400">
                    <span>DLSL · BSIT CLASS 2027</span>
                    <span className="text-[#10B981] font-semibold">
                      PASS // SHIN-486
                    </span>
                  </div>
                </div>

                {/* Center Portrait + Interactive 4-Mode Lens Switcher */}
                <div className="relative z-10 flex flex-col items-center text-center my-2">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = AVATAR_MODES.findIndex(
                        (m) => m.id === avatarMode
                      );
                      onSelectAvatarMode(
                        AVATAR_MODES[(idx + 1) % AVATAR_MODES.length].id
                      );
                    }}
                    title="Click portrait to cycle live Canvas lenses"
                    className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] animated-ig-ring shadow-lg transition-transform hover:scale-[1.03] active:scale-95 focus:outline-none"
                  >
                    <div className="w-full h-full rounded-full bg-[#0D0E12] p-[2.5px]">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <InteractiveAvatarCanvas
                          mode={avatarMode}
                          sizes="112px"
                          highRes
                        />
                      </div>
                    </div>
                  </button>

                  {/* 4-Lens Switcher Pill */}
                  <div className="mt-2.5 inline-flex items-center gap-1 p-1 rounded-full bg-[#15171E] border border-white/[0.08]">
                    {AVATAR_MODES.map((m) => {
                      const active = avatarMode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => onSelectAvatarMode(m.id)}
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-wider transition-all ${
                            active
                              ? "bg-[#10B981] text-[#050807] font-bold shadow-sm"
                              : "text-zinc-400 hover:text-zinc-100"
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Identity Block */}
                  <div className="mt-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <h2 className="text-lg font-bold tracking-tight text-[#F4F4F6]">
                        {profileData.name}
                      </h2>
                      <VerifiedBadge className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {profileData.title} ·{" "}
                      <span className="font-mono text-zinc-300">
                        @{profileData.username}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Live Lipa City Telemetry Box */}
                <div className="relative z-10 rounded-2xl bg-[#13151B] border border-white/[0.08] p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#10B981]/12 border border-[#10B981]/30 font-mono text-[10px] font-semibold text-[#10B981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      {clock.periodLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#F4F4F6] tabular-nums">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {clock.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-white/[0.06] text-[11px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        <span>Location</span>
                      </span>
                      <span className="font-mono text-zinc-200">
                        Lipa City, PH (GMT+8)
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-zinc-400">
                        <Sparkles className="w-3 h-3 text-[#10B981]" />
                        <span>Building</span>
                      </span>
                      <span className="font-mono text-zinc-200 truncate max-w-[205px]">
                        ShinPay+ Payroll SaaS
                      </span>
                    </div>
                  </div>

                  {/* Verified Proof Counts */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center font-mono">
                    <div className="rounded-lg bg-[#0D0E12] border border-white/[0.05] py-1.5">
                      <div className="text-xs font-bold text-[#F4F4F6] tabular-nums">
                        {String(projectsData.length).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                        Apps
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#0D0E12] border border-white/[0.05] py-1.5">
                      <div className="text-xs font-bold text-[#F4F4F6] tabular-nums">
                        {String(totalTechCount).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                        Stack
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#0D0E12] border border-white/[0.05] py-1.5">
                      <div className="text-xs font-bold text-[#10B981] tabular-nums">
                        {String(certificatesData.length).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                        Certs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Front Footer Actions */}
                <div className="relative z-10 grid grid-cols-2 gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] font-semibold text-xs transition-all active:scale-95"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Flip for QR</span>
                  </button>
                  {onSwitchToRecruiter ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSwitchToRecruiter();
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1E212B] border border-white/[0.12] hover:border-[#10B981]/50 text-[#F4F4F6] font-mono font-semibold text-xs transition-all active:scale-95"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Recruiter View</span>
                    </button>
                  ) : (
                    <a
                      href={profileData.socials.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1E212B] border border-white/[0.12] text-[#F4F4F6] font-mono font-semibold text-xs transition-all active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Resume PDF</span>
                    </a>
                  )}
                </div>
              </div>

              {/* ============================================================
                  BACK FACE: REAL SCANNABLE QR CODE & INSTANT RECRUITER KIT
                 ============================================================ */}
              <div
                className={`holo-face-back absolute inset-0 rounded-[24px] bg-[#0D0E12] border border-white/[0.14] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.16)] overflow-hidden flex flex-col justify-between p-4 sm:p-5 ${
                  isFlipped ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {/* Holographic Sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: tilt.active ? 0.85 : 0.25,
                    background: `radial-gradient(circle at ${100 - tilt.mx}% ${tilt.my}%, rgba(16,185,129,0.16) 0%, rgba(81,91,212,0.12) 45%, transparent 78%)`,
                  }}
                />

                {/* Top Header */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#10B981] font-semibold block">
                      SCANNABLE RECRUITER PASS
                    </span>
                    <h3 className="text-sm font-semibold text-[#F4F4F6]">
                      Scan with Phone Camera
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#15171E] hover:bg-[#1E212B] border border-white/[0.1] font-mono text-[11px] text-zinc-300 hover:text-white transition-colors"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Front</span>
                  </button>
                </div>

                {/* Scannable QR Stage */}
                <div className="relative z-10 flex flex-col items-center my-2">
                  {/* QR Mode Switcher */}
                  <div className="mb-3 inline-flex items-center gap-1 p-1 rounded-full bg-[#15171E] border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setQrTarget("resume")}
                      className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all ${
                        qrTarget === "resume"
                          ? "bg-[#F4F4F6] text-[#0A0A0B] font-bold"
                          : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      Resume PDF QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrTarget("portfolio")}
                      className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all ${
                        qrTarget === "portfolio"
                          ? "bg-[#F4F4F6] text-[#0A0A0B] font-bold"
                          : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      Portfolio QR
                    </button>
                  </div>

                  {/* High-Contrast Scannable White QR Frame */}
                  <div className="p-3 rounded-2xl bg-white shadow-xl border-4 border-white/90">
                    {qrSvg ? (
                      <div
                        className="w-[164px] h-[164px] [&>svg]:w-full [&>svg]:h-full"
                        dangerouslySetInnerHTML={{ __html: qrSvg }}
                      />
                    ) : (
                      <div className="w-[164px] h-[164px] flex items-center justify-center font-mono text-xs text-neutral-500">
                        Generating QR…
                      </div>
                    )}
                  </div>

                  <p className="mt-2 font-mono text-[10px] text-zinc-400 text-center">
                    {qrTarget === "resume"
                      ? "Direct link to /resume.pdf (1-page verified resume)"
                      : "Direct link to Richard Allen's interactive portfolio"}
                  </p>
                </div>

                {/* 1-Click Recruiter Kit Actions */}
                <div className="relative z-10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadVCard}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981]/40 text-[#10B981] font-mono font-semibold text-xs transition-all active:scale-95"
                    >
                      {vcardDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved .vcf</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Save Contact</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1E212B] border border-white/[0.12] text-[#F4F4F6] font-mono font-semibold text-xs transition-all active:scale-95"
                    >
                      {emailCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span className="text-[#10B981]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={profileData.socials.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1E212B] border border-white/[0.12] text-[#F4F4F6] font-mono font-semibold text-xs transition-all active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Resume PDF</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>

                    {onSwitchToRecruiter ? (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSwitchToRecruiter();
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] font-semibold text-xs transition-all active:scale-95"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Recruiter Mode</span>
                      </button>
                    ) : (
                      <a
                        href={`mailto:${profileData.socials.email}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] font-semibold text-xs transition-all active:scale-95"
                      >
                        <span>Email Directly</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hint */}
        <p className="font-mono text-[11px] text-zinc-300 text-center">
          Move cursor across badge for 3D holo tilt · Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/15 text-zinc-200">
            ESC
          </kbd>{" "}
          to close
        </p>
      </div>
    </div>,
    document.body
  );
};
