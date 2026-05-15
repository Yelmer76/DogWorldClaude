"use client";

import type { Dog } from "@/data/universe";
import {
  HealthRow,
  HealthTable,
} from "@/components/dogworld/HealthRow";
import { Sparkline } from "@/components/dogworld/Sparkline";
import { Tag } from "@/components/dogworld/Tag";

export type HelseTabProps = {
  dog: Dog;
};

const schemeLongLabel: Record<string, string> = {
  HD: "Hofte-leddsdysplasi (radiograf)",
  ED: "Albue-leddsdysplasi",
  Eyes: "Årlig oftalmologisk undersøkelse",
  DM: "Degenerativ myelopati (DNA)",
  "prcd-PRA": "Progressiv retinal atrofi (DNA)",
};

const vaccines: {
  name: string;
  label: string;
  due: string;
  status: "ok" | "warn" | "err" | "info";
  hint: string;
}[] = [
  {
    name: "DHPPi",
    label: "DHPPi (årsbooster)",
    due: "12. mai 2026",
    status: "ok",
    hint: "Gyldig til mai 2027",
  },
  {
    name: "Rabies",
    label: "Rabies",
    due: "08. apr 2026",
    status: "ok",
    hint: "Gyldig til apr 2029",
  },
  {
    name: "Lepto",
    label: "Lepto-2",
    due: "12. mai 2026",
    status: "ok",
    hint: "Gyldig til mai 2027",
  },
  {
    name: "Bordetella",
    label: "Bordetella (kennelhoste)",
    due: "Ikke registrert",
    status: "info",
    hint: "Anbefales før utstillinger",
  },
];

// Astor's 7-month weight series (placeholder until DB)
const weightSeries = [22.1, 22.4, 22.6, 22.8, 23.0, 23.2, 23.1];
const weightMonths = ["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mai"];

const tagVariant = {
  ok: "success" as const,
  warn: "warning" as const,
  err: "error" as const,
  info: "info" as const,
};

export function HelseTab({ dog }: HelseTabProps) {
  const healthEntries = Object.entries(dog.health);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Helse-test-resultater ──────────────────────────────────────── */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3">
          Helse-test-resultater
        </h2>
        <HealthTable>
          {healthEntries.map(([scheme, test]) => (
            <HealthRow
              key={scheme}
              scheme={`${scheme} · ${test.scheme ?? "FCI"}`}
              detail={schemeLongLabel[scheme] ?? scheme}
              value={test.value}
              status={test.status}
              date={test.date ? formatDate(test.date) : "—"}
              certUrl={test.certUrl ?? "#"}
            />
          ))}
        </HealthTable>
        <p className="text-xs text-n-500 mt-2">
          Astors helse-historikk vises her. PDF-sertifikater åpnes i nytt
          vindu og lagres som lenke i hund-journalen.
        </p>
      </section>

      {/* ── Vaksinasjoner ───────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3">
          Vaksinasjoner
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {vaccines.map((v) => (
            <div
              key={v.name}
              className="bg-bg-card border border-n-200 rounded-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-n-950">
                    {v.label}
                  </div>
                  <div className="text-xs text-n-500 mt-0.5 font-mono">
                    Sist gitt: {v.due}
                  </div>
                </div>
                <Tag variant={tagVariant[v.status]} dot>
                  {v.status === "info" ? "Mangler" : "Gyldig"}
                </Tag>
              </div>
              <div className="text-xs text-n-700 mt-2">{v.hint}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 transition-colors"
        >
          Skann nytt vaksinekort →
        </button>
      </section>

      {/* ── Vekt-historikk ──────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3">
          Vekt — siste 7 måneder
        </h2>
        <div className="bg-bg-card border border-n-200 rounded-card p-5">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <div className="text-3xl font-semibold tracking-[-0.02em] text-n-950 font-mono">
                {weightSeries[weightSeries.length - 1].toFixed(1)} kg
              </div>
              <div className="text-xs text-n-500 mt-0.5">
                Siste veiing · 12. mai 2026
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-success-fg font-medium">
                +1,0 kg på 7 mnd
              </div>
              <div className="text-xs text-n-500 mt-0.5">
                Stabil for rasen
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Sparkline
              data={weightSeries}
              width={560}
              height={80}
              ariaLabel="Astors vekt-utvikling siste 7 måneder"
              className="w-full"
            />
            <div className="grid grid-cols-7 mt-2 text-[10px] text-n-500 font-mono uppercase tracking-[0.06em] text-center">
              {weightMonths.map((m) => (
                <div key={m}>{m}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
