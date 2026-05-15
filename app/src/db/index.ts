/**
 * Database client — auto-switches driver based on runtime.
 *
 * Local dev (`next dev`):
 *   better-sqlite3 against ./.dev.db (sync, fast, file-based)
 *
 * Production (Cloudflare Workers via @opennextjs/cloudflare):
 *   drizzle-orm/d1 against env.DB binding (the D1 instance configured
 *   in wrangler.toml under [[d1_databases]])
 *
 * Server components, route handlers, and lib helpers should import
 * `getDb()` instead of `db` so the right driver is used per request.
 */
import "server-only";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import * as schema from "./schema";

export type DogworldDb =
  | ReturnType<typeof drizzleSqlite<typeof schema>>
  | ReturnType<typeof drizzleD1<typeof schema>>;

declare global {
  // eslint-disable-next-line no-var
  var __dogworldSqliteDb: ReturnType<typeof drizzleSqlite<typeof schema>> | undefined;
}

const isCloudflare = typeof process === "undefined" || !!process.env.CF_PAGES;

function openSqlite() {
  // Lazy require so Cloudflare Workers bundles don't try to import a
  // native Node addon they can't run
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3") as typeof import("better-sqlite3");
  const path = process.env.DOGWORLD_DB_PATH ?? "./.dev.db";
  const sqlite = new Database(path);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  return drizzleSqlite(sqlite, { schema });
}

/**
 * Returns the per-request db client. In dev we cache one
 * better-sqlite3 connection per Node process (HMR re-imports
 * modules a lot). In Cloudflare we open a fresh D1 binding
 * per request via getCloudflareContext().
 */
export async function getDb(): Promise<DogworldDb> {
  if (isCloudflare) {
    // Lazy import so dev (Node) doesn't try to load the worker-only module
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    if (!env.DB) {
      throw new Error(
        "DB binding mangler — sjekk wrangler.toml [[d1_databases]] + at appen er deployd via @opennextjs/cloudflare",
      );
    }
    return drizzleD1(env.DB, { schema });
  }

  // Local dev: cached singleton
  if (!globalThis.__dogworldSqliteDb) {
    globalThis.__dogworldSqliteDb = openSqlite();
  }
  return globalThis.__dogworldSqliteDb;
}

/**
 * Synchronous SQLite-only accessor for scripts (db:seed, db:reset).
 * Throws if called from a Cloudflare context — those scripts only
 * run locally against the dev database.
 */
export function getSqliteDbSync() {
  if (isCloudflare) {
    throw new Error("getSqliteDbSync() er kun for lokale Node-scripts");
  }
  if (!globalThis.__dogworldSqliteDb) {
    globalThis.__dogworldSqliteDb = openSqlite();
  }
  return globalThis.__dogworldSqliteDb;
}

export { schema };
