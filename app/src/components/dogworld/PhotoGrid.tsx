/**
 * PhotoGrid — square-cell photo gallery used on litter pages and dog detail.
 * Per design handoff: 4-col mobile, 6-col desktop. Square crops only.
 * Last cell can show a "+N" overflow indicator.
 */
import { DogPhoto, type DogPhotoTone } from "./DogPhoto";

export type PhotoGridItem = {
  id: string;
  src?: string;
  alt?: string;
  label?: string;
  tone?: DogPhotoTone;
};

export type PhotoGridProps = {
  items: PhotoGridItem[];
  /** When set, only show this many cells; the last cell becomes "+N" overflow */
  maxVisible?: number;
  /** Override columns for mobile (default 4) */
  mobileCols?: number;
  /** Override columns for desktop (default 6) */
  desktopCols?: number;
};

export function PhotoGrid({
  items,
  maxVisible,
  mobileCols = 4,
  desktopCols = 6,
}: PhotoGridProps) {
  const visible =
    maxVisible !== undefined && items.length > maxVisible
      ? items.slice(0, maxVisible - 1)
      : items;
  const overflow =
    maxVisible !== undefined && items.length > maxVisible
      ? items.length - (maxVisible - 1)
      : 0;

  return (
    <div
      className={`grid gap-2 grid-cols-${mobileCols} md:grid-cols-${desktopCols}`}
      style={{
        gridTemplateColumns: `repeat(var(--photo-grid-cols, ${mobileCols}), minmax(0, 1fr))`,
      }}
    >
      {visible.map((item) => (
        <DogPhoto
          key={item.id}
          src={item.src}
          alt={item.alt}
          label={item.label}
          tone={item.tone ?? "generic"}
          aspect="1 / 1"
        />
      ))}
      {overflow > 0 && (
        <div
          className="aspect-square rounded-card bg-n-100 grid place-items-center text-n-700 font-mono text-sm uppercase tracking-[0.04em]"
          aria-label={`Pluss ${overflow} flere bilder`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
