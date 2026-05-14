import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-8 py-24">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-forest-700 mb-6">
          DogWorld(tmp)
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-n-950 mb-6 leading-tight">
          Kennel-verktøyet bygd for valpekassa, ikke skrivebordet.
        </h1>
        <p className="text-lg text-n-700 mb-12 leading-relaxed">
          Vi bygger en mobil-først løsning som erstatter den slitne kennelnettsiden
          din OG Excel-arket — én plattform, én sannhet.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/styleguide"
            className="inline-flex items-center justify-center px-6 py-3 bg-ochre-600 text-white rounded-md hover:bg-ochre-700 transition-colors font-medium"
          >
            Se designsystemet →
          </Link>
        </div>

        <p className="mt-16 text-xs text-n-500 font-mono">
          Pre-MVP scaffold • Next.js 16 + Tailwind v4 + Cloudflare D1 (planned)
        </p>
      </div>
    </main>
  );
}
