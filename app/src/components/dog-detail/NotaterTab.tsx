"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/components/dogworld/ToastProvider";
import { Button } from "@/components/ui/Button";
import { addDogNote } from "@/lib/actions/notes";
import type { DogNoteRow } from "@/db/schema";

export type NotaterTabProps = {
  dogId: string;
  dogName: string;
  notes: DogNoteRow[];
};

const NB_MONTHS = [
  "jan", "feb", "mar", "apr", "mai", "jun",
  "jul", "aug", "sep", "okt", "nov", "des",
];

function formatNote(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { date: iso, time: "" };
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = NB_MONTHS[d.getMonth()];
  const yyyy = d.getFullYear();
  const hh = d.getHours().toString().padStart(2, "0");
  const min = d.getMinutes().toString().padStart(2, "0");
  return { date: `${dd}. ${mm} ${yyyy}`, time: `${hh}:${min}` };
}

export function NotaterTab({ dogId, dogName, notes }: NotaterTabProps) {
  const showToast = useToast();
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();

  const canSave = draft.trim().length > 0 && !pending;

  function submit() {
    if (!canSave) return;
    const body = draft.trim();
    setDraft(""); // optimistic clear
    startTransition(async () => {
      try {
        await addDogNote(dogId, body);
        showToast("Notat lagret");
      } catch (err) {
        // Restore draft on failure
        setDraft(body);
        showToast(
          err instanceof Error ? err.message : "Kunne ikke lagre notatet",
          "error",
        );
      }
    });
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
            placeholder={`Notat om ${dogName} — vekt, atferd, kommende avtaler…`}
            className="w-full text-sm text-n-950 placeholder:text-n-500 bg-transparent resize-none focus:outline-none leading-snug"
            aria-label="Skriv nytt notat"
            disabled={pending}
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
              {pending ? "Lagrer…" : "Lagre notat"}
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
            {notes.length} {notes.length === 1 ? "notat" : "notater"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {notes.map((n) => {
            const { date, time } = formatNote(n.createdAt);
            return (
              <article
                key={n.id}
                className="bg-bg-card border border-n-200 rounded-card p-4"
              >
                <header className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="text-xs font-medium text-n-950">{date}</span>
                  <span className="text-[11px] text-n-500 font-mono">
                    {time}
                  </span>
                </header>
                <p className="text-sm text-n-700 leading-relaxed whitespace-pre-wrap">
                  {n.body}
                </p>
              </article>
            );
          })}
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
