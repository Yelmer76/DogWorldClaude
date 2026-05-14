---
name: Trust, identity, roles, karma, quality — locked decisions
description: Auth design, roles model (Admin-only v1 with extensible architecture), karma point system replacing referral discounts, 2-month ethics self-declaration, removal rights
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Locked 2026-05-14. These are operational/architectural decisions the user has confirmed.

**Working name:** DogWorld is a working title only. Use **`DogWorld(tmp)`** as the placeholder string in code, copy, and PDF where the brand name appears, until final naming + trademark is locked.

## Authentication

- **Magic link** as primary login (passwordless, no "forgot password" flow needed)
- **Passkey / WebAuthn** support from day 1 — leverages Face ID, Touch ID, Windows Hello
- **Mobile app:** biometric default after first login
- **Forced 2FA on web** when logging in from new device — push notification to phone OR magic link to email. **NEVER SMS** (insecure in 2026)
- **No passwords if at all possible.** Industry trend (Notion, Linear, Vercel) and most secure
- **Implementation:** Supabase Auth (has magic link + passkey built in) or Clerk. Both free under 50k users.
- **GDPR:** built in from start, not retrofitted

## Roles & access

- **v1: only "Admin" role.** Every authenticated user on a kennel has full access.
- **Architecturally extensible:** `user_kennel_role` table with role column. In v1 every row has role='admin'. Adding more roles later is a feature flag, not a migration.
- **Future role proposal (locked, build when needed):**
  - Owner — full access including billing, can delete kennel
  - Co-owner — full access except billing (typical spouse/partner)
  - Editor — create/edit content, no delete or settings (employees, apprentices)
  - Helper — daily litter notes, photo upload (teen helper, friend)
  - View-only — read all (family, vet, deposit-list person)
  - Buyer (post-sale) — only their puppy's journey + chat with breeder
- **Principle:** one user, one role per kennel. Clear architecture from start, complexity waits.

## Karma point system (replaces discount-based referrals)

The user explicitly rejects discount-based referrals. Instead, **karma rewards visibility and recognition**, which kennels actually want.

**Earns karma:**
- Profile completion (one-time bonus)
- Each registered dog and litter (scales with activity)
- Contributing to shared genealogy (per linked dog)
- Referring a new kennel that becomes paying customer (large bonus)
- Positive review from puppy buyer
- Daily activity streak (gentle, not punishing)
- Quality photos (light AI scoring or community votes)
- Answering other kennels' Q&A (when community feature launches)
- Account age + long positive history (loyalty weighted)

**Karma unlocks:**
- Higher rank in public search (by breed, region, breeder)
- Priority placement in lists ("Active breeders in [breed]", stud directory)
- Eligibility for "Kennel of the Week" auto-spotlight stories on blog + social (drives traffic to the kennel)
- Visible badge progression on kennel page — Bronze / Silver / Gold / Platinum (social proof)
- Early access to new features (psychological carrot)
- Karma tiers can unlock free Pro months (concrete economic value)

**Anti-pattern to avoid:** NOT Duolingo-style fatiguing gamification. Lost streaks should not produce guilt. Reward activity, do not punish absence.

## Quality / ethics self-declaration (2-month form)

The user wants quality control without becoming "police." Solution: **mandatory self-declaration after 2 months of active use**, annual renewal.

**Mechanics:**
- After 2 months: kennel gets a form to complete
- Questions cover ethical and practical standards (examples below — final wording with lawyer)
- Answers are stored as part of public kennel profile, visible to visitors
- Full green declaration → **"DogWorld(tmp) Verified" badge** on kennel page
- Incomplete or missing → no penalty, but no badge and lower karma weight for visibility
- If we later discover lying → grounds for removal under TOS

**Example questions (need lawyer review for final form):**
- Do you breed under FCI/NKK rules? (Yes / No / My breed isn't FCI-recognized)
- Health-test parents per breed-club RAS? (Yes all recommended / Some / No)
- Sell puppies before 8 weeks? (Never / Special circumstances only / Yes)
- Take puppy back if buyer can't keep? (Always / Sometimes / No)
- Pre-screen puppy buyers? (Always / Sometimes / No)
- Ever sanctioned by a kennel club? (No / Yes — describe)
- Written contracts with buyers? (Always / Usually / No)
- Max litters per bitch per year? (≤1 / 1 every other year / More)
- Breeding as main income or hobby? (Hobby / Main income)

**Dual purpose:** separates ethical from less-serious breeders, AND **forces self-reflection** (many bad practices exist because nobody asked).

## Removal & quality control in practice

- TOS gives us explicit right to remove kennels for ethical violations
- Internal checklist drives action against documented reports or obvious breaches
- We are **reactive, not proactive police** — we act on reports, not exploration
- When removing: quiet, private notice, no public discussion, no social-media drama
- **Three-strike system:** first report = private conversation. Second = temporary downrank. Third = removal.
- False reports also have consequence — we remove malicious reporters

## What is explicitly DEFERRED (with placeholders)

These are decisions consciously deferred but with direction locked:

- **Final branding:** "DogWorld(tmp)" in code until trademark locked
- **Vet / health advisor:** never diagnostic. Aggregator + deeplinks to actual articles only. We surface and curate, never advise.
- **Pricing and packaging:** taken later — does not affect technical architecture
- **Legal foundation:** handled in parallel by founder — not a developer task
- **Affiliate program:** scoped for later
- **Risk register:** "as we go" — react when things happen
- **Press strategy:** reactive only — marketing engine handles daily comms

## How to apply

- **Auth code from day 1:** Supabase Auth + WebAuthn extension OR Clerk. Magic link primary, passkey supported, biometric on mobile, forced 2FA on web.
- **Database schema from day 1:** `user_kennel_role` table even though only one role exists. Don't skip the table just because it's trivial — the migration cost when you do need it is much higher.
- **Karma fields in user/kennel models from day 1.** A `karma_score` (int) on kennel and an `karma_event` audit table. Implementation of HOW it's earned/displayed can come later, but the field needs to exist so we don't lose history.
- **TOS draft from day 1** with right-to-remove clause and ethics-declaration requirement language. Lawyer review later, but founder owns this — not engineering.
- When implementing search/listing endpoints, build with `ORDER BY karma_score DESC` parameter from start, even if the karma values are all zero in v1.
- When discussing branding-touched content with founder, use "DogWorld(tmp)" until they say otherwise.
