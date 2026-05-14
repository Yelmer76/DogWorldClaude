import { Section, SubHead } from "./Section";

const weights = [
  { weight: 400, label: "Regular · 400" },
  { weight: 500, label: "Medium · 500" },
  { weight: 600, label: "Semibold · 600" },
  { weight: 700, label: "Bold · 700" },
];

type TypeRow = {
  px: number;
  lh: number;
  ls?: string;
  weight?: number;
  color?: string;
  sample: string;
  usageBold: string;
  usageRest: string;
};

const scale: TypeRow[] = [
  {
    px: 48,
    lh: 1.05,
    ls: "-0.025em",
    weight: 600,
    sample: "Kennel Granheim",
    usageBold: "Display",
    usageRest: "Kennel hero, marketing",
  },
  {
    px: 36,
    lh: 1.1,
    ls: "-0.02em",
    weight: 600,
    sample: "Litter C — “Stars of the Fjord”",
    usageBold: "H1",
    usageRest: "Page titles",
  },
  {
    px: 30,
    lh: 1.15,
    ls: "-0.015em",
    weight: 600,
    sample: "I dag, 14. mai",
    usageBold: "H2",
    usageRest: "Section titles",
  },
  {
    px: 24,
    lh: 1.2,
    ls: "-0.01em",
    weight: 600,
    sample: "Helse og sertifiseringer",
    usageBold: "H3",
    usageRest: "Card titles",
  },
  {
    px: 20,
    lh: 1.3,
    ls: "-0.005em",
    weight: 600,
    sample: "NUCH Astor av Granheim",
    usageBold: "H4",
    usageRest: "List item titles",
  },
  {
    px: 18,
    lh: 1.4,
    color: "var(--color-n-700)",
    sample:
      "Bella vom Schwarzwald er i uke 4 — øynene har åpnet seg, første vet-besøk på fredag.",
    usageBold: "Lead",
    usageRest: "Intros, callouts",
  },
  {
    px: 16,
    lh: 1.5,
    sample:
      "Valpekassa har vært stille siden 03-veiingen. Bella flyttet kullet til bakre hjørne — typisk for uke 4.",
    usageBold: "Body",
    usageRest: "Default text",
  },
  {
    px: 14,
    lh: 1.5,
    color: "var(--color-n-700)",
    sample:
      "Uke 4 · 5 valper · far NUCH Astor av Granheim · mor Bella vom Schwarzwald",
    usageBold: "Body S",
    usageRest: "Meta lines, dense rows",
  },
];

export function TypographySection() {
  return (
    <Section
      id="typography"
      label="02 · Foundations"
      title="Typography"
      description="Inter overalt — én familie, ingen serifer. Display-størrelser for kennelnavn og kull-headlines; body-størrelser for arbeidsdensitet i bakkontoret. Tall- og sertifikat-data ligger i JetBrains Mono så HD-score og datoer linjerer rent."
    >
      <SubHead>Vekter</SubHead>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {weights.map((w) => (
          <div
            key={w.weight}
            className="bg-bg-card border border-n-200 rounded-card p-4"
          >
            <div
              className="text-3xl tracking-[-0.02em]"
              style={{ fontWeight: w.weight }}
            >
              Granheim
            </div>
            <div className="text-xs text-n-500 mt-2 font-mono">{w.label}</div>
          </div>
        ))}
      </div>

      <SubHead>Type-skala</SubHead>
      <div>
        {scale.map((row, i) => (
          <div
            key={row.px}
            className={
              "grid grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr_220px] items-baseline py-4 gap-6 " +
              (i === 0 ? "" : "border-t border-n-100")
            }
          >
            <div className="font-mono text-xs text-n-500">
              {row.px} / {row.lh}
            </div>
            <div
              className="text-n-950"
              style={{
                fontSize: `${row.px}px`,
                fontWeight: row.weight ?? 400,
                letterSpacing: row.ls,
                lineHeight: row.lh,
                color: row.color,
              }}
            >
              {row.sample}
            </div>
            <div className="text-xs text-n-500 lg:text-right hidden lg:block">
              <b className="text-n-700 font-medium">{row.usageBold}</b>
              <br />
              {row.usageRest}
            </div>
          </div>
        ))}
      </div>

      <SubHead>JetBrains Mono — credentials, dates, numerical data</SubHead>
      <div className="bg-bg-card border border-n-200 rounded-card p-6 font-mono">
        <div className="text-base text-n-950">
          NO12345/22 · microchip 578077000123456
        </div>
        <div className="text-sm text-n-700 mt-2">
          HD: A (FCI) · ED: 0 · DM: N/N · prcd-PRA: N/N
        </div>
        <div className="text-xs text-n-500 mt-2 uppercase tracking-[0.06em]">
          Sist oppdatert 14. mai · 09:42
        </div>
      </div>
    </Section>
  );
}
