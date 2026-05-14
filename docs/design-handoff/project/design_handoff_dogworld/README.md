# Handoff — DogWorld

A mobile-first SaaS for dog kennel owners and breeders that replaces the typical hand-built kennel website **plus** the breeder's Excel/notebook back-office. One product, one source of truth. Built for serious breeders — in the whelping box, at the vet, at dog shows. Phone in one hand, puppy in the other.

This handoff covers the foundational design system plus six full prototype flows that together comprise the core of the product.

---

## About the design files

**The files in this bundle are design references created in HTML.** They are prototypes showing the intended look, structure, interactions, and behavior — **not production code to copy directly.**

The task is to **recreate these HTML designs in the target codebase's existing environment** (React + Tailwind, SwiftUI, etc.) using its established patterns and libraries. If no environment exists yet, choose the most appropriate stack for the project (we recommend Next.js + Tailwind + TypeScript for the web + native iOS / Android via SwiftUI / Compose for mobile).

The prototypes are written in vanilla HTML + React 18 (via Babel standalone) and reference CSS custom properties for tokens. Reach into the JSX files for component structure, props, and state shape — they are meant to be readable as spec.

---

## Fidelity

**High-fidelity (hifi).** Pixel-perfect mockups with final colors, typography, spacing, interactions, animation timing, and copy. The developer should recreate the UI pixel-perfectly using the codebase's existing libraries — type scale, color tokens, shadows, motion timing, and Norwegian copy are all final and should not be invented anew.

---

## Universe — content used throughout

All prototypes share one continuous content universe. **Use this exact data in test fixtures** — the names, dates, and relationships are designed to stress-test long-name wrapping, deceased/hidden edge cases, multi-title prefixes, and parent/child references across screens.

**Kennel Granheim** (Lillehammer, NO, est. 1998, Norsk Elghund, owner: Ole & Marit, karma: Sølv-tier)
- **NUCH NORDUCH Astor av Granheim** (m, born 14 Mar 2022) — focal show dog
- **Bella vom Schwarzwald** (f, born 17 Jul 2022, imported DE, VDH-CH) — dam of Litter C
- **NUCH Saga vom Nordwald** (f, born 11 Aug 2019) — co-dam in alternate flows
- **NUCH SE UCH Bobby av Skogen** (m, born 2 Jun 2018) — sire of Astor
- **NUCH Vidar av Granheim** (m, 2008–2022) — memorial dog
- **Charmant Bobby** (m, 2014–2023) — grand-sire, deceased

**Litter C** ("Stars of the Fjord") — Astor × Bella, born 14 Apr 2026, currently week 4
- 5 puppies, 3♂ / 2♀, all healthy
- Birk (red collar, reservert), Loke (blue, tilgjengelig), Ulf (green, beholdt), Mira (purple, tilgjengelig), Idun (yellow, tilbudt)

**Applications on Litter C** — 7 total
- Familien Hansen, Bergen (GODKJENT, Birk reserved)
- Familien Berg, Stavanger (TILBUDT VALP — Idun)
- Marit Olsen, Oslo (I SAMTALE)
- Familien Pettersen, Trondheim (NY)
- Familien Aas, Tromsø (NY)
- Tor Nilsen, Hamar (I SAMTALE)
- Karina Lund, Kristiansand (AVVIST)

**Kennel Lyngheia** (Stavanger, NO, est. 2015, Labrador Retriever, owner: Hanne, karma: Gull-tier) — commercial-template foil to Granheim

---

## Design tokens (locked)

```css
/* Brand — The Expert Trio */
--forest-700: #3F5A55;    /* Sage primary — brand, nav, focus rings */
--ochre-600:  #1C3245;    /* Deep navy — primary actions, count badges, focal week marker */
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

/* State — muted Nordic */
--success: bg #e3ede2  fg #3d6b46  dot #4a7c59
--warning: bg #f3e6cc  fg #8a5a1a  dot #c98a27
--error:   bg #edd6d2  fg #8a3f3a  dot #a8504a
--info:    bg #dde4ec  fg #41617f  dot #5a7a9a

/* Sex coloring (pedigree, conversation avatars) */
sire (♂): bar #5a7a9a · chip-bg #e8eef4 · chip-fg #3e5a76
dam  (♀): bar #c0789a · chip-bg #f4dde6 · chip-fg #8a4870

/* Type scale (px) */
12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48
Body line-height 1.5, headings 1.1–1.25, letter-spacing -0.02em on display

/* Spacing (4px base) */
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64

/* Radius */
--r-tag: 4px  (tags)
--r-btn: 6px  (buttons, inputs)
--r-card: 8px (cards)
999px         (pills, status chips, avatars)

/* Shadows — extremely subtle */
--shadow-1: 0 1px 2px rgba(26,26,26,0.04), 0 1px 1px rgba(26,26,26,0.03);
--shadow-2: 0 2px 4px rgba(26,26,26,0.05), 0 4px 12px rgba(26,26,26,0.05);
--shadow-3: 0 8px 24px rgba(26,26,26,0.08), 0 2px 6px rgba(26,26,26,0.05);

/* Fonts */
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif (weights 400/500/600/700)
--font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace (for credentials, dates, numerical data)
```

**Tone of voice (microcopy)**: warm, direct, never cute. *"Litter C is in week 4"* — not *"Yay, the puppies are growing!"*. All copy is Norwegian (bokmål).

**No emoji** in UI chrome. Reserve emoji for explicit celebration moments only (e.g. "+50 karma 🎉").

**No invented imagery in SVG.** All photos are striped placeholders with monospace labels. When the codebase ships, swap to real photos via the same `<Photo>`/`<Pk>`/`<Lp>` component contract.

---

## Screens / views

Six prototype flows, each with mobile (375×812) and desktop (1280×800) variants.

### 1. Design System — `00_design_system/DogWorld Design System.html`
Foundations reference page. Color, type, spacing, radius, elevation, plus every shared component (buttons in 5 states, form inputs, cards, tags, badges, navigation, patterns, dog-specific atoms like pedigree node, health table, photo grid, litter timeline). **Read this first.**

### 2. Onboarding & Migration — `01_onboarding/Onboarding.html`
The first 10 minutes for a new kennel owner. 10-screen flow that converts skeptics.

| # | Screen | Purpose |
|---|---|---|
| 1 | Welcome | Warm hero with breathing gradient; "Få kennelen din online på 10 minutter" |
| 2 | Email | Passwordless magic-link, success state |
| 3 | Basics | Kennel name, country (Norge), breed chip multi-select |
| 4 | Wedge | "Ja, flytt mine hunder hit" (recommended, sage border) vs "Start fra null" |
| 5 | URL | Paste old site URL, platform detection (Wix highlighted) |
| 6 | Crawl | **The magic moment.** Live-updating list of 9 discoveries appearing over ~5s with progress bar. Auto-advances. |
| 7 | Review | 12 AI-extracted dogs with high/medium/low confidence dots. Includes stub-parent and missing-photo edge cases. 4 sub-states: Default / Alle bekreftet / Kort utvidet / Tom uthenting |
| 8 | Template | Choose Show vs Commercial template, SVG-mock previews |
| 9 | Domain | Free `granheim.dogworldtmp.no` subdomain editor with availability check |
| 10 | Published | Confetti, kennel live, 3 suggested next steps, "Gå til dashbordet" |

### 3. Today Dashboard — `02_today/Today Dashboard.html`
Most-opened screen. Orientation in <2 seconds, one clear next action.
- **Header**: kennel logo + name + karma chip · bell with badge · avatar
- **Hero strip**: "God morgen, Ole — torsdag 14. mai" + weather chip
- **Karma strip** (conditional): "+50 karma — du fullførte etikk-erklæringen 🎉"
- **Feed**: 6 cards ranked by urgency × time-relevance, each with 4px color stripe (urgent red, hero-litter amber, neutral blue, positive green, deadline amber, news grey). Tap expands inline; Litter C is the HERO card with 5 puppy avatars + 7-day weight sparkline + ENS task checklist
- **Stats strip**: Aktive hunder (8) · Aktive kull (1) · Søknader (4)
- **Camera FAB** (ochre, 56px): bottom sheet with 5 capture options (foto, skann stamtavle, skann sertifikat, logg vekt, notat). Pulse animation on first load only
- **Bottom tab bar**: Hjem / Hunder / Kull / Kjøpere / Mer

States: Default / Empty (calm day) / Karma celebration (Sølv-tier expanded with confetti + progress bar to Gull)

**Desktop**: side nav left, 4 stat tiles with charts at top (line chart, bar chart, sparkline, karma progress), two-column main (feed left ~60% / sticky detail panel right ~40%). Keyboard shortcut `C` for quick capture.

### 4. Dog Detail — `03_dog_detail/Dog Detail.html`
The heart screen. Every other screen lands here.
- **Nav bar** (44px, translucent over hero, solid on scroll)
- **Hero photo** (280px) with status pill ("Aktiv" green) + photo count overlay, gentle parallax on scroll
- **Name block**: full registered name "NUCH NORDUCH Astor av Granheim", meta line, title chips, public/private eye pill
- **Sticky tab bar**: Profil · Stamtavle · Helse · Titler · Bilder · Notater
- **Profil tab sections**: Grunnleggende (7 inline-editable fields), Foreldre (sire/dam cards), Oppdretter og eier, Personlighet (tap-to-expand textarea), Status og synlighet (status pill + 2 toggles)
- **Inline editing pattern** (foundational — reused everywhere): tap any value → input appears with forest underline, blur auto-saves with "Lagret" toast. **No edit mode, no save button.** Apple Notes / Notion paradigm.
- **Helse tab**: 5 health test rows (HD/ED/Eyes/DM/prcd-PRA) with PDF links, vaccine grid (DHPPi/Rabies/Lepto/Bordetella), 7-month weight sparkline
- **Titler tab**: stats + chronological timeline grouped by year (2025/2024/2023) with championship vs show pip styling
- **Stamtavle tab**: 3-gen mini tree (focal left) + offspring list (Mira/Loke/Idun)
- **Bilder tab**: album chips + responsive 4–6 col grid with 16 thumbs
- **Notater tab**: timestamped note composer + 5 example private entries
- **Camera FAB** with 5 capture options
- **Status sheet**: 4 options (Aktiv / Pensjonert / Solgt / Over regnbuebroen)

States: Default (full polished profile) / Sparse (newly added, italic placeholders, scan-pedigree suggestion) / Memorial (photo desaturated, "Over regnbuebroen", dates 2022–2032, FAB hidden)

**Desktop**: 3-column — dog list left / detail center / **live public-preview pane right** (shows exactly what visitors see; toggling Offentlig profil flips it to a "Skjult" state in real-time).

### 5. Pedigree Explorer — `04_pedigree/Pedigree Explorer.html`
Focal navigation. **Focal dog sits on the left** (NKK/VDH/KC print convention — ancestors flow rightward back through time). Tap any node → re-centers tree on that dog. Spatial model: up = back in time, down = forward, lateral = siblings.

- **Tree nodes**: white card with 4px left bar (sire dusty blue / dam dusty pink) — cards stay clean, sex hint reads at a glance
- **Health pip** (top-right corner of each node): single green/amber/red dot replacing the chip strip — saves room for important info
- **Single tap on a node → peek** (expanded card with photo + key data + 3 achievements + "Make focal →" button)
- **Siblings strip** below focal: chip row with 7 littermates
- **Animations**: 250–280ms ease-out, transform only (no opacity — survives iframe non-tick), direction-coded (up/down/lateral/jump)
- **Edge cases** built into the data: Unknown ancestor (dashed plus), Hidden by owner (lock + redacted name), Deceased (◌ glyph + year of death)

**Desktop**: 3-column with persistent search/history left, full tree center, detail right rail. Keyboard nav: ↑ sire, ← dam, ↓ first offspring, → first sibling, Esc back.

### 6. Public Kennel Page — `05_public_kennel/Public Kennel.html`
The other half of the product. What buyers and peer breeders see.

**Two templates with deliberately different feel:**

**A · Showcase (Granheim)** — content-rich, lineage-proud
- Hero with cover photo + tagline + Verifisert/NKK/Sølv-tier trust badges
- Aktuelle hunder (3-col on desktop)
- Avlsfilosofi text section with breeder photo + 26/14/5 stats
- Nyeste titler og resultater timeline
- Kull C card with 5/4-uker/2-ledig stat row
- Memorial teaser (3 cards) → links to memorial page
- Om oss / Kontakt
- Dark 4-column footer

**B · Commercial (Lyngheia)** — funnel-focused
- Hero with warm CTA
- Tilgjengelige valper hero section with 8/4/4 overlay stats
- 3-step process (Søk → Møt oss → Hjem)
- Helsegaranti checklist + standard-kontrakt card
- Testimonial carousel (4 reviews with star rating)
- Parents grid
- FAQ accordion (5 items, expand on tap)
- Planlagt kull card
- Contact-with-CTA close

**Public Dog Page** (Astor) — read-only subset of dog detail. Hero, title chips, 5 verified health cards, 3-gen pedigree tree, results, 12-photo gallery, "Kontakt oppdretter" CTA.

**Public Memorial** (Vidar, 2008–2022) — softer cream background, framed portrait, tribute paragraph, 8-cell gallery, 5 minneord messages, working "Send minneord" form.

**3 view modes**: Som besøkende / Som eier — se / Som eier — rediger (adds dashed orange section outlines + "Klikk for å redigere" tooltips on hover)

**Application modal**: 3-step bottom-sheet form (Hjemmesituasjon → Erfaring → Motivasjon) with progress dots.

### 7. Litter Detail — `06_litter/Litter Detail.html`
**The screen that generates revenue.** 5 connected views on shared data.

**Asymmetric matchmaking principle (non-negotiable)**: Buyers do NOT add a puppy to cart. Buyers apply, the breeder reviews, the breeder **offers** a specific puppy to an approved applicant. Every UX decision must reinforce this — never make it feel like a marketplace listing.

- **View 1 Litter detail (breeder)**: Status pill "Aktivt — uke 4", parent cards, sticky 7-stage timeline (Planlagt → Avsluttet), 5 puppy cards in 2-col grid (colored collars matching status: rød/blå/grønn/lilla/gul), applications strip ordered NY → I SAMTALE → GODKJENT, daily log, sticky quick-action bar
- **View 2 Applications list**: filter chips with counts, full app cards with avatar, summary, match indicators (green/amber/red dots), "Åpne samtale / Avvis"
- **View 3 Conversation**: applicant profile (Husholdning / Bolig / Erfaring / Intent / Aktivitet / Referanser), "Hvorfor" quote in muted block, match indicators, chat thread (breeder bubbles ochre right / applicant grey left, image attachments inline), compose box with 3 shortcut chips (Spørsmål → templated questions menu / Tilby valp → assignment modal / Hjemmebesøk)
- **View 4 Public litter view** (granheim.dogworldtmp.no/kull-c): hero, parents, "Slik fungerer det" 3-step explainer, available puppies grid, **transparently shown reserved/beholdt cards** ("Vi viser alltid hele kullet — åpenhet er en del av tilliten"), Send-søknad warm CTA, parent health comparison
- **View 5 Application form**: 4-step multi-step form (Hvem / Hverdag / Erfaring / Refs) with progress dots, mixed inputs, 2 required consent checkboxes, success state on submit

**Puppy assignment modal** (the business-critical interaction): Tap "Tilby valp" → grid of available puppies → pick one → preview "Du tilbyr [applicant] denne valpen. De får 7 dager. Depositum 5 000 kr reserverer valpen." → Confirm → status updates everywhere (TILGJENGELIG → TILBUDT) with celebratory pulse toast.

7 demo states: Active (default) / Conversation w/ Berg (full Idun-tilbudt thread) / Puppy assignment modal pre-opened / Planned (5 dashed "?" placeholders) / Delivered (all SOLGT + journey timeline).

**Desktop**: 3-column breeder workspace — puppies left (drag-affordance on tilgjengelige for drag-drop puppy assignment), conversation center, applications right with sex-banded rows.

---

## Interactions & behavior — patterns to replicate exactly

### Inline editing (universal)
Tap any value → input replaces it inline (no modal, no edit mode). Forest underline indicates active edit. Blur or Enter → auto-save → toast "Lagret". Escape reverts. **Never use save/cancel buttons.**

### Animation timing
- Card stagger on load: 50–60ms between each, 280ms transform-only (no opacity — see Pedigree note below)
- Card expand: 200ms ease-out, height grows, content fades in
- Card swipe (mobile): rubber-band feel, color hint (green right = bekreft, amber left = rett)
- Status pill change: 200ms color cross-fade
- Hero photo: gentle 8s Ken Burns scale 1 → 1.08 on initial load
- Conversation bubbles: 220ms slide-up like iMessage
- Confetti (Onboarding step 10, Today karma celebration): tasteful, ~30 pieces, 1.6–2.4s fall with rotation

### Pedigree animation rule (learned the hard way)
Use **transforms only** for entry animations — never opacity. Some render contexts pause the animation timer; if opacity starts at 0 and never advances, the element stays invisible. Combine with `animation-fill-mode: both` so the end state persists.

```css
@keyframes enter-up { from { transform: translateY(-10px); } to { transform: translateY(0); } }
```

### Status colors per domain
- **Puppy status**: reservert (amber) / tilgjengelig (green) / tilbudt (warm orange) / beholdt (muted blue) / solgt (grey)
- **Application status**: NY (red, pulsing dot) / I SAMTALE (amber) / GODKJENT (green) / TILBUDT VALP (warm orange) / AVVIST (grey)
- **Health status**: ok (success) / warn (amber) / err (error)
- **Confidence (Onboarding review)**: high (green) / medium (amber) / low (red)

### Forms
- Single-field-per-step on mobile (Onboarding)
- Chip multi-select for breeds, intent, activity tags
- Radio list with `is-picked` highlight for single-choice
- Auto-suggest dropdown for breed search
- Submit blocked until required consent checkboxes ticked
- Success state replaces form; never modal-on-top

### Sticky elements
- Tab bar (Dog Detail) — sticky after scroll past name block
- Timeline strip (Litter Detail) — sticky after scroll past header, gains shadow when sticky
- Nav bar (Public Kennel + Dog Detail) — sticky always, gains shadow on scroll

### Notification & toast patterns
- **Toast** (transient confirmation): bottom-center, dark `#1a1a1a` bg, white text, success-dot accent, 2.2–2.4s auto-dismiss
- **Pulse** (celebratory confirmation, e.g. puppy assigned): success-green bg, white text, 200ms pop-in
- **Banner** (in-context state, e.g. owner-view banner in public kennel): full width, accent-tinted, never dismissible from within

---

## State management

For each prototype, state is local React `useState` — but in the real app these map to:

| Prototype | State shape |
|---|---|
| Onboarding | Flow step, kennel basics, URL, extraction results (12 dogs w/ confidence), template choice, subdomain, submission status |
| Today | Feed items (with snooze/done tracking), expanded card, sheet open, notification open, state mode |
| Dog Detail | Full dog record (basics, parents, attribution, personality, status, visibility), active tab, status sheet open, gallery open, scroll position |
| Pedigree | Focal id, history stack (for breadcrumb + back), animation direction (up/down/lateral/jump), share modal open |
| Public Kennel | Page state (template-a / template-b / dog / memorial), view mode (public / owner-view / edit), application modal open + step |
| Litter | Litter record, puppies[] (mutable status), applications[] (mutable status), selected app id, assignment modal open + selected puppy, conversation thread (per app), composer draft |

All mutations happen optimistically. Real persistence: REST or GraphQL endpoint per resource, with optimistic UI rollback on failure (show "Kunne ikke lagre — prøv igjen" toast).

---

## Norwegian copy — keep verbatim

The Norwegian (bokmål) microcopy throughout has been tuned for the breeder voice — warm, direct, never cute. **Do not translate or paraphrase.** Examples:

- "Få kennelen din online på 10 minutter."
- "Vi flytter alle dine hunder, kull og bilder fra den gamle nettsiden din — gratis."
- "Hva skjer i dag"
- "Bella trenger årlig vaksine — bestill innen fredag"
- "Kull C er i uke 4 i dag"
- "Vi velger hvem som får hvilken valp. Du «kjøper» ikke en valp som et produkt — vi matcher dere med riktig hund etter en samtale."
- "Over regnbuebroen"

When you need new strings, write them in Norwegian using the same register. Avoid corporate-cold phrasing ("Vennligst registrer din konto") and avoid juvenile phrasing ("Yay, your puppies are growing! 🐶").

---

## Assets

**No real photography in this bundle.** All visuals are CSS-only placeholders:
- `.photo-*`/`.lp-photo`/`.pk-photo` etc. use radial + linear gradient mixes per tone (elkhound = grey-green, sire = dusty blue, dam = dusty rose)
- Muted variants apply `grayscale(0.7) brightness(0.92)` filter (used for deceased dogs, memorials, hidden cards)

When implementing, **build a `<DogPhoto>` component** that accepts the same `tone` prop and falls back to a tone-tinted placeholder when no `src` is present — preserve the placeholder pattern even with real photos uploaded.

Icons are inline SVGs (mostly 14×14 stroke 1.7, currentColor). No external icon library used. When adopting Lucide / Tabler / Hero icons, match weight (1.5–1.7 stroke) and 14–22px sizing.

Fonts loaded from Google Fonts CDN:
- **Inter** (weights 400 / 500 / 600 / 700)
- **JetBrains Mono** (weights 400 / 500)

---

## Files in this bundle

```
design_handoff_dogworld/
├── README.md                          ← you are here
├── 00_design_system/
│   └── DogWorld Design System.html    ← foundations + every shared component
├── 01_onboarding/
│   ├── Onboarding.html
│   ├── onboarding-data.jsx            ← Marit's data, 12 extracted dogs, crawl steps
│   ├── onboarding-screens.jsx         ← all 10 screen components
│   └── onboarding-app.jsx             ← flow state machine + layouts
├── 02_today/
│   ├── Today Dashboard.html
│   ├── today-data.jsx                 ← feed items, stats, notifications, FAB actions
│   ├── today-components.jsx           ← FeedCard, LitterHeroCard, FAB, sheet, etc.
│   └── today-app.jsx                  ← mobile + desktop + 3-state switcher
├── 03_dog_detail/
│   ├── Dog Detail.html
│   ├── dog-data.jsx                   ← Astor (default + sparse + memorial)
│   ├── dog-components.jsx             ← Hero, NameBlock, InlineField, sheets, etc.
│   ├── dog-tabs.jsx                   ← Helse / Titler / Stamtavle / Bilder / Notater
│   └── dog-app.jsx
├── 04_pedigree/
│   ├── Pedigree Explorer.html
│   ├── pedigree-data.jsx              ← full genealogy graph + helpers + edge cases
│   ├── pedigree-components.jsx        ← NodeCard, FocalCard, Breadcrumb, Carousel
│   └── pedigree-app.jsx               ← focal navigation state + animations
├── 05_public_kennel/
│   ├── Public Kennel.html
│   ├── kennel-data.jsx                ← Granheim + Lyngheia + Astor public + Vidar
│   ├── kennel-components.jsx          ← shared atoms, ApplicationModal, MobileMenu
│   ├── kennel-templates.jsx           ← TemplateA, TemplateB, DogPage, MemorialPage
│   └── kennel-app.jsx
└── 06_litter/
    ├── Litter Detail.html
    ├── litter-data.jsx                ← Kull C, 5 puppies, 7 applications, conversations
    ├── litter-components.jsx          ← PuppyCard, AppCard, ChatBubble, AssignModal
    ├── litter-views.jsx               ← 5 view components
    └── litter-app.jsx                 ← view router + desktop 3-column workspace
```

To run any HTML file: open it directly in a browser (no server needed). The bundled scripts pull React 18 + Babel standalone from unpkg.

---

## Recommended implementation order

1. **Design tokens & primitives** — port the CSS custom properties to your design-system layer (Tailwind config, SwiftUI Color extension, etc.). Build the photo placeholder component first.
2. **Dog Detail** — locks down the inline-edit pattern that every other screen reuses
3. **Pedigree Explorer** — locks down focal navigation + edge cases
4. **Today Dashboard** — daily-driver, validates the feed-card pattern
5. **Onboarding** — wedge moment, ship before any other discovery surface
6. **Public Kennel** — front-stage, must feel different from the back-office
7. **Litter Detail** — revenue-generating screen, ship last so all reusable patterns are in place

---

## Open questions for the implementer

- **AI extraction** (Onboarding screen 6) is mocked. The real pipeline needs a crawler + LLM extraction + confidence scoring. The UX assumes per-field confidence dots — keep that signal in the API.
- **NKK / VDH / KC sync** is teased in places ("Stamtavlen kommer fra NKK"). Confirm registry partnership and field-level mapping before promising auto-fill on the registration-number field.
- **Karma tier** thresholds (New → Bronze → Silver → Gold → Steward) are placeholders. Product needs to decide actual scoring criteria.
- **Public kennel custom-domain** flow is mentioned but not designed (DNS verification, SSL provisioning). Plan a screen for it.
- **Notifications** — the bell + badge UI is built but no notification system designed. Web push? Email? Both?
