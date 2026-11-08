"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Smartphone,
  Server,
  Play,
  FlaskConical,
  GraduationCap,
  Calendar,
  Code2,
  Lock,
  GitBranch,
  Terminal,
  Activity,
  Check,
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in text-neutral-900 dark:text-zinc-100 font-sans">
      {/* 1. EXECUTIVE CANDIDATE HEADER */}
      <section className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-zinc-800">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative border-2 border-neutral-200 dark:border-zinc-700 shadow-md shrink-0 bg-neutral-900">
              <Image
                src={profilePic}
                alt={profileData.name}
                fill
                priority
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
                  {profileData.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                  VERIFIED CANDIDATE
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-neutral-700 dark:text-zinc-300 mt-0.5">
                Full-Stack &amp; Mobile Developer
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-zinc-400 mt-2">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  BSIT, De La Salle Lipa (Graduating June 2027)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  Lipa City, Batangas, Philippines
                </span>
              </div>
            </div>
          </div>

          {/* Quick PDF Resume Action */}
          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-neutral-950 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-center sm:text-right">
              ✓ Available for 500+ Hours OJT &amp; Full-Time
            </span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white font-medium"
            >
              <Github className="w-4 h-4" />
              <span>github.com/shin486</span>
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              <Linkedin className="w-4 h-4" />
              <span>linkedin.com/in/richard-allen-liman</span>
            </a>
            <a
              href="mailto:richardallen0901@gmail.com"
              className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>richardallen0901@gmail.com</span>
            </a>
          </div>

          {onSwitchToStudio && (
            <button
              type="button"
              onClick={onSwitchToStudio}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-ig-pink hover:underline"
            >
              <span>Switch to Studio View →</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. CORE ENGINEERING METRICS STRIP */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "3 Production Applications",
            stat: "3 Live Deployments",
            desc: "PalengkeHub (Capstone), ShinPay+ (SaaS), Auto Avenue (IMS)",
            icon: Cpu,
            accent: "border-blue-500/30 text-blue-600 dark:text-blue-400",
          },
          {
            title: "100% TypeScript",
            stat: "Zero `any` Debt",
            desc: "Zod runtime schema validation & strict end-to-end contracts",
            icon: Code2,
            accent: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
          },
          {
            title: "Supabase RLS Secured",
            stat: "8+ Normalized Tables",
            desc: "Strict tenant isolation policies & WebSocket Realtime broadcast",
            icon: ShieldCheck,
            accent: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
          },
          {
            title: "Automated Test Coverage",
            stat: "Sub-Millisecond Engine",
            desc: "Real-time client assertion suite verifying PH statutory tables",
            icon: Activity,
            accent: "border-amber-500/30 text-amber-600 dark:text-amber-400",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                  {item.title}
                </span>
                <Icon className={`w-4 h-4 ${item.accent}`} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-black font-mono text-neutral-950 dark:text-white">
                  {item.stat}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-1 leading-snug">
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
            <h2 className="text-lg font-black text-neutral-950 dark:text-white">
              Systems Architecture &amp; Flagship Projects
            </h2>
            <p className="text-xs text-neutral-500 dark:text-zinc-400">
              Interactive sandboxes, architecture diagrams, and production metrics
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 dark:text-zinc-500">
            Click &apos;Launch Sandbox&apos; to test directly
          </span>
        </div>

        {/* Project 1: PalengkeHub */}
        <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8833A]/15 text-[#C96A28] border border-[#E8833A]/30">
                  MOBILE CAPSTONE
                </span>
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  PalengkeHub — Public-Market Price Transparency &amp; Pre-Ordering
                </h3>
              </div>
              <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5">
                React Native · Expo · TypeScript · Supabase Realtime · PostgreSQL RLS
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(palengkehub)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E8833A] hover:bg-[#c96a28] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Launch Mobile Sandbox</span>
              </button>
              <a
                href="https://github.com/shin486/PalengkeHubFinal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 dark:text-zinc-300 leading-relaxed">
            Engineered an offline-first mobile marketplace for municipal market vendors and buyers across Lipa City. 
            Normalized 8+ PostgreSQL tables with strict Row-Level Security, sub-250ms WebSocket price discovery, and deterministic local mutation queue that auto-reconciles when cellular signal restores.
          </p>

          {/* System Architecture Flow */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 text-[11px] font-mono">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
              SYSTEM ARCHITECTURE DATAFLOW
            </span>
            <div className="flex flex-wrap items-center gap-2 text-neutral-700 dark:text-zinc-300">
              <span className="px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 font-bold">
                📱 React Native Client
              </span>
              <span className="text-neutral-400">→ (Offline Mutate) →</span>
              <span className="px-2 py-1 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold">
                💾 AsyncStorage Queue
              </span>
              <span className="text-neutral-400">→ (NetInfo Online) →</span>
              <span className="px-2 py-1 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 font-bold">
                ⚡ Supabase Realtime (WebSocket &lt;250ms)
              </span>
              <span className="text-neutral-400">→ (RLS Filter) →</span>
              <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                🗄️ PostgreSQL (8+ Tables)
              </span>
            </div>
          </div>
        </div>

        {/* Project 2: ShinPay+ */}
        <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#536c51]/15 text-[#536c51] dark:text-[#7ba277] border border-[#536c51]/30">
                  FULL-STACK SAAS
                </span>
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  ShinPay+ — Multi-Tenant Payroll &amp; Statutory Compliance SaaS
                </h3>
              </div>
              <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5">
                Next.js 14 App Router · TypeScript · Supabase PostgreSQL · Tailwind CSS · Pure Math Engine
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(shinpay)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#536c51] hover:bg-[#435641] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Launch &amp; Run Test Suite</span>
              </button>
              <a
                href="https://github.com/shin486/ShinPay-"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 dark:text-zinc-300 leading-relaxed">
            Multi-tenant payroll and human resource SaaS engineered for Philippine enterprises. 
            Implements tenant-isolated PostgreSQL tables via Supabase RLS, coupled with a zero-allocation mathematical engine computing BIR TRAIN withholding taxes, SSS 2025 schedules, PhilHealth 5% splits, and Pag-IBIG mandatory ceilings.
          </p>

          {/* System Architecture Flow */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 text-[11px] font-mono">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
              SYSTEM ARCHITECTURE DATAFLOW
            </span>
            <div className="flex flex-wrap items-center gap-2 text-neutral-700 dark:text-zinc-300">
              <span className="px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 font-bold">
                🖥️ Next.js 14 App Router
              </span>
              <span className="text-neutral-400">→ (Zod Schema Validation) →</span>
              <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                🧮 Pure Math Statutory Engine (5 Tests)
              </span>
              <span className="text-neutral-400">→ (tenant_id Context) →</span>
              <span className="px-2 py-1 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 font-bold">
                🔐 Supabase RLS Protected Schema
              </span>
            </div>
          </div>
        </div>

        {/* Project 3: Auto Avenue */}
        <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  IMS / POS INTEGRATION
                </span>
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  Auto Avenue — Inventory Management System (150+ SKUs)
                </h3>
              </div>
              <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5">
                PHP · MySQL · POS Integration · Bootstrap · Git
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(autoAvenue)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch IMS Sandbox</span>
              </button>
              <a
                href="https://github.com/shin486/auto-avenue-ims"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 dark:text-zinc-300 leading-relaxed">
            Engineered a centralized IMS for Auto Avenue Car Care Center managing 150+ automotive spare part and fluid SKUs. 
            Synchronized live Point of Sale checkouts with inventory tables to eliminate stock reconciliation errors and trigger automated vendor purchase orders.
          </p>
        </div>

        {/* Secondary Technical Deliverables: AVMS & IT Elective 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                ITSM Operations
              </span>
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(avms)}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-0.5"
              >
                <span>Launch Sandbox</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              Automated Visitor Management System (AVMS)
            </h4>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed">
              Campus security portal with encrypted QR access passes, 99.9% uptime SLA ITSM incident lifecycles, and RBAC / MFA verification logs.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                Full-Stack + AI
              </span>
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(itelect4)}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-0.5"
              >
                <span>Launch Sandbox</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              IT Elective 4 — React + Express + Google Gemini AI
            </h4>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed">
              JWT-authenticated REST API with MongoDB, protected tenant routes, and a live Google Gemini AI endpoint (`POST /api/ai`) returning Zod-validated JSON reviews.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIZED TECH STACK MATRIX */}
      <section className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800/90 rounded-2xl p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg font-black text-neutral-950 dark:text-white">
            Categorized Technical Stack
          </h2>
          <p className="text-xs text-neutral-500 dark:text-zinc-400">
            Validated technologies verified in production applications and coursework
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Languages */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-zinc-300 pb-1 border-b border-neutral-200 dark:border-zinc-800">
              <Code2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Languages</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["TypeScript", "JavaScript (ES6+)", "SQL (PostgreSQL)", "PHP", "HTML5 & CSS3"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-700 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Frontend & Mobile */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-zinc-300 pb-1 border-b border-neutral-200 dark:border-zinc-800">
              <Smartphone className="w-3.5 h-3.5 text-[#E8833A]" />
              <span>Mobile &amp; Frontend</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["React Native", "Expo", "React 19", "Next.js 14 (App Router)", "Vite", "Tailwind CSS", "Bootstrap"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-700 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-zinc-300 pb-1 border-b border-neutral-200 dark:border-zinc-800">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span>Backend &amp; Database</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Supabase", "PostgreSQL (RLS)", "Node.js", "Express", "MongoDB", "MySQL", "REST APIs"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-700 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Quality */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/80 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-zinc-300 pb-1 border-b border-neutral-200 dark:border-zinc-800">
              <GitBranch className="w-3.5 h-3.5 text-purple-500" />
              <span>DevOps &amp; Quality</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["GitHub Actions CI", "Git PR Workflow", "Vercel Deployments", "Zod Validation", "ITSM SLA Lifecycle", "Jest/Vitest"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-700 shadow-2xs"
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