"use client";

import { DogPhoto, type DogPhotoTone } from "@/components/dogworld/DogPhoto";
import { MemorialRibbon } from "@/components/dog-detail/MemorialRibbon";
import type { DogStatus } from "@/data/universe";

const statusLabel: Record<DogStatus, string> = {
  active: "Aktiv",
  retired: "Pensjonert",
  sold: "Solgt",
  memorial: "Over regnbuebroen",
};

const statusClasses: Record<DogStatus, string> = {
  active: "bg-success-bg text-success-fg",
  retired: "bg-warning-bg text-warning-fg",
  sold: "bg-n-100 text-n-700",
  memorial: "bg-info-bg text-info-fg",
};

export type DogHeroProps = {
  status: DogStatus;
  /** Photo placeholder tone (sire / dam / elkhound / generic) */
  tone?: DogPhotoTone;
  /** Real photo URL */
  photoSrc?: string;
  /** Photo count for badge overlay */
  photoCount?: number;
  /** ISO date for memorial ribbon caption */
  deceasedDate?: string;
  /** Called when status pill clicked (opens status sheet) */
  onStatusClick?: () => void;
  /** Called when hero photo clicked (opens gallery) */
  onPhotoClick?: () => void;
};

export function DogHero({
  status,
  tone = "elkhound",
  photoSrc,
  photoCount,
  deceasedDate,
  onStatusClick,
  onPhotoClick,
}: DogHeroProps) {
  const muted = status === "memorial";
  const noPhotos = photoCount === 0;

  return (
    <div className="relative w-full h-[280px] overflow-hidden">
      <button
        type="button"
        onClick={onPhotoClick}
        className="absolute inset-0 w-full h-full"
        aria-label={noPhotos ? "Last opp første bilde" : "Vis fullt galleri"}
      >
        <DogPhoto
          src={photoSrc}
          tone={tone}
          muted={muted}
          label={noPhotos ? "INGEN BILDER ENNÅ" : "HERO PHOTO"}
          rounded="card"
          className="w-full h-full !rounded-none"
        />
      </button>

      {muted && <MemorialRibbon deceasedDate={deceasedDate} />}

      {/* Status pill — bottom-left overlay */}
      <button
        type="button"
        onClick={onStatusClick}
        className={`absolute left-4 bottom-4 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusClasses[status]} shadow-[0_2px_4px_rgba(26,26,26,0.05),0_4px_12px_rgba(26,26,26,0.05)] hover:opacity-90 transition-opacity`}
      >
        {statusLabel[status]}
      </button>

      {/* Photo count — bottom-right overlay (hidden when zero) */}
      {photoCount !== undefined && photoCount > 0 && (
        <div className="absolute right-4 bottom-4 inline-flex items-center px-2.5 py-1 rounded-full bg-n-950/70 text-white text-xs font-medium font-mono backdrop-blur-sm">
          {photoCount} {photoCount === 1 ? "bilde" : "bilder"}
        </div>
      )}
    </div>
  );
}
