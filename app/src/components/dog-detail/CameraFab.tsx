"use client";

import { useState } from "react";
import { Sheet } from "@/components/dogworld/Sheet";
import { useToast } from "@/components/dogworld/ToastProvider";
import { PhotoUploadModal } from "@/components/modals/PhotoUploadModal";
import { WeightLogModal } from "@/components/modals/WeightLogModal";
import { NoteComposerModal } from "@/components/modals/NoteComposerModal";

export type CameraFabAction = {
  id: "photo" | "cert" | "crit" | "weight" | "note" | "pedigree" | string;
  label: string;
  icon: "camera" | "doc" | "scan" | "scale" | "edit";
};

const defaultActions: CameraFabAction[] = [
  { id: "photo", label: "Ta bilde", icon: "camera" },
  { id: "cert", label: "Skann helse-sertifikat", icon: "doc" },
  { id: "crit", label: "Skann utstillingskritikk", icon: "scan" },
  { id: "weight", label: "Logg vekt", icon: "scale" },
  { id: "note", label: "Skriv notat", icon: "edit" },
];

export type CameraFabProps = {
  /** Override default action labels (e.g. swap Astor for the focal dog name) */
  actions?: CameraFabAction[];
  /** Override the bottom inset (default 24px from viewport bottom) */
  bottomOffset?: number;
  /** Subject name passed into the modals (e.g. "Astor", "Kull C") */
  subject?: string;
};

type OpenModal = null | "photo" | "weight" | "note" | "scan-cert" | "scan-crit";

export function CameraFab({
  actions = defaultActions,
  bottomOffset = 24,
  subject,
}: CameraFabProps) {
  const showToast = useToast();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<OpenModal>(null);

  function handleSelect(action: CameraFabAction) {
    setOpen(false);
    switch (action.id) {
      case "photo":
        setModal("photo");
        break;
      case "weight":
        setModal("weight");
        break;
      case "note":
        setModal("note");
        break;
      case "cert":
        setModal("scan-cert");
        showToast(
          "Helse-sertifikat-skanner åpner kamera (kommer snart)",
          "info",
        );
        break;
      case "crit":
        setModal("scan-crit");
        showToast(
          "Utstillingskritikk-skanner åpner kamera (kommer snart)",
          "info",
        );
        break;
      default:
        showToast(`→ ${action.label}`, "info");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Legg til (kamera, skann, vekt, notat)"
        style={{ bottom: `${bottomOffset}px` }}
        className="fixed right-5 z-40 w-14 h-14 rounded-full grid place-items-center bg-warm-600 text-white shadow-[0_8px_24px_rgba(201,138,39,0.35),0_2px_6px_rgba(26,26,26,0.10)] hover:bg-[#b87a1f] active:scale-[0.97] transition-all focus-visible:outline-2 focus-visible:outline-warm-600 focus-visible:outline-offset-2"
      >
        <CameraIcon />
      </button>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Legg til"
        subtitle="Kameraet er klart for utstillinger og besøk"
      >
        <ul className="m-0 p-0 list-none">
          {actions.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => handleSelect(a)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-n-50 transition-colors text-left"
              >
                <span className="w-9 h-9 rounded-md bg-[#f7eddc] text-warm-600 grid place-items-center flex-shrink-0">
                  <ActionIcon kind={a.icon} />
                </span>
                <span className="flex-1 text-sm text-n-950">{a.label}</span>
                <span className="text-n-300" aria-hidden>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Sheet>

      <PhotoUploadModal
        open={modal === "photo"}
        onClose={() => setModal(null)}
        subject={subject}
      />
      <WeightLogModal
        open={modal === "weight"}
        onClose={() => setModal(null)}
        subject={subject}
      />
      <NoteComposerModal
        open={modal === "note"}
        onClose={() => setModal(null)}
        subject={subject}
      />
    </>
  );
}

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h3l2-2h8l2 2h3v12H3z" />
      <circle cx="12" cy="14" r="4" />
    </svg>
  );
}

function ActionIcon({ kind }: { kind: CameraFabAction["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "camera":
      return (
        <svg {...common}>
          <path d="M3 8h3l2-2h8l2 2h3v12H3z" />
          <circle cx="12" cy="14" r="4" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 3H6v18h12V7zM14 3v4h4" />
          <path d="M9 13h6M9 17h4" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3" />
          <path d="M7 12h10" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M5 6h14l-2 14H7z" />
          <path d="M9 11h6" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M14 4l6 6L9 21H3v-6z" />
          <path d="M14 4l3-3 6 6-3 3" />
        </svg>
      );
  }
}
