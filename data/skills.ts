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
    ],
  },
];
