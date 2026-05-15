"use client";

import { useToast } from "@/components/dogworld/ToastProvider";
import { PedigreeNode } from "@/components/dogworld/PedigreeNode";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { dogs, type Dog } from "@/data/universe";

export type StamtavleTabProps = {
  dog: Dog;
};

/**
 * Compact stub for offspring + grandparents that aren't full Dog records yet.
 * Sprint 4 will wire these to the database; for now the design handoff data
 * lives inline so the tree renders meaningfully.
 */
type AncestorStub = {
  name: string;
  titles: string;
  sex: "m" | "f";
  born: string;
  health?: string;
};

type OffspringStub = {
  name: string;
  titles?: string;
  sex: "m" | "f";
  born: string;
};

const grandparents: AncestorStub[] = [
  { name: "Skagen av Fjordlund", titles: "NUCH", sex: "m", born: "2017", health: "HD A" },
  { name: "Linnea av Granheim", titles: "NORDUCH", sex: "f", born: "2016", health: "HD A" },
  { name: "Kaiser vom Hochwald", titles: "DE VDH-CH", sex: "m", born: "2015", health: "HD A" },
  { name: "Greta vom Schwarzwald", titles: "SE UCH", sex: "f", born: "2016", health: "HD B" },
];

const offspring: OffspringStub[] = [
  { name: "Mira av Granheim", titles: "NUCH", sex: "f", born: "Apr 2024" },
  { name: "Loke av Granheim", sex: "m", born: "Apr 2024" },
  { name: "Idun av Granheim", sex: "f", born: "Apr 2024" },
];

function joinTitles(d: Dog): string {
  return d.titles.join(" ");
}

function shortYear(iso: string): string {
  return iso.slice(0, 4);
}

export function StamtavleTab({ dog }: StamtavleTabProps) {
  const showToast = useToast();
  const sire = dog.sireId ? dogs[dog.sireId] : undefined;
  const dam = dog.damId ? dogs[dog.damId] : undefined;

  return (
    <div className="flex flex-col gap-8">
      {/* ── 3-generations mini-tree ──────────────────────────────────── */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500">
            3 generasjoner
          </h2>
          <span className="text-xs text-n-500 font-mono">
            {dog.callName ?? dog.name} er focal
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Focal */}
          <div className="flex flex-col gap-2">
            <ColLabel>Focal</ColLabel>
            <PedigreeNode
              variant="focal"
              titles={joinTitles(dog) || "—"}
              name={dog.name}
              meta={
                <>
                  {dog.sex === "m" ? "♂" : "♀"} · {shortYear(dog.born)}
                </>
              }
            />
          </div>

          {/* Parents */}
          <div className="flex flex-col gap-2">
            <ColLabel>Foreldre</ColLabel>
            {sire ? (
              <PedigreeNode
                variant="sire"
                titles={joinTitles(sire) || "—"}
                name={sire.name}
                meta={
                  <>
                    ♂ · {shortYear(sire.born)}
                  </>
                }
                health={summarizeHealth(sire)}
                onClick={() => showToast(`→ ${sire.callName ?? sire.name}`)}
              />
            ) : (
              <UnknownNode label="Far ukjent" />
            )}
            {dam ? (
              <PedigreeNode
                variant="dam"
                titles={joinTitles(dam) || "—"}
                name={dam.name}
                meta={
                  <>
                    ♀ · {shortYear(dam.born)}
                  </>
                }
                health={summarizeHealth(dam)}
                onClick={() => showToast(`→ ${dam.callName ?? dam.name}`)}
              />
            ) : (
              <UnknownNode label="Mor ukjent" />
            )}
          </div>

          {/* Grandparents */}
          <div className="flex flex-col gap-2">
            <ColLabel>Besteforeldre</ColLabel>
            {grandparents.map((g) => (
              <PedigreeNode
                key={g.name}
                variant={g.sex === "m" ? "sire" : "dam"}
                titles={g.titles}
                name={g.name}
                meta={
                  <>
                    {g.sex === "m" ? "♂" : "♀"} · {g.born}
                  </>
                }
                health={g.health}
                onClick={() => showToast(`→ ${g.name}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Open full pedigree explorer ──────────────────────────────── */}
      <section>
        <button
          type="button"
          onClick={() =>
            showToast("→ Pedigree explorer (kommer i Sprint 4)", "info")
          }
          className="w-full flex items-center justify-between bg-bg-card border border-n-200 hover:border-forest-500 hover:bg-forest-50/40 transition-colors rounded-card px-4 py-3 text-sm text-n-950"
        >
          <span className="font-medium">
            Åpne full stamtavle — focal navigation
          </span>
          <span aria-hidden className="text-forest-700">
            →
          </span>
        </button>
      </section>

      {/* ── Offspring ────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500">
            Avkom
          </h2>
          <span className="text-xs text-n-500 font-mono">
            1 kull · {offspring.length} valper
          </span>
        </div>
        <ul className="bg-bg-card border border-n-200 rounded-card divide-y divide-n-100 list-none p-0 m-0 overflow-hidden">
          {offspring.map((p) => (
            <li key={p.name}>
              <button
                type="button"
                onClick={() => showToast(`→ ${p.name}`)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-n-50 transition-colors"
              >
                <DogPhoto
                  tone={p.sex === "m" ? "sire" : "dam"}
                  label={p.sex === "m" ? "M" : "F"}
                  className="w-9 h-9 flex-shrink-0"
                  aspect="1 / 1"
                />
                <div className="min-w-0 flex-1">
                  {p.titles && (
                    <div className="font-mono text-[10px] text-ochre-700 tracking-[0.05em] uppercase">
                      {p.titles}
                    </div>
                  )}
                  <div className="text-sm font-medium text-n-950 truncate">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-n-500 mt-0.5">
                    {p.sex === "m" ? "♂" : "♀"} · {p.born}
                  </div>
                </div>
                <span aria-hidden className="text-n-300 text-lg leading-none">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-n-500 px-1">
      {children}
    </div>
  );
}

function UnknownNode({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-n-300 rounded-card p-3 text-center text-xs text-n-500 italic">
      {label}
    </div>
  );
}

function summarizeHealth(d: Dog): string | undefined {
  const parts: string[] = [];
  if (d.health.HD?.value) parts.push(`HD ${d.health.HD.value.split(" ")[0]}`);
  if (d.health.ED?.value) parts.push(`ED ${d.health.ED.value}`);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}
