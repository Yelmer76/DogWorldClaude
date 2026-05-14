/**
 * Pattern components — empty state, skeleton, toast, dialog, bottom sheet.
 * Used as building blocks across the application.
 */
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

// ── Empty state ─────────────────────────────────────────────────────────────
export type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  cta?: ReactNode;
};

export function EmptyState({ icon, title, description, cta }: EmptyStateProps) {
  return (
    <div className="bg-bg-card border border-dashed border-n-300 rounded-card px-6 py-8 text-center">
      <div className="w-14 h-14 rounded-[14px] bg-forest-50 text-forest-700 grid place-items-center mx-auto mb-4">
        {icon}
      </div>
      <h4 className="m-0 mb-2 text-xl font-semibold tracking-[-0.01em]">
        {title}
      </h4>
      <p className="m-0 mx-auto mb-4 text-n-700 text-sm max-w-[36ch]">
        {description}
      </p>
      {cta}
    </div>
  );
}

// ── Skeleton ────────────────────────────────────────────────────────────────
const skeletonBg =
  "bg-[linear-gradient(90deg,var(--color-n-100)_0%,var(--color-n-50)_50%,var(--color-n-100)_100%)] bg-[length:200%_100%] animate-[dw-shimmer_1.4s_linear_infinite]";

const widthClass = (w: number) =>
  ({
    40: "w-2/5",
    60: "w-3/5",
    80: "w-4/5",
    100: "w-full",
  })[w] ?? "w-full";

export function SkeletonLine({
  width = 100,
  className = "",
}: {
  width?: 40 | 60 | 80 | 100;
  className?: string;
}) {
  return (
    <div
      className={`h-3 rounded-[4px] ${skeletonBg} ${widthClass(width)} ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-14 rounded-card ${skeletonBg} ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonAvatar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-14 h-14 rounded-full ${skeletonBg} ${className}`}
      aria-hidden
    />
  );
}

// ── Toast ───────────────────────────────────────────────────────────────────
export type ToastTone = "success" | "warning" | "error" | "info";

const dotClasses: Record<ToastTone, string> = {
  success: "bg-success-dot",
  warning: "bg-warning-dot",
  error: "bg-error-dot",
  info: "bg-info-dot",
};

export type ToastProps = {
  tone?: ToastTone;
  children: ReactNode;
  onDismiss?: () => void;
};

export function Toast({ tone = "success", children, onDismiss }: ToastProps) {
  return (
    <div
      className="bg-n-950 text-white py-2.5 px-3.5 rounded-btn inline-flex items-center gap-3 text-sm shadow-[0_8px_24px_rgba(26,26,26,0.08),0_2px_6px_rgba(26,26,26,0.05)]"
      role="status"
      aria-live="polite"
    >
      <span className={`w-2 h-2 rounded-full ${dotClasses[tone]}`} aria-hidden />
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Lukk"
          className="text-n-500 hover:text-white transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ── Confirmation dialog (visual only — wrap with portal/state in real use) ─
export type ConfirmDialogProps = {
  title: string;
  body: ReactNode;
  /** Label for the destructive/primary action */
  confirmLabel: string;
  /** Label for the safe action */
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel = "Behold",
  destructive,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="bg-bg-card rounded-card p-6 w-[380px] max-w-full shadow-[0_8px_24px_rgba(26,26,26,0.08),0_2px_6px_rgba(26,26,26,0.05)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <h4
        id="confirm-dialog-title"
        className="m-0 mb-2 text-xl font-semibold tracking-[-0.01em]"
      >
        {title}
      </h4>
      <p className="m-0 mb-4 text-n-700 text-sm">{body}</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant={destructive ? "destructive" : "primary"}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}

// ── Bottom sheet ────────────────────────────────────────────────────────────
export type SheetOption = {
  label: string;
  /** Right-side hint text */
  hint?: ReactNode;
  destructive?: boolean;
  onClick?: () => void;
};

export type BottomSheetProps = {
  title?: string;
  options: SheetOption[];
};

export function BottomSheet({ title, options }: BottomSheetProps) {
  return (
    <div className="bg-bg-card rounded-t-[20px] py-3 px-4 pb-4">
      <div
        className="w-9 h-1 rounded-[2px] bg-n-200 mx-auto mb-3"
        aria-hidden
      />
      {title && (
        <h4 className="m-0 mb-3 text-lg font-semibold">{title}</h4>
      )}
      <ul className="m-0 p-0 list-none">
        {options.map((o, i) => (
          <li
            key={o.label}
            className={
              "py-3 flex items-center justify-between text-base " +
              (i === 0 ? "" : "border-t border-n-100") +
              " " +
              (o.destructive ? "text-error-fg" : "text-n-950")
            }
          >
            <button
              type="button"
              onClick={o.onClick}
              className="flex-1 text-left flex items-center justify-between"
            >
              <span>{o.label}</span>
              {o.hint && (
                <span className="text-n-500 text-sm flex items-center gap-1.5">
                  {o.hint}
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
