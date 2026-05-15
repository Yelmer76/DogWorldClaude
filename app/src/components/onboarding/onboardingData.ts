/**
 * Onboarding fixtures — Marit's first 10 minutes setting up
 * Kennel Granheim by importing her existing Wix site.
 *
 * Lifted from docs/design-handoff/project/onboarding-data.jsx and
 * trimmed to the steps Sprint 8 actually renders.
 */

export type CrawlIcon =
  | "link"
  | "map"
  | "dog"
  | "photo"
  | "doc"
  | "trophy"
  | "health"
  | "tree"
  | "check";

export type CrawlStep = {
  /** Time delay in ms after which this step appears */
  t: number;
  icon: CrawlIcon;
  text: string;
  mono: string;
};

export const crawlSteps: CrawlStep[] = [
  { t: 300, icon: "link", text: "Kobler til kennel-granheim.no", mono: "wix" },
  { t: 900, icon: "map", text: "Sidekart funnet — 47 sider", mono: "200 OK" },
  { t: 1500, icon: "dog", text: "Funnet 12 hunder", mono: "/hundene-vare" },
  { t: 2100, icon: "photo", text: "Funnet 8 bilder av Astor", mono: "/astor.html" },
  { t: 2700, icon: "doc", text: "3 stamtavler i PDF-format", mono: "*.pdf" },
  { t: 3300, icon: "trophy", text: "47 utstillingsbilder", mono: "/galleri/show" },
  {
    t: 3900,
    icon: "health",
    text: "Tolker helse-resultater fra Astor-siden",
    mono: "HD · ED · DM",
  },
  {
    t: 4500,
    icon: "tree",
    text: "Bygger pedigree fra navnereferanser",
    mono: "3 generasjoner",
  },
  {
    t: 5100,
    icon: "check",
    text: "Klar — gå til gjennomgang",
    mono: "12 hunder · 47 bilder",
  },
];

export type Confidence = "high" | "medium" | "low";

export type ExtractedField = {
  k: string;
  v: string;
  conf: Confidence;
  note?: string;
};

export type ExtractedDog = {
  id: string;
  name: string;
  photo: boolean;
  tone?: "elkhound" | "sire" | "dam";
  sex: "m" | "f" | "?";
  overall: Confidence;
  born: string | null;
  titles: string[];
  deceased?: boolean;
  fields: ExtractedField[];
  source: string;
  needsPhoto?: boolean;
  stub?: boolean;
  note?: string;
};

export const extractedDogs: ExtractedDog[] = [
  {
    id: "astor",
    name: "Astor av Granheim",
    photo: true,
    tone: "elkhound",
    sex: "m",
    overall: "high",
    born: "14. mars 2022",
    titles: ["NUCH", "NORDUCH"],
    fields: [
      { k: "Reg.nr.", v: "NO12345/22", conf: "high" },
      { k: "Født", v: "14. mars 2022", conf: "high" },
      { k: "Far", v: "Bobby av Skogen", conf: "high" },
      { k: "Mor", v: "Saga vom Nordwald", conf: "high" },
    ],
    source: "/astor.html",
  },
  {
    id: "bella",
    name: "Bella vom Schwarzwald",
    photo: true,
    tone: "dam",
    sex: "f",
    overall: "high",
    born: "17. juli 2022",
    titles: ["DE VDH-CH"],
    fields: [
      { k: "Reg.nr.", v: "VDH/22/845", conf: "high" },
      { k: "Født", v: "17. juli 2022", conf: "high" },
      { k: "Importert fra", v: "Tyskland", conf: "high" },
      { k: "HD", v: "A (FCI)", conf: "high" },
    ],
    source: "/bella.html",
  },
  {
    id: "saga",
    name: "Saga vom Nordwald",
    photo: true,
    tone: "dam",
    sex: "f",
    overall: "high",
    born: "11. august 2019",
    titles: ["NUCH"],
    fields: [
      { k: "Reg.nr.", v: "NO48232/19", conf: "high" },
      { k: "Født", v: "11. august 2019", conf: "high" },
      { k: "Mor til", v: "Kull A, B og C", conf: "high" },
    ],
    source: "/saga.html",
  },
  {
    id: "bobby",
    name: "Bobby av Skogen",
    photo: true,
    tone: "sire",
    sex: "m",
    overall: "medium",
    born: "2. juni 2018",
    titles: ["NUCH", "SE UCH"],
    fields: [
      { k: "Reg.nr.", v: "NO33845/18", conf: "high" },
      { k: "Far", v: "Charmant Bobby", conf: "medium" },
      {
        k: "Mor",
        v: "Frida av Lia",
        conf: "low",
        note: "Ikke entydig på siden — kan være «Frida vom Lia»",
      },
    ],
    source: "/bobby-av-skogen.html",
  },
  {
    id: "charmant",
    name: "Charmant Bobby",
    photo: true,
    tone: "sire",
    sex: "m",
    overall: "medium",
    born: "20. mai 2014",
    deceased: true,
    titles: ["NUCH"],
    fields: [
      { k: "Født", v: "20. mai 2014", conf: "high" },
      {
        k: "Død",
        v: "4. november 2023",
        conf: "low",
        note: "Dato hentet fra minne-side — vennligst bekreft",
      },
      { k: "BIS-1", v: "NKK Trondheim 2019", conf: "high" },
    ],
    source: "/in-memoriam.html",
  },
  {
    id: "frigg",
    name: "Frigg av Skogen",
    photo: false,
    sex: "f",
    overall: "medium",
    born: "2. juni 2018",
    titles: [],
    fields: [
      { k: "Reg.nr.", v: "NO33846/18", conf: "high" },
      { k: "Far", v: "Charmant Bobby", conf: "medium" },
    ],
    source: "/kull-2018.html",
    needsPhoto: true,
  },
  {
    id: "stub-grandsire",
    name: "Ukjent — sannsynligvis Bobbys far",
    photo: false,
    sex: "m",
    overall: "low",
    born: null,
    titles: [],
    stub: true,
    fields: [
      { k: "Antagelse", v: "Far til Charmant Bobby", conf: "low" },
      {
        k: "Funnet i",
        v: "Tekstreferanse på Stamtavle-siden",
        conf: "medium",
      },
    ],
    source: "/stamtavle.html",
    note:
      "Vi tror denne hunden er Bobbys bestefar, men vi har ikke nok data til å være sikre. Bekreft eller legg inn riktig hund.",
  },
];

export type Template = {
  id: "show" | "commercial";
  title: string;
  sub: string;
  fits: string;
  accents: string[];
};

export const templates: Template[] = [
  {
    id: "show",
    title: "Utstillings- og brukshund",
    sub: "Hundene og bakgrunnen deres er hovedscenen.",
    fits: "Egnet for utstillings-, sport- og brukshund-kenneler.",
    accents: ["Stamtavler", "Titler", "Resultatlister"],
  },
  {
    id: "commercial",
    title: "Kommersiell valpekennel",
    sub: "Valpene er i fokus.",
    fits: "Egnet for kenneler der valpene er hovedfokus.",
    accents: ["Søknadsskjema", "Depositum", "Veiledning"],
  },
];

export const breedSuggestions = [
  "Norsk Elghund",
  "Norsk Buhund",
  "Norsk Lundehund",
  "Norsk Elghund Sort",
  "Cavalier King Charles Spaniel",
  "Labrador Retriever",
  "Golden Retriever",
  "Tysk Schäferhund",
  "Belgisk Malinois",
  "Border Collie",
  "Engelsk Setter",
  "Rottweiler",
];
