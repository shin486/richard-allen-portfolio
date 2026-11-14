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
        usedIn: ["ShinPay+", "IT Elective 4 Project", "Portfolio"],
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
        usedIn: ["IT Elective 4 Project", "ShinPay+"],
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
        usedIn: ["IT Elective 4 Project", "Crave Cart"],
      },
      {
        name: "MongoDB",
        description: "Document data modeling & tenant-isolated CRUD",
        usedIn: ["IT Elective 4 Project"],
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
    ],
  },
  {
    title: "Tools & Workflow",
    categoryKey: "tools",
    description: "Version control, cloud deployment, and UI/UX design tools",
    skills: [
      {
        name: "Git & GitHub",
        highlight: true,
        description: "Multi-branch workflows, Pull Requests, version control",
        usedIn: ["IT Elective 4 Project", "Auto Avenue", "PalengkeHub"],
      },
      {
        name: "Vercel",
        highlight: true,
        description: "Full-stack & frontend cloud deployment, env configs",
        usedIn: ["ShinPay+", "IT Elective 4 Project", "Portfolio"],
      },
      {
        name: "Postman",
        highlight: true,
        description: "REST API testing, endpoint debugging & validation",
        usedIn: ["IT Elective 4 Project"],
      },
      {
        name: "Vite",
        description: "Fast frontend build tooling and dev server",
        usedIn: ["IT Elective 4 Project"],
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
        name: "PowerBI & UiPath",
        description: "Data visualization & basic Robotic Process Automation",
        usedIn: ["Academic Coursework"],
      },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    categoryKey: "cloud",
    description:
      "Cloud architecture, serverless compute, IAM security, and managed hosting",
    skills: [
      {
        name: "AWS (EC2, S3, Lambda, IAM, VPC)",
        highlight: true,
        description:
          "Cloud compute, object storage, serverless functions, identity governance, and VPC networking",
        usedIn: ["AWS CLF-C02 Course Completion"],
      },
      {
        name: "Microsoft Azure (AI Fundamentals)",
        highlight: true,
        description:
          "Azure AI workloads, cognitive services, NLP, and conversational AI pipelines",
        usedIn: ["TESDA Azure AI Course Completion"],
      },
      {
        name: "Render",
        description: "Managed backend service & Node/Express web hosting",
        usedIn: ["IT Elective 4 Project"],
      },
    ],
  },
  {
    title: "AI & Applied ML",
    categoryKey: "ai",
    description:
      "Generative AI workflows, retrieval augmentation, and model fundamentals",
    skills: [
      {
        name: "Generative AI / LLMs (RAG, Prompt Engineering, Amazon Bedrock, Google Gemini)",
        highlight: true,
        description:
          "Applied LLM integrations, retrieval-augmented generation, prompt design, and responsible AI",
        usedIn: ["Portfolio (Byte AI)", "Google Gemini Certified", "TESDA AIF-C01"],
      },
    ],
  },
];

/**
 * Shared Cloud & AI stack supplement groups rendered alongside the SHIN-28 matrix
 * so Cloud & AI credentials connect directly to deployment and infrastructure tags.
 */
export const cloudAiStackGroups = [
  {
    id: "cloud-infra",
    label: "Cloud & Infrastructure",
    tags: [
      "AWS (EC2, S3, Lambda, IAM, VPC)",
      "Microsoft Azure (AI Fundamentals)",
      "Vercel",
      "Supabase",
      "Render",
    ],
  },
  {
    id: "ai-ml",
    label: "AI & Applied ML",
    tags: [
      "Generative AI / LLMs (RAG, Prompt Engineering, Amazon Bedrock, Google Gemini)",
    ],
  },
] as const;
