// ─────────────────────────────────────────────────────────────────────────────
// DOG DETAIL — Astor av Granheim (default), plus sparse + memorial variants.
// All copy in Norwegian (bokmål).
// ─────────────────────────────────────────────────────────────────────────────

const astorDefault = {
  id: "astor",
  status: "active",                       // active | retired | sold | memorial
  statusLabel: "Aktiv",
  publicProfile: true,
  sharedGenealogy: true,

  hero: { photo: "ASTOR", photoCount: 47 },

  identity: {
    fullName: "NUCH NORDUCH Astor av Granheim",
    callName: "Astor",
    titles: ["NUCH", "NORDUCH"],
    sex: "Hann",
    age: "3 år",
    breed: "Norsk Elghund",
    born: "14. mars 2022",
    died: null,
  },

  basics: [
    { key: "registered", label: "Registrert navn", value: "NUCH NORDUCH Astor av Granheim", reg: "NO12345/22" },
    { key: "callName",   label: "Kallenavn",       value: "Astor" },
    { key: "sex",        label: "Sex",             value: "Hann", readOnly: true },
    { key: "born",       label: "Fødselsdato",     value: "14. mars 2022" },
    { key: "color",      label: "Farge",           value: "Grå (gråsvart)" },
    { key: "microchip",  label: "Microchip",       value: "578077000123456", mono: true },
    { key: "tattoo",     label: "Tatovering",      value: "", placeholder: "Legg til tatoveringsnummer" },
  ],

  parents: {
    sire: { id: "bobby", name: "Bobby av Skogen", titles: ["NUCH", "SE UCH"], sex: "m" },
    dam:  { id: "saga",  name: "Saga vom Nordwald", titles: ["NUCH"], sex: "f" },
  },

  attribution: [
    { label: "Oppdretter",     value: "Kennel Granheim",          link: true },
    { label: "Nåværende eier", value: "Kennel Granheim",          link: true },
    { label: "Mikrochippet av", value: "Vet. Solheim · 24. apr 2022" },
  ],

  personality: "Astor er en rolig og tilbakeholden hann med utmerket arbeidsvilje. Han er flink med barn og andre hunder, og har vist seg lærenem i bruksprøver. Liker lange turer i terrenget — ikke en sofahund, men ikke uroet av byliv heller.",

  preview: {
    health: [
      { k: "HD", v: "A (FCI)", state: "ok" },
      { k: "ED", v: "0", state: "ok" },
      { k: "Øyne", v: "Klar 03/2026", state: "ok" },
      { k: "DM", v: "N/N", state: "ok" },
      { k: "prcd-PRA", v: "N/N", state: "ok" },
    ],
    titles: [
      { y: "2025", t: "NORDUCH · Nordisk Champion bekreftet" },
      { y: "2024", t: "NUCH · Norsk Champion bekreftet" },
      { y: "2024", t: "BIS-1 · NKK Bergen — A. Wenger" },
    ],
    photos: 47,
    litters: 1,
  },
};

// ── Sparse — newly added, minimal data ─────────────────────────────────────
const astorSparse = {
  ...astorDefault,
  status: "active",
  statusLabel: "Aktiv",
  hero: { photo: null, photoCount: 0 },
  identity: {
    fullName: "Astor",                    // no registered prefix yet
    callName: "Astor",
    titles: [],
    sex: "Hann",
    age: "3 år",
    breed: "Norsk Elghund",
    born: "14. mars 2022",
    died: null,
  },
  basics: [
    { key: "registered", label: "Registrert navn", value: "", placeholder: "Registreringsnummer mangler" },
    { key: "callName",   label: "Kallenavn",       value: "Astor" },
    { key: "sex",        label: "Sex",             value: "Hann", readOnly: true },
    { key: "born",       label: "Fødselsdato",     value: "14. mars 2022" },
    { key: "color",      label: "Farge",           value: "", placeholder: "Legg til farge" },
    { key: "microchip",  label: "Microchip",       value: "", placeholder: "Skann eller skriv inn", mono: true },
    { key: "tattoo",     label: "Tatovering",      value: "", placeholder: "Legg til tatoveringsnummer" },
  ],
  parents: { sire: null, dam: null },
  attribution: [
    { label: "Oppdretter",     value: "", placeholder: "Legg til oppdretter" },
    { label: "Nåværende eier", value: "Kennel Granheim", link: true },
    { label: "Mikrochippet av", value: "", placeholder: "Ikke registrert" },
  ],
  personality: "",
  banner: {
    text: "Fyll inn flere detaljer for å aktivere stamtavle- og helsefunksjoner",
    cta: "Skann papirstamtavle →",
  },
};

// ── Memorial ──────────────────────────────────────────────────────────────
const astorMemorial = {
  ...astorDefault,
  status: "memorial",
  statusLabel: "Over regnbuebroen",
  publicProfile: true,
  sharedGenealogy: true,
  identity: {
    ...astorDefault.identity,
    died: "8. august 2032",
  },
};

const statusOptions = [
  { id: "active",   label: "Aktiv",                desc: "I avl, vises i søk og stamtavler" },
  { id: "retired",  label: "Pensjonert",           desc: "Brukes ikke lenger i avl" },
  { id: "sold",     label: "Solgt til ny eier",    desc: "Eierskap overført — fortsatt i stamtavlen" },
  { id: "memorial", label: "Over regnbuebroen",    desc: "Minneside, med dato for bortgang" },
];

const tabsList = [
  { id: "profil",    label: "Profil" },
  { id: "stamtavle", label: "Stamtavle" },
  { id: "helse",     label: "Helse" },
  { id: "titler",    label: "Titler" },
  { id: "bilder",    label: "Bilder" },
  { id: "notater",   label: "Notater" },
];

const fabActionsDog = [
  { id: "photo",  label: "Ta bilde av Astor",       icon: "camera" },
  { id: "cert",   label: "Skann helse-sertifikat",  icon: "doc" },
  { id: "crit",   label: "Skann utstillingskritikk", icon: "scan" },
  { id: "weight", label: "Logg vekt",               icon: "scale" },
  { id: "note",   label: "Skriv notat",             icon: "edit" },
];

const moreMenuActions = [
  { id: "pdf",      label: "Eksporter PDF" },
  { id: "history",  label: "Endringshistorikk" },
  { id: "report",   label: "Rapporter feil i data" },
  { id: "delete",   label: "Slett hund", destructive: true },
];

const recentDogs = [
  { id: "astor",  name: "Astor av Granheim",   titles: ["NUCH", "NORDUCH"], sex: "m", age: "3 år", status: "active" },
  { id: "bella",  name: "Bella vom Schwarzwald", titles: ["VDH-CH"],         sex: "f", age: "4 år", status: "active" },
  { id: "saga",   name: "Saga vom Nordwald",     titles: ["NUCH"],           sex: "f", age: "6 år", status: "active" },
  { id: "charm",  name: "Charmant Bobby",        titles: ["NUCH"],           sex: "m", age: "9 år", status: "retired" },
  { id: "bobby",  name: "Bobby av Skogen",       titles: ["NUCH", "SE UCH"], sex: "m", age: "7 år", status: "active" },
  { id: "frigg",  name: "Frigg av Skogen",       titles: [],                 sex: "f", age: "3 år", status: "active" },
  { id: "polaris",name: "Polaris (Litter C)",    titles: [],                 sex: "m", age: "4 uker", status: "puppy" },
];

Object.assign(window, {
  astorDefault, astorSparse, astorMemorial,
  statusOptions, tabsList, fabActionsDog, moreMenuActions, recentDogs,
});
