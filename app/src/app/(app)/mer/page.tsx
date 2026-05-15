import Link from "next/link";
import { granheim } from "@/data/universe";
import { Tag } from "@/components/dogworld/Tag";
import { AppHeader } from "@/components/shell/AppHeader";
import { getCurrentUser } from "@/lib/auth";

type MerLink = {
  href: string;
  label: string;
  sub?: string;
  badge?: { text: string; tone: "warning" | "success" | "info" | "neutral" };
};

type MerSection = {
  title: string;
  items: MerLink[];
};

export default async function MerPage() {
  const user = await getCurrentUser();
  const initial = (user?.name?.match(/\b\w/g) ?? [user?.email?.[0] ?? "?"])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sections: MerSection[] = [
    {
      title: "Kennelen din",
      items: [
        {
          href: "/kennel",
          label: "Offentlig kennelside",
          sub: "Slik ser kjøpere og dommere kennelen din",
        },
        {
          href: "/onboarding",
          label: "Kjør onboarding på nytt",
          sub: "Importer fra et annet nettsted, prøv ny mal",
        },
        {
          href: "/mer/etikk",
          label: "Etikk-erklæring",
          sub: "Bekreft hvert annet måned for +50 karma",
          badge: { text: "Mangler", tone: "warning" },
        },
      ],
    },
    {
      title: "Profil og tilgang",
      items: [
        {
          href: "/mer",
          label: "Min profil",
          sub: `${user?.name ?? "Ukjent"} · ${user?.email ?? ""}`,
        },
        {
          href: "/mer",
          label: "Innloggings-metoder",
          sub: "Magic link · passkey + 2FA kommer Sprint 16",
        },
        { href: "/mer", label: "Inviter samarbeidspartner" },
      ],
    },
    {
      title: "Karma og utmerkelser",
      items: [
        {
          href: "/mer",
          label: "Karma-historikk",
          sub: "Sølv-tier · 2 850 poeng totalt",
          badge: { text: "+50 i dag", tone: "success" },
        },
        { href: "/mer", label: "Etiske utmerkelser" },
      ],
    },
    {
      title: "Utvikler",
      items: [
        {
          href: "/styleguide",
          label: "Designsystem",
          sub: "Komponent-bibliotek",
        },
        {
          href: "/start",
          label: "Sprint-galleri",
          sub: "Sprint 3-9 oversikt med skjermbeskrivelser",
        },
      ],
    },
    {
      title: "Konto",
      items: [
        { href: "/mer", label: "Personvern og data" },
        { href: "/mer", label: "Hjelp og kontakt" },
        {
          href: "/auth/logout",
          label: "Logg ut",
          sub: user?.email,
        },
      ],
    },
  ];

  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-8 py-5 md:py-8 flex flex-col gap-6 max-w-[640px] w-full mx-auto">
        {/* Profile chip */}
        <div className="bg-bg-card border border-n-200 rounded-card p-4 flex items-center gap-3">
          <span
            aria-hidden
            className="w-12 h-12 rounded-full bg-forest-50 text-forest-700 grid place-items-center font-medium text-lg"
          >
            {initial}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold text-n-950 leading-tight">
              {user?.name ?? "Ukjent bruker"}
            </div>
            <div className="text-xs text-n-500 mt-0.5">
              {granheim.name} · {granheim.city}
            </div>
          </div>
          <Tag variant="forest" dot>
            Sølv
          </Tag>
        </div>

        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-[10px] uppercase tracking-[0.08em] font-mono font-medium text-n-500 m-0 mb-2 px-1">
              {section.title}
            </h2>
            <ul className="m-0 p-0 list-none bg-bg-card border border-n-200 rounded-card divide-y divide-n-100 overflow-hidden">
              {section.items.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-n-50 transition-colors text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-n-950">
                        {item.label}
                      </div>
                      {item.sub && (
                        <div className="text-xs text-n-500 mt-0.5">
                          {item.sub}
                        </div>
                      )}
                    </div>
                    {item.badge && (
                      <Tag variant={item.badge.tone} dot>
                        {item.badge.text}
                      </Tag>
                    )}
                    <span aria-hidden className="text-n-300">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-xs text-n-500 text-center pt-2 pb-4 font-mono">
          DogWorld(tmp) · pre-MVP · v0.1
        </p>
      </div>
    </>
  );
}
