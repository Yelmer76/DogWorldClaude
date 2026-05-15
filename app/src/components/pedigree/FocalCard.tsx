"use client";

import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { TitleBadge } from "@/components/dogworld/Tag";
import type { Dog } from "@/data/universe";

export type FocalCardProps = {
  dog: Dog;
};

export function FocalCard({ dog }: FocalCardProps) {
  const isSire = dog.sex === "m";
  return (
    <div className="relative bg-bg-card border-2 border-forest-700 rounded-card overflow-hidden [box-shadow:0_0_0_4px_rgba(63,90,85,0.10),0_2px_8px_rgba(26,26,26,0.06)]">
      <span
        aria-hidden
        className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full bg-forest-700 text-white text-[9px] font-mono uppercase tracking-[0.08em] z-10"
      >
        FOCAL
      </span>

      <div className="grid md:grid-cols-[140px_1fr] gap-0">
        <div className="aspect-square md:aspect-auto md:h-full">
          <DogPhoto
            tone={isSire ? "sire" : "dam"}
            muted={dog.status === "memorial"}
            label={(dog.callName ?? dog.name).toUpperCase()}
            className="w-full h-full !rounded-none"
          />
        </div>

        <div className="p-4 flex flex-col gap-2 min-w-0">
          <div className="flex flex-wrap gap-1">
            {dog.titles.length > 0 ? (
              dog.titles.map((t) => <TitleBadge key={t}>{t}</TitleBadge>)
            ) : (
              <span className="text-[11px] text-n-500 italic">Ingen titler</span>
            )}
          </div>
          <div className="text-lg font-semibold tracking-[-0.01em] text-n-950 leading-snug">
            {dog.name}
          </div>
          <div className="text-xs text-n-700 font-mono flex flex-wrap gap-x-3 gap-y-1">
            <span>{isSire ? "♂ Hann" : "♀ Tispe"}</span>
            <span>f. {dog.born.slice(0, 4)}</span>
            {dog.deceased && <span>† {dog.deceased.slice(0, 4)}</span>}
            {dog.health?.HD?.value && <span>HD {dog.health.HD.value}</span>}
            {dog.health?.ED?.value && <span>ED {dog.health.ED.value}</span>}
          </div>
          <div className="border-t border-n-100 pt-2 mt-1">
            <div className="text-[11px] uppercase tracking-[0.06em] text-n-500 font-medium">
              Oppdretter
            </div>
            <div className="text-sm text-n-950">{dog.breeder}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
