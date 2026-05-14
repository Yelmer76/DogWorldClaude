import { Section } from "./Section";
import { Card, FrameLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  EmptyState,
  SkeletonAvatar,
  SkeletonBlock,
  SkeletonLine,
  Toast,
  ConfirmDialog,
  BottomSheet,
} from "@/components/dogworld/Patterns";
import { LittersIcon } from "@/components/dogworld/Icons";

// ── 12 · Empty / loading / error states ────────────────────────────────────
export function EmptyLoadingErrorSection() {
  return (
    <Section
      id="empty"
      label="12 · Patterns"
      title="Empty, loading & error states"
      description="Empty-states gir oppdretteren ett åpenbart neste steg. Skeletons holder samme rytme som innholdet de erstatter — aldri en generisk tåke. Feilmeldinger forklares, ikke beklages."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Empty */}
        <div>
          <FrameLabel>Empty state · med CTA</FrameLabel>
          <EmptyState
            icon={<LittersIcon size={28} />}
            title="Ingen kull ennå"
            description="Når Bella er bekreftet drektig, registrer kullet for å starte tidslinjen og vaksine-påminnelsene."
            cta={<Button variant="primary">Registrer et kull</Button>}
          />
        </div>

        {/* Loading skeleton */}
        <div>
          <FrameLabel>Loading skeleton</FrameLabel>
          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <SkeletonAvatar />
                <div className="flex-1 flex flex-col gap-2">
                  <SkeletonLine width={60} />
                  <SkeletonLine width={40} />
                </div>
              </div>
              <SkeletonBlock />
              <SkeletonLine width={80} />
              <SkeletonLine width={60} />
            </div>
          </Card>
        </div>

        {/* Error */}
        <div>
          <FrameLabel>Feil-state · gjenopprettelig</FrameLabel>
          <Card
            className="!border-[#dec5c1] !bg-[#f6ece9]"
            style={{
              boxShadow:
                "0 1px 2px rgba(26, 26, 26, 0.04), 0 1px 1px rgba(26, 26, 26, 0.03)",
            }}
          >
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-card bg-error-bg text-error-fg grid place-items-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M12 8v5M12 17v.01" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Kunne ikke nå NKK</div>
                <p className="text-sm text-n-700 m-0 mt-0.5 mb-3">
                  Stamtavle-sync er pauset siden 09:12. Vi prøver videre — dine
                  lokale data er trygge.
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    Prøv igjen
                  </Button>
                  <Button variant="ghost" size="sm">
                    Vis detaljer
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

// ── 13 · Toast & confirmation dialog ───────────────────────────────────────
export function ToastDialogSection() {
  return (
    <Section
      id="toast"
      label="13 · Patterns"
      title="Toast & konfirmasjon-dialog"
      description="Toaster bekrefter en vellykket handling og forsvinner. Dialoger dukker bare opp for destruktive eller irreversible handlinger — aldri for å mase."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Toasts */}
        <div>
          <FrameLabel>Toaster</FrameLabel>
          <div className="bg-bg-page border border-n-200 rounded-card p-4 flex flex-col gap-3 items-start">
            <Toast tone="success" dismissible>
              Kull C lagret · DHPPi-1 påminnelse lagt til
            </Toast>
            <Toast tone="warning" dismissible>
              Astors HD-sertifikat utløper om 28 dager
            </Toast>
            <Toast tone="error" dismissible>
              Kunne ikke synkronisere med NKK · vi prøver videre
            </Toast>
          </div>
        </div>

        {/* Dialog */}
        <div>
          <FrameLabel>Konfirmasjon-dialog</FrameLabel>
          <div
            className="rounded-card p-12 grid place-items-center"
            style={{ background: "rgba(26, 26, 26, 0.32)" }}
          >
            <ConfirmDialog
              title="Fjerne Astor av Granheim?"
              body={
                <>
                  Astor fjernes fra stamboken din. Stamtavle-referanser i
                  eksisterende kull beholdes. Dette kan ikke angres.
                </>
              }
              confirmLabel="Fjern hund"
              cancelLabel="Behold"
              destructive
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── 14 · Bottom sheet ───────────────────────────────────────────────────────
export function SheetSection() {
  return (
    <Section
      id="sheet"
      label="14 · Patterns"
      title="Bottom sheet"
      description="Mobil-naturlig velger. Bruk for korte valglister og raske handlinger. Tre til syv elementer — over det blir det en liste-visning, ikke et ark."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[375px_minmax(0,1fr)] gap-6 items-start">
        <div>
          <FrameLabel>Bottom sheet · 375</FrameLabel>
          <div
            className="w-[375px] max-w-full border border-n-200 rounded-[24px] overflow-hidden pt-20"
            style={{ background: "rgba(26, 26, 26, 0.32)" }}
          >
            <BottomSheet
              title="Legg til på Astors profil"
              options={[
                {
                  label: "Helse-test-resultat",
                  hint: <span>HD · ED · Øyne</span>,
                },
                { label: "Utstillings-resultat" },
                { label: "Bilde" },
                { label: "Notat" },
                { label: "Pensjoner fra avl", destructive: true },
              ]}
            />
          </div>
        </div>

        <div>
          <FrameLabel>Notater</FrameLabel>
          <div
            className="bg-info-bg text-info-fg border border-info-dot/30 rounded-card p-4 flex gap-3 items-start"
          >
            <span className="text-info-fg flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 17v.01" />
              </svg>
            </span>
            <div className="text-sm">
              <b className="text-n-950 font-medium">
                Sheet-høyden er innholds-drevet.
              </b>{" "}
              Opp til 60 % viewport, så scroller den. Aldri skyv arket over
              top safe-area; brukeren skal alltid se kontekst over.
            </div>
          </div>
          <Card className="mt-4">
            <ul className="m-0 pl-5 text-sm text-n-700 flex flex-col gap-2 list-disc">
              <li>
                Dim-bakgrunn er <code className="font-mono text-xs">rgba(26,26,26,0.32)</code>.
              </li>
              <li>
                Grabber: 36×4, neutral-200. Alltid til stede på dragbare ark.
              </li>
              <li>
                Destruktive elementer ligger sist, atskilt visuelt kun med farge.
              </li>
              <li>Trykk utenfor eller på grabber-en lukker arket.</li>
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
