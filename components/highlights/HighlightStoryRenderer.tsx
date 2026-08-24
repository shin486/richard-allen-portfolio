"use client";

import React from "react";
import { HighlightStory } from "@/data/highlights";
import { TextStory } from "./TextStory";
import { ProjectStory } from "./ProjectStory";
import { SkillsStory } from "./SkillsStory";
import { CertificateStory } from "./CertificateStory";
import { EducationStory } from "./EducationStory";
import { ContactStory } from "./ContactStory";
import { ImageStory } from "./ImageStory";

interface HighlightStoryRendererProps {
  story: HighlightStory;
  onInteract?: () => void;
}

export const HighlightStoryRenderer: React.FC<HighlightStoryRendererProps> = ({
  story,
  onInteract,
}) => {
  switch (story.type) {
    case "project":
      return <ProjectStory story={story} onInteract={onInteract} />;
    case "skills":
      return <SkillsStory story={story} />;
    case "certificate":
      return <CertificateStory story={story} />;
    case "education":
      return <EducationStory story={story} />;
    case "contact":
      return <ContactStory story={story} onInteract={onInteract} />;
    case "image":
      return <ImageStory story={story} />;
    case "text":
    default:
      return <TextStory story={story} />;
  }
};
