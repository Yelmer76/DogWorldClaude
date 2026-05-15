"use client";

import { dogs } from "@/data/universe";

export type BreadcrumbProps = {
  history: string[];
  onJump: (idx: number) => void;
};

function shortName(id: string): string {
  const d = dogs[id];
  if (!d) return "?";
  if (d.hidden) return "Skjult";
  return d.callName ?? d.name.split(/\s+(av|vom|von|of|du|de la)\s+/i)[0];
}

export function Breadcrumb({ history, onJump }: BreadcrumbProps) {
  return (
    <nav aria-label="Navigeringssti" className="flex items-center gap-1 overflow-x-auto">
      {history.map((id, idx) => {
        const isLast = idx === history.length - 1;
        return (
          <div key={`${id}-${idx}`} className="flex items-center gap-1 flex-shrink-0">
            {idx > 0 && (
              <span className="text-n-300 text-xs" aria-hidden>
                ›
              </span>
            )}
            <button
              type="button"
              onClick={() => !isLast && onJump(idx)}
              disabled={isLast}
              className={
                "text-xs font-mono uppercase tracking-[0.06em] px-2 py-1 rounded-md transition-colors " +
                (isLast
                  ? "bg-forest-50 text-forest-700 cursor-default"
                  : "text-n-700 hover:bg-n-50 hover:text-n-950")
              }
            >
              {shortName(id)}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
