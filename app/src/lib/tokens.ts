/**
 * DogWorld(tmp) — TypeScript tokens
 *
 * Most design tokens live in `globals.css` (colors, radius, shadows, type scale)
 * and are accessed via Tailwind utility classes.
 *
 * This file holds tokens that are easier to use from JavaScript/TypeScript:
 * - Animation durations and easings (used in framer-motion / CSS-in-JS)
 * - Z-index scale (centralized to avoid stacking accidents)
 * - Breakpoints matching Tailwind defaults (for matchMedia / window listeners)
 *
 * Source of truth for design decisions: docs/memory/design_handoff_canonical.md
 */

// ── Animation timings ──────────────────────────────────────────────────────
// Per design handoff: transforms only for entry animations, never opacity.
// Some render contexts pause animation timer; opacity-from-0 stays invisible.
export const motion = {
  /** Card stagger between siblings on initial load */
  staggerMs: 50,
  /** Standard transform-only entry animation */
  enterMs: 280,
  /** Card expand height + fade content in */
  expandMs: 200,
  /** Status pill color cross-fade */
  statusChangeMs: 200,
  /** Hero photo Ken Burns scale 1 → 1.08 on initial load */
  heroKenBurnsMs: 8000,
  /** Conversation bubble slide-up (iMessage feel) */
  bubbleMs: 220,
  /** Toast auto-dismiss */
  toastMs: 2400,
  /** Pulse celebratory confirmation */
  pulseMs: 200,

  /** Easing curves */
  easing: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)", // ease-out
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)", // smooth in/out
    standard: "cubic-bezier(0.2, 0, 0, 1)", // material standard
  },
} as const;

// ── Breakpoints (mirrors Tailwind v4 defaults) ─────────────────────────────
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ── Z-index scale ──────────────────────────────────────────────────────────
// Centralized to prevent stacking accidents.
export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  banner: 300,
  overlay: 400,
  modal: 500,
  toast: 600,
  tooltip: 700,
  max: 9999,
} as const;
