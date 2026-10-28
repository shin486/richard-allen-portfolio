import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Richard Allen Liman | Aspiring Full-Stack Developer",
  description: "Portfolio of Richard Allen Liman, an Information Technology student and aspiring Full-Stack Developer showcasing projects, skills, and experience.",
  keywords: [
    "Richard Allen Liman",
    "Richard Allen",
    "Full-Stack Developer",
    "IT Student Portfolio",
    "De La Salle Lipa",
    "React Native",
    "Next.js",
    "TypeScript",
    "Supabase",
    "OJT Portfolio",
    "Web Developer Philippines",
  ],
  authors: [{ name: "Richard Allen Liman" }],
  creator: "Richard Allen Liman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://richardallen.dev",
    title: "Richard Allen Liman | Aspiring Full-Stack Developer",
    description: "Portfolio of Richard Allen Liman, an Information Technology student and aspiring Full-Stack Developer showcasing projects, skills, and experience.",
    siteName: "Richard Allen Liman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Allen Liman | Aspiring Full-Stack Developer",
    description: "Information Technology student passionate about building practical, user-focused web and mobile applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-white dark:bg-[#0B0B0F] text-[#111111] dark:text-[#F5F5F5] min-h-screen flex flex-col antialiased selection:bg-pink-500/20 selection:text-pink-500 transition-colors duration-200`}
      >
        {children}
      </body>
    </html>
  );
}
