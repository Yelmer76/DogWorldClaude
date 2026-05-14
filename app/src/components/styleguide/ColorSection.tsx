import { Section, SubHead } from "./Section";

type Brand = {
  name: string;
  sub: string;
  hex: string;
  note: string;
  bgClass: string;
  border?: boolean;
};

const brand: Brand[] = [
  {
    name: "Sage Forest",
    sub: "/ Primary",
    hex: "#3F5A55",
    note: "Trust & calm — brand, nav, focus rings",
    bgClass: "bg-forest-700",
  },
  {
    name: "Deep Navy",
    sub: "/ Action",
    hex: "#1C3245",
    note: "Professional & strong — buttons, badges",
    bgClass: "bg-ochre-600",
  },
  {
    name: "Warm Oatmeal",
    sub: "/ Page",
    hex: "#F5F2ED",
    note: "Hyggelig — app background, scroll surface",
    bgClass: "bg-bg-page",
    border: true,
  },
  {
    name: "Card",
    sub: "",
    hex: "#FFFFFF",
    note: "Elevated content, modals, inputs",
    bgClass: "bg-bg-card",
    border: true,
  },
];

const neutrals: { hex: string; label: string }[] = [
  { hex: "#F5F2ED", label: "page" },
  { hex: "#EFEBE2", label: "50" },
  { hex: "#EBE7DE", label: "100" },
  { hex: "#DCD8CF", label: "200" },
  { hex: "#C4C0B7", label: "300" },
  { hex: "#9A9A9A", label: "500 · tertiary" },
  { hex: "#5D5D5D", label: "700 · secondary" },
  { hex: "#1A1A1A", label: "950 · primary" },
];

const states = [
  {
    title: "Success",
    bg: "#E3EDE2",
    fg: "#3D6B46",
    dotClass: "bg-success-dot",
    bgClass: "bg-success-bg",
    fgClass: "text-success-fg",
    example: "Litter registered",
  },
  {
    title: "Warning",
    bg: "#F3E6CC",
    fg: "#8A5A1A",
    dotClass: "bg-warning-dot",
    bgClass: "bg-warning-bg",
    fgClass: "text-warning-fg",
    example: "Vaccination due in 4d",
  },
  {
    title: "Error",
    bg: "#EDD6D2",
    fg: "#8A3F3A",
    dotClass: "bg-error-dot",
    bgClass: "bg-error-bg",
    fgClass: "text-error-fg",
    example: "Health test expired",
  },
  {
    title: "Info",
    bg: "#DDE4EC",
    fg: "#41617F",
    dotClass: "bg-info-dot",
    bgClass: "bg-info-bg",
    fgClass: "text-info-fg",
    example: "Show entry confirmed",
  },
];

export function ColorSection() {
  return (
    <Section
      id="color"
      label="01 · Foundations"
      title="Color"
      description="Sage forest for trust and craft, deep navy for action and credentials. The page sits on warm oatmeal so cards (pure white) gently lift. State colors are deliberately muted — a working back-office, not a vet clinic alarm panel."
      first
    >
      <SubHead>Brand</SubHead>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {brand.map((b) => (
          <div
            key={b.hex}
            className="bg-bg-card border border-n-200 rounded-card overflow-hidden"
          >
            <div
              className={`h-24 ${b.bgClass} ${b.border ? "border-b border-n-100" : ""}`}
            />
            <div className="p-3 px-4 flex flex-col gap-0.5">
              <div className="text-sm font-medium">
                {b.name}
                {b.sub && (
                  <span className="text-n-500 font-normal"> {b.sub}</span>
                )}
              </div>
              <div className="font-mono text-xs text-n-500">{b.hex}</div>
              <div className="text-xs text-n-700 mt-0.5">{b.note}</div>
            </div>
          </div>
        ))}
      </div>

      <SubHead>Neutrals — warm grey scale</SubHead>
      <div className="grid grid-cols-4 lg:grid-cols-8 border border-n-200 rounded-card overflow-hidden bg-bg-card">
        {neutrals.map((n) => (
          <div key={n.hex} className="p-4 flex flex-col gap-3">
            <div
              className="h-14 rounded-tag border border-black/[0.04]"
              style={{ background: n.hex }}
            />
            <div>
              <div className="text-xs text-n-700 font-medium">{n.label}</div>
              <div className="font-mono text-xs text-n-500">{n.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <SubHead>State — muted Nordic</SubHead>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {states.map((s) => (
          <div
            key={s.title}
            className="bg-bg-card border border-n-200 rounded-card p-4"
          >
            <div className="flex items-center text-sm font-medium mb-2">
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block mr-2 ${s.dotClass}`}
              />
              {s.title}
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-n-500">
              <span className="text-n-700">Background</span>
              <span>{s.bg}</span>
              <span className="text-n-700">Foreground</span>
              <span>{s.fg}</span>
            </div>
            <div
              className={`mt-3 inline-flex items-center rounded-tag px-2.5 py-1.5 text-xs font-medium ${s.bgClass} ${s.fgClass}`}
            >
              {s.example}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
