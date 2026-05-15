"use client";

import { useOptimistic, useState, useTransition } from "react";
import { Tag } from "@/components/dogworld/Tag";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/dogworld/ToastProvider";
import { OfferPuppyModal } from "@/components/modals/OfferPuppyModal";
import { setApplicationStatus, offerPuppy } from "@/lib/actions/applications";
import type {
  ApplicationRow,
  ApplicationMatchRow,
  PuppyRow,
} from "@/db/schema";

type Status = ApplicationRow["status"];

type AppWithMatches = ApplicationRow & { matches: ApplicationMatchRow[] };

const statusVariant: Record<
  Status,
  "neutral" | "info" | "success" | "warning" | "error"
> = {
  NY: "info",
  I_SAMTALE: "neutral",
  GODKJENT: "success",
  TILBUDT_VALP: "warning",
  AVVIST: "error",
};

const matchDot: Record<"ok" | "warn" | "err", string> = {
  ok: "bg-success-dot",
  warn: "bg-warning-dot",
  err: "bg-error-dot",
};

const filters: { id: "all" | Status; label: string }[] = [
  { id: "all", label: "Alle" },
  { id: "NY", label: "Nye" },
  { id: "I_SAMTALE", label: "I samtale" },
  { id: "GODKJENT", label: "Godkjente" },
  { id: "TILBUDT_VALP", label: "Tilbudt valp" },
  { id: "AVVIST", label: "Avvist" },
];

const labelFor: Record<Status, string> = {
  NY: "NY",
  I_SAMTALE: "I SAMTALE",
  GODKJENT: "GODKJENT",
  TILBUDT_VALP: "TILBUDT VALP",
  AVVIST: "AVVIST",
};

export type ApplicationsInboxProps = {
  applications: AppWithMatches[];
  puppies: PuppyRow[];
  litterId: string;
};

export function ApplicationsInbox({
  applications,
  puppies,
  litterId,
}: ApplicationsInboxProps) {
  const showToast = useToast();
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [offerTo, setOfferTo] = useState<AppWithMatches | null>(null);
  const [, startTransition] = useTransition();

  // Optimistic state — user sees the new status instantly
  const [optimisticApps, applyOptimistic] = useOptimistic<
    AppWithMatches[],
    { id: string; status: Status; assignedPuppyId?: string }
  >(applications, (current, change) =>
    current.map((a) =>
      a.id === change.id
        ? {
            ...a,
            status: change.status,
            statusLabel: labelFor[change.status],
            assignedPuppyId:
              change.assignedPuppyId !== undefined
                ? change.assignedPuppyId
                : a.assignedPuppyId,
          }
        : a,
    ),
  );

  const visible =
    filter === "all"
      ? optimisticApps
      : optimisticApps.filter((a) => a.status === filter);

  function setStatus(app: AppWithMatches, status: Status, label: string) {
    startTransition(async () => {
      applyOptimistic({ id: app.id, status });
      try {
        await setApplicationStatus(app.id, status, litterId);
        showToast(label);
      } catch (err) {
        showToast(
          err instanceof Error ? err.message : "Kunne ikke oppdatere",
          "error",
        );
      }
    });
  }

  function handleOfferAccepted(puppyId: string) {
    if (!offerTo) return;
    const target = offerTo;
    setOfferTo(null);
    startTransition(async () => {
      applyOptimistic({
        id: target.id,
        status: "TILBUDT_VALP",
        assignedPuppyId: puppyId,
      });
      try {
        await offerPuppy(target.id, puppyId, litterId);
        const puppyName = puppies.find((p) => p.id === puppyId)?.name ?? puppyId;
        showToast(`Tilbud sendt til ${target.applicant}: ${puppyName}`);
      } catch (err) {
        showToast(
          err instanceof Error ? err.message : "Kunne ikke sende tilbud",
          "error",
        );
      }
    });
  }

  function puppyName(id?: string | null): string {
    if (!id) return "—";
    return puppies.find((p) => p.id === id)?.name ?? id;
  }

  return (
    <section>
      <header className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
          Søknader · {optimisticApps.length} totalt
        </h2>
        <div className="flex gap-1 overflow-x-auto -mx-1 px-1">
          {filters.map((f) => {
            const active = f.id === filter;
            const count =
              f.id === "all"
                ? optimisticApps.length
                : optimisticApps.filter((a) => a.status === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors flex-shrink-0 " +
                  (active
                    ? "bg-forest-700 text-white"
                    : "bg-bg-card border border-n-200 text-n-700 hover:border-n-300")
                }
              >
                {f.label}
                <span
                  className={
                    "font-mono text-[10px] " +
                    (active ? "text-forest-50/80" : "text-n-500")
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <ul className="m-0 p-0 list-none bg-bg-card border border-n-200 rounded-card divide-y divide-n-100 overflow-hidden">
        {visible.map((a) => (
          <li key={a.id}>
            <ApplicationRow
              application={a}
              puppyNameFor={puppyName}
              expanded={openId === a.id}
              onToggle={() => setOpenId(openId === a.id ? null : a.id)}
              onSetStatus={(status, label) => setStatus(a, status, label)}
              onOpenOffer={() => setOfferTo(a)}
            />
          </li>
        ))}
        {visible.length === 0 && (
          <li className="p-6 text-center text-sm text-n-500 italic">
            Ingen søknader i denne kategorien.
          </li>
        )}
      </ul>

      <OfferPuppyModal
        open={offerTo !== null}
        onClose={() => setOfferTo(null)}
        applicantName={offerTo?.applicant ?? ""}
        availablePuppies={puppies.filter(
          (p) => p.status === "tilgjengelig" || p.status === "tilbudt",
        )}
        onAccept={handleOfferAccepted}
      />
    </section>
  );
}

function ApplicationRow({
  application,
  puppyNameFor,
  expanded,
  onToggle,
  onSetStatus,
  onOpenOffer,
}: {
  application: AppWithMatches;
  puppyNameFor: (id?: string | null) => string;
  expanded: boolean;
  onToggle: () => void;
  onSetStatus: (status: Status, label: string) => void;
  onOpenOffer: () => void;
}) {
  const a = application;
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-n-50 transition-colors"
        aria-expanded={expanded}
      >
        <span
          className="w-9 h-9 rounded-full bg-forest-50 text-forest-700 grid place-items-center flex-shrink-0 font-medium text-sm"
          aria-hidden
        >
          {a.applicant.match(/\b\w/g)?.slice(0, 2).join("").toUpperCase() ??
            "?"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <div className="text-sm font-medium text-n-950">{a.applicant}</div>
            <Tag variant={statusVariant[a.status]} dot>
              {a.statusLabel}
            </Tag>
          </div>
          <div className="text-xs text-n-500 font-mono mt-0.5">
            {a.city} · mottatt {a.receivedAt}
            {a.assignedPuppyId && (
              <>
                <span className="text-n-300 mx-1.5">·</span>
                <span className="text-warning-fg">
                  Tilbudt {puppyNameFor(a.assignedPuppyId)}
                </span>
              </>
            )}
          </div>
          <p className="m-0 text-xs text-n-700 mt-1 leading-relaxed line-clamp-2">
            {a.summary}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {a.matches.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-1 text-[11px] text-n-700"
              >
                <span
                  className={
                    "w-1.5 h-1.5 rounded-full flex-shrink-0 " + matchDot[m.status]
                  }
                  aria-hidden
                />
                {m.label}
              </span>
            ))}
          </div>
        </div>
        <span
          className={
            "text-n-300 text-lg leading-none mt-1 flex-shrink-0 transition-transform " +
            (expanded ? "rotate-90" : "")
          }
          aria-hidden
        >
          ›
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 -mt-1 flex flex-col gap-3">
          <div className="bg-bg-page border border-n-100 rounded-card p-3 text-sm text-n-700 leading-relaxed">
            <strong className="font-medium text-n-950">
              Hvorfor de søker:
            </strong>{" "}
            {a.summary}
          </div>
          <div className="flex gap-2 flex-wrap">
            {a.status === "NY" && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onSetStatus("I_SAMTALE", "Samtale startet")}
                >
                  Start samtale
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetStatus("AVVIST", "Søknaden avvist")}
                >
                  Avvis høflig
                </Button>
              </>
            )}
            {a.status === "I_SAMTALE" && (
              <>
                <Button variant="primary" size="sm" onClick={onOpenOffer}>
                  Tilby valp
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onSetStatus("GODKJENT", "Markert som godkjent")
                  }
                >
                  Godkjenn
                </Button>
              </>
            )}
            {a.status === "GODKJENT" && a.assignedPuppyId && (
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  onSetStatus("TILBUDT_VALP", "Kontrakt-flow er på vei")
                }
              >
                Send kjøpskontrakt
              </Button>
            )}
            {a.status === "TILBUDT_VALP" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSetStatus("GODKJENT", "Påminnelse sendt")}
              >
                Send påminnelse
              </Button>
            )}
            {a.status === "AVVIST" && (
              <span className="text-xs text-n-500 italic">
                Søknaden er arkivert.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
