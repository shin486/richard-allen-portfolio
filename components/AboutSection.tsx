"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";

interface TechPillProps {
  label: string;
  techKey: string;
}

const TechPill: React.FC<TechPillProps> = ({ label, techKey }) => {
  const triggerHover = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shin-tech-hover", {
          detail: { tech: techKey },
        })
      );
    }
  };

  return (
    <button
      type="button"
      onMouseEnter={triggerHover}
      onClick={triggerHover}
      className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md text-xs font-mono font-medium border border-neutral-200 dark:border-zinc-700/80 bg-neutral-100/90 dark:bg-zinc-800/70 text-neutral-800 dark:text-zinc-200 hover:border-neutral-400 dark:hover:border-zinc-500 hover:bg-neutral-200/60 dark:hover:bg-zinc-700/60 transition-colors cursor-pointer select-none"
      title={`Highlight ${label} on 3D mechanical keyboard`}
    >
      {label}
    </button>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-6 sm:py-8 space-y-4">
      {/* Bryl Lim Minimalist Numbered Section Header */}
      <div className="flex items-baseline justify-between border-b border-neutral-200/80 dark:border-zinc-800/80 pb-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-neutral-400 dark:text-zinc-500">
            01 —
          </span>
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-semibold text-neutral-900 dark:text-zinc-100">
            About &amp; Candidate Dossier
          </h2>
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
          OJT READY · JUNE 2027
        </span>
      </div>

      {/* Main Dossier Card (Apple Minimalist Ledger) */}
      <div className="bg-white dark:bg-[#0c0d12] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-5 sm:p-7 shadow-xs flex flex-col gap-6 transition-colors duration-200">
        {/* Profile Identity Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden relative bg-neutral-900 border border-neutral-200 dark:border-zinc-800 shrink-0">
              <Image
                src={profilePic}
                alt={profileData.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900 dark:text-zinc-100">
                  {profileData.name}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 dark:text-zinc-500">
                  @{profileData.username}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-zinc-400 font-mono mt-0.5">
                {profileData.title} · De La Salle Lipa
              </p>
            </div>
          </div>

          {/* Social Links Flow (Bryl Lim Style) */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-zinc-400">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-zinc-100 underline decoration-neutral-300 dark:decoration-zinc-700 underline-offset-4 transition-colors"
            >
              github
            </a>
            <span>/</span>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-zinc-100 underline decoration-neutral-300 dark:decoration-zinc-700 underline-offset-4 transition-colors"
            >
              linkedin
            </a>
            <span>/</span>
            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-zinc-100 underline decoration-neutral-300 dark:decoration-zinc-700 underline-offset-4 transition-colors"
            >
              resume
            </a>
            <span>/</span>
            <a
              href={`mailto:${profileData.socials.email}`}
              className="hover:text-neutral-900 dark:hover:text-zinc-100 underline decoration-neutral-300 dark:decoration-zinc-700 underline-offset-4 transition-colors"
            >
              contact
            </a>
          </div>
        </div>

        {/* Narrative Text with Bryl Lim Inline Sentence Pills */}
        <div className="space-y-3.5 text-sm sm:text-[14.5px] text-neutral-700 dark:text-zinc-300 leading-relaxed font-normal">
          <p>
            I&apos;m a <TechPill label="Full-Stack" techKey="nextjs" /> &amp;{" "}
            <TechPill label="Mobile Engineer" techKey="react-native" /> completing
            my BS in Information Technology at{" "}
            <strong className="text-neutral-900 dark:text-zinc-100 font-semibold">
              De La Salle Lipa
            </strong>{" "}
            (Graduating June 2027). I build production systems using{" "}
            <TechPill label="Next.js 14" techKey="nextjs" />,{" "}
            <TechPill label="React Native" techKey="react-native" />, and{" "}
            <TechPill label="Supabase" techKey="supabase" />.
          </p>

          <p>
            My engineering focus is converting real-world friction into resilient
            software — notably{" "}
            <strong className="text-neutral-900 dark:text-zinc-100 font-semibold">
              PalengkeHub
            </strong>
            , a capstone delivering stall-level price transparency and order routing
            for Batangas local public markets. I take projects from Figma design
            tokens to typed, audited schemas in{" "}
            <TechPill label="PostgreSQL" techKey="postgresql" />.
          </p>

          <p>
            Currently seeking an{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              OJT / Internship
            </span>{" "}
            role where I can contribute to production codebases, learn under senior
            staff, and ship high-leverage software.
          </p>
        </div>

        {/* Bryl Lim High-Density Metric Strip */}
        <div className="border-y border-neutral-200/80 dark:border-zinc-800/80 py-4 grid grid-cols-3 gap-3">
          <div>
            <div className="text-base sm:text-xl font-mono font-bold text-neutral-900 dark:text-zinc-100 tabular-nums">
              6 PROD APPS{" "}
              <span className="text-xs text-neutral-400 dark:text-zinc-500 font-normal">
                ^
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.14em] text-neutral-400 dark:text-zinc-500 uppercase mt-0.5">
              SHIPPED CODEBASES
            </div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-mono font-bold text-neutral-900 dark:text-zinc-100 tabular-nums">
              JUNE 2027{" "}
              <span className="text-xs text-neutral-400 dark:text-zinc-500 font-normal">
                ^
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.14em] text-neutral-400 dark:text-zinc-500 uppercase mt-0.5">
              DE LA SALLE LIPA BSIT
            </div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              OJT READY{" "}
              <span className="text-xs text-neutral-400 dark:text-zinc-500 font-normal">
                ^
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.14em] text-neutral-400 dark:text-zinc-500 uppercase mt-0.5">
              FULL-STACK &amp; MOBILE
            </div>
          </div>
        </div>

        {/* Technical Engineering Pillars (Zero-icon Minimalist Ledger) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-900/40 space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-neutral-900 dark:text-zinc-100 block">
              01 // Web &amp; SaaS
            </span>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed">
              Next.js 14 App Router, TypeScript contracts, Supabase PostgreSQL,
              Row-Level Security, and Server Actions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-900/40 space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-neutral-900 dark:text-zinc-100 block">
              02 // Mobile Clients
            </span>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed">
              React Native &amp; Expo cross-platform apps with gesture flows,
              offline caching, and camera barcode scanning.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-900/40 space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-neutral-900 dark:text-zinc-100 block">
              03 // AI &amp; Infrastructure
            </span>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed">
              Google Gemini &amp; AWS/Azure AI workflows, RAG &amp; prompt
              engineering, cloud IAM/VPC fundamentals, and Cisco Python.
            </p>
          </div>
        </div>

        {/* Education Highlight Card */}
        <div className="rounded-xl border border-neutral-200/80 dark:border-zinc-800/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-50/30 dark:bg-zinc-900/20">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-400 dark:text-zinc-500 block">
              ACADEMIC FOUNDATION
            </span>
            <h4 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-zinc-100">
              {profileData.educationSummary.school}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-zinc-400 font-mono">
              {profileData.educationSummary.degree}
            </p>
          </div>

          <div className="sm:text-right text-xs font-mono text-neutral-500 dark:text-zinc-400 space-y-0.5">
            <div className="text-neutral-900 dark:text-zinc-200 font-medium">
              Expected: {profileData.educationSummary.expectedGraduation}
            </div>
            <div>{profileData.educationSummary.location}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
