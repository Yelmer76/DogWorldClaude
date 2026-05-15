import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { litters } from "@/db/schema";
import { listSires, listDams, listLitters } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { Button } from "@/components/ui/Button";

/**
 * /kull/nytt — plan a new litter. Server-action form: pick sire + dam,
 * choose mating date, get an auto-suggested next letter (A → B → C …).
 * On submit, validates the letter is not already used in the kennel,
 * inserts the new litter row and redirects to /kull/[id].
 */
export default async function NyttKullPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; letter?: string }>;
}) {
  const params = await searchParams;
  const [sires, dams, existing] = await Promise.all([
    listSires(),
    listDams(),
    listLitters(),
  ]);

  // Suggest next letter — D after A/B/C, etc. Skip Q/X/Y/Z by convention
  // (many breeders find them hard to name puppies under) — they remain
  // available if the user types them manually.
  const usedLetters = new Set(existing.map((l) => l.letter));
  const PREFERRED = "ABCDEFGHIJKLMNOPRSTUVW".split("");
  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const nextLetter =
    PREFERRED.find((l) => !usedLetters.has(l)) ??
    ALPHA.find((l) => !usedLetters.has(l)) ??
    "A";

  // Pre-fill from a failed previous submit if the URL says so
  const prefillLetter = params.letter ?? nextLetter;
  const usedLettersList = [...usedLetters].sort().join(", ");

  async function create(formData: FormData) {
    "use server";
    const letter = String(formData.get("letter") ?? "").toUpperCase().trim();
    const sireId = String(formData.get("sireId") ?? "");
    const damId = String(formData.get("damId") ?? "");
    const matingDate = String(formData.get("matingDate") ?? "");
    const poetic = String(formData.get("poetic") ?? "").trim();

    if (!letter || !sireId || !damId || !matingDate) {
      redirect(`/kull/nytt?error=missing&letter=${encodeURIComponent(letter)}`);
    }

    // Duplicate-letter check (per kennel — for now hardcoded to "granheim",
    // will become user.kennelId once auth fully wires kennel ownership)
    const db = await getDb();
    const allInKennel = await listLitters();
    const conflict = allInKennel.find(
      (l) => l.letter === letter && l.kennelId === "granheim",
    );
    if (conflict) {
      redirect(
        `/kull/nytt?error=duplicate&letter=${encodeURIComponent(letter)}`,
      );
    }

    // Estimated whelping = mating + 63 days; delivery = whelping + 8 weeks
    const whelp = new Date(matingDate);
    whelp.setDate(whelp.getDate() + 63);
    const deliv = new Date(matingDate);
    deliv.setDate(deliv.getDate() + 63 + 56);

    const id = `kull-${letter.toLowerCase()}-${Date.now().toString(36).slice(-4)}`;
    const callName = `Kull ${letter}`;

    await db
      .insert(litters)
      .values({
        id,
        kennelId: "granheim",
        letter,
        callName,
        poetic: poetic || null,
        sireId,
        damId,
        matingDate,
        whelpingDate: whelp.toISOString().slice(0, 10),
        deliveryDate: deliv.toISOString().slice(0, 10),
        weekOfAge: 0,
        status: "planned",
        total: 0,
        males: 0,
        females: 0,
        available: 0,
        applicationsTotal: 0,
      })
      .run();

    redirect(`/kull/${id}`);
  }

  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-8 py-5 md:py-8 max-w-[640px] w-full mx-auto flex flex-col gap-6">
        <header>
          <Link
            href="/kull"
            className="text-xs text-n-500 hover:text-n-700 inline-flex items-center gap-1 mb-3"
          >
            ← Alle kull
          </Link>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
            Planlegg kull
          </div>
          <h1 className="m-0 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-n-950 leading-tight">
            Nytt kull
          </h1>
          <p className="m-0 mt-2 text-base text-n-700 leading-relaxed max-w-[60ch]">
            Velg foreldre og forventet paringsdato. Vi regner ut sannsynlig
            valpetidspunkt (≈ 63 dager) og leveringsdato (8 uker etter
            valping). Du kan justere alt senere.
          </p>
        </header>

        <form action={create} className="flex flex-col gap-4">
          <Field
            label="Kull-bokstav"
            hint={
              <>
                FCI-land (Norge, Sverige, Tyskland) bruker bokstav per kull
                — A, B, C … startes om på A når Z er nådd. Q/X/Y/Z hoppes
                gjerne over. AKC (USA) og UK Royal Kennel Club krever ingen
                bokstav, men du kan likevel bruke det for ryddig journal.
                {usedLettersList && (
                  <>
                    {" "}
                    Brukt så langt: <span className="font-mono">{usedLettersList}</span>.
                  </>
                )}
              </>
            }
            error={
              params.error === "duplicate"
                ? `Bokstaven «${params.letter}» er allerede i bruk i denne kennelen.`
                : undefined
            }
          >
            <input
              type="text"
              name="letter"
              defaultValue={prefillLetter}
              maxLength={2}
              required
              className="w-24 bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-2xl font-mono font-semibold text-n-950 uppercase focus:outline-none focus:border-forest-500 text-center"
            />
          </Field>

          <Field
            label="Far"
            hint="Hannhunder fra registeret. Importert sæd legges inn manuelt senere."
          >
            <select
              name="sireId"
              required
              defaultValue=""
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-sm focus:outline-none focus:border-forest-500"
            >
              <option value="" disabled>
                Velg hannhund …
              </option>
              {sires.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                  {d.titles && (d.titles as string[]).length > 0
                    ? ` · ${(d.titles as string[]).join(" ")}`
                    : ""}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Mor" hint="Tisper fra registeret.">
            <select
              name="damId"
              required
              defaultValue=""
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-sm focus:outline-none focus:border-forest-500"
            >
              <option value="" disabled>
                Velg tispe …
              </option>
              {dams.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                  {d.titles && (d.titles as string[]).length > 0
                    ? ` · ${(d.titles as string[]).join(" ")}`
                    : ""}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Forventet paringsdato"
            hint="Vi setter status til «Planlagt» og varsler deg når dagen nærmer seg."
          >
            <input
              type="date"
              name="matingDate"
              required
              defaultValue={new Date().toISOString().slice(0, 10)}
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono focus:outline-none focus:border-forest-500"
            />
          </Field>

          <Field
            label="Poetisk navn (valgfritt)"
            hint="«Stars of the Fjord» typen. Vises på offentlig kennelside."
          >
            <input
              type="text"
              name="poetic"
              placeholder="F.eks. «Stars of the Fjord»"
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
            />
          </Field>

          <footer className="flex items-center justify-between gap-3 pt-3 border-t border-n-100 mt-2">
            <Link href="/kull">
              <Button variant="ghost" size="md">
                Avbryt
              </Button>
            </Link>
            <Button variant="primary" size="md" type="submit">
              Opprett kull →
            </Button>
          </footer>
        </form>
      </div>
    </>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-n-950 block mb-1">
        {label}
      </span>
      {hint && (
        <span className="text-xs text-n-500 block mb-2 leading-relaxed">
          {hint}
        </span>
      )}
      {children}
      {error && (
        <span className="text-xs text-error-fg block mt-2 leading-relaxed">
          ⚠ {error}
        </span>
      )}
    </label>
  );
}
