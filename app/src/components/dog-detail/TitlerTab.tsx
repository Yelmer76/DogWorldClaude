"use client";

import type { Dog, Achievement } from "@/data/universe";
import { TitleBadge } from "@/components/dogworld/Tag";

export type TitlerTabProps = {
  dog: Dog;
};

/**
 * Group achievements by year (year-shorthand like "'25" → "2025").
 * Returns chronological newest-first.
 */
function groupByYear(achievements: Achievement[]): Map<string, Achievement[]> {
  const groups = new Map<string, Achievement[]>();
  for (const a of achievements) {
    const yr = a.y.replace("'", "20");
    if (!groups.has(yr)) groups.set(yr, []);
    groups.get(yr)!.push(a);
  }
  // Sort year keys descending
  return new Map(
    [...groups.entries()].sort(([a], [b]) => Number(b) - Number(a)),
  );
}

function isChampionship(text: string): boolean {
  return /\b(NUCH|NORDUCH|SE UCH|SUCH|VDH-CH|KC Ch|CH|GCH|FIN UCH|CIB|World Winner|Nordic Winner)\b/i.test(
    text,
  );
}

export function TitlerTab({ dog }: TitlerTabProps) {
  const grouped = groupByYear(dog.achievements);
  const championships = dog.titles.length;
  const showCount = dog.achievements.filter(
    (a) => !isChampionship(a.t),
  ).length;
  const lastYear =
    [...grouped.keys()].sort((a, b) => Number(b) - Number(a))[0] ?? "—";

  return (
    <div className="flex flex-col gap-8">
      {/* Stats row */}
      <section className="grid grid-cols-3 gap-3">
        <StatCard label="Titler" value={championships} sub="bekreftet" />
        <StatCard label="Resultater" value={dog.achievements.length} sub="i loggen" />
        <StatCard label="Sist aktiv" value={lastYear} sub="dømt utstilling" />
      </section>

      {/* Titles row */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3">
          Bekreftede titler
        </h2>
        <div className="bg-bg-card border border-n-200 rounded-card p-4 flex flex-wrap gap-2">
          {dog.titles.length > 0 ? (
            dog.titles.map((t) => <TitleBadge key={t}>{t}</TitleBadge>)
          ) : (
            <span className="text-sm text-n-500 italic">
              Ingen titler bekreftet ennå.
            </span>
          )}
          <button
            type="button"
            className="ml-auto text-xs text-forest-700 hover:text-forest-900 transition-colors"
          >
            + Legg til tittel
          </button>
        </div>
      </section>

      {/* Chronological timeline grouped by year */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3">
          Resultater
        </h2>
        <div className="flex flex-col gap-6">
          {[...grouped.entries()].map(([year, items]) => (
            <YearGroup key={year} year={year} items={items} />
          ))}
          {grouped.size === 0 && (
            <div className="bg-bg-card border border-dashed border-n-300 rounded-card p-8 text-center text-sm text-n-500">
              Ingen utstillings-resultater ennå. Skann en dommerkritikk for å
              starte loggen.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="bg-bg-card border border-n-200 rounded-card p-4">
      <div className="text-xs uppercase tracking-[0.06em] text-n-500 font-medium">
        {label}
      </div>
      <div className="text-2xl font-semibold tracking-[-0.02em] mt-1 text-n-950">
        {value}
      </div>
      <div className="text-xs text-n-500 mt-0.5">{sub}</div>
    </div>
  );
}

function YearGroup({ year, items }: { year: string; items: Achievement[] }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.08em] text-n-500 mb-2 px-1">
        {year}
      </div>
      <ul className="bg-bg-card border border-n-200 rounded-card divide-y divide-n-100 list-none p-0 m-0">
        {items.map((a, idx) => {
          const champ = isChampionship(a.t);
          return (
            <li key={`${a.y}-${idx}`} className="px-4 py-3 flex items-start gap-3">
              <span
                className={
                  "mt-1.5 w-2 h-2 rounded-full flex-shrink-0 " +
                  (champ ? "bg-ochre-600" : "bg-forest-500")
                }
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-n-950">{a.t}</div>
                {champ && (
                  <div className="text-[11px] uppercase tracking-[0.06em] text-ochre-700 font-medium mt-0.5">
                    Mesterskap
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
