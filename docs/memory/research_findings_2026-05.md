---
name: DogWorld market research findings (May 2026)
description: Synthesized findings from initial market research — competitive gaps, data-model pitfalls, migration approach, MVP scope
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Initial research conducted 2026-05-10 covered four angles: live kennel website survey (~25 sites), domain-data spec (pedigrees/titles/health), competitive landscape, migration/scraping feasibility.

**Key competitive findings:**
- Only **Breedera** (UK, £9.99/mo) is genuinely mobile-first; BreedTools is PWA-first and close. Everyone else (BreederBuddy, BreederCloudPro, ZooEasy, Dog Breeder Pro, KennelMate, Breeder's Standard) is desktop-UX-shrunk-to-phone.
- **Breedr WP plugin last updated Feb 2018** — most-recommended WP solution is effectively abandoned.
- **Norwegian/Nordic market is essentially unserved** at the SaaS level. NKK is the registry but offers no breeder back-office or website.
- NKK launched a new side-register in autumn 2025 → every Norwegian breeder is being pushed into new workflows right now → adoption window.
- Serious-breeder price sweet spot: **~€30/mo all-in** (back-office + website).

**Five simultaneous gaps:**
1. Mobile-first (whelping-box / scale-in-hand UX)
2. Migration from existing sites (literally nobody addresses this)
3. Nordic localization + NKK integration
4. AI-assisted features (almost nothing real anywhere)
5. Public site + back-office unified, not bolted-on

**Data-model pitfalls (will bite you if ignored):**
- **Hip scoring is mutually unconvertible** across OFA / FCI / PennHIP / BVA — store raw value + scheme, don't pre-normalize.
- **Title position varies** — FCI puts CH titles as prefix, AKC puts working titles as suffix. Store as `(code, registry, country, position, awarded_date, discipline)` separate from dog's name.
- **Same dog has multiple registration numbers** when imported between countries — N registrations per dog.
- **Two health audiences:** public (puppy buyers, certificate-backed) vs internal (full vet history). Different entities.
- COI + AVK (Ahnenverlust-Koeffizient, % unique ancestors) both matter in Scandinavia. Standard target: COI ≤ 6.25% over 5–6 gen.

**Source-platform distribution** (real sample, NO/UK/DE/US): WordPress ~42%, Wix ~21%, long-tail builders ~21%, hand-coded HTML/PHP ~16%. Facebook-only is a non-trivial cohort.

**Migration tech stack picks:**
- Crawl: Firecrawl `/crawl` + `/scrape` (markdown + screenshot)
- Fast-path: WordPress REST API via Application Passwords (~half of users skip scraping)
- Extraction: Claude Sonnet with strict JSON schema, per-field confidence
- Pedigree PDFs: Reducto / LlamaParse → vision-LLM fallback
- Image storage: Cloudflare R2 (zero egress)
- HITL review UI is non-optional
- Cost per migration: $1–8 small / $20–40 ancient WP — easily a free wedge

**Section taxonomy on real kennel sites:**
- *Universal*: Home/About/Our dogs (split M/F: Hanner/Tisper)/Puppies (Valper)/Litters (letter-coded in EU: A-Wurf)/Contact
- *Common*: Per-dog page, retired dogs, gallery, news/blog, stud page, application form, memorial (NO: **Minneside**, DE: **Unvergessen**, EN: Rainbow Bridge), testimonials
- *Rare/differentiation*: progeny tracking ("bred by us"), "stud used elsewhere", weekly puppy diary, breeding philosophy page, multi-language

**Two distinct buyer personas → two starter templates:**
1. Show/sport/working-line — pedigrees, titles, results, lineage stories
2. Commercial Lab/Cavalier — application forms, deposits, FAQ, affiliate upsell

**Integration prizes** (rough value order): NKK DogWeb (no API, scrape) > SKK + DKK > OFA > Embark for Breeders > Laboklin certificate verification > K9data + Working-dog.com.

**No standard pedigree interchange exists.** No K9 GEDCOM. Support **Import from ZooEasy (.zoo)** and **Breeders Assistant (CSV/XML)** as named import paths.

**MVP scope (recommended):**
- Must-have: mobile site builder w/ universal sections, Dog entity (FCI/NKK fields), Litter as first-class, Minneside, photo mirroring, AI migration with HITL
- v1 differentiators: NKK pre-fill, COI/AVK 5-gen calculator, NO+EN at launch (SE/DK/DE soon), 2 templates
- v2 fast-follows: Stripe deposits, "stud used elsewhere", ZooEasy import, Embark/Laboklin ingestion, per-breed RAS validation
- NOT in v1: boarding/daycare, multi-species, full accounting

**How to apply:**
- When discussing schema, default to "store raw value + scheme/registry/country" pattern for any registry-touched field
- When discussing migration, default to the WordPress-fast-path-then-Firecrawl-then-vision-LLM pipeline above
- When discussing positioning vs competitors, anchor on the five-gap analysis — those are our wedges
- The Norwegian/NKK angle is a deliberate moat, not just a localization preference
