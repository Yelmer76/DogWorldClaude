/**
 * Server-only query helpers — all functions are async so the same code
 * works against better-sqlite3 (sync, dev) and D1 (Promise-based, prod).
 *
 * Drizzle's await on a sync better-sqlite3 result is a no-op, so the
 * dev cost is zero.
 */
import "server-only";
import { eq, desc } from "drizzle-orm";
import { getDb } from "./index";
import {
  dogs as dogsTable,
  dogHealthTests,
  dogAchievements,
  litters,
  puppies as puppiesTable,
  applications as applicationsTable,
  applicationMatches,
} from "./schema";

// ── Dogs ───────────────────────────────────────────────────────────────────

export async function listDogs() {
  const db = await getDb();
  return await db.select().from(dogsTable).all();
}

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
