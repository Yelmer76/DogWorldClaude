import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Remove default padding (for cards with images flush to edge) */
  flush?: boolean;
};

export function Card({ flush, className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={
        "bg-bg-card border border-n-200 rounded-card shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] " +
        (flush ? "p-0 overflow-hidden " : "p-4 ") +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Frame label — small uppercase caption above a card in the styleguide
 * (e.g. "Generic", "Image card", "Litter card")
 */
export function FrameLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-2">
      {children}
    </p>
  );
}
