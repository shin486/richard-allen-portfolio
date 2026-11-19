export interface ProfileStats {
  projects: string;
  technologies: string;
  certificates: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  phone?: string;
  resumeUrl: string;
}

export interface HighlightBullet {
  icon: "GraduationCap" | "Laptop" | "Smartphone" | "Zap" | "Code2";
  text: string;
  subtext?: string;
}

export interface ProfileData {
  name: string;
  preferredName: string;
  username: string;
  title: string;
  bio: string;
  educationSummary: {
    degree: string;
    school: string;
    expectedGraduation: string;
    location: string;
  };
  highlightsList: HighlightBullet[];
  stats: ProfileStats;
  socials: SocialLinks;
  avatarUrl: string;
  isOpenToWork: boolean;
  statusMessage: string;
}

export const profileData: ProfileData = {
  name: "Richard Allen Liman",
  preferredName: "Richard Allen",
  username: "shin486",

  title: "Full-Stack & Mobile Developer",

  bio:
    "BSIT (Major in System Development) student at De La Salle Lipa building multi-tenant SaaS, REST API, AI-integrated, and cross-platform mobile applications. Seeking a 486-hour Full-Stack or Software Developer OJT / Internship.",

  educationSummary: {
    degree: "Bachelor of Science in Information Technology — Major in System Development",
    school: "De La Salle Lipa",
    expectedGraduation: "June 2027",
    location: "Lipa City, Batangas, Philippines",
  },

  highlightsList: [
    {
      icon: "GraduationCap",
      text: "BSIT — Major in System Development",
      subtext: "De La Salle Lipa (June 2027)",
    },
    {
      icon: "Laptop",
      text: "Web & Multi-Tenant SaaS",
      subtext: "Next.js, React, TypeScript & RLS",
    },
    {
      icon: "Smartphone",
      text: "Mobile App Development",
      subtext: "React Native & Expo",
    },
    {
      icon: "Code2",
      text: "REST APIs & AI Integration",
      subtext: "Node.js, Express, JWT, Zod & Gemini",
    },
  ],

  stats: {
    projects: "06",
    technologies: "36",
    certificates: "10",
  },

  socials: {
    github: "https://github.com/shin486",
    linkedin: "https://www.linkedin.com/in/allen-liman-00637438a",
    instagram: "https://www.instagram.com/richardallen0901/",
    email: "richardallen0901@gmail.com",
    phone: "09936105240",
    resumeUrl: "/resume.pdf",
  },

  avatarUrl: "/profile.svg",

  isOpenToWork: true,

  statusMessage: "Seeking 486-Hour Full-Stack / Software Dev OJT",
};