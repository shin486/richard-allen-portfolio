"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-800/60 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-neutral-100 dark:bg-zinc-800/80 hover:bg-neutral-200 dark:hover:bg-zinc-700/80 border border-neutral-200 dark:border-zinc-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ig-pink/40"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-4 h-4 sm:w-4 sm:h-4">
        {theme === "light" ? (
          <Moon className="w-4 h-4 transition-transform rotate-0 scale-100 text-neutral-700" />
        ) : (
          <Sun className="w-4 h-4 transition-transform rotate-0 scale-100 text-yellow-400" />
        )}
      </div>
    </button>
  );
};
