"use client";

import Link from "next/link";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { TitleBadge, Tag } from "@/components/dogworld/Tag";
import { Button } from "@/components/ui/Button";
import { ToastProvider, useToast } from "@/components/dogworld/ToastProvider";
import { AppHeader } from "@/components/shell/AppHeader";
import {
  granheimPublic,
  kennelNavItems,
  type PublicDog,
  type ResultRow,
} from "@/components/kennel/kennelData";

/**
 * Public Kennel page — Sprint 6.
 *
 * Front-stage view of a kennel for prospective puppy buyers, judges, and
 * other breeders. Distinct visual feel from the back-office (warmer,
 * editorial, less data-dense). Granheim "show" template for v0.1; the
 * "commercial" template (Lyngheia) ships in a later sprint.
 */
export default function KennelPage() {
  return (
    <ToastProvider>
      <KennelInner />
    </ToastProvider>
  );
}

function KennelInner() {
  const k = granheimPublic;

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <AppHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-50 to-bg-page border-b border-n-100">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-3">
            {k.location} · siden {k.since}
          </div>
          <h1 className="m-0 text-[40px] md:text-[56px] font-semibold tracking-[-0.025em] text-n-950 leading-[1.05]">
            {k.name}
          </h1>
          <p className="m-0 mt-4 text-lg text-n-700 max-w-[60ch] leading-relaxed">
            {k.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Tag variant="success" dot>
              {k.karmaTier}-tier · etikk-bekreftet
            </Tag>
            <Tag variant="neutral">{k.breed}</Tag>
            <Tag variant="neutral">{k.nkkReg}</Tag>
            {k.affiliations.map((a) => (
              <Tag key={a} variant="neutral">
                {a}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky in-page nav */}
      <nav
        aria-label="Seksjons-nav"
        className="bg-bg-card border-b border-n-100 sticky top-0 z-20 [box-shadow:0_1px_2px_rgba(26,26,26,0.04)]"
      >
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto">
          {kennelNavItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-n-700 hover:text-n-950 hover:bg-n-50 rounded-md px-3 py-2.5 whitespace-nowrap transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10 flex flex-col gap-16">
          {/* Om oss */}
          <Section id="om" eyebrow="Om oss" title={`${k.owners} · ${k.location}`}>
            <p className="text-base text-n-700 leading-relaxed max-w-[70ch]">
              {k.about}
            </p>
            <h3 className="text-sm uppercase tracking-[0.06em] font-medium text-n-500 mt-8 mb-3">
              Avlsfilosofi
            </h3>
            <p className="text-base text-n-700 leading-relaxed max-w-[70ch]">
              {k.philosophy}
            </p>
          </Section>

          {/* Hundene våre */}
          <Section
            id="hunder"
            eyebrow="Hundene våre"
            title="Aktive avlsdyr og veteraner"
          >
            <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-4">
              {k.dogs.map((d) => (
                <li key={d.id}>
                  <PublicDogCard dog={d} />
                </li>
              ))}
            </ul>
          </Section>

          {/* Aktivt kull */}
          <Section
            id="valper"
            eyebrow="Aktivt kull"
            title={k.litter.name}
            anchorRight={
              <Tag variant="success" dot>
                {k.litter.available} ledig av {k.litter.total}
              </Tag>
            }
          >
            <CurrentLitterCard />
          </Section>

          {/* Resultater */}
          <Section
            id="resultater"
            eyebrow="Resultater"
            title="Utstillinger og helse — siste 12 mnd"
          >
            <ResultsList rows={k.results} />
          </Section>

          {/* Minneside */}
          <Section
            id="minne"
            eyebrow="Minneside"
            title="Hunder vi har hatt — som lever videre i linjen"
          >
            <MemorialsList />
          </Section>

          {/* Kontakt */}
          <Section
            id="kontakt"
            eyebrow="Kontakt"
            title="Snakk med oss om en valp eller en parring"
          >
            <ContactBlock />
          </Section>
        </div>
      </main>

      <footer className="border-t border-n-100 bg-bg-card">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 text-xs text-n-500 flex items-center justify-between flex-wrap gap-2">
          <span>
            © {k.name} · {k.since}–{new Date().getFullYear()}
          </span>
          <span className="font-mono">
            Drevet av <span className="text-forest-700">DogWorld(tmp)</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────

function Section({
  id,
  eyebrow,
  title,
  anchorRight,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  anchorRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <header className="mb-5 flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
            {eyebrow}
          </div>
          <h2 className="m-0 text-2xl md:text-[28px] font-semibold tracking-[-0.015em] text-n-950">
            {title}
          </h2>
        </div>
        {anchorRight}
      </header>
      {children}
    </section>
  );
}

// ── Public dog card ─────────────────────────────────────────────────────────

function PublicDogCard({ dog }: { dog: PublicDog }) {
  return (
    <Link
      href={`/dog/${dog.id}`}
      className="group flex gap-4 bg-bg-card border border-n-200 rounded-card overflow-hidden hover:border-n-300 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-all"
    >
      <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
        <DogPhoto
          tone={dog.tone}
          label={dog.name.split(" ")[0].toUpperCase()}
          className="w-full h-full !rounded-none"
          aspect="1 / 1"
        />
      </div>
      <div className="flex-1 min-w-0 p-3 pl-0 flex flex-col gap-1">
        <div className="flex flex-wrap gap-1">
          {dog.titles.map((t) => (
            <TitleBadge key={t}>{t}</TitleBadge>
          ))}
        </div>
        <div className="text-base font-semibold tracking-[-0.005em] text-n-950 leading-snug truncate">
          {dog.name}
        </div>
        <div className="text-xs text-n-700 font-mono">
          {dog.sex === "m" ? "♂ Hann" : "♀ Tispe"} · f. {dog.born.split(" ").slice(-1)[0]}
        </div>
        <div className="text-xs text-n-500 font-mono mt-auto">{dog.health}</div>
        <div className="text-[11px] text-forest-700 inline-flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
          {dog.note} <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

// ── Current litter ──────────────────────────────────────────────────────────

function CurrentLitterCard() {
  const showToast = useToast();
  const k = granheimPublic;
  return (
    <div className="bg-bg-card border border-n-200 rounded-card overflow-hidden grid md:grid-cols-[280px_1fr]">
      <div className="aspect-video md:aspect-auto md:h-full">
        <DogPhoto
          tone="elkhound"
          label="KULL C · 4 UKER"
          className="w-full h-full !rounded-none"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div>
          <div className="text-xs font-mono text-n-500 uppercase tracking-[0.06em]">
            {k.litter.parents} · født {k.litter.born}
          </div>
          <h3 className="m-0 mt-1 text-xl font-semibold tracking-[-0.01em] text-n-950">
            {k.litter.name}
          </h3>
        </div>
        <p className="m-0 text-sm text-n-700 leading-relaxed max-w-[55ch]">
          5 valper født friske 14. april. ENS-program kjører nå (uke 4 av 8).
          Søknadsskjema åpner ved 5 ukers alder.
        </p>
        <ul className="m-0 p-0 list-none grid grid-cols-3 gap-3 max-w-[420px]">
          <Stat label="Alder" value={k.litter.age} />
          <Stat label="Hanner" value="3" />
          <Stat label="Tisper" value="2" />
        </ul>
        <div className="flex gap-2 flex-wrap mt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast("→ Søknadsskjema åpner ved 5 uker", "info")}
          >
            Se valpene
          </Button>
          <Link href="/kull">
            <Button variant="secondary" size="sm">
              Følg kullets dagbok
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className="bg-bg-page border border-n-100 rounded-card p-3">
      <div className="text-[10px] uppercase tracking-[0.06em] font-mono text-n-500">
        {label}
      </div>
      <div className="text-lg font-semibold tracking-[-0.01em] text-n-950 mt-0.5">
        {value}
      </div>
    </li>
  );
}

// ── Results list ────────────────────────────────────────────────────────────

const kindAccent: Record<ResultRow["kind"], string> = {
  show: "bg-forest-700",
  title: "bg-ochre-600",
  health: "bg-success-fg",
};

function ResultsList({ rows }: { rows: ResultRow[] }) {
  return (
    <ul className="m-0 p-0 list-none bg-bg-card border border-n-200 rounded-card divide-y divide-n-100 overflow-hidden">
      {rows.map((r, i) => (
        <li key={`${r.d}-${i}`} className="px-4 py-3 flex items-start gap-3">
          <span
            className={
              "mt-1.5 w-2 h-2 rounded-full flex-shrink-0 " + kindAccent[r.kind]
            }
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-n-950">{r.text}</div>
            {r.judge && (
              <div className="text-xs text-n-500 mt-0.5">Dommer: {r.judge}</div>
            )}
          </div>
          <span className="text-xs text-n-500 font-mono flex-shrink-0">
            {r.d}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── Memorials ───────────────────────────────────────────────────────────────

function MemorialsList() {
  const showToast = useToast();
  const k = granheimPublic;
  return (
    <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-3 gap-3">
      {k.memorials.map((m) => (
        <li key={m.id}>
          <button
            type="button"
            onClick={() => showToast(`→ Minneside for ${m.name}`, "info")}
            className="w-full text-left bg-bg-card border border-n-200 rounded-card p-4 hover:border-n-300 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-all"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-info-fg mb-1.5">
              ✱ Over regnbuebroen
            </div>
            <div className="text-base font-semibold text-n-950 leading-snug">
              {m.name}
            </div>
            <div className="text-xs text-n-700 font-mono mt-0.5">
              {m.years}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────

function ContactBlock() {
  const k = granheimPublic;
  return (
    <div className="bg-bg-card border border-n-200 rounded-card p-5 grid md:grid-cols-3 gap-6">
      <ContactRow label="E-post" value={k.contact.email} href={`mailto:${k.contact.email}`} />
      <ContactRow label="Telefon" value={k.contact.phone} href={`tel:${k.contact.phone.replace(/\s/g, "")}`} />
      <ContactRow label="Postadresse" value={k.contact.postal} />
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = href ? "a" : "span";
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.08em] font-mono text-n-500 mb-1">
        {label}
      </div>
      <Inner
        href={href}
        className={
          "text-sm text-n-950 " +
          (href ? "hover:text-forest-700 transition-colors" : "")
        }
      >
        {value}
      </Inner>
    </div>
  );
}
