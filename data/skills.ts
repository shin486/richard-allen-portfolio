export interface SkillCategory {
  title: string;
  categoryKey: string;
  description: string;
  skills: {
    name: string;
    description?: string;
    highlight?: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    categoryKey: "languages",
    description: "Core programming and query languages used across projects",
    skills: [
      { name: "JavaScript", highlight: true, description: "ES6+, Async/Await, DOM manipulation" },
      { name: "TypeScript", highlight: true, description: "Type-safe interfaces, Generics, Next.js" },
      { name: "Java", description: "Object-Oriented Programming, Core Algorithms" },
      { name: "C++", description: "Data Structures, Logic, Memory basics" },
      { name: "SQL", highlight: true, description: "Relational queries, Joins, Schema design" },
    ],
  },
  {
    title: "Frontend Development",
    categoryKey: "frontend",
    description: "Modern frameworks, mobile libraries, and responsive UI systems",
    skills: [
      { name: "React", highlight: true, description: "Hooks, State Management, Component Architecture" },
      { name: "React Native", highlight: true, description: "Mobile app development with Expo" },
      { name: "HTML5", description: "Semantic markup, Accessibility (a11y), SEO" },
      { name: "CSS3", description: "Flexbox, Grid, Custom Keyframe Animations" },
      { name: "Tailwind CSS", highlight: true, description: "Utility-first design, custom configs" },
      { name: "Bootstrap", description: "Rapid prototyping, responsive grids" },
    ],
  },
  {
    title: "Backend & Databases",
    categoryKey: "backend",
    description: "Serverless BaaS, relational databases, and RESTful architectures",
    skills: [
      { name: "Supabase", highlight: true, description: "PostgreSQL, Row Level Security (RLS), Auth" },
      { name: "MySQL", highlight: true, description: "Database design, indexing, stored procedures" },
      { name: "Node.js", description: "REST APIs, Express fundamentals, npm workflows" },
      { name: "REST APIs", description: "Endpoint integration, JSON parsing, Async fetching" },
    ],
  },
  {
    title: "Tools & Workflow",
    categoryKey: "tools",
    description: "Version control, IDEs, and UI/UX design tools",
    skills: [
      { name: "Git", highlight: true, description: "Branching, committing, merge resolution" },
      { name: "GitHub", highlight: true, description: "Repository hosting, PR reviews, CI/CD basics" },
      { name: "VS Code", description: "Primary code editor, extensions, debugging" },
      { name: "Figma", highlight: true, description: "Wireframing, UI prototyping, design systems" },
      { name: "Canva", description: "Graphic assets, presentation design" },
      { name: "Expo", highlight: true, description: "React Native rapid testing & deployment" },
    ],
  },
];
