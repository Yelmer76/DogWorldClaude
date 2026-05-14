import type { HTMLAttributes, ReactNode } from "react";

export type TagVariant =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "accent"
  | "forest"
  | "breed";

const variantClasses: Record<TagVariant, string> = {
  neutral: "bg-n-50 text-n-700 border-n-200",
  success: "bg-success-bg text-success-fg border-transparent",
  warning: "bg-warning-bg text-warning-fg border-transparent",
  error: "bg-error-bg text-error-fg border-transparent",
  info: "bg-info-bg text-info-fg border-transparent",
  accent: "bg-ochre-50 text-ochre-700 border-transparent",
  forest: "bg-forest-50 text-forest-700 border-transparent",
  breed: "bg-transparent text-n-700 border-n-300",
};

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: TagVariant;
  /** Show the small leading dot (used by status tags) */
  dot?: boolean;
  children: ReactNode;
};

export function Tag({
  variant = "neutral",
  dot,
  className = "",
  children,
  ...rest
}: TagProps) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-tag border text-xs font-medium leading-[1.4] whitespace-nowrap " +
        variantClasses[variant] +
        " " +
        className
      }
      {...rest}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current opacity-70"
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}

// ── Count badge ─────────────────────────────────────────────────────────────
export type CountBadgeProps = {
  /** Number to display (or string like "12+") */
  value: number | string;
  /** Mute style for non-attention-grabbing counts */
  muted?: boolean;
  className?: string;
};

export function CountBadge({ value, muted, className = "" }: CountBadgeProps) {
  return (
    <span
      className={
        "inline-grid place-items-center min-w-[18px] h-[18px] px-1.5 rounded-full text-[11px] font-semibold " +
        (muted ? "bg-n-200 text-n-700 " : "bg-ochre-600 text-white ") +
        className
      }
    >
      {value}
    </span>
  );
}

// ── Title badge — mono credentials (NUCH, IGP3, BIS-1) ─────────────────────
export type TitleBadgeProps = {
  children: ReactNode;
  /** Gold variant for premium titles (BIS, BISS, World Winner) */
  gold?: boolean;
  className?: string;
};

export function TitleBadge({ children, gold, className = "" }: TitleBadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 font-mono text-[11px] font-medium px-[7px] py-[3px] rounded-tag tracking-[0.04em] " +
        (gold
          ? "bg-ochre-600 text-white "
          : "bg-forest-50 text-forest-700 ") +
        className
      }
    >
      {children}
    </span>
  );
}

// ── Karma tier badge ────────────────────────────────────────────────────────
export type KarmaTier = "new" | "bronze" | "silver" | "gold" | "steward";

const gemGradients: Record<KarmaTier, string> = {
  new: "linear-gradient(135deg, #c9c9c2, #ededea)",
  bronze: "linear-gradient(135deg, #b07a4a, #d4a47a)",
  silver: "linear-gradient(135deg, #8a8a82, #c9c9c2)",
  gold: "linear-gradient(135deg, #b88a3a, #d4a755)",
  steward: "linear-gradient(135deg, #3F5A55, #6b8581)", // forest
};

export type KarmaBadgeProps = {
  tier: KarmaTier;
  children: ReactNode;
  className?: string;
};

export function KarmaBadge({ tier, children, className = "" }: KarmaBadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full text-xs font-medium bg-bg-card border border-n-200 " +
        className
      }
    >
      <span
        className="w-3.5 h-3.5 rounded-[3px] inline-block"
        style={{ background: gemGradients[tier] }}
        aria-hidden
      />
      {children}
    </span>
  );
}
