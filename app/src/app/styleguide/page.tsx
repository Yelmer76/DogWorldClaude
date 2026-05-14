"use client";

import Link from "next/link";
import { Toc } from "@/components/styleguide/Toc";
import { ColorSection } from "@/components/styleguide/ColorSection";
import { TypographySection } from "@/components/styleguide/TypographySection";
import { SpacingSection } from "@/components/styleguide/SpacingSection";
import { RadiusSection } from "@/components/styleguide/RadiusSection";
import { ElevationSection } from "@/components/styleguide/ElevationSection";
import { ButtonsSection } from "@/components/styleguide/ButtonsSection";
import { FormsSection } from "@/components/styleguide/FormsSection";
import { CardsSection } from "@/components/styleguide/CardsSection";
import { TagsSection } from "@/components/styleguide/TagsSection";
import {
  NavMobileSection,
  NavDesktopSection,
} from "@/components/styleguide/NavSection";
import {
  EmptyLoadingErrorSection,
  ToastDialogSection,
  SheetSection,
} from "@/components/styleguide/PatternsSections";
import {
  PedigreeSection,
  HealthSection,
  PhotoGridSection,
  TimelineSection,
} from "@/components/styleguide/DogAtomsSection";

// metadata can't be exported from a Client Component; the layout title still applies.

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
        <CardsSection />
        <TagsSection />

        {/* Navigation */}
        <NavMobileSection />
        <NavDesktopSection />

        {/* Patterns */}
        <EmptyLoadingErrorSection />
        <ToastDialogSection />
        <SheetSection />

        {/* Dog-specific atoms */}
        <PedigreeSection />
        <HealthSection />
        <PhotoGridSection />
        <TimelineSection />

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-n-100 flex flex-wrap justify-between gap-4 text-xs text-n-500">
          <div>
            DogWorld(tmp) · Designsystem v0.1 · {new Date().getFullYear()}
          </div>
          <div>Foundations + components + patterns + dog atoms — komplett</div>
        </footer>
      </main>
    </div>
  );
}
