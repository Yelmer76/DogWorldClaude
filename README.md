# DogWorld(tmp)

A mobile-first SaaS for dog kennel owners and breeders. Replaces the typical hand-built kennel website plus the breeder's Excel/notebook back-office. One product, one source of truth.

> **Working title.** "DogWorld" is a placeholder. Final brand name pending.

## What's in this repo

```
.
├── CLAUDE.md                    Instructions for Claude Code (read every session)
├── docs/
│   ├── memory/                  Canonical strategic decisions (the brain)
│   ├── design-handoff/          Hi-fi design system + 6 prototypes from Claude Design
│   ├── DogWorld-rapport.pdf     Strategy report (~34 pages, Norwegian)
│   └── build_report_pdf.py      Regenerates the PDF
└── app/                         The Next.js application (TypeScript, Tailwind, Cloudflare)
```

## Status

**Phase: pre-MVP scaffolding.** Strategy, design, and infrastructure decisions locked. First code being written.

- Strategy: complete (14 canonical memory documents in `docs/memory/`)
- Design: complete hi-fi handoff for 6 screens (in `docs/design-handoff/`)
- Tech stack: Next.js 15 + Cloudflare (Pages, Workers, D1, R2, KV) + Drizzle ORM
- Code: starting now

## Quick start (when app is scaffolded)

```bash
cd app
npm install
npm run dev
# Open http://localhost:3000
```

See `app/README.md` (once created) for the full developer guide.

## Strategy report

Open `docs/DogWorld-rapport.pdf` for the full Norwegian strategy document covering market research, competitor analysis, feature scope, multi-market strategy, infrastructure decisions, and design system foundations.

## Founder

Ole — Norway. Contact via private channels.

## License

Proprietary. All rights reserved.
