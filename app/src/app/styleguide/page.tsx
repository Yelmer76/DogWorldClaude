import Link from "next/link";
import { Toc } from "@/components/styleguide/Toc";
import { ColorSection } from "@/components/styleguide/ColorSection";
import { TypographySection } from "@/components/styleguide/TypographySection";
import { SpacingSection } from "@/components/styleguide/SpacingSection";
import { RadiusSection } from "@/components/styleguide/RadiusSection";
import { ElevationSection } from "@/components/styleguide/ElevationSection";
import { ButtonsSection } from "@/components/styleguide/ButtonsSection";
import { FormsSection } from "@/components/styleguide/FormsSection";

export const metadata = {
  title: "Designsystem · DogWorld(tmp)",
};

export default function StyleguidePage() {
  return (
    <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] max-w-[1320px] mx-auto px-6 w-full">
      <Toc />

      <main className="py-8 lg:pl-8 lg:py-8 min-w-0">
        {/* Hero */}
        <header className="py-12 lg:py-16 border-b border-n-100 mb-12">
          <Link
            href="/"
            className="text-sm text-forest-700 hover:text-forest-900 transition-colors mb-6 inline-block"
          >
            ← Tilbake
          </Link>
          <p className="text-xs uppercase tracking-[0.08em] font-semibold text-ochre-700 mb-3">
            DogWorld(tmp) · Designsystem-referanse
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] mb-3 text-n-950">
            Verktøyet for kennelen.
          </h1>
          <p className="text-lg text-n-700 max-w-[56ch]">
            Én sannhetskilde — nettsiden, bakkontoret, kjøperportalen. Stille,
            disiplinert, varm. Bygd for oppdrettere med en mobil i én hånd og
            en valp i den andre.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-n-500">
            <div>
              <b className="text-n-950 font-medium">Versjon</b> 0.1 · foundations
            </div>
            <div>
              <b className="text-n-950 font-medium">Bygd for</b> Mobil-først ·
              375 / 768 / 1280
            </div>
            <div>
              <b className="text-n-950 font-medium">Type</b> Inter
            </div>
          </div>
        </header>

        {/* Foundations */}
        <ColorSection />
        <TypographySection />
        <SpacingSection />
        <RadiusSection />
        <ElevationSection />

        {/* Components */}
        <ButtonsSection />
        <FormsSection />

        {/* Placeholder for sections still to come */}
        <section className="py-16 border-t border-n-100">
          <div className="bg-bg-card rounded-card border border-n-200 p-12 text-center">
            <p className="text-xs uppercase tracking-[0.08em] font-medium text-n-500 mb-2">
              Kommer i neste commits
            </p>
            <h2 className="text-2xl font-semibold mb-3 text-n-950">
              Kort, tags, navigasjon, mønstre, hund-atomer
            </h2>
            <p className="text-n-700 max-w-md mx-auto">
              Resten av designsystemet (kort-varianter, tags og badges,
              navigasjon, empty-states, toaster, stamtavle-noder, helse-rader,
              foto-grid, kull-tidslinje) bygges i påfølgende commits.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
