---
name: News engine source list (Appendix 1 seed)
description: 50 evaluated content sources for the news aggregator — Scandinavia, Germany, UK, Benelux, pan-EU; rated on category, country, language, authority, news rate, feed type
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Seed list of 50 curated sources for the DogWorld news engine, published as Appendix 1 in the PDF report on 2026-05-11. The strategic structure matters more than the specific URLs — URLs and feed availability must be re-verified at implementation time.

**Distribution by region:**
- Scandinavia: 15 (NO 6, SE 5, DK 4)
- Germany: 12
- UK: 10
- Benelux: 8 (NL 4, BE 3, LU 1)
- Pan-European / global: 5

**Evaluation dimensions (six per source):**
- Category: KK (kennel club) · RG (regulator) · RB (breed club) · BR (working/sport) · VT (vet/medicine) · MG (magazine) · LB (lab/test) · Event
- Country / region
- Primary language (everything translates to our 6 at ingestion)
- Authority (1–5 stars): 5 = primary authority, 4 = widely respected, 3 = supplementary, 2 = background, 1 = niche
- News rate: Daily / Weekly / Monthly / Sporadic
- Feed: RSS / Web (crawl) / NL (newsletter) / Soc (social) / API

**The five-star (highest authority) sources are:**
NKK, Mattilsynet, Norsk Retrieverklubb, Norsk Schäferhund Klub, SKK, Jordbruksverket, SBK, SSRK, DKK, Fødevarestyrelsen, Dansk Retriever Klub, Schæferhundeklubben for Danmark, VDH, SV, ADRK, DTK, KfT, PSK, JGHV, DRC, BMEL, The Kennel Club, Dog World, Our Dogs, Crufts, BVA, Defra, Raad van Beheer, NVWA, KMSH, FAVV-AFSCA, FCI, Laboklin.

**Sources governance (how we manage the list over time):**
- Measure quality per source (click-through, error reports) → low quality is downranked or removed
- Frequency caps for sources that suddenly spam
- Active search for new sources in under-covered breed × region pairs
- Users can propose sources
- Annual audit of the entire list

**Feed ranking signals for personalized newsfeed (composed at runtime):**
1. Breed match (user's registered breeds)
2. Region match (user's country/region)
3. Source authority (1–5 stars)
4. Freshness (with exceptions for evergreen regulatory content)
5. User-tuned category weights
6. AI-flagged high-importance items (recalls, outbreaks) push regardless of personalization

**Critical caveats:**
- URLs and feed availability MUST be re-verified at implementation time. Many breed clubs and kennel clubs change sites, drop RSS, or alter access patterns without notice.
- Many sources have no RSS — we crawl HTML on a schedule
- Public-data scraping is legal per Meta v. Bright Data (2024) and HiQ v. LinkedIn — but never behind login, never contact info, never trademark-protected content
- Per source: scrape politely (low rate, identify ourselves, honor robots.txt where it makes sense)

**Sources NOT in the seed but worth considering for v1.1+:**
- Finnish Kennel Club (Suomen Kennelliitto) — left out because Finland isn't strict Scandinavia
- Austrian KKÖ — left out, covered indirectly by VDH neighborhood
- Swiss SKG — left out, covered indirectly
- French Société Centrale Canine — left out, French not in our 6 launch languages
- Spanish RSCE — left out
- Polish ZKwP — left out

**How to apply:**
- When building the news ingestion pipeline, structure source records to hold all six evaluation dimensions — they drive ranking, scheduling, and trust
- Treat the list as a living document. The yearly audit is non-optional.
- The five-star authorities (regulators + national kennel clubs) get priority scheduling and highest trust weight
- For each new market we expand into, plan adding 5–10 sources before launching marketing there
