"use client";

import { dogs, litterC, puppies } from "@/data/universe";
import { AppHeader } from "@/components/shell/AppHeader";
import { ToastProvider } from "@/components/dogworld/ToastProvider";
import { CameraFab } from "@/components/dog-detail/CameraFab";
import { Tag } from "@/components/dogworld/Tag";
import { Button } from "@/components/ui/Button";
import { PuppyCard } from "@/components/litter/PuppyCard";
import { StageProgress } from "@/components/litter/StageProgress";
import { ApplicationsInbox } from "@/components/litter/ApplicationsInbox";
import { dailyLog } from "@/components/litter/litterExtras";

/**
 * Litter Detail — Sprint 7. Revenue-generating page.
 *
 * The breeder's command center for one litter: lifecycle stage, the 5
 * puppies with collar colors / weights / status, application inbox with
 * match indicators, and the daily journal. Asymmetric matchmaking is
 * the rule — buyers APPLY, breeders OFFER specific puppies. No
 * marketplace UX patterns here.
 */
export default function LitterPage() {
  return (
    <ToastProvider>
      <LitterInner />
    </ToastProvider>
  );
}

function LitterInner() {
  const sire = dogs[litterC.sireId];
  const dam = dogs[litterC.damId];

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <AppHeader />

      {/* Hero */}
      <section className="bg-bg-card border-b border-n-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-5">
          <div className="flex items-baseline justify-between flex-wrap gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
                Aktivt kull · uke {litterC.weekOfAge}
              </div>
              <h1 className="m-0 text-[28px] md:text-[36px] font-semibold tracking-[-0.02em] text-n-950 leading-tight">
                {litterC.callName}
                {litterC.poetic && (
                  <span className="block text-base font-normal italic text-n-500 mt-1">
                    «{litterC.poetic}»
                  </span>
                )}
              </h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <ParentChip
                role="Far"
                name={sire?.callName ?? sire?.name ?? "—"}
                tone="sire"
              />
              <span aria-hidden className="text-n-300 text-xl">
                ×
              </span>
              <ParentChip
                role="Mor"
                name={dam?.callName ?? dam?.name ?? "—"}
                tone="dam"
              />
            </div>
          </div>

          {/* Stat row */}
          <ul className="m-0 p-0 list-none grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Valper totalt" value={litterC.count.total} />
            <Stat
              label="Hanner / Tisper"
              value={`${litterC.count.males} / ${litterC.count.females}`}
            />
            <Stat
              label="Ledige"
              value={litterC.available}
              tone={litterC.available > 0 ? "positive" : undefined}
            />
            <Stat label="Søknader" value={litterC.applicationsTotal} />
          </ul>

          {/* Stage progress */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.06em] font-mono text-n-500 mb-2">
              Lifecycle
            </div>
            <StageProgress current={litterC.status} />
          </div>

          {/* Milestone dates */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Milestone label="Paret" value={litterC.mating} />
            <Milestone label="Valping" value={litterC.whelping} />
            <Milestone label="Levering" value={litterC.delivery} highlight />
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-8 min-w-0">
            {/* Puppies */}
            <section>
              <header className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
                  Valpene · {puppies.length}
                </h2>
                <span className="text-xs text-n-500">
                  Tap halsbåndsfargen for å redigere
                </span>
              </header>
              <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {puppies.map((p) => (
                  <li key={p.id}>
                    <PuppyCard puppy={p} />
                  </li>
                ))}
              </ul>
            </section>

            {/* Applications */}
            <ApplicationsInbox />
          </div>

          {/* Sidebar: daily log */}
          <aside>
            <header className="flex items-baseline justify-between mb-3 px-1">
              <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
                Dagbok
              </h2>
              <span className="text-[10px] text-n-500 font-mono">
                {dailyLog.length}
              </span>
            </header>
            <ul className="m-0 p-0 list-none flex flex-col gap-2">
              {dailyLog.map((entry) => (
                <li
                  key={entry.d}
                  className="bg-bg-card border border-n-200 rounded-card p-3"
                >
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-mono text-n-500">
                      {entry.d}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.06em] text-forest-700">
                      Uke {entry.week} · dag {entry.day}
                    </span>
                  </div>
                  <p className="m-0 text-sm text-n-700 leading-relaxed">
                    {entry.summary}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-4 bg-forest-50 border border-forest-100 rounded-card p-4">
              <div className="text-[10px] uppercase tracking-[0.08em] font-mono text-forest-700 mb-1">
                Hva nå?
              </div>
              <p className="m-0 text-sm text-n-950 leading-relaxed">
                Levering planlagt{" "}
                <span className="font-mono">{litterC.delivery}</span>. ENS dag
                5 og veiing kveld er dagens oppgaver.
              </p>
              <Button variant="ghost" size="sm" className="mt-3 px-0">
                Åpne ukens plan →
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <CameraFab
        actions={[
          { id: "photo", label: "Ta bilde av valpene", icon: "camera" },
          { id: "weight", label: "Logg veiing", icon: "scale" },
          { id: "note", label: "Skriv journal-notat", icon: "edit" },
          { id: "cert", label: "Skann helse-attest", icon: "doc" },
        ]}
      />
    </div>
  );
}

function ParentChip({
  role,
  name,
  tone,
}: {
  role: string;
  name: string;
  tone: "sire" | "dam";
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-bg-page border border-n-200 rounded-full pl-1 pr-3 py-1">
      <span
        className={
          "w-7 h-7 rounded-full grid place-items-center text-xs font-medium " +
          (tone === "sire"
            ? "bg-sire-bar text-white"
            : "bg-dam-bar text-white")
        }
        aria-hidden
      >
        {tone === "sire" ? "♂" : "♀"}
      </span>
      <span className="text-sm">
        <span className="text-[10px] uppercase tracking-[0.06em] font-mono text-n-500 mr-1.5">
          {role}
        </span>
        <span className="font-medium text-n-950">{name}</span>
      </span>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: "positive";
}) {
  return (
    <li className="bg-bg-page border border-n-100 rounded-card p-3">
      <div className="text-[10px] uppercase tracking-[0.06em] font-mono text-n-500">
        {label}
      </div>
      <div
        className={
          "text-2xl font-semibold tracking-[-0.02em] mt-0.5 " +
          (tone === "positive" ? "text-success-fg" : "text-n-950")
        }
      >
        {value}
      </div>
    </li>
  );
}

function Milestone({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col gap-0.5 px-2 " +
        (highlight ? "border-l-2 border-forest-700" : "border-l border-n-100")
      }
    >
      <Tag variant={highlight ? "forest" : "neutral"}>{label}</Tag>
      <span className="font-mono text-n-950 mt-1">{value}</span>
    </div>
  );
}
