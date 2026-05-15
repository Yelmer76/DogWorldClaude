import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * @opennextjs/cloudflare config — wraps Next.js into a Cloudflare
 * Workers bundle. Run `npm run cf:build` to produce the deployable
 * artifact, then `npm run cf:deploy`.
 */
export default defineCloudflareConfig();
