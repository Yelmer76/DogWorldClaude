import { Section, SubHead } from "./Section";
import { Button, type ButtonState, type ButtonVariant } from "@/components/ui/Button";

const states: { key: ButtonState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "active", label: "Active" },
  { key: "disabled", label: "Disabled" },
  { key: "loading", label: "Loading" },
];

const rows: {
  variant: ButtonVariant;
  label: string;
  text: string;
  loadingText?: string;
}[] = [
  { variant: "primary", label: "Primary", text: "Lagre kull", loadingText: "Lagrer…" },
  { variant: "secondary", label: "Secondary", text: "Legg til notat", loadingText: "Legger til…" },
  { variant: "destructive", label: "Destructive", text: "Fjern hund", loadingText: "Fjerner…" },
  { variant: "ghost", label: "Ghost", text: "Se stamtavle", loadingText: "Laster…" },
];

const moreIcon = (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden
  >
    <circle cx="5" cy="12" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="19" cy="12" r="1.4" />
  </svg>
);

export function ButtonsSection() {
  return (
    <Section
      id="buttons"
      label="06 · Components"
      title="Buttons"
      description="Deep navy bærer den tunge lasten. Primær-handlinger får navy med hvit tekst; alt annet trekker seg unna. Secondary arver kort-overflaten, ghost plukker opp sage-grønn, destructive er en muted brick — aldri brannbil-rød."
    >
      <div className="bg-bg-card border border-n-200 rounded-card p-4 overflow-x-auto">
        <div className="grid grid-cols-[110px_repeat(5,minmax(0,1fr))] gap-3 items-center min-w-[680px]">
          {/* Header row */}
          <div />
          {states.map((s) => (
            <div
              key={s.key}
              className="text-xs text-n-500 font-medium uppercase tracking-[0.06em]"
            >
              {s.label}
            </div>
          ))}

          {/* Variant rows */}
          {rows.map((r) => (
            <ButtonRow key={r.variant} row={r} />
          ))}

          {/* Icon variant — uses icon button */}
          <div className="text-sm text-n-700 font-medium">Icon</div>
          {states.map((s) => (
            <div key={s.key}>
              <Button variant="icon" state={s.key} aria-label="Mer">
                {s.key === "loading" ? null : moreIcon}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <SubHead>Sizes</SubHead>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="sm">
          Liten · S
        </Button>
        <Button variant="primary" size="md">
          Default · M
        </Button>
        <Button variant="primary" size="lg">
          Stor · L
        </Button>
      </div>
    </Section>
  );
}

function ButtonRow({
  row,
}: {
  row: { variant: ButtonVariant; label: string; text: string; loadingText?: string };
}) {
  return (
    <>
      <div className="text-sm text-n-700 font-medium">{row.label}</div>
      {states.map((s) => (
        <div key={s.key}>
          <Button variant={row.variant} state={s.key}>
            {s.key === "loading" ? row.loadingText ?? "Laster…" : row.text}
          </Button>
        </div>
      ))}
    </>
  );
}
