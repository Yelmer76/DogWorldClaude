"use client";

/**
 * DevModeSwitcher — small dev-only segmented control that flips the Dog
 * Detail page between three demo states without needing separate routes:
 *
 *   - default  · fully-populated Astor (the v0.1 happy path)
 *   - sparse   · freshly-imported dog with minimal data + onboarding hints
 *   - memorial · over regnbuebroen (memorial styling + read-only)
 *
 * This stays in the page during Sprint 3 so Ole can preview all three
 * variants. We hide it once Sprint 4 introduces real routing per dog.
 */
export type DogViewMode = "default" | "sparse" | "memorial";

const options: { id: DogViewMode; label: string; sub: string }[] = [
  { id: "default", label: "Standard", sub: "Astor — full data" },
  { id: "sparse", label: "Sparse", sub: "Nyimportert — manglende felt" },
  { id: "memorial", label: "Memorial", sub: "Over regnbuebroen" },
];

export type DevModeSwitcherProps = {
  mode: DogViewMode;
  onChange: (mode: DogViewMode) => void;
};

export function DevModeSwitcher({ mode, onChange }: DevModeSwitcherProps) {
  return (
    <div className="bg-bg-card border-b border-n-100">
      <div className="max-w-3xl xl:max-w-[1180px] mx-auto px-4 md:px-6 py-2 flex items-center gap-3 overflow-x-auto">
        <span className="text-[10px] uppercase tracking-[0.08em] font-mono text-n-500 flex-shrink-0">
          Demo-tilstand
        </span>
        <div
          className="inline-flex bg-n-50 rounded-full p-0.5 flex-shrink-0"
          role="radiogroup"
          aria-label="Velg demo-tilstand"
        >
          {options.map((o) => {
            const active = o.id === mode;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(o.id)}
                className={
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors " +
                  (active
                    ? "bg-bg-card text-n-950 shadow-[0_1px_2px_rgba(26,26,26,0.06)]"
                    : "text-n-700 hover:text-n-950")
                }
              >
                {o.label}
              </button>
            );
          })}
        </div>
        <span className="hidden md:inline text-[11px] text-n-500 truncate">
          {options.find((o) => o.id === mode)?.sub}
        </span>
      </div>
    </div>
  );
}
