# Deploy DogWorld(tmp) til Cloudflare

Sprint 15. Førstegangs-deploy + senere oppdateringer.

---

## Førstegangs-deploy (gjør én gang)

Antar du står i `app/`-mappa.

### 1. Wrangler-autentisering

```bash
wrangler login
```

Åpner nettleseren, du logger inn på Cloudflare-kontoen din
(`Red Autumn Software AS`), velger "Allow". Wrangler husker dette
lokalt.

### 2. Lag D1-databasen

```bash
wrangler d1 create dogworld-tmp
```

Output ser slik ut:

```
✅ Successfully created DB 'dogworld-tmp' in region WEUR
[[d1_databases]]
binding = "DB"
database_name = "dogworld-tmp"
database_id = "AAAA-BBBB-CCCC-DDDD"   ← KOPIER DENNE
```

**Lim `database_id`-en inn i `wrangler.toml`** der det står
`FYLL_INN_ETTER_wrangler_d1_create`.

### 3. Kjør migrasjoner mot prod-D1

```bash
npm run cf:db:migrate
```

Dette anvender alle Drizzle-migrasjonene (`drizzle/0000_*.sql`,
`drizzle/0001_*.sql`) mot D1-en din. Skjemaet er identisk med lokal
SQLite.

### 4. Sett Resend-nøkkelen som secret

```bash
wrangler secret put RESEND_API_KEY
```

Når den spør, paste inn `re_A8d4D3wF_FtLe4crXG2XS4cEk45Nd2YMc` (eller
en ny nøkkel fra Resend-dashbordet).

Eventuelt også avsender:

```bash
wrangler secret put RESEND_FROM
# paste: onboarding@resend.dev
```

### 5. Deploy

```bash
npm run deploy
```

Dette gjør:

1. `next build` (Next.js produksjons-bygging)
2. `opennextjs-cloudflare build` (pakker Next-output til en Worker)
3. `wrangler deploy` (laster opp til Cloudflare)

Når det er ferdig får du URL-en — typisk
`https://dogworld-tmp.<din-konto>.workers.dev`.

### 6. Test

- Åpne URL-en i nettleseren
- Du blir sendt til `/login`
- Skriv inn e-posten din → klikk "Send magisk lenke"
- Sjekk e-posten din (kommer fra `onboarding@resend.dev`)
- Klikk lenken → landet på `/today` som innlogget bruker 🎉

---

## Senere deploys

Etter første gang er det bare:

```bash
npm run deploy
```

Hvis du har endret skjemaet (`src/db/schema.ts`):

```bash
npm run db:generate            # lag ny lokal migrasjon
npm run db:migrate             # apply lokalt
npm run cf:db:migrate          # apply mot prod-D1
npm run deploy                 # bygg + deploy
```

---

## Lokal preview av prod-bygget

Vil du teste Worker-bygget lokalt før deploy:

```bash
npm run cf:preview
```

Bruker miniflare (lokal Cloudflare-emulator), kjører appen mot en
lokal D1-stand-in.

---

## Hvis noe går galt

| Symptom | Sannsynlig fiks |
|---|---|
| `Error: D1_ERROR: no such table: dogs` | Glemte `npm run cf:db:migrate` |
| Magic-link mail kommer ikke | Sjekk `wrangler secret list` — er `RESEND_API_KEY` der? |
| `Error: account_id is missing` | Sjekk `wrangler.toml` linje 20 |
| Build feiler på `D1Database` typer | `npm run cf:types` regenererer `cloudflare-env.d.ts` |
| Login-mail går, men `/auth/verify` 500-er | D1-binding mangler — sjekk `database_id` i `wrangler.toml` |

---

## Hva som IKKE er deployd ennå

- Ekte demo-data (Granheim-universet) — D1-en starter tom. Kan
  seedes manuelt: `wrangler d1 execute dogworld-tmp --remote
  --file=./drizzle/seed.sql` (fil må først genereres — kommer i en
  senere sprint).
- Eget domene — i dag bruker vi `*.workers.dev`. Du kan koble
  `dogworld.app` (eller annet du eier) i Cloudflare-dashbordet
  under "Workers & Pages → dogworld-tmp → Settings → Triggers →
  Custom Domain".
- Bilde-opplastings-backend (R2). Bilder lagres ikke i D1 — vi
  trenger en R2-bøtte. Kommer som egen sprint.
