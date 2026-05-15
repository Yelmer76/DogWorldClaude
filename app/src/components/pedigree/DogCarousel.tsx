"use client";

import { dogs } from "@/data/universe";
import { PedigreeNodeCard } from "./PedigreeNodeCard";

export type DogCarouselProps = {
  ids: string[];
  label: string;
  countLabel?: string;
  emptyText: string;
  onTap: (id: string) => void;
};

export function DogCarousel({
  ids,
  label,
  countLabel,
  emptyText,
  onTap,
}: DogCarouselProps) {
  return (
    <section>
      <header className="flex items-baseline justify-between mb-2">
        <h3 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
          {label}
        </h3>
        <span className="text-[11px] text-n-500 font-mono">
          {countLabel ?? `${ids.length}`}
        </span>
      </header>
      {ids.length === 0 ? (
        <div className="border border-dashed border-n-200 rounded-card p-4 text-center text-xs text-n-500 italic">
          {emptyText}
        </div>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
          {ids.map((id) => (
            <div key={id} className="w-[160px] flex-shrink-0 snap-start">
              <PedigreeNodeCard
                dog={dogs[id]}
                size="sm"
                onTap={() => onTap(id)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
