import { Section } from "./Section";

const shadows = [
  {
    name: "shadow-0",
    note: "Flat surface, default",
    style: { boxShadow: "none" },
  },
  {
    name: "shadow-1",
    note: "Subtle lift — cards on page",
    style: {
      boxShadow:
        "0 1px 2px rgba(26, 26, 26, 0.04), 0 1px 1px rgba(26, 26, 26, 0.03)",
    },
  },
  {
    name: "shadow-2",
    note: "Elevated — sticky bars, hover",
    style: {
      boxShadow:
        "0 2px 4px rgba(26, 26, 26, 0.05), 0 4px 12px rgba(26, 26, 26, 0.05)",
    },
  },
  {
    name: "shadow-3",
    note: "Modal, sheet, focused dialog",
    style: {
      boxShadow:
        "0 8px 24px rgba(26, 26, 26, 0.08), 0 2px 6px rgba(26, 26, 26, 0.05)",
    },
  },
];

export function ElevationSection() {
  return (
    <Section
      id="shadow"
      label="05 · Foundations"
      title="Elevation"
      description="Skygger er ekstremt subtile. Ingen 2010-aktige drop-shadows. Tre tier; bruk shadow-1 for kort, shadow-2 for klebrige bjelker, shadow-3 for modaler."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {shadows.map((s) => (
          <div key={s.name} className="flex flex-col gap-3">
            <div
              className="h-32 bg-bg-card rounded-card border border-n-100"
              style={s.style}
            />
            <div>
              <div className="text-sm font-medium text-n-950">{s.name}</div>
              <div className="text-xs text-n-500 mt-0.5">{s.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
