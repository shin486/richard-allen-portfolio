export type HighlightStoryType =
  | "text"
  | "image"
  | "project"
  | "skills"
  | "certificate"
  | "education"
  | "contact";

export interface HighlightStory {
  id: string;
  type: HighlightStoryType;
  heading: string;
  subheading?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  features?: string[];
  badge?: string;
  timeAgo?: string;
  duration?: number; // duration in ms (default: 5000ms)
  quote?: string;
  authorNote?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: { title: string; subtitle?: string; tag?: string }[];
}

export interface HighlightGroup {
  id: string;
  title: string;
  coverIcon: string;
  timeAgo?: string;
  stories: HighlightStory[];
}

export const highlightsData: HighlightGroup[] = [
  {
    id: "about",
    title: "About",
    coverIcon: "User",
    timeAgo: "1d ago",
    stories: [
      {
        id: "about-1",
        type: "text",
        heading: "Hi, I'm Richard Allen",
        subheading: "Aspiring Full-Stack Developer",
        description:
          "I'm an Information Technology student at De La Salle Lipa passionate about building practical, user-focused web and mobile applications.",
        quote: "Turning everyday ideas into intuitive digital experiences.",
        badge: "About Me",
        timeAgo: "1d ago",
        duration: 5500,
      },
      {
        id: "about-2",
        type: "text",
        heading: "What I Love Building",
        subheading: "Full-Stack & Mobile Development",
        description:
          "I specialize in bridging responsive frontend interfaces (React, Next.js, React Native) with scalable backend architectures and SQL databases.",
        items: [
          { title: "Mobile Apps", subtitle: "React Native & Expo cross-platform utilities", tag: "Mobile" },
          { title: "Modern Web Apps", subtitle: "Next.js, TypeScript & Tailwind CSS", tag: "Web" },
          { title: "Backend Systems", subtitle: "Supabase, PostgreSQL & RESTful APIs", tag: "Backend" },
        ],
        badge: "Focus Areas",
        timeAgo: "1d ago",
        duration: 6000,
      },
      {
        id: "about-3",
        type: "text",
        heading: "My Goal & Mindset",
        subheading: "Preparing for OJT & Internships",
        description:
          "I am actively seeking an internship or On-the-Job Training opportunity where I can collaborate with talented engineering teams, build real-world software, and continuously elevate my technical craft.",
        quote: "Always learning, building, and solving real user problems.",
        badge: "Open to Work",
        timeAgo: "1d ago",
        duration: 5500,
      },
    ],
  },

  {
    id: "projects",
    title: "Projects",
    coverIcon: "Code2",
    timeAgo: "2d ago",
    stories: [
      {
        id: "proj-palengkehub",
        type: "project",
        heading: "PalengkeHub",
        subheading: "Featured Project • Capstone",
        description:
          "An Online Stall-Level Price Transparency and Pre-Ordering System in Lipa City Public Market.",
        image: "/projects/palengkehub.svg",
        technologies: ["React Native", "Supabase", "JavaScript", "SQL"],
        badge: "Capstone Project",
        githubUrl: "https://github.com/shin486/PalengkeHubFinal",
        timeAgo: "2d ago",
        duration: 6500,
      },
      {
        id: "proj-others",
        type: "text",
        heading: "More Projects",
        subheading: "Web & Academic Projects",
        description:
          "Other projects I have built, all available on my GitHub.",
        items: [
          { title: "Auto Avenue IMS", subtitle: "PHP Inventory Management System", tag: "PHP" },
          { title: "Food Ordering System", subtitle: "JavaScript Food Ordering Application", tag: "JavaScript" },
          { title: "Local Marketplace", subtitle: "MA2 Local Marketplace", tag: "JavaScript" },
          { title: "ITElect4 Project", subtitle: "TypeScript Project", tag: "TypeScript" },
        ],
        buttonText: "View All on GitHub",
        buttonUrl: "https://github.com/shin486",
        badge: "Projects",
        timeAgo: "2d ago",
        duration: 6500,
      },
    ],
  },

  {
    id: "skills",
    title: "Skills",
    coverIcon: "Terminal",
    timeAgo: "3d ago",
    stories: [
      {
        id: "skills-frontend",
        type: "skills",
        heading: "Frontend & Languages",
        subheading: "Core Stack",
        description:
          "Building modern, accessible, and high-performance user interfaces across web and mobile platforms.",
        items: [
          { title: "JavaScript (ES6+)", subtitle: "Async/Await, DOM, Events", tag: "Language" },
          { title: "TypeScript", subtitle: "Strong typing, Interfaces, Next.js", tag: "Language" },
          { title: "React & Next.js", subtitle: "App Router, Hooks, SSR/SSG", tag: "Frontend" },
          { title: "React Native", subtitle: "Expo mobile development", tag: "Mobile" },
          { title: "Tailwind CSS", subtitle: "Modern responsive utility systems", tag: "Styling" },
        ],
        badge: "Frontend Stack",
        timeAgo: "3d ago",
        duration: 5500,
      },
      {
        id: "skills-backend-tools",
        type: "skills",
        heading: "Backend, DB & Tools",
        subheading: "Data & Workflow",
        description:
          "Configuring reliable databases, REST APIs, and collaborative developer workflows.",
        items: [
          { title: "Supabase & PostgreSQL", subtitle: "Relational queries, Auth, RLS", tag: "Database" },
          { title: "MySQL", subtitle: "Schema design, Normalization, Joins", tag: "Database" },
          { title: "Git & GitHub", subtitle: "Version control, Branching, PRs", tag: "Tools" },
          { title: "Figma", subtitle: "UI/UX wireframing & prototyping", tag: "Design" },
          { title: "VS Code & Expo", subtitle: "Development environment & testing", tag: "Dev Tools" },
        ],
        badge: "Backend & Tooling",
        timeAgo: "3d ago",
        duration: 5500,
      },
    ],
  },

  {
    id: "certificates",
    title: "Certificates",
    coverIcon: "Award",
    timeAgo: "4d ago",
    stories: [
      {
        id: "cert-python-1",
        type: "certificate",
        heading: "Python Essentials 1",
        subheading: "Cisco Networking Academy",
        badge: "Certification",
        timeAgo: "4d ago",
        duration: 5000,
      },
      {
        id: "cert-python-2",
        type: "certificate",
        heading: "Python Essentials 2",
        subheading: "Cisco Networking Academy",
        badge: "Certification",
        timeAgo: "4d ago",
        duration: 5000,
      },
      {
        id: "cert-ethical-hacking",
        type: "certificate",
        heading:
          "Bridging Ethical Hacking and Data Analytics: Building Smarter and Safer Systems",
        subheading: "De La Salle Lipa",
        badge: "2026",
        timeAgo: "4d ago",
        duration: 6000,
      },
      {
        id: "cert-devroutes",
        type: "certificate",
        heading: "DevRoutes: Learning How to Learn with Roadmaps",
        subheading: "De La Salle Lipa / Swinburne University of Technology",
        badge: "2026",
        timeAgo: "4d ago",
        duration: 6000,
      },
      {
        id: "cert-ai-ethics",
        type: "certificate",
        heading: "AI Ethics and Governance",
        subheading: "USAID / Asia Open RAN Academy",
        badge: "Certification",
        timeAgo: "4d ago",
        duration: 5000,
      },
    ],
  },

  {
    id: "education",
    title: "Education",
    coverIcon: "GraduationCap",
    timeAgo: "5d ago",
    stories: [
      {
        id: "edu-dlsl",
        type: "education",
        heading: "De La Salle Lipa",
        subheading: "BS Information Technology",
        description:
          "Currently pursuing a Bachelor of Science in Information Technology with expected graduation in June 2027.",
        items: [
          { title: "Degree Program", subtitle: "Bachelor of Science in Information Technology", tag: "BSIT" },
          { title: "Institution", subtitle: "De La Salle Lipa • Lipa City, Batangas", tag: "DLSL" },
          { title: "Expected Graduation", subtitle: "June 2027", tag: "Class of 2027" },
          { title: "Academic Focus", subtitle: "Full-Stack Web & Mobile App Development, Databases", tag: "Focus" },
        ],
        badge: "Academic Background",
        timeAgo: "5d ago",
        duration: 6000,
      },
    ],
  },

  {
    id: "organizations",
    title: "Organizations",
    coverIcon: "Users",
    timeAgo: "6d ago",
    stories: [
      {
        id: "org-jpcs",
        type: "text",
        heading: "Junior Philippine Computer Society",
        subheading: "JPCS — DLSL Chapter",
        description: "Member",
        badge: "Organization",
        timeAgo: "6d ago",
        duration: 5000,
      },
    ],
  },

  {
    id: "contact",
    title: "Contact",
    coverIcon: "Mail",
    timeAgo: "Just now",
    stories: [
      {
        id: "contact-story",
        type: "contact",
        heading: "Let's Connect",
        subheading: "Open for OJT & Collaboration",
        description:
          "Interested in discussing an internship, OJT opportunity, or technical collaboration? Feel free to reach out directly through any of the channels below.",
        buttonText: "Email Me Directly",
        buttonUrl: "mailto:richardallenliman@gmail.com?subject=Portfolio%20Inquiry%20/%20OJT%20Opportunity",
        badge: "Get in Touch",
        timeAgo: "Just now",
        duration: 6500,
      },
    ],
  },
];
