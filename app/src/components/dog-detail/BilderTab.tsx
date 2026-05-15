"use client";

import { useState } from "react";
import { useToast } from "@/components/dogworld/ToastProvider";
import { DogPhoto, type DogPhotoTone } from "@/components/dogworld/DogPhoto";
import type { Dog } from "@/data/universe";

export type BilderTabProps = {
  dog: Dog;
};

const albums: { name: string; count: number }[] = [
  { name: "Alle", count: 47 },
  { name: "Utstillinger", count: 14 },
  { name: "Hverdag", count: 21 },
  { name: "Valpekull", count: 12 },
];

const TOTAL_PHOTOS = 47;
const VISIBLE_PHOTOS = 16;

export function BilderTab({ dog }: BilderTabProps) {
  const showToast = useToast();
  const [active, setActive] = useState("Alle");

  const remaining = TOTAL_PHOTOS - VISIBLE_PHOTOS;

  return (
    <div className="flex flex-col gap-6">
      {/* Album chips */}
      <section>
        <div
          className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1"
          role="tablist"
          aria-label="Foto-album"
        >
          {albums.map((a) => {
            const isActive = a.name === active;
            return (
              <button
                key={a.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(a.name);
                  showToast(`Album: ${a.name}`, "info");
                }}
                className={
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors flex-shrink-0 " +
                  (isActive
                    ? "bg-forest-700 text-white"
                    : "bg-bg-card border border-n-200 text-n-700 hover:border-n-300")
                }
              >
                {a.name}
                <span
                  className={
                    "font-mono text-[11px] " +
                    (isActive ? "text-forest-50/80" : "text-n-500")
                  }
                >
                  {a.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Photo grid — 4 cols mobile, 6 cols desktop */}
      <section>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {Array.from({ length: VISIBLE_PHOTOS }).map((_, i) => {
            const tone: DogPhotoTone =
              i % 3 === 0 ? "elkhound" : i % 3 === 1 ? "sire" : "dam";
            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  showToast(`Bilde ${i + 1} av ${TOTAL_PHOTOS}`, "info")
                }
                className="aspect-square rounded-card overflow-hidden focus-visible:outline-2 focus-visible:outline-forest-500 focus-visible:outline-offset-2 hover:opacity-90 transition-opacity"
                aria-label={`Åpne bilde ${i + 1}`}
              >
                <DogPhoto
                  tone={tone}
                  label={`${i + 1}`}
                  className="w-full h-full"
                  aspect="1 / 1"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => showToast("Laster flere bilder…", "info")}
          className="mt-4 w-full bg-bg-card border border-n-200 hover:border-n-300 hover:bg-n-50 transition-colors rounded-card py-2.5 text-sm text-n-950"
        >
          Vis flere · {remaining} bilder igjen
        </button>
      </section>

      <p className="text-xs text-n-500">
        {dog.callName ?? dog.name} har {TOTAL_PHOTOS} bilder fordelt på{" "}
        {albums.length - 1} album. Bilder kan deles til den offentlige
        kennelsiden eller holdes private.
      </p>
    </div>
  );
}
