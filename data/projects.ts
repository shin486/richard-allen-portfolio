export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  /** Path under /public â€” replace the placeholder file with a real screenshot anytime */
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
}

/**
 * Official project list â€” exactly these five, nothing else.
 * Only add information that is verified. Do not invent features,
 * statistics, roles, or achievements.
 */
export const projectsData: Project[] = [
  {
    id: "palengkehub",
    title: "PalengkeHub",
    description:
      "An Online Stall-Level Price Transparency and Pre-Ordering System in Lipa City Public Market",
    technologies: ["React Native", "Supabase", "JavaScript", "SQL"],
    image: "/projects/palengkehub.svg",
    githubUrl: "https://github.com/shin486/PalengkeHubFinal",
    liveDemoUrl: "",
    featured: true,
  },
  {
    id: "auto-avenue-ims",
    title: "Auto Avenue IMS",
    description: "PHP Inventory Management System",
    technologies: ["PHP"],
    image: "/projects/auto-avenue-ims.svg",
    githubUrl: "https://github.com/shin486/auto-avenue-ims",
    featured: false,
  },
  {
    id: "food-ordering-system",
    title: "Food Ordering System",
    description: "JavaScript Food Ordering Application",
    technologies: ["JavaScript"],
    image: "/projects/food-ordering-system.svg",
    githubUrl: "https://github.com/shin486/food-ordering-system",
    featured: false,
  },
  {
    id: "local-marketplace",
    title: "Local Marketplace",
    description: "MA2 Local Marketplace",
    technologies: ["JavaScript"],
    image: "/projects/local-marketplace.svg",
    githubUrl: "https://github.com/shin486/MA2-local-marketplace",
    featured: false,
  },
  {
    id: "itelect4-project",
    title: "ITElect4 Project",
    description: "TypeScript Project",
    technologies: ["TypeScript"],
    image: "/projects/itelect4-project.svg",
    githubUrl: "https://github.com/shin486/itelect4-project",
    featured: false,
  },
];

export const featuredProject: Project | undefined = projectsData.find(
  (p) => p.featured
);

export const regularProjects: Project[] = projectsData.filter(
  (p) => !p.featured
);

