"use client";

/**
 * SparseBanner — shown above tab content when the dog record is freshly
 * created with minimal data. Encourages the breeder to scan the paper
 * pedigree to unlock pedigree + health features.
 */
import { useToast } from "@/components/dogworld/ToastProvider";

export function SparseBanner() {
  const showToast = useToast();
  return (
    <div className="bg-[#f7eddc] border border-warm-600/30 rounded-card px-4 py-3 flex items-start md:items-center gap-3 flex-col md:flex-row">
      <div className="flex items-start gap-3 flex-1">
        <span
          className="w-8 h-8 rounded-md bg-bg-card text-warm-600 grid place-items-center flex-shrink-0"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8v5M12 16h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
        <p className="m-0 text-sm text-n-950 leading-snug">
          Fyll inn flere detaljer for å aktivere stamtavle- og
          helsefunksjoner.
        </p>
      </div>
      <button
        type="button"
        onClick={() => showToast("→ Skann papirstamtavle", "info")}
        className="self-stretch md:self-auto inline-flex items-center justify-center gap-1 px-3 py-2 rounded-btn text-sm font-medium bg-bg-card border border-warm-600/40 text-warm-600 hover:bg-warm-600 hover:text-white transition-colors flex-shrink-0"
      >
        Skann papirstamtavle →
      </button>
    </div>
  );
}
