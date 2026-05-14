// ─────────────────────────────────────────────────────────────────────────────
// TODAY DASHBOARD — feed data
// All copy in Norwegian (bokmål). Kennel: Granheim, owner: Ole.
// Reuses dog universe from pedigree prototype.
// ─────────────────────────────────────────────────────────────────────────────

const todayKennel = {
  name: "Kennel Granheim",
  owner: "Ole",
  prefix: "av Granheim",
  karma: { tier: "Sølv", deltaToday: 50, reason: "etikk-erklæringen" },
};

const todayDate = {
  greeting: "God morgen, Ole",
  dateLine: "torsdag 14. mai",
  weather: { icon: "rain", temp: "10°", note: "regn senere" },
};

// Feed cards — ranked by urgency × time-relevance.
const todayFeed = [
  {
    id: "vaccine-bella",
    kind: "urgent",
    icon: "syringe",
    dog: "Bella vom Schwarzwald",
    headline: "Bella trenger årlig vaksine — bestill innen fredag",
    sub: "Sist vaksinert 12. mai 2025",
    actions: [
      { label: "Bestill veterinærtime", primary: true },
      { label: "Marker bestilt" },
    ],
    expand: {
      summary:
        "Årlig boostervaksine (DHPPi + Lepto). Bella er 4 år, vaksinene må fornyes for å reise og for kommende parring.",
      detail: [
        ["Forrige", "12. mai 2025 · Veterinærklinikken Voss"],
        ["Vaksiner", "DHPPi · Lepto · Rabies (siste 2024)"],
        ["Neste anbefalt", "innen 16. mai 2026"],
      ],
    },
  },

  {
    id: "litter-c",
    kind: "hero-litter",
    icon: "paw",
    dog: "Kull C",
    headline: "Kull C er i uke 4 i dag",
    sub: "5 valper, alle friske. Tid for ENS dag 5.",
    puppies: [
      { name: "Polaris", sex: "m", weight: 3.1, trend: [0.4, 0.6, 1.0, 1.6, 2.2, 2.7, 3.1] },
      { name: "Aslak",   sex: "m", weight: 2.9, trend: [0.4, 0.6, 0.9, 1.5, 2.1, 2.5, 2.9] },
      { name: "Brage",   sex: "m", weight: 3.0, trend: [0.4, 0.6, 1.0, 1.5, 2.1, 2.6, 3.0] },
      { name: "Embla",   sex: "f", weight: 2.7, trend: [0.4, 0.5, 0.8, 1.3, 1.9, 2.3, 2.7] },
      { name: "Frida",   sex: "f", weight: 2.6, trend: [0.4, 0.5, 0.8, 1.3, 1.8, 2.2, 2.6] },
    ],
    action: { label: "Åpne kullets dagbok", primary: true },
    expand: {
      summary: "ENS (Early Neurological Stimulation) dag 5 av 16. 2 min per valp, en gang per dag.",
      tasksToday: [
        "ENS dag 5 — alle 5 valper",
        "Veiing kl. 09:00 (gjort)",
        "Veiing kl. 21:00",
      ],
    },
  },

  {
    id: "application-line",
    kind: "neutral",
    icon: "envelope",
    headline: "Ny søknad fra Line Nilsen for Q-kullet",
    sub: "Familie med barn, har hatt Lab før. 1 time siden",
    actions: [
      { label: "Les søknad", primary: true },
      { label: "Avvis" },
    ],
    expand: {
      summary: "Line og Anders Nilsen, Bergen. Hjemmesituasjon: enebolig med inngjerdet hage. Forrige hund: Labrador (16 år, gått bort i 2024).",
      detail: [
        ["Adresse", "Bergen, Hordaland"],
        ["Familie", "2 voksne · 2 barn (8, 11)"],
        ["Erfaring", "Lab 2008–2024"],
        ["Aktivitet", "Tur, jakt"],
      ],
    },
  },

  {
    id: "hd-astor",
    kind: "positive",
    icon: "trophy",
    dog: "Astor av Granheim",
    headline: "Astors HD-resultat kom: A (FCI) 🎉",
    sub: "Resultatet er publisert på den offentlige profilen",
    action: { label: "Se profil", primary: true },
    expand: {
      summary: "HD-røntgen tatt 28. april. Resultat: A (begge hofter perfekt). Klart for avl.",
      detail: [
        ["Skjema", "FCI · venstre A / høyre A"],
        ["Røntgen", "28. apr 2026"],
        ["Vurdert av", "NKK · M. Bergerud"],
      ],
    },
  },

  {
    id: "show-nkk",
    kind: "deadline",
    icon: "calendar",
    headline: "Påmelding til NKK Bergen stenger om 3 dager",
    sub: "Du har 2 hunder som kvalifiserer (Astor, Saga)",
    action: { label: "Meld på", primary: true },
    expand: {
      summary: "NKK Bergen International, 7.–8. juni 2026. Påmeldingsfrist 17. mai 23:59.",
      detail: [
        ["Astor", "Norsk Elghund Grå · åpen klasse"],
        ["Saga",  "Norsk Elghund Grå · championklasse"],
        ["Dommer", "A. Wenger (NO)"],
      ],
    },
  },

  {
    id: "news",
    kind: "news",
    icon: "newspaper",
    headline: "Mattilsynet endret krav for valpekjøpere fra UK",
    sub: "DogWorld News • 2 timer siden",
    action: { label: "Les", primary: false },
    expand: {
      summary: "Fra 1. juni 2026 må alle valper eksportert til UK ha rabiesvaksine minst 21 dager før reise. Endrer leveringstid for 6+ uker gamle valper.",
      detail: [
        ["Trådt i kraft", "1. jun 2026"],
        ["Berører", "Eksport til Storbritannia"],
        ["Kilde", "Mattilsynet"],
      ],
    },
  },
];

const todayStats = [
  { id: "dogs", label: "Aktive hunder", value: 8, spark: [6, 6, 7, 7, 8, 8, 8] },
  { id: "litters", label: "Aktive kull", value: 1, spark: [2, 2, 1, 1, 1, 1, 1] },
  { id: "applications", label: "Søknader", value: 4, spark: [2, 1, 3, 3, 4, 4, 4] },
];

const todayNotifications = [
  { id: 1, t: "0 min siden", title: "Line Nilsen sendte søknad", sub: "Q-kullet · familie med barn" },
  { id: 2, t: "47 min siden", title: "Astors HD-resultat publisert", sub: "A (FCI) · klart for avl" },
  { id: 3, t: "i går 18:22", title: "Veiing av Kull C lagret", sub: "Alle 5 valper · gj.snitt +320 g" },
];

const fabActions = [
  { id: "photo",    label: "Ta bilde av hund",         icon: "camera" },
  { id: "pedigree", label: "Skann stamtavle",          icon: "scan" },
  { id: "cert",     label: "Skann helse-sertifikat",   icon: "doc" },
  { id: "weight",   label: "Logg vekt",                icon: "scale" },
  { id: "note",     label: "Skriv notat",              icon: "edit" },
];

// Expose
Object.assign(window, {
  todayKennel, todayDate, todayFeed, todayStats, todayNotifications, fabActions,
});
