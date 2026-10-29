import React from "react";

interface VerifiedBadgeProps {
  className?: string;
}

/**
 * Authentic Instagram Verified Rosette Badge
 * Official 16-point scalloped star with white checkmark
 */
export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  className = "w-4 h-4 sm:w-[18px] sm:h-[18px]",
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`${className} flex-shrink-0 inline-block select-none`}
      aria-label="Verified Profile"
      role="img"
    >
      <title>Verified Profile</title>
      <path
        d="M19.998 3.094 14.638 0l-5.972 3.156L3.093 5.09l-.49 6.726L0 17.382l3.156 5.972.49 6.726 6.726.49 5.972 3.156 5.36-3.094 5.36 3.094 5.972-3.156 6.726-.49.49-6.726L40 17.382l-2.603-5.566.49-6.726-5.573-1.934L26.342 0l-6.344 3.094z"
        fill="#0095f6"
      />
      <path
        d="M16.924 25.594l-5.938-5.938 2.375-2.375 3.563 3.563 8.313-8.313 2.375 2.375-10.688 10.688z"
        fill="#ffffff"
      />
    </svg>
  );
};

