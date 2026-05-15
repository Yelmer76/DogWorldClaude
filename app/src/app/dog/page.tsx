"use client";

import Link from "next/link";
import { useState } from "react";
import { dogs, granheim } from "@/data/universe";
import { DogHero } from "@/components/dog-detail/DogHero";
import { DogNameBlock } from "@/components/dog-detail/DogNameBlock";
import { TabBar, type TabKey } from "@/components/dog-detail/TabBar";

/**
 * Dog Detail screen — Sprint 3.
 * Hardcoded to Astor av Granheim for v0.1; routing with [id] arrives in
 * Sprint 4 when the database is wired up.
 */
export default function DogDetailPage() {
  // Local mutable copy of Astor so inline edits feel real (re-render on save)
  const [dog, setDog] = useState(dogs.astor);
  const [activeTab, setActiveTab] = useState<TabKey>("profil");
  const [publicVisible, setPublicVisible] = useState(
    dog.publicVisible ?? true,
  );

  const sex = dog.sex;
  const ageText = computeAgeText(dog.born);

  return (
    <div className="min-h-screen flex flex-col bg-bg-page">
      {/* Top utility bar — keeps a path back to the rest of the app */}
      <div className="bg-bg-card border-b border-n-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-forest-700 hover:text-forest-900 transition-colors inline-flex items-center gap-1"
          >
            ← Tilbake
          </Link>
          <span className="text-xs text-n-500 font-mono">
            {granheim.name} · Sprint 3 forhåndsvisning
          </span>
        </div>
      </div>

      {/* Main detail surface */}
      <article className="max-w-3xl w-full mx-auto bg-bg-card md:rounded-card md:border md:border-n-200 md:my-6 overflow-hidden md:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
        <DogHero
          status={dog.status}
          tone="sire"
          photoCount={47}
          onPhotoClick={() => {
            /* gallery modal arrives later */
          }}
          onStatusClick={() => {
            /* status sheet arrives in Sprint 3E */
          }}
        />

        <DogNameBlock
          registeredName={fullName(dog)}
          callName={dog.callName}
          sex={sex}
          ageText={ageText}
          breed={dog.breed}
          titles={dog.titles}
          publicVisible={publicVisible}
          onCallNameSave={(next) =>
            setDog((d) => ({ ...d, callName: next || undefined }))
          }
          onPublicToggle={() => setPublicVisible((v) => !v)}
        />

        <TabBar activeKey={activeTab} onChange={setActiveTab} />

        {/* Tab content — placeholders in Sprint 3A; real content in 3B–3D */}
        <section
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="px-4 md:px-6 py-6 min-h-[240px]"
        >
          <PlaceholderPanel tab={activeTab} />
        </section>
      </article>
    </div>
  );
}

function PlaceholderPanel({ tab }: { tab: TabKey }) {
  const labels: Record<TabKey, { title: string; sub: string }> = {
    profil: {
      title: "Profil-fanen kommer i Sprint 3B",
      sub: "5 seksjoner med inline-redigering: Grunnleggende, Foreldre, Oppdretter og eier, Personlighet, Status og synlighet.",
    },
    stamtavle: {
      title: "Stamtavle-fanen kommer i Sprint 3D",
      sub: "3-generasjons mini-tre forankret på denne hunden + avkom-liste.",
    },
    helse: {
      title: "Helse-fanen kommer i Sprint 3C",
      sub: "Strukturert helse-tabell + vaksine-grid + 7-måneders vekt-graf.",
    },
    titler: {
      title: "Titler-fanen kommer i Sprint 3C",
      sub: "Stats + kronologisk tidslinje gruppert per år.",
    },
    bilder: {
      title: "Bilder-fanen kommer i Sprint 3D",
      sub: "Album-chips + responsiv 4–6-kolonne grid.",
    },
    notater: {
      title: "Notater-fanen kommer i Sprint 3D",
      sub: "Tidsstemplet notat-komponist + private oppføringer.",
    },
  };
  const { title, sub } = labels[tab];
  return (
    <div className="border border-dashed border-n-300 rounded-card p-8 text-center">
      <p className="text-xs uppercase tracking-[0.06em] text-n-500 font-medium mb-2">
        Pågående arbeid
      </p>
      <h3 className="text-lg font-semibold text-n-950 mb-2">{title}</h3>
      <p className="text-sm text-n-700 max-w-md mx-auto">{sub}</p>
    </div>
  );
}

function fullName(d: { titles: string[]; name: string }) {
  return d.titles.length > 0 ? `${d.titles.join(" ")} ${d.name}` : d.name;
}

function computeAgeText(bornISO: string): string {
  const born = new Date(bornISO);
  const now = new Date();
  let years = now.getFullYear() - born.getFullYear();
  const m = now.getMonth() - born.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < born.getDate())) years--;
  if (years <= 0) {
    const months = Math.max(
      1,
      (now.getFullYear() - born.getFullYear()) * 12 +
        (now.getMonth() - born.getMonth()),
    );
    return `${months} mnd`;
  }
  return `${years} år`;
}
