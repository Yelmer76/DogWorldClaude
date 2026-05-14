# DogWorld(tmp) — Claude Code Project Instructions

> **You are working on a kennel-management SaaS for dog breeders. Read this file fully every session before doing anything.**

---

## Brand placeholder

The product name "DogWorld" is a working title only. **Use `DogWorld(tmp)` in all code, UI strings, copy, and documentation** until the founder locks the final brand and trademark. When the brand changes, it changes once across the codebase via i18n keys / constants.

---

## MUST-READ docs before any work

These files are the canonical source of truth. **Read them before suggesting features, writing code, or designing UI:**

1. **`docs/memory/MEMORY.md`** — index of all canonical decisions, with one-line summaries
2. **`docs/memory/design_handoff_canonical.md`** — actual design system + 6 prototype patterns from Claude Design (UI source of truth)
3. **`docs/memory/infrastructure_cloudflare_neon.md`** — tech stack (note: D1 for v1, Neon at scale)
4. **`docs/memory/pivot_no_integrations_assumed.md`** — strategic constraint: we do NOT promise kennel-club integrations
5. **`docs/memory/trust_identity_quality_decisions.md`** — auth, roles, karma, ethics-declaration patterns

Other memory files cover specific features (travel companion, buyer guide, news engine, shared genealogy, multi-market strategy, etc.) — read the relevant one when working on that feature.

## Source-of-truth design references

- **`docs/design-handoff/`** — the actual HTML + JSX exports from Claude Design. When implementing any UI, open the corresponding `*.html` file and `*-data.jsx` / `*-components.jsx` files. **The design-handoff is the visual / interaction spec.** Do not invent new colors, spacing, or interaction patterns.

## Strategy reference

- **`docs/DogWorld-rapport.pdf`** — full strategy report (~34 pages)
- **`docs/build_report_pdf.py`** — Python script that regenerates the PDF (run if PDF needs updating)

---

## Non-negotiable rules

### Language & voice
- All user-facing text in **Norwegian (bokmål)** for the launch market
- Tone: warm, direct, never cute. *"Litter C is in week 4"* — not *"Yay, the puppies are growing!"*
- **No emoji in UI chrome.** Reserve for explicit celebration moments only ("+50 karma 🎉")

### Visual design — "The Expert Trio" palette
```
--forest-700: #3F5A55    /* sage primary — brand, nav */
--ochre-600:  #1C3245    /* deep navy — primary actions */
--accent-warm: #c98a27   /* warm ochre — FAB only, celebration */
--bg-page:    #F5F2ED    /* warm oatmeal */
--bg-card:    #ffffff
```

Type: Inter (400/500/600/700) + JetBrains Mono (for credentials/dates/numbers).
Spacing: 4px base scale. Radius: 4 (tag) / 6 (button) / 8 (card) / 999 (pill). Shadows: extremely subtle.

### Foundational interaction patterns
- **Inline editing everywhere.** Tap value → input replaces in place → blur auto-saves → toast "Lagret". **NEVER save/cancel buttons.** Apple Notes / Notion paradigm.
- **Animation: transforms only**, never opacity for entry animations. Some render contexts pause the timer; opacity-from-0 stays invisible. Use `animation-fill-mode: both`.
- **Asymmetric matchmaking** for puppy sales: buyers apply, breeders offer. Never marketplace-style "add to cart" UX.
- **Pedigree direction**: focal dog on LEFT, ancestors flow rightward (NKK/VDH/KC print convention).

### Test data
- Lives in `app/src/data/universe.ts`
- Names are **placeholders** — Granheim, Astor, Bella vom Schwarzwald, Litter C, etc.
- **Never appears in production marketing** — only in test fixtures and clearly-labeled tutorial content

---

## Tech stack (locked)

- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- **Hosting:** Cloudflare Pages (auto-deploy from GitHub)
- **API:** Cloudflare Workers
- **Database:** **Cloudflare D1 for v1.** Migrate to Neon Postgres at: 1,000 customers OR shared-genealogy launch OR 5GB threshold.
- **ORM:** Drizzle (abstracts D1 → Postgres migration to mostly schema rewrite)
- **Files:** Cloudflare R2 (zero egress)
- **Auth:** Better-Auth (passkeys + magic link + forced 2FA)
- **AI:** Anthropic Claude via Cloudflare AI Gateway (cache + observability)
- **Email:** Resend
- **Payments:** Stripe + Stripe Tax
- **Monitoring:** Sentry + Cloudflare Workers Observability
- **Region:** EU (Frankfurt/Amsterdam) for GDPR

### What we DON'T do
- No Postgres in v1 (D1 only — see infrastructure memory)
- No microservices (one Workers monolith with clean module boundaries)
- No SMS for 2FA (insecure — use push to phone or magic link)
- No passwords stored anywhere
- No promised integrations with NKK/VDH/KC/AKC (see pivot memory)

---

## Implementation order (per Claude Design handoff)

1. **Design tokens & primitives** — port "The Expert Trio" to Tailwind config; build `<DogPhoto>` placeholder component first
2. **Styleguide page** (`/styleguide`) — render the full design system as React components; verify pixel-match with Claude Design HTML
3. **Dog Detail screen** — locks down the inline-edit pattern that every other screen reuses
4. **Pedigree Explorer** — locks focal navigation + edge cases
5. **Today Dashboard** — daily-driver, validates feed-card pattern
6. **Onboarding & Migration** — wedge moment (ship before public discovery surface)
7. **Public Kennel Page** — front-stage, distinct feel from back-office
8. **Litter Detail** — revenue-generating screen, ship last so reusable patterns are in place

---

## Project layout

```
D:\Antigravity\DogWorldClaude\
├── CLAUDE.md                    ← this file
├── README.md                    ← human-facing project overview
├── .gitignore
├── docs/                        ← all strategy + design references
│   ├── memory/                  ← canonical decisions (read first)
│   ├── design-handoff/          ← Claude Design HTML/JSX (UI source of truth)
│   ├── DogWorld-rapport.pdf     ← strategy report (34+ pages)
│   └── build_report_pdf.py      ← regenerates the PDF
└── app/                         ← Next.js application
    ├── package.json
    └── src/
        ├── app/                 ← App Router routes
        ├── components/
        │   ├── ui/              ← shadcn primitives
        │   └── dogworld/        ← our custom components
        ├── lib/
        │   └── tokens.ts        ← design tokens as TS constants
        └── data/
            └── universe.ts      ← test fixtures (Granheim, Astor, etc.)
```

---

## Working with the founder

- **Founder:** Ole. Norwegian, technical-curious, prefers concrete plans over abstract discussion. Values "less ulik tech" — keep stack focused.
- **Decision style:** Thinks fast, commits clearly, expects pushback when something doesn't add up. Will challenge if a decision feels off — engage with the challenge, don't just defer.
- **Working language:** Norwegian for product / strategy discussions, English for code and technical artifacts.
- **Working pattern:** I write code → Ole runs `npm install` / `npm run dev` → Ole opens browser → reports back.

---

## When in doubt

1. Check `docs/memory/MEMORY.md` for a canonical decision
2. Check `docs/design-handoff/` for the visual/interaction answer
3. Ask Ole — never invent a strategic decision unilaterally
