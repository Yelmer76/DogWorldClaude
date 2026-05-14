import { Section } from "./Section";

const radii = [
  { radius: "4px", label: "r-tag · 4" },
  { radius: "6px", label: "r-btn · 6" },
  { radius: "8px", label: "r-card · 8" },
  { radius: "999px", label: "r-pill · 999" },
];

export function RadiusSection() {
  return (
    <Section
      id="radius"
      label="04 · Foundations"
      title="Radius"
      description="Avrundet, aldri tegneserieaktig. 4 for tags, 6 for knapper og inputs, 8 for kort. Pills for tab-indikatorer og chips."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {radii.map((r) => (
          <div
            key={r.radius}
            className="bg-bg-card border border-n-200 rounded-card p-6 flex flex-col items-center gap-3"
          >
            <div
              className="w-20 h-20 bg-forest-700"
              style={{ borderRadius: r.radius }}
            />
            <div className="text-xs text-n-500 font-mono">{r.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
