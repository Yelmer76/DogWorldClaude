/**
 * Server-only query helpers — high-level reads/writes that pages and
 * route handlers can call directly. Keep all SQL in this file (or in
 * the schema) so we have one place to optimise + swap drivers when
 * Sprint 15 moves to D1.
 */
import "server-only";
import { eq, desc } from "drizzle-orm";
import { db } from "./index";
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

export function listDogs() {
  return db.select().from(dogsTable).all();
}

export function getDog(id: string) {
  const row = db.select().from(dogsTable).where(eq(dogsTable.id, id)).get();
  if (!row) return null;
  const health = db
    .select()
    .from(dogHealthTests)
    .where(eq(dogHealthTests.dogId, id))
    .all();
  const achievements = db
    .select()
    .from(dogAchievements)
    .where(eq(dogAchievements.dogId, id))
    .orderBy(dogAchievements.ordinal)
    .all();
  return { ...row, health, achievements };
}

// ── Litters ────────────────────────────────────────────────────────────────

export function listLitters() {
  return db.select().from(litters).orderBy(desc(litters.whelpingDate)).all();
}

export function getLitter(id: string) {
  const row = db.select().from(litters).where(eq(litters.id, id)).get();
  if (!row) return null;
  const litterPuppies = db
    .select()
    .from(puppiesTable)
    .where(eq(puppiesTable.litterId, id))
    .all();
  return { ...row, puppies: litterPuppies };
}

export function listSires() {
  return db
    .select()
    .from(dogsTable)
    .where(eq(dogsTable.sex, "m"))
    .orderBy(dogsTable.name)
    .all();
}

export function listDams() {
  return db
    .select()
    .from(dogsTable)
    .where(eq(dogsTable.sex, "f"))
    .orderBy(dogsTable.name)
    .all();
}

// ── Applications ───────────────────────────────────────────────────────────

export function listApplications(litterId?: string) {
  const rows = litterId
    ? db
        .select()
        .from(applicationsTable)
        .where(eq(applicationsTable.litterId, litterId))
        .orderBy(desc(applicationsTable.receivedAt))
        .all()
    : db
        .select()
        .from(applicationsTable)
        .orderBy(desc(applicationsTable.receivedAt))
        .all();

  // Hydrate match indicators per application
  return rows.map((a) => ({
    ...a,
    matches: db
      .select()
      .from(applicationMatches)
      .where(eq(applicationMatches.applicationId, a.id))
      .all(),
  }));
}
