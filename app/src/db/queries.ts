/**
 * Server-only query helpers — all functions are async so the same code
 * works against better-sqlite3 (sync, dev) and D1 (Promise-based, prod).
 *
 * Drizzle's await on a sync better-sqlite3 result is a no-op, so the
 * dev cost is zero.
 */
import "server-only";
import { eq, desc, or } from "drizzle-orm";
import { getDb } from "./index";
import {
  dogs as dogsTable,
  dogHealthTests,
  dogAchievements,
  dogNotes,
  litters,
  puppies as puppiesTable,
  applications as applicationsTable,
  applicationMatches,
  type DogRow,
  type DogHealthTestRow,
  type DogAchievementRow,
} from "./schema";

/**
 * Universe-compatible Dog shape — matches the universe.ts Dog type
 * the existing UI components expect (health as Record, siblings +
 * offspring derived).
 */
export type DogFull = Omit<DogRow, "callName" | "deceased" | "color" | "microchip" | "personality" | "kennelId"> & {
  callName: string | undefined;
  deceased: string | undefined;
  color: string | undefined;
  microchip: string | undefined;
  personality: string | undefined;
  siblingIds: string[];
  offspringIds: string[];
  health: Record<
    string,
    {
      value: string;
      status: DogHealthTestRow["status"];
      scheme?: string;
      certUrl?: string;
      date?: string;
      validUntil?: string;
    }
  >;
  achievements: { y: string; t: string }[];
};

// ── Dogs ───────────────────────────────────────────────────────────────────

export async function listDogs() {
  const db = await getDb();
  return await db.select().from(dogsTable).all();
}

/**
 * Raw db row + simple hydration (used internally and where callers
 * just need health/achievements as arrays).
 */
export async function getDog(id: string) {
  const db = await getDb();
  const row = await db.select().from(dogsTable).where(eq(dogsTable.id, id)).get();
  if (!row) return null;
  const health = await db
    .select()
    .from(dogHealthTests)
    .where(eq(dogHealthTests.dogId, id))
    .all();
  const achievements = await db
    .select()
    .from(dogAchievements)
    .where(eq(dogAchievements.dogId, id))
    .orderBy(dogAchievements.ordinal)
    .all();
  return { ...row, health, achievements };
}

/**
 * Universe-compatible hydration for the Dog Detail page + tabs.
 * Returns the same shape as the legacy `Dog` type so existing tabs
 * (Helse, Titler, Profil, Stamtavle) don't need to be touched.
 */
export async function getDogFull(id: string): Promise<DogFull | null> {
  const db = await getDb();
  const row = await db.select().from(dogsTable).where(eq(dogsTable.id, id)).get();
  if (!row) return null;

  const [healthRows, achievementRows, siblingRows, offspringRows] = await Promise.all([
    db.select().from(dogHealthTests).where(eq(dogHealthTests.dogId, id)).all(),
    db
      .select()
      .from(dogAchievements)
      .where(eq(dogAchievements.dogId, id))
      .orderBy(dogAchievements.ordinal)
      .all(),
    // Siblings: same sire + dam, different id. We over-fetch on sireId
    // and filter in JS for damId+self below since N is tiny.
    row.sireId
      ? db
          .select()
          .from(dogsTable)
          .where(eq(dogsTable.sireId, row.sireId))
          .all()
      : Promise.resolve([] as DogRow[]),
    db
      .select()
      .from(dogsTable)
      .where(or(eq(dogsTable.sireId, id), eq(dogsTable.damId, id)))
      .all(),
  ]);

  // Filter siblings: same dam AND same sire AND not self
  const siblingIds = row.sireId && row.damId
    ? (siblingRows as DogRow[])
        .filter((s) => s.id !== id && s.damId === row.damId)
        .map((s) => s.id)
    : [];

  const health: DogFull["health"] = {};
  for (const h of healthRows as DogHealthTestRow[]) {
    health[h.scheme] = {
      value: h.value,
      status: h.status,
      scheme: h.schemeOrg ?? undefined,
      certUrl: h.certUrl ?? undefined,
      date: h.date ?? undefined,
      validUntil: h.validUntil ?? undefined,
    };
  }

  return {
    id: row.id,
    titles: (row.titles as string[]) ?? [],
    name: row.name,
    callName: row.callName ?? undefined,
    sex: row.sex,
    breed: row.breed,
    country: row.country,
    born: row.born,
    deceased: row.deceased ?? undefined,
    color: row.color ?? undefined,
    microchip: row.microchip ?? undefined,
    breeder: row.breeder,
    sireId: row.sireId,
    damId: row.damId,
    siblingIds,
    offspringIds: (offspringRows as DogRow[]).map((o) => o.id),
    health,
    achievements: (achievementRows as DogAchievementRow[]).map((a) => ({
      y: a.yearShort,
      t: a.text,
    })),
    status: row.status,
    personality: row.personality ?? undefined,
    publicVisible: row.publicVisible,
    sharedToGenealogy: row.sharedToGenealogy,
    hidden: row.hidden,
  };
}

export async function listDogNotesByDog(dogId: string) {
  const db = await getDb();
  return await db
    .select()
    .from(dogNotes)
    .where(eq(dogNotes.dogId, dogId))
    .orderBy(desc(dogNotes.createdAt))
    .all();
}

// ── Litters ────────────────────────────────────────────────────────────────

export async function listLitters() {
  const db = await getDb();
  return await db.select().from(litters).orderBy(desc(litters.whelpingDate)).all();
}

export async function getLitter(id: string) {
  const db = await getDb();
  const row = await db.select().from(litters).where(eq(litters.id, id)).get();
  if (!row) return null;
  const litterPuppies = await db
    .select()
    .from(puppiesTable)
    .where(eq(puppiesTable.litterId, id))
    .all();
  return { ...row, puppies: litterPuppies };
}

export async function listSires() {
  const db = await getDb();
  return await db
    .select()
    .from(dogsTable)
    .where(eq(dogsTable.sex, "m"))
    .orderBy(dogsTable.name)
    .all();
}

export async function listDams() {
  const db = await getDb();
  return await db
    .select()
    .from(dogsTable)
    .where(eq(dogsTable.sex, "f"))
    .orderBy(dogsTable.name)
    .all();
}

// ── Applications ───────────────────────────────────────────────────────────

export async function listApplications(litterId?: string) {
  const db = await getDb();
  const baseQuery = db.select().from(applicationsTable);
  const rows = await (litterId
    ? baseQuery
        .where(eq(applicationsTable.litterId, litterId))
        .orderBy(desc(applicationsTable.receivedAt))
        .all()
    : baseQuery.orderBy(desc(applicationsTable.receivedAt)).all());

  // Hydrate match indicators per application
  return await Promise.all(
    rows.map(async (a) => ({
      ...a,
      matches: await db
        .select()
        .from(applicationMatches)
        .where(eq(applicationMatches.applicationId, a.id))
        .all(),
    })),
  );
}
