"use client";

/**
 * Sheet — bottom-sheet overlay primitive.
 *
 * Per design handoff:
 *   - Slides up from bottom on mobile (rounded top corners, grab handle)
 *   - Centered card on desktop (md+)
 *   - Backdrop click + Escape closes
 *   - Body scroll locks while open
 *
 * Used by StatusSheet, CameraFab action sheet, More menu, Share sheet.
 */
import { useEffect, type ReactNode } from "react";

export type SheetProps = {
  open: boolean;
  onClose: () => void;
  /** Optional title rendered above content */
  title?: string;
  /** Optional supporting line under title */
  subtitle?: string;
  children: ReactNode;
  /** Accessible label when no title */
  ariaLabel?: string;
};

export function Sheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  ariaLabel,
}: SheetProps) {
  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? ariaLabel}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Lukk"
        onClick={onClose}
        className="absolute inset-0 bg-n-950/40 backdrop-blur-[2px] animate-[dw-toast-in_140ms_ease-out]"
      />

      {/* Sheet body */}
      <div
        className="relative w-full md:w-[420px] max-h-[80vh] bg-bg-card rounded-t-[20px] md:rounded-card shadow-[0_-8px_32px_rgba(26,26,26,0.12),0_-2px_6px_rgba(26,26,26,0.05)] md:shadow-[0_8px_32px_rgba(26,26,26,0.12),0_2px_6px_rgba(26,26,26,0.05)] overflow-hidden flex flex-col animate-[dw-toast-in_180ms_ease-out]"
      >
        {/* Grab handle (mobile only) */}
        <div
          className="md:hidden w-9 h-1 rounded-[2px] bg-n-200 mx-auto mt-3"
          aria-hidden
        />

        {(title || subtitle) && (
          <div className="px-5 pt-4 pb-2">
            {title && (
              <h4 className="m-0 text-lg font-semibold tracking-[-0.01em] text-n-950">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="m-0 mt-1 text-sm text-n-700">{subtitle}</p>
            )}
          </div>
        )}

        <div className="overflow-y-auto px-2 pb-4">{children}</div>
      </div>
    </div>
  );
}
