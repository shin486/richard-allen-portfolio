export type CredentialType = "Certification" | "Course Completion";

export interface Certificate {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  credentialType?: CredentialType;
  credentialId?: string;
  verifyUrl?: string;
  validThrough?: string;
  focus?: string;
  caption: string;
  postDate: string;
  year?: string;
  image: string;
}

/**
 * Verified certifications & course completions — presented cleanly across views.
 */
export const certificatesData: Certificate[] = [
  {
    id: "gemini-certified-student-university",
    title: "Gemini Certified Student (University)",
    shortTitle: "Gemini Certified",
    issuer: "Google for Education",
    credentialType: "Certification",
    validThrough: "November 14, 2029",
    focus:
      "Applied generative AI workflows, prompt engineering, and Google AI tools.",
    caption:
      "Issued by Google for Education (Valid through November 14, 2029). Applied generative AI workflows, prompt engineering, and Google AI tools.",
    postDate: "NOVEMBER 14, 2026",
    year: "2026",
    image: "/certificates/gemini-certified-student-university.png",
  },
  {
    id: "tesda-aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner (CLF-C02) — Course Completion",
    shortTitle: "AWS Cloud (TESDA)",
    issuer: "TESDA Online Program",
    credentialType: "Course Completion",
    credentialId: "CyiKhpQwvZ",
    verifyUrl: "https://e-tesda.gov.ph",
    focus:
      "AWS cloud architecture, EC2, S3, Lambda, IAM security, VPC networking, and cloud governance.",
    caption:
      "Course Completion via TESDA Online Program (ID: CyiKhpQwvZ). AWS cloud architecture, EC2, S3, Lambda, IAM security, VPC networking, and cloud governance.",
    postDate: "NOVEMBER 14, 2026",
    year: "2026",
    image: "/certificates/tesda-aws-cloud-practitioner.png",
  },
  {
    id: "tesda-aws-ai-practitioner",
    title: "AWS Certified AI Practitioner (AIF-C01) — Course Completion",
    shortTitle: "AWS AI (TESDA)",
    issuer: "TESDA Online Program",
    credentialType: "Course Completion",
    credentialId: "euZ5LSGDal",
    verifyUrl: "https://e-tesda.gov.ph",
    focus:
      "Foundation models, RAG, prompt engineering, Amazon Bedrock, SageMaker, and responsible AI.",
    caption:
      "Course Completion via TESDA Online Program (ID: euZ5LSGDal). Foundation models, RAG, prompt engineering, Amazon Bedrock, SageMaker, and responsible AI.",
    postDate: "NOVEMBER 14, 2026",
    year: "2026",
    image: "/certificates/tesda-aws-ai-practitioner.png",
  },
  {
    id: "tesda-azure-ai-fundamentals",
    title:
      "Microsoft Artificial Intelligence Course: Azure AI Fundamentals — Course Completion",
    shortTitle: "Azure AI (TESDA)",
    issuer: "TESDA Online Program",
    credentialType: "Course Completion",
    credentialId: "ZhUJwes83g",
    verifyUrl: "https://e-tesda.gov.ph",
    focus:
      "Azure AI workloads, computer vision, natural language processing, and conversational AI.",
    caption:
      "Course Completion via TESDA Online Program (ID: ZhUJwes83g). Azure AI workloads, computer vision, natural language processing, and conversational AI.",
    postDate: "NOVEMBER 14, 2026",
    year: "2026",
    image: "/certificates/tesda-azure-ai-fundamentals.png",
  },
  {
    id: "tesda-fundamentals-of-ai",
    title: "Fundamentals of Artificial Intelligence — Course Completion",
    shortTitle: "AI Fundamentals (TESDA)",
    issuer: "TESDA Online Program",
    credentialType: "Course Completion",
    credentialId: "VEhlLGlH6y",
    verifyUrl: "https://e-tesda.gov.ph",
    focus:
      "Machine learning lifecycles, supervised/unsupervised learning, neural networks, and model evaluation.",
    caption:
      "Course Completion via TESDA Online Program (ID: VEhlLGlH6y). Machine learning lifecycles, supervised/unsupervised learning, neural networks, and model evaluation.",
    postDate: "NOVEMBER 14, 2026",
    year: "2026",
    image: "/certificates/tesda-fundamentals-of-ai.png",
  },
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    shortTitle: "Python Essentials 1",
    issuer: "Cisco Networking Academy · Python Institute",
    caption:
      "Completed Python Essentials 1 via Cisco Networking Academy & OpenEDG Python Institute.",
    postDate: "APRIL 15, 2026",
    year: "2026",
    image: "/certificates/python-essentials-1.png",
  },
  {
    id: "python-essentials-2",
    title: "Python Essentials 2",
    shortTitle: "Python Essentials 2",
    issuer: "Cisco Networking Academy · Python Institute",
    caption:
      "Completed Python Essentials 2 covering OOP, modules, and standard library architecture.",
    postDate: "APRIL 15, 2026",
    year: "2026",
    image: "/certificates/python-essentials-2.png",
  },
  {
    id: "ethical-hacking-data-analytics",
    title:
      "Bridging Ethical Hacking and Data Analytics: Building Smarter and Safer Systems",
    shortTitle: "Ethical Hacking & Data",
    issuer: "De La Salle Lipa · Swinburne University",
    caption:
      "Building Smarter and Safer Systems seminar at the De La Salle Lipa Amphitheater.",
    postDate: "JANUARY 13, 2026",
    year: "2026",
    image: "/certificates/ethical-hacking-data-analytics.png",
  },
  {
    id: "devroutes",
    title: "DevRoutes: Learning How to Learn with Roadmaps",
    shortTitle: "DevRoutes",
    issuer: "JPCS — De La Salle Lipa Chapter",
    caption:
      "Developer roadmaps & engineering progression seminar at MB Auditorium, De La Salle Lipa.",
    postDate: "JANUARY 29, 2026",
    year: "2026",
    image: "/certificates/devroutes.png",
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics and Governance",
    shortTitle: "AI Ethics & Governance",
    issuer: "USAID · Asia Open RAN Academy",
    caption:
      "Advancing Open RAN in Asia under the USAID Indo-Pacific Opportunity Program.",
    postDate: "OCTOBER 19, 2024",
    year: "2024",
    image: "/certificates/ai-ethics-governance.png",
  },
];
