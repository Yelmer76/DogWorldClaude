"use client";

import { dogs, type Dog } from "@/data/universe";

const flagFor: Record<string, string> = {
  NO: "🇳🇴",
  SE: "🇸🇪",
  DK: "🇩🇰",
  DE: "🇩🇪",
  UK: "🇬🇧",
  FI: "🇫🇮",
};

// ── Left rail (desktop) ────────────────────────────────────────────────────

export type PedigreeLeftRailProps = {
  history: string[];
  onJump: (idx: number) => void;
  onReset: () => void;
};

export function PedigreeLeftRail({
  history,
  onJump,
  onReset,
}: PedigreeLeftRailProps) {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-[260px] flex-shrink-0">
      {/* Search (visual only — search backend lives in Sprint 9+) */}
      <div className="bg-bg-card border border-n-200 rounded-card flex items-center gap-2 px-3 py-2">
        <SearchIcon />
        <input
          placeholder="Søk hund, kennel…"
          className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-n-500 min-w-0"
          aria-label="Søk"
        />
        <kbd className="text-[10px] font-mono text-n-500 bg-n-50 border border-n-200 px-1 py-0.5 rounded-sm">
          ⌘K
        </kbd>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2 px-1">
          <h3 className="text-[10px] uppercase tracking-[0.08em] font-medium text-n-500 m-0">
            Historikk
          </h3>
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] uppercase tracking-[0.06em] text-forest-700 hover:text-forest-900"
          >
            Nullstill
          </button>
        </div>
        <ul className="m-0 p-0 list-none flex flex-col gap-1">
          {history
            .map((id, idx) => ({ id, idx }))
            .reverse()
            .map(({ id, idx }) => {
              const d = dogs[id];
              const isCurrent = idx === history.length - 1;
              return (
                <li key={`${id}-${idx}`}>
                  <button
                    type="button"
                    disabled={isCurrent}
                    onClick={() => onJump(idx)}
                    className={
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors " +
                      (isCurrent
                        ? "bg-forest-50 text-forest-700 cursor-default"
                        : "hover:bg-n-50 text-n-950")
                    }
                  >
                    <span
                      className={
                        "w-1.5 h-1.5 rounded-full flex-shrink-0 " +
                        (isCurrent ? "bg-forest-700" : "bg-n-300")
                      }
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium truncate">
                        {d ? d.callName ?? d.name : "?"}
                      </span>
                      {d && d.titles.length > 0 && (
                        <span className="block text-[10px] font-mono uppercase tracking-[0.04em] text-n-500 truncate">
                          {d.titles.join(" ")}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-[0.08em] font-medium text-n-500 m-0 mb-2 px-1">
          Lagrede søk
        </h3>
        <ul className="m-0 p-0 list-none flex flex-col gap-1">
          {[
            "Granheim — aktive hannhunder",
            "HD-A avlspool",
            "2024-kull",
          ].map((label) => (
            <li key={label}>
              <button
                type="button"
                className="w-full text-left text-sm text-n-700 hover:text-n-950 hover:bg-n-50 rounded-md px-2 py-1.5 transition-colors"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <KeyboardHints />
    </aside>
  );
}

function KeyboardHints() {
  const rows = [
    { key: "↑", action: "Far" },
    { key: "←", action: "Mor" },
    { key: "↓", action: "Første avkom" },
    { key: "→", action: "Første søsken" },
    { key: "Esc", action: "Tilbake" },
  ];
  return (
    <div className="bg-n-50 border border-n-100 rounded-card p-3">
      <div className="text-[10px] uppercase tracking-[0.08em] font-medium text-n-500 mb-2">
        Tastatur
      </div>
      <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
        {rows.map((r) => (
          <li key={r.key} className="flex items-center justify-between text-xs">
            <kbd className="font-mono text-[11px] bg-bg-card border border-n-200 px-1.5 py-0.5 rounded-sm text-n-950">
              {r.key}
            </kbd>
            <span className="text-n-700">{r.action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Right rail (desktop) ───────────────────────────────────────────────────

export type PedigreeRightRailProps = {
  dog: Dog;
};

export function PedigreeRightRail({ dog }: PedigreeRightRailProps) {
  const healthEntries = Object.entries(dog.health);
  return (
    <aside className="hidden xl:flex flex-col gap-6 w-[280px] flex-shrink-0">
      <RailSection label="Fulle titler">
        {dog.titles.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {dog.titles.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-[0.06em] uppercase bg-ochre-50 text-ochre-700 px-1.5 py-0.5 rounded-tag"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-n-500 italic">Ingen titler ennå.</span>
        )}
      </RailSection>

      <RailSection label="Helse-detaljer">
        {healthEntries.length > 0 ? (
          <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
            {healthEntries.map(([k, h]) => (
              <li
                key={k}
                className="flex items-baseline justify-between text-xs"
              >
                <span className="font-mono uppercase tracking-[0.05em] text-n-500">
                  {k}
                </span>
                <span
                  className={
                    "font-mono " +
                    (h.status === "ok"
                      ? "text-success-fg"
                      : h.status === "warn"
                        ? "text-warning-fg"
                        : "text-error-fg")
                  }
                >
                  {h.value}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-xs text-n-500 italic">
            Ingen helse-resultater registrert.
          </span>
        )}
      </RailSection>

      <RailSection label="Siste resultater">
        {dog.achievements.length > 0 ? (
          <ul className="m-0 p-0 list-none flex flex-col gap-2">
            {dog.achievements.slice(0, 4).map((a, i) => (
              <li
                key={`${a.y}-${i}`}
                className="flex gap-2 text-xs text-n-700"
              >
                <span className="font-mono text-n-500 flex-shrink-0">
                  {a.y}
                </span>
                <span>{a.t}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-xs text-n-500 italic">Ingen utstillinger.</span>
        )}
      </RailSection>

      <RailSection label="Opprinnelse">
        <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
          <OriginRow label="Oppdretter" value={dog.breeder} />
          <OriginRow
            label="Land"
            value={`${flagFor[dog.country] ?? ""} ${dog.country}`}
          />
          <OriginRow label="Født" value={dog.born} mono />
          {dog.deceased && (
            <OriginRow label="Død" value={dog.deceased} mono />
          )}
        </ul>
      </RailSection>
    </aside>
  );
}

function RailSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-[0.08em] font-medium text-n-500 m-0 mb-2 px-1">
        {label}
      </h3>
      <div className="bg-bg-card border border-n-200 rounded-card p-3">
        {children}
      </div>
    </div>
  );
}

function OriginRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <li className="flex items-baseline justify-between text-xs">
      <span className="text-n-500">{label}</span>
      <span className={"text-n-950 " + (mono ? "font-mono" : "")}>{value}</span>
    </li>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-n-500 flex-shrink-0"
      aria-hidden
    >
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="16" y2="16" />
    </svg>
  );
}
