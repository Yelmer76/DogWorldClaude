"use client";

import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { Tag } from "@/components/dogworld/Tag";
import type { Puppy, PuppyStatus } from "@/data/universe";

const collarHex: Record<Puppy["color"], string> = {
  red: "#c54848",
  blue: "#3e6ea8",
  green: "#5a8b4e",
  purple: "#7a4e8b",
  yellow: "#d4a82d",
  orange: "#d97a3d",
  pink: "#d18ba0",
  white: "#e8e8e3",
};

const statusVariant: Record<
  PuppyStatus,
  "success" | "warning" | "info" | "neutral"
> = {
  reservert: "info",
  tilgjengelig: "success",
  tilbudt: "warning",
  beholdt: "neutral",
  solgt: "neutral",
};

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  return (
    <article className="bg-bg-card border border-n-200 rounded-card overflow-hidden hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-shadow">
      <div className="aspect-[4/3] relative">
        <DogPhoto
          tone={puppy.tone}
          label={puppy.name?.toUpperCase() ?? puppy.colorLabel.toUpperCase()}
          className="w-full h-full !rounded-none"
        />
        {/* Collar color dot — top-left */}
        <span
          className="absolute top-2 left-2 w-5 h-5 rounded-full ring-2 ring-bg-card shadow-[0_1px_2px_rgba(26,26,26,0.20)]"
          style={{ background: collarHex[puppy.color] }}
          aria-label={`${puppy.colorLabel} halsbånd`}
          title={`${puppy.colorLabel} halsbånd`}
        />
        {/* Status pill — top-right */}
        <div className="absolute top-2 right-2">
          <Tag variant={statusVariant[puppy.status]} dot>
            {puppy.statusLabel}
          </Tag>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="m-0 text-base font-semibold tracking-[-0.005em] text-n-950 truncate">
            {puppy.name ?? `Valp ${puppy.colorLabel}`}
          </h3>
          <span className="text-xs font-mono text-n-500 flex-shrink-0">
            {puppy.sex === "m" ? "♂" : "♀"} · {puppy.colorLabel}
          </span>
        </div>
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-mono text-n-700">
            <span className="text-base font-semibold text-n-950">
              {puppy.weight.toFixed(1)}
            </span>{" "}
            kg
          </span>
          <span
            className={
              "font-mono " +
              (puppy.trend === "up"
                ? "text-success-fg"
                : puppy.trend === "down"
                  ? "text-error-fg"
                  : "text-n-500")
            }
          >
            {puppy.trend === "up" ? "↗" : puppy.trend === "down" ? "↘" : "→"}{" "}
            {puppy.delta}
          </span>
        </div>
        {puppy.notes && (
          <p className="m-0 text-xs text-n-700 leading-relaxed line-clamp-2">
            {puppy.notes}
          </p>
        )}
        {puppy.assignedTo && (
          <div className="text-[11px] text-n-500 italic border-t border-n-100 pt-2 mt-1 truncate">
            → {puppy.assignedTo}
          </div>
        )}
      </div>
    </article>
  );
}
