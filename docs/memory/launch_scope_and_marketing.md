---
name: Launch MVP scope, UX principles, and marketing plan
description: What ships at v1, what waits; UX patterns (camera-first, AI image extraction); content and distribution strategy for Norwegian breeder market
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Scoped 2026-05-11. The page plan and launch MVP are settled enough to start architecting; marketing is mapped but waits for product.

**Core UX principle:** mobile-first with the thumb in mind. Camera is a first-class input alongside keyboard. AI does the boring extraction work. Phone in one hand, puppy in the other.

**Four user contexts (each gets its own designed experience, not one cramped UI):**
1. **Oppdretteren (kennel owner, paying customer)** — daily back-office, mobile, often messy hands
2. **Public visitor (prospect, peer breeder)** — kennel site read; mobile first, laptop later
3. **Valpekjøper post-sale** — buyer portal; opens at 03:00 tired and worried
4. **Hundeeier på farten** — travel mode; high stress, zero-friction emergency UX

**Camera-as-input patterns we ship (the magical recurring move):**
- Paper pedigree → digital pedigree (AI parses tree, creates parent stubs)
- Vaccination card → calendar entries (OCR vaccine name + date + batch)
- Health certificate (OFA / NKK / Laboklin) → structured result (test type, value, date, cert ID)
- Show critique → structured result (date, judge, class, placement, critique text)
- Weight book → weight chart (OCR puppy names + daily weights)
- Old paper buyer-guide → digital draft in guide editor
- Dog photo → dog identification (if previously photographed)

**Launch MVP scope (v1 — "one real value loop"):**
1. Onboarding + migration (WordPress / Wix / Squarespace / paper scan)
2. Owner dashboard ("hva skjer i dag")
3. Dog profiles — camera-first photos, inline-edit (Apple Notes paradigm, not "edit mode → save")
4. Litter management — timeline view, weekly logs, weight tracking
5. Public kennel site auto-generated from data (one starter template, both archetypes come later)
6. Memorial / Minneside (small feature, high emotional value)
7. Site settings (theme, logo, custom domain, public/private per dog)
8. Pedigree view (parents + grandparents; full 5-gen interactive tree comes after launch)
9. Structured health-test results with camera scanner
10. Auth + Stripe Billing

**Post-launch (months 2–6):**
- Buyer guide editor + buyer portal
- Travel companion (map, emergency, checklists)
- Stud directory
- Online deposits + waitlist
- Full 5-gen interactive pedigree + COI/AVK calculator
- NKK DogWeb integration
- Push notifications via Capacitor (web first at launch)
- Swedish / Danish / German localization

**Most-touched screens (must be polished above all else):**
- Dog detail page (the heart screen — inline edit critical)
- Litter detail (8–12 weeks of daily use per litter, must be the easiest page in the app)
- "Today" dashboard (every-time-opening screen, first impression daily)

**Marketing strategy:**

Channels (Norwegian breeders live in these specifically):
- **Facebook groups per breed** — the main stage. Every Norwegian breed has 1–3 active groups.
- **NKK-affiliated breed clubs** — own newsletters, events
- **Norwegian shows** — NKK Dogs4All, regional shows, IGP trials, hunt tests. Physical presence matters.
- **Instagram** for younger breeders building brand
- **YouTube** in Norwegian (low competition)
- **Google search** — low volume, high intent ("kennel programvare", "oppdretter app")
- **Email drip** for incomplete onboarding

Content archetypes (each has a purpose):
- **Kennel-portretter** (case study videos + articles) — social proof is THE strongest signal
- **Hvordan-guider** (how-to product content)
- **Faglig innhold** (HD scales, EU pet passport rules) — positions as competence center, not just tool
- **Versus-konkurrent-sammenligninger** — Google ranks comparison content well

AI-leveraged production pipeline:
- Claude for first drafts from interview transcripts
- One blog post → 8–12 distribution pieces (variants for FB/IG/X/LI/newsletter) via Claude
- Real kennel photos > AI-generated; AI for video clipping (Opus Clip, Munch)
- Translation to SE/DK/DE via Claude — unlocks 3 markets without writing
- SEO research with Ahrefs + Claude
- Personalized drip emails by onboarding step

Distribution stack:
- Buffer or Publer for social scheduling
- Resend or Buttondown for newsletter
- Loops or Customer.io for product emails
- Plausible / Fathom for analytics (GDPR-friendly, no cookie banner)

**Three highest-impact early moves:**
1. **Lock in 5 lighthouse kennels** with free 12-month deal in exchange for being public reference customers — cover the segments (show, sport, rare-breed, new breeder, international seller)
2. **"Slik flytter du Wix-siden din til DogWorld"** — most direct intent-search content; folks who land here have already decided to switch
3. **Definitive Norwegian breeder regulation guide** (RAS, NKK, Mattilsynet, EU pet passport, tapeworm windows) — 8,000 words, annually updated. Authority play that wins Google.

**Measurement (don't measure everything — measure these):**
- North star: paying kennels
- Funnel: visitor → signup → onboarding complete → first site published → first litter → paid
- Per-channel attribution with UTM codes
- Quarterly NPS with "why / why not" open text — open text is gold

**How to apply:**
- When suggesting features, default to MVP scope above unless explicitly extending
- When pattern-matching UX questions, lean on the patterns cited (Linear/Notion/Things for dashboards, Apple Notes for inline edit, baby-tracker apps for puppy timelines, Apple Maps bottom-sheet for filter chips)
- When writing marketing or content, channel mix is FB groups + breed clubs + shows + Instagram — NOT TikTok-first
- Treat the camera-first pattern list as a checklist: every new feature should ask "is there a paper artifact this replaces? then we need a camera-input flow"
