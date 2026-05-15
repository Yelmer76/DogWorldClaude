/**
 * Augments the CloudflareEnv type from @opennextjs/cloudflare with
 * our wrangler.toml bindings. After deploy, run `wrangler types` to
 * regenerate this from wrangler.toml automatically.
 */
import type {} from "@opennextjs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    RESEND_API_KEY?: string;
    RESEND_FROM?: string;
  }
}

export {};
