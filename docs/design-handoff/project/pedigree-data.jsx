// ─────────────────────────────────────────────────────────────────────────────
// PEDIGREE DATA — Norwegian Elkhound bloodline
// Realistic stand-in data: long names, multi-title prefixes, edge cases.
// Keyed by id; navigation walks via sireId / damId / siblingIds / offspringIds.
// ─────────────────────────────────────────────────────────────────────────────

const dogs = {
  // ── Focal start ───────────────────────────────────────────────────────────
  astor: {
    id: "astor",
    titles: ["NUCH", "NORDUCH"],
    name: "Astor av Granheim",
    sex: "m",
    breed: "Norwegian Elkhound",
    country: "NO",
    born: "2022-03-14",
    breeder: "Kennel Granheim",
    sireId: "bobby",
    damId: "saga",
    siblingIds: ["birk", "frigg", "ulf", "nora"],
    offspringIds: ["mira", "loke", "idun"],
    health: {
      HD: { value: "A (FCI)", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 03/26", status: "ok" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'25", t: "BIS-1 · NKK Bergen — judge A. Wenger" },
      { y: "'25", t: "BOS · Stockholm International" },
      { y: "'24", t: "CACIB · NKK Oslo" },
      { y: "'24", t: "NORDUCH title confirmed" },
    ],
  },

  // ── Parents ───────────────────────────────────────────────────────────────
  bobby: {
    id: "bobby",
    titles: ["NUCH", "SE UCH"],
    name: "Bobby av Skogen",
    sex: "m",
    breed: "Norwegian Elkhound",
    country: "NO",
    born: "2018-06-02",
    breeder: "Kennel Skogen",
    sireId: "charmant",
    damId: "frida",
    siblingIds: ["nils-sib", "tove-sib"],
    offspringIds: ["astor", "birk", "frigg", "ulf", "nora"],
    health: {
      HD: { value: "A", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 11/25", status: "ok" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'23", t: "Multi-CACIB · 6 international shows" },
      { y: "'22", t: "BIS-2 · Nordisk Vinner" },
      { y: "'21", t: "SE UCH confirmed" },
    ],
  },
  saga: {
    id: "saga",
    titles: ["NUCH"],
    name: "Saga vom Nordwald",
    sex: "f",
    breed: "Norwegian Elkhound",
    country: "NO",
    born: "2019-08-11",
    breeder: "vom Nordwald",
    sireId: "vidar",
    damId: "tora",
    siblingIds: ["odin-sib", "runa-sib"],
    offspringIds: ["astor", "birk", "frigg", "ulf", "nora"],
    health: {
      HD: { value: "A", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 09/25", status: "ok" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'24", t: "Best Brood Bitch · NKK Hamar" },
      { y: "'23", t: "NUCH confirmed" },
      { y: "'22", t: "BOB · 4 national shows" },
    ],
  },

  // ── Grandparents ──────────────────────────────────────────────────────────
  charmant: {
    id: "charmant",
    titles: ["NUCH"],
    name: "Charmant Bobby",
    sex: "m",
    breed: "Norwegian Elkhound",
    country: "NO",
    born: "2014-05-20",
    deceased: "2023-11-04",
    breeder: "Kennel Charmant",
    sireId: null,        // edge case: unknown
    damId: "hidden-1",   // edge case: privacy
    siblingIds: [],
    offspringIds: ["bobby"],
    health: {
      HD: { value: "B", status: "warn" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 10/22", status: "ok" },
      DM: { value: "N / Carrier", status: "warn" },
    },
    achievements: [
      { y: "'19", t: "BIS · NKK Trondheim" },
      { y: "'18", t: "NUCH" },
    ],
  },
  frida: {
    id: "frida",
    titles: ["SUCH"],
    name: "Frida av Lia",
    sex: "f",
    breed: "Norwegian Elkhound",
    country: "SE",
    born: "2015-04-12",
    breeder: "Kennel av Lia",
    sireId: null,
    damId: null,
    siblingIds: [],
    offspringIds: ["bobby"],
    health: {
      HD: { value: "A", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 06/24", status: "ok" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'19", t: "SUCH confirmed" },
      { y: "'18", t: "Best Brood Bitch · SKK" },
    ],
  },
  vidar: {
    id: "vidar",
    titles: ["NUCH"],
    name: "Vidar av Granheim",
    sex: "m",
    breed: "Norwegian Elkhound",
    country: "NO",
    born: "2014-09-30",
    breeder: "Kennel Granheim",
    sireId: null,
    damId: null,
    siblingIds: [],
    offspringIds: ["saga"],
    health: {
      HD: { value: "A", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear (expired)", status: "warn" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'20", t: "BIS-3 · Nordic Winner" },
    ],
  },
  tora: {
    id: "tora",
    titles: ["NUCH"],
    name: "Tora vom Nordwald",
    sex: "f",
    breed: "Norwegian Elkhound",
    country: "DE",
    born: "2016-07-18",
    breeder: "vom Nordwald",
    sireId: null,
    damId: null,
    siblingIds: [],
    offspringIds: ["saga"],
    health: {
      HD: { value: "A", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 08/25", status: "ok" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'21", t: "NUCH confirmed" },
    ],
  },

  // ── Astor's siblings ──────────────────────────────────────────────────────
  birk: minimalDog("birk", "Birk av Skogen", "m", "2022-03-14", { sireId: "bobby", damId: "saga", offspringIds: [] }),
  frigg: minimalDog("frigg", "Frigg av Skogen", "f", "2022-03-14", { sireId: "bobby", damId: "saga", offspringIds: [] }),
  ulf: minimalDog("ulf", "Ulf av Skogen", "m", "2022-03-14", { sireId: "bobby", damId: "saga", offspringIds: [] }),
  nora: minimalDog("nora", "Nora av Skogen", "f", "2022-03-14", { sireId: "bobby", damId: "saga", offspringIds: [] }),

  // ── Astor's offspring (Litter A, 2024) ─────────────────────────────────────
  mira: {
    id: "mira",
    titles: ["NUCH"],
    name: "Mira av Granheim",
    sex: "f",
    breed: "Norwegian Elkhound",
    country: "NO",
    born: "2024-04-22",
    breeder: "Kennel Granheim",
    sireId: "astor",
    damId: "saga-2",        // edge case: dam record hidden by owner
    siblingIds: ["loke", "idun"],
    offspringIds: [],
    health: {
      HD: { value: "A", status: "ok" },
      ED: { value: "0", status: "ok" },
      Eyes: { value: "Clear 04/25", status: "ok" },
      DM: { value: "N / N", status: "ok" },
    },
    achievements: [
      { y: "'25", t: "NUCH confirmed at 14 months" },
      { y: "'25", t: "BOB Junior · NKK Oslo" },
    ],
  },
  loke: minimalDog("loke", "Loke av Granheim", "m", "2024-04-22", { sireId: "astor", damId: "saga-2", siblingIds: ["mira", "idun"], offspringIds: [] }),
  idun: minimalDog("idun", "Idun av Granheim", "f", "2024-04-22", { sireId: "astor", damId: "saga-2", siblingIds: ["mira", "loke"], offspringIds: [] }),

  // ── Edge cases ────────────────────────────────────────────────────────────
  "hidden-1": {
    id: "hidden-1",
    name: "Hidden",
    sex: "f",
    hidden: true,           // privacy opt-out
    breed: "Norwegian Elkhound",
    born: null,
  },
  "saga-2": {
    id: "saga-2",
    name: "Hidden",
    sex: "f",
    hidden: true,
    breed: "Norwegian Elkhound",
    born: null,
  },

  // siblings of parents — keep minimal
  "nils-sib": minimalDog("nils-sib", "Nils av Skogen", "m", "2018-06-02", { sireId: "charmant", damId: "frida", offspringIds: [] }),
  "tove-sib": minimalDog("tove-sib", "Tove av Skogen", "f", "2018-06-02", { sireId: "charmant", damId: "frida", offspringIds: [] }),
  "odin-sib": minimalDog("odin-sib", "Odin vom Nordwald", "m", "2019-08-11", { sireId: "vidar", damId: "tora", offspringIds: [] }),
  "runa-sib": minimalDog("runa-sib", "Runa vom Nordwald", "f", "2019-08-11", { sireId: "vidar", damId: "tora", offspringIds: [] }),
};

function minimalDog(id, name, sex, born, extra) {
  return {
    id, name, sex, born,
    titles: [],
    breed: "Norwegian Elkhound",
    country: "NO",
    breeder: "Kennel Granheim",
    sireId: null, damId: null, siblingIds: [], offspringIds: [],
    health: {
      HD: { value: "—", status: "muted" },
      ED: { value: "—", status: "muted" },
      Eyes: { value: "—", status: "muted" },
      DM: { value: "—", status: "muted" },
    },
    achievements: [],
    ...extra,
  };
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function getDog(id) {
  if (!id) return null;
  return dogs[id] || null;
}

function shortName(d) {
  if (!d) return "Unknown";
  if (d.hidden) return "Hidden";
  // Strip kennel prefix for compact spots: "Astor av Granheim" → "Astor"
  const first = d.name.split(/\s+(av|vom|von|of|du|de la)\s+/i)[0];
  return first;
}

function birthYear(d) {
  return d && d.born ? d.born.slice(0, 4) : "—";
}

function flagFor(country) {
  return { NO: "🇳🇴", SE: "🇸🇪", DK: "🇩🇰", DE: "🇩🇪", UK: "🇬🇧", FI: "🇫🇮" }[country] || "";
}

// Public exports
window.dogs = dogs;
window.getDog = getDog;
window.shortName = shortName;
window.birthYear = birthYear;
window.flagFor = flagFor;
