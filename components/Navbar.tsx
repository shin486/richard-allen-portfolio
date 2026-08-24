"use client";

import React, { useState } from "react";
import { Search, X, Github, Linkedin, FileText, Home, Mail, Code2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

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

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0B0B0F]/85 backdrop-blur-md border-b border-neutral-200 dark:border-zinc-800 transition-colors duration-200 rise-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Scroll to top"
          >
            <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring shadow-sm transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
                <span className="font-bold text-xs tracking-wider ig-gradient-text">RAL</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                {profileData.preferredName}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-zinc-400 leading-none hidden sm:inline font-mono">
                @{profileData.username}
              </span>
            </div>
          </button>
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
  );
};
