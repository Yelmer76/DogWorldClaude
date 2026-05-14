// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING — Marit's first 10 minutes
// All copy Norwegian. Universe: Kennel Granheim, Astor/Bella/Saga.
// ─────────────────────────────────────────────────────────────────────────────

const marit = {
  name: "Marit",
  fullName: "Marit Granheim",
  email: "marit@granheim.no",
  kennel: "Kennel Granheim",
  prefix: "av Granheim",
  country: "Norge",
  breeds: ["Norsk Elghund"],
  oldSite: "kennel-granheim.no",
  oldPlatform: "Wix",
  subdomain: "granheim",
};

const breedSuggestions = [
  "Norsk Elghund", "Norsk Buhund", "Norsk Lundehund", "Norsk Elghund Sort",
  "Cavalier King Charles Spaniel", "Labrador Retriever",
  "Golden Retriever", "Tysk Schäferhund", "Belgisk Malinois",
  "Border Collie", "Engelsk Setter", "Rottweiler",
];

const flowScreens = [
  { id: "welcome",   label: "Velkommen",     short: "Velkommen" },
  { id: "email",     label: "E-post",        short: "E-post" },
  { id: "basics",    label: "Om kennelen",   short: "Om kennelen" },
  { id: "wedge",     label: "Migrasjon",     short: "Migrasjon" },
  { id: "url",       label: "Lim inn URL",   short: "URL" },
  { id: "crawl",     label: "Henter data",   short: "Henter" },
  { id: "review",    label: "Bekreft hunder", short: "Bekreft" },
  { id: "template",  label: "Velg mal",      short: "Mal" },
  { id: "domain",    label: "Domene",        short: "Domene" },
  { id: "published", label: "Publisert",     short: "Live" },
];

// ── Crawl discovery steps — appear one by one ──────────────────────────────
const crawlSteps = [
  { t:  300, icon: "link",   text: "Kobler til kennel-granheim.no", mono: "wix" },
  { t:  900, icon: "map",    text: "Sidekart funnet — 47 sider", mono: "200 OK" },
  { t: 1500, icon: "dog",    text: "Funnet 12 hunder", mono: "/hundene-vare" },
  { t: 2100, icon: "photo",  text: "Funnet 8 bilder av Astor", mono: "/astor.html" },
  { t: 2700, icon: "doc",    text: "3 stamtavler i PDF-format", mono: "*.pdf" },
  { t: 3300, icon: "trophy", text: "47 utstillingsbilder", mono: "/galleri/show" },
  { t: 3900, icon: "health", text: "Tolker helse-resultater fra Astor-siden", mono: "HD · ED · DM" },
  { t: 4500, icon: "tree",   text: "Bygger pedigree fra navnereferanser", mono: "3 generasjoner" },
  { t: 5100, icon: "check",  text: "Klar — gå til gjennomgang", mono: "12 hunder · 47 bilder" },
];

// ── 12 extracted dogs (mix of confidence levels) ───────────────────────────
const extractedDogs = [
  {
    id: "astor",
    name: "Astor av Granheim",
    photo: true, tone: "elkhound",
    sex: "m",
    overall: "high",
    born: "14. mars 2022",
    titles: ["NUCH", "NORDUCH"],
    fields: [
      { k: "Registreringsnummer", v: "NO12345/22", conf: "high" },
      { k: "Født",                v: "14. mars 2022", conf: "high" },
      { k: "Far",                 v: "Bobby av Skogen", conf: "high" },
      { k: "Mor",                 v: "Saga vom Nordwald", conf: "high" },
    ],
    source: "/astor.html",
  },
  {
    id: "bella",
    name: "Bella vom Schwarzwald",
    photo: true, tone: "dam",
    sex: "f",
    overall: "high",
    born: "17. juli 2022",
    titles: ["DE VDH-CH"],
    fields: [
      { k: "Registreringsnummer", v: "VDH/22/845", conf: "high" },
      { k: "Født",                v: "17. juli 2022", conf: "high" },
      { k: "Importert fra",       v: "Tyskland", conf: "high" },
      { k: "HD",                  v: "A (FCI)", conf: "high" },
    ],
    source: "/bella.html",
  },
  {
    id: "saga",
    name: "Saga vom Nordwald",
    photo: true, tone: "dam",
    sex: "f",
    overall: "high",
    born: "11. august 2019",
    titles: ["NUCH"],
    fields: [
      { k: "Registreringsnummer", v: "NO48232/19", conf: "high" },
      { k: "Født",                v: "11. august 2019", conf: "high" },
      { k: "Mor til",             v: "Kull A, B og C", conf: "high" },
    ],
    source: "/saga.html",
  },
  {
    id: "bobby",
    name: "Bobby av Skogen",
    photo: true, tone: "sire",
    sex: "m",
    overall: "medium",
    born: "2. juni 2018",
    titles: ["NUCH", "SE UCH"],
    fields: [
      { k: "Registreringsnummer", v: "NO33845/18", conf: "high" },
      { k: "Født",                v: "2. juni 2018", conf: "high" },
      { k: "Far",                 v: "Charmant Bobby", conf: "medium" },
      { k: "Mor",                 v: "Frida av Lia", conf: "low", note: "Ikke entydig på siden — kan være «Frida vom Lia»" },
    ],
    source: "/bobby-av-skogen.html",
  },
  {
    id: "charmant",
    name: "Charmant Bobby",
    photo: true, tone: "sire",
    sex: "m",
    overall: "medium",
    born: "20. mai 2014",
    deceased: true,
    titles: ["NUCH"],
    fields: [
      { k: "Født",          v: "20. mai 2014", conf: "high" },
      { k: "Død",           v: "4. november 2023", conf: "low", note: "Dato hentet fra minne-side — vennligst bekreft" },
      { k: "BIS-1",         v: "NKK Trondheim 2019", conf: "high" },
    ],
    source: "/in-memoriam.html",
  },
  {
    id: "frida",
    name: "Frida av Lia",
    photo: true, tone: "dam",
    sex: "f",
    overall: "medium",
    born: "12. april 2015",
    titles: ["SUCH"],
    fields: [
      { k: "Registreringsnummer", v: "SE34561/2015", conf: "high" },
      { k: "Født",                v: "12. april 2015", conf: "high" },
      { k: "Land",                v: "Sverige", conf: "high" },
    ],
    source: "/frida.html",
  },
  {
    id: "mira",
    name: "Mira av Granheim",
    photo: true, tone: "dam",
    sex: "f",
    overall: "high",
    born: "22. april 2024",
    titles: ["NUCH"],
    fields: [
      { k: "Registreringsnummer", v: "NO22112/24", conf: "high" },
      { k: "Født",                v: "22. april 2024", conf: "high" },
      { k: "Far",                 v: "Astor av Granheim", conf: "high" },
    ],
    source: "/kull-a/mira.html",
  },
  {
    id: "loke",
    name: "Loke av Granheim",
    photo: true, tone: "sire",
    sex: "m",
    overall: "medium",
    born: "22. april 2024",
    titles: [],
    fields: [
      { k: "Registreringsnummer", v: "NO22113/24", conf: "high" },
      { k: "Født",                v: "22. april 2024", conf: "high" },
      { k: "Eier",                v: "Solgt — eier ukjent", conf: "low", note: "Står «solgt» uten navn på den gamle siden" },
    ],
    source: "/kull-a/loke.html",
  },
  {
    id: "idun",
    name: "Idun av Granheim",
    photo: true, tone: "dam",
    sex: "f",
    overall: "medium",
    born: "22. april 2024",
    titles: [],
    fields: [
      { k: "Registreringsnummer", v: "NO22114/24", conf: "high" },
      { k: "Født",                v: "22. april 2024", conf: "high" },
      { k: "Eier",                v: "Familien Berg, Hamar", conf: "medium" },
    ],
    source: "/kull-a/idun.html",
  },
  {
    id: "frigg",
    name: "Frigg av Skogen",
    photo: false,   // <-- no photo found
    sex: "f",
    overall: "medium",
    born: "2. juni 2018",
    titles: [],
    fields: [
      { k: "Registreringsnummer", v: "NO33846/18", conf: "high" },
      { k: "Født",                v: "2. juni 2018", conf: "high" },
      { k: "Far",                 v: "Charmant Bobby", conf: "medium" },
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
      { k: "Antagelse",  v: "Far til Charmant Bobby", conf: "low" },
      { k: "Funnet i",   v: "Tekstreferanse på «Stamtavle»-siden", conf: "medium" },
    ],
    source: "/stamtavle.html",
    note: "Vi tror denne hunden er Bobbys bestefar, men vi har ikke nok data til å være sikre. Bekreft eller legg inn riktig hund.",
  },
  {
    id: "unknown-puppy",
    name: "Valp uten navn (kull C)",
    photo: true, tone: "elkhound",
    sex: "?",
    overall: "low",
    born: "14. april 2026",
    titles: [],
    fields: [
      { k: "Funnet i", v: "Galleri-side fra april", conf: "high" },
      { k: "Navn",     v: "—", conf: "low", note: "Kun bildetekst «Polaris?» — ikke bekreftet" },
    ],
    source: "/galleri/kull-c.html",
    note: "Bilde uten klar identitet. Lim inn riktig navn, eller marker som «valp i registrert kull».",
  },
];

// ── Templates ──────────────────────────────────────────────────────────────
const templates = [
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

Object.assign(window, {
  marit, breedSuggestions, flowScreens,
  crawlSteps, extractedDogs, templates,
});
