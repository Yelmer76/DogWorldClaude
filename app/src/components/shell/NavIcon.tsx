"use client";

import type { NavKey } from "./navConfig";

/**
 * Inline SVG glyphs for the 5 nav tabs. Each icon ships filled +
 * outlined variants so the active tab gets the filled treatment.
 */
export function NavIcon({
  name,
  filled,
  className = "",
}: {
  name: NavKey;
  filled?: boolean;
  className?: string;
}) {
  const stroke = filled ? "none" : "currentColor";
  const fill = filled ? "currentColor" : "none";
  const props = {
    viewBox: "0 0 24 24",
    width: 22,
    height: 22,
    fill,
    stroke,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "today":
      // Sunrise / horizon
      return (
        <svg {...props}>
          <path d="M3 18h18" stroke="currentColor" fill="none" />
          <path
            d="M5 18a7 7 0 0 1 14 0"
            stroke="currentColor"
            fill={filled ? "currentColor" : "none"}
            opacity={filled ? 0.18 : 1}
          />
          <path
            d="M5 18a7 7 0 0 1 14 0"
            stroke="currentColor"
            fill="none"
          />
          <path d="M12 4v3M4 12h2M18 12h2M6.4 6.4l1.4 1.4M16.2 7.8l1.4-1.4" stroke="currentColor" fill="none" />
        </svg>
      );
    case "hunder":
      // Paw
      return (
        <svg {...props}>
          <circle cx="6" cy="9" r="1.6" />
          <circle cx="18" cy="9" r="1.6" />
          <circle cx="9.5" cy="6" r="1.6" />
          <circle cx="14.5" cy="6" r="1.6" />
          <path d="M7.5 17c0-3 2-5 4.5-5s4.5 2 4.5 5-2 4-4.5 4-4.5-1-4.5-4z" />
        </svg>
      );
    case "kull":
      // Cluster of small circles
      return (
        <svg {...props}>
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <circle cx="8" cy="16" r="2.5" />
          <circle cx="16" cy="16" r="2.5" />
          <circle cx="12" cy="12.5" r="2.5" />
        </svg>
      );
    case "kennel":
      // House with window
      return (
        <svg {...props}>
          <path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "mer":
      // 3 dots
      return (
        <svg {...props}>
          <circle cx="6" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="18" cy="12" r="1.6" />
        </svg>
      );
  }
}
