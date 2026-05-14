/**
 * Domain-specific card recipes used across DogWorld(tmp).
 * All compose the generic <Card> primitive plus dog-specific atoms.
 */
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Tag } from "./Tag";
import { DogPhoto, type DogPhotoTone } from "./DogPhoto";

// ── Dog profile card ────────────────────────────────────────────────────────
export type DogProfileCardProps = {
  titles?: string;
  name: string;
  meta: ReactNode;
  /** Tone for placeholder photo */
  tone?: DogPhotoTone;
  /** Real photo URL */
  photoSrc?: string;
  /** Tags shown below the dog row */
  tags?: ReactNode;
};

export function DogProfileCard({
  titles,
  name,
  meta,
  tone = "elkhound",
  photoSrc,
  tags,
}: DogProfileCardProps) {
  return (
    <Card>
      <div className="flex gap-3 items-center">
        <DogPhoto
          src={photoSrc}
          tone={tone}
          rounded="full"
          label="DOG"
          className="w-14 h-14 flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          {titles && (
            <div className="font-mono text-[11px] text-ochre-700 mb-0.5 tracking-[0.05em]">
              {titles}
            </div>
          )}
          <div className="text-base font-semibold tracking-[-0.005em] truncate">
            {name}
          </div>
          <div className="text-xs text-n-500">{meta}</div>
        </div>
      </div>
      {tags && (
        <div className="flex flex-wrap gap-1.5 mt-3.5">{tags}</div>
      )}
    </Card>
  );
}

// ── Litter card ─────────────────────────────────────────────────────────────
export type LitterCardProps = {
  title: string;
  poetic?: string;
  sub: string;
  weekTag: string;
  /** Total number of weeks in the litter timeline (default 8) */
  totalWeeks?: number;
  /** Current week (1-indexed, week with "now" marker) */
  currentWeek: number;
  counts: { puppies: number; males: number; females: number; reserved: number };
};

export function LitterCard({
  title,
  poetic,
  sub,
  weekTag,
  totalWeeks = 8,
  currentWeek,
  counts,
}: LitterCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-start gap-3">
        <div>
          <h4 className="m-0 text-lg font-semibold tracking-[-0.01em]">
            {title}
            {poetic && (
              <span className="text-n-700 font-normal"> — {poetic}</span>
            )}
          </h4>
          <div className="text-xs text-n-500 mt-0.5">{sub}</div>
        </div>
        <Tag variant="accent">{weekTag}</Tag>
      </div>

      {/* Week track */}
      <div
        className="flex gap-[3px] mt-3"
        aria-label={`Uke ${currentWeek} av ${totalWeeks}`}
      >
        {Array.from({ length: totalWeeks }).map((_, i) => {
          const idx = i + 1;
          const cls =
            idx < currentWeek
              ? "bg-forest-500"
              : idx === currentWeek
                ? "bg-ochre-600"
                : "bg-n-100";
          return (
            <div key={i} className={`flex-1 h-1.5 rounded-[2px] ${cls}`} />
          );
        })}
      </div>

      {/* Counts */}
      <div className="flex gap-4 mt-3 text-xs text-n-700">
        <div>
          <b className="block text-lg text-n-950 font-semibold mb-0.5">
            {counts.puppies}
          </b>
          Valper
        </div>
        <div>
          <b className="block text-lg text-n-950 font-semibold mb-0.5">
            {counts.males} ♂
          </b>
          Hanner
        </div>
        <div>
          <b className="block text-lg text-n-950 font-semibold mb-0.5">
            {counts.females} ♀
          </b>
          Tisper
        </div>
        <div>
          <b className="block text-lg text-n-950 font-semibold mb-0.5">
            {counts.reserved}
          </b>
          Reservert
        </div>
      </div>
    </Card>
  );
}

// ── Event card ──────────────────────────────────────────────────────────────
export type EventCardProps = {
  day: number | string;
  /** Short month label, e.g. "MAI" */
  month: string;
  title: string;
  meta: string;
  tags?: ReactNode;
};

export function EventCard({ day, month, title, meta, tags }: EventCardProps) {
  return (
    <Card>
      <div className="flex gap-3">
        <div
          className="w-14 h-14 rounded-card bg-forest-50 text-forest-700 grid place-items-center flex-shrink-0 text-center leading-none"
          aria-hidden
        >
          <div>
            <div className="text-xl font-semibold tracking-[-0.02em]">{day}</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mt-1">
              {month}
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold">{title}</div>
          <div className="text-xs text-n-500 mt-0.5">{meta}</div>
          {tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">{tags}</div>
          )}
        </div>
      </div>
    </Card>
  );
}

// ── News card ───────────────────────────────────────────────────────────────
export type NewsCardProps = {
  title: string;
  excerpt: string;
  source: string;
  date: string;
  /** Photo placeholder label */
  photoLabel?: string;
  photoSrc?: string;
};

export function NewsCard({
  title,
  excerpt,
  source,
  date,
  photoLabel = "DOG SHOW PHOTO",
  photoSrc,
}: NewsCardProps) {
  return (
    <Card flush>
      <DogPhoto
        src={photoSrc}
        label={photoLabel}
        rounded="card"
        aspect="16 / 9"
        className="rounded-b-none"
      />
      <div className="p-4">
        <h4 className="m-0 mb-2 text-lg font-semibold tracking-[-0.01em] leading-snug">
          {title}
        </h4>
        <p className="m-0 text-sm text-n-700">{excerpt}</p>
        <div className="flex justify-between mt-3 text-xs text-n-500">
          <span>{source}</span>
          <span>{date}</span>
        </div>
      </div>
    </Card>
  );
}
