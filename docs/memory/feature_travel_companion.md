---
name: Travel-companion / map feature
description: Mobile map mode for dog owners on the go — vets, food, BSL, ferries, abroad rules. Bundled into DogWorld app.
type: project
originSessionId: c1b69422-1716-4359-96ad-6677b11578ae
---
Added to DogWorld scope on 2026-05-10. A mobile-first "travel companion" view: open the app, see a map, find what you need as a dog owner — locally and abroad. Bundled into the main DogWorld app (not a separate product).

**Why now:**
- AniCura's app shut down 30 Nov 2024 → real vacuum in Norwegian pet-app market
- Whistle (acquired by Tractive) discontinued Aug 2025 → another exit
- No incumbent combines map + regulatory intelligence + emergency UX in the Nordics
- DogWorld's existing kennel-customer base is a ready-made content engine for "trusted local vet" tips

**Confirmed unique angles (to defend in product):**
- **Giftinformasjonen 22 59 13 00 does NOT handle animals** — must call NMBU Veterinærhøgskolen 67 23 00 00. Most Norwegian dog owners don't know this. Calling this out clearly is a free trust win.
- **Tapeworm rule (24–120h before entry) applies to Norway too**, not just outbound — easy to miss. Smart calendar warning is high-value.
- **Båndtvang varies per kommune** (national 1 April – 20 August, often extended) — live "leash status here" is genuinely Norwegian.
- **Ferries (Color Line, Stena) are the dominant Norwegian travel pattern** — pet cabin rules differ per route, sell out in summer; pre-booking watcher is novel.

**Stack picks (cost-conscious):**
- **MapLibre Native** (open-source, free) for renderer; **MapTiler** for tiles (~250 NOK/mo at launch)
- **Overture Maps Places** (CDLA Permissive 2.0, free, monthly refresh) as base place data
- **Google Places API** only on tap for hours/photos (gates cost)
- **Curated Norwegian vet dataset** (~250 clinics) is the moat — built and maintained in-house
- **Offline travel packs** (MapLibre native offline regions) — required for ferries + rural Sweden
- **Cost shape:** ~50–500 NOK/mo at MVP/1k MAU; ~800–1500 NOK/mo at 10k MAU; well below Google Maps SDK equivalent

**MVP scope (8–10 weeks):**
1. Map screen with filter chips (Vet · Open now · Emergency · Park · Off-leash beach · Pet store)
2. Curated Norway vet dataset with after-hours flag + one-tap call
3. Travel checklist generator (e.g. NO→DE via Color Line Kiel: microchip ✓, rabies, tapeworm window, BSL warnings)
4. Emergency tab — 3 buttons: nearest open vet · poison guidance (with NMBU number + clear "human Giftinformasjonen does NOT do animals" callout) · FirstVet handoff
5. Offline pack download for one country

**Magical follow-ons:**
- Border-crossing geofence assistant (auto-warn on approach to Svinesund, ferry terminals, airports)
- Live båndtvang by GPS (kommune-level)
- Emergency phrasebook in 12 languages, offline ("Hunden min har et anfall")
- AI vet-triage chat → one-tap call escalation
- Tick + adder seasonal heatmap (FHI data)
- "Asfalt akkurat nå" paw-temp warnings via YR.no API
- DNT cabin dog-room overlay from UT.no
- Vaccination wallet synced from DogWorld kennel records
- Ferry pet-cabin availability watcher (Stena, Color Line)
- DogWorld kennels as "trusted local vet" content layer

**How to apply:**
- This is now an in-scope DogWorld feature, not a separate product. When discussing roadmap/MVP, treat it as a v1 or fast-follow-after-v1 module
- The Norway-specific data points (NMBU number, kommune båndtvang, ferry rules, FHI risk maps) are the moat — defend these as differentiation, don't water them down toward generic Google Maps parity
- The DogWorld kennel network is a built-in content distribution channel for this feature — design with that in mind
