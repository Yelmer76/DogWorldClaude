/**
 * DogWorld(tmp) — TEST FIXTURES (placeholders only)
 *
 * ⚠️ This data is ONLY for development, testing, and clearly-labeled tutorial
 * content. It must NEVER appear in production marketing, the public-facing
 * site, or any user-visible surface that isn't explicitly an example.
 *
 * The names are deliberately designed to stress-test the UI:
 *   - long multi-title prefixes ("NUCH NORDUCH")
 *   - imported foreign-registry dogs (Bella vom Schwarzwald, VDH-CH)
 *   - deceased / hidden / unknown ancestor edge cases
 *   - parent/child references across screens
 *   - puppy collar-color identifiers, status enum coverage
 *
 * Source: docs/memory/design_handoff_canonical.md
 */

// ─────────────────────────────────────────────────────────────────────────
// Type definitions
// ─────────────────────────────────────────────────────────────────────────

export type Sex = "m" | "f";

export type DogStatus = "active" | "retired" | "sold" | "memorial";

export type HealthStatus = "ok" | "warn" | "err";

export type HealthTest = {
  value: string;
  status: HealthStatus;
  scheme?: "FCI" | "OFA" | "BVA" | "PennHIP" | "ECVO" | "Laboklin" | "Embark";
  certUrl?: string; // signed URL or registry deep-link
  date?: string; // ISO yyyy-mm-dd
  validUntil?: string; // for annual certs (eyes, cardiac)
};

export type Achievement = {
  /** Year shorthand for compact rows ("'25") */
  y: string;
  /** Full text */
  t: string;
};

export type Dog = {
  id: string;
  /** Title prefixes shown before name (NUCH, NORDUCH, Ch, Sh.Ch, IGP3, etc.) */
  titles: string[];
  /** The kennel-prefixed registered name without titles */
  name: string;
  callName?: string;
  sex: Sex;
  breed: string;
  /** ISO country code (NO, DE, SE, ...) */
  country: string;
  /** ISO yyyy-mm-dd */
  born: string;
  /** ISO yyyy-mm-dd if deceased */
  deceased?: string;
  color?: string;
  microchip?: string;
  breeder: string;
  sireId: string | null;
  damId: string | null;
  siblingIds: string[];
  offspringIds: string[];
  health: Record<string, HealthTest>;
  achievements: Achievement[];
  status: DogStatus;
  personality?: string;
  publicVisible?: boolean;
  sharedToGenealogy?: boolean;
};

// ── Puppies in a litter ────────────────────────────────────────────────────

export type PuppyStatus =
  | "reservert"
  | "tilgjengelig"
  | "tilbudt"
  | "beholdt"
  | "solgt";

export type PuppyCollarColor =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "yellow"
  | "orange"
  | "pink"
  | "white";

export type Puppy = {
  id: string;
  color: PuppyCollarColor;
  /** Norwegian color label for display */
  colorLabel: string;
  sex: Sex;
  /** Suggested call-name; not always set in early weeks */
  name?: string;
  status: PuppyStatus;
  /** UPPERCASE label for status pill */
  statusLabel: string;
  /** Latest weight in kg */
  weight: number;
  /** Trend since last measurement */
  trend: "up" | "down" | "flat";
  /** Delta since last measurement, formatted ("+90 g", "-20 g") */
  delta: string;
  notes?: string;
  /** Family or "Beholdt av oppdretter" or "Tilbudt — venter på svar" */
  assignedTo?: string;
  /** Visual tone for sex-coded UI elements */
  tone: "sire" | "dam";
};

// ── Litter ─────────────────────────────────────────────────────────────────

export type LitterStatus =
  | "planned"
  | "mated"
  | "pregnant"
  | "whelped"
  | "rearing"
  | "delivery"
  | "done";

export type Litter = {
  id: string;
  /** Letter convention common in EU breeding ("C" for Kull C / C-Wurf) */
  letter: string;
  callName: string;
  /** Optional poetic name some kennels use ("Stars of the Fjord") */
  poetic?: string;
  sireId: string;
  damId: string;
  /** Display-formatted Norwegian dates */
  mating: string;
  whelping: string;
  delivery: string;
  weekOfAge: number;
  status: LitterStatus;
  count: { total: number; males: number; females: number };
  available: number;
  applicationsTotal: number;
};

// ── Applications ───────────────────────────────────────────────────────────

export type ApplicationStatus =
  | "NY"
  | "I_SAMTALE"
  | "GODKJENT"
  | "TILBUDT_VALP"
  | "AVVIST";

export type Application = {
  id: string;
  /** Display name as the family is known */
  applicant: string;
  city: string;
  status: ApplicationStatus;
  /** UPPERCASE label for status pill */
  statusLabel: string;
  /** Quote from their application — used as compact preview */
  summary: string;
  /** Match indicators against breeder's criteria */
  matches: { label: string; status: HealthStatus }[];
  receivedAt: string; // ISO
  /** Puppy id if assigned/offered */
  assignedPuppyId?: string;
};

// ── Kennel ─────────────────────────────────────────────────────────────────

export type KarmaTier = "ny" | "bronse" | "sølv" | "gull" | "forvalter";

export type Kennel = {
  id: string;
  name: string;
  /** FCI affix (≤12 chars, no hyphens) */
  affix: string;
  affixPosition: "prefix" | "suffix";
  city: string;
  country: string;
  /** Year founded */
  founded: number;
  breed: string;
  owners: string;
  affiliations: string[];
  karmaTier: KarmaTier;
  ethicsVerified: boolean;
};

// ─────────────────────────────────────────────────────────────────────────
// Granheim universe — Norwegian Elkhound bloodline
// ─────────────────────────────────────────────────────────────────────────

export const granheim: Kennel = {
  id: "granheim",
  name: "Kennel Granheim",
  affix: "Granheim",
  affixPosition: "suffix",
  city: "Lillehammer",
  country: "NO",
  founded: 1998,
  breed: "Norsk Elghund",
  owners: "Ole og Marit",
  affiliations: ["NKK", "Norsk Elghund Klubb"],
  karmaTier: "sølv",
  ethicsVerified: true,
};

// ── Dogs (keyed by id; relationships via sireId/damId/sibling/offspring) ──

export const dogs: Record<string, Dog> = {
  astor: {
    id: "astor",
    titles: ["NUCH", "NORDUCH"],
    name: "Astor av Granheim",
    callName: "Astor",
    sex: "m",
    breed: "Norsk Elghund",
    country: "NO",
    born: "2022-03-14",
    color: "Gråsvart",
    microchip: "578077000123456",
    breeder: "Kennel Granheim",
    sireId: "bobby",
    damId: "saga",
    siblingIds: ["birk-sib", "frigg-sib", "ulf-sib", "nora-sib"],
    offspringIds: ["mira", "loke", "idun"],
    health: {
      HD: { value: "A (FCI)", status: "ok", scheme: "FCI", date: "2023-09-12" },
      ED: { value: "0", status: "ok", scheme: "FCI", date: "2023-09-12" },
      Eyes: {
        value: "Klar",
        status: "ok",
        scheme: "ECVO",
        date: "2026-03-04",
        validUntil: "2027-03-04",
      },
      DM: { value: "N / N", status: "ok", scheme: "Laboklin" },
      "prcd-PRA": { value: "N / N", status: "ok", scheme: "Laboklin" },
    },
    achievements: [
      { y: "'25", t: "BIS-1 · NKK Bergen — dommer A. Wenger" },
      { y: "'25", t: "BOS · Stockholm International" },
      { y: "'24", t: "CACIB · NKK Oslo" },
      { y: "'24", t: "NORDUCH-tittel bekreftet" },
    ],
    status: "active",
    personality:
      "Astor er en rolig og tilbakeholden hann med utmerket arbeidsvilje. Flink med barn og andre hunder.",
    publicVisible: true,
    sharedToGenealogy: true,
  },

  bobby: {
    id: "bobby",
    titles: ["NUCH", "SE UCH"],
    name: "Bobby av Skogen",
    callName: "Bobby",
    sex: "m",
    breed: "Norsk Elghund",
    country: "NO",
    born: "2018-06-02",
    breeder: "Kennel Skogen",
    sireId: "charmant",
    damId: "frida",
    siblingIds: [],
    offspringIds: ["astor", "birk-sib", "frigg-sib", "ulf-sib", "nora-sib"],
    health: {
      HD: { value: "A", status: "ok", scheme: "FCI" },
      ED: { value: "0", status: "ok", scheme: "FCI" },
      Eyes: { value: "Klar 11/25", status: "ok", scheme: "ECVO" },
      DM: { value: "N / N", status: "ok", scheme: "Laboklin" },
    },
    achievements: [
      { y: "'23", t: "Multi-CACIB · 6 internasjonale utstillinger" },
      { y: "'22", t: "BIS-2 · Nordisk Vinner" },
      { y: "'21", t: "SE UCH bekreftet" },
    ],
    status: "active",
    publicVisible: true,
    sharedToGenealogy: true,
  },

  saga: {
    id: "saga",
    titles: ["NUCH"],
    name: "Saga vom Nordwald",
    callName: "Saga",
    sex: "f",
    breed: "Norsk Elghund",
    country: "NO",
    born: "2019-08-11",
    breeder: "vom Nordwald",
    sireId: "vidar",
    damId: "tora",
    siblingIds: [],
    offspringIds: ["astor", "birk-sib", "frigg-sib", "ulf-sib", "nora-sib"],
    health: {
      HD: { value: "A", status: "ok", scheme: "FCI" },
      ED: { value: "0", status: "ok", scheme: "FCI" },
      Eyes: { value: "Klar 09/25", status: "ok", scheme: "ECVO" },
      DM: { value: "N / N", status: "ok", scheme: "Laboklin" },
    },
    achievements: [
      { y: "'24", t: "Best Brood Bitch · NKK Hamar" },
      { y: "'23", t: "NUCH bekreftet" },
      { y: "'22", t: "BOB · 4 nasjonale utstillinger" },
    ],
    status: "active",
    publicVisible: true,
    sharedToGenealogy: true,
  },

  bella: {
    id: "bella",
    titles: ["VDH-CH"],
    name: "Bella vom Schwarzwald",
    callName: "Bella",
    sex: "f",
    breed: "Norsk Elghund",
    country: "DE",
    born: "2022-07-17",
    breeder: "vom Schwarzwald",
    sireId: null,
    damId: null,
    siblingIds: [],
    offspringIds: [],
    health: {
      HD: { value: "A", status: "ok", scheme: "FCI" },
      ED: { value: "0", status: "ok", scheme: "FCI" },
      Eyes: { value: "Klar 02/26", status: "ok", scheme: "ECVO" },
    },
    achievements: [
      { y: "'25", t: "VDH-CH bekreftet" },
      { y: "'24", t: "Importert til Norge" },
    ],
    status: "active",
    publicVisible: true,
    sharedToGenealogy: true,
  },

  vidar: {
    id: "vidar",
    titles: ["NUCH"],
    name: "Vidar av Granheim",
    callName: "Vidar",
    sex: "m",
    breed: "Norsk Elghund",
    country: "NO",
    born: "2008-04-22",
    deceased: "2022-11-30",
    breeder: "Kennel Granheim",
    sireId: null,
    damId: null,
    siblingIds: [],
    offspringIds: ["saga"],
    health: {
      HD: { value: "B", status: "warn", scheme: "FCI" },
    },
    achievements: [
      { y: "'14", t: "BIS · NKK Trondheim" },
      { y: "'12", t: "NUCH bekreftet" },
    ],
    status: "memorial",
    personality:
      "Vidar var grunnsteinen i kennelens elghund-linje. En rolig kjempe med utmerket nese.",
    publicVisible: true,
    sharedToGenealogy: true,
  },

  charmant: {
    id: "charmant",
    titles: ["NUCH"],
    name: "Charmant Bobby",
    callName: "Charmant",
    sex: "m",
    breed: "Norsk Elghund",
    country: "NO",
    born: "2014-05-20",
    deceased: "2023-11-04",
    breeder: "Kennel Charmant",
    sireId: null, // edge case: unknown ancestor
    damId: "hidden-1", // edge case: hidden by owner
    siblingIds: [],
    offspringIds: ["bobby"],
    health: {
      HD: { value: "B", status: "warn", scheme: "FCI" },
      ED: { value: "0", status: "ok", scheme: "FCI" },
      Eyes: { value: "Klar 10/22", status: "ok", scheme: "ECVO" },
      DM: { value: "N / Carrier", status: "warn", scheme: "Laboklin" },
    },
    achievements: [
      { y: "'19", t: "BIS · NKK Trondheim" },
      { y: "'18", t: "NUCH bekreftet" },
    ],
    status: "memorial",
    publicVisible: true,
    sharedToGenealogy: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Litter C — "Stars of the Fjord", Astor × Bella
// ─────────────────────────────────────────────────────────────────────────

export const litterC: Litter = {
  id: "kull-c",
  letter: "C",
  callName: "Kull C",
  poetic: "Stars of the Fjord",
  sireId: "astor",
  damId: "bella",
  mating: "14. februar 2026",
  whelping: "14. april 2026",
  delivery: "8. juni 2026",
  weekOfAge: 4,
  status: "rearing",
  count: { total: 5, males: 3, females: 2 },
  available: 2,
  applicationsTotal: 7,
};

export const puppies: Puppy[] = [
  {
    id: "birk",
    color: "red",
    colorLabel: "Rød",
    sex: "m",
    name: "Birk",
    status: "reservert",
    statusLabel: "RESERVERT",
    weight: 3.1,
    trend: "up",
    delta: "+90 g",
    notes: "Energisk, ledende i kullet. Liker mat.",
    assignedTo: "Familien Hansen, Bergen",
    tone: "sire",
  },
  {
    id: "loke",
    color: "blue",
    colorLabel: "Blå",
    sex: "m",
    name: "Loke",
    status: "tilgjengelig",
    statusLabel: "TILGJENGELIG",
    weight: 3.3,
    trend: "up",
    delta: "+95 g",
    notes: "Største i kullet. Rolig på dag, aktiv på kveld.",
    tone: "sire",
  },
  {
    id: "ulf",
    color: "green",
    colorLabel: "Grønn",
    sex: "m",
    name: "Ulf",
    status: "beholdt",
    statusLabel: "BEHOLDT",
    weight: 3.0,
    trend: "up",
    delta: "+85 g",
    notes: "Vurdert som potensiell avlshann. Sterk pels, rolig sinn.",
    assignedTo: "Beholdt av oppdretter",
    tone: "sire",
  },
  {
    id: "mira",
    color: "purple",
    colorLabel: "Lilla",
    sex: "f",
    name: "Mira",
    status: "tilgjengelig",
    statusLabel: "TILGJENGELIG",
    weight: 2.7,
    trend: "up",
    delta: "+70 g",
    notes: "Mest tilbakeholden av tispene. God på sosialisering.",
    tone: "dam",
  },
  {
    id: "idun",
    color: "yellow",
    colorLabel: "Gul",
    sex: "f",
    name: "Idun",
    status: "tilbudt",
    statusLabel: "TILBUDT",
    weight: 2.6,
    trend: "up",
    delta: "+70 g",
    notes: "Liten, men spiser bra. Tilbudt — venter på svar.",
    assignedTo: "Familien Berg, Stavanger (venter)",
    tone: "dam",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Applications on Litter C
// ─────────────────────────────────────────────────────────────────────────

export const applications: Application[] = [
  {
    id: "hansen",
    applicant: "Familien Hansen",
    city: "Bergen",
    status: "GODKJENT",
    statusLabel: "GODKJENT",
    summary: "Familie med 2 barn (8, 10), har hatt elghund før, ønsker turkamerat.",
    matches: [
      { label: "Erfaring med rasen", status: "ok" },
      { label: "Tilstrekkelig plass", status: "ok" },
      { label: "Familie-erfaring", status: "ok" },
    ],
    receivedAt: "2026-04-21",
    assignedPuppyId: "birk",
  },
  {
    id: "berg",
    applicant: "Familien Berg",
    city: "Stavanger",
    status: "TILBUDT_VALP",
    statusLabel: "TILBUDT VALP",
    summary: "Par i 50-årene, jakter aktivt elg, søker jaktkamerat med god nese.",
    matches: [
      { label: "Erfaring med rasen", status: "ok" },
      { label: "Aktivt jaktmiljø", status: "ok" },
      { label: "Førstegangs valpekjøper hos Granheim", status: "warn" },
    ],
    receivedAt: "2026-04-25",
    assignedPuppyId: "idun",
  },
  {
    id: "olsen",
    applicant: "Marit Olsen",
    city: "Oslo",
    status: "I_SAMTALE",
    statusLabel: "I SAMTALE",
    summary: "Singel i 30-årene, første hund, vandrer mye i marka, har lest seg opp.",
    matches: [
      { label: "Aktiv hverdag", status: "ok" },
      { label: "Førstegangs-eier", status: "warn" },
      { label: "Tilstrekkelig plass", status: "warn" },
    ],
    receivedAt: "2026-05-02",
  },
  {
    id: "pettersen",
    applicant: "Familien Pettersen",
    city: "Trondheim",
    status: "NY",
    statusLabel: "NY",
    summary: "Vil ha utstillingshund, har erfaring fra annen rase.",
    matches: [
      { label: "Utstillings-erfaring", status: "ok" },
      { label: "Erfaring med rasen", status: "warn" },
    ],
    receivedAt: "2026-05-12",
  },
  {
    id: "aas",
    applicant: "Familien Aas",
    city: "Tromsø",
    status: "NY",
    statusLabel: "NY",
    summary: "Aktiv friluftsfamilie, har hund fra før, søker en til.",
    matches: [
      { label: "Erfaring med hund", status: "ok" },
      { label: "Aktiv hverdag", status: "ok" },
      { label: "Erfaring med rasen", status: "warn" },
    ],
    receivedAt: "2026-05-13",
  },
  {
    id: "nilsen",
    applicant: "Tor Nilsen",
    city: "Hamar",
    status: "I_SAMTALE",
    statusLabel: "I SAMTALE",
    summary: "Pensjonert jeger, har hatt 4 elghunder gjennom årene.",
    matches: [
      { label: "Erfaring med rasen", status: "ok" },
      { label: "Jakt-erfaring", status: "ok" },
    ],
    receivedAt: "2026-04-18",
  },
  {
    id: "lund",
    applicant: "Karina Lund",
    city: "Kristiansand",
    status: "AVVIST",
    statusLabel: "AVVIST",
    summary: "Bor i leilighet uten balkong, ønsker hund som passer både inne og på reise.",
    matches: [
      { label: "Tilstrekkelig plass", status: "err" },
      { label: "Kjent med rasens behov", status: "err" },
    ],
    receivedAt: "2026-04-30",
  },
];
