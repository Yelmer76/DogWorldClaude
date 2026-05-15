"use client";

import { useState } from "react";
import { useToast } from "@/components/dogworld/ToastProvider";
import { Button } from "@/components/ui/Button";
import type { Dog } from "@/data/universe";

export type NotaterTabProps = {
  dog: Dog;
};

type Note = {
  id: string;
  date: string;
  time: string;
  body: string;
};

const seedNotes: Note[] = [
  {
    id: "n1",
    date: "12. mai 2026",
    time: "09:42",
    body: "Veiing: 22,4 kg. Stabilt etter parring med Bella. Spiser normalt, energinivå normalt.",
  },
  {
    id: "n2",
    date: "08. mai 2026",
    time: "07:10",
    body: "Klart for NKK Bergen. Behold dietten — har fungert godt frem til nå. Pels i god stand.",
  },
  {
    id: "n3",
    date: "28. apr 2026",
    time: "11:30",
    body: "HD-røntgen tatt hos Solheim. Han var rolig — ingen sedasjon nødvendig. Resultat ventes innen 14 dager.",
  },
  {
    id: "n4",
    date: "12. mar 2026",
    time: "10:15",
    body: "Øyenlysning hos Brevik (Voss). Klar. Neste innen 12. mar 2027.",
  },
  {
    id: "n5",
    date: "14. feb 2026",
    time: "22:50",
    body: "Bella har gått inn i løpetid. Planlegger parring siste uke av februar. Astor er fokusert.",
  },
];

const NB_MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "mai",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "des",
];

function formatNow(): { date: string; time: string } {
  const now = new Date();
  const dd = now.getDate().toString().padStart(2, "0");
  const mm = NB_MONTHS[now.getMonth()];
  const yyyy = now.getFullYear();
  const hh = now.getHours().toString().padStart(2, "0");
  const min = now.getMinutes().toString().padStart(2, "0");
  return { date: `${dd}. ${mm} ${yyyy}`, time: `${hh}:${min}` };
}

export function NotaterTab({ dog }: NotaterTabProps) {
  const showToast = useToast();
  const [notes, setNotes] = useState<Note[]>(seedNotes);
  const [draft, setDraft] = useState("");

  const canSave = draft.trim().length > 0;

  function submit() {
    if (!canSave) return;
    const { date, time } = formatNow();
    const note: Note = {
      id: `n-${Date.now()}`,
      date,
      time,
      body: draft.trim(),
    };
    setNotes((prev) => [note, ...prev]);
    setDraft("");
    showToast("Notat lagret");
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Composer */}
      <section>
        <div className="bg-bg-card border border-n-200 rounded-card p-3 focus-within:border-forest-500 transition-colors">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={`Notat om ${dog.callName ?? dog.name} — vekt, atferd, kommende avtaler…`}
            className="w-full text-sm text-n-950 placeholder:text-n-500 bg-transparent resize-none focus:outline-none leading-snug"
            aria-label="Skriv nytt notat"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-n-100">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-n-500 font-mono uppercase tracking-[0.05em]">
              <LockIcon />
              Privat
            </span>
            <Button
              variant="primary"
              size="sm"
              state={canSave ? "default" : "disabled"}
              onClick={submit}
            >
              Lagre notat
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500">
            Tidslinje
          </h2>
          <span className="text-xs text-n-500 font-mono">
            {notes.length} notater
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {notes.map((n) => (
            <article
              key={n.id}
              className="bg-bg-card border border-n-200 rounded-card p-4"
            >
              <header className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-xs font-medium text-n-950">{n.date}</span>
                <span className="text-[11px] text-n-500 font-mono">
                  {n.time}
                </span>
              </header>
              <p className="text-sm text-n-700 leading-relaxed whitespace-pre-wrap">
                {n.body}
              </p>
            </article>
          ))}
          {notes.length === 0 && (
            <div className="border border-dashed border-n-300 rounded-card p-8 text-center text-sm text-n-500">
              Ingen notater ennå. Skriv det første over.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
