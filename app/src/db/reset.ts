/**
 * Wipe the local dev database (and its WAL files) so the next
 * `npm run db:migrate && npm run db:seed` starts from scratch.
 *
 * Usage: npm run db:reset
 */
import { existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const targets = [".dev.db", ".dev.db-shm", ".dev.db-wal"];

for (const file of targets) {
  const abs = resolve(process.cwd(), file);
  if (existsSync(abs)) {
    unlinkSync(abs);
    console.log(`✓ removed ${file}`);
  }
}

console.log("\nNext: npm run db:migrate && npm run db:seed");
