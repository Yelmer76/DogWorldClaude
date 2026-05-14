import { Section } from "./Section";

const spaces = [
  { px: 4, label: "s-1 · 4" },
  { px: 8, label: "s-2 · 8" },
  { px: 12, label: "s-3 · 12" },
  { px: 16, label: "s-4 · 16" },
  { px: 24, label: "s-6 · 24" },
  { px: 32, label: "s-8 · 32" },
  { px: 48, label: "s-12 · 48" },
  { px: 64, label: "s-16 · 64" },
];

export function SpacingSection() {
  return (
    <Section
      id="spacing"
      label="03 · Foundations"
      title="Spacing & layout"
      description="4px base. De fleste grensesnitt sitter på 8 / 16 / 24. Generøs whitespace er ikke-forhandlingsbart — bakkontoret må føles rolig i uke 4, ikke proppet."
    >
      <div className="bg-bg-card border border-n-200 rounded-card p-6 flex flex-wrap gap-6 items-end">
        {spaces.map((s) => (
          <div key={s.px} className="flex flex-col items-center gap-3">
            <div
              className="bg-forest-700 rounded-tag"
              style={{ width: s.px, height: s.px }}
            />
            <div className="text-xs text-n-500 font-mono whitespace-nowrap">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
