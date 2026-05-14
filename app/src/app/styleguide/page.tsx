import Link from "next/link";

export default function StyleguidePage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-12 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <Link
          href="/"
          className="text-sm text-forest-700 hover:text-forest-900 transition-colors mb-4 inline-block"
        >
          ← Tilbake
        </Link>
        <p className="font-mono text-xs uppercase tracking-wider text-forest-700 mb-2">
          DogWorld(tmp) Designsystem
        </p>
        <h1 className="text-4xl font-semibold text-n-950 mb-4">
          The Expert Trio
        </h1>
        <p className="text-lg text-n-700 max-w-2xl">
          Designsystemet med farger, typografi, mellomrom, komponenter og
          hund-spesifikke atomer. Fundamentet alt annet bygges på.
        </p>
      </div>

      <div className="bg-white rounded-lg p-12 text-center border border-n-100">
        <p className="text-n-500 mb-2 font-mono text-sm uppercase tracking-wider">
          Sprint 2
        </p>
        <h2 className="text-2xl font-semibold text-n-950 mb-3">
          Designsystemet kommer snart
        </h2>
        <p className="text-n-700 max-w-md mx-auto">
          Denne siden får snart et fullstendig speil av designsystemet fra
          Claude Design — farger, typografi, knapper, kort, tags, hund-kort,
          stamtavle-noder og helse-rader.
        </p>
      </div>

      {/* Quick palette preview — sanity check that tokens load */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-n-950 mb-6">
          Fargepaletten — første sjekk
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PaletteSwatch label="Forest 700" hex="#3F5A55" className="bg-forest-700 text-white" />
          <PaletteSwatch label="Ochre 600" hex="#1C3245" className="bg-ochre-600 text-white" />
          <PaletteSwatch label="Warm 600" hex="#c98a27" className="bg-warm-600 text-white" />
          <PaletteSwatch label="BG page" hex="#F5F2ED" className="bg-bg-page text-n-950 border border-n-100" />
        </div>
      </div>
    </main>
  );
}

function PaletteSwatch({
  label,
  hex,
  className,
}: {
  label: string;
  hex: string;
  className?: string;
}) {
  return (
    <div className={`rounded-card p-6 ${className ?? ""}`}>
      <p className="font-medium text-sm">{label}</p>
      <p className="font-mono text-xs opacity-80 mt-1">{hex}</p>
    </div>
  );
}
