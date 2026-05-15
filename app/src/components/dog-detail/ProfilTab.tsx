"use client";

import type { ReactNode } from "react";
import type { Dog } from "@/data/universe";
import { dogs, granheim } from "@/data/universe";
import { InlineField } from "@/components/dogworld/InlineField";
import { useToast } from "@/components/dogworld/ToastProvider";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { Toggle } from "@/components/ui/Choice";

export type ProfilTabProps = {
  dog: Dog;
  publicVisible: boolean;
  sharedToGenealogy: boolean;
  onUpdate: (patch: Partial<Dog>) => void;
  onPublicToggle: () => void;
  onSharedToggle: () => void;
  onStatusClick: () => void;
};

export function ProfilTab({
  dog,
  publicVisible,
  sharedToGenealogy,
  onUpdate,
  onPublicToggle,
  onSharedToggle,
  onStatusClick,
}: ProfilTabProps) {
  const showToast = useToast();

  function save<K extends keyof Dog>(key: K, value: Dog[K], label?: string) {
    onUpdate({ [key]: value } as Partial<Dog>);
    showToast(label ? `${label} lagret` : "Lagret");
  }

  const sire = dog.sireId ? dogs[dog.sireId] : null;
  const dam = dog.damId ? dogs[dog.damId] : null;

  return (
    <div className="flex flex-col gap-8">
      {/* ── Grunnleggende ───────────────────────────────────────────────── */}
      <ProfilSection title="Grunnleggende">
        <FieldRow label="Registrert navn">
          <InlineField
            ariaLabel="Registrert navn"
            value={dog.name}
            onSave={(v) => save("name", v, "Navn")}
            size="md"
          />
        </FieldRow>
        <FieldRow label="Kallenavn">
          <InlineField
            ariaLabel="Kallenavn"
            value={dog.callName ?? ""}
            placeholder="Legg til kallenavn"
            onSave={(v) =>
              save("callName", v.trim() ? v.trim() : undefined, "Kallenavn")
            }
          />
        </FieldRow>
        <FieldRow label="Sex">
          <InlineField
            ariaLabel="Sex"
            value={dog.sex === "f" ? "Tispe" : "Hann"}
            readOnly
          />
        </FieldRow>
        <FieldRow label="Fødselsdato">
          <InlineField
            ariaLabel="Fødselsdato"
            value={formatDate(dog.born)}
            mono
            onSave={(v) => save("born", parseDate(v) ?? dog.born, "Fødselsdato")}
          />
        </FieldRow>
        <FieldRow label="Farge">
          <InlineField
            ariaLabel="Farge"
            value={dog.color ?? ""}
            placeholder="Legg til farge"
            onSave={(v) =>
              save("color", v.trim() ? v.trim() : undefined, "Farge")
            }
          />
        </FieldRow>
        <FieldRow label="Mikrochip">
          <InlineField
            ariaLabel="Mikrochip-nummer"
            value={dog.microchip ?? ""}
            placeholder="Legg til 15-sifret mikrochip"
            mono
            onSave={(v) =>
              save("microchip", v.trim() ? v.trim() : undefined, "Mikrochip")
            }
          />
        </FieldRow>
        <FieldRow label="Tatovering">
          <InlineField
            ariaLabel="Tatovering-ID"
            value=""
            placeholder="Ikke registrert"
            mono
            onSave={() => save("name", dog.name)}
          />
        </FieldRow>
      </ProfilSection>

      {/* ── Foreldre ─────────────────────────────────────────────────────── */}
      <ProfilSection title="Foreldre">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sire ? (
            <ParentCard
              label="Far"
              titles={sire.titles.join(" ")}
              name={sire.name}
              meta="HD: A · ED: 0 · DM: clear"
              tone="sire"
            />
          ) : (
            <UnknownParentCard label="Far" />
          )}
          {dam ? (
            <ParentCard
              label="Mor"
              titles={dam.titles.join(" ")}
              name={dam.name}
              meta={dam.country === "DE" ? "Importert · VDH-CH" : "HD: A · DM: clear"}
              tone="dam"
            />
          ) : (
            <UnknownParentCard label="Mor" />
          )}
        </div>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 transition-colors"
          onClick={() => showToast("Stamtavle-utforskeren kommer i Sprint 4")}
        >
          Se hele stamtavlen →
        </button>
      </ProfilSection>

      {/* ── Oppdretter og eier ──────────────────────────────────────────── */}
      <ProfilSection title="Oppdretter og eier">
        <FieldRow label="Oppdretter">
          <InlineField
            ariaLabel="Oppdretter"
            value={dog.breeder}
            readOnly
          />
        </FieldRow>
        <FieldRow label="Nåværende eier">
          <InlineField ariaLabel="Eier" value={granheim.name} readOnly />
        </FieldRow>
        <FieldRow label="Microchippet">
          <InlineField
            ariaLabel="Microchip-detaljer"
            value="Veterinær Solveig Lien · 28. mai 2022"
            mono
            readOnly
          />
        </FieldRow>
      </ProfilSection>

      {/* ── Personlighet ─────────────────────────────────────────────────── */}
      <ProfilSection title="Personlighet">
        <InlineField
          ariaLabel="Personlighets-beskrivelse"
          value={dog.personality ?? ""}
          placeholder="Skriv noen ord om personligheten — det sees av kjøperne dine."
          multiline
          onSave={(v) =>
            save("personality", v.trim() ? v : undefined, "Personlighet")
          }
        />
      </ProfilSection>

      {/* ── Status og synlighet ─────────────────────────────────────────── */}
      <ProfilSection title="Status og synlighet">
        <ToggleRow
          label="Status"
          hint={statusHint(dog.status)}
          control={
            <button
              type="button"
              onClick={onStatusClick}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-bg text-success-fg hover:opacity-80 transition-opacity"
            >
              {statusLabel(dog.status)} ▾
            </button>
          }
        />
        <ToggleRow
          label="Offentlig profil"
          hint="Vis hele profilen på kennelens nettside."
          control={
            <Toggle
              state={publicVisible ? "on" : "off"}
              onChange={onPublicToggle}
            />
          }
        />
        <ToggleRow
          label="Inkludert i delt genealogi"
          hint="Andre oppdrettere kan finne hunden i søk og test-parringer. Stamtavlefakta deles, aldri kontakt eller helse-historikk."
          control={
            <Toggle
              state={sharedToGenealogy ? "on" : "off"}
              onChange={onSharedToggle}
            />
          }
        />
      </ProfilSection>
    </div>
  );
}

// ── Layout helpers (page-local — keeps ProfilTab self-contained) ──────────
function ProfilSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3">
        {title}
      </h2>
      <div className="bg-bg-card border border-n-200 rounded-card divide-y divide-n-100">
        {children}
      </div>
    </section>
  );
}

function FieldRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4 px-4 py-3 items-baseline">
      <div className="text-xs uppercase tracking-[0.06em] text-n-500 font-medium sm:pt-0.5">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  control,
}: {
  label: string;
  hint?: string;
  control: ReactNode;
}) {
  return (
    <div className="px-4 py-3 flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-n-950">{label}</div>
        {hint && <div className="text-xs text-n-500 mt-0.5">{hint}</div>}
      </div>
      <div className="flex-shrink-0 pt-0.5">{control}</div>
    </div>
  );
}

function ParentCard({
  label,
  titles,
  name,
  meta,
  tone,
}: {
  label: string;
  titles: string;
  name: string;
  meta: string;
  tone: "sire" | "dam";
}) {
  return (
    <div className="flex items-center gap-3 p-3 border border-n-200 rounded-card bg-bg-card">
      <DogPhoto
        tone={tone}
        rounded="full"
        label="DOG"
        className="w-12 h-12 flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-[0.06em] text-n-500 font-medium">
          {label}
        </div>
        {titles && (
          <div className="font-mono text-[10px] text-ochre-700 tracking-[0.05em]">
            {titles}
          </div>
        )}
        <div className="text-sm font-semibold tracking-[-0.005em] truncate">
          {name}
        </div>
        <div className="text-xs text-n-500 mt-0.5">{meta}</div>
      </div>
    </div>
  );
}

function UnknownParentCard({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 p-3 border border-dashed border-n-300 rounded-card bg-bg-card text-n-500">
      <div className="w-12 h-12 rounded-full border border-dashed border-n-300 grid place-items-center text-xs font-mono uppercase">
        ?
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-[0.06em] text-n-500 font-medium">
          {label}
        </div>
        <div className="text-sm">Ikke registrert</div>
        <div className="text-xs mt-0.5">Skann en stamtavle for å fylle inn</div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseDate(input: string): string | null {
  // Accept "14. mars 2022" or ISO; fall back to original on parse failure
  const direct = new Date(input);
  if (!isNaN(direct.getTime())) return direct.toISOString().slice(0, 10);
  return null;
}

function statusLabel(s: Dog["status"]): string {
  return {
    active: "Aktiv",
    retired: "Pensjonert",
    sold: "Solgt",
    memorial: "Over regnbuebroen",
  }[s];
}

function statusHint(s: Dog["status"]): string {
  return {
    active: "I avl, vises i kennelens stamme.",
    retired: "Ikke lenger i avl, men beholdes i historien.",
    sold: "Solgt til ny eier — vises som alumni.",
    memorial: "Lever i minnesiden. Bilder og titler bevares.",
  }[s];
}
