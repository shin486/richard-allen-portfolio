"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  X,
  Github,
  Linkedin,
  FileText,
  Home,
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
} from "lucide-react";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { ThemeToggle } from "./ThemeToggle";
import { VerifiedBadge } from "./VerifiedBadge";
import { PixelStickmanJourney } from "./PixelStickmanJourney";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onSelectTab,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToSection = (id: string, tabName?: string) => {
    if (tabName && onSelectTab) {
      onSelectTab(tabName);
    }
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleOpenByteChat = () => {
    setSwitcherOpen(false);
    window.dispatchEvent(new CustomEvent("open-byte-chat"));
  };

  const handleOpenRecruiterModal = () => {
    setSwitcherOpen(false);
    setRecruiterModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0B0B0F]/85 backdrop-blur-md border-b border-neutral-200 dark:border-zinc-800 transition-colors duration-200 rise-in">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* Instagram Account Switcher Brand Trigger */}
          <div className="relative" ref={switcherRef} data-note="Hey, that is my stickman. He is walking towards graduation, do not distract him.">
            {/* 8-Bit Pixel Walking Stickman Journey (Pauses on Hover, Abstract Black/White) */}
            <PixelStickmanJourney onClick={() => setSwitcherOpen((prev) => !prev)} />

            {/* Instagram Account Switcher Popover */}
            {switcherOpen && (
              <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#14141A] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 animate-scale-up">
                <div className="px-3 py-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                    Switch View
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    Open for OJT
                  </span>
                </div>

                {/* Option 1: Default Portfolio Account */}
                <button
                  onClick={() => {
                    setSwitcherOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-neutral-100/80 dark:bg-zinc-800/60 text-left transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full p-[1.5px] animated-ig-ring flex-shrink-0">
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
                        <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100 truncate">
                          {profileData.username}
                        </span>
                        <VerifiedBadge className="w-3 h-3" />
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                        Full Portfolio Experience
                      </p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </button>

                {/* Option 2: Recruiter Fast-Pass */}
                <button
                  onClick={handleOpenRecruiterModal}
                  className="w-full mt-1 flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-zinc-800/50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-700 dark:text-zinc-200 flex-shrink-0 group-hover:border-neutral-400 dark:group-hover:border-zinc-500 transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-zinc-100 truncate">
                        Recruiter Fast-Pass
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                        OJT spec sheet, stack &amp; PDF resume
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-zinc-200 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                </button>

                {/* Option 3: Byte Assistant */}
                <button
                  onClick={handleOpenByteChat}
                  className="w-full mt-1 flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-zinc-800/50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-700 dark:text-zinc-200 flex-shrink-0 group-hover:border-neutral-400 dark:group-hover:border-zinc-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-zinc-100 truncate">
                        Byte Assistant
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400 truncate">
                        Ask about projects, role &amp; skills
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-zinc-200 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                </button>
              </div>
            )}
          </div>

          {/* Center: Search Field */}
          <div className="flex-1 max-w-xs sm:max-w-sm mx-2 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search projects, skills..."
                aria-label="Search projects"
                className="w-full pl-9 pr-8 py-1.5 bg-neutral-100 dark:bg-zinc-900/90 text-sm text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 rounded-lg border border-transparent dark:border-zinc-800/80 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-zinc-600 focus:bg-white dark:focus:bg-zinc-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Quick Actions & Theme Switcher */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("profile-header")}
              className="p-2 text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Home"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("portfolio-grid", "projects")}
              className="p-2 text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Projects"
              aria-label="Projects"
            >
              <Code2 className="w-4 h-4" />
            </button>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.resumeUrl}
              data-note="There is the resume. Grab it before someone else hires me first."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Resume"
              aria-label="Resume"
            >
              <FileText className="w-4 h-4" />
            </a>

            {/* Theme Switcher Toggle */}
            <div className="ml-1">
              <ThemeToggle />
            </div>

            <button
              onClick={() => scrollToSection("contact-section", "contact")}
              data-note="Click Contact. We could literally be coworkers by next week."
              className="ml-1 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-ig-gradient hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </nav>
        </div>

        {/* Mobile Search Dropdown */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0F] animate-fade-in">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search projects, skills (e.g. react, mobile)..."
                aria-label="Search projects"
                className="w-full pl-9 pr-8 py-2 bg-neutral-100 dark:bg-zinc-900 text-sm text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 rounded-lg border border-transparent dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-zinc-600"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Recruiter Fast-Pass Modal (Clean Candidate Spec Sheet) */}
      {recruiterModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Recruiter Fast-Pass Candidate Summary"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setRecruiterModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#14141A] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full p-[1.5px] animated-ig-ring flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                    <Image
                      src={profilePic}
                      alt={profileData.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
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
                onClick={() => setRecruiterModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[78vh] overflow-y-auto">
              {/* Logistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-700 dark:text-zinc-300" />
                    <span>Target Role</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    Full-Stack / Software Dev OJT
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    Open to other IT internship roles
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-700 dark:text-zinc-300" />
                    <span>Education</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    De La Salle Lipa
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                    BS Information Technology · June 2027
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-700 dark:text-zinc-300" />
                    <span>Location &amp; Setup</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    Mataas na Kahoy, Batangas
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                    On-site, Hybrid, or Remote
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 mb-1">
                    <Terminal className="w-3.5 h-3.5 text-neutral-700 dark:text-zinc-300" />
                    <span>Primary Stack</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-zinc-100">
                    React, Next.js, React Native
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                    TypeScript, Supabase, Node.js, SQL
                  </p>
                </div>
              </div>

              {/* Key Projects Snapshot */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                  Key Full-Stack Projects
                </h3>
                <div className="divide-y divide-neutral-200 dark:divide-zinc-800 border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                  <div className="p-3 bg-white dark:bg-zinc-900/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                        PalengkeHub (Capstone)
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        Mobile marketplace &amp; price transparency · React Native, Supabase
                      </p>
                    </div>
                    <a
                      href="https://github.com/shin486/PalengkeHubFinal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      title="View on GitHub"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-3 bg-white dark:bg-zinc-900/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                        ShinPay+ (In Progress)
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        Multi-tenant payroll &amp; HR SaaS with RLS · Next.js 14, TypeScript
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-zinc-900/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-zinc-100">
                        IT Elective 4 Project
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        JWT-authenticated CRUD &amp; live REST API · React, Express, MongoDB
                      </p>
                    </div>
                    <a
                      href="https://github.com/shin486/itelect4-project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      title="View on GitHub"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-neutral-50 dark:bg-zinc-900/80 border-t border-neutral-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href={profileData.socials.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Richard_Allen_Liman_Resume.pdf"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
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
