"use client";

import { useState } from "react";
import { Sheet } from "@/components/dogworld/Sheet";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/dogworld/ToastProvider";

export type VetBookingModalProps = {
  open: boolean;
  onClose: () => void;
  subject?: string;
  /** Suggest the reason field default */
  defaultReason?: string;
};

const clinics = [
  "Veterinærklinikken Voss",
  "Lillehammer Dyresenter",
  "Smedbakken Trondheim",
  "Polarklinikken Tromsø",
  "Bjørgvin Dyreklinikk Bergen",
];

function tomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function VetBookingModal({
  open,
  onClose,
  subject,
  defaultReason,
}: VetBookingModalProps) {
  const showToast = useToast();
  const [date, setDate] = useState(tomorrow());
  const [time, setTime] = useState("10:00");
  const [clinic, setClinic] = useState(clinics[0]);
  const [reason, setReason] = useState(defaultReason ?? "");

  function handleClose() {
    setDate(tomorrow());
    setTime("10:00");
    setClinic(clinics[0]);
    setReason(defaultReason ?? "");
    onClose();
  }

  function save() {
    if (!reason.trim()) {
      showToast("Vennligst skriv en grunn for besøket", "error");
      return;
    }
    showToast(
      `Veterinær-time bestilt: ${date} kl. ${time} · ${clinic}`,
      "success",
    );
    handleClose();
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title="Bestill veterinær-time"
      subtitle={subject ? `For ${subject}` : "Ny vet-avtale"}
    >
      <div className="px-3 pb-2 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-xs font-medium text-n-950 block mb-1.5">
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
            <span className="text-xs font-medium text-n-950 block mb-1.5">
              Klokkeslett
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono focus:outline-none focus:border-forest-500"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-n-950 block mb-1.5">
            Klinikk
          </span>
          <select
            value={clinic}
            onChange={(e) => setClinic(e.target.value)}
            className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
          >
            {clinics.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-n-950 block mb-1.5">
            Grunn for besøket
          </span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            placeholder="F.eks. Årlig vaksine (DHPPi + Lepto)"
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
            state={reason.trim() ? "default" : "disabled"}
            onClick={save}
          >
            Bestill time
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
