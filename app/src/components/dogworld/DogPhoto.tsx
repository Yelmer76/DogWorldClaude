/**
 * DogPhoto / placeholder
 *
 * Per design handoff: "No invented imagery in SVG. All photos are striped
 * placeholders with monospace labels. When the codebase ships, swap to real
 * photos via the same component contract — the placeholder is the fallback."
 *
 * Tones:
 *   - elkhound (default) — grey-green stripe
 *   - sire — dusty blue stripe
 *   - dam — dusty rose stripe
 *   - generic — neutral stripe
 *
 * Muted variant (deceased / hidden / memorial): adds grayscale + brightness filter.
 */
import type { CSSProperties, HTMLAttributes } from "react";

export type DogPhotoTone = "elkhound" | "sire" | "dam" | "generic";

const stripes: Record<DogPhotoTone, { a: string; b: string }> = {
  elkhound: { a: "#dde0d3", b: "#e8eadc" }, // grey-green
  sire: { a: "#dee5ec", b: "#eaeff4" }, // dusty blue
  dam: { a: "#ecdce4", b: "#f4e8ed" }, // dusty rose
  generic: { a: "#ededea", b: "#f4f4f0" }, // neutral
};

export type DogPhotoProps = HTMLAttributes<HTMLDivElement> & {
  /** Real image URL — when present, takes precedence over the placeholder */
  src?: string;
  alt?: string;
  /** Tone for placeholder gradient */
  tone?: DogPhotoTone;
  /** Optional label rendered over the placeholder (mono, uppercase) */
  label?: string;
  /** Use square (50% radius for avatars) */
  rounded?: "card" | "full";
  /** Mute the photo (deceased / hidden / memorial) */
  muted?: boolean;
  /** Aspect ratio override, e.g. "4/3" or "16/9" */
  aspect?: string;
};

export function DogPhoto({
  src,
  alt,
  tone = "generic",
  label,
  rounded = "card",
  muted = false,
  aspect,
  className = "",
  style,
  ...rest
}: DogPhotoProps) {
  const { a, b } = stripes[tone];

  const placeholderStyle: CSSProperties = {
    background: `repeating-linear-gradient(135deg, ${a} 0px, ${a} 8px, ${b} 8px, ${b} 16px)`,
    aspectRatio: aspect,
    filter: muted ? "grayscale(0.7) brightness(0.92)" : undefined,
    ...style,
  };

  const radiusClass = rounded === "full" ? "rounded-full" : "rounded-card";

  if (src) {
    return (
      <div
        className={`${radiusClass} overflow-hidden bg-n-100 ${className}`}
        style={{ aspectRatio: aspect, ...style }}
        {...rest}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          className={`w-full h-full object-cover ${muted ? "grayscale brightness-90" : ""}`}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ?? label ?? "Hund-bilde-plassholder"}
      className={`${radiusClass} grid place-items-center text-n-500 font-mono text-[11px] uppercase tracking-[0.04em] ${className}`}
      style={placeholderStyle}
      {...rest}
    >
      {label}
    </div>
  );
}
