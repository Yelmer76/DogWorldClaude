"use client";

import { useState } from "react";
import { Sparkline } from "@/components/dogworld/Sparkline";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/dogworld/ToastProvider";
import { VetBookingModal } from "@/components/modals/VetBookingModal";
import type { FeedCard as FeedCardData, FeedCardKind } from "./todayData";

const kindAccent: Record<FeedCardKind, string> = {
  urgent: "border-l-error-fg",
  "hero-litter": "border-l-forest-700",
  neutral: "border-l-n-300",
  positive: "border-l-success-fg",
  deadline: "border-l-warning-fg",
  news: "border-l-info-fg",
};

const kindIconBg: Record<FeedCardKind, string> = {
  urgent: "bg-error-bg text-error-fg",
  "hero-litter": "bg-forest-50 text-forest-700",
  neutral: "bg-n-50 text-n-700",
  positive: "bg-success-bg text-success-fg",
  deadline: "bg-warning-bg text-warning-fg",
  news: "bg-info-bg text-info-fg",
};

const kindLabel: Record<FeedCardKind, string> = {
  urgent: "Haster",
  "hero-litter": "Kullet ditt",
  neutral: "Til oppfølging",
  positive: "Godt nytt",
  deadline: "Frist",
  news: "Bransje-nyhet",
};

export function FeedCard({ card }: { card: FeedCardData }) {
  const showToast = useToast();
  const [open, setOpen] = useState(card.kind === "hero-litter");
  const [vetOpen, setVetOpen] = useState(false);

  const actions = card.actions ?? (card.action ? [card.action] : []);

  function handleAction(label: string) {
    if (label.startsWith("Bestill veterinærtime")) {
      setVetOpen(true);
      return;
    }
    showToast(`→ ${label}`, "info");
  }

  return (
    <article
      className={
        "bg-bg-card border border-n-200 border-l-4 rounded-card overflow-hidden transition-shadow hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] " +
        kindAccent[card.kind]
      }
    >
      <div className="p-4 flex gap-3">
        <span
          className={
            "w-9 h-9 rounded-md grid place-items-center flex-shrink-0 " +
            kindIconBg[card.kind]
          }
          aria-hidden
        >
          <FeedIcon kind={card.icon} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.06em] font-mono text-n-500 mb-1 flex items-center gap-2">
            <span>{kindLabel[card.kind]}</span>
            {card.dog && (
              <>
                <span aria-hidden>·</span>
                <span className="text-n-700 normal-case tracking-normal font-sans">
                  {card.dog}
                </span>
              </>
            )}
          </div>
          <h3 className="m-0 text-[15px] font-semibold tracking-[-0.005em] text-n-950 leading-snug">
            {card.headline}
          </h3>
          <p className="m-0 mt-1 text-sm text-n-700">{card.sub}</p>

          {card.puppies && card.puppies.length > 0 && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {card.puppies.map((p) => (
                <div
                  key={p.name}
                  className="bg-bg-page border border-n-100 rounded-card p-2"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-medium text-n-950 truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] font-mono text-n-500">
                      {p.sex === "m" ? "♂" : "♀"}
                    </span>
                  </div>
                  <Sparkline
                    data={p.trend}
                    width={120}
                    height={28}
                    className="w-full"
                    showLastPoint={false}
                  />
                  <div className="text-[11px] font-mono text-n-700 mt-1">
                    {p.weight.toFixed(1)} kg
                  </div>
                </div>
              ))}
            </div>
          )}

          {open && (
            <div className="mt-3 pt-3 border-t border-n-100">
              <p className="m-0 text-sm text-n-700 leading-relaxed">
                {card.expand.summary}
              </p>
              {card.expand.detail && (
                <ul className="m-0 mt-3 p-0 list-none flex flex-col gap-1.5">
                  {card.expand.detail.map(([label, value]) => (
                    <li
                      key={label}
                      className="flex items-baseline justify-between text-xs"
                    >
                      <span className="text-n-500">{label}</span>
                      <span className="text-n-950 text-right">{value}</span>
                    </li>
                  ))}
                </ul>
              )}
              {card.expand.tasksToday && (
                <ul className="m-0 mt-3 p-0 list-none flex flex-col gap-1.5">
                  {card.expand.tasksToday.map((t) => {
                    const done = /\(gjort\)$/.test(t);
                    return (
                      <li
                        key={t}
                        className="flex items-center gap-2 text-xs text-n-700"
                      >
                        <span
                          className={
                            "w-3.5 h-3.5 rounded-sm border flex-shrink-0 grid place-items-center " +
                            (done
                              ? "bg-forest-700 border-forest-700 text-white"
                              : "bg-bg-card border-n-300")
                          }
                          aria-hidden
                        >
                          {done && (
                            <svg
                              viewBox="0 0 12 8"
                              width="8"
                              height="5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="1,4 4,7 11,1" />
                            </svg>
                          )}
                        </span>
                        <span className={done ? "line-through text-n-500" : ""}>
                          {t}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {actions.map((a) => (
                <Button
                  key={a.label}
                  variant={a.primary ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleAction(a.label)}
                >
                  {a.label}
                </Button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-xs text-forest-700 hover:text-forest-900 inline-flex items-center gap-1 px-1 py-0.5"
              aria-expanded={open}
            >
              {open ? "Lukk detaljer" : "Vis detaljer"}
              <span
                className={
                  "transition-transform " + (open ? "rotate-180" : "")
                }
                aria-hidden
              >
                ⌄
              </span>
            </button>
          </div>
        </div>
      </div>

      <VetBookingModal
        open={vetOpen}
        onClose={() => setVetOpen(false)}
        subject={card.dog}
        defaultReason={card.headline}
      />
    </article>
  );
}

function FeedIcon({ kind }: { kind: FeedCardData["icon"] }) {
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
    case "syringe":
      return (
        <svg {...common}>
          <path d="M14 4l6 6M3 21l6-6M9 15l6-6 4 4-6 6zM13 11l-2-2" />
        </svg>
      );
    case "paw":
      return (
        <svg {...common}>
          <circle cx="6" cy="9" r="1.6" />
          <circle cx="10" cy="6" r="1.6" />
          <circle cx="14" cy="6" r="1.6" />
          <circle cx="18" cy="9" r="1.6" />
          <path d="M7 17c0-3 2-5 5-5s5 2 5 5-2 4-5 4-5-1-5-4z" />
        </svg>
      );
    case "envelope":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 8l9 6 9-6" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
          <path d="M7 5H4v3a3 3 0 0 0 3 3M17 5h3v3a3 3 0 0 1-3 3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "newspaper":
      return (
        <svg {...common}>
          <path d="M4 5h13v15H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2h-1" />
          <path d="M7 9h7M7 13h7M7 17h4" />
        </svg>
      );
  }
}
