---
name: Infrastructure decision — Cloudflare-heavy + Neon Postgres
description: Locked stack — Cloudflare for Workers/Pages/R2/KV/Queues/Durable Objects/Vectorize/AI Gateway/Browser Rendering, Neon serverless Postgres (EU) for relational, Better-Auth for identity, Resend for email
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Locked 2026-05-14. **This supersedes the earlier tech_stack_decision.md** which recommended Supabase. The user picked Cloudflare as primary infrastructure provider; we landed on Cloudflare-heavy with Neon Postgres for the one piece Cloudflare can't yet do well.

## v1 vs scaled — IMPORTANT REVISION (2026-05-14)

**For v1 we use Cloudflare D1 (SQLite-based) as the primary database.** Neon Postgres is the planned upgrade path when we hit any of three triggers:
- 1,000+ paying customers (founder-set threshold)
- Shared genealogy feature launches (v2-v3 — needs Postgres recursive CTEs at scale)
- Database size approaches 5 GB (D1 has a 10 GB hard cap per database)

This revision was made because for v1 (0–1,000 customers, ~hundreds of dogs) D1 handles the load with no compromise, and the founder values "less ulik tech" — staying 100% in Cloudflare's ecosystem reduces operational complexity. Drizzle ORM is used as the abstraction layer, so the eventual migration to Postgres is primarily a schema rewrite, not a code rewrite (estimated 1-week sprint when triggered).

The rest of this document describes the Neon Postgres path. **Treat it as the v2 architecture documentation, not v1.** For v1, replace "Neon Postgres + Hyperdrive" with "Cloudflare D1" everywhere it appears below — the rest of the stack (Workers, Pages, R2, KV, Queues, Vectorize, AI Gateway, etc.) remains identical.

---

## One-line summary (v2 / scaled architecture)

Cloudflare for everything except primary relational data, which lives in Neon serverless Postgres (EU region) accessed via Cloudflare Hyperdrive.

## The stack

| Component | Role | Why |
|---|---|---|
| Cloudflare Pages | Frontend hosting (Next.js) | Free under 500k req/mo, edge-distributed |
| Cloudflare Workers | API + edge functions | V8 isolates in 300+ cities, cheaper than Lambda |
| **Neon Postgres (EU)** | Primary relational DB | Serverless, RLS native, recursive CTEs work, no 10GB cap |
| Cloudflare Hyperdrive | Pooler + cache to Neon | Reduces edge → DB latency, caches reads |
| Cloudflare R2 | Files (images, PDFs, video) | S3-compatible, **zero egress** — critical for image serving |
| Cloudflare KV | Sessions, rate limits, hot reads | Edge-cached, eventually consistent, sub-10ms |
| Cloudflare Queues | Background jobs (migration, scraping, AI gen) | $0.40/M ops, replaces Redis/SQS |
| Cloudflare Durable Objects | Per-kennel real-time coordination, chat | Single instance per kennel = strong consistency |
| Cloudflare Vectorize | Embeddings for "find similar dogs" | 5M vectors free, integrates with Workers AI |
| Cloudflare AI Gateway | Proxy + cache for Claude calls | Caches identical prompts (huge savings), logs everything |
| Cloudflare Workers AI | Cheap small-model inference | For embeddings, classification — not Claude-quality work |
| Cloudflare Browser Rendering | Headless Chrome for migration scraping | Avoids Firecrawl cost for user-owned-data scenarios |
| Cloudflare Email Workers | Inbound email (replies routing) | Programmable email-to-app bridges |
| Resend | Outbound transactional email | Cloudflare's own outbound email is immature; $20/mo for 50k |
| Better-Auth | Identity, passkeys, magic link, 2FA | Open source, runs in Workers, no subscription |
| Stripe + Stripe Tax | Payments + EU VAT | Industry standard; webhooks via Workers + Queues |
| Sentry | Error + perf monitoring | Free tier covers us long; complements Workers Observability |
| Cloudflare Analytics Engine | Product event analytics (clicks, search, conversion) | 10M events/mo free, queryable with SQL |
| **Anthropic API (Claude)** | Heavy AI work — extraction, translation, generation | Best quality; EU region available; routed via AI Gateway |

## The critical decision: NOT D1 as primary DB

Reasons we rejected D1 even though it's tempting (one-vendor, cheapest):
- 10 GB limit per database — shared genealogy could blow this
- 50 ms query budget — pedigree traversal at depth 10 risks exceeding
- No Row-Level Security (Postgres has it native — huge for multi-tenant safety)
- Weaker full-text search than Postgres tsvector + GIN
- No JSONB with index support
- Single writer — concurrent migrations queue

D1 is great for: event logs, ephemeral state, micro-services. NOT primary multi-tenant DB.

## Core data model — the spine (Postgres tables)

Identity & access:
- `users`, `kennels`, `user_kennel_role` (Admin only in v1)

Dogs:
- `dogs` (master record), `dog_registrations` (N per dog, one per registry)
- `dog_relationships` (the pedigree graph — `dog_id → parent_dog_id`, role sire/dam, confidence)
- `titles`, `show_results`, `working_results`
- `health_tests` (polymorphic, scheme + raw_value + normalized)
- `vaccinations`, `dewormings`, `weight_log`, `vet_visits` (private)

Litters:
- `litters`, `litter_puppies`, `litter_daily_logs`

Files:
- `files` (one row per upload, R2 key + metadata)
- `dog_photos`, `litter_photos` (joins)

Buyers:
- `buyer_applications`, `buyers`, `dog_ownership_history`
- `buyer_guide_templates`, `buyer_guide_sections`
- `puppy_journeys`

Karma & quality:
- `karma_events` (audit-trail of all karma grants)
- `ethics_declarations`, `reports` (with status: open/dismissed/strike1/strike2/strike3/removed)

News engine:
- `news_sources` (the 50 from Appendix 1 + growth)
- `news_articles` (with translations in JSONB per language)
- `user_news_state` (read/saved/notified per user)

Migration:
- `migration_jobs`

Audit & GDPR:
- `audit_log` (append-only)
- `data_deletion_requests`

## Security model

- Postgres **Row-Level Security from day 1** (every table has tenant policy)
- TLS 1.3 + HSTS everywhere
- PII fields (email, phone, buyer contact) column-level encrypted on top of at-rest encryption
- **No passwords stored** — passkey + magic link
- Audit log immutable (append-only)
- R2 files via signed URLs, never public-by-default
- Rate-limiting in KV per IP/user
- Secrets in Cloudflare Secrets Store, never in env vars or logs
- EU region (Frankfurt/Amsterdam) for all PII

## Cost shape

| Scale | Customers | Total NOK/mo | Notes |
|---|---|---|---|
| Dev | 0 | ~50 | Just AI prototyping; everything else free tier |
| Early | 100 | ~500 | Neon Launch + R2 storage + Resend |
| Growth | 1,000 | ~3,500 | Neon Scale + Workers Paid + R2 + Claude API + Vectorize |
| Scaled | 10,000 | ~25,000 | Neon Pro + Workers + R2 + Claude (~1500) + monitoring |

At 1k customers × 200 NOK/mo subscription = 200,000 NOK revenue. Drift ≈ 1.75% of revenue.

## Critical risks held in mind

1. **Neon dependency** — mitigated by openness (Postgres = portable to RDS/Supabase) + weekly backup export
2. **Workers limits (30s CPU, 128MB)** — heavy jobs run as queue tasks, not sync
3. **Neon cold start (1-2s)** — Hyperdrive cache + always-on on paid tier
4. **Cloudflare lock-in** — Workers are Node-compatible; R2 is S3-compatible; Queues replaceable with SQS
5. **Vectorize is newer** — keep embeddings format provider-agnostic so we can swap
6. **AI price volatility** — AI Gateway cache + route light tasks to Workers AI
7. **Deep pedigree query perf** — materialized ancestor-paths updated on write; KV cache for hot paths

## Operations

- Backup: Neon 7d-30d PITR + weekly export to R2 (cross-vendor insurance)
- Monitoring: Cloudflare Workers Observability + Sentry
- IaC: Terraform or Pulumi for full re-provisioning under 1h
- CI/CD: push to main → Cloudflare Pages auto-deploys; Workers via wrangler; DB migrations via drizzle-kit/prisma migrate in GitHub Actions
- Staging: Neon branch (forks DB in seconds, free)
- On-call: founder, Sentry mobile alerts

## How to apply

- When proposing a new feature, default storage to Postgres tables. R2 for files, KV for hot/ephemeral, Vectorize for similarity, Queues for async.
- When proposing a new background job, route through Cloudflare Queues with idempotent handlers.
- When proposing AI usage, route through AI Gateway (NEVER call Anthropic directly from Workers — always via Gateway for cache + observability)
- All multi-tenant tables MUST have RLS policies from creation
- All user-facing strings MUST go through i18n (no hardcoded text)
- Image uploads: store original in R2, generate variants on-demand via Cloudflare Images or Workers
- Schema changes: never bypass migrations; always reviewed in PR

## What this DOES NOT change from earlier decisions

- Mobile-first UX (still right)
- Multi-language i18n (still right — fits Workers+Postgres fine)
- Camera-first input (still right)
- "DogWorld(tmp)" placeholder (still right)
- Karma replaces discount referrals (still right — implements as `karma_events` audit table + `karma_score` column on kennels)
- Admin-only roles in v1 with extensible architecture (`user_kennel_role` table from day 1)
- News engine + marketing engine (one shared aggregator backend → fits Workers + Queues + Vectorize cleanly)
