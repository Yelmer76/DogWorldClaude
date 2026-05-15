"use client";

import { Sheet } from "@/components/dogworld/Sheet";
import type { DogStatus } from "@/data/universe";

export type StatusOption = {
  id: DogStatus;
  label: string;
  desc: string;
};

const allOptions: StatusOption[] = [
  {
    id: "active",
    label: "Aktiv",
    desc: "I avl, vises i søk og stamtavler",
  },
  {
    id: "retired",
    label: "Pensjonert",
    desc: "Brukes ikke lenger i avl",
  },
  {
    id: "sold",
    label: "Solgt til ny eier",
    desc: "Eierskap overført — fortsatt i stamtavlen",
  },
  {
    id: "memorial",
    label: "Over regnbuebroen",
    desc: "Minneside, med dato for bortgang",
  },
];

const dotClasses: Record<DogStatus, string> = {
  active: "bg-success-dot",
  retired: "bg-warning-dot",
  sold: "bg-n-300",
  memorial: "bg-info-dot",
};

export type StatusSheetProps = {
  open: boolean;
  current: DogStatus;
  onSelect: (status: DogStatus) => void;
  onClose: () => void;
};

export function StatusSheet({
  open,
  current,
  onSelect,
  onClose,
}: StatusSheetProps) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Endre status"
      subtitle="Statusen styrer hvor hunden vises og hvordan andre breeders kan finne den."
    >
      <ul className="m-0 p-0 list-none">
        {allOptions.map((o) => {
          const isCurrent = o.id === current;
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => onSelect(o.id)}
                className={
                  "w-full flex items-start gap-3 px-3 py-3 rounded-md text-left transition-colors " +
                  (isCurrent
                    ? "bg-forest-50"
                    : "hover:bg-n-50")
                }
                aria-current={isCurrent ? "true" : undefined}
              >
                <span
                  className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotClasses[o.id]}`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-n-950">
                    {o.label}
                  </div>
                  <div className="text-xs text-n-700 mt-0.5 leading-relaxed">
                    {o.desc}
                  </div>
                </div>
                {isCurrent && (
                  <span
                    className="text-forest-700 text-sm leading-none mt-1"
                    aria-label="Nåværende"
                  >
                    ✓
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </Sheet>
  );
}
