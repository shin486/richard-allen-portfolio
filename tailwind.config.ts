import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FFFFFF",
          lightSec: "#FAFAFA",
          dark: "#0B0B0F",
          darkSec: "#111116",
          darkCard: "#16161D",
        },
        foreground: {
          light: "#111111",
          lightSec: "#6B6B6B",
          dark: "#F5F5F5",
          darkSec: "#A1A1AA",
        },
        border: {
          light: "#E5E5E5",
          dark: "#27272A",
        },
        ig: {
          pink: "#DD2A7B",
          purple: "#8134AF",
          orange: "#F58529",
          yellow: "#FCAF45",
          blue: "#515BD4",
        },
      },
      backgroundImage: {
        "ig-gradient": "linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
        "ig-gradient-animated": "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4, #F58529)",
        "ig-gradient-subtle-light": "linear-gradient(135deg, rgba(245, 133, 41, 0.08) 0%, rgba(221, 42, 123, 0.08) 50%, rgba(129, 52, 175, 0.08) 100%)",
        "ig-gradient-subtle-dark": "linear-gradient(135deg, rgba(245, 133, 41, 0.15) 0%, rgba(221, 42, 123, 0.15) 50%, rgba(129, 52, 175, 0.15) 100%)",
      },
      animation: {
        "heart-pop": "heartPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "scale-up": "scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "ring-rotate": "ringRotate 8s linear infinite",
        "drift-slow": "driftSlow 25s ease-in-out infinite alternate",
        "theme-switch": "themeSwitch 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-flow-1": "lineFlow1 40s ease-in-out infinite alternate",
        "line-flow-2": "lineFlow2 55s ease-in-out infinite alternate",
        "line-flow-3": "lineFlow3 48s ease-in-out infinite alternate",
      },
      keyframes: {
        heartPop: {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        ringRotate: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        driftSlow: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(15px, -15px) scale(1.02)" },
          "100%": { transform: "translate(-10px, 10px) scale(0.98)" },
        },
        themeSwitch: {
          "0%": { opacity: "0", transform: "scale(0.8) rotate(-30deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        lineFlow1: {
          "0%": { transform: "translate(-2%, -2%) translateX(0) translateY(0)" },
          "50%": { transform: "translate(2%, 3%) translateX(20px) translateY(-12px)" },
          "100%": { transform: "translate(-1%, 2%) translateX(-18px) translateY(10px)" },
        },
        lineFlow2: {
          "0%": { transform: "translate(1%, 0) translateX(0) translateY(0)" },
          "50%": { transform: "translate(-3%, 2%) translateX(-22px) translateY(14px)" },
          "100%": { transform: "translate(2%, -1%) translateX(16px) translateY(-8px)" },
        },
        lineFlow3: {
          "0%": { transform: "translate(0, 2%) translateX(0) translateY(0)" },
          "50%": { transform: "translate(2%, -2%) translateX(18px) translateY(12px)" },
          "100%": { transform: "translate(-2%, 1%) translateX(-14px) translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
