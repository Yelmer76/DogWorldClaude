"use client";

/**
 * PublicPreviewPane — desktop-only right rail showing how the dog looks
 * on its public kennel-website card. Mirrors `publicVisible` and
 * `sharedToGenealogy` toggles in real time so breeders see the impact of
 * privacy changes immediately.
 *
 * Hidden below xl breakpoint (the Dog Detail body uses the full width on
 * tablets and mobile).
 */
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { TitleBadge } from "@/components/dogworld/Tag";
import type { Dog } from "@/data/universe";

export type PublicPreviewPaneProps = {
  dog: Dog;
  publicVisible: boolean;
  sharedToGenealogy: boolean;
};

function ageLine(bornISO: string, deceasedISO?: string): string {
  if (deceasedISO) return `${bornISO.slice(0, 4)}–${deceasedISO.slice(0, 4)}`;
  const born = new Date(bornISO);
  const now = new Date();
  let years = now.getFullYear() - born.getFullYear();
  const m = now.getMonth() - born.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < born.getDate())) years--;
  return `${years} år · f. ${bornISO.slice(0, 4)}`;
}

export function PublicPreviewPane({
  dog,
  publicVisible,
  sharedToGenealogy,
}: PublicPreviewPaneProps) {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-[320px] flex-shrink-0">
      <div className="px-1">
        <h3 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
          Offentlig forhåndsvisning
        </h3>
        <p className="text-xs text-n-700 mt-1 leading-relaxed">
          Slik ser kjøpere og andre breeders {dog.callName ?? dog.name} på
          kennelens side.
        </p>
      </div>

      {/* The card mirrors the public kennel page treatment */}
      <div className="bg-bg-card border border-n-200 rounded-card overflow-hidden shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
        {publicVisible ? (
          <>
            <div className="aspect-[4/3] relative">
              <DogPhoto
                tone="elkhound"
                muted={dog.status === "memorial"}
                label={`${(dog.callName ?? dog.name).toUpperCase()} · COVER`}
                className="w-full h-full !rounded-none"
              />
              {dog.status === "memorial" && (
                <span className="absolute top-0 inset-x-0 bg-info-bg text-info-fg text-[10px] font-medium px-2 py-1 text-center">
                  ✱ Over regnbuebroen
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-wrap gap-1">
                {dog.titles.length > 0 ? (
                  dog.titles.map((t) => <TitleBadge key={t}>{t}</TitleBadge>)
                ) : (
                  <span className="text-[11px] text-n-500 italic">
                    Ingen titler ennå
                  </span>
                )}
              </div>
              <div className="text-[15px] font-semibold tracking-[-0.005em] text-n-950 leading-snug">
                {dog.name}
              </div>
              <div className="text-xs text-n-700 font-mono">
                {dog.sex === "m" ? "♂" : "♀"} ·{" "}
                {ageLine(dog.born, dog.deceased)}
              </div>
              <div className="border-t border-n-100 pt-2 mt-1 flex items-center gap-2">
                <span
                  className={
                    "w-1.5 h-1.5 rounded-full " +
                    (sharedToGenealogy
                      ? "bg-success-dot"
                      : "bg-n-300")
                  }
                  aria-hidden
                />
                <span className="text-[11px] text-n-700">
                  {sharedToGenealogy
                    ? "Synlig i fellesstamtavlen"
                    : "Privat for kennelen"}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 text-center">
            <span
              className="w-12 h-12 rounded-full bg-n-100 text-n-500 grid place-items-center mx-auto mb-3"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 5.1A11 11 0 0 1 21 12c-.5 1.2-1.2 2.3-2.1 3.2M6.6 6.6A11 11 0 0 0 3 12c1.4 3.5 4.9 6 9 6 1.4 0 2.7-.3 3.9-.8" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <p className="m-0 text-sm font-medium text-n-950">
              Skjult fra publikum
            </p>
            <p className="m-0 mt-1 text-xs text-n-700">
              Aktiver "Synlig på kennelens side" for å vise{" "}
              {dog.callName ?? dog.name} her.
            </p>
          </div>
        )}
      </div>

      <p className="text-[11px] text-n-500 px-1 leading-relaxed">
        Endringer du gjør på profil-fanen oppdateres her med en gang. Du
        kontrollerer alltid hva som er offentlig.
      </p>
    </aside>
  );
}
