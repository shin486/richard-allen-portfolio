"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  X,
  FileText,
  Mail,
  Code2,
  ChevronDown,
  ChevronRight,
  Check,
  CheckCircle2,
  Briefcase,
  MessageSquare,
  GraduationCap,
  MapPin,
  Terminal,
  ArrowUpRight,
  User,
  Grid,
  Bookmark,
  Clock,
  Send,
  Menu,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import profilePic from "@/assets/PROFILEPIC.png";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeTab = "projects",
  onSelectTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalTechCount = skillsData.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(e.target as Node)
      ) {
        setSwitcherOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSwitcherOpen(false);
        setRecruiterModalOpen(false);
        setMobileMenuOpen(false);
      }
      // Alt+K -> Ask AI Assistant
      if (e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-byte-chat"));
      }
      // Alt+R -> Recruiter Summary Modal
      if (e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setRecruiterModalOpen((prev) => !prev);
      }
      // '/' -> Focus search input when not typing in an input/textarea
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigateTo = (sectionId: string, tabName?: string) => {
    if (tabName && onSelectTab) {
      onSelectTab(tabName);
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = window.innerWidth >= 1024 ? 24 : 68;
        const top =
          element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 30);
  };

  const handleOpenByteChat = () => {
    setSwitcherOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-byte-chat"));
  };

  const handleOpenRecruiterModal = () => {
    setSwitcherOpen(false);
    setMobileMenuOpen(false);
    setRecruiterModalOpen(true);
  };

  const navItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      isActive: false,
    },
    {
      id: "projects",
      label: "Projects Feed",
      count: String(projectsData.length).padStart(2, "0"),
      icon: Grid,
      onClick: () => navigateTo("portfolio-tabs", "projects"),
      isActive: activeTab === "projects",
    },
    {
      id: "skills",
      label: "Tech Stack",
      count: String(totalTechCount).padStart(2, "0"),
      icon: Code2,
      onClick: () => navigateTo("portfolio-tabs", "skills"),
      isActive: activeTab === "skills",
    },
    {
      id: "certificates",
      label: "Certificates",
      count: String(certificatesData.length).padStart(2, "0"),
      icon: Bookmark,
      onClick: () => navigateTo("portfolio-tabs", "certificates"),
      isActive: activeTab === "certificates",
    },
    {
      id: "about",
      label: "Journey & Bio",
      icon: Clock,
      onClick: () => navigateTo("portfolio-tabs", "about"),
      isActive: activeTab === "about",
    },
    {
      id: "contact",
      label: "Direct Message",
      icon: Send,
      onClick: () => navigateTo("contact-section"),
      isActive: false,
    },
  ];

  return (
    <>
      {/* =====================================================================
          1. DESKTOP FIXED LEFT SIDEBAR RAIL (Instagram Web Desktop × Bryl Lim)
          ===================================================================== */}
      <aside
        aria-label="Primary Sidebar Navigation"
        className="hidden lg:flex lg:flex-col lg:justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 xl:w-64 border-r border-neutral-200 dark:border-zinc-800/80 bg-[#fafafa] dark:bg-[#0a0a0b] px-5 py-6 z-40 select-none"
      >
        <div className="space-y-6">
          {/* Top Handle / Account Switcher */}
          <div className="relative" ref={switcherRef}>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSwitcherOpen((prev) => !prev)}
                className="group flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-zinc-900 text-left focus:outline-none transition-colors"
                aria-expanded={switcherOpen}
                aria-haspopup="true"
              >
                <span className="font-mono font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                  @{profileData.username}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                  title="Available for OJT & Roles"
                />
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                    switcherOpen ? "rotate-180 text-neutral-900 dark:text-white" : ""
                  }`}
                />
              </button>

              <ThemeToggle />
            </div>

            {/* Account Switcher Popover */}
            {switcherOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#121216] border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-neutral-100 dark:border-zinc-800/80 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                    Switch Mode
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    Active
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSwitcherOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-neutral-100/80 dark:bg-zinc-800/60 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative bg-neutral-900 shrink-0 border border-neutral-300 dark:border-zinc-700">
                      <Image
                        src={profilePic}
                        alt={profileData.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono font-bold text-xs text-neutral-900 dark:text-white truncate">
                        @{profileData.username}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                        {profileData.name}
                      </p>
                    </div>
                  </div>
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenRecruiterModal}
                  className="w-full mt-1 flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800/50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-700 dark:text-zinc-300 shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-neutral-900 dark:text-zinc-100">
                        Recruiter Fast-Track
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                        1-page summary &amp; CV PDF
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenByteChat}
                  className="w-full mt-1 flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800/50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-700 dark:text-zinc-300 shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-neutral-900 dark:text-zinc-100">
                        Ask AI Assistant
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                        Ask about projects &amp; skills
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
            )}
          </div>

          {/* Minimalist Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full pl-8 pr-7 py-1.5 bg-white dark:bg-zinc-900/90 border border-neutral-200 dark:border-zinc-800/90 rounded-lg text-xs text-neutral-900 dark:text-zinc-100 placeholder:text-neutral-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200"
              >
                <X className="w-3 h-3" />
              </button>
            ) : (
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1 py-0.2 text-[9px] font-mono text-neutral-400 dark:text-zinc-500 bg-neutral-100 dark:bg-zinc-800 rounded border border-neutral-200 dark:border-zinc-700 pointer-events-none">
                /
              </kbd>
            )}
          </div>

          {/* Primary Navigation Rail */}
          <nav className="space-y-1 text-[13px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
                    item.isActive
                      ? "bg-neutral-200/70 dark:bg-zinc-900 text-neutral-900 dark:text-white font-medium border border-neutral-300/70 dark:border-zinc-800"
                      : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/40 dark:hover:bg-zinc-900/40 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </span>
                  {item.count && (
                    <span className="font-mono text-[11px] tabular-nums text-neutral-400 dark:text-zinc-500">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Keyboard Shortcuts Section (Bryl Lim style) */}
          <div className="pt-4 border-t border-neutral-200 dark:border-zinc-800/80 space-y-2.5 text-xs text-neutral-500 dark:text-zinc-400">
            <button
              type="button"
              onClick={handleOpenByteChat}
              className="w-full flex items-center justify-between hover:text-neutral-900 dark:hover:text-white transition-colors text-left"
            >
              <span>Ask AI Assistant</span>
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded text-neutral-700 dark:text-zinc-300">
                  Alt
                </kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded text-neutral-700 dark:text-zinc-300">
                  K
                </kbd>
              </span>
            </button>

            <button
              type="button"
              onClick={handleOpenRecruiterModal}
              className="w-full flex items-center justify-between hover:text-neutral-900 dark:hover:text-white transition-colors text-left"
            >
              <span>Recruiter Summary</span>
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded text-neutral-700 dark:text-zinc-300">
                  Alt
                </kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded text-neutral-700 dark:text-zinc-300">
                  R
                </kbd>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Direct Contact Footer */}
        <div className="pt-5 border-t border-neutral-200 dark:border-zinc-800/80 space-y-2 text-xs">
          <p className="text-neutral-500 dark:text-zinc-500 leading-relaxed text-[11px]">
            For OJT, internships &amp; full-stack projects, reach me at
          </p>
          <a
            href={`mailto:${profileData.socials.email}`}
            className="block font-mono text-[11.5px] text-neutral-800 dark:text-zinc-200 hover:text-black dark:hover:text-white underline underline-offset-4 truncate"
          >
            {profileData.socials.email}
          </a>
        </div>
      </aside>

      {/* =====================================================================
          2. MOBILE / TABLET STICKY TOP HEADER (< lg)
          ===================================================================== */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-[#fafafa]/90 dark:bg-[#0a0a0b]/90 backdrop-blur-md border-b border-neutral-200 dark:border-zinc-800/80">
        <div className="px-4 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-left"
          >
            <span className="font-mono font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
              @{profileData.username}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenRecruiterModal}
              className="px-2.5 py-1 rounded-md border border-neutral-200 dark:border-zinc-800 font-mono text-[11px] font-medium text-neutral-700 dark:text-zinc-300"
            >
              CV / Info
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-lg text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200/50 dark:hover:bg-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-neutral-200 dark:border-zinc-800 bg-[#fafafa] dark:bg-[#0a0a0b] space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search projects, skills..."
                className="w-full pl-8 pr-8 py-1.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-lg text-xs text-neutral-900 dark:text-zinc-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                      item.isActive
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                        : "bg-white dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          3. RECRUITER FAST-TRACK MODAL
          ===================================================================== */}
      {recruiterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setRecruiterModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#121216] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-neutral-900 border border-neutral-200 dark:border-zinc-700 shrink-0">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-mono font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                      {profileData.name}
                    </h2>
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-zinc-400">
                    Candidate Overview &amp; OJT Logistics
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRecruiterModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Target Role</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    Full-Stack / Mobile Dev OJT
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    Open to software &amp; IT internships
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Education</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    De La Salle Lipa
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                    BS Information Technology · 2027
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location &amp; Setup</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    Lipa City / Batangas
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                    On-site, Hybrid, or Remote
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Primary Stack</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    Next.js, React, React Native
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                    TypeScript, Supabase, PostgreSQL
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                  Flagship Shipped Systems
                </h3>
                <div className="divide-y divide-neutral-200 dark:divide-zinc-800 border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                  <div className="p-3 bg-white dark:bg-zinc-900/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                        PalengkeHub (Capstone)
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        Lipa Public Market mobile app &amp; Presyo Check · React Native, Supabase
                      </p>
                    </div>
                    <a
                      href="https://github.com/shin486/PalengkeHubFinal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-3 bg-white dark:bg-zinc-900/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                        ShinPay+ Enterprise Payroll
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        2025 PH SSS, PhilHealth 5%, Pag-IBIG &amp; BIR TRAIN engine · Next.js, TS
                      </p>
                    </div>
                    <a
                      href="https://github.com/shin486/ShinPay-"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-3 bg-white dark:bg-zinc-900/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                        IT Elective 4 AI Submission Tracker
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        Gemini 2.5 Flash code review + Zod schema validation · React 19, Prisma
                      </p>
                    </div>
                    <a
                      href="https://itelect4-project-nine.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-neutral-50 dark:bg-zinc-900/80 border-t border-neutral-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href={profileData.socials.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Richard_Allen_Liman_Resume.pdf"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Download Official Resume (PDF)</span>
              </a>
              <a
                href={`mailto:${profileData.socials.email}?subject=OJT%20/%20Internship%20Inquiry%20-%20Richard%20Allen%20Liman`}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Directly</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
