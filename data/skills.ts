export interface SkillItem {
  name: string;
  description?: string;
  highlight?: boolean;
  usedIn?: string[];
}

export interface SkillCategory {
  title: string;
  categoryKey: string;
  description: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    categoryKey: "languages",
    description: "Core programming and query languages used across projects",
    skills: [
      {
        name: "Python",
        highlight: true,
        description: "Python Essentials 1 & 2 (Cisco), automation, data structures",
        usedIn: ["Academic Coursework", "Cisco Certifications"],
      },
      {
        name: "JavaScript",
        highlight: true,
        description: "ES6+, Async/Await, DOM manipulation",
        usedIn: ["PalengkeHub", "Crave Cart"],
      },
      {
        name: "TypeScript",
        highlight: true,
        description: "Type-safe interfaces, Generics, Full-Stack apps",
        usedIn: ["ShinPay+", "Submission Tracker", "Portfolio"],
      },
      {
        name: "PHP",
        description: "Server-side scripting & POS/IMS integration",
        usedIn: ["Auto Avenue"],
      },
      {
        name: "SQL",
        highlight: true,
        description: "Relational queries, Joins, Schema design",
        usedIn: ["PalengkeHub", "ShinPay+", "Auto Avenue"],
      },
      {
        name: "Java",
        description: "Object-Oriented Programming, Core Algorithms",
        usedIn: ["Academic Coursework"],
      },
      {
        name: "C++",
        description: "Data Structures, Logic, Memory basics",
        usedIn: ["Academic Coursework"],
      },
    ],
  },
  {
    title: "Frontend & Mobile",
    categoryKey: "frontend",
    description: "Modern frameworks, mobile libraries, and responsive UI systems",
    skills: [
      {
        name: "Next.js 14",
        highlight: true,
        description: "App Router, Multi-tenant SaaS architecture, SSR",
        usedIn: ["ShinPay+", "Portfolio"],
      },
      {
        name: "React",
        highlight: true,
        description: "Hooks, State Management, Component Architecture",
        usedIn: ["Submission Tracker", "ShinPay+", "PalengkeHub"],
      },
      {
        name: "React Native",
        highlight: true,
        description: "Cross-platform mobile marketplace development",
        usedIn: ["PalengkeHub"],
      },
      {
        name: "Tailwind CSS",
        highlight: true,
        description: "Utility-first responsive design & custom themes",
        usedIn: ["ShinPay+", "Portfolio"],
      },
      {
        name: "HTML5 & CSS3",
        description: "Semantic markup, Flexbox, Grid, Animations",
        usedIn: ["PalengkeHub", "Crave Cart", "AVMS"],
      },
      {
        name: "Bootstrap",
        description: "Responsive UI components and layout grids",
        usedIn: ["Auto Avenue"],
      },
    ],
  },
  {
    title: "Backend & Databases",
    categoryKey: "backend",
    description: "Serverless BaaS, relational/NoSQL databases, and REST APIs",
    skills: [
      {
        name: "Supabase",
        highlight: true,
        description: "PostgreSQL, Row-Level Security (RLS), Auth, Storage",
        usedIn: ["PalengkeHub", "ShinPay+"],
      },
      {
        name: "PostgreSQL",
        highlight: true,
        description: "Multi-tenant relational schemas & RLS policies",
        usedIn: ["ShinPay+", "PalengkeHub"],
      },
      {
        name: "Node.js & Express",
        highlight: true,
        description: "REST APIs, JWT auth, rate-limiting, local file handling",
        usedIn: ["Submission Tracker", "PalengkeHub", "Crave Cart"],
      },
      {
        name: "MongoDB",
        description: "Document data modeling & tenant-isolated CRUD",
        usedIn: ["Submission Tracker"],
      },
      {
        name: "MySQL",
        highlight: true,
        description: "Relational inventory & POS database management",
        usedIn: ["Auto Avenue"],
      },
      {
        name: "SQLite",
        description: "Embedded local relational database",
        usedIn: ["Academic Coursework"],
      },
      {
        name: "JWT & REST APIs",
        highlight: true,
        description: "Stateless JWT authentication, protected routes, and tenant-isolated REST APIs",
        usedIn: ["Submission Tracker", "Crave Cart"],
      },
      {
        name: "Zod",
        highlight: true,
        description: "Runtime TypeScript schema validation for structured AI JSON and API payloads",
        usedIn: ["Submission Tracker", "ShinPay+"],
      },
    ],
  },
  {
    title: "Tools & Workflow",
    categoryKey: "tools",
    description: "Version control, cloud deployment, analytics, automation, and UI/UX tools",
    skills: [
      {
        name: "Git & GitHub",
        highlight: true,
        description: "Multi-branch workflows, Pull Requests, version control",
        usedIn: ["Submission Tracker", "Auto Avenue", "PalengkeHub"],
      },
      {
        name: "Vercel",
        highlight: true,
        description: "Full-stack & frontend cloud deployment, env configs",
        usedIn: ["ShinPay+", "Submission Tracker", "Portfolio"],
      },
      {
        name: "Postman",
        highlight: true,
        description: "REST API testing, endpoint debugging & validation",
        usedIn: ["Submission Tracker"],
      },
      {
        name: "Vite",
        description: "Fast frontend build tooling and dev server",
        usedIn: ["Submission Tracker"],
      },
      {
        name: "Figma",
        highlight: true,
        description: "Wireframing, UI prototyping, design systems",
        usedIn: ["PalengkeHub", "ShinPay+"],
      },
      {
        name: "Linux",
        description: "Basic shell navigation, scripts, system environments",
        usedIn: ["Development & Academic"],
      },
      {
        name: "VS Code",
        description: "Primary code editor, extensions, debugging",
        usedIn: ["All Projects"],
      },
      {
        name: "Expo",
        highlight: true,
        description: "React Native mobile development & testing",
        usedIn: ["PalengkeHub"],
      },
      {
        name: "Power BI",
        description: "Interactive business intelligence dashboards and data reporting",
        usedIn: ["Analytics & Reporting"],
      },
      {
        name: "UiPath",
        description: "Robotic Process Automation (RPA) workflow design and automation",
        usedIn: ["Process Automation"],
      },
    ],
  },
  {
    title: "Cloud & AI",
    categoryKey: "cloud-ai",
    description:
      "Cloud infrastructure, generative AI workflows, RAG pipelines, and machine learning",
    skills: [
      {
        name: "AWS Cloud",
        highlight: true,
        description:
          "Backed by AWS Certified Cloud Practitioner (CLF-C02) completion (EC2, S3, Lambda, IAM, VPC, cloud architecture & pricing) plus underlying AWS cloud hosting for PalengkeHub and ShinPay+.",
        usedIn: ["AWS CLF-C02", "PalengkeHub", "ShinPay+"],
      },
      {
        name: "Amazon Bedrock",
        highlight: true,
        description:
          "Backed by AWS Certified AI Practitioner (AIF-C01) completion (Foundation Models, RAG pipelines, Prompt Engineering, SageMaker, Guardrails & Responsible AI).",
        usedIn: ["AWS AIF-C01", "RAG & Guardrails"],
      },
      {
        name: "Azure AI",
        highlight: true,
        description:
          "Backed by Microsoft Azure AI Fundamentals completion (Computer Vision, Natural Language Processing, Conversational AI & Cognitive Services).",
        usedIn: ["Azure AI Fundamentals", "NLP & Vision"],
      },
      {
        name: "Google Gemini",
        highlight: true,
        description:
          "Backed by Gemini Certified Student (University) from Google for Education (Applied generative AI workflows, prompt engineering & AI-assisted development).",
        usedIn: ["Gemini Certified", "Submission Tracker"],
      },
      {
        name: "Machine Learning",
        highlight: true,
        description:
          "Backed by Fundamentals of Artificial Intelligence completion (Supervised & unsupervised learning, neural networks, classification/regression & model evaluation).",
        usedIn: ["AI Fundamentals", "Neural Networks & ML"],
      },
    ],
  },
];

/**
 * Shared Cloud, AI & Resume Tooling supplement groups rendered in Recruiter Dossier
 * and Skills views so all resume tools connect clearly to deployment and engineering tags.
 */
export const cloudAiStackGroups = [
  {
    id: "cloud-infra",
    label: "Cloud & Infrastructure",
    tags: [
      "AWS (EC2, S3, Lambda, IAM, VPC)",
      "Microsoft Azure (AI Fundamentals)",
      "Vercel",
      "Supabase (Auth, Storage, RLS)",
    ],
  },
  {
    id: "ai-ml",
    label: "AI & Applied ML",
    tags: [
      "Google Gemini AI",
      "Amazon Bedrock (RAG & Guardrails)",
      "Prompt Engineering",
    ],
  },
  {
    id: "validation-automation",
    label: "APIs, Validation & Automation",
    tags: [
      "REST APIs",
      "JWT Authentication",
      "Zod Schema Validation",
      "Power BI",
      "UiPath",
    ],
  },
] as const;
