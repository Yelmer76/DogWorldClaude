"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AppHeader } from "@/components/shell/AppHeader";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/dogworld/Tag";
import { ToastProvider, useToast } from "@/components/dogworld/ToastProvider";
import { confirmEthics } from "@/lib/actions/kennel";

/**
 * Etikk-erklæring — bi-monthly self-declaration that gates the +50
 * karma bonus per `trust_identity_quality_decisions` memory.
 *
 * 6 questions, all visible at once, all required before submit.
 * Sprint 13 will persist the answers + timestamp to D1; for now the
 * submit fires a karma-bonus toast and bounces back to /mer.
 */
export default function EthicsPage() {
  return (
    <ToastProvider>
      <EthicsForm />
    </ToastProvider>
  );
}

type Answer = "yes" | "no" | undefined;

const questions: { id: string; q: string; sub?: string }[] = [
  {
    id: "health",
    q: "Tester du HD, ED, øyne og rasespesifikke gen-tester på alle avlsdyr?",
    sub: "Resultater må være lagret eller lenket før parring.",
  },
  {
    id: "litters",
    q: "Holder du deg innenfor maks 4 kull per tispe og maks 1 kull per 12 måneder?",
    sub: "I tråd med NKK Etiske Grunnregler for Avl § 3.",
  },
  {
    id: "screening",
    q: "Snakker du personlig med hver valpekjøper før du sier ja?",
    sub: "Telefon, video eller fysisk besøk — ikke bare e-post-tråd.",
  },
  {
    id: "buyback",
    q: "Tilbyr du å ta valpen tilbake gjennom hele dens liv?",
    sub: "Skriftlig i kjøpskontrakten, uten forbehold om tilbakebetaling.",
  },
  {
    id: "contract",
    q: "Bruker du en skriftlig kjøpskontrakt etter NKK-mal eller bedre?",
    sub: "Inkluderer helsegaranti, depositum-vilkår, og tilbakekjøpsrett.",
  },
  {
    id: "support",
    q: "Gir du livslang rådgivning til alle valpekjøpere?",
    sub: "E-post, telefon eller gruppe-chat — du svarer alltid.",
  },
];

function EthicsForm() {
  const router = useRouter();
  const showToast = useToast();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [pending, startTransition] = useTransition();
  const allYes =
    questions.length === Object.values(answers).filter((a) => a === "yes")
      .length;
  const anyNo = Object.values(answers).some((a) => a === "no");

  function set(id: string, v: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: v }));
  }

  function submit() {
    if (anyNo) {
      showToast(
        "Erklæringen kan ikke leveres med «Nei» på sentrale spørsmål — be om støtte i stedet",
        "warning",
      );
      return;
    }
    if (!allYes) return;
    startTransition(async () => {
      try {
        await confirmEthics();
        showToast("Etikk-erklæring bekreftet · +50 karma 🎉", "success");
        setTimeout(() => router.push("/mer"), 800);
      } catch (err) {
        showToast(
          err instanceof Error ? err.message : "Kunne ikke lagre erklæringen",
          "error",
        );
      }
    });
  }

  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-8 py-5 md:py-8 max-w-[760px] w-full mx-auto flex flex-col gap-6">
        {/* Hero */}
        <header>
          <Link
            href="/mer"
            className="text-xs text-n-500 hover:text-n-700 inline-flex items-center gap-1 mb-3"
          >
            ← Mer
          </Link>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-warm-600 mb-2">
            Etikk-erklæring · hver annen måned
          </div>
          <h1 className="m-0 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-n-950 leading-tight">
            Bekreft hvordan du driver Granheim
          </h1>
          <p className="m-0 mt-3 text-base text-n-700 max-w-[60ch] leading-relaxed">
            Seks korte spørsmål. Bekreftelsen gir{" "}
            <span className="font-mono font-semibold">+50 karma</span> og
            holder Sølv-tieren aktiv. Vi viser ikke svarene dine offentlig —
            karma-tier og «etikk-bekreftet»-merket er det andre ser.
          </p>
        </header>

        {/* Questions */}
        <ol className="m-0 p-0 list-none flex flex-col gap-3">
          {questions.map((q, i) => (
            <li
              key={q.id}
              className="bg-bg-card border border-n-200 rounded-card p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="w-7 h-7 rounded-full bg-forest-50 text-forest-700 grid place-items-center font-mono text-sm font-semibold flex-shrink-0"
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-n-950 leading-snug">
                    {q.q}
                  </div>
                  {q.sub && (
                    <div className="text-xs text-n-500 mt-1 leading-relaxed">
                      {q.sub}
                    </div>
                  )}
                  <div className="mt-3 flex gap-2">
                    <YesNoChip
                      active={answers[q.id] === "yes"}
                      tone="success"
                      onClick={() => set(q.id, "yes")}
                    >
                      Ja
                    </YesNoChip>
                    <YesNoChip
                      active={answers[q.id] === "no"}
                      tone="error"
                      onClick={() => set(q.id, "no")}
                    >
                      Nei
                    </YesNoChip>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Status panel */}
        <div className="bg-bg-card border border-n-200 rounded-card p-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Tag variant={allYes ? "success" : "neutral"} dot>
              {Object.values(answers).filter(Boolean).length} / {questions.length}
            </Tag>
            <span className="text-n-700">
              {allYes
                ? "Klar til å bekreftes"
                : anyNo
                  ? "Vi ringer deg for en samtale"
                  : "Svar Ja eller Nei på alle spørsmål"}
            </span>
          </div>
          <div className="flex gap-2">
            <Link href="/mer">
              <Button variant="ghost" size="sm">
                Avbryt
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              state={allYes ? "default" : "disabled"}
              onClick={submit}
            >
              Bekreft erklæring
            </Button>
          </div>
        </div>

        <p className="text-xs text-n-500 text-center pt-2 pb-4">
          Erklæringen lagres i journalen din og er synlig for støtte-team
          ved tvister. Vi viser aldri detaljerte svar utenfor kennelen.
        </p>
      </div>
    </>
  );
}

function YesNoChip({
  active,
  tone,
  onClick,
  children,
}: {
  active: boolean;
  tone: "success" | "error";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ";
  let activeCls = "";
  if (active) {
    activeCls =
      tone === "success"
        ? "bg-success-bg text-success-fg border-transparent"
        : "bg-error-bg text-error-fg border-transparent";
  } else {
    activeCls =
      "bg-bg-card text-n-700 border-n-300 hover:border-n-500";
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={base + activeCls}
    >
      {active && (
        <span
          className={
            "w-1.5 h-1.5 rounded-full " +
            (tone === "success" ? "bg-success-dot" : "bg-error-dot")
          }
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
