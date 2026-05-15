import Link from "next/link";

/**
 * /login/sent — confirmation that the magic link has been "sent".
 * In Sprint 14 we surface the dev link here directly so you can
 * one-click into the app without an email provider.
 */
export default async function LoginSentPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; link?: string }>;
}) {
  const params = await searchParams;
  const email = params.email ?? "";
  const link = params.link ?? "";
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <main className="min-h-screen grid place-items-center bg-bg-page px-4">
      <div className="w-full max-w-[460px] bg-bg-card border border-n-200 rounded-card p-6 md:p-8 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
        <div
          aria-hidden
          className="w-12 h-12 rounded-full bg-success-bg text-success-fg grid place-items-center mb-5"
        >
          ✓
        </div>
        <h1 className="m-0 text-xl md:text-2xl font-semibold tracking-[-0.01em] text-n-950">
          Sjekk e-posten din
        </h1>
        <p className="m-0 mt-2 text-sm text-n-700 leading-relaxed">
          Vi har sendt en magisk lenke til{" "}
          <span className="font-medium text-n-950">{email}</span>. Klikk den i
          løpet av 15 minutter for å logge inn.
        </p>

        {isDev && link && (
          <div className="mt-5 bg-warm-600/10 border border-warm-600/30 rounded-card p-4">
            <div className="text-[10px] uppercase tracking-[0.08em] font-mono text-warm-600 mb-2">
              Dev-modus · ingen e-post sendes ennå
            </div>
            <p className="m-0 text-xs text-n-700 mb-3 leading-relaxed">
              Sprint 15 wirer Resend for ekte utsending. Inntil da kan du
              klikke direkte:
            </p>
            <a
              href={link}
              className="block w-full text-center bg-ochre-600 hover:bg-[#25415a] text-white rounded-btn px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Logg inn nå →
            </a>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-xs">
          <Link
            href="/login"
            className="text-forest-700 hover:text-forest-900"
          >
            ← Bruk en annen adresse
          </Link>
          <span className="text-n-500">Mottok du ikke noe?</span>
        </div>
      </div>
    </main>
  );
}
