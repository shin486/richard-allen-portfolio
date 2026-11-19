export type ProjectClassification =
  | "mobile-platform"
  | "fullstack-saas-ai"
  | "web-itsm";

export interface ProjectClassificationMeta {
  id: ProjectClassification;
  label: string;
  shortLabel: string;
  description: string;
}

export const PROJECT_CLASSIFICATIONS: ProjectClassificationMeta[] = [
  {
    id: "mobile-platform",
    label: "Mobile & Cross-Platform",
    shortLabel: "Mobile",
    description:
      "Offline-first React Native mobile applications, realtime WebSocket price sync, and Supabase PostgreSQL RLS.",
  },
  {
    id: "fullstack-saas-ai",
    label: "Full-Stack SaaS & AI",
    shortLabel: "Full-Stack & AI",
    description:
      "Multi-tenant Next.js SaaS engines, Google Gemini AI REST services, and real-time POS inventory systems.",
  },
  {
    id: "web-itsm",
    label: "Web Systems & ITSM",
    shortLabel: "Web & ITSM",
    description:
      "IT Service Management security frameworks, QR gate access control, and interactive web ordering apps.",
  },
];

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
  classification: ProjectClassification;
  classificationLabel: string;
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
 * Official project list — verified projects classified by engineering domain.
 */
export const projectsData: Project[] = [
  {
    id: "palengkehub",
    milestones: [
      { date: "2026-03", label: "Capstone Started" },
      { date: "2026-10", label: "Capstone Completed" },
    ],
    title: "PalengkeHub",
    subtitle: "Cross-Platform Public-Market Marketplace & Price Transparency",
    description:
      "Developed a cross-platform mobile and web marketplace using React Native, React.js, Expo, Node.js, and Supabase for public-market price transparency and stall-level pre-ordering in Lipa City Public Market. Built Supabase authentication and database workflows across consumer, vendor, and administrator roles covering product management, transaction processing, and administrative reporting — validated with a 100% pass rate across 18 functional test scenarios and a 4.17/5.00 overall UAT mean score across 30 evaluators (Usability 4.35/5.00, Functionality 4.28/5.00).",
    role: "Full-Stack Developer",
    category: "Mobile",
    classification: "mobile-platform",
    classificationLabel: "Mobile & Cross-Platform",
    year: "March 2026 – October 2026",
    technologies: [
      "React Native",
      "React.js",
      "Expo",
      "Node.js",
      "Supabase",
      "PostgreSQL",
    ],
    image: "/projects/palengkehub.svg",
    githubUrl: "https://github.com/shin486/PalengkeHubFinal",
    liveDemoUrl: "",
    featured: true,
    badge: "Capstone · 4.17/5 UAT",
    hasLiveDemo: true,
    demoSummary: "Test real-time market price discovery, offline signal drop simulation, and stall pre-ordering for Lipa City Public Market.",
    keyFeatures: [
      "100% pass rate across 18 functional test scenarios and 4.17/5.00 overall UAT mean across 30 evaluators (20 consumers, 8 vendors, 2 admins)",
      "Led by Usability (4.35/5.00) and Functionality (4.28/5.00) in Lipa City Public Market field evaluation",
      "Cross-platform mobile & web marketplace (React Native, React.js, Expo, Node.js) with real-time stall price transparency & pre-ordering",
      "Supabase authentication & PostgreSQL Row-Level Security (RLS) supporting consumer, vendor, and admin reporting workflows",
    ],
  },
  {
    id: "shinpay-plus",
    milestones: [{ date: "2026-09", label: "SaaS Build Started" }],
    inProgress: true,
    title: "ShinPay+",
    subtitle: "Multi-Tenant Payroll & HR SaaS with Statutory Tax Engine",
    description:
      "Architecting a multi-tenant payroll and HR SaaS platform with Next.js App Router, TypeScript, Tailwind CSS, and Vercel deployments to streamline employee management, payroll processing, and Philippine statutory compliance for local businesses. Implementing PostgreSQL schemas, authentication, file storage, and Row-Level Security (RLS) via Supabase to enforce database-level tenant isolation across organizations.",
    role: "Full-Stack Developer",
    category: "Full-Stack",
    classification: "fullstack-saas-ai",
    classificationLabel: "Full-Stack SaaS & AI",
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
    githubUrl: "https://github.com/shin486/ShinPay-",
    featured: false,
    badge: "In Progress",
    hasLiveDemo: true,
    demoSummary: "Run interactive payroll disbursals and trigger the live client-side assertion test suite verifying statutory deduction formulas.",
    keyFeatures: [
      "Multi-tenant PostgreSQL schemas, authentication, file storage, and Row-Level Security (RLS) enforcing database-level tenant isolation",
      "Deterministic PH statutory engine: TRAIN withholding tax, SSS 2025 schedule, PhilHealth 5%, and Pag-IBIG caps",
      "Automated computation of 13th-month pay, de minimis benefits, overtime differentials, and BIR 2316 exports",
      "Interactive in-browser test runner executing real-time mathematical assertions with sub-millisecond execution",
    ],
  },
  {
    id: "itelect4-project",
    milestones: [
      { date: "2026-08", label: "Submission Tracker Started" },
      { date: "2026-10", label: "Deployed on Vercel" },
    ],
    title: "Submission Tracker",
    subtitle: "Full-Stack JWT CRUD & Google Gemini AI Platform",
    description:
      "Engineered a full-stack application with React, Express, and MongoDB delivering JWT-authenticated CRUD operations, protected routes, and tenant-isolated data across a REST API to keep user records strictly separated. Integrated Google Gemini AI into a live POST /api/ai endpoint returning structured JSON reviews validated with Zod and protected by API rate-limiting, deployed across frontend and backend services on Vercel via a multi-branch Pull Request workflow.",
    role: "Full-Stack Developer",
    category: "Full-Stack",
    classification: "fullstack-saas-ai",
    classificationLabel: "Full-Stack SaaS & AI",
    year: "August 2026 – October 2026",
    technologies: ["TypeScript", "React", "Express", "MongoDB", "JWT", "Zod"],
    image: "/projects/itelect4-project.svg",
    githubUrl: "https://github.com/shin486/itelect4-project",
    featured: false,
    badge: "Full-Stack · AI",
    hasLiveDemo: true,
    demoSummary: "Test live Google Gemini AI structured JSON reviews (POST /api/ai + Zod) and JWT-authenticated REST CRUD operations.",
    keyFeatures: [
      "JWT-authenticated CRUD operations, protected routes, and tenant-isolated data across an Express + MongoDB REST API",
      "Live Google Gemini AI endpoint (POST /api/ai) returning Zod-validated structured JSON reviews with rate limiting to prevent quota abuse",
      "Frontend and backend deployed to Vercel with environment-driven configuration and isolated release configs",
      "Engineered under a multi-branch Git workflow with Pull Requests per deliverable for clean code reviews",
    ],
  },
  {
    id: "auto-avenue-ims",
    milestones: [{ date: "2025-04", label: "Project Charter" }],
    title: "Auto Avenue",
    subtitle: "Inventory Management System & POS Integration (150+ SKUs)",
    description:
      "Engineered a centralized, web-based Inventory Management System (IMS) for Auto Avenue Car Care Center in Batangas. Designed to eliminate manual stock tracking errors, manage over 150+ automotive spare part and fluid SKUs, and integrate directly with Point of Sale (POS) checkouts for real-time stock deduction, low-threshold alerts, and automated purchase order generation.",
    role: "Full-Stack Developer",
    category: "Full-Stack",
    classification: "fullstack-saas-ai",
    classificationLabel: "Full-Stack SaaS & AI",
    year: "April 2025",
    technologies: ["PHP", "MySQL", "Bootstrap", "Git"],
    image: "/projects/auto-avenue-ims.svg",
    githubUrl: "https://github.com/shin486/auto-avenue-ims",
    featured: false,
    badge: "IMS / POS",
    hasLiveDemo: true,
    demoSummary: "Simulate a live POS checkout across 150+ SKUs and inspect automated threshold stock deduction.",
    keyFeatures: [
      "Real-time inventory engine tracking 150+ automotive SKUs with automated reorder threshold triggers",
      "Direct Point of Sale (POS) transactional integration ensuring zero reconciliation discrepancies",
      "Role-based access control (RBAC) with detailed stock adjustment audit trails and supplier management",
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
    classification: "web-itsm",
    classificationLabel: "Web Systems & ITSM",
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
    classification: "web-itsm",
    classificationLabel: "Web Systems & ITSM",
    year: "IT Elective 1 Project",
    technologies: [
      "Node.js",
      "Express",
      "JavaScript",
      "REST APIs",
      "Local Storage",
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
