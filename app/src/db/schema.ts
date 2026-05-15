/**
 * DogWorld(tmp) database schema — Drizzle (SQLite/D1).
 *
 * Mirrors the universe.ts TypeScript types one-to-one so that the
 * existing UI components and the database speak the same shape.
 * Sprint 13 wires the local SQLite dev workflow; Sprint 15 swaps
 * the driver to Cloudflare D1 without schema changes.
 *
 * Table conventions:
 *   - PKs are TEXT (we keep human-readable ids like "astor")
 *   - FKs use ON DELETE CASCADE for owned rows (notes, achievements,
 *     health tests, application matches)
 *   - Booleans are stored as INTEGER (SQLite convention)
 *   - Dates that are full ISO ('2026-04-22') stay as TEXT, easier to
 *     debug than seconds-since-epoch and Drizzle accepts both
 */
import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
} from "drizzle-orm/sqlite-core";

// ── Kennels ────────────────────────────────────────────────────────────────

export const kennels = sqliteTable("kennels", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  affix: text("affix").notNull(),
  affixPosition: text("affix_position", { enum: ["prefix", "suffix"] })
    .notNull()
    .default("suffix"),
  city: text("city").notNull(),
  country: text("country").notNull(),
  founded: integer("founded").notNull(),
  breed: text("breed").notNull(),
  owners: text("owners").notNull(),
  /** Comma-separated org affiliations (NKK, FCI etc.) */
  affiliations: text("affiliations").notNull().default(""),
  karmaTier: text("karma_tier", {
    enum: ["ny", "bronse", "sølv", "gull", "forvalter"],
  })
    .notNull()
    .default("ny"),
  ethicsVerified: integer("ethics_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  /** ISO timestamp of the most recent etikk-erklæring */
  ethicsConfirmedAt: text("ethics_confirmed_at"),
});

// ── Dogs ───────────────────────────────────────────────────────────────────

export const dogs = sqliteTable("dogs", {
  id: text("id").primaryKey(),
  kennelId: text("kennel_id").references(() => kennels.id, {
    onDelete: "set null",
  }),
  /** JSON-encoded array of title strings ("NUCH", "NORDUCH", ...) */
  titles: text("titles", { mode: "json" }).notNull().$type<string[]>(),
  name: text("name").notNull(),
  callName: text("call_name"),
  sex: text("sex", { enum: ["m", "f"] }).notNull(),
  breed: text("breed").notNull(),
  country: text("country").notNull(),
  born: text("born").notNull(),
  deceased: text("deceased"),
  color: text("color"),
  microchip: text("microchip"),
  breeder: text("breeder").notNull(),
  sireId: text("sire_id"),
  damId: text("dam_id"),
  status: text("status", {
    enum: ["active", "retired", "sold", "memorial"],
  })
    .notNull()
    .default("active"),
  personality: text("personality"),
  publicVisible: integer("public_visible", { mode: "boolean" })
    .notNull()
    .default(true),
  sharedToGenealogy: integer("shared_to_genealogy", { mode: "boolean" })
    .notNull()
    .default(true),
  hidden: integer("hidden", { mode: "boolean" }).notNull().default(false),
});

// ── Dog health tests (one row per scheme per dog) ──────────────────────────

export const dogHealthTests = sqliteTable(
  "dog_health_tests",
  {
    dogId: text("dog_id")
      .notNull()
      .references(() => dogs.id, { onDelete: "cascade" }),
    scheme: text("scheme").notNull(), // HD, ED, Eyes, DM, "prcd-PRA", ...
    value: text("value").notNull(),
    status: text("status", { enum: ["ok", "warn", "err"] }).notNull(),
    schemeOrg: text("scheme_org"), // FCI, OFA, BVA, ECVO, Laboklin, ...
    certUrl: text("cert_url"),
    date: text("date"),
    validUntil: text("valid_until"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.dogId, t.scheme] }),
  }),
);

// ── Dog achievements (chronological) ───────────────────────────────────────

export const dogAchievements = sqliteTable("dog_achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dogId: text("dog_id")
    .notNull()
    .references(() => dogs.id, { onDelete: "cascade" }),
  yearShort: text("year_short").notNull(), // "'25"
  text: text("text").notNull(),
  ordinal: integer("ordinal").notNull().default(0),
});

// ── Dog notes (private journal) ────────────────────────────────────────────

export const dogNotes = sqliteTable("dog_notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dogId: text("dog_id")
    .notNull()
    .references(() => dogs.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull(),
});

// ── Litters ────────────────────────────────────────────────────────────────

export const litters = sqliteTable("litters", {
  id: text("id").primaryKey(),
  kennelId: text("kennel_id").references(() => kennels.id, {
    onDelete: "set null",
  }),
  letter: text("letter").notNull(),
  callName: text("call_name").notNull(),
  poetic: text("poetic"),
  sireId: text("sire_id").notNull(),
  damId: text("dam_id").notNull(),
  matingDate: text("mating_date").notNull(),
  whelpingDate: text("whelping_date").notNull(),
  deliveryDate: text("delivery_date").notNull(),
  weekOfAge: integer("week_of_age").notNull(),
  status: text("status", {
    enum: [
      "planned",
      "mated",
      "pregnant",
      "whelped",
      "rearing",
      "delivery",
      "done",
    ],
  }).notNull(),
  total: integer("total").notNull(),
  males: integer("males").notNull(),
  females: integer("females").notNull(),
  available: integer("available").notNull(),
  applicationsTotal: integer("applications_total").notNull(),
});

// ── Puppies ────────────────────────────────────────────────────────────────

export const puppies = sqliteTable("puppies", {
  id: text("id").primaryKey(),
  litterId: text("litter_id")
    .notNull()
    .references(() => litters.id, { onDelete: "cascade" }),
  color: text("color").notNull(),
  colorLabel: text("color_label").notNull(),
  sex: text("sex", { enum: ["m", "f"] }).notNull(),
  name: text("name"),
  status: text("status", {
    enum: ["reservert", "tilgjengelig", "tilbudt", "beholdt", "solgt"],
  }).notNull(),
  statusLabel: text("status_label").notNull(),
  weight: real("weight").notNull(),
  trend: text("trend", { enum: ["up", "down", "flat"] }).notNull(),
  delta: text("delta").notNull(),
  notes: text("notes"),
  assignedTo: text("assigned_to"),
  tone: text("tone", { enum: ["sire", "dam"] }).notNull(),
});

// ── Applications ───────────────────────────────────────────────────────────

export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(),
  litterId: text("litter_id").references(() => litters.id, {
    onDelete: "cascade",
  }),
  applicant: text("applicant").notNull(),
  city: text("city").notNull(),
  status: text("status", {
    enum: ["NY", "I_SAMTALE", "GODKJENT", "TILBUDT_VALP", "AVVIST"],
  }).notNull(),
  statusLabel: text("status_label").notNull(),
  summary: text("summary").notNull(),
  receivedAt: text("received_at").notNull(),
  assignedPuppyId: text("assigned_puppy_id"),
});

export const applicationMatches = sqliteTable("application_matches", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  status: text("status", { enum: ["ok", "warn", "err"] }).notNull(),
});

// ── Inferred row types ─────────────────────────────────────────────────────

export type KennelRow = typeof kennels.$inferSelect;
export type DogRow = typeof dogs.$inferSelect;
export type DogHealthTestRow = typeof dogHealthTests.$inferSelect;
export type DogAchievementRow = typeof dogAchievements.$inferSelect;
export type DogNoteRow = typeof dogNotes.$inferSelect;
export type LitterRow = typeof litters.$inferSelect;
export type PuppyRow = typeof puppies.$inferSelect;
export type ApplicationRow = typeof applications.$inferSelect;
export type ApplicationMatchRow = typeof applicationMatches.$inferSelect;
