/**
 * Seed the local dev database with the Granheim test universe.
 *
 * Idempotent — re-running deletes existing rows then re-inserts from
 * the source-of-truth fixtures in src/data/universe.ts. Run this
 * any time the universe changes.
 *
 * Usage:
 *   npm run db:reset && npm run db:migrate && npm run db:seed
 */
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  granheim,
  dogs as dogFixtures,
  litterC,
  puppies as puppyFixtures,
  applications as applicationFixtures,
} from "../data/universe";
import * as schema from "./schema";

const sqlite = new Database("./.dev.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

async function seed() {
  console.log("Seeding DogWorld(tmp) test universe…");

  // ── Wipe in dependency order ───────────────────────────────────────────
  db.delete(schema.magicTokens).run();
  db.delete(schema.sessions).run();
  db.delete(schema.users).run();
  db.delete(schema.applicationMatches).run();
  db.delete(schema.applications).run();
  db.delete(schema.puppies).run();
  db.delete(schema.litters).run();
  db.delete(schema.dogNotes).run();
  db.delete(schema.dogAchievements).run();
  db.delete(schema.dogHealthTests).run();
  db.delete(schema.dogs).run();
  db.delete(schema.kennels).run();

  // ── Kennel ──────────────────────────────────────────────────────────────
  db.insert(schema.kennels)
    .values({
      id: granheim.id,
      name: granheim.name,
      affix: granheim.affix,
      affixPosition: granheim.affixPosition,
      city: granheim.city,
      country: granheim.country,
      founded: granheim.founded,
      breed: granheim.breed,
      owners: granheim.owners,
      affiliations: granheim.affiliations.join(", "),
      karmaTier: granheim.karmaTier,
      ethicsVerified: granheim.ethicsVerified,
    })
    .run();
  console.log(`  ✓ kennel: ${granheim.name}`);

  // ── Dogs (defer FKs since sire/dam reference each other) ────────────────
  const allDogs = Object.values(dogFixtures);
  for (const d of allDogs) {
    db.insert(schema.dogs)
      .values({
        id: d.id,
        kennelId:
          d.breeder === granheim.name || d.breeder === "Kennel Granheim"
            ? granheim.id
            : null,
        titles: d.titles,
        name: d.name,
        callName: d.callName,
        sex: d.sex,
        breed: d.breed,
        country: d.country,
        born: d.born,
        deceased: d.deceased,
        color: d.color,
        microchip: d.microchip,
        breeder: d.breeder,
        sireId: d.sireId,
        damId: d.damId,
        status: d.status,
        personality: d.personality,
        publicVisible: d.publicVisible ?? true,
        sharedToGenealogy: d.sharedToGenealogy ?? true,
        hidden: d.hidden ?? false,
      })
      .run();
  }
  console.log(`  ✓ ${allDogs.length} dogs`);

  // ── Health tests + achievements per dog ─────────────────────────────────
  let healthCount = 0;
  let achievementCount = 0;
  for (const d of allDogs) {
    for (const [scheme, test] of Object.entries(d.health)) {
      db.insert(schema.dogHealthTests)
        .values({
          dogId: d.id,
          scheme,
          value: test.value,
          status: test.status,
          schemeOrg: test.scheme,
          certUrl: test.certUrl,
          date: test.date,
          validUntil: test.validUntil,
        })
        .run();
      healthCount++;
    }
    d.achievements.forEach((a, idx) => {
      db.insert(schema.dogAchievements)
        .values({
          dogId: d.id,
          yearShort: a.y,
          text: a.t,
          ordinal: idx,
        })
        .run();
      achievementCount++;
    });
  }
  console.log(`  ✓ ${healthCount} health tests`);
  console.log(`  ✓ ${achievementCount} achievements`);

  // ── Litter ──────────────────────────────────────────────────────────────
  db.insert(schema.litters)
    .values({
      id: litterC.id,
      kennelId: granheim.id,
      letter: litterC.letter,
      callName: litterC.callName,
      poetic: litterC.poetic,
      sireId: litterC.sireId,
      damId: litterC.damId,
      matingDate: litterC.mating,
      whelpingDate: litterC.whelping,
      deliveryDate: litterC.delivery,
      weekOfAge: litterC.weekOfAge,
      status: litterC.status,
      total: litterC.count.total,
      males: litterC.count.males,
      females: litterC.count.females,
      available: litterC.available,
      applicationsTotal: litterC.applicationsTotal,
    })
    .run();
  console.log(`  ✓ litter: ${litterC.callName}`);

  // ── Puppies ─────────────────────────────────────────────────────────────
  for (const p of puppyFixtures) {
    db.insert(schema.puppies)
      .values({
        id: p.id,
        litterId: litterC.id,
        color: p.color,
        colorLabel: p.colorLabel,
        sex: p.sex,
        name: p.name,
        status: p.status,
        statusLabel: p.statusLabel,
        weight: p.weight,
        trend: p.trend,
        delta: p.delta,
        notes: p.notes,
        assignedTo: p.assignedTo,
        tone: p.tone,
      })
      .run();
  }
  console.log(`  ✓ ${puppyFixtures.length} puppies`);

  // ── Applications + per-app match indicators ─────────────────────────────
  let matchCount = 0;
  for (const a of applicationFixtures) {
    db.insert(schema.applications)
      .values({
        id: a.id,
        litterId: litterC.id,
        applicant: a.applicant,
        city: a.city,
        status: a.status,
        statusLabel: a.statusLabel,
        summary: a.summary,
        receivedAt: a.receivedAt,
        assignedPuppyId: a.assignedPuppyId,
      })
      .run();
    for (const m of a.matches) {
      db.insert(schema.applicationMatches)
        .values({
          applicationId: a.id,
          label: m.label,
          status: m.status,
        })
        .run();
      matchCount++;
    }
  }
  console.log(`  ✓ ${applicationFixtures.length} applications`);
  console.log(`  ✓ ${matchCount} match indicators`);

  // ── Seed users (Sprint 14) ──────────────────────────────────────────────
  const now = new Date().toISOString();
  db.insert(schema.users)
    .values([
      {
        id: "user-ole",
        email: "ole@granheim.no",
        name: "Ole Granheim",
        kennelId: granheim.id,
        createdAt: now,
      },
      {
        id: "user-marit",
        email: "marit@granheim.no",
        name: "Marit Granheim",
        kennelId: granheim.id,
        createdAt: now,
      },
    ])
    .run();
  console.log("  ✓ 2 users (Ole, Marit)");

  console.log("\nDone. Test the db with: npm run db:studio");
  console.log("Login locally: visit /login and enter ole@granheim.no");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
