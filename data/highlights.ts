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
  duration?: number; // duration in ms (default: 5500ms)
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
  coverIcon: "Trophy" | "ShieldCheck" | "Cpu" | "GraduationCap" | "Briefcase";
  timeAgo?: string;
  stories: HighlightStory[];
}

/**
 * Curated Milestones & Spotlights
 * Authentic Instagram Story Highlights providing narrative proof of work
 * without repeating the main page tabs.
 */
export const highlightsData: HighlightGroup[] = [
  {
    id: "capstone",
    title: "Capstone",
    coverIcon: "Trophy",
    timeAgo: "Defended",
    stories: [
      {
        id: "capstone-1",
        type: "project",
        heading: "PalengkeHub Capstone",
        subheading: "Public-Market Price Transparency & Pre-Ordering",
        description:
          "Developed a mobile marketplace application addressing commodity price opacity and pre-ordering in the Lipa City Public Market.",
        image: "/projects/palengkehub.svg",
        technologies: ["JavaScript", "React Native", "Supabase", "Expo"],
        badge: "Capstone Thesis",
        githubUrl: "https://github.com/shin486/PalengkeHubFinal",
        timeAgo: "Thesis Completed",
        duration: 6000,
      },
      {
        id: "capstone-2",
        type: "text",
        heading: "What Richard Engineered",
        subheading: "Full-Stack Mobile Architecture",
        description:
          "Engineered the consumer pre-ordering workflows, stall locator map, and Supabase database schemas supporting consumer, vendor, and admin operations.",
        items: [
          {
            title: "Price Transparency",
            subtitle: "Real-time commodity price monitoring aligned with DTI standards",
            tag: "Mobile",
          },
          {
            title: "Vendor Workflows",
            subtitle: "Stall locating, product management, and order transaction logging",
            tag: "Supabase",
          },
          {
            title: "Role & Timeline",
            subtitle: "Full-Stack Developer • September 2025 – October 2026",
            tag: "Thesis Defended",
          },
        ],
        quote: "Transforming everyday community commerce through clean mobile architecture.",
        badge: "Architecture",
        timeAgo: "2025–2026",
        duration: 6500,
      },
    ],
  },
  {
    id: "cisco-ccna",
    title: "Cisco CCNA",
    coverIcon: "ShieldCheck",
    timeAgo: "Dual Cert",
    stories: [
      {
        id: "cisco-1",
        type: "certificate",
        heading: "CCNA: Enterprise Networking, Security, & Automation",
        subheading: "Cisco Networking Academy • 2026",
        description:
          "Configuring enterprise routing protocols (OSPF), network security access-control lists (ACLs), site-to-site VPNs, and network automation workflows.",
        badge: "Cisco Certified",
        timeAgo: "2026",
        duration: 5500,
      },
      {
        id: "cisco-2",
        type: "certificate",
        heading: "CCNA: Switching, Routing, & Wireless Essentials",
        subheading: "Cisco Networking Academy • 2025",
        description:
          "Configuring enterprise VLANs, inter-VLAN routing, STP, EtherChannel, and wireless LAN controllers (WLC) in complex topologies.",
        badge: "Cisco Certified",
        timeAgo: "2025",
        duration: 5500,
      },
      {
        id: "cisco-3",
        type: "certificate",
        heading: "Python Essentials 1 & 2",
        subheading: "Cisco Networking Academy",
        description:
          "Certified mastery of Python fundamentals, data structures, object-oriented programming, and scripting for automation.",
        badge: "Cisco Verified",
        timeAgo: "Verified",
        duration: 5000,
      },
    ],
  },
  {
    id: "ai-gemini",
    title: "AI & Gemini",
    coverIcon: "Cpu",
    timeAgo: "Live API",
    stories: [
      {
        id: "ai-1",
        type: "project",
        heading: "Live Gemini AI Integration",
        subheading: "IT Elective 4 Project • Full-Stack CRUD + AI",
        description:
          "Built a live REST endpoint (POST /api/ai) powered by Google Gemini, returning structured reviews validated with Zod schemas and protected with rate limiting.",
        image: "/projects/itelect4-project.svg",
        technologies: ["React", "Express", "Google Gemini API", "Zod", "MongoDB"],
        badge: "Full-Stack + AI",
        githubUrl: "https://github.com/shin486/itelect4-project",
        timeAgo: "Aug 2026 – Present",
        duration: 6000,
      },
      {
        id: "ai-2",
        type: "certificate",
        heading: "AI Ethics and Governance",
        subheading: "USAID / Asia Open RAN Academy",
        description:
          "Certified in responsible AI deployment frameworks, ethical algorithmic alignment, model bias mitigation, and enterprise data governance.",
        badge: "USAID Certified",
        timeAgo: "Certified",
        duration: 5500,
      },
      {
        id: "ai-3",
        type: "text",
        heading: "Byte: The AI Cyber-Pup",
        subheading: "Interactive Portfolio Companion",
        description:
          "Designed and built an interactive AI mascot on this portfolio, powered by Google Gemini 2.5 API with automatic fallback to verified portfolio facts.",
        quote: "Bridging modern LLM APIs with real-world developer portfolio experiences.",
        badge: "Live Feature",
        timeAgo: "Online",
        duration: 5500,
      },
    ],
  },
  {
    id: "dlsl-jpcs",
    title: "DLSL & JPCS",
    coverIcon: "GraduationCap",
    timeAgo: "Class 2027",
    stories: [
      {
        id: "dlsl-1",
        type: "education",
        heading: "De La Salle Lipa",
        subheading: "BS Information Technology (2023 – June 2027)",
        description:
          "Pursuing Bachelor of Science in Information Technology at De La Salle Lipa, maintaining focused coursework on full-stack web and mobile systems.",
        items: [
          {
            title: "Degree Program",
            subtitle: "Bachelor of Science in Information Technology",
            tag: "BSIT",
          },
          {
            title: "Institution",
            subtitle: "De La Salle Lipa • Lipa City, Batangas",
            tag: "DLSL",
          },
          {
            title: "Expected Graduation",
            subtitle: "June 2, 2027",
            tag: "Class of 2027",
          },
          {
            title: "Current Status",
            subtitle: "Actively seeking 480+ hour OJT / Internship",
            tag: "Open to Work",
          },
        ],
        badge: "Academic Background",
        timeAgo: "2023 – 2027",
        duration: 6000,
      },
      {
        id: "dlsl-2",
        type: "text",
        heading: "Junior Philippine Computer Society",
        subheading: "JPCS — DLSL Chapter Member",
        description:
          "Active student organization member participating in technical workshops, hackathons, and developer community activities.",
        items: [
          {
            title: "Ethical Hacking & Data Analytics",
            subtitle: "DLSL 2026 symposium participant",
            tag: "Symposium",
          },
          {
            title: "DevRoutes",
            subtitle: "Roadmap learning and career readiness with Swinburne University",
            tag: "Workshop",
          },
        ],
        badge: "Organization",
        timeAgo: "2023 – Present",
        duration: 5500,
      },
    ],
  },
  {
    id: "immersion",
    title: "Immersion",
    coverIcon: "Briefcase",
    timeAgo: "80 Hours",
    stories: [
      {
        id: "immersion-1",
        type: "text",
        heading: "Work Immersion Program",
        subheading: "Creotec Philippines Inc. (80 Hours)",
        description:
          "Completed 80 hours of hands-on industry work immersion covering corporate software lifecycles, Agile collaboration, code quality, and professional documentation.",
        items: [
          {
            title: "Industry Immersion",
            subtitle: "80 hours hands-on corporate tech simulation",
            tag: "Creotec",
          },
          {
            title: "Professional Standards",
            subtitle: "Team sprints, code reviews, and technical documentation",
            tag: "Workflow",
          },
          {
            title: "Readiness",
            subtitle: "Prepared to transition directly into industry engineering teams",
            tag: "OJT Ready",
          },
        ],
        badge: "80-Hour Certified",
        timeAgo: "Certified",
        duration: 6000,
      },
      {
        id: "immersion-2",
        type: "contact",
        heading: "Ready for OJT Opportunities",
        subheading: "Full-Stack Web & Mobile Development",
        description:
          "Open to full-time On-the-Job Training and software engineering internships starting immediately. Ready to contribute across React, Next.js, React Native, and Supabase stacks.",
        buttonText: "Email Richard Directly",
        buttonUrl:
          "mailto:richardallen0901@gmail.com?subject=OJT%20/%20Internship%20Opportunity",
        badge: "Available Now",
        timeAgo: "Immediate",
        duration: 6500,
      },
    ],
  },
];
