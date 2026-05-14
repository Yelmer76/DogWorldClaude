import { Section } from "./Section";
import { FrameLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import {
  MobileTopBar,
  MobileTabBar,
  DesktopSideNav,
  type MobileTab,
  type SideNavGroup,
} from "@/components/dogworld/Nav";
import {
  HomeIcon,
  DogsIcon,
  LittersIcon,
  InboxIcon,
  KennelIcon,
  CalendarIcon,
  PedigreeIcon,
  HealthIcon,
  GlobeIcon,
  NewsIcon,
  BuyerPortalIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/dogworld/Icons";

const mobileTabs: MobileTab[] = [
  { key: "today", label: "I dag", icon: <HomeIcon /> },
  { key: "dogs", label: "Hunder", icon: <DogsIcon /> },
  { key: "litters", label: "Kull", icon: <LittersIcon /> },
  { key: "inbox", label: "Innboks", icon: <InboxIcon />, notif: true },
  { key: "kennel", label: "Kennel", icon: <KennelIcon /> },
];

const desktopGroups: SideNavGroup[] = [
  {
    group: "Daglig",
    items: [
      { key: "today", label: "I dag", icon: <HomeIcon size={16} /> },
      { key: "calendar", label: "Kalender", icon: <CalendarIcon size={16} /> },
      { key: "inbox", label: "Innboks", icon: <InboxIcon size={16} />, count: 5 },
    ],
  },
  {
    group: "Stambok",
    items: [
      { key: "dogs", label: "Hunder", icon: <DogsIcon size={16} />, count: 24, countMuted: true },
      { key: "pedigrees", label: "Stamtavler", icon: <PedigreeIcon size={16} /> },
      { key: "litters", label: "Kull", icon: <LittersIcon size={16} />, count: 3, countMuted: true },
      { key: "health", label: "Helse", icon: <HealthIcon size={16} /> },
    ],
  },
  {
    group: "Offentlig",
    items: [
      { key: "kennel-page", label: "Kennelside", icon: <GlobeIcon size={16} /> },
      { key: "news", label: "Nyheter", icon: <NewsIcon size={16} /> },
      { key: "buyer-portal", label: "Kjøperportal", icon: <BuyerPortalIcon size={16} /> },
    ],
  },
];

export function NavMobileSection() {
  return (
    <Section
      id="nav-mobile"
      label="10 · Navigation"
      title="Mobil — topp-bjelke & bunn-tabs"
      description="Bunn-tabs er ryggraden; dashbordet, hundene, kullene og innboksen ligger en tommel unna. Topp-bjelken bærer skjerm-tittelen og én kontekstuell handling."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[375px_minmax(0,1fr)] gap-6 items-start">
        <div>
          <FrameLabel>Mobil · 375</FrameLabel>
          <div className="w-[375px] max-w-full bg-bg-page rounded-[24px] overflow-hidden border border-n-200 shadow-[0_2px_4px_rgba(26,26,26,0.05),0_4px_12px_rgba(26,26,26,0.05)]">
            <MobileTopBar
              left={
                <Button variant="icon" aria-label="Tilbake" className="!w-8 !h-8">
                  <ChevronLeftIcon />
                </Button>
              }
              title="I dag"
              right={
                <Button
                  variant="icon"
                  aria-label="Varsler"
                  className="!w-8 !h-8 relative"
                >
                  <BellIcon size={16} />
                </Button>
              }
            />
            <div className="p-4 flex flex-col gap-3 min-h-[180px]">
              <div className="bg-bg-card border border-n-200 rounded-card p-3.5 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
                <p className="text-[11px] uppercase tracking-[0.06em] font-medium text-n-500 mb-1.5">
                  Uke 4 · Kull C
                </p>
                <div className="font-semibold">Første myk-mat-test i dag</div>
                <div className="text-xs text-n-500 mt-0.5">
                  Bella vom Schwarzwald · 5 valper
                </div>
              </div>
              <div className="bg-bg-card border border-n-200 rounded-card p-3.5 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
                <p className="text-[11px] uppercase tracking-[0.06em] font-medium text-n-500 mb-1.5">
                  I morgen
                </p>
                <div className="font-semibold">DHPPi-1 påminnelse · 14:00</div>
                <div className="text-xs text-n-500 mt-0.5">
                  Veterinærklinikken Lillehammer
                </div>
              </div>
            </div>
            <MobileTabBar tabs={mobileTabs} activeKey="today" />
          </div>
        </div>

        <div>
          <FrameLabel>Anatomi</FrameLabel>
          <div className="bg-bg-card border border-n-200 rounded-card p-4 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
            <ul className="m-0 pl-5 text-sm text-n-700 flex flex-col gap-2 list-disc">
              <li>
                <b className="text-n-950 font-medium">Topp-bjelke — 56 px.</b>{" "}
                Tittel sentrert; venstre slot for tilbake / meny; høyre slot
                for én kontekstuell ikon. Ikke mer.
              </li>
              <li>
                <b className="text-n-950 font-medium">
                  Bunn-tabs — 64 px inkl. safe-area.
                </b>{" "}
                Fem faste destinasjoner; aktiv tilstand bruker sage-grønn,
                aldri navy. Navy er for handlinger, ikke navigasjon.
              </li>
              <li>
                <b className="text-n-950 font-medium">Trykk-mål — minst 44 px.</b>{" "}
                Tabs er 64 × 64 effektive.
              </li>
              <li>
                <b className="text-n-950 font-medium">Varsler-prikk — navy.</b>{" "}
                Bare på Innboks-tab og bjelle-ikon.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function NavDesktopSection() {
  return (
    <Section
      id="nav-desktop"
      label="11 · Navigation"
      title="Desktop — side-nav"
      description="Laptop-visningen kollapser bunn-tabs til en vertikal skinne, gruppert per domene (Daglig, Stambok, Offentlig). Antall til høyre; aktiv tilstand fylt med forest på 5 % opasitet."
    >
      <div className="bg-bg-page rounded-[12px] overflow-hidden border border-n-200 shadow-[0_2px_4px_rgba(26,26,26,0.05),0_4px_12px_rgba(26,26,26,0.05)]">
        <div className="grid grid-cols-[240px_minmax(0,1fr)] min-h-[360px]">
          <DesktopSideNav
            brand="DogWorld(tmp)"
            brandTag="Granheim"
            groups={desktopGroups}
            activeKey="today"
            footer={
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <DogPhoto
                  tone="generic"
                  rounded="full"
                  label="DU"
                  className="w-7 h-7"
                />
                <div className="text-sm font-medium">Ole Bakre</div>
                <Button
                  variant="icon"
                  className="!w-7 !h-7 !border-0 !bg-transparent ml-auto"
                  aria-label="Profil"
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            }
          />
          <div className="p-6 flex flex-col gap-2.5">
            <nav
              className="text-xs text-n-500 flex items-center gap-1.5"
              aria-label="Brødsmuler"
            >
              <span>Stambok</span>
              <span>›</span>
              <span className="text-n-700">Kull</span>
              <span>›</span>
              <span className="text-n-950">Kull C — “Stars of the Fjord”</span>
            </nav>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] m-0">
              Kull C — “Stars of the Fjord”
            </h2>
            <div className="flex items-center gap-2 text-sm text-n-700">
              <span className="inline-flex items-center px-2 py-0.5 rounded-tag bg-ochre-50 text-ochre-700 text-xs font-medium">
                Uke 4
              </span>
              <span>Født 14. apr 2026 · Astor × Bella · 5 valper</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
