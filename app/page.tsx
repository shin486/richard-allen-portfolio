"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Highlights } from "@/components/Highlights";
import {
  DevBlogViewer,
  DevBlogViewerMode,
} from "@/components/highlights/DevBlogViewer";
import { PortfolioTabs, PortfolioTabType } from "@/components/PortfolioTabs";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificateGrid } from "@/components/CertificateGrid";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AiChatDrawer } from "@/components/AiChatDrawer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Reveal } from "@/components/Reveal";
import { TechKeyboard3D } from "@/components/TechKeyboard3D";
import { LoadingScreen } from "@/components/LoadingScreen";
import { RecruiterDossierView } from "@/components/RecruiterDossierView";
import { KeyboardShortcutsHUD } from "@/components/KeyboardShortcutsHUD";
import { Project, projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import { BlogDeepLink, devBlogPosts } from "@/data/blogPosts";
import { profileData } from "@/data/profile";

const SEEN_BLOG_STORAGE_KEY = "shin486-seen-blog-v1";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"studio" | "recruiter">("studio");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("projects");
  const [activeCarouselProject, setActiveCarouselProject] =
    useState<Project | null>(projectsData[0] || null);

  useEffect(() => {
    // Check URL query param (?view=recruiter activates Recruiter Dossier; default / is Social Studio view)
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    if (viewParam === "recruiter") {
      setViewMode("recruiter");
    } else if (viewParam === "studio" || viewParam === "feed") {
      setViewMode("studio");
    }
  }, []);

  const handleViewChange = (mode: "studio" | "recruiter") => {
    setViewMode(mode);
    const url = new URL(window.location.href);
    if (mode === "recruiter") {
      url.searchParams.set("view", "recruiter");
    } else {
      url.searchParams.delete("view");
    }
    window.history.replaceState({}, "", url.toString());
  };

  // Lets the Journey Timeline or 3D Keyboard jump the Projects carousel to a specific project
  const [projectFocus, setProjectFocus] = useState<{
    projectId: string;
    nonce: number;
  } | null>(null);

  const [blogViewerState, setBlogViewerState] = useState<{
    isOpen: boolean;
    mode: DevBlogViewerMode;
    postIndex: number;
  }>({ isOpen: false, mode: "story", postIndex: 0 });
  const [seenPostIds, setSeenPostIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const rawSeen = localStorage.getItem(SEEN_BLOG_STORAGE_KEY);
      if (rawSeen) setSeenPostIds(JSON.parse(rawSeen));
    } catch {}
  }, []);

  const handleMarkBlogSeen = useCallback((postId: string) => {
    setSeenPostIds((prev) => {
      if (prev[postId]) return prev;
      const next = { ...prev, [postId]: true };
      try {
        localStorage.setItem(SEEN_BLOG_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleOpenBlogPost = (index: number) => {
    setBlogViewerState({ isOpen: true, mode: "story", postIndex: index });
  };

  const handleOpenBlogArchive = () => {
    setBlogViewerState((prev) => ({
      ...prev,
      isOpen: true,
      mode: "archive",
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const targetId =
      sectionId === "portfolio-grid" ||
      sectionId === "skills-section" ||
      sectionId === "certificates-section" ||
      sectionId === "about-section"
        ? "portfolio-tabs"
        : sectionId;

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 30);
  };

  const handleTabChange = (tab: PortfolioTabType) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && activeTab !== "projects") {
      setActiveTab("projects");
      scrollToSection("portfolio-grid");
    }
  };

  const handleViewProject = (projectId: string) => {
    setSearchQuery("");
    setActiveTab("projects");
    setProjectFocus({ projectId, nonce: Date.now() });
    scrollToSection("portfolio-grid");
  };

  const handleBlogDeepLink = (action: BlogDeepLink["action"]) => {
    if (action.type === "project") {
      handleViewProject(action.projectId);
    } else if (action.type === "tab") {
      setActiveTab(action.tab);
      scrollToSection("portfolio-tabs");
    } else if (action.type === "section") {
      scrollToSection(action.sectionId);
    } else if (action.type === "resume") {
      window.open(profileData.socials.resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (viewMode === "recruiter") {
    return (
      <main className="flex-1 w-full relative">
        <RecruiterDossierView
          onSwitchToStudio={() => handleViewChange("studio")}
        />
        <KeyboardShortcutsHUD
          onToggleRecruiter={() => handleViewChange("studio")}
          isRecruiterView={true}
        />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Minimalist Instagram + Stickman Loading Screen (Active in Studio / Social View) */}
      <LoadingScreen />

      {/* Layered Animated Background (Active in Social Studio Mode) */}
      <AnimatedBackground />

      {/* Sticky Top Navigation with Persistent Dual-View Switcher */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSelectTab={setActiveTab}
        activeView={viewMode}
        onViewChange={handleViewChange}
      />

      {/* Responsive Desktop Split Container: Instagram Feed + Right-Side 3D Keyboard Space */}
      <div className="flex-1 w-full max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-8 2xl:gap-10 items-start">
          {/* Main Instagram Profile & Feed Column */}
          <main className="w-full max-w-4xl mx-auto xl:mx-0 min-w-0">
            {/* Instagram Profile Header */}
            <div className="rise-in" style={{ animationDelay: "90ms" }}>
              <ProfileHeader
                onSelectTab={setActiveTab}
                onNavigateToSection={scrollToSection}
              />
            </div>

            {/* Engineering Dev Journal Highlights Row */}
            <div className="rise-in" style={{ animationDelay: "180ms" }}>
              <Highlights
                seenPostIds={seenPostIds}
                onOpenPost={handleOpenBlogPost}
                onOpenArchive={handleOpenBlogArchive}
              />
            </div>

            {/* Instagram Post & Navigation Tabs */}
            <div id="portfolio-tabs">
              <Reveal>
                <PortfolioTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  projectCount={projectsData.length}
                  skillCategoriesCount={skillsData.reduce(
                    (total, cat) => total + cat.skills.length,
                    0
                  )}
                  certCount={certificatesData.length}
                />
              </Reveal>
            </div>

            {/* Active Tab Content */}
            <div key={activeTab} className="stagger-item">
              {activeTab === "projects" && (
                <ProjectGrid
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  focusRequest={projectFocus}
                  onActiveProjectChange={setActiveCarouselProject}
                />
              )}

              {activeTab === "skills" && (
                <SkillsSection onSelectProject={handleViewProject} />
              )}

              {activeTab === "certificates" && <CertificateGrid />}

              {activeTab === "about" && <AboutSection />}
            </div>

            {/* Contact / Direct Message Section */}
            <Reveal>
              <ContactSection />
            </Reveal>
          </main>

          {/* Open Right-Side Space: Sticky 3D Mechanical Tech Stack Keyboard */}
          <aside
            aria-label="3D Mechanical Tech Stack Keyboard"
            className="hidden xl:block sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto no-scrollbar pt-2 pb-6 rise-in overscroll-contain pr-1"
            style={{ animationDelay: "240ms" }}
          >
            <TechKeyboard3D
              activeProject={
                activeTab === "projects" ? activeCarouselProject : null
              }
              onSelectProject={handleViewProject}
              variant="sidebar"
              isDeployedToStage={activeTab === "skills"}
            />
          </aside>
        </div>
      </div>

      {/* Instagram Dev Journal Story & Article Viewer Modal */}
      <DevBlogViewer
        isOpen={blogViewerState.isOpen}
        initialMode={blogViewerState.mode}
        initialPostIndex={blogViewerState.postIndex}
        posts={devBlogPosts}
        seenPostIds={seenPostIds}
        onMarkSeen={handleMarkBlogSeen}
        onDeepLink={handleBlogDeepLink}
        onClose={() =>
          setBlogViewerState((prev) => ({ ...prev, isOpen: false }))
        }
      />

      {/* Instagram DM AI Portfolio Assistant */}
      <AiChatDrawer />

      {/* Bryl Lim Signature: Developer Keyboard Shortcuts HUD */}
      <KeyboardShortcutsHUD
        onToggleRecruiter={() => handleViewChange("recruiter")}
        isRecruiterView={false}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
