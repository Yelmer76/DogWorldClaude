---
name: Delt genealogi — shared pedigree database
description: Shared deep-pedigree DB with opt-out model; network-effect moat; small-screen UX via focal navigation; arrives v2-v3
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Identified 2026-05-11 as DogWorld's strongest defensive moat. Shared, deep, mobile-first pedigree database that grows with each kennel. Network effect + stickiness + AI features no one else can build.

**The differentiation thesis (three things at once):**
1. Network effect — every new kennel adds value to all existing ones
2. Stickiness — leaving means losing 50+ dog records and 200+ relations they've built
3. Unlocks AI features that need scale: "find similar dogs", "suggest mate", "deep-inbreeding warning", "strongest health lines"

**Opt-out sharing model (default IN, can opt OUT per dog):**
- Default at signup: dog's *pedigree facts* go into shared registry. Clearly explained.
- **Shared:** registered name, call name, registration number, sex, DOB/DOD, breed, color, parents+offspring links, published titles, published health-test results
- **Never shared:** kennel contact info, internal notes, vet visits, vaccination history, buyer info, finances, breeding plans, puppy contracts
- **Per-dog granularity:** opt out specific dogs (e.g. private breeding stock)
- **Revocable any time** — dog disappears from search; relationships to offspring registered by others remain but show "Hidden by owner"
- **GDPR:** kennel is data controller, we are processor. DPA on signup. EU region storage.

**No generation cap.** Traditional tools cap at 5 generations (62 ancestors). We allow arbitrary depth — 10 gen = 2,046 ancestors, 15 gen = 65k. Data sparser at depth, but COI/AVK becomes much more accurate. Dogs are nodes in a graph, parent links are edges. No predefined "5 generations".

**Stub merging:** when someone enters "Far: Bobby av Nordkapp" and we don't have Bobby, create stub. When Bobby's owner later registers, propose merge with confirmation.

**Mobile UX — chose focal navigation** (rejected: horizontal swipe, zoom-whole-tree, vertical breadcrumb list, generation card stacks, force-directed graph):
- One dog at center, large, with photo + key health emblem
- Parents above (2 cards)
- Grandparents further up (4 small cards, just names)
- Offspring as horizontal carousel below
- Siblings via side panel
- Tap any card → it becomes new focus, everything animates
- Breadcrumb of navigation path at top
- Inspiration: FamilySearch mobile tree, Apple Maps card paradigm, Notion "open as page"

**Search/discovery features:**
- Standard search: name, registration number, kennel prefix, microchip
- Filters: breed, color, sex, year range, titles, health, kennel, country
- "Find similar dogs": shared ancestors + similar health profile + titles
- "Test mating": pick two dogs → projected offspring inbreeding, health overlap (carrier risks), title backgrounds
- "Strongest health lines in [breed]": aggregate view (this needs network volume)

**Lawful data seeding sources (for cold-start before customers fill it):**
- Public pedigree databases (scrapable per Meta v. Bright Data 2024, HiQ v. LinkedIn rulings):
  - K9data.com (Goldens, Labs)
  - Working-dog.com (working breeds)
  - PedigreeDatabase.com (GSD-heavy)
  - OFA.org (health results, fully public)
- Official kennel-club registries (per-dog lookup, NO mass scraping):
  - NKK DogWeb, SKK Hunddata, DKK Hundeweb
  - VDH (DE), Raad van Beheer (NL), KC Find a Dog (UK)
  - AKC OnePass, UKC
- User imports: ZooEasy .zoo, Breeders Assistant CSV/XML
- Partnerships: breed clubs can upload member database for member benefits

**Explicitly DO NOT scrape:** behind-login data, contact info, trademark-protected logos, anything bypassing ToS.

**Risks to mitigate:**
- Data-sucker perception → clear messaging that kennel owns data, we earn by enhancing not selling
- Quality pollution → per-node confidence indicators, multiple-source confirmation, KI flagging anomalies (parent younger than 12mo, conflicting reg numbers)
- Stub merge conflicts → human-in-the-loop merge flow
- Non-papered dogs → allow but mark clearly as "not officially registered"

**Roadmap placement:** NOT v1. This is v2 or v3. At launch focus on each kennel's own private data being beautifully organized. At 50–100 customers, turn on shared genealogy and seed with public-DB scraping. That's the moment DogWorld pivots from "nice tool" to "you have to be on it."

**How to apply:**
- Treat this as the strongest defensive moat in product decisions
- When designing the v1 data model, the entities (Dog, registration_number, sire_id, dam_id, registry, etc.) must already be shape-compatible with the shared-DB version — DO NOT design v1 in a way that forces a migration later
- For UX questions about pedigree visualization, default to focal navigation (not horizontal-swipe-between-generations)
- When discussing AI features that need volume (find similar, suggest mate, breed health analytics), gate them behind shared-DB threshold — they are post-network-effect features
