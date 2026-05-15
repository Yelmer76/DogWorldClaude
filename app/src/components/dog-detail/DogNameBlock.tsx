"use client";

import { TitleBadge } from "@/components/dogworld/Tag";
import { InlineField } from "@/components/dogworld/InlineField";

export type DogNameBlockProps = {
  registeredName: string;
  callName?: string;
  sex: "m" | "f";
  ageText: string; // already formatted (e.g. "3 år")
  breed: string;
  titles: string[];
  /** Public visibility flag — tied to the eye/closed-eye pill */
  publicVisible: boolean;
  onCallNameSave?: (next: string) => void;
  onPublicToggle?: () => void;
};

export function DogNameBlock({
  registeredName,
  callName,
  sex,
  ageText,
  breed,
  titles,
  publicVisible,
  onCallNameSave,
  onPublicToggle,
}: DogNameBlockProps) {
  const sexSymbol = sex === "f" ? "♀" : "♂";
  return (
    <div className="px-4 md:px-6 pt-4 pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-n-950 leading-[1.15]">
            {registeredName}
          </h1>
          <div className="text-sm text-n-500 mt-1.5 flex items-center gap-2 flex-wrap">
            <InlineField
              ariaLabel="Kallenavn"
              value={callName ?? ""}
              onSave={onCallNameSave}
              placeholder="Legg til kallenavn"
              size="sm"
            />
            <span aria-hidden>·</span>
            <span aria-hidden>{sexSymbol}</span>
            <span>{ageText}</span>
            <span aria-hidden>·</span>
            <span>{breed}</span>
          </div>
        </div>

        {/* Public/private eye pill */}
        <button
          type="button"
          onClick={onPublicToggle}
          className={
            "flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors " +
            (publicVisible
              ? "bg-forest-50 text-forest-700 border-transparent hover:bg-forest-100"
              : "bg-n-50 text-n-700 border-n-200 hover:bg-n-100")
          }
          aria-label={
            publicVisible
              ? "Profil er offentlig (trykk for å gjøre privat)"
              : "Profil er privat (trykk for å gjøre offentlig)"
          }
        >
          {publicVisible ? <EyeIcon /> : <EyeOffIcon />}
          {publicVisible ? "Offentlig" : "Privat"}
        </button>
      </div>

      {titles.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {titles.map((t) => (
            <TitleBadge key={t}>{t}</TitleBadge>
          ))}
        </div>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7c2.2 0 4.1.8 5.7 1.9M22 12s-3.5 7-10 7c-2.2 0-4.1-.8-5.7-1.9" />
      <path d="M3 3l18 18" />
    </svg>
  );
}
