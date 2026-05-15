import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit config for the LOCAL dev SQLite database.
 *
 * Production (Cloudflare D1) uses the same schema but a different
 * driver — when we deploy in Sprint 15, we'll add a separate
 * `drizzle.prod.config.ts` and run migrations via
 * `wrangler d1 migrations apply`.
 */
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./.dev.db",
  },
  verbose: true,
  strict: true,
});
