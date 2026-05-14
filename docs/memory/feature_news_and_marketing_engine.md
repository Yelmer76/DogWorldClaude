---
name: News engine + marketing automation (one backend, two services)
description: KI aggregator that powers personalized per-breed newsfeed (paid add-on) AND auto-generates DogWorld marketing posts; same infra, two revenue streams
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Added to scope 2026-05-11. The strategic insight: we need a content-aggregation backend anyway (for marketing, regulatory awareness, in-app feeds). If we build it right, we can also sell it to users as a personalized newsfeed. One backend, two services.

**Two services from one infrastructure:**

**Service 1 — Personalized newsfeed for kennels/owners (paid add-on):**
- Personalized by breed(s), region, interests
- Categories: shows & trials, laws/regulations, health alerts, industry, community
- Pricing: free basic tier (5 curated/week, generic feed); **30 NOK / 3 USD per month** for Pro (full personalization, all categories, push alerts, multi-language source translation)
- Margin ~80% — covers infra and then some

**Service 2 — Marketing automation engine (internal use):**
- Same backend → AI generates social-media posts that link back to DogWorld
- Real news as anchor, DogWorld value prop as hook ("New show in Holland this fall! With DogWorld you'd already have the entry on your calendar...")
- Per-channel format: FB / IG Reels / TikTok / X thread / LinkedIn / YouTube Shorts
- Volume target: 5–15 posts/day across channels, all real-news-anchored, all linking back

**Sources to scrape:**
- Kennel club calendars (NKK, SKK, DKK, VDH, KC, AKC, FCI)
- Breed clubs (hundreds; pick top per breed per country)
- Regulators (Mattilsynet, USDA, DEFRA)
- Veterinary journals (PubMed, JAVMA RSS)
- Pet food brands (recalls, new products)
- Major events (FCI World Dog Show, European Dog Show)
- Genetic labs (Embark, Wisdom Panel, Laboklin blogs)
- Public social (Reddit r/dogbreeding, public FB groups for pulse)

**Aggregator architecture:**
- Per-source scrapers on schedule (RSS where available, Firecrawl + Claude for unstructured)
- Claude structures each item: title, summary, date, breed tags, region tags, category, importance, source URL
- Translation to all 6 languages at ingestion (one job, one cost)
- Image: source if allowed → AI-generated illustration (clearly marked) → stock fallback
- Dedup: same story across sources merges to one item with multiple links
- Personalization for newsfeed: rank by breed + region + interests + freshness
- Marketing distribution: Claude generates per-channel drafts, human approves, Buffer publishes

**Cost shape:**
- Scraping infra: ~50 NOK/mo
- LLM processing: ~0.01 NOK/article × 200/day ≈ 60 NOK/mo
- Marketing post generation: ~150 NOK/mo
- AI image/video for TikTok/Reels: 1,000–3,000 NOK/mo if active
- **Total infra:** 1,500–4,000 NOK/mo for the whole engine
- 200 paying newsfeed users × 30 NOK/mo = 6,000 NOK/mo (covers it with margin)
- Marketing engine ROI: 2 new DogWorld customers/mo (200 NOK each) pays it back in 1–2 months

**Risks (real, must mitigate):**
- **Copyright:** never republish full articles. Short summary + link only. Fits fair use / sitatretten.
- **Authenticity in marketing posts:** AI posts can feel slimy. Quality threshold: nothing publishes without human approval, never pretends to be a person, AI-generated video labeled clearly.
- **Source quality:** garbage in = garbage out. Curate source list manually, prune offenders.
- **Fact-check on regulatory/medical:** double-check official source before pushing alert. A wrong alert costs trust.
- **No spam in Facebook groups:** hard line. Marketing engine NEVER posts to community groups. Groups are for real humans only.

**Roadmap placement:**
- **Marketing engine: BUILD BEFORE LAUNCH.** Run in background, build DogWorld presence on social before product is live. At launch we already have a small follower base who knows the name.
- **Newsfeed service: v2 or v3 (months 4–8 post-launch).** Requires mature infra, audience large enough that 30 NOK/mo means something, trust earned that we pick good content. Free basic tier earlier to build habit.

**Connections to other DogWorld features (the closing circle):**
- **Travel companion:** regulatory changes (BSL, tapeworm, ferry rules) auto-route to travel module as alerts
- **Health dashboard:** new DNA tests / research relevant to user's breed surface in health view with "newly recommended" tag
- **Buyer guide:** general puppy-week-relevant content can appear as bonus alongside kennel's own text (clearly labeled "DogWorld bonus", not as kennel's words)
- **Genealogy:** new show titles or health DB entries auto-update affected dogs

The aggregator becomes the central nervous system feeding fresh information to every other module. User doesn't search — info comes to her.

**How to apply:**
- Treat the news/marketing engine as ONE service with two interfaces, not two separate builds. Architecturally this means one ingestion + storage layer, two consumption layers (user newsfeed personalization + marketing post generation).
- When proposing AI features that need fresh external info, ask first: "can the news engine deliver this?" — likely yes
- For pricing decisions, the 30 NOK/mo tier is set at the level that covers infra alone; this is a sticky-feature add-on, not a profit center
- For marketing decisions, the engine should be running quietly in the background well before launch
- For ethical/quality decisions, lean conservative on AI-generated content disclosure — over-disclose, never under-disclose
