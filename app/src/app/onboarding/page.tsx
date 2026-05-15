"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/dogworld/Tag";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { ToastProvider, useToast } from "@/components/dogworld/ToastProvider";
import {
  crawlSteps,
  extractedDogs,
  templates,
  breedSuggestions,
  type ExtractedDog,
  type Template,
  type Confidence,
} from "@/components/onboarding/onboardingData";

/**
 * Onboarding & Migration — Sprint 8.
 *
 * Marit's first 10 minutes. Seven steps that take her from "Velkommen"
 * to a published kennel page on a granheim.dogworld.app subdomain.
 * The wedge moment is step 4 — paste your old website URL, watch the
 * crawler discover 12 dogs and 47 photos, then confirm them in step 5.
 *
 * Hardcoded fixtures stand in for the actual crawler + AI extraction.
 */
export default function OnboardingPage() {
  return (
    <ToastProvider>
      <OnboardingFlow />
    </ToastProvider>
  );
}

type StepId =
  | "welcome"
  | "basics"
  | "migrate"
  | "crawl"
  | "review"
  | "template"
  | "published";

const stepOrder: StepId[] = [
  "welcome",
  "basics",
  "migrate",
  "crawl",
  "review",
  "template",
  "published",
];

const stepLabel: Record<StepId, string> = {
  welcome: "Velkommen",
  basics: "Om kennelen",
  migrate: "Migrasjon",
  crawl: "Henter data",
  review: "Bekreft hunder",
  template: "Velg mal",
  published: "Publisert",
};

function OnboardingFlow() {
  const [step, setStep] = useState<StepId>("welcome");
  const idx = stepOrder.indexOf(step);

  function next() {
    if (idx < stepOrder.length - 1) setStep(stepOrder[idx + 1]);
  }
  function back() {
    if (idx > 0) setStep(stepOrder[idx - 1]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-page">
      <header className="bg-bg-card border-b border-n-100 sticky top-0 z-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm text-n-500 hover:text-n-700 inline-flex items-center gap-1 flex-shrink-0"
          >
            ← Avbryt
          </Link>
          <div className="flex-1 min-w-0 text-center">
            <span className="text-[10px] uppercase tracking-[0.12em] font-mono text-n-500">
              Steg {idx + 1} av {stepOrder.length} ·{" "}
              <span className="text-n-950">{stepLabel[step]}</span>
            </span>
          </div>
          <span className="text-xs text-n-500 font-mono flex-shrink-0">
            DogWorld(tmp)
          </span>
        </div>

        {/* Progress bar */}
        <div className="bg-n-100 h-1">
          <div
            className="h-full bg-forest-700 transition-all duration-300"
            style={{ width: `${((idx + 1) / stepOrder.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 py-8">
        <div className="max-w-[760px] mx-auto">
          {step === "welcome" && <WelcomeStep onNext={next} />}
          {step === "basics" && <BasicsStep onNext={next} onBack={back} />}
          {step === "migrate" && <MigrateStep onNext={next} onBack={back} />}
          {step === "crawl" && <CrawlStep onNext={next} />}
          {step === "review" && <ReviewStep onNext={next} onBack={back} />}
          {step === "template" && (
            <TemplateStep onNext={next} onBack={back} />
          )}
          {step === "published" && <PublishedStep />}
        </div>
      </main>
    </div>
  );
}

// ── Step 1: Welcome ────────────────────────────────────────────────────────

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <section className="text-center pt-8">
      <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-4">
        Velkommen til DogWorld(tmp)
      </div>
      <h1 className="m-0 text-[40px] md:text-[48px] font-semibold tracking-[-0.025em] text-n-950 leading-[1.05]">
        Hei Marit. La oss få Granheim på lufta.
      </h1>
      <p className="m-0 mt-5 text-lg text-n-700 max-w-[52ch] mx-auto leading-relaxed">
        Vi bruker omtrent 10 minutter på å sette opp kennelen din. Du kan
        importere fra eksisterende nettside, eller starte tomt — du
        bestemmer.
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left">
        <Bullet n="1" t="Fortell oss om kennelen" />
        <Bullet n="2" t="Importer eller start tomt" />
        <Bullet n="3" t="Velg utseende og publiser" />
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="primary" size="lg" onClick={onNext}>
          Sett i gang →
        </Button>
      </div>
      <p className="mt-4 text-xs text-n-500">
        Du kan endre alt senere. Ingenting publiseres før du sier fra.
      </p>
    </section>
  );
}

function Bullet({ n, t }: { n: string; t: string }) {
  return (
    <div className="bg-bg-card border border-n-200 rounded-card p-4">
      <div className="w-8 h-8 rounded-full bg-forest-50 text-forest-700 grid place-items-center font-mono text-sm font-semibold mb-2">
        {n}
      </div>
      <div className="text-sm font-medium text-n-950">{t}</div>
    </div>
  );
}

// ── Step 2: Basics ─────────────────────────────────────────────────────────

function BasicsStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("Kennel Granheim");
  const [prefix, setPrefix] = useState("av Granheim");
  const [breed, setBreed] = useState("Norsk Elghund");
  const [breedQuery, setBreedQuery] = useState("");

  const filteredBreeds = breedQuery
    ? breedSuggestions.filter((b) =>
        b.toLowerCase().includes(breedQuery.toLowerCase()),
      )
    : [];

  return (
    <StepShell
      title="Om kennelen din"
      sub="Bare det vi trenger for å lage profilen — du kan utvide senere."
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!name.trim() || !prefix.trim()}
    >
      <Field label="Kennel-navn">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-base text-n-950 focus:outline-none focus:border-forest-500"
        />
      </Field>
      <Field
        label="FCI-affix"
        hint="Et eget kennel-navn som skal komme før eller etter alle hunder født hos deg. Maks 12 tegn."
      >
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          maxLength={20}
          className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-base text-n-950 font-mono focus:outline-none focus:border-forest-500"
        />
        <div className="text-xs text-n-500 mt-1.5 font-mono">
          Forhåndsvisning: «Astor {prefix}»
        </div>
      </Field>
      <Field label="Hovedrase">
        <div className="relative">
          <input
            type="text"
            value={breedQuery || breed}
            onChange={(e) => setBreedQuery(e.target.value)}
            placeholder="Begynn å skrive…"
            className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-base text-n-950 focus:outline-none focus:border-forest-500"
          />
          {filteredBreeds.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 mt-1 bg-bg-card border border-n-200 rounded-card shadow-[0_4px_12px_rgba(26,26,26,0.08)] max-h-60 overflow-y-auto m-0 p-0 list-none">
              {filteredBreeds.slice(0, 6).map((b) => (
                <li key={b}>
                  <button
                    type="button"
                    onClick={() => {
                      setBreed(b);
                      setBreedQuery("");
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-n-50"
                  >
                    {b}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Field>
    </StepShell>
  );
}

// ── Step 3: Migrate ────────────────────────────────────────────────────────

function MigrateStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [url, setUrl] = useState("kennel-granheim.no");

  return (
    <StepShell
      title="Har du en eksisterende kennelside?"
      sub="Lim inn URL-en, så henter vi hundene, bildene og resultatene dine. Du kan også hoppe over og fylle inn manuelt."
      onNext={onNext}
      onBack={onBack}
      nextLabel="Hent fra denne URL-en →"
      nextDisabled={!url.trim()}
      ghost={
        <button
          type="button"
          onClick={onNext}
          className="text-sm text-n-700 hover:text-n-950 underline"
        >
          Hopp over — jeg starter tomt
        </button>
      }
    >
      <div className="bg-warm-600/10 border border-warm-600/20 rounded-card p-4 flex items-start gap-3">
        <span
          className="w-8 h-8 rounded-md bg-bg-card text-warm-600 grid place-items-center flex-shrink-0"
          aria-hidden
        >
          ✱
        </span>
        <div>
          <div className="text-sm font-medium text-n-950">
            Vi støtter de fleste kjente plattformer
          </div>
          <p className="m-0 text-sm text-n-700 mt-1 leading-relaxed">
            Wix, Squarespace, WordPress, Shopify, Webnode, og rene HTML-sider.
            Innholdet ditt forblir ditt — vi bruker det kun til å fylle inn
            hundene dine raskere.
          </p>
        </div>
      </div>

      <Field label="URL til eksisterende side">
        <div className="flex">
          <span className="inline-flex items-center bg-n-50 border border-n-300 border-r-0 rounded-l-btn px-3 text-sm font-mono text-n-500">
            https://
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="dinkennel.no"
            className="flex-1 bg-bg-card border border-n-300 rounded-r-btn px-3 py-2.5 text-base font-mono text-n-950 focus:outline-none focus:border-forest-500"
          />
        </div>
      </Field>
    </StepShell>
  );
}

// ── Step 4: Crawl ──────────────────────────────────────────────────────────

function CrawlStep({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers = crawlSteps.map((_, i) =>
      setTimeout(() => setRevealed((v) => Math.max(v, i + 1)), crawlSteps[i].t),
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const allDone = revealed >= crawlSteps.length;

  return (
    <section>
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-3">
          {!allDone && <Spinner />}
          {allDone ? "Ferdig" : "Henter data"}
        </div>
        <h2 className="m-0 text-2xl font-semibold tracking-[-0.015em] text-n-950">
          {allDone
            ? "Klar! Vi fant alt vi trenger."
            : "Vi leser kennel-granheim.no …"}
        </h2>
        <p className="m-0 mt-2 text-sm text-n-700">
          Vi crawler bare offentlige sider og lagrer ingenting før du
          bekrefter.
        </p>
      </header>

      <ul className="m-0 p-0 list-none flex flex-col gap-2">
        {crawlSteps.map((s, i) => {
          const visible = i < revealed;
          const isLatest = i === revealed - 1 && !allDone;
          return (
            <li
              key={i}
              className={
                "bg-bg-card border rounded-card px-4 py-2.5 flex items-center gap-3 transition-all duration-300 " +
                (visible
                  ? "border-n-200 opacity-100 translate-y-0"
                  : "border-n-100 opacity-0 translate-y-2")
              }
            >
              <span
                className={
                  "w-7 h-7 rounded-md grid place-items-center flex-shrink-0 " +
                  (s.icon === "check"
                    ? "bg-forest-700 text-white"
                    : isLatest
                      ? "bg-warm-600/15 text-warm-600"
                      : "bg-forest-50 text-forest-700")
                }
                aria-hidden
              >
                <CrawlIconGlyph name={s.icon} />
              </span>
              <span className="text-sm text-n-950 flex-1 min-w-0">
                {s.text}
              </span>
              <span className="text-[11px] font-mono text-n-500 flex-shrink-0 hidden sm:inline">
                {s.mono}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center">
        <Button
          variant="primary"
          size="lg"
          state={allDone ? "default" : "disabled"}
          onClick={onNext}
        >
          Gå til gjennomgang →
        </Button>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block w-3 h-3 rounded-full border-2 border-forest-700 border-r-transparent animate-spin"
    />
  );
}

function CrawlIconGlyph({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 14,
    height: 14,
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "link":
      return (
        <svg {...common}>
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20" />
          <line x1="9" y1="4" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="20" />
        </svg>
      );
    case "dog":
      return (
        <svg {...common}>
          <circle cx="6" cy="9" r="1.6" />
          <circle cx="18" cy="9" r="1.6" />
          <circle cx="10" cy="6" r="1.6" />
          <circle cx="14" cy="6" r="1.6" />
          <path d="M7 17c0-3 2-5 5-5s5 2 5 5-2 4-5 4-5-1-5-4z" />
        </svg>
      );
    case "photo":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2" />
          <path d="M21 16l-4-4-8 8" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h4" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="12" r="2" />
          <line x1="8" y1="6" x2="16" y2="11" />
          <line x1="8" y1="18" x2="16" y2="13" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <polyline points="4 12 10 18 20 6" />
        </svg>
      );
  }
}

// ── Step 5: Review ─────────────────────────────────────────────────────────

const confColor: Record<Confidence, string> = {
  high: "bg-success-bg text-success-fg",
  medium: "bg-warning-bg text-warning-fg",
  low: "bg-error-bg text-error-fg",
};

const confLabel: Record<Confidence, string> = {
  high: "Sikkert",
  medium: "Ganske sikkert",
  low: "Usikkert",
};

function ReviewStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const included = extractedDogs.filter((d) => !excluded.has(d.id));
  const lowCount = extractedDogs.filter(
    (d) => d.overall === "low" && !excluded.has(d.id),
  ).length;

  return (
    <StepShell
      title={`Vi fant ${extractedDogs.length} hunder`}
      sub="Gå gjennom dem her — fjern hunder vi misforsto, eller marker som «Bekreft senere» for hundene du vil sjekke nærmere."
      onNext={onNext}
      onBack={onBack}
      nextLabel={`Bekreft ${included.length} hunder →`}
      nextDisabled={included.length === 0}
    >
      {lowCount > 0 && (
        <div className="bg-warning-bg border border-warning-fg/20 rounded-card p-3 text-sm text-warning-fg flex items-start gap-2">
          <span aria-hidden>⚠</span>
          <span>
            {lowCount} hund{lowCount === 1 ? "" : "er"} har lav sikkerhet.
            Sjekk dem nøye før du bekrefter.
          </span>
        </div>
      )}

      <ul className="m-0 p-0 list-none flex flex-col gap-3">
        {extractedDogs.map((d) => (
          <ExtractedDogRow
            key={d.id}
            dog={d}
            excluded={excluded.has(d.id)}
            onToggle={() => {
              const next = new Set(excluded);
              if (next.has(d.id)) next.delete(d.id);
              else next.add(d.id);
              setExcluded(next);
            }}
          />
        ))}
      </ul>
    </StepShell>
  );
}

function ExtractedDogRow({
  dog,
  excluded,
  onToggle,
}: {
  dog: ExtractedDog;
  excluded: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      className={
        "bg-bg-card border rounded-card overflow-hidden flex gap-3 transition-all " +
        (excluded
          ? "border-n-100 opacity-50"
          : "border-n-200")
      }
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
        {dog.photo ? (
          <DogPhoto
            tone={dog.tone}
            label={dog.name.split(" ")[0].toUpperCase()}
            muted={dog.deceased}
            className="w-full h-full !rounded-none"
            aspect="1 / 1"
          />
        ) : (
          <div className="w-full h-full bg-n-50 grid place-items-center text-[10px] font-mono uppercase tracking-[0.05em] text-n-500 text-center px-1">
            Mangler foto
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 p-3 pl-0 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <div className="text-sm font-semibold text-n-950 truncate">
            {dog.name}
            {dog.deceased && (
              <span className="ml-2 text-[10px] font-mono text-info-fg">
                ✱ memorial
              </span>
            )}
          </div>
          <span
            className={
              "text-[10px] uppercase tracking-[0.06em] font-mono px-2 py-0.5 rounded-full " +
              confColor[dog.overall]
            }
          >
            {confLabel[dog.overall]}
          </span>
        </div>
        <div className="text-xs text-n-500 font-mono">
          {dog.sex === "m" ? "♂" : dog.sex === "f" ? "♀" : "?"}
          {dog.born && <> · {dog.born}</>}
          {dog.titles.length > 0 && (
            <span className="ml-2 text-ochre-700">
              {dog.titles.join(" ")}
            </span>
          )}
        </div>
        <ul className="m-0 p-0 mt-1 list-none flex flex-col gap-0.5">
          {dog.fields.slice(0, 3).map((f) => (
            <li
              key={f.k}
              className="flex items-baseline justify-between text-[11px]"
            >
              <span className="text-n-500">{f.k}</span>
              <span
                className={
                  "text-right text-n-950 " +
                  (f.conf === "low"
                    ? "italic underline decoration-warning-fg/60 decoration-2 underline-offset-4"
                    : "")
                }
                title={f.note}
              >
                {f.v}
              </span>
            </li>
          ))}
        </ul>
        {dog.note && (
          <div className="text-[11px] text-warning-fg italic mt-1 leading-snug">
            {dog.note}
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onToggle}
            className="text-xs text-n-500 hover:text-n-950 underline"
          >
            {excluded ? "Inkluder igjen" : "Fjern denne"}
          </button>
        </div>
      </div>
    </li>
  );
}

// ── Step 6: Template ───────────────────────────────────────────────────────

function TemplateStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [picked, setPicked] = useState<Template["id"]>("show");

  return (
    <StepShell
      title="Velg utseendet på den offentlige siden"
      sub="Du kan bytte mal når som helst — innholdet flyttes med deg."
      onNext={onNext}
      onBack={onBack}
      nextLabel="Publiser med denne malen →"
    >
      <ul className="m-0 p-0 list-none grid sm:grid-cols-2 gap-3">
        {templates.map((t) => {
          const active = picked === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setPicked(t.id)}
                aria-pressed={active}
                className={
                  "w-full text-left p-5 rounded-card border-2 transition-all " +
                  (active
                    ? "border-forest-700 bg-forest-50/30 [box-shadow:0_0_0_3px_rgba(63,90,85,0.10)]"
                    : "border-n-200 bg-bg-card hover:border-n-300")
                }
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-[10px] uppercase tracking-[0.06em] font-mono text-forest-700">
                    {t.id === "show" ? "Mal A" : "Mal B"}
                  </div>
                  {active && (
                    <span
                      className="w-5 h-5 rounded-full bg-forest-700 text-white grid place-items-center text-xs"
                      aria-hidden
                    >
                      ✓
                    </span>
                  )}
                </div>
                <h3 className="m-0 text-lg font-semibold tracking-[-0.005em] text-n-950">
                  {t.title}
                </h3>
                <p className="m-0 mt-1 text-sm text-n-700">{t.sub}</p>
                <div className="mt-3 text-xs text-n-500">{t.fits}</div>
                <div className="mt-3 flex gap-1.5 flex-wrap">
                  {t.accents.map((a) => (
                    <Tag key={a} variant="forest">
                      {a}
                    </Tag>
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </StepShell>
  );
}

// ── Step 7: Published ──────────────────────────────────────────────────────

function PublishedStep() {
  const showToast = useToast();
  return (
    <section className="text-center pt-6">
      <div className="w-16 h-16 rounded-full bg-success-bg text-success-fg grid place-items-center mx-auto text-3xl">
        ✓
      </div>
      <h2 className="m-0 mt-5 text-3xl font-semibold tracking-[-0.02em] text-n-950">
        Granheim er live.
      </h2>
      <p className="m-0 mt-3 text-base text-n-700 max-w-[44ch] mx-auto">
        Kennelens offentlige side er publisert. Du kan dele lenken nedenfor
        med kjøpere, dommere og andre breeders.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 bg-bg-card border border-n-200 rounded-full pl-4 pr-2 py-1.5">
        <span className="font-mono text-sm text-n-950">
          granheim.dogworld.app
        </span>
        <button
          type="button"
          onClick={() => showToast("Lenke kopiert", "success")}
          className="text-xs bg-forest-700 text-white px-2.5 py-1 rounded-full hover:bg-forest-900 transition-colors"
        >
          Kopier
        </button>
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left">
        <NextStep
          n="1"
          t="Last opp første bilde av Astor"
          href="/dog/astor"
        />
        <NextStep n="2" t="Bekreft etikk-erklæringen (+50 karma)" href="/today" />
        <NextStep n="3" t="Inviter første valpekjøper" href="/litter" />
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/today">
          <Button variant="primary" size="lg">
            Til Today-dashbordet →
          </Button>
        </Link>
        <Link href="/kennel">
          <Button variant="secondary" size="lg">
            Se den offentlige siden
          </Button>
        </Link>
      </div>
    </section>
  );
}

function NextStep({
  n,
  t,
  href,
}: {
  n: string;
  t: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-bg-card border border-n-200 rounded-card p-4 hover:border-forest-500 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-all flex items-start gap-3"
    >
      <span
        aria-hidden
        className="w-7 h-7 rounded-full bg-forest-50 text-forest-700 grid place-items-center font-mono text-sm font-semibold flex-shrink-0"
      >
        {n}
      </span>
      <span className="text-sm text-n-950 leading-snug">{t}</span>
    </Link>
  );
}

// ── Shared step shell ──────────────────────────────────────────────────────

function StepShell({
  title,
  sub,
  children,
  onNext,
  onBack,
  nextLabel = "Neste →",
  nextDisabled,
  ghost,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  ghost?: React.ReactNode;
}) {
  return (
    <section>
      <header className="mb-6">
        <h2 className="m-0 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-n-950">
          {title}
        </h2>
        {sub && (
          <p className="m-0 mt-2 text-sm text-n-700 max-w-[60ch] leading-relaxed">
            {sub}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-5">{children}</div>
      <footer className="mt-8 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="md" onClick={onBack}>
              ← Tilbake
            </Button>
          )}
          {ghost}
        </div>
        <Button
          variant="primary"
          size="md"
          state={nextDisabled ? "disabled" : "default"}
          onClick={onNext}
        >
          {nextLabel}
        </Button>
      </footer>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-n-950 block mb-1.5">
        {label}
      </span>
      {hint && (
        <span className="text-xs text-n-500 block mb-2 leading-relaxed">
          {hint}
        </span>
      )}
      {children}
    </label>
  );
}
