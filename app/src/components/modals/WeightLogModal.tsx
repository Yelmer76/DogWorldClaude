"use client";

import { useState } from "react";
import { Sheet } from "@/components/dogworld/Sheet";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/dogworld/ToastProvider";

export type WeightLogModalProps = {
  open: boolean;
  onClose: () => void;
  /** Subject name (dog or puppy) shown in title */
  subject?: string;
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function WeightLogModal({
  open,
  onClose,
  subject,
}: WeightLogModalProps) {
  const showToast = useToast();
  const [date, setDate] = useState(todayISO());
  const [kg, setKg] = useState("");
  const [note, setNote] = useState("");

  function handleClose() {
    setDate(todayISO());
    setKg("");
    setNote("");
    onClose();
  }

  function save() {
    const parsed = parseFloat(kg.replace(",", "."));
    if (Number.isNaN(parsed) || parsed <= 0) {
      showToast("Vennligst skriv inn en gyldig vekt i kg", "error");
      return;
    }
    showToast(
      `${parsed.toFixed(1)} kg lagret${subject ? ` for ${subject}` : ""}`,
      "success",
    );
    handleClose();
  }

  const valid = kg.trim().length > 0 && date.length > 0;

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title="Logg vekt"
      subtitle={subject ? `Veiing av ${subject}` : "Veiing"}
    >
      <div className="px-3 pb-2 flex flex-col gap-3">
        <label className="block">
          <span className="text-sm font-medium text-n-950 block mb-1.5">
            Dato
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono focus:outline-none focus:border-forest-500"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-n-950 block mb-1.5">
            Vekt
          </span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              placeholder="0,0"
              autoFocus
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-3 text-2xl font-mono font-semibold text-n-950 focus:outline-none focus:border-forest-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-n-500 font-mono text-base pointer-events-none">
              kg
            </span>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-n-950 block mb-1.5">
            Notat (valgfritt)
          </span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="F.eks. «morgen, før mat»"
            className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
          />
        </label>

        <div className="flex justify-end gap-2 pt-2 border-t border-n-100">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            Avbryt
          </Button>
          <Button
            variant="primary"
            size="sm"
            state={valid ? "default" : "disabled"}
            onClick={save}
          >
            Lagre veiing
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
