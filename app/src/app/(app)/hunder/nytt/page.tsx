import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { dogs as dogsTable } from "@/db/schema";
import { listSires, listDams } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { Button } from "@/components/ui/Button";

/**
 * /hunder/nytt — manual entry of a single dog. Mirrors /kull/nytt.
 *
 * Sprint 14b+ minimal happy path: name + sex + born are required, the
 * rest is optional (titles, parents, microchip, color, country). Kamera-
 * skann av papirstamtavle / helse-sertifikat kommer som egen modal-flow.
 */
export default async function NyHundPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; name?: string }>;
}) {
  const params = await searchParams;
  const [sires, dams] = await Promise.all([listSires(), listDams()]);

  async function create(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    const callName = String(formData.get("callName") ?? "").trim();
    const sex = String(formData.get("sex") ?? "");
    const born = String(formData.get("born") ?? "");
    const breed = String(formData.get("breed") ?? "Norsk Elghund").trim();
    const country = String(formData.get("country") ?? "NO").trim();
    const titlesRaw = String(formData.get("titles") ?? "").trim();
    const microchip = String(formData.get("microchip") ?? "").trim();
    const color = String(formData.get("color") ?? "").trim();
    const sireId = String(formData.get("sireId") ?? "").trim();
    const damId = String(formData.get("damId") ?? "").trim();

    if (!name || (sex !== "m" && sex !== "f") || !born) {
      redirect(
        `/hunder/nytt?error=missing&name=${encodeURIComponent(name)}`,
      );
    }

    // Generate id from name: lowercase, strip non-alnum, take first 16 chars,
    // append short random suffix for uniqueness
    const slug =
      name
        .toLowerCase()
        .replace(/[æå]/g, "a")
        .replace(/ø/g, "o")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 24) ||
      `hund-${Date.now().toString(36).slice(-4)}`;
    const id = `${slug}-${Date.now().toString(36).slice(-4)}`;

    const titles = titlesRaw
      ? titlesRaw
          .split(/[\s,]+/)
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const db = await getDb();
    await db
      .insert(dogsTable)
      .values({
        id,
        kennelId: "granheim",
        titles,
        name,
        callName: callName || null,
        sex: sex as "m" | "f",
        breed: breed || "Norsk Elghund",
        country: country || "NO",
        born,
        color: color || null,
        microchip: microchip || null,
        breeder: "Kennel Granheim",
        sireId: sireId || null,
        damId: damId || null,
        status: "active",
        publicVisible: true,
        sharedToGenealogy: true,
        hidden: false,
      })
      .run();

    redirect(`/dog/${id}`);
  }

  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-8 py-5 md:py-8 max-w-[640px] w-full mx-auto flex flex-col gap-6">
        <header>
          <Link
            href="/hunder"
            className="text-xs text-n-500 hover:text-n-700 inline-flex items-center gap-1 mb-3"
          >
            ← Hunder
          </Link>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
            Legg til hund
          </div>
          <h1 className="m-0 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-n-950 leading-tight">
            Ny hund
          </h1>
          <p className="m-0 mt-2 text-base text-n-700 leading-relaxed max-w-[60ch]">
            Bare navn, kjønn og fødselsdato kreves for å komme i gang. Du
            kan fylle inn resten — eller skanne papirstamtavle med
            kamera-FABen — etter at hunden er opprettet.
          </p>
        </header>

        <form action={create} className="flex flex-col gap-4">
          <Field
            label="Registrert navn *"
            hint="Det fulle, registreringsnavnet uten titler. F.eks. «Astor av Granheim»."
            error={
              params.error === "missing"
                ? "Navn, kjønn og fødselsdato er obligatorisk."
                : undefined
            }
          >
            <input
              type="text"
              name="name"
              required
              autoFocus
              defaultValue={params.name ?? ""}
              placeholder="F.eks. «Bella vom Schwarzwald»"
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-base text-n-950 focus:outline-none focus:border-forest-500"
            />
          </Field>

          <Field
            label="Kallenavn (valgfritt)"
            hint="Det dere bruker hjemme."
          >
            <input
              type="text"
              name="callName"
              placeholder="F.eks. «Bella»"
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Kjønn *" hint="">
              <div className="flex gap-2">
                <RadioPill name="sex" value="m" label="♂ Hann" />
                <RadioPill name="sex" value="f" label="♀ Tispe" />
              </div>
            </Field>

            <Field label="Fødselsdato *" hint="">
              <input
                type="date"
                name="born"
                required
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono focus:outline-none focus:border-forest-500"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Rase" hint="Standard fra kennelen.">
              <input
                type="text"
                name="breed"
                defaultValue="Norsk Elghund"
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
              />
            </Field>

            <Field label="Land (ISO)" hint="NO, SE, DK, DE, UK …">
              <input
                type="text"
                name="country"
                defaultValue="NO"
                maxLength={3}
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:border-forest-500"
              />
            </Field>
          </div>

          <Field
            label="Titler (valgfritt)"
            hint="Kommaseparert. F.eks. «NUCH, NORDUCH» eller «VDH-CH». Kommer foran navnet i pedigree-visning."
          >
            <input
              type="text"
              name="titles"
              placeholder="F.eks. NUCH, NORDUCH"
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono focus:outline-none focus:border-forest-500"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Far (valgfritt)"
              hint="Velg fra registeret eller la stå tom."
            >
              <select
                name="sireId"
                defaultValue=""
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
              >
                <option value="">Ukjent / utenfor registeret</option>
                {sires.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Mor (valgfritt)" hint="">
              <select
                name="damId"
                defaultValue=""
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
              >
                <option value="">Ukjent / utenfor registeret</option>
                {dams.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Farge" hint="F.eks. «Gråsvart», «Sort», «Gul».">
              <input
                type="text"
                name="color"
                placeholder="(valgfritt)"
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-forest-500"
              />
            </Field>

            <Field label="Mikrochip" hint="15-sifret ISO-nummer.">
              <input
                type="text"
                name="microchip"
                inputMode="numeric"
                maxLength={15}
                placeholder="(valgfritt)"
                className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2 text-sm font-mono focus:outline-none focus:border-forest-500"
              />
            </Field>
          </div>

          <div className="bg-warm-600/10 border border-warm-600/20 rounded-card p-3 text-xs text-n-700 leading-relaxed">
            ✱ Helse-resultater (HD, ED, øyne, DNA-tester) og titler fra
            utstilling kommer du best i gang med via kamera-FABen på
            hund-detalj-siden. Vi OCR-er sertifikater og fyller inn for
            deg. (Skanner aktiveres i en senere sprint — inntil da legges
            de inn manuelt.)
          </div>

          <footer className="flex items-center justify-between gap-3 pt-3 border-t border-n-100 mt-2">
            <Link href="/hunder">
              <Button variant="ghost" size="md">
                Avbryt
              </Button>
            </Link>
            <Button variant="primary" size="md" type="submit">
              Opprett hund →
            </Button>
          </footer>
        </form>
      </div>
    </>
  );
}

function RadioPill({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="flex-1 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        required
        className="peer sr-only"
      />
      <span className="block text-center text-sm font-medium text-n-700 bg-bg-card border border-n-300 rounded-btn px-3 py-2 transition-colors peer-checked:bg-forest-50 peer-checked:border-forest-700 peer-checked:text-forest-700 hover:border-n-500">
        {label}
      </span>
    </label>
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
