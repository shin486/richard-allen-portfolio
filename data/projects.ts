export interface ProjectMilestone {
  /** Sortable date in YYYY-MM format (e.g. "2025-09") */
  date: string;
  /** Short label shown on the Journey Timeline (e.g. "Started", "Completed") */
  label: string;
}

export interface Project {
  id: string;
  /** Journey Timeline entries — projects without milestones are not shown on the timeline */
  milestones?: ProjectMilestone[];
  /** True while the project is still being built (shows a live indicator on the timeline) */
  inProgress?: boolean;
  title: string;
  subtitle: string;
  description: string;
  operationsNote?: string;
  role: string;
  category: "Mobile" | "Web" | "Full-Stack" | "Academic";
  year: string;
  technologies: string[];
  /** Path under /public — replace the placeholder file with a real screenshot anytime */
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
  badge?: string;
  keyFeatures?: string[];
  /** True when an in-portfolio interactive sandbox is available */
  hasLiveDemo?: boolean;
  /** 1-sentence prompt for what recruiters can test in the interactive demo */
  demoSummary?: string;
}

/**
 * Official project list — verified projects and details.
 */
export const projectsData: Project[] = [
  {
    id: "palengkehub",
    milestones: [
      { date: "2025-09", label: "Capstone Started" },
      { date: "2026-10", label: "Capstone Completed" },
    ],
    title: "PalengkeHub",
    subtitle: "Public-Market Price Transparency & Pre-Ordering",
    description:
      "Developed a mobile marketplace application for public-market price transparency and pre-ordering, enabling consumers to view product prices, locate stalls, and place orders. Integrated Supabase authentication and database operations to support consumer, vendor, and administrator workflows, including product management, transaction processing, and administrative reporting.",
    role: "Full-Stack Developer",
    category: "Mobile",
    year: "September 2025 – October 2026",
    technologies: ["JavaScript", "React Native", "Supabase", "HTML"],
    image: "/projects/palengkehub.svg",
    githubUrl: "https://github.com/shin486/PalengkeHubFinal",
    liveDemoUrl: "",
    featured: true,
    badge: "Capstone",
    hasLiveDemo: true,
    demoSummary: "Test public-market price transparency & pre-ordering in a simulated mobile device.",
    keyFeatures: [
      "Consumer mobile marketplace for viewing product prices, locating stalls, and placing pre-orders",
      "Supabase authentication and database operations across consumer, vendor, and administrator workflows",
      "Product management, transaction processing, and administrative reporting",
    ],
  },
  {
    id: "shinpay-plus",
    milestones: [{ date: "2026-09", label: "SaaS Build Started" }],
    inProgress: true,
    title: "ShinPay+",
    subtitle: "Multi-Tenant Payroll & HR SaaS (In Progress)",
    description:
      "Developing a multi-tenant payroll and HR SaaS application designed to support employee management, payroll processing, and Philippine statutory compliance for local businesses. Building full-stack application functionality using Next.js App Router and TypeScript, with Supabase providing PostgreSQL database services, authentication, file storage, and Row-Level Security (RLS). Implementing tenant-aware data access controls and using Tailwind CSS with Vercel for deployment.",
    role: "Full-Stack Developer",
    category: "Full-Stack",
    year: "September 2026 – Present",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    image: "/projects/shinpay-plus.svg",
    featured: false,
    badge: "In Progress",
    hasLiveDemo: true,
    demoSummary: "Calculate Philippine statutory payroll (SSS, PhilHealth, Pag-IBIG, TRAIN Tax) and test tenant RLS.",
    keyFeatures: [
      "Multi-tenant payroll processing, employee management, and Philippine statutory compliance",
      "Full-stack Next.js 14 App Router and TypeScript architecture deployed on Vercel",
      "Supabase PostgreSQL database, authentication, file storage, and tenant-aware Row-Level Security (RLS)",
    ],
  },
  {
    id: "itelect4-project",
    milestones: [{ date: "2026-08", label: "Full-Stack + Gemini AI" }],
    inProgress: true,
    title: "IT Elective 4 Project",
    subtitle: "Full-Stack CRUD & Google Gemini AI Integration",
    description:
      "Built a full-stack app with React + Express + MongoDB, delivering JWT-authenticated CRUD with protected routes and tenant-isolated data across a REST API. Integrated Google Gemini AI into a live endpoint (POST /api/ai), returning structured JSON reviews validated with Zod and rate-limited to prevent quota abuse. Deployed both frontend and backend to Vercel with environment-driven configuration, managed via a multi-branch Git workflow with Pull Requests per deliverable.",
    role: "Full-Stack Developer",
    category: "Full-Stack",
    year: "August 2026 – Present",
    technologies: ["TypeScript", "React", "Vite", "Express", "MongoDB"],
    image: "/projects/itelect4-project.svg",
    githubUrl: "https://github.com/shin486/itelect4-project",
    featured: false,
    badge: "Full-Stack",
    hasLiveDemo: true,
    demoSummary: "Test live Google Gemini AI prompt evaluation (POST /api/ai) and authenticated REST CRUD operations.",
    keyFeatures: [
      "JWT-authenticated CRUD with protected routes and tenant-isolated data across a REST API",
      "Live Google Gemini AI endpoint (POST /api/ai) returning Zod-validated JSON reviews with rate limiting",
      "Frontend and backend deployed to Vercel via environment-driven config and multi-branch PR workflow",
    ],
  },
  {
    id: "auto-avenue-ims",
    milestones: [{ date: "2025-04", label: "Project Charter" }],
    title: "Auto Avenue",
    subtitle: "Inventory Management System (Project Charter: April 2025)",
    description:
      "Developed a centralized, web-based Inventory Management System (IMS) for Auto Avenue Car Care Center in Mataas na Kahoy, Batangas, to eliminate manual tracking errors, optimize stock levels, and integrate directly with the existing Point of Sale (POS) system for real-time inventory updates and automated reordering alerts.",
    role: "Full-Stack Developer",
    category: "Full-Stack",
    year: "April 2025",
    technologies: ["PHP", "MySQL", "Bootstrap", "Git"],
    image: "/projects/auto-avenue-ims.svg",
    githubUrl: "https://github.com/shin486/auto-avenue-ims",
    featured: false,
    badge: "IMS / POS",
    hasLiveDemo: true,
    demoSummary: "Simulate a live POS checkout and watch real-time stock deduction trigger automated vendor reorder POs.",
    keyFeatures: [
      "Centralized web-based Inventory Management System for Auto Avenue Car Care Center",
      "Direct Point of Sale (POS) system integration for real-time inventory updates",
      "Optimized stock tracking and automated reordering alerts to eliminate manual errors",
    ],
  },
  {
    id: "avms",
    milestones: [{ date: "2024-12", label: "ITSM Project" }],
    title: "Automated Visitor Management System (AVMS)",
    subtitle: "IT Service Management (ITSM) Project",
    description:
      "Developed a comprehensive, hybrid, web-based campus visitor management system designed to enhance security, efficiency, and user experience. Features include online pre-registration, QR-coded badges for secure access tracking, customizable access levels based on visitor categories (regular visitors, guests, and contractors), and automated SMS/email host notifications.",
    operationsNote:
      "Engineered around IT Service Management (ITSM) principles, featuring a detailed Service Level Agreement (SLA) targeting 99.9% uptime, structured incident and problem management lifecycles, and a rigorous security framework ensuring confidentiality, integrity, and availability through RBAC, MFA, encryption, and audit logs.",
    role: "IT Service Management Project",
    category: "Web",
    year: "December 2024",
    technologies: [
      "ITSM",
      "QR Access Control",
      "RBAC & MFA",
      "SLA (99.9% Uptime)",
      "Encryption & Audit Logs",
    ],
    image: "/projects/avms.svg",
    featured: false,
    badge: "ITSM Project",
    hasLiveDemo: true,
    demoSummary: "Issue encrypted campus visitor QR gate passes and inspect the 99.9% uptime SLA ITSM operations log.",
    keyFeatures: [
      "Online pre-registration, QR-coded badges, and customizable access levels by visitor category",
      "Automated SMS and email host notifications for campus security and visitor tracking",
      "ITSM-engineered operations with 99.9% uptime SLA and structured incident/problem lifecycles",
      "Security framework enforcing RBAC, MFA, encryption, and audit logs",
    ],
  },
  {
    id: "crave-cart",
    title: "Crave Cart",
    subtitle: "Food Ordering System (IT Elective 1 Project)",
    description:
      "Developed a lightweight, locally hosted web-based food ordering system designed to streamline customer ordering for small food businesses. Features include a digital menu browser, cart management, order placement confirmation, promotional banners, an embedded Google Map for store location, and a local file-handling feedback system built with Node.js.",
    role: "Full-Stack Developer",
    category: "Web",
    year: "IT Elective 1 Project",
    technologies: [
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript",
      "Local File Handling",
    ],
    image: "/projects/crave-cart.svg",
    githubUrl: "https://github.com/shin486/food-ordering-system",
    featured: false,
    badge: "Web App",
    hasLiveDemo: true,
    demoSummary: "Customize dishes in an interactive food kiosk, apply coupons, and print a formatted Node.js order receipt.",
    keyFeatures: [
      "Digital menu browser, interactive cart management, and order placement confirmation",
      "Promotional banners and embedded Google Map for store location",
      "Local file-handling customer feedback system built with Node.js",
    ],
  },
];

export const featuredProject: Project | undefined = projectsData.find(
  (p) => p.featured
);

export const regularProjects: Project[] = projectsData.filter(
  (p) => !p.featured
);
