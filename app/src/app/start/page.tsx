import Link from "next/link";

type ScreenLink = {
  href: string;
  badge: string;
  title: string;
  sub: string;
  status: "live" | "preview" | "dev";
  primary?: boolean;
};

const screens: ScreenLink[] = [
  {
    href: "/onboarding",
    badge: "Start her",
    title: "Onboarding & Migration",
    sub: "Marits første 10 minutter — fra «velkommen» til publisert kennelside, med automatisk import fra eksisterende nettside.",
    status: "preview",
    primary: true,
  },
  {
    href: "/today",
    badge: "Daily driver",
    title: "Today Dashboard",
    sub: "Det første du ser hver morgen. Hilsen, vær, karma, og en prioritert feed av dagens vaksiner, søknader, frister og nyheter.",
    status: "preview",
  },
  {
    href: "/dog",
    badge: "Hund-detalj",
    title: "Astor av Granheim",
    sub: "6 faner inkludert helse, titler, stamtavle, bilder og notater. Inline-redigering overalt. Sparse / Memorial demo-tilstander.",
    status: "preview",
  },
  {
    href: "/pedigree",
    badge: "Focal navigation",
    title: "Stamtavle-utforsker",
    sub: "Trykk en hund for å re-sentrere. Tre generasjoner over, avkom og søsken under. Tastatur-navigasjon (↑ ← ↓ →).",
    status: "preview",
  },
  {
    href: "/litter",
    badge: "Revenue-side",
    title: "Kull C — Stars of the Fjord",
    sub: "5 valper med halsbåndsfarger og vekt-trender. 7 søknader i innboksen med match-indikatorer. Asymmetrisk matchmaking.",
    status: "preview",
  },
  {
    href: "/kennel",
    badge: "Front-stage",
    title: "Offentlig kennelside",
    sub: "Slik ser kjøpere og dommere Kennel Granheim. Filosofi, hundene våre, aktivt kull, resultater, minneside, kontakt.",
    status: "preview",
  },
  {
    href: "/styleguide",
    badge: "Designsystem",
    title: "Komponent-bibliotek",
    sub: "The Expert Trio palette + alle atomer + 6 mønstre. Brukes som visuell referanse mens vi bygger nye skjermer.",
    status: "dev",
  },
];

const statusLabel: Record<ScreenLink["status"], string> = {
  live: "Live",
  preview: "Sprint 3-9 forhåndsvisning",
  dev: "Utvikling",
};

const statusClass: Record<ScreenLink["status"], string> = {
  live: "bg-success-bg text-success-fg",
  preview: "bg-forest-50 text-forest-700",
  dev: "bg-n-100 text-n-700",
};

export default function Home() {
  const primary = screens.find((s) => s.primary);
  const others = screens.filter((s) => !s.primary);

  return (
    <div className="min-h-screen flex flex-col bg-bg-page">
      {/* Hero */}
      <section className="bg-bg-card border-b border-n-100">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12 md:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-forest-700 mb-5">
            DogWorld(tmp) · Sprint 3–9 forhåndsvisning
          </p>
          <h1 className="m-0 text-[40px] md:text-[56px] font-semibold tracking-[-0.025em] text-n-950 leading-[1.05] max-w-[20ch]">
            Kennel-verktøyet bygd for valpekassa, ikke skrivebordet.
          </h1>
          <p className="m-0 mt-5 text-lg text-n-700 max-w-[60ch] leading-relaxed">
            Mobil-først SaaS som erstatter slitne kennel-nettsider OG Excel-arket
            — én plattform, én sannhet. Velg en skjerm under for å gå rett inn i
            Kennel Granheim sin testverden.
          </p>
        </div>
      </section>

      {/* Primary CTA card */}
      {primary && (
        <section className="border-b border-n-100">
          <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8">
            <Link
              href={primary.href}
              className="block bg-gradient-to-br from-forest-700 to-forest-900 text-white rounded-card p-6 md:p-8 hover:from-forest-900 hover:to-forest-900 transition-all"
            >
              <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-warm-600 text-white text-[10px] font-mono uppercase tracking-[0.08em] mb-3">
                    {primary.badge}
                  </span>
                  <h2 className="m-0 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-tight">
                    {primary.title}
                  </h2>
                  <p className="m-0 mt-3 text-base text-forest-50/90 leading-relaxed max-w-[55ch]">
                    {primary.sub}
                  </p>
                </div>
                <span
                  className="text-3xl md:text-5xl flex-shrink-0 self-end"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Screens grid */}
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
          <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-4 px-1">
            Alle skjermer
          </h2>
          <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {others.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group h-full flex flex-col bg-bg-card border border-n-200 rounded-card p-5 hover:border-forest-500 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] hover:-translate-y-px transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.08em] font-mono text-forest-700">
                      {s.badge}
                    </span>
                    <span
                      className={
                        "text-[10px] uppercase tracking-[0.06em] font-mono px-1.5 py-0.5 rounded-full " +
                        statusClass[s.status]
                      }
                    >
                      {statusLabel[s.status]}
                    </span>
                  </div>
                  <h3 className="m-0 text-lg font-semibold tracking-[-0.005em] text-n-950 leading-snug">
                    {s.title}
                  </h3>
                  <p className="m-0 mt-2 text-sm text-n-700 leading-relaxed flex-1">
                    {s.sub}
                  </p>
                  <div className="mt-4 text-xs text-forest-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Åpne <span aria-hidden>→</span>
                    <span className="text-n-300 ml-2 font-mono">{s.href}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="border-t border-n-100 bg-bg-card">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 flex items-center justify-between flex-wrap gap-3 text-xs text-n-500">
          <span>
            Pre-MVP-scaffold for kennel-SaaS · ingen produksjonsdata, kun
            Granheim-test-universet
          </span>
          <span className="font-mono">
            Next.js 16 · Tailwind v4 · Cloudflare D1 (planlagt)
          </span>
        </div>
      </footer>
    </div>
  );
}
