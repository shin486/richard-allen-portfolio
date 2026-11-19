"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import {
  X,
  RotateCw,
  Copy,
  Check,
  UserPlus,
  Phone,
  Clock,
  ExternalLink,
  Coffee,
  Instagram,
  Disc3,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { VerifiedBadge } from "./VerifiedBadge";
import {
  AVATAR_MODES,
  AvatarMode,
  InteractiveAvatarCanvas,
} from "./InteractiveAvatarCanvas";

interface DeveloperIdBadgeModalProps {
  isOpen: boolean;
  initialSide?: "front" | "back";
  onClose: () => void;
  avatarMode: AvatarMode;
  onSelectAvatarMode: (mode: AvatarMode) => void;
}

interface FloatingReaction {
  id: number;
  symbol: string;
  rightPx: number;
  bottomPx: number;
  color: string;
  delayMs: number;
}

const COFFEE_STATUS_LINES: string[] = [
  "Decaf mode — writing polite, bug-free TypeScript.",
  "1 cup in — clean commits, zero stray console.logs.",
  "2 cups in — optimizing Supabase RLS policies in my sleep.",
  "3 cups in — refactoring Three.js keycaps at 3:00 AM.",
  "Overclocked — caffeine-to-code ratio critical. Ready for OJT.",
];

function getManilaClock(): {
  time: string;
  isDaytime: boolean;
  periodLabel: string;
} {
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
  const periodLabel = isDaytime ? "ACTIVE NOW" : "ASYNC · PH NIGHT";

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
    `URL;TYPE=Instagram:${profileData.socials.instagram}`,
    `URL;TYPE=GitHub:${profileData.socials.github}`,
    `URL;TYPE=LinkedIn:${profileData.socials.linkedin}`,
    "ADR;TYPE=HOME:;;Lipa City;Batangas;;Philippines",
    "NOTE:4th-year BSIT at De La Salle Lipa (Graduating June 2027). Open for 500+ hr OJT & Full-Stack / Mobile Developer roles.",
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

function buildCompactQrVCard(): string {
  // Compact vCard string keeps QR matrix density low so phone cameras scan instantly
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Liman;Richard Allen;;;",
    `FN:${profileData.name}`,
    `ORG:${profileData.educationSummary.school}`,
    `TITLE:${profileData.title}`,
    `EMAIL:${profileData.socials.email}`,
    ...(profileData.socials.phone ? [`TEL:${profileData.socials.phone}`] : []),
    `URL:${profileData.socials.instagram}`,
    "END:VCARD",
  ].join("\r\n");
}

export const DeveloperIdBadgeModal: React.FC<DeveloperIdBadgeModalProps> = ({
  isOpen,
  initialSide = "front",
  onClose,
  avatarMode,
  onSelectAvatarMode,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(initialSide === "back");
  const [qrSvg, setQrSvg] = useState<string>("");

  // Contact copy / download states
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [vcardDownloaded, setVcardDownloaded] = useState(false);
  const [clock, setClock] = useState(() => getManilaClock());

  // Rigged Instagram Emoji Slider state
  const [sliderValue, setSliderValue] = useState<number>(100);
  const [sliderNote, setSliderNote] = useState<string>(
    "Drag left if you dare."
  );
  const [sliderBouncing, setSliderBouncing] = useState(false);
  const isInteractingControlRef = useRef(false);

  // Live Global ☕ "Caffeinate Richard" Counter (/api/likes -> badge-coffee)
  const [globalCoffees, setGlobalCoffees] = useState<number | null>(null);
  const [sessionCoffees, setSessionCoffees] = useState<number>(0);
  const [coffeePop, setCoffeePop] = useState(false);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const reactionIdRef = useRef(1);

  // Peeking Spinnable Mini Vinyl physics
  const vinylRef = useRef<HTMLDivElement | null>(null);
  const vinylAngleRef = useRef<number>(0);
  const vinylVelRef = useRef<number>(1.25);
  const vinylDraggingRef = useRef<boolean>(false);
  const vinylLastAngleRef = useRef<number>(0);

  // 3D pointer tilt & holographic sheen
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    mx: 50,
    my: 50,
    active: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync side on open & reset tilt on close
  useEffect(() => {
    if (isOpen) {
      setIsFlipped(initialSide === "back");
    } else {
      setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
    }
  }, [isOpen, initialSide]);

  // Lock body scroll & Escape handler
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

  // Tick Lipa City (Asia/Manila) clock every second
  useEffect(() => {
    if (!isOpen) return;
    setClock(getManilaClock());
    const interval = window.setInterval(() => {
      setClock(getManilaClock());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Fetch real global coffee count from /api/likes
  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/likes?ids=badge-coffee", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (typeof data?.counts?.["badge-coffee"] === "number") {
          setGlobalCoffees(data.counts["badge-coffee"]);
        } else {
          setGlobalCoffees(0);
        }
      })
      .catch(() => {
        setGlobalCoffees((prev) => prev ?? 0);
      });
  }, [isOpen]);

  // Generate Real Native Contact QR (VCARD 3.0)
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    QRCode.toString(buildCompactQrVCard(), {
      type: "svg",
      margin: 1,
      width: 140,
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
  }, [isOpen]);

  // Peeking Spinnable Mini Vinyl 60fps loop
  useEffect(() => {
    if (!isOpen) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId = 0;
    const tick = () => {
      if (!vinylDraggingRef.current) {
        // Gentle settle back toward 33 RPM spin
        vinylVelRef.current = vinylVelRef.current * 0.96 + 1.15 * 0.04;
        vinylAngleRef.current += vinylVelRef.current;
      }
      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotate(${vinylAngleRef.current.toFixed(1)}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isOpen]);

  const getPointerAngle = (el: HTMLElement, cx: number, cy: number) => {
    const r = el.getBoundingClientRect();
    return (
      Math.atan2(cy - (r.top + r.height / 2), cx - (r.left + r.width / 2)) *
      (180 / Math.PI)
    );
  };

  const handleVinylPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = vinylRef.current;
    if (!el) return;
    vinylDraggingRef.current = true;
    isInteractingControlRef.current = true;
    vinylLastAngleRef.current = getPointerAngle(el, e.clientX, e.clientY);
    el.setPointerCapture(e.pointerId);
  };

  const handleVinylPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!vinylDraggingRef.current || !vinylRef.current) return;
    e.stopPropagation();
    const ang = getPointerAngle(vinylRef.current, e.clientX, e.clientY);
    let delta = ang - vinylLastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    vinylLastAngleRef.current = ang;
    vinylAngleRef.current += delta;
    vinylVelRef.current = delta;
    vinylRef.current.style.transform = `rotate(${vinylAngleRef.current.toFixed(1)}deg)`;
  };

  const handleVinylPointerUp = () => {
    vinylDraggingRef.current = false;
    isInteractingControlRef.current = false;
  };

  // Pointer 3D tilt
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isInteractingControlRef.current) return;
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
      const ry = (px - 0.5) * 14;
      const rx = (0.5 - py) * 11;
      setTilt({
        rx,
        ry,
        mx: Math.round(px * 100),
        my: Math.round(py * 100),
        active: true,
      });
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
  }, []);

  // Rigged Instagram Emoji Slider handlers
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    if (val < 50) {
      setSliderNote("Hold on... are you sure about that?");
    } else if (val < 85) {
      setSliderNote("Hmm, looks a bit low for 6 production apps...");
    } else {
      setSliderNote("Verified accurate. Ready for 500+ hr OJT.");
    }
  };

  const handleSliderRelease = () => {
    isInteractingControlRef.current = false;
    if (sliderValue < 88) {
      setSliderBouncing(true);
      setSliderValue(100);
      setSliderNote("Nice try — minimum score locked by Supabase RLS.");
      window.setTimeout(() => setSliderBouncing(false), 500);
    } else {
      setSliderNote("100% locked in. Ready for interview!");
    }
  };

  // ☕ Pour Virtual Coffee (+1) handler with live /api/likes + IG Live floating reactions
  const handlePourCoffee = useCallback(() => {
    setSessionCoffees((prev) => prev + 1);
    setGlobalCoffees((prev) => (prev ?? 0) + 1);
    setCoffeePop(true);
    window.setTimeout(() => setCoffeePop(false), 260);

    // Spawn 3 IG Live-style floating reactions
    const symbols = ["☕", "★", "+1", "⚡"];
    const batch: FloatingReaction[] = [0, 1, 2].map((i) => ({
      id: reactionIdRef.current++,
      symbol: symbols[(reactionIdRef.current + i) % symbols.length],
      rightPx: 18 + Math.round(Math.random() * 44),
      bottomPx: 120 + Math.round(Math.random() * 24),
      color: i === 1 ? "#F58529" : "#10B981",
      delayMs: i * 80,
    }));

    setReactions((prev) => [...prev, ...batch]);
    window.setTimeout(() => {
      const batchIds = new Set(batch.map((b) => b.id));
      setReactions((prev) => prev.filter((r) => !batchIds.has(r.id)));
    }, 1500);

    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "badge-coffee" }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (typeof data?.count === "number") {
          setGlobalCoffees(data.count);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyEmail = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profileData.socials.email).catch(() => {});
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  }, []);

  const handleCopyPhone = useCallback(() => {
    const phone = profileData.socials.phone || "09936105240";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(phone).catch(() => {});
    }
    setPhoneCopied(true);
    window.setTimeout(() => setPhoneCopied(false), 1800);
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
    window.setTimeout(() => setVcardDownloaded(false), 2000);
  }, []);

  if (!isOpen || !mounted) return null;

  const coffeeStatusText =
    COFFEE_STATUS_LINES[
      Math.min(sessionCoffees, COFFEE_STATUS_LINES.length - 1)
    ];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto overscroll-contain animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Instagram Profile Portal Card"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[368px] my-auto flex flex-col items-center gap-2.5 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div className="w-full flex items-center justify-between px-1">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>IG Profile Portal · @richardallen0901</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Profile Portal"
            className="w-8 h-8 rounded-full bg-zinc-900/95 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Tilt + Flip Instagram Profile Portal Card */}
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
              className={`holo-flip-inner relative w-full min-h-[508px] sm:min-h-[526px] ${
                isFlipped ? "is-flipped" : ""
              }`}
            >
              {/* ============================================================
                  FRONT FACE: "VISIT THE REAL @RICHARDALLEN0901?" PORTAL
                 ============================================================ */}
              <div
                className={`holo-face absolute inset-0 rounded-[24px] bg-[#0D0E13] border border-white/[0.15] shadow-[0_26px_65px_-14px_rgba(0,0,0,0.88),inset_0_1px_0_0_rgba(255,255,255,0.18)] overflow-hidden flex flex-col justify-between p-4 sm:p-5 ${
                  isFlipped ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                {/* Cursor-reactive subtle IG aurora + emerald foil sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: tilt.active ? 0.9 : 0.32,
                    background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(221,42,123,0.16) 0%, rgba(16,185,129,0.15) 38%, rgba(81,91,212,0.12) 65%, transparent 82%)`,
                  }}
                />

                {/* Top Close Friends + Live Lipa City Clock Strip */}
                <div className="relative z-10 flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.08em] uppercase">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] font-bold">
                    <span>★</span>
                    <span>{clock.periodLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-zinc-300 tabular-nums font-semibold">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{clock.time} PH</span>
                  </span>
                </div>

                {/* Center Stage: Live Portrait + Peeking Spinnable Mini Vinyl + IG Filter Pills */}
                <div className="relative z-10 flex flex-col items-center text-center my-1">
                  <div className="relative flex items-center justify-center pl-1 pr-9">
                    {/* Peeking Spinnable Mini Vinyl Record (Grab & Spin!) */}
                    <div
                      ref={vinylRef}
                      onPointerDown={handleVinylPointerDown}
                      onPointerMove={handleVinylPointerMove}
                      onPointerUp={handleVinylPointerUp}
                      onPointerCancel={handleVinylPointerUp}
                      title="Grab & spin my IG profile vinyl"
                      className="absolute right-0 w-[84px] h-[84px] rounded-full vinyl-mini-grooves border border-white/20 shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-0"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full"
                        style={{
                          background:
                            "conic-gradient(from 30deg, transparent 0deg, rgba(245,133,41,0.28) 55deg, transparent 110deg, rgba(16,185,129,0.28) 215deg, transparent 295deg)",
                        }}
                      />
                      <div className="w-7 h-7 rounded-full animated-ig-ring flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0D0E13] border border-white/40" />
                      </div>
                    </div>

                    {/* Live Canvas Portrait Ring */}
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
                      title="Tap portrait to switch live Canvas lenses"
                      className="relative z-10 w-24 h-24 rounded-full p-[3px] animated-ig-ring shadow-2xl transition-transform hover:scale-[1.03] active:scale-95 focus:outline-none"
                    >
                      <div className="w-full h-full rounded-full bg-[#0D0E13] p-[2.5px]">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <InteractiveAvatarCanvas
                            mode={avatarMode}
                            sizes="96px"
                            highRes
                          />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* IG Camera Filter Bubbles + Spin Hint */}
                  <div className="mt-2.5 inline-flex items-center gap-1 p-1 rounded-full bg-[#151720] border border-white/[0.09]">
                    {AVATAR_MODES.map((m) => {
                      const active = avatarMode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => onSelectAvatarMode(m.id)}
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-wider transition-all ${
                            active
                              ? "bg-[#10B981] text-[#05140D] font-bold shadow-sm"
                              : "text-zinc-400 hover:text-zinc-100"
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                  <span className="mt-1 inline-flex items-center gap-1 font-mono text-[9.5px] text-zinc-500">
                    <Disc3 className="w-2.5 h-2.5 text-pink-400" />
                    <span>Grab vinyl edge to spin · Lens stays live on avatar</span>
                  </span>
                </div>

                {/* Self-Aware "Leave the Portfolio?" Portal Prompt */}
                <div className="relative z-10 text-center space-y-1 px-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <h2 className="text-base sm:text-[17px] font-bold tracking-tight text-[#F4F4F6]">
                      Visit the real @richardallen0901?
                    </h2>
                    <VerifiedBadge className="w-4 h-4 shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    You&apos;re inside my coded Instagram portfolio. Jump to my
                    actual Instagram — or stay here and fuel me with virtual
                    coffee.
                  </p>
                </div>

                {/* Witty Rigged Instagram Emoji Slider Sticker */}
                <div
                  className={`relative z-10 rounded-2xl bg-[#14161E] border border-white/[0.09] px-3.5 py-2.5 space-y-1.5 transition-transform ${
                    sliderBouncing ? "scale-[1.02] border-[#10B981]/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-zinc-200 font-semibold">
                      🔥 OJT Readiness Check
                    </span>
                    <span className="text-[#10B981] font-bold tabular-nums">
                      {sliderValue}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={sliderValue}
                    aria-label="Rate OJT readiness"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      isInteractingControlRef.current = true;
                    }}
                    onChange={handleSliderChange}
                    onPointerUp={handleSliderRelease}
                    onTouchEnd={handleSliderRelease}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#10B981] bg-zinc-800"
                  />
                  <p className="font-mono text-[10px] text-zinc-400 truncate">
                    {sliderNote}
                  </p>
                </div>

                {/* 2-Choice Portal Footer (Zero Navbar Redundancy) */}
                <div className="relative z-10 grid grid-cols-1 gap-2 pt-1">
                  <a
                    href={profileData.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ig-gradient hover:opacity-95 text-white font-semibold text-xs shadow-lg transition-all active:scale-95"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Open @richardallen0901 on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-85" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#161822] hover:bg-[#1E2230] border border-white/[0.12] hover:border-[#10B981]/45 text-[#F4F4F6] font-mono font-semibold text-xs transition-all active:scale-95"
                  >
                    <Coffee className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Stay &amp; Flip (Virtual Coffee + Contact QR)</span>
                  </button>
                </div>
              </div>

              {/* ============================================================
                  BACK FACE: GLAD YOU STAYED · CLOSE FRIENDS PERKS
                 ============================================================ */}
              <div
                className={`holo-face-back absolute inset-0 rounded-[24px] bg-[#0D0E13] border border-white/[0.15] shadow-[0_26px_65px_-14px_rgba(0,0,0,0.88),inset_0_1px_0_0_rgba(255,255,255,0.18)] overflow-hidden flex flex-col justify-between p-4 sm:p-5 ${
                  isFlipped ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {/* Holographic Sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: tilt.active ? 0.85 : 0.28,
                    background: `radial-gradient(circle at ${100 - tilt.mx}% ${tilt.my}%, rgba(16,185,129,0.18) 0%, rgba(221,42,123,0.11) 48%, transparent 80%)`,
                  }}
                />

                {/* IG Live Floating Coffee Reactions Layer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden z-40"
                >
                  {reactions.map((r) => (
                    <span
                      key={r.id}
                      className="animate-ig-reaction absolute font-mono font-bold text-sm"
                      style={{
                        right: `${r.rightPx}px`,
                        bottom: `${r.bottomPx}px`,
                        color: r.color,
                        animationDelay: `${r.delayMs}ms`,
                      }}
                    >
                      {r.symbol}
                    </span>
                  ))}
                </div>

                {/* Top Header */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#10B981] font-bold block">
                      ★ CLOSE FRIENDS PERKS
                    </span>
                    <h3 className="text-sm font-semibold text-[#F4F4F6]">
                      Glad You Stayed · Fuel &amp; Contact
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#151720] hover:bg-[#1E2230] border border-white/[0.12] font-mono text-[11px] text-zinc-200 hover:text-white transition-colors"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Front</span>
                  </button>
                </div>

                {/* ☕ Live Global "Caffeinate Richard" Counter (/api/likes) */}
                <div className="relative z-10 rounded-2xl bg-[#13161E] border border-[#10B981]/35 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 font-mono">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-200">
                      ☕ CAFFEINATE RICHARD
                    </span>
                    <span className="text-[11px] font-bold text-[#10B981] tabular-nums">
                      {globalCoffees === null
                        ? "Loading…"
                        : `${globalCoffees.toLocaleString()} ${
                            globalCoffees === 1 ? "cup" : "cups"
                          } poured`}
                    </span>
                  </div>

                  {/* 4-Segment Escalating Caffeine Bar */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 1, 2, 3].map((seg) => {
                      const filled = seg < Math.min(4, sessionCoffees);
                      return (
                        <div
                          key={seg}
                          className={`h-1.5 rounded-full transition-colors duration-300 ${
                            filled
                              ? seg === 3
                                ? "bg-[#F58529]"
                                : "bg-[#10B981]"
                              : "bg-zinc-800"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <p className="font-mono text-[11px] text-zinc-300 leading-snug min-h-[30px]">
                    {coffeeStatusText}
                  </p>

                  <button
                    type="button"
                    onClick={handlePourCoffee}
                    className={`w-full py-2.5 px-3 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-[#04140D] font-mono font-bold text-xs shadow-[0_6px_22px_-4px_rgba(16,185,129,0.55)] transition-transform ${
                      coffeePop ? "scale-95" : "active:scale-95"
                    }`}
                  >
                    ☕ Pour Virtual Coffee (+1)
                  </button>
                </div>

                {/* Native Phone Contact QR (VCARD 3.0 — Zero Browser Hop!) */}
                <div className="relative z-10 flex items-center gap-3 rounded-2xl bg-[#13161E] border border-white/[0.08] p-3">
                  <div className="w-[106px] h-[106px] rounded-xl bg-white p-1.5 shadow-lg flex-shrink-0 flex items-center justify-center">
                    {qrSvg ? (
                      <div
                        className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                        dangerouslySetInnerHTML={{ __html: qrSvg }}
                      />
                    ) : (
                      <span className="font-mono text-[10px] text-neutral-500">
                        QR…
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white/[0.06] font-mono text-[9px] uppercase tracking-wider text-[#10B981] font-bold">
                      NATIVE VCARD QR
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#F4F4F6] leading-tight">
                      Scan to Add Contact
                    </h4>
                    <p className="text-[11px] text-zinc-400 leading-snug">
                      Point iPhone or Android camera to natively save email,
                      phone &amp; Instagram.
                    </p>
                  </div>
                </div>

                {/* 3 Non-Redundant Quick Contact Buttons */}
                <div className="relative z-10 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadVCard}
                    className="inline-flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981]/40 text-[#10B981] font-mono font-semibold text-[11px] transition-all active:scale-95"
                  >
                    {vcardDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>.vcf</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-[#161822] hover:bg-[#1E2230] border border-white/[0.12] text-[#F4F4F6] font-mono font-semibold text-[11px] transition-all active:scale-95"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-400" />
                        <span>Email</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-[#161822] hover:bg-[#1E2230] border border-white/[0.12] text-[#F4F4F6] font-mono font-semibold text-[11px] transition-all active:scale-95"
                  >
                    {phoneCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-3 h-3 text-zinc-400" />
                        <span>Phone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hint */}
        <p className="font-mono text-[11px] text-zinc-300 text-center">
          Spin the vinyl · Test the slider · Press{" "}
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
