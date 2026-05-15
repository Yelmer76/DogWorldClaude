"use client";

/**
 * MemorialRibbon — overlay on top of the hero photo for memorial-status
 * dogs. Shows the deceased date in Norwegian format. Sits inside the hero
 * container; combined with DogPhoto's `muted` filter (grayscale) this
 * gives the somber treatment from the design handoff.
 */
export type MemorialRibbonProps = {
  /** ISO yyyy-mm-dd or display string */
  deceasedDate?: string;
};

const NB_MONTHS = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

function formatNb(date?: string): string {
  if (!date) return "";
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return date;
  const year = m[1];
  const monthIdx = Number(m[2]) - 1;
  const day = Number(m[3]);
  return `${day}. ${NB_MONTHS[monthIdx] ?? ""} ${year}`;
}

export function MemorialRibbon({ deceasedDate }: MemorialRibbonProps) {
  const formatted = formatNb(deceasedDate);
  return (
    <div className="absolute top-0 inset-x-0 z-10 bg-info-bg text-info-fg px-4 py-2 text-xs font-medium tracking-[0.02em] flex items-center justify-center gap-2 backdrop-blur-sm">
      <span aria-hidden>✱</span>
      <span>
        Over regnbuebroen
        {formatted && <span className="font-mono ml-2">· {formatted}</span>}
      </span>
    </div>
  );
}
