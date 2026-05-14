/**
 * Inline SVG icons used across DogWorld(tmp).
 * Per design handoff: 14×14 to 22×22 stroke 1.5–1.7, currentColor for theming.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 22, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    ...rest,
  };
}

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
  </svg>
);

export const DogsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="10" r="3" />
    <circle cx="17" cy="9" r="2" />
    <path d="M5 19c0-2.8 1.8-5 4-5s4 2.2 4 5" />
    <path d="M14 19c0-1.6 1.3-3.5 3-3.5s3 1.5 3 3.5" />
  </svg>
);

export const LittersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="6" width="16" height="13" rx="2" />
    <path d="M9 6V4M15 6V4M4 10h16" />
  </svg>
);

export const InboxIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6h16v10H8l-4 4z" />
  </svg>
);

export const KennelIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </svg>
);

export const PedigreeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M8 6h4l4 6-4 6H8" />
  </svg>
);

export const HealthIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v18M5 7l7-4 7 4M6 21h12" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const NewsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const BuyerPortalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 4v5h-5" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base({ size: 16, ...p })}>
    <polyline points="15 6 9 12 15 18" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base({ size: 16, ...p })}>
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8a6 6 0 1 1 12 0v5l1.5 3h-15L6 13z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const CameraIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h3l2-2h6l2 2h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const MoreIcon = (p: IconProps) => (
  <svg {...base({ size: 14, ...p })} fill="currentColor" stroke="none">
    <circle cx="5" cy="12" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="19" cy="12" r="1.4" />
  </svg>
);
