"use client";

import { useState } from "react";
import { Sheet } from "@/components/dogworld/Sheet";
import { Button } from "@/components/ui/Button";
import type { PuppyRow } from "@/db/schema";

export type OfferPuppyModalProps = {
  open: boolean;
  onClose: () => void;
  applicantName: string;
  /**
   * Pre-filtered list of offerable puppies (caller decides what counts
   * as "offerable" — typically status in [tilgjengelig, tilbudt]).
   */
  availablePuppies: PuppyRow[];
  /** Called with the picked puppy id when the user confirms. */
  onAccept: (puppyId: string) => void;
};

const collarHex: Record<PuppyRow["color"], string> = {
  red: "#c54848",
  blue: "#3e6ea8",
  green: "#5a8b4e",
  purple: "#7a4e8b",
  yellow: "#d4a82d",
  orange: "#d97a3d",
  pink: "#d18ba0",
  white: "#e8e8e3",
};

export function OfferPuppyModal({
  open,
  onClose,
  applicantName,
  availablePuppies,
  onAccept,
}: OfferPuppyModalProps) {
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  function handleClose() {
    setPickedId(null);
    setMessage("");
    onClose();
  }

  function send() {
    if (!pickedId) return;
    onAccept(pickedId);
    handleClose();
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title="Tilby valp"
      subtitle={`Velg én av de ledige valpene å tilby ${applicantName}`}
    >
      <div className="px-3 pb-2 flex flex-col gap-3">
        {availablePuppies.length > 0 ? (
          <ul className="m-0 p-0 list-none grid grid-cols-2 gap-2">
            {availablePuppies.map((p) => {
              const active = pickedId === p.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setPickedId(p.id)}
                    aria-pressed={active}
                    className={
                      "w-full text-left p-3 rounded-card border-2 transition-all flex flex-col gap-1.5 " +
                      (active
                        ? "border-forest-700 bg-forest-50/40 [box-shadow:0_0_0_3px_rgba(63,90,85,0.10)]"
                        : "border-n-200 bg-bg-card hover:border-n-300")
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full ring-2 ring-bg-card flex-shrink-0"
                        style={{ background: collarHex[p.color] }}
                        aria-hidden
                      />
                      <span className="text-sm font-semibold text-n-950">
                        {p.name}
                      </span>
                      <span className="text-[10px] font-mono text-n-500 ml-auto">
                        {p.sex === "m" ? "♂" : "♀"}
                      </span>
                    </div>
                    <div className="text-[11px] text-n-500 font-mono">
                      {p.colorLabel} · {p.weight.toFixed(1)} kg · {p.statusLabel}
                    </div>
                    {p.assignedTo && (
                      <div className="text-[11px] text-warning-fg italic line-clamp-1">
                        Allerede tilbudt: {p.assignedTo}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="border border-dashed border-n-300 rounded-card p-6 text-center text-sm text-n-500 italic">
            Ingen ledige valper å tilby akkurat nå.
          </div>
        )}

        <label className="block">
          <span className="text-xs font-medium text-n-950 block mb-1.5">
            Personlig melding (valgfritt)
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder={`Hei ${applicantName.split(" ")[0]} — vi har en valp som matcher dere…`}
            className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm resize-none focus:outline-none focus:border-forest-500"
          />
        </label>

        <div className="flex justify-end gap-2 pt-2 border-t border-n-100">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            Avbryt
          </Button>
          <Button
            variant="primary"
            size="sm"
            state={pickedId ? "default" : "disabled"}
            onClick={send}
          >
            Send tilbud
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
