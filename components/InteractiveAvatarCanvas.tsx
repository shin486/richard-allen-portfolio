"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import profilePic from "@/assets/PROFILEPIC.png";
import { profileData } from "@/data/profile";

export type AvatarMode = "photo" | "ascii" | "pixel" | "cyber";

export interface AvatarModeConfig {
  id: AvatarMode;
  label: string;
  shortTag: string;
  thoughtNote: string;
}

export const AVATAR_MODES: AvatarModeConfig[] = [
  {
    id: "photo",
    label: "Studio",
    shortTag: "STUDIO",
    thoughtNote:
      "Studio portrait active. Tap my photo to cycle live Canvas lenses, or tap ID for my 3D holographic badge.",
  },
  {
    id: "ascii",
    label: "ASCII",
    shortTag: "ASCII",
    thoughtNote:
      "Emerald ASCII Matrix engaged. Real-time HTML5 Canvas luminance mapping of my portrait.",
  },
  {
    id: "pixel",
    label: "8-Bit",
    shortTag: "8-BIT",
    thoughtNote:
      "8-bit sprite lens unlocked. Quantized pixel art matching the retro RPG thought bubble.",
  },
  {
    id: "cyber",
    label: "Scan",
    shortTag: "SCAN",
    thoughtNote:
      "Cybernetic HUD scan active. 6 production systems, 10 credentials, OJT ready.",
  },
];

export const getNextAvatarMode = (current: AvatarMode): AvatarMode => {
  const idx = AVATAR_MODES.findIndex((m) => m.id === current);
  return AVATAR_MODES[(idx + 1) % AVATAR_MODES.length].id;
};

export const getAvatarModeConfig = (mode: AvatarMode): AvatarModeConfig => {
  return AVATAR_MODES.find((m) => m.id === mode) ?? AVATAR_MODES[0];
};

interface InteractiveAvatarCanvasProps {
  mode: AvatarMode;
  sizes?: string;
  priority?: boolean;
  /** Optional larger canvas resolution for the 3D ID Badge */
  highRes?: boolean;
}

const ASCII_RAMP = " .:-=+*#%@";

function drawCenterCroppedSource(
  img: HTMLImageElement,
  targetCanvas: HTMLCanvasElement,
  w: number,
  h: number
) {
  targetCanvas.width = w;
  targetCanvas.height = h;
  const ctx = targetCanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const minDim = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - minDim) / 2;
  const sy = (img.naturalHeight - minDim) / 2;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h);
}

export const InteractiveAvatarCanvas: React.FC<InteractiveAvatarCanvasProps> = ({
  mode,
  sizes = "(max-width: 640px) 76px, (max-width: 768px) 128px, 144px",
  priority = false,
  highRes = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (mode === "photo") return;

    let cancelled = false;

    const renderMode = (img: HTMLImageElement) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displaySize = highRes ? 280 : 180;
      canvas.width = displaySize * dpr;
      canvas.height = displaySize * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement("canvas");

      if (mode === "ascii") {
        const cols = highRes ? 34 : 26;
        const rows = highRes ? 34 : 26;
        const imgData = drawCenterCroppedSource(img, offscreen, cols, rows);
        if (!imgData) return;

        ctx.fillStyle = "#06090B";
        ctx.fillRect(0, 0, displaySize, displaySize);

        const cellW = displaySize / cols;
        const cellH = displaySize / rows;
        ctx.font = `700 ${Math.max(6.5, cellH * 0.96)}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const data = imgData.data;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // Invert luminance so foreground hair, facial features, and suit glow brightly
            // while the light studio background stays clean dark terminal matrix dots
            if (lum > 0.83) {
              ctx.fillStyle = "rgba(16, 185, 129, 0.14)";
              ctx.fillText(
                "·",
                x * cellW + cellW / 2,
                y * cellH + cellH / 2
              );
              continue;
            }

            const darkness = Math.min(1, Math.max(0, (0.85 - lum) / 0.82));
            const charIdx = Math.min(
              ASCII_RAMP.length - 1,
              Math.floor(darkness * (ASCII_RAMP.length - 1))
            );
            const ch = ASCII_RAMP[charIdx];

            if (darkness > 0.68) {
              ctx.fillStyle = "#A7F3D0";
            } else if (darkness > 0.42) {
              ctx.fillStyle = "#34D399";
            } else {
              ctx.fillStyle = "#10B981";
            }

            ctx.fillText(ch, x * cellW + cellW / 2, y * cellH + cellH / 2);
          }
        }
      } else if (mode === "pixel") {
        const grid = highRes ? 28 : 22;
        const imgData = drawCenterCroppedSource(img, offscreen, grid, grid);
        if (!imgData) return;

        const data = imgData.data;
        const cell = displaySize / grid;
        ctx.imageSmoothingEnabled = false;

        for (let y = 0; y < grid; y++) {
          for (let x = 0; x < grid; x++) {
            const idx = (y * grid + x) * 4;
            // Quantize colors into crisp retro 8-bit steps
            const r = Math.min(255, Math.round(data[idx] / 32) * 32);
            const g = Math.min(255, Math.round(data[idx + 1] / 32) * 32);
            const b = Math.min(255, Math.round(data[idx + 2] / 32) * 32);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(
              Math.floor(x * cell),
              Math.floor(y * cell),
              Math.ceil(cell),
              Math.ceil(cell)
            );
          }
        }

        // Subtle CRT pixel matrix bevel grid
        ctx.strokeStyle = "rgba(10, 10, 14, 0.16)";
        ctx.lineWidth = 0.6;
        for (let i = 1; i < grid; i++) {
          const pos = Math.round(i * cell) + 0.5;
          ctx.beginPath();
          ctx.moveTo(pos, 0);
          ctx.lineTo(pos, displaySize);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, pos);
          ctx.lineTo(displaySize, pos);
          ctx.stroke();
        }
      } else if (mode === "cyber") {
        const res = highRes ? 200 : 140;
        const imgData = drawCenterCroppedSource(img, offscreen, res, res);
        if (!imgData) return;

        const data = imgData.data;
        const outCanvas = document.createElement("canvas");
        outCanvas.width = res;
        outCanvas.height = res;
        const outCtx = outCanvas.getContext("2d");
        if (!outCtx) return;

        const outImg = outCtx.createImageData(res, res);
        const out = outImg.data;

        for (let i = 0; i < data.length; i += 4) {
          const lum =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          // High-contrast emerald-cyan cybernetic blueprint tone mapping
          const contrasted = Math.min(
            1,
            Math.max(0, (lum - 0.14) * 1.25)
          );
          const invertedBg = lum > 0.82 ? 0.14 : contrasted;
          out[i] = Math.round(10 + invertedBg * 42); // R
          out[i + 1] = Math.round(28 + invertedBg * 195); // G
          out[i + 2] = Math.round(34 + invertedBg * 145); // B
          out[i + 3] = 255;
        }

        outCtx.putImageData(outImg, 0, 0);
        ctx.drawImage(outCanvas, 0, 0, displaySize, displaySize);

        // Horizontal biometric CRT scanlines
        ctx.fillStyle = "rgba(5, 12, 14, 0.28)";
        for (let y = 0; y < displaySize; y += 4) {
          ctx.fillRect(0, y, displaySize, 1.4);
        }

        // Subtle technical reticle crosshair
        ctx.strokeStyle = "rgba(52, 211, 153, 0.45)";
        ctx.lineWidth = 1;
        const pad = displaySize * 0.18;
        const tick = displaySize * 0.08;
        // Top-left bracket
        ctx.beginPath();
        ctx.moveTo(pad, pad + tick);
        ctx.lineTo(pad, pad);
        ctx.lineTo(pad + tick, pad);
        // Top-right bracket
        ctx.moveTo(displaySize - pad - tick, pad);
        ctx.lineTo(displaySize - pad, pad);
        ctx.lineTo(displaySize - pad, pad + tick);
        // Bottom-left bracket
        ctx.moveTo(pad, displaySize - pad - tick);
        ctx.lineTo(pad, displaySize - pad);
        ctx.lineTo(pad + tick, displaySize - pad);
        // Bottom-right bracket
        ctx.moveTo(displaySize - pad - tick, displaySize - pad);
        ctx.lineTo(displaySize - pad, displaySize - pad);
        ctx.lineTo(displaySize - pad, displaySize - pad - tick);
        ctx.stroke();
      }
    };

    if (loadedImageRef.current && loadedImageRef.current.complete) {
      renderMode(loadedImageRef.current);
    } else {
      const img = new window.Image();
      img.onload = () => {
        loadedImageRef.current = img;
        renderMode(img);
      };
      img.src = profilePic.src;
    }

    return () => {
      cancelled = true;
    };
  }, [mode, highRes]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-neutral-950 flex items-center justify-center">
      {mode === "photo" ? (
        <>
          <Image
            src={profilePic}
            alt={profileData.name}
            fill
            sizes={sizes}
            className="object-cover"
            priority={priority}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_16px_rgba(0,0,0,0.22)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.38)]"
          />
        </>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            aria-label={`${profileData.name} portrait in ${mode} mode`}
            className="w-full h-full object-cover block"
          />
          {mode === "cyber" && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              <div className="w-full h-6 bg-gradient-to-b from-transparent via-[#10B981]/50 to-transparent animate-cyber-scan" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
