"use client";

/**
 * PedigreeNodeCard — single ancestor / sibling / offspring card used in the
 * Pedigree Explorer tree. Wraps the shared PedigreeNode atom but adds size
 * variants and edge-case rendering (unknown, hidden, deceased) that only
 * matter inside the explorer.
 *
 * Per design handoff:
 *   - sm   — grandparents row on mobile
 *   - md   — grandparents on desktop, parents on mobile
 *   - lg   — parents on desktop
 *
 *   - Unknown ancestor  → dashed border, plus icon, "Legg til"
 *   - Hidden by owner   → lock glyph, "Skjult", no drill-down
 *   - Deceased          → small ◌ glyph beside year, full meta visible
 */
import type { Dog } from "@/data/universe";

export type NodeSize = "sm" | "md" | "lg";

const sizeClasses: Record<NodeSize, string> = {
  sm: "p-2.5 min-h-[68px]",
  md: "p-3 min-h-[88px]",
  lg: "p-4 min-h-[112px]",
};

const titleSize: Record<NodeSize, string> = {
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-[11px]",
};

const nameSize: Record<NodeSize, string> = {
  sm: "text-[12px]",
  md: "text-[13px]",
  lg: "text-base",
};

export type PedigreeNodeCardProps = {
  dog: Dog | null | undefined;
  size: NodeSize;
  onTap?: (id: string) => void;
};

export function PedigreeNodeCard({
  dog,
  size,
  onTap,
}: PedigreeNodeCardProps) {
  // Unknown ancestor
  if (!dog) {
    return (
      <button
        type="button"
        onClick={() => onTap?.("__unknown__")}
        className={
          "w-full text-left border border-dashed border-n-300 rounded-card bg-bg-card text-n-500 hover:border-forest-500 hover:bg-forest-50/40 hover:text-forest-700 transition-all focus-visible:outline-2 focus-visible:outline-forest-500 focus-visible:outline-offset-2 " +
          sizeClasses[size]
        }
      >
        <div
          className={
            "font-mono uppercase tracking-[0.05em] text-n-300 " + titleSize[size]
          }
        >
          UKJENT
        </div>
        <div className={"font-medium " + nameSize[size]}>+ Legg til</div>
        <div className="text-[10px] text-n-500 mt-0.5">
          fra import eller manuelt
        </div>
      </button>
    );
  }

  // Hidden by owner — no drill-down, lock glyph
  if (dog.hidden) {
    return (
      <div
        className={
          "w-full text-left border border-n-200 rounded-card bg-n-50 text-n-500 cursor-not-allowed " +
          sizeClasses[size]
        }
        aria-label="Skjult etter eierens valg"
      >
        <div className="flex items-center gap-1.5">
          <LockGlyph />
          <div
            className={
              "font-mono uppercase tracking-[0.05em] text-n-500 " +
              titleSize[size]
            }
          >
            SKJULT
          </div>
        </div>
        <div className={"font-medium italic mt-0.5 " + nameSize[size]}>
          Skjult etter eierens valg
        </div>
      </div>
    );
  }

  const isSire = dog.sex === "m";
  const deceased = !!dog.deceased;
  const accent = isSire ? "bg-sire-bar" : "bg-dam-bar";

  return (
    <button
      type="button"
      onClick={() => onTap?.(dog.id)}
      className={
        "relative w-full text-left rounded-card bg-bg-card border border-n-200 hover:border-n-300 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] hover:-translate-y-px transition-all overflow-hidden focus-visible:outline-2 focus-visible:outline-forest-500 focus-visible:outline-offset-2 " +
        sizeClasses[size]
      }
    >
      <span
        aria-hidden
        className={"absolute left-0 top-0 bottom-0 w-1 " + accent}
      />
      <div
        className={
          "font-mono uppercase tracking-[0.05em] text-ochre-700 leading-tight " +
          titleSize[size]
        }
      >
        {dog.titles.length > 0 ? dog.titles.join(" ") : "—"}
      </div>
      <div
        className={
          "font-semibold tracking-[-0.005em] text-n-950 leading-snug truncate mt-0.5 " +
          nameSize[size]
        }
      >
        {dog.name}
      </div>
      <div className="text-[10px] text-n-700 mt-1 flex items-center gap-1.5">
        <span aria-hidden>{isSire ? "♂" : "♀"}</span>
        <span className="font-mono">{dog.born.slice(0, 4)}</span>
        {deceased && (
          <span
            className="text-n-500 font-mono"
            title={`Død ${dog.deceased}`}
            aria-label={`Død ${dog.deceased}`}
          >
            ◌ {dog.deceased?.slice(0, 4)}
          </span>
        )}
        {dog.health?.HD?.value && size !== "sm" && (
          <span className="font-mono text-n-500 ml-auto">
            HD {dog.health.HD.value.split(" ")[0]}
          </span>
        )}
      </div>
    </button>
  );
}

function LockGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
