---
name: Richard Allen Portfolio Design System
description: The Cybernetic Social Atelier — dual-modality developer showcase blending social storytelling with executive engineering rigor
colors:
  primary: "#DD2A7B"
  primary-gradient-start: "#F58529"
  primary-gradient-end: "#8134AF"
  primary-gradient-blue: "#515BD4"
  secondary: "#10B981"
  neutral-dark: "#0A0A0B"
  neutral-dark-surface: "#111215"
  neutral-studio-bg-light: "#FFFFFF"
  neutral-studio-bg-dark: "#0B0B0F"
  neutral-studio-card-dark: "#16161D"
  neutral-text-light: "#111111"
  neutral-text-dark: "#F4F4F6"
  neutral-text-muted: "#9CA3AF"
  neutral-border-light: "#E5E5E5"
  neutral-border-dark: "#27272A"
typography:
  display:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
  micro:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.04em"
  badge:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  retro:
    fontFamily: 'Silkscreen, monospace'
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  button-secondary:
    backgroundColor: "{colors.neutral-dark-surface}"
    textColor: "{colors.neutral-text-dark}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-terminal:
    backgroundColor: "#17191E"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  badge-status:
    backgroundColor: "rgba(16, 185, 129, 0.1)"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  card-milled:
    backgroundColor: "{colors.neutral-studio-card-dark}"
    textColor: "{colors.neutral-text-dark}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: Richard Allen Portfolio

## Overview

**Creative North Star: "The Cybernetic Social Atelier"**

The design system bridges two complementary worlds: the human warmth and expressive vibrancy of modern social media (Instagram profiles, story highlight reels, 8-bit stickman micro-narratives, and 3D mechanical hardware) and the uncompromising clarity of high-density engineering dossiers (terminal emerald accents, architecture sequence diagrams, and mathematical test runners).

Rather than forcing a single compromise mode, the system deliberately supports dual synchronized expressions: the **Social Studio** (creative feed view with Three.js mechanical keycaps) and the **Recruiter Dossier** (`?view=recruiter`, an executive jet-black workspace tailored for 30-second candidate evaluation). Both share a unified design engineering philosophy: tactile, responsive surfaces that respond physically to touch and cursor position, paired with strict truthfulness in technical claims.

**Key Characteristics:**
- **Tactile Materiality**: Milled top highlights, radial cursor-reactive spotlight sheens, and physical spring-physics tabs replace generic flat boxes.
- **Dual Accent Hierarchy**: Vibrant sunset aurora gradients (`#F58529` to `#8134AF`) signal interactive discovery, while Terminal Emerald (`#10B981`) is reserved exclusively for verified engineering proof, active test assertions, and status badges.
- **Anti-Boilerplate Integrity**: Every widget, stat, and interactive sandbox represents real production code or verified academic deliverables; no placeholder cards or fabricated metrics.

## Colors

The palette balances deep space darkness with radiant warmth, anchored by high-contrast terminal greens for functional verification.

### Primary
- **Electric Magenta** (#DD2A7B): Core interactive accent and gradient midpoint used for primary action buttons, active tab indicators, and notification rings.
- **Sunset Aurora Gradient** (`linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)`): Brand signature gradient applied to profile story rings, hero text highlights, and featured project badges.

### Secondary
- **Terminal Emerald** (#10B981): Functional verification color used for "Open to Work / OJT" badges, verified architectural stages, test runner checkmarks, and terminal CTA highlights.
- **Cobalt Deep** (#515BD4): Gradient anchor and interactive state foundation for high-contrast focus rings and secondary links.

### Neutral
- **Jet Obsidian** (#0A0A0B): Recruiter Dossier canvas background, creating an executive, ultra-dark terminal atmosphere.
- **Studio Dark Canvas** (#0B0B0F) & **Studio Secondary** (#111116): Social Studio dark mode foundation, paired with surface card containers (#16161D).
- **Studio Light Canvas** (#FFFFFF) & **Light Secondary** (#FAFAFA): Clean high-key light mode foundation with soft neutral borders (#E5E5E5).
- **High-Contrast Text** (#F4F4F6 in dark / #111111 in light): Maximum legibility typography for headlines and body.
- **Muted Zinc** (#9CA3AF in dark / #6B6B6B in light): Metadata, secondary labels, timestamps, and architectural subtitles.

### Named Rules
**The Proof-in-Emerald Rule.** The color `#10B981` (Terminal Emerald) may never be used for purely decorative illustrations or generic buttons. It is strictly reserved for verified technical proof: passing tests, verified credentials, live sandbox status, and availability indicators.

**The Gradient Hierarchy Rule.** The full 4-stop Sunset Aurora gradient is restricted to high-intent discovery focal points (the profile avatar ring, featured story triggers, and main logo marks). Secondary UI controls must use solid or 2-stop muted treatments to prevent visual noise.

## Typography

**Display Font:** Geist Sans (with Inter, `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` fallback)  
**Body Font:** Geist Sans (with Inter, system sans fallback)  
**Technical Mono (The Signature Register):** Geist Mono / JetBrains Mono (with `SFMono-Regular, Menlo, Monaco, Consolas, monospace` fallback)  
**Retro Pixel Accent:** Silkscreen (used for the 8-bit stickman thought balloon, journey milestones, and retro interactive copy)

**Character:** Swiss minimalist restraint inspired by the **Bryl Lim design system** (`bryllim/bryl-minimal-design`). Typography, casing, and tracking establish hierarchy instead of icon fluff or excessive scale jumps. Monospaced uppercase micro-labels drive structural navigation and architectural layering.

### Hierarchy
- **Display** (Bold 700, 2.5rem / 40px, line-height 1.15, letter-spacing -0.025em): Portfolio title, hero value proposition, and main dossier section headers.
- **Headline** (SemiBold 600, 1.5rem / 24px, line-height 1.25, letter-spacing -0.02em): Project titles, modal headers, and section groupings.
- **Title** (SemiBold 600, 1.125rem / 18px, line-height 1.35): Card titles, modal tab titles, and dialog headers.
- **Body** (Regular 400, 0.875rem / 14px to 1rem / 16px, line-height 1.6, max line length ~70ch): Project descriptions, biographical narrative, and architectural breakdowns.
- **Label** (Medium 500, 0.75rem / 12px, letter-spacing 0.05em, uppercase or code style): Badges, technology chips, date ranges, and terminal metrics.
- **Micro** (SemiBold 600, 0.6875rem / 11px, line-height 1.3, letter-spacing 0.04em): Story highlight timestamps, sub-category chips, and secondary metadata.
- **Badge** (Bold 700, 0.625rem / 10px, line-height 1.2, letter-spacing 0.05em): Keycap short-labels, numeric slide counters, and live verification chips.

### Named Rules
**The Monospace For Truth Rule.** Every numerical metric, date timestamp, table name, database key, architectural layer (e.g. `Client`, `API`, `PostgreSQL`), and terminal output must be rendered in monospace typography.

## Layout

The portfolio employs a responsive dual-view architecture tailored to viewing intent:

- **Desktop Social Studio (`xl` to `2xl`)**: Max-width container (`1440px` to `1560px`) featuring an asymmetric two-column grid: a flexible main feed column (`max-w-4xl`) on the left, paired with a sticky right sidebar (`340px` to `380px`) hosting the Three.js 3D mechanical tech stack keyboard (`TechKeyboard3D`).
- **Recruiter Dossier View**: Clean, single-column executive layout (`max-w-[1200px]`) with dedicated horizontal architecture walkthroughs and live device previews.
- **Mobile Viewports (`< 768px`)**: Single-column vertical flow with full-bleed touch targets (minimum 44px), horizontal scrollable story reels (`no-scrollbar`), and bottom-anchored modal action drawers.
- **Breakpoint Scale**: `xs: 380px`, `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.
- **Rhythm & Spacing**: 8pt grid system using 4px (`xs`), 8px (`sm`), 16px (`md`), 24px (`lg`), 32px (`xl`), and 48px (`2xl`).

## Elevation & Depth

Surfaces combine structural tonal layering with precision directional lighting:

- **Tonal Hierarchy**: Dark mode depth is established through stepped surface luminance (`#0A0A0B` base → `#111215` panel → `#16161D` card) rather than heavy drop shadows.
- **Milled Hardware Rim**: Cards feature an inner top highlight simulating overhead studio lighting (`inset 0 1px 0 0 rgba(255, 255, 255, 0.08)` in dark; `inset 0 1px 0 0 rgba(255, 255, 255, 0.8)` in light).
- **Cursor Spotlight Sheen**: Interactive cards display a subtle radial gradient tracking cursor movements (`rgba(221, 42, 123, 0.09)` or `rgba(255, 255, 255, 0.07)`).

### Shadow Vocabulary
- **Milled Card** (`box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.08), 0 10px 28px -8px rgba(0,0,0,0.55)`): Standard project and skill card depth.
- **Pixel RPG Balloon** (`box-shadow: 0 -3px 0 0 #3b3b4f, 0 3px 0 0 #3b3b4f, -3px 0 0 0 #3b3b4f, 3px 0 0 0 #3b3b4f`): 8-bit stepped pixel boundary for stickman thought bubbles.
- **Beacon Pulse** (`box-shadow: 0 0 0 5px rgba(255, 255, 255, 0)`): Periodic radar ping for live demo sandboxes and interactive keycaps.

### Named Rules
**The Milled Edge Rule.** Dark mode cards must never rely on high-blur black drop shadows alone; they must incorporate a 1px specular top rim (`inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`) to define form boundaries against deep backgrounds.

## Shapes

- **Radius Strategy**:
  - `rounded-sm` (6px): Monospace code chips, technical status badges, and terminal button controls.
  - `rounded-md` (10px): Primary interactive buttons, search input fields, and small cards.
  - `rounded-lg` (16px) & `rounded-xl` (20px): Project cards, modal windows, and main surface panels.
  - `rounded-full` (9999px): Story highlight rings, avatar containers, spring pill tabs, and floating action buttons.
- **Border Treatment**: 1px subtle hairline borders (`border-white/[0.08]` in dark, `border-neutral-200` in light). Borders recede visually to let content lead.

## Components

### Buttons
- **Shape:** Medium rounded (`rounded-md`, 10px radius) with crisp optical centering.
- **Primary Action:** Sunset aurora gradient background (`linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)`), white bold text, `10px 18px` padding. On hover: subtle scale `translateY(-1px)` and intensified glow.
- **Terminal Action:** `#17191E` background, `1px solid rgba(255, 255, 255, 0.12)`, `#10B981` text with green Play or Terminal icon, monospace typography, `6px 12px` padding.
- **Secondary / Ghost:** Transparent or `#111215` background with `1px solid border-white/[0.08]`, hover background `#16161D`.

### Chips & Badges
- **Status Badge:** `rgba(16, 185, 129, 0.1)` green tint, `1px solid rgba(16, 185, 129, 0.3)`, `#10B981` monospace text, `4px 8px` padding.
- **Tech Stack Tag:** `#111215` background, `border-white/[0.06]`, muted text `#9CA3AF`, hover text `#F4F4F6`.

### Cards & Containers
- **Corner Style:** Rounded 16px (`rounded-lg` / `rounded-xl`).
- **Background:** `#16161D` in Studio Dark; `#111215` in Dossier Dark.
- **Highlight:** Milled card inner specular rim and hover spotlight sheen.
- **Internal Padding:** `20px` to `24px` on desktop, `16px` on mobile.

### Inputs & Fields
- **Style:** `#111215` background, 1px neutral border (`border-neutral-200` light / `border-zinc-800` dark), `rounded-md` (10px).
- **Focus:** Crisp ring transition to `#DD2A7B` in Studio or `#10B981` in Dossier mode with zero outline offset.

### Navigation
- **Top Sticky Navbar:** Frosted glass background (`bg-white/85` or `bg-[#0B0B0F]/85` with `backdrop-blur-md`), 1px bottom border. Hosts the stickman avatar, account switcher popover, search field, view switcher, and quick resume link.
- **Spring Tab Bar:** Segmented control utilizing spring physics (`cubic-bezier(0.22, 1, 0.36, 1)`) for pill indicator sliding.

### Signature Component: 3D Mechanical Tech Keyboard (`TechKeyboard3D`)
- **Description:** A physical, interactive 28-key mechanical keyboard rendered in Three.js on the right desktop rail. Each keycap corresponds to a production technology (React, Next.js, Supabase, TypeScript, Python, etc.) with custom keycap travel, mechanical switch click audio, and automatic active-project tech illumination.

## Do's and Don'ts

### Do:
- **Do** maintain strict parity between claim and proof: every project listed must have working code, architecture breakdowns, or an interactive sandbox.
- **Do** preserve the dual-view architecture: recruiters must always have 1-click access to the high-density `RecruiterDossierView` (`?view=recruiter`).
- **Do** enforce `prefers-reduced-motion`: disable 3D keyboard spring loops and continuous stickman scrolling for users with motion sensitivity.
- **Do** use monospace typography (`JetBrains Mono` / `SF Mono`) for all system metrics, code snippets, dates, and database terminology.

### Don't:
- **Don't** use Terminal Emerald (`#10B981`) for purely decorative backgrounds, generic badges, or unverified claims.
- **Don't** add generic stock illustrations or floating gradient blobs that lack interactive or semantic meaning.
- **Don't** use muddy, ungrounded black drop shadows (`box-shadow: 0 10px 30px #000`); always use stepped tonal surfaces and milled inner highlights.
- **Don't** break keyboard navigation or screen reader accessibility when introducing Three.js canvas components.
