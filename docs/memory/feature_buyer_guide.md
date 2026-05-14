---
name: Per-kennel buyer guide ("Kjøperguide")
description: Each kennel publishes their own branded step-by-step new-puppy-owner guide; auto-personalized per puppy; mobile-first
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Added to DogWorld scope on 2026-05-10. Each kennel can publish their own custom new-owner guide on their kennel page — kennel-branded, breed-specific, NOT generic app content.

**Why it's load-bearing (not a nice-to-have):**
- Kills the "same questions over and over" problem every breeder complains about
- Strong sales differentiator — buyer sees the guide before purchase ("look how serious they are")
- Turns one-time puppy sale into lifelong customer relationship → enables future "alumni" content layer
- Empty market space: nobody else does this in the SaaS space. NKK has a generic paper brochure; BreederBuddy/Breedera have basic contracts; Good Dog has chat. Nobody combines kennel-branded + mobile + personalized-per-puppy + time-aware.

**Key design principles (do not violate):**
- Kennel's voice, not app voice. Templates are starting points only — push the kennel to make them their own. Generic-feeling output kills the value prop.
- Per-puppy personalization is essential. Bella's guide shows Bella's name, Bella's litter photos, Bella's actual vaccination dates pulled from the journal. Without this it's just a blog post.
- Mobile-first, opens at 03:00 on a phone — assume the buyer is exhausted and one-handed.

**Connection to other DogWorld features (these are the network-effects):**
- **Travel companion**: guide says "we feed raw" → travel-mode shows raw food stores in buyer's area
- **Vaccination wallet**: guide's vaccination schedule shows in same calendar as travel rules
- **Journal/Litter records**: guide auto-pulls puppy name, kull, photos, actual vaccination dates
- **"Oppdrettet av oss"**: photo-timeline-back-to-breeder feature populates this section automatically over years
- **Memorial / Minneside**: when an alumni dog passes, buyer can submit memorial back to kennel

**MVP scope:**
1. Rich-text editor for kennel (blog-post UX, not form-fill)
2. 4–5 starter templates: generic family dog, working/sport-line, toy breed, gundogs, large breed
3. Per-puppy unique link emailed at delivery (or QR code in paper folder)
4. Mobile-responsive timeline view that "walks with the puppy" (week-aware)
5. Push notifications for milestones (vaccinations, training transitions)
6. Buyer-to-breeder photo + question channel

**Stretch features (the magical ones):**
- AI-drafted starter guide from kennel's choices ("Royal Canin to 6mo + crate training + positive reinforcement" → first draft)
- Q&A bot trained on kennel's own guide, answers in kennel's voice, escalates to breeder when uncertain
- Auto-translate to buyer's language (NO→DE for international sales)
- 1-year-anniversary nudge: "Bella turns 1 — send a photo to the kennel?" → builds adult-photo database for kennel automatically

**How to apply:**
- This is now a v1 or fast-follow-after-v1 module in DogWorld scope
- When designing the schema, model `OwnerGuide` per-kennel with composable `GuideSection`s tied to a phase/age offset; per-puppy state lives in a separate `PuppyJourney` entity that references the guide and the puppy's actual dates
- The strongest defensive moat is the depth of integration with other DogWorld features (travel, vaccination wallet, alumni photos) — keep those connections explicit in product decisions
- Don't water down the "kennel's own voice" principle by over-templating
