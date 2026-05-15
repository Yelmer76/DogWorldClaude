import Link from "next/link";
import { inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { dogs as dogsTable, type DogRow } from "@/db/schema";
import { listLitters } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { Tag } from "@/components/dogworld/Tag";
import { DogPhoto } from "@/components/dogworld/DogPhoto";

const stageLabel = {
  planned: "Planlagt",
  mated: "Paret",
  pregnant: "Drektig",
  whelped: "Født",
  rearing: "Oppfostring",
  delivery: "Levering",
  done: "Avsluttet",
} as const;

const stageTone: Record<keyof typeof stageLabel, "neutral" | "info" | "warning" | "success" | "forest"> = {
  planned: "neutral",
  mated: "neutral",
  pregnant: "warning",
  whelped: "info",
  rearing: "forest",
  delivery: "warning",
  done: "neutral",
};

export default async function KullListPage() {
  const all = await listLitters();

  // Resolve all parent dogs once, build an id → dog map
  const parentIds = Array.from(
    new Set(all.flatMap((l) => [l.sireId, l.damId])),
  );
  const db = await getDb();
  const parentRows: DogRow[] =
    parentIds.length > 0
      ? await db.select().from(dogsTable).where(inArray(dogsTable.id, parentIds)).all()
      : [];
  const byId = new Map(parentRows.map((d) => [d.id, d]));

  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-8 py-5 md:py-8 flex flex-col gap-5 max-w-[1100px] w-full mx-auto">
        {/* Desktop title + new-litter CTA */}
        <header className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
              Kullene dine
            </div>
            <h1 className="m-0 text-[28px] font-semibold tracking-[-0.015em] text-n-950">
              Kull
            </h1>
            <p className="m-0 mt-2 text-sm text-n-700 max-w-[60ch]">
              Alle planlagte, drektige, oppfostrende og avsluttede kull —
              åpne et for å se valpene, søknadene og dagboka.
            </p>
          </div>
          <Link
            href="/kull/nytt"
            className="inline-flex items-center gap-1.5 bg-ochre-600 hover:bg-[#25415a] text-white rounded-btn px-4 py-2.5 text-sm font-medium transition-colors flex-shrink-0"
          >
            <span aria-hidden className="text-base leading-none">＋</span>
            Nytt kull
          </Link>
        </header>

        {/* List */}
        {all.length > 0 ? (
          <ul className="m-0 p-0 list-none flex flex-col gap-3">
            {all.map((litter) => {
              const sire = byId.get(litter.sireId);
              const dam = byId.get(litter.damId);
              return (
                <li key={litter.id}>
                  <Link
                    href={`/kull/${litter.id}`}
                    className="group flex bg-bg-card border border-n-200 rounded-card overflow-hidden hover:border-n-300 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-all"
                  >
                    <div className="w-24 sm:w-32 aspect-square flex-shrink-0">
                      <DogPhoto
                        tone="elkhound"
                        label={litter.callName.toUpperCase()}
                        className="w-full h-full !rounded-none"
                      />
                    </div>
                    <div className="flex-1 min-w-0 p-4 flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="m-0 text-base font-semibold tracking-[-0.005em] text-n-950 leading-snug">
                          {litter.callName}
                          {litter.poetic && (
                            <span className="font-normal italic text-n-500 ml-2 text-sm">
                              «{litter.poetic}»
                            </span>
                          )}
                        </h3>
                        <Tag variant={stageTone[litter.status]} dot>
                          {stageLabel[litter.status]}
                        </Tag>
                      </div>
                      <div className="text-xs text-n-700 font-mono">
                        {sire?.callName ?? sire?.name ?? "?"} ×{" "}
                        {dam?.callName ?? dam?.name ?? "?"}
                      </div>
                      <div className="text-xs text-n-500 font-mono mt-1">
                        Født {litter.whelpingDate} · uke {litter.weekOfAge}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-n-700">
                        <span>
                          <span className="font-semibold text-n-950">
                            {litter.total}
                          </span>{" "}
                          valper
                        </span>
                        <span className="text-n-300">·</span>
                        <span
                          className={
                            litter.available > 0
                              ? "text-success-fg"
                              : "text-n-500"
                          }
                        >
                          {litter.available} ledig
                        </span>
                        <span className="text-n-300">·</span>
                        <span>{litter.applicationsTotal} søknader</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState />
        )}

        <p className="text-[11px] text-n-500 px-1 font-mono">
          {all.length} {all.length === 1 ? "kull" : "kull"} totalt · lest fra
          lokal SQLite
        </p>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="bg-bg-card border border-dashed border-n-300 rounded-card p-10 text-center flex flex-col items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-forest-50 text-forest-700 grid place-items-center">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="8" cy="9" r="1.6" />
          <circle cx="16" cy="9" r="1.6" />
          <circle cx="11" cy="6" r="1.6" />
          <circle cx="14" cy="6" r="1.6" />
          <path d="M7 17c0-3 2-5 5-5s5 2 5 5-2 4-5 4-5-1-5-4z" />
        </svg>
      </div>
      <div>
        <h2 className="m-0 text-lg font-semibold text-n-950">
          Ingen kull ennå
        </h2>
        <p className="m-0 mt-1 text-sm text-n-700 max-w-[40ch]">
          Begynn med å planlegge et kull — du legger inn far, mor og forventet
          paringsdato. Vi følger med fra dag null.
        </p>
      </div>
      <Link
        href="/kull/nytt"
        className="inline-flex items-center gap-1.5 bg-ochre-600 hover:bg-[#25415a] text-white rounded-btn px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <span aria-hidden className="text-base leading-none">＋</span>
        Planlegg første kull
      </Link>
    </div>
  );
}
