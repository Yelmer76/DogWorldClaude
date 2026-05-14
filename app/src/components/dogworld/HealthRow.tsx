/**
 * HealthRow — one row of a structured health-test table.
 * Per design handoff: scheme + detail + value (mono, comparable) + date + cert link.
 * Schemes use original notation (FCI A, OFA Excellent, BVA 4:5) — no translation.
 */
import { Tag } from "./Tag";
import type { HealthStatus } from "@/data/universe";

export type HealthRowProps = {
  /** Scheme + abbreviation, e.g. "HD · FCI" */
  scheme: string;
  /** Long-form detail, e.g. "Hip dysplasia (radiograph)" */
  detail: string;
  /** Result value rendered in a colored tag */
  value: string;
  /** Tag tone — drives color */
  status: HealthStatus;
  /** Display-formatted date */
  date: string;
  /** Cert URL (PDF link) — when null, shows nothing or a re-test action */
  certUrl?: string;
  /** Action label override (e.g. "Re-test →" for expired) */
  actionLabel?: string;
  /** Action handler when no certUrl */
  onAction?: () => void;
};

const tagVariant = {
  ok: "success" as const,
  warn: "warning" as const,
  err: "error" as const,
};

export function HealthRow({
  scheme,
  detail,
  value,
  status,
  date,
  certUrl,
  actionLabel,
  onAction,
}: HealthRowProps) {
  return (
    <div className="grid grid-cols-[120px_1fr_120px_120px_100px] gap-4 items-center py-3 border-t border-n-100 first:border-t-0">
      <div className="font-mono text-xs text-ochre-700 tracking-[0.04em] uppercase">
        {scheme}
      </div>
      <div className="text-sm text-n-700 truncate">{detail}</div>
      <div>
        <Tag variant={tagVariant[status]} className="font-mono">
          {value}
        </Tag>
      </div>
      <div className="font-mono text-xs text-n-500">{date}</div>
      <div className="text-right">
        {certUrl ? (
          <a
            href={certUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-forest-700 hover:text-forest-900 transition-colors"
          >
            PDF →
          </a>
        ) : actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="font-mono text-xs text-error-fg hover:underline"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Wrap a stack of HealthRow children. Adds the rounded card chrome + header row.
 */
export function HealthTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-card border border-n-200 rounded-card p-4">
      <div className="grid grid-cols-[120px_1fr_120px_120px_100px] gap-4 pb-2 text-[11px] uppercase tracking-[0.06em] font-medium text-n-500">
        <div>Scheme</div>
        <div>Detalj</div>
        <div>Verdi</div>
        <div>Dato</div>
        <div className="text-right">Sertifikat</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
