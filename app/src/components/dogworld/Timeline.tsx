/**
 * Timeline + TimelineItem — vertical track for litter milestones,
 * vaccination schedules, show records.
 *
 * Per design handoff:
 *   - Done items: forest-500 dot
 *   - Current ("now") item: ochre-600 dot, ringed
 *   - Future items: empty hollow dot
 *   - Same marker family powers vaccinations and show records
 */
import type { ReactNode } from "react";

export type TimelineItemState = "done" | "now" | "future";

export type TimelineItemProps = {
  /** State drives marker styling */
  state?: TimelineItemState;
  /** Eyebrow line above title (date + week label) */
  date: string;
  title: string;
  /** Optional supporting line */
  description?: ReactNode;
  /** Hide description (compact variant for vaccinations) */
  compact?: boolean;
};

const dotState = {
  done: "bg-forest-500 border-forest-500",
  now: "bg-ochre-600 border-ochre-600 [box-shadow:0_0_0_3px_rgba(28,50,69,0.18)]",
  future: "bg-bg-card border-n-300",
};

export function TimelineItem({
  state = "future",
  date,
  title,
  description,
  compact,
}: TimelineItemProps) {
  return (
    <li className="relative pl-6 pb-4 last:pb-0">
      {/* Connecting line */}
      <span
        className="absolute left-[5px] top-3 bottom-0 w-px bg-n-100"
        aria-hidden
      />
      {/* Marker dot */}
      <span
        className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 ${dotState[state]}`}
        aria-hidden
      />
      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-n-500">
        {date}
      </div>
      <div
        className={
          "font-medium text-n-950 mt-0.5 " +
          (state === "now" ? "text-n-950" : "")
        }
      >
        {title}
      </div>
      {description && !compact && (
        <div className="text-sm text-n-700 mt-0.5">{description}</div>
      )}
    </li>
  );
}

export function Timeline({ children }: { children: ReactNode }) {
  return <ul className="list-none m-0 p-0 relative">{children}</ul>;
}
