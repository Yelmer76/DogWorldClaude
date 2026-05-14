---
name: DogWorld tech stack — initial recommendation
description: One-codebase web-first stack (Next.js + Supabase + Capacitor) with EU residency; deferred until validated by build
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Initial tech-stack recommendation locked on 2026-05-11. **Status: recommendation, not committed.** Reconsider if a strong argument emerges before first real code.

**Core principle:** one codebase, mobile-first, works on desktop too. Smallest moving-parts surface area we can get away with at this stage.

**The stack:**
- **Frontend:** Next.js (React) + Tailwind CSS + shadcn/ui
- **Native packaging:** Capacitor — only when App Store / Play Store presence becomes valuable (probably v2+)
- **Backend:** Supabase (Postgres + Auth + Storage + Realtime), EU region
- **Image storage at volume:** Cloudflare R2 (zero egress, lower than Supabase Storage at scale)
- **AI:** Anthropic API (Claude) for migration extraction, content drafting, Q&A bot, travel-mode triage
- **Component library:** Storybook
- **Frontend hosting:** Vercel

**Why these picks (so we don't re-litigate every time):**
- **Next.js over SvelteKit:** SvelteKit is technically simpler and faster on mobile, but Next.js has the larger ecosystem, more shadcn/ui-quality component libraries, more AI-tool support (Cursor + Claude Code are stronger on React), easier hiring in Norway. The "safe choice that scales" wins here.
- **Supabase over Firebase:** Firestore is wrong shape for pedigree relations; Firebase locks to Google; EU residency harder. Supabase gives ~90% of a backend out of the box and is open-source if we ever need to escape.
- **Supabase over self-hosted Postgres / PocketBase:** self-hosting at this stage is distraction tax — security patches, backups, uptime monitoring all become our problem. Not worth $20/mo of savings.
- **PWA + Capacitor over React Native:** one codebase, web + mobile + desktop. RN doubles maintenance.
- **EU region everywhere:** Norwegian customers, GDPR, Nordic credibility moat against US incumbents.

**Cost shape (rough):**
- Dev (0 users): ~50 NOK/mo (just AI prototyping)
- 100 paying: ~800 NOK/mo
- 1,000 paying: ~4,000 NOK/mo  
- 10,000 paying: ~20,000 NOK/mo

**Things explicitly NOT in the plan:**
- Microservices (monolith with clean internal seams wins for years)
- DIY auth (Supabase Auth or Clerk)
- Separate iOS / Android / web codebases
- Self-hosting infrastructure beyond what PaaS can do
- More than NO + EN at launch

**Atomic design fit:**
Tailwind + shadcn/ui IS atomic by construction. Storybook organizes the library. Brad Frost's atoms/molecules/organisms/templates/pages maps cleanly onto this stack — atomic methodology was already on user's mind, not a bolt-on.

**How to apply:**
- When suggesting libraries or implementation patterns, default to this stack unless explicitly reconsidering
- Component code suggestions should follow shadcn/ui conventions (component copied into project, owned outright, not a wrapped library)
- Schema work should be Postgres-flavored with RLS (Supabase's tenant isolation mechanism) in mind from day one
- AI calls go through Anthropic SDK with prompt caching enabled (Anthropic EU region)
- Reconsider before locking if user reports: hiring constraints, a customer with specific stack preference, or perf issues that point at framework
