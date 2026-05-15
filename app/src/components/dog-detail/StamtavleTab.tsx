"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PedigreeNode } from "@/components/dogworld/PedigreeNode";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { dogs, type Dog } from "@/data/universe";

export type StamtavleTabProps = {
  dog: Dog;
};

function joinTitles(d: Dog): string {
  return d.titles.join(" ");
}

function shortYear(iso: string): string {
  return iso.slice(0, 4);
}

function summarizeHealth(d: Dog): string | undefined {
  const parts: string[] = [];
  if (d.health.HD?.value) parts.push(`HD ${d.health.HD.value.split(" ")[0]}`);
  if (d.health.ED?.value) parts.push(`ED ${d.health.ED.value}`);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export function StamtavleTab({ dog }: StamtavleTabProps) {
  const router = useRouter();
  const sire = dog.sireId ? dogs[dog.sireId] : undefined;
  const dam = dog.damId ? dogs[dog.damId] : undefined;

  // Grandparents derived from sire + dam — null if any link is missing
  const paternalSire = sire?.sireId ? dogs[sire.sireId] : undefined;
  const paternalDam = sire?.damId ? dogs[sire.damId] : undefined;
  const maternalSire = dam?.sireId ? dogs[dam.sireId] : undefined;
  const maternalDam = dam?.damId ? dogs[dam.damId] : undefined;

  // Offspring from universe lookup
  const offspring = dog.offspringIds
    .map((id) => dogs[id])
    .filter((d): d is Dog => Boolean(d));

  function go(id: string) {
    router.push(`/dog/${id}`);
  }

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
            <ParentSlot
              relation="sire"
              dog={sire}
              fallback="Far ukjent"
              onTap={go}
            />
            <ParentSlot
              relation="dam"
              dog={dam}
              fallback="Mor ukjent"
              onTap={go}
            />
          </div>

          {/* Grandparents */}
          <div className="flex flex-col gap-2">
            <ColLabel>Besteforeldre</ColLabel>
            <ParentSlot
              relation="sire"
              dog={paternalSire}
              fallback="Farfar ukjent"
              onTap={go}
            />
            <ParentSlot
              relation="dam"
              dog={paternalDam}
              fallback="Farmor ukjent"
              onTap={go}
            />
            <ParentSlot
              relation="sire"
              dog={maternalSire}
              fallback="Morfar ukjent"
              onTap={go}
            />
            <ParentSlot
              relation="dam"
              dog={maternalDam}
              fallback="Mormor ukjent"
              onTap={go}
            />
          </div>
        </div>
      </section>

      {/* ── Open full pedigree explorer ──────────────────────────────── */}
      <section>
        <Link
          href="/pedigree"
          className="w-full flex items-center justify-between bg-bg-card border border-n-200 hover:border-forest-500 hover:bg-forest-50/40 transition-colors rounded-card px-4 py-3 text-sm text-n-950"
        >
          <span className="font-medium">
            Åpne full stamtavle — focal navigation
          </span>
          <span aria-hidden className="text-forest-700">
            →
          </span>
        </Link>
      </section>

      {/* ── Offspring ────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500">
            Avkom
          </h2>
          <span className="text-xs text-n-500 font-mono">
            {offspring.length}{" "}
            {offspring.length === 1 ? "registrert" : "registrert totalt"}
          </span>
        </div>
        {offspring.length > 0 ? (
          <ul className="bg-bg-card border border-n-200 rounded-card divide-y divide-n-100 list-none p-0 m-0 overflow-hidden">
            {offspring.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/dog/${p.id}`}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-n-50 transition-colors"
                >
                  <DogPhoto
                    tone={p.sex === "m" ? "sire" : "dam"}
                    label={p.sex === "m" ? "M" : "F"}
                    className="w-9 h-9 flex-shrink-0"
                    aspect="1 / 1"
                  />
                  <div className="min-w-0 flex-1">
                    {p.titles.length > 0 && (
                      <div className="font-mono text-[10px] text-ochre-700 tracking-[0.05em] uppercase">
                        {p.titles.join(" ")}
                      </div>
                    )}
                    <div className="text-sm font-medium text-n-950 truncate">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-n-500 mt-0.5">
                      {p.sex === "m" ? "♂" : "♀"} · f. {shortYear(p.born)}
                    </div>
                  </div>
                  <span aria-hidden className="text-n-300 text-lg leading-none">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-n-300 rounded-card p-6 text-center text-sm text-n-500 italic">
            Ingen registrerte avkom.
          </div>
        )}
      </section>
    </div>
  );
}

function ParentSlot({
  relation,
  dog,
  fallback,
  onTap,
}: {
  relation: "sire" | "dam";
  dog: Dog | undefined;
  fallback: string;
  onTap: (id: string) => void;
}) {
  if (!dog) return <UnknownNode label={fallback} />;
  if (dog.hidden) {
    return (
      <div className="border border-n-200 bg-n-50 rounded-card p-3 text-xs text-n-500 italic">
        Skjult etter eierens valg
      </div>
    );
  }
  return (
    <PedigreeNode
      variant={relation}
      titles={joinTitles(dog) || "—"}
      name={dog.name}
      meta={
        <>
          {dog.sex === "m" ? "♂" : "♀"} · {shortYear(dog.born)}
        </>
      }
      health={summarizeHealth(dog)}
      onClick={() => onTap(dog.id)}
    />
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
