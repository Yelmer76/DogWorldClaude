---
name: Strategic pivot — no integrations assumed
description: We do NOT count on getting kennel-club integrations. Build the product as if they never come. Self-fill UX is the core competency.
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Decided 2026-05-11. **This canonically supersedes earlier framing in [research_findings_2026-05.md], [launch_scope_and_marketing.md], [feature_shared_genealogy.md], and [market_strategy_multi_region.md]** wherever those documents describe NKK / SKK / VDH / KC / AKC integration as an assumption.

**The pivot in one sentence:**
Build DogWorld as if we never get a single kennel-club integration. If one happens, it's a bonus.

**Why we made this call:**
- Kennel clubs are notoriously political, slow-moving, and risk-averse organizations
- Most have no public API
- Negotiation can take years, requires legal resources we don't have, and may end in no
- We can ask, but if access doesn't exist, we're stuck

**What this means for product strategy:**
1. **Self-fill UX is now the core competency.** Camera + AI + paste + scrape-your-own-old-site is the data on-ramp.
2. **Migration tool from existing kennel sites is THE wedge** — not a gimmick, the front door. Must be world-class.
3. **Shared genealogy DB becomes EVEN more important** — it's our user-generated replacement for registry data. Network effect substitutes for institutional access.
4. **Camera + KI extraction is the normal flow**, not a clever extra: photo of paper pedigree, vaccination card, health certificate, weight book.
5. **Imports from other software** (ZooEasy, Breeders Assistant) move higher in priority — capture defectors from competing products.

**Where integrations may still happen (without promising them):**
1. Public-website deep-linking (e.g., "search NKK" button that opens the right query in browser; user copies)
2. User-driven lookup via bookmarklet / browser extension — *user* fetches, not us → permission problem evaporates
3. Partnerships later when we have 1,000+ paying customers and forhandlingskraft
4. Third-party data aggregators if they exist commercially

**The Age-of-AI advantage we lean into:**
Building a kennel-club integration in 2026 is fast and cheap with current AI tooling. We don't need to pre-build "in case" — we can build reactively the day access opens. So we don't pay the cost of preparation; we pay only when we collect the value.

**Marketing language change:**
- ~~"Vi henter dataene dine fra NKK DogWeb automatisk"~~ ← do NOT say this
- ✅ "Du får dataene dine inn i DogWorld på fem minutter — ta bilde av papirstamtavlen, lim inn fra din gamle nettside, eller importer fra ZooEasy. KI gjør den kjedelige jobben."

**Reframing of the "five gaps in the market":**
The "Nordic localization + NKK integration" gap becomes simply "Nordic localization, mobile-first UX matching breeder rhythm, and migration help from old sites." Still a real gap. No longer dependent on any institution's permission.

**How to apply (operational rules for this project going forward):**
- When a feature description proposes "integrating with [registry]", reframe as "if accessible: yes; otherwise: bookmarklet flow / manual entry that's so good it doesn't matter"
- Do NOT promise NKK/SKK/AKC etc. integrations in marketing copy, sales pitches, or PDF reports for stakeholders
- DO emphasize the self-fill UX as the core differentiator: "the easiest way to fill a kennel database, full stop"
- When discussing roadmap, place "registry integrations" as opportunistic stretch, not planned milestones
- When user asks "should we build X integration?", first answer: "is it accessible without a partnership? if yes, sure. if no, only after we have leverage."

**What does NOT change:**
- Multi-market strategy (NO/SE/DK + DE/NL/BE + UK/US in waves) — still right
- Multi-language architecture from day 1 — still right
- Mobile-first, camera-first UX — still right
- Shared genealogy DB roadmap (v2-v3) — still right (now even more important)
- Migration tool as the launch wedge — still right (now the headline wedge, not just one of several)
