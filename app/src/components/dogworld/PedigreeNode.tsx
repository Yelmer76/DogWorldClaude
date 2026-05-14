/**
 * PedigreeNode — single ancestor card in the genealogy tree.
 *
 * Per design handoff:
 *   - Sires get a 4px dusty-blue left bar
 *   - Dams get a 4px dusty-pink left bar
 *   - Focal node has accent border (forest-700, no left bar)
 *   - Cards stay clean white — sex hint via sex chip + bar
 *   - Single-dot health pip in top-right (replaces chip strip)
 *
 * Direction convention (NKK / VDH / KC print pedigrees):
 *   Focal on LEFT, ancestors flow RIGHTWARD back through time.
 */
import type { ReactNode } from "react";
import type { HealthStatus } from "@/data/universe";

export type PedigreeNodeVariant = "sire" | "dam" | "focal";

export type PedigreeNodeProps = {
  variant: PedigreeNodeVariant;
  /** Title chip text shown above name (NUCH NORDUCH etc.). For focal nodes use a label like "CURRENT VIEW". */
  titles: string;
  /** Registered name (single line, may wrap) */
  name: string;
  /** Subtle meta line below name (e.g. "b. 2021 · sire") */
  meta: ReactNode;
  /** Mono-font health line (e.g. "HD: A · ED: 0") */
  health?: string;
  /** Health pip in corner — single colored dot, replaces chip strip */
  healthPip?: HealthStatus;
  /** Click handler (peek-then-make-focal flow) */
  onClick?: () => void;
};

const sexSymbol = { sire: "♂", dam: "♂", focal: "?" } as const;

const sexChipClasses: Record<PedigreeNodeVariant, string> = {
  sire: "text-[#3e5a76] bg-sire-chip-bg",
  dam: "text-[#8a4870] bg-dam-chip-bg",
  focal: "text-forest-700 bg-forest-50",
};

const barClasses: Record<PedigreeNodeVariant, string> = {
  sire: "bg-sire-bar",
  dam: "bg-dam-bar",
  focal: "",
};

const pipBg: Record<HealthStatus, string> = {
  ok: "bg-success-dot",
  warn: "bg-warning-dot",
  err: "bg-error-dot",
};

export function PedigreeNode({
  variant,
  titles,
  name,
  meta,
  health,
  healthPip,
  onClick,
}: PedigreeNodeProps) {
  const isFocal = variant === "focal";
  const sex = variant === "dam" ? "♀" : variant === "sire" ? "♂" : sexSymbol.focal;

  return (
    <button
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={
        "relative w-full text-left bg-bg-card rounded-card p-3 pr-5 border transition-all duration-150 overflow-hidden " +
        (isFocal
          ? "border-forest-700 [box-shadow:0_0_0_2px_rgba(63,90,85,0.10)] cursor-default "
          : "border-n-200 cursor-pointer hover:border-n-300 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] hover:-translate-y-px ")
      }
      aria-current={isFocal ? "true" : undefined}
    >
      {/* Sex bar (left) — only for sire / dam */}
      {!isFocal && (
        <span
          className={`absolute left-0 top-0 bottom-0 w-1 ${barClasses[variant]}`}
          aria-hidden
        />
      )}

      {/* Health pip (top-right corner) */}
      {healthPip && (
        <span
          className={`absolute top-2 right-2 w-2 h-2 rounded-full ${pipBg[healthPip]}`}
          aria-hidden
        />
      )}

      {/* Sex chip (top-right inline) */}
      <span
        className={`inline-grid place-items-center w-[18px] h-[18px] rounded-[3px] text-[10px] font-semibold mb-1 ${sexChipClasses[variant]}`}
        aria-hidden
      >
        {sex}
      </span>

      <div className="font-mono text-[10px] text-ochre-700 tracking-[0.05em] uppercase">
        {titles}
      </div>
      <div className="text-sm font-semibold tracking-[-0.005em] leading-snug pr-5 mt-0.5">
        {name}
      </div>
      <div className="text-[11px] text-n-700 mt-1">{meta}</div>
      {health && (
        <div className="font-mono text-[10px] text-n-700 mt-0.5 opacity-90">
          {health}
        </div>
      )}
    </button>
  );
}
