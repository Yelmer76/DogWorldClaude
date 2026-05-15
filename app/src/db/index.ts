/**
 * Database client.
 *
 * Local dev: connects to ./.dev.db via better-sqlite3 (synchronous).
 * Production (Cloudflare Pages, Sprint 15): swap this file to use
 * `drizzle-orm/d1` against env.DB.
 *
 * Module-level singleton so we don't re-open the SQLite file on
 * every import — Next.js's HMR re-imports modules frequently.
 */
import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __dogworldDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

const DB_PATH = process.env.DOGWORLD_DB_PATH ?? "./.dev.db";

function open() {
  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  return drizzle(sqlite, { schema });
}

export const db = globalThis.__dogworldDb ?? open();

if (process.env.NODE_ENV !== "production") {
  globalThis.__dogworldDb = db;
}

export { schema };
