---
name: Multi-market strategy — build broad, launch deep
description: Architecture supports 6 languages + multi-currency + multi-registry from day 1; marketing focus stays Nordic-first; expansion in waves
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Strategy shift on 2026-05-11. Earlier framing was "Nordic-first." User pushed for broader testing — "Norge er knøtt." New position: **architecturally multi-market from day 1, marketing-focused per wave.**

**Reasoning for going broader than Norway:**
1. Optionality — we don't yet know which market grips first; arch flexibility lets us see
2. Shared genealogy needs volume — 50k Nordic+European dogs >> 200 Norwegian dogs
3. Competitive signal — looking serious in multiple markets builds credibility faster

**Real risks of broad launch (mitigations matter):**
- Marketing focus dilutes if we try to be loud in 6 markets simultaneously
- Support load multiplies across timezones and languages
- Per-registry depth becomes shallow; risks losing the NKK wedge
- Cultural expectations differ (US contracts vs Nordic norms)

**Resolution — "build broad, launch deep":**
- **Architecture:** multi-language, multi-currency, multi-registry from day 1. No regrets here — cheap now, expensive later.
- **Marketing rollout in waves:**
  - **Wave 1 (launch):** Norway, Sweden, Denmark. Full polish, NKK/SKK/DKK integration framing.
  - **Wave 2 (+3–6 mo):** Germany, Netherlands, Belgium. VDH and Raad van Beheer integration, Tysk + NL localization, local partnerships.
  - **Wave 3 (+6–12 mo):** UK, US. English already shipped, KC and AKC integration, compete by being better and cheaper than incumbents.
- **Open signups everywhere from day 1:** English-language app available in any country. Measure where signups come from organically. If a wave-3 market signs up unexpectedly, prioritize it.

**i18n / resource files architecture:**
- Library: **next-intl** (recommended for Next.js) or i18next. Both support ICU MessageFormat.
- File structure: `messages/no.json`, `messages/sv.json`, `messages/da.json`, `messages/en.json`, `messages/de.json`, `messages/nl.json` at launch.
- All user-facing strings go through `t("key.name")` — never hardcoded.
- Translation tooling: Tolgee (open-source, free) or Crowdin/Lokalise at scale.
- AI-assisted: Claude drafts all languages in one pass, native speaker reviews before publish. 70% time-savings vs human-from-zero.
- Region vs language are independent settings (German speaker in Spain → German UI, EUR currency).

**Languages at launch (6):**
- Norwegian Bokmål (primary)
- Swedish
- Danish
- English (UK + US, one variant initially)
- German (DE + AT + CH)
- Dutch (NL + BE)

Italian, French, Spanish in wave 3+ if demand validates.

**Beyond translation — what actually varies per region:**
- **Kennel club registries:** abstract as `Registry` objects; each Dog has N registration_numbers across registries
- **Health-test schemes:** HD scoring differs (FCI A–E vs OFA Excellent/Good/Fair vs PennHIP DI vs BVA 0–106). Display in user's regional default, store raw value + scheme.
- **BSL (breed bans):** per country, per state. Warn kennels selling puppies abroad.
- **Date formats:** Intl.DateTimeFormat handles automatically (11.05.2026 vs 11/05/2026 vs 05/11/2026)
- **Currency:** NOK, SEK, DKK, EUR, GBP, USD. Stripe handles multi-currency. User sees their currency, kennel paid in theirs.
- **Tax:** Stripe Tax handles EU VAT/MOMS automatically. US is per-state — manageable but more complexity.
- **Address/phone formats:** libphonenumber, per-country address parsing.
- **Timezones:** store UTC, display user-local.

**What we DON'T multiply:**
- Marketing — one lighthouse campaign at a time, not six. Nordic first, build Germany after Nordic validates.
- Per-registry integrations — NKK done well first, others in priority order based on actual user concentration.
- Per-market apps — same product, same features. NOT "DogWorld DE" vs "DogWorld UK" — one platform with regional adaptations.
- Support team — start with English + Norwegian, expand as critical mass forms in other languages.

**Update to earlier "Nordic-first" framing in [research_findings_2026-05.md] and [tech_stack_decision.md]:** still anchor on NKK integration as the deepest wedge, but architect for SE/DK/DE/NL/UK/US from day 1.

**How to apply:**
- All new product code assumes i18n from start (no hardcoded strings, no NOK-only assumptions)
- All schema work assumes multi-registry, multi-currency, multi-tax from start
- When discussing GTM or marketing, default to Nordic wave 1; clarify which wave when extending
- When user asks "should we do X in market Y?" first ask which wave Y is in and how that affects effort
