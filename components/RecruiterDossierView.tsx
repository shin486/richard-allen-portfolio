"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Play,
  Terminal,
  Cpu,
  Code2,
  ShieldCheck,
  Activity,
  Database,
  Smartphone,
  GitBranch,
} from "lucide-react";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { Project, projectsData } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

interface RecruiterDossierViewProps {
  onSwitchToStudio?: () => void;
}

export const RecruiterDossierView: React.FC<RecruiterDossierViewProps> = ({
  onSwitchToStudio,
}) => {
  const [selectedProjectForModal, setSelectedProjectForModal] =
    useState<Project | null>(null);

  const palengkehub = projectsData.find((p) => p.id === "palengkehub")!;
  const shinpay = projectsData.find((p) => p.id === "shinpay-plus")!;
  const autoAvenue = projectsData.find((p) => p.id === "auto-avenue-ims")!;
  const itelect4 = projectsData.find((p) => p.id === "itelect4-project")!;
  const avms = projectsData.find((p) => p.id === "avms")!;

  return (
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-fade-in text-zinc-100 font-sans">
      {/* 1. EXECUTIVE CANDIDATE HEADER */}
      <section className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-4 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 pb-4 sm:pb-5 border-b border-zinc-800/80">
          <div className="flex items-start xs:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden relative border border-zinc-800 shrink-0 bg-zinc-900">
              <Image
                src={profilePic}
                alt={profileData.name}
                fill
                priority
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
                  {profileData.name}
                </h1>
                <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                  VERIFIED CANDIDATE
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-0.5 sm:mt-1">
                Full-Stack &amp; Mobile Developer
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-zinc-500 font-mono mt-1.5">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>BSIT, De La Salle Lipa (Graduating June 2027)</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Lipa City, Batangas, Philippines</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick PDF Resume Action */}
          <div className="flex flex-col sm:items-end gap-1.5 sm:gap-2 w-full sm:w-auto">
            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium px-3.5 py-2 sm:py-1.5 rounded-md inline-flex items-center gap-2 transition-colors justify-center"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Official Resume (PDF)</span>
            </a>
            <span className="text-[11px] font-mono text-zinc-400 text-center sm:text-right">
              Available for 500+ Hours OJT &amp; Full-Time
            </span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="pt-3.5 sm:pt-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/shin486</span>
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>linkedin.com/in/richard-allen-liman</span>
            </a>
            <a
              href="mailto:richardallen0901@gmail.com"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>richardallen0901@gmail.com</span>
            </a>
          </div>

          {onSwitchToStudio && (
            <button
              type="button"
              onClick={onSwitchToStudio}
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-mono"
            >
              <span>Switch to Studio View →</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. CORE ENGINEERING METRICS STRIP */}
      <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {[
          {
            title: "3 Production Applications",
            stat: "3 Live Deployments",
            desc: "PalengkeHub (Capstone), ShinPay+ (SaaS), Auto Avenue (IMS)",
            icon: Cpu,
          },
          {
            title: "100% TypeScript",
            stat: "Zero `any` Debt",
            desc: "Zod runtime schema validation & strict end-to-end contracts",
            icon: Code2,
          },
          {
            title: "Supabase RLS Secured",
            stat: "8+ Normalized Tables",
            desc: "Strict tenant isolation policies & WebSocket Realtime broadcast",
            icon: ShieldCheck,
          },
          {
            title: "Automated Test Coverage",
            stat: "Sub-Millisecond Engine",
            desc: "Real-time client assertion suite verifying PH statutory tables",
            icon: Activity,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors rounded-lg p-3.5 sm:p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {item.title}
                </span>
                <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              </div>
              <div>
                <div className="text-sm sm:text-lg font-semibold font-mono text-zinc-100">
                  {item.stat}
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. FLAGSHIP PRODUCTION PROJECTS MATRIX */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-100">
              Systems Architecture &amp; Flagship Projects
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Interactive sandboxes, architecture specifications, and production metrics
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-zinc-500">
            Click &apos;Launch Sandbox&apos; to run in-browser
          </span>
        </div>

        {/* Project 1: PalengkeHub */}
        <div className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors rounded-lg p-4 sm:p-6 shadow-xs">
          {/* Top row: Category badge on left, unified action buttons on right */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded">
              CAPSTONE
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(palengkehub)}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium px-3 sm:px-3.5 py-1.5 rounded-md inline-flex items-center gap-1.5 sm:gap-2 transition-colors justify-center"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Sandbox</span>
              </button>
              <a
                href="https://github.com/shin486/PalengkeHubFinal"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 text-xs font-medium px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Title, Subtitle & Tech Stack */}
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-100 mt-3">
            PalengkeHub
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Public-Market Price Transparency &amp; Pre-Ordering Platform
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-500 font-mono mt-1">
            React Native • Expo • TypeScript • Supabase Realtime • PostgreSQL RLS
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2.5 sm:mt-3">
            Engineered an offline-first mobile marketplace for municipal market vendors and buyers across Lipa City. 
            Normalized 8+ PostgreSQL tables with strict Row-Level Security, sub-250ms WebSocket price discovery, and deterministic local mutation queue that auto-reconciles when cellular signal restores.
          </p>

          {/* 3-Column Architecture Spec Grid */}
          <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Frontend / Client</span>
              <span className="text-zinc-300">Expo • React Native • Offline Queue</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Data Sync / Network</span>
              <span className="text-zinc-300">Supabase Realtime (&lt;250ms WS)</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Persistence &amp; Security</span>
              <span className="text-zinc-300">PostgreSQL (8 Tables • Multi-Tenant RLS)</span>
            </div>
          </div>
        </div>

        {/* Project 2: ShinPay+ */}
        <div className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors rounded-lg p-4 sm:p-6 shadow-xs">
          {/* Top row: Category badge on left, unified action buttons on right */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded">
              FULL-STACK SAAS
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(shinpay)}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium px-3 sm:px-3.5 py-1.5 rounded-md inline-flex items-center gap-1.5 sm:gap-2 transition-colors justify-center"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Run Test Suite</span>
              </button>
              <a
                href="https://github.com/shin486/ShinPay-"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 text-xs font-medium px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Title, Subtitle & Tech Stack */}
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-100 mt-3">
            ShinPay+
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Multi-Tenant Payroll &amp; Statutory Compliance Engine
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-500 font-mono mt-1">
            Next.js 14 App Router • TypeScript • Supabase PostgreSQL • Pure Math Engine
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2.5 sm:mt-3">
            Multi-tenant payroll and human resource SaaS engineered for Philippine enterprises. 
            Implements tenant-isolated PostgreSQL tables via Supabase RLS, coupled with a zero-allocation mathematical engine computing BIR TRAIN withholding taxes, SSS 2025 schedules, PhilHealth 5% splits, and Pag-IBIG mandatory ceilings.
          </p>

          {/* 3-Column Architecture Spec Grid */}
          <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Frontend / Client</span>
              <span className="text-zinc-300">Next.js 14 (App Router) • TypeScript • Zod</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Statutory Math Engine</span>
              <span className="text-zinc-300">TRAIN • SSS • PhilHealth • Pag-IBIG</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Persistence &amp; Security</span>
              <span className="text-zinc-300">Supabase PostgreSQL • Multi-Tenant RLS</span>
            </div>
          </div>
        </div>

        {/* Project 3: Auto Avenue */}
        <div className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors rounded-lg p-4 sm:p-6 shadow-xs">
          {/* Top row: Category badge on left, unified action buttons on right */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded">
              IMS &amp; POS
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(autoAvenue)}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium px-3 sm:px-3.5 py-1.5 rounded-md inline-flex items-center gap-1.5 sm:gap-2 transition-colors justify-center"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Sandbox</span>
              </button>
              <a
                href="https://github.com/shin486/auto-avenue-ims"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 text-xs font-medium px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Title, Subtitle & Tech Stack */}
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-100 mt-3">
            Auto Avenue
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Inventory Management &amp; POS Integration (150+ SKUs)
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-500 font-mono mt-1">
            PHP • MySQL • Point of Sale Integration • Bootstrap • Git
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2.5 sm:mt-3">
            Engineered a centralized IMS for Auto Avenue Car Care Center managing 150+ automotive spare part and fluid SKUs. 
            Synchronized live Point of Sale checkouts with inventory tables to eliminate stock reconciliation errors and trigger automated vendor purchase orders.
          </p>

          {/* 3-Column Architecture Spec Grid */}
          <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Frontend / Client</span>
              <span className="text-zinc-300">Responsive POS &amp; Inventory UI</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Application Logic</span>
              <span className="text-zinc-300">PHP • Real-Time Stock Reconciliation</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Persistence &amp; Storage</span>
              <span className="text-zinc-300">MySQL Schema • Automated Purchase Orders</span>
            </div>
          </div>
        </div>

        {/* Secondary Technical Deliverables: AVMS & IT Elective 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors rounded-lg p-4 sm:p-5 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded">
                ITSM OPERATIONS
              </span>
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(avms)}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium px-3 py-1.5 rounded-md inline-flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Launch Sandbox</span>
              </button>
            </div>
            <div>
              <h4 className="text-base font-semibold tracking-tight text-zinc-100">
                AVMS
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Automated Visitor Management System
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-mono mt-1">
                Campus Security • QR Passes • RBAC / MFA Logs
              </p>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Campus security portal with encrypted QR access passes, 99.9% uptime SLA ITSM incident lifecycles, and RBAC / MFA verification logs.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors rounded-lg p-4 sm:p-5 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded">
                FULL-STACK &amp; AI
              </span>
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(itelect4)}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium px-3 py-1.5 rounded-md inline-flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Launch Sandbox</span>
              </button>
            </div>
            <div>
              <h4 className="text-base font-semibold tracking-tight text-zinc-100">
                IT Elective 4
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                AI Reviews &amp; Full-Stack Microservice
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-mono mt-1">
                React • Node.js Express • MongoDB • Google Gemini AI
              </p>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              JWT-authenticated REST API with MongoDB, protected tenant routes, and a live Google Gemini AI endpoint (`POST /api/ai`) returning Zod-validated JSON reviews.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIZED TECH STACK MATRIX */}
      <section className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-4 sm:p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-zinc-100">
            Categorized Technical Stack
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Validated technologies verified in production applications and coursework
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Languages */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 pb-1.5 border-b border-zinc-800/60">
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase tracking-wider text-[10px]">Languages</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["TypeScript", "JavaScript (ES6+)", "SQL (PostgreSQL)", "PHP", "HTML5 & CSS3"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Frontend & Mobile */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 pb-1.5 border-b border-zinc-800/60">
              <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase tracking-wider text-[10px]">Mobile &amp; Frontend</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["React Native", "Expo", "React 19", "Next.js 14", "Vite", "Tailwind CSS", "Bootstrap"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 pb-1.5 border-b border-zinc-800/60">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase tracking-wider text-[10px]">Backend &amp; Database</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Supabase", "PostgreSQL (RLS)", "Node.js", "Express", "MongoDB", "MySQL", "REST APIs"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Quality */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 pb-1.5 border-b border-zinc-800/60">
              <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase tracking-wider text-[10px]">DevOps &amp; Quality</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["GitHub Actions CI", "Git PR Workflow", "Vercel Deployments", "Zod Validation", "ITSM SLA Lifecycle", "Jest/Vitest"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </div>
  );
};
