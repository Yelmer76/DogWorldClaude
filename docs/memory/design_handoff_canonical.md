---
name: Claude Design handoff — canonical design system + 6 prototypes
description: The actual design that was built in Claude Design and exported as a hi-fi handoff. Supersedes earlier brief-level color/spacing decisions. Bundle lives in project folder.
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Claude Design produced a complete hi-fi handoff bundle on 2026-05-14. **This file canonicalizes what was actually designed**, replacing the brief-level decisions in earlier memory files where they conflict.

**Bundle location in project:**
`D:\Antigravity\DogWorldClaude\claude-design-handoff\`

Inside: full README, design system HTML, six prototype flows (each with HTML + JSX components + data file), and chat transcript.

## Refined design tokens (these supersede earlier brief)

The earlier brief said forest green `#2c5f2d` primary + warm ochre `#d4a747` accent. Claude Design refined this to a more sophisticated palette called **"The Expert Trio"**:

```css
/* Brand */
--forest-700: #3F5A55;    /* Sage primary — brand, nav, focus rings */
--ochre-600:  #1C3245;    /* Deep navy — primary actions, count badges */
--accent-warm: #c98a27;   /* Warm ochre — FAB only, celebration touches */
--bg-page:    #F5F2ED;    /* Warm oatmeal — page bg ("hyggelig") */
--bg-card:    #ffffff;    /* Card surface */

/* Sage scale */
--forest-900: #243430;  --forest-500: #6b8581;
--forest-100: #dde4e2;  --forest-50:  #edf1f0;

/* Navy scale */
--ochre-700:  #11253a;  --ochre-200: #b8c4d0;  --ochre-50: #e6ebef;

/* Warm-tinted neutrals */
--n-950: #1a1a1a;  --n-700: #5d5d5d;  --n-500: #9a9a9a;
--n-300: #c4c0b7;  --n-200: #dcd8cf;  --n-100: #ebe7de;  --n-50: #efebe2;

/* States — muted Nordic */
--success: bg #e3ede2  fg #3d6b46  dot #4a7c59
--warning: bg #f3e6cc  fg #8a5a1a  dot #c98a27
--error:   bg #edd6d2  fg #8a3f3a  dot #a8504a
--info:    bg #dde4ec  fg #41617f  dot #5a7a9a

/* Sex coloring (pedigree, conversation avatars) */
sire (♂): bar #5a7a9a · chip-bg #e8eef4 · chip-fg #3e5a76
dam  (♀): bar #c0789a · chip-bg #f4dde6 · chip-fg #8a4870
```

**Key shifts vs earlier brief:**
- Sage primary (not deep forest green) — softer, more sophisticated
- Deep navy is the primary action color (not ochre); ochre is now reserved for FAB and celebrations only
- Page background is warm oatmeal `#F5F2ED` (not near-white `#fafaf7`) — feels "hyggelig"
- Sex color hint via 4px left bar on pedigree nodes is a new pattern
- Three named scales (forest, ochre, neutrals) with full tonal range

## Type & spacing (locked)

```
Type scale (px): 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48
Body line-height 1.5, headings 1.1–1.25, letter-spacing -0.02em on display
Spacing (4px base): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64
Radius: 4px tags · 6px buttons/inputs · 8px cards · 999px pills/chips/avatars
Fonts: Inter (400/500/600/700) + JetBrains Mono (400/500) for credentials/dates/numbers
```

Three shadow tiers, all extremely subtle (no 2010-style drop shadows).

## Foundational interaction patterns (replicate exactly)

**Inline editing — universal across the product:**
- Tap any value → input replaces inline
- Forest underline indicates active edit
- Blur or Enter → auto-save → toast "Lagret"
- Escape reverts
- **NEVER save/cancel buttons.** Apple Notes / Notion paradigm.

**Animation rule learned the hard way:**
- Use **transforms only** for entry animations — never opacity
- Some render contexts pause the animation timer; opacity-from-0 stays invisible
- Combine with `animation-fill-mode: both`

**Pedigree direction convention (NKK/VDH/KC print convention):**
- Focal dog on LEFT
- Ancestors flow RIGHTWARD back through time
- Spatial model: up = back in time, down = forward, lateral = siblings

**Health pip pattern:**
- Single dot (green/amber/red) in top-right of pedigree node card
- Replaces the chip strip we initially briefed — saves space

**Toast / Pulse / Banner — distinct patterns:**
- Toast: bottom-center, dark `#1a1a1a` bg, white text, success-dot accent, 2.2–2.4s
- Pulse: success-green bg, white text, 200ms pop-in (celebratory like puppy assigned)
- Banner: full-width accent-tinted in-context state, never dismissible

## Universe — canonical TEST-FIXTURE content (placeholders only)

**ALL names below are placeholders for testing and demo purposes only.** They are NOT real content that should ship to production users:

- The brand name "DogWorld" is itself a working title — code uses `DogWorld(tmp)`
- "Kennel Granheim", "Kennel Lyngheia", and every dog/owner/buyer name are demo data
- These should live ONLY in test fixtures, seed scripts, and onboarding-tutorial content (clearly labeled as examples)
- They MUST NOT appear in production marketing copy, the public-facing website, or any user-facing surface that isn't explicitly an "example"
- When real users sign up, they replace this seed data with their own

The names are deliberately designed to stress-test UI patterns — long multi-title prefixes ("NUCH NORDUCH"), edge cases (deceased dogs, hidden-by-owner, unknown ancestor), parent/child references across screens, imported foreign-registry dogs (Bella vom Schwarzwald, VDH-CH).

**Kennel Granheim** (Lillehammer, NO, est. 1998, Norsk Elghund, owner: Ole & Marit, karma: Sølv-tier):
- NUCH NORDUCH **Astor av Granheim** (m, born 14 Mar 2022) — focal show dog
- **Bella vom Schwarzwald** (f, born 17 Jul 2022, imported DE, VDH-CH) — dam of Litter C
- NUCH **Saga vom Nordwald** (f, born 11 Aug 2019) — co-dam in alternate flows
- NUCH SE UCH **Bobby av Skogen** (m, born 2 Jun 2018) — sire of Astor
- NUCH **Vidar av Granheim** (m, 2008–2022) — memorial dog
- **Charmant Bobby** (m, 2014–2023) — grand-sire, deceased

**Litter C** (*"Stars of the Fjord"*) — Astor × Bella, born 14 Apr 2026, week 4
- 5 puppies (3♂ / 2♀), all healthy
- Birk (red collar, RESERVERT), Loke (blue, TILGJENGELIG), Ulf (green, BEHOLDT), Mira (purple, TILGJENGELIG), Idun (yellow, TILBUDT)

**Litter C applications** — 7 total:
- Familien Hansen, Bergen (GODKJENT, Birk reserved)
- Familien Berg, Stavanger (TILBUDT VALP — Idun)
- Marit Olsen, Oslo (I SAMTALE)
- Familien Pettersen, Trondheim (NY)
- Familien Aas, Tromsø (NY)
- Tor Nilsen, Hamar (I SAMTALE)
- Karina Lund, Kristiansand (AVVIST)

**Kennel Lyngheia** (Stavanger, est. 2015, Labrador, owner: Hanne, karma: Gull-tier) — commercial-template foil to Granheim.

## Status enums (canonical, use exact strings)

- **Puppy status:** reservert / tilgjengelig / tilbudt / beholdt / solgt
- **Application status:** NY (red, pulsing dot) / I SAMTALE (amber) / GODKJENT (green) / TILBUDT VALP (warm orange) / AVVIST (grey)
- **Health status:** ok (success) / warn (amber) / err (error)
- **Confidence (Onboarding extraction):** high (green) / medium (amber) / low (red)
- **Litter stages (7):** Planlagt → Paret → Drektig → Valping → Oppfostring → Levering → Avsluttet

## Six prototype flows — what was built

1. **Design System** (`00_design_system/`) — foundations + every shared component
2. **Onboarding & Migration** (`01_onboarding/`) — 10-screen flow with the magic crawl moment + 12-dog AI extraction review with confidence dots
3. **Today Dashboard** (`02_today/`) — feed of 6 cards, hero litter card with 7-day weight sparkline + ENS task checklist, camera FAB with 5 capture options
4. **Dog Detail** (`03_dog_detail/`) — heart screen with 6 tabs (Profil/Stamtavle/Helse/Titler/Bilder/Notater), sticky tab bar, inline-edit foundational pattern, desktop has live public-preview pane on right
5. **Pedigree Explorer** (`04_pedigree/`) — focal navigation with sex-bar color, health pip in corner, peek-then-make-focal interaction, breadcrumb navigation, edge cases for unknown/hidden/deceased
6. **Public Kennel Page** (`05_public_kennel/`) — Template A (Granheim showcase) vs Template B (Lyngheia commercial), public dog page, public memorial, 3 view modes (besøkende / eier-se / eier-rediger), 3-step application modal
7. **Litter Detail** (`06_litter/`) — 5 connected views, asymmetric matchmaking principle, puppy assignment modal as business-critical interaction, desktop drag-and-drop assignment

## Photo / asset pattern

**No real photography in the bundle.** All visuals are CSS-only striped placeholders with monospace labels:
- Tones: elkhound = grey-green, sire = dusty blue, dam = dusty rose
- Muted variants: `grayscale(0.7) brightness(0.92)` for deceased/hidden/memorial

**When implementing**, build a `<DogPhoto>` (and `<Pk>` puppy / `<Lp>` litter) component that accepts a `tone` prop and falls back to the tone-tinted placeholder when no `src` is present. **Preserve the placeholder pattern** even after real photos are uploaded.

Icons are inline SVGs (mostly 14×14, stroke 1.7, currentColor). When adopting Lucide / Tabler / Hero icons, match weight (1.5–1.7 stroke) and 14–22px sizing.

## Tone of voice rules (do not paraphrase)

- Norwegian (bokmål) throughout
- Warm, direct, never cute. *"Litter C is in week 4"* — not *"Yay, the puppies are growing!"*
- **No emoji in UI chrome.** Reserve for explicit celebration moments only ("+50 karma 🎉")
- Avoid corporate-cold ("Vennligst registrer din konto") and avoid juvenile

Verbatim phrases that landed and should be reused:
- "Få kennelen din online på 10 minutter."
- "Vi flytter alle dine hunder, kull og bilder fra den gamle nettsiden din — gratis."
- "Hva skjer i dag"
- "Bella trenger årlig vaksine — bestill innen fredag"
- "Kull C er i uke 4 i dag"
- "Vi velger hvem som får hvilken valp. Du «kjøper» ikke en valp som et produkt — vi matcher dere med riktig hund etter en samtale."
- "Over regnbuebroen"

## Recommended implementation order (per Claude Design's handoff)

1. Design tokens & primitives (port CSS custom properties → Tailwind config; build photo placeholder first)
2. **Dog Detail** — locks down the inline-edit pattern that every other screen reuses
3. **Pedigree Explorer** — locks down focal navigation + edge cases
4. **Today Dashboard** — daily-driver, validates feed-card pattern
5. **Onboarding** — wedge moment, ship before any other discovery surface
6. **Public Kennel** — front-stage, must feel different from back-office
7. **Litter Detail** — revenue-generating, ship last so reusable patterns are in place

This order differs slightly from the founder priority I'd give (which is "ship onboarding first so people can sign up at all"), but for the **engineering perspective** this order minimizes rework — you build the patterns most reused first.

## Open questions flagged by handoff

These are real product decisions still pending — flagged when implementing:
- **AI extraction pipeline** (Onboarding step 6) is mocked. Real pipeline needs crawler + LLM extraction + confidence scoring. The UX assumes per-field confidence dots — keep that signal in the API contract.
- **Registry sync** (NKK/VDH/KC) is teased ("Stamtavlen kommer fra NKK"). Confirm partnership / scraping policy before promising auto-fill on registration-number fields. Note: our pivot memory says we DO NOT promise integrations — so this UI text needs softening to "Vi kan slå opp manuelt" or similar.
- **Karma tier thresholds** (New → Bronze → Silver → Gold → Steward) are placeholders. Need actual scoring criteria.
- **Custom domain flow** (DNS verification, SSL provisioning) is mentioned but not designed. Plan a screen.
- **Notifications system** — bell + badge UI is built but no underlying system designed. Web push? Email? Both?

## State management mapping (per prototype)

| Prototype | State shape |
|---|---|
| Onboarding | flow step, kennel basics, URL, extraction results (12 dogs w/ confidence), template choice, subdomain, submission |
| Today | feed items (snooze/done), expanded card, sheet open, notifications open, state mode |
| Dog Detail | full dog record, active tab, status sheet, gallery, scroll position |
| Pedigree | focal id, history stack (breadcrumb + back), animation direction, share modal |
| Public Kennel | page state (template-a/b/dog/memorial), view mode (public/owner-view/edit), application modal + step |
| Litter | litter record, puppies[] (mutable status), applications[] (mutable status), selected app id, assignment modal + selected puppy, conversation thread per app, composer draft |

All mutations optimistic. Real persistence: REST or GraphQL endpoint per resource, optimistic UI rollback on failure ("Kunne ikke lagre — prøv igjen" toast).

## How to apply going forward

- **When implementing code**, the bundle in `D:\Antigravity\DogWorldClaude\claude-design-handoff\` is the SOURCE OF TRUTH for visual / interaction decisions. The prompts I wrote earlier were briefs; this is the result.
- **When updating the PDF report**, consider refreshing the accent color from `#2c5f2d` to the new sage `#3F5A55` to keep visual consistency with the actual product. The deep navy `#1C3245` could become a secondary header accent.
- **When discussing colors with the founder**, refer to "The Expert Trio" naming (sage / navy / warm ochre) — that's the language Claude Design landed on.
- **When new screens are designed**, they MUST reuse: the color palette, the inline-edit pattern, the toast/pulse/banner pattern, the asymmetric matchmaking principle (no marketplace UX), the no-emoji rule, and the bokmål voice.
- **When questions arise** about the actual visual choice for a UI element, read the JSX file for that screen — they are written as readable spec.
