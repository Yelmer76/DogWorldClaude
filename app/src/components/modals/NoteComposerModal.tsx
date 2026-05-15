"use client";

import { useState } from "react";
import { Sheet } from "@/components/dogworld/Sheet";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/dogworld/ToastProvider";

export type NoteComposerModalProps = {
  open: boolean;
  onClose: () => void;
  subject?: string;
};

export function NoteComposerModal({
  open,
  onClose,
  subject,
}: NoteComposerModalProps) {
  const showToast = useToast();
  const [draft, setDraft] = useState("");

  function handleClose() {
    setDraft("");
    onClose();
  }

  function save() {
    if (!draft.trim()) return;
    showToast(`Notat lagret${subject ? ` på ${subject}` : ""}`, "success");
    handleClose();
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title="Skriv notat"
      subtitle={subject ? `Privat notat om ${subject}` : "Privat notat"}
    >
      <div className="px-3 pb-2 flex flex-col gap-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          placeholder={`F.eks. «Astor er rolig etter parringen, spiser normalt.»`}
          autoFocus
          className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-sm leading-relaxed resize-none focus:outline-none focus:border-forest-500 min-h-[120px]"
        />
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-n-100">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-n-500 font-mono uppercase tracking-[0.05em]">
            <LockGlyph />
            Privat — bare du ser dette
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              Avbryt
            </Button>
            <Button
              variant="primary"
              size="sm"
              state={draft.trim() ? "default" : "disabled"}
              onClick={save}
            >
              Lagre notat
            </Button>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function LockGlyph() {
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
