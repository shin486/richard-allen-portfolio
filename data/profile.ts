export interface ProfileStats {
  projects: string;
  technologies: string;
  certificates: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
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

  title: "Aspiring Full-Stack & Mobile Developer",

  bio:
    "4th-year BS IT student building scalable web and cross-platform mobile apps focused on performance and clean architecture.",

  educationSummary: {
    degree: "Bachelor of Science in Information Technology",
    school: "De La Salle Lipa",
    expectedGraduation: "June 2027",
    location: "Lipa City, Batangas, Philippines",
  },

  highlightsList: [
    {
      icon: "GraduationCap",
      text: "BS Information Technology",
      subtext: "De La Salle Lipa",
    },
    {
      icon: "Laptop",
      text: "Web Development",
      subtext: "React, JavaScript & TypeScript",
    },
    {
      icon: "Smartphone",
      text: "Mobile App Development",
      subtext: "React Native & Expo",
    },
    {
      icon: "Code2",
      text: "Software Development",
      subtext: "Building practical applications",
    },
  ],

  stats: {
    projects: "05",
    technologies: "10+",
    certificates: "05",
  },

  socials: {
    github: "https://github.com/shin486",
    linkedin: "https://www.linkedin.com/in/allenliman",
    email: "richardallenliman@gmail.com",
    resumeUrl: "/resume.pdf",
  },

  avatarUrl: "/profile.svg",

  isOpenToWork: true,

  statusMessage: "Open to OJT & Internship Opportunities",
};