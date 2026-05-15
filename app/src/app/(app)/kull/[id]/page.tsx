import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { dogs as dogsTable } from "@/db/schema";
import { getLitter, listApplications } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { ToastProvider } from "@/components/dogworld/ToastProvider";
import { CameraFab } from "@/components/dog-detail/CameraFab";
import { Tag } from "@/components/dogworld/Tag";
import { Button } from "@/components/ui/Button";
import { PuppyCard } from "@/components/litter/PuppyCard";
import { StageProgress } from "@/components/litter/StageProgress";
import { ApplicationsInbox } from "@/components/litter/ApplicationsInbox";
import { dailyLog } from "@/components/litter/litterExtras";
import type { Puppy } from "@/data/universe";

/**
 * Litter Detail — Sprint 14b. Reads from db so the page works for any
 * /kull/[id] in the universe; falls back to 404 if the id is unknown.
 */
export default async function KullDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const litter = await getLitter(id);
  if (!litter) notFound();

  const db = await getDb();
  const sire = await db
    .select()
    .from(dogsTable)
    .where(eq(dogsTable.id, litter.sireId))
    .get();
  const dam = await db
    .select()
    .from(dogsTable)
    .where(eq(dogsTable.id, litter.damId))
    .get();
  const apps = await listApplications(litter.id);

  // Cast db puppy rows to the Puppy type the existing PuppyCard expects.
  const puppies = litter.puppies as unknown as Puppy[];

  return (
    <ToastProvider>
      <div className="flex-1 flex flex-col bg-bg-page">
        <AppHeader />

        {/* Hero */}
        <section className="bg-bg-card border-b border-n-100">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-5">
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2 inline-flex items-center gap-2">
                  <Link href="/kull" className="hover:text-forest-900">
                    Alle kull
                  </Link>
                  <span aria-hidden>›</span>
                  <span>Uke {litter.weekOfAge}</span>
                </div>
                <h1 className="m-0 text-[28px] md:text-[36px] font-semibold tracking-[-0.02em] text-n-950 leading-tight">
                  {litter.callName}
                  {litter.poetic && (
                    <span className="block text-base font-normal italic text-n-500 mt-1">
                      «{litter.poetic}»
                    </span>
                  )}
                </h1>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <ParentChip
                  role="Far"
                  name={sire?.callName ?? sire?.name ?? "—"}
                  href={sire ? `/dog/${sire.id}` : undefined}
                  tone="sire"
                />
                <span aria-hidden className="text-n-300 text-xl">
                  ×
                </span>
                <ParentChip
                  role="Mor"
                  name={dam?.callName ?? dam?.name ?? "—"}
                  href={dam ? `/dog/${dam.id}` : undefined}
                  tone="dam"
                />
              </div>
            </div>

            <ul className="m-0 p-0 list-none grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Valper totalt" value={litter.total} />
              <Stat
                label="Hanner / Tisper"
                value={`${litter.males} / ${litter.females}`}
              />
              <Stat
                label="Ledige"
                value={litter.available}
                tone={litter.available > 0 ? "positive" : undefined}
              />
              <Stat label="Søknader" value={apps.length} />
            </ul>

            <div>
              <div className="text-[10px] uppercase tracking-[0.06em] font-mono text-n-500 mb-2">
                Lifecycle
              </div>
              <StageProgress current={litter.status} />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <Milestone label="Paret" value={litter.matingDate} />
              <Milestone label="Valping" value={litter.whelpingDate} />
              <Milestone label="Levering" value={litter.deliveryDate} highlight />
            </div>
          </div>
        </section>

        <main className="flex-1">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-8 min-w-0">
              <section>
                <header className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                  <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
                    Valpene · {puppies.length}
                  </h2>
                  <span className="text-xs text-n-500">
                    Tap halsbåndsfargen for å redigere
                  </span>
                </header>
                {puppies.length > 0 ? (
                  <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {puppies.map((p) => (
                      <li key={p.id}>
                        <PuppyCard puppy={p} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="border border-dashed border-n-300 rounded-card p-8 text-center text-sm text-n-500 italic">
                    Ingen valper født ennå. Når kullet er født legger du dem
                    inn med kamera-FABen nederst.
                  </div>
                )}
              </section>

              <ApplicationsInbox />
            </div>

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
                  <span className="font-mono">{litter.deliveryDate}</span>.
                </p>
                <Button variant="ghost" size="sm" className="mt-3 px-0">
                  Åpne ukens plan →
                </Button>
              </div>
            </aside>
          </div>
        </main>

        <CameraFab
          subject={litter.callName}
          actions={[
            { id: "photo", label: "Ta bilde av valpene", icon: "camera" },
            { id: "weight", label: "Logg veiing", icon: "scale" },
            { id: "note", label: "Skriv journal-notat", icon: "edit" },
            { id: "cert", label: "Skann helse-attest", icon: "doc" },
          ]}
        />
      </div>
    </ToastProvider>
  );
}

function ParentChip({
  role,
  name,
  href,
  tone,
}: {
  role: string;
  name: string;
  href?: string;
  tone: "sire" | "dam";
}) {
  const body = (
    <>
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
    </>
  );
  const cls =
    "inline-flex items-center gap-2 bg-bg-page border border-n-200 rounded-full pl-1 pr-3 py-1 transition-colors";
  if (href) {
    return (
      <Link href={href} className={cls + " hover:border-forest-500"}>
        {body}
      </Link>
    );
  }
  return <div className={cls}>{body}</div>;
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
