"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { dogs, type Dog, type DogStatus } from "@/data/universe";
import { AppHeader } from "@/components/shell/AppHeader";
import { DogHero } from "@/components/dog-detail/DogHero";
import { DogNameBlock } from "@/components/dog-detail/DogNameBlock";
import { TabBar, type TabKey } from "@/components/dog-detail/TabBar";
import { ProfilTab } from "@/components/dog-detail/ProfilTab";
import { HelseTab } from "@/components/dog-detail/HelseTab";
import { TitlerTab } from "@/components/dog-detail/TitlerTab";
import { StamtavleTab } from "@/components/dog-detail/StamtavleTab";
import { BilderTab } from "@/components/dog-detail/BilderTab";
import { NotaterTab } from "@/components/dog-detail/NotaterTab";
import { CameraFab } from "@/components/dog-detail/CameraFab";
import { StatusSheet } from "@/components/dog-detail/StatusSheet";
import { SparseBanner } from "@/components/dog-detail/SparseBanner";
import { PublicPreviewPane } from "@/components/dog-detail/PublicPreviewPane";
import { ToastProvider, useToast } from "@/components/dogworld/ToastProvider";

/**
 * Dog Detail screen — Sprint 11.
 *
 * Per-dog routing: /dog/[id]. The id matches a key in the dogs object
 * in universe.ts. The DevModeSwitcher from Sprint 3E is gone — sparse
 * and memorial states are now reachable by navigating to dogs that
 * naturally have them (e.g. /dog/birk-sib for a sparse minimal record,
 * /dog/charmant or /dog/vidar for memorial).
 *
 * "Sparse" is detected as: no titles AND no health AND no achievements.
 */
export default function DogDetailPage() {
  return (
    <ToastProvider>
      <DogDetailInner />
    </ToastProvider>
  );
}

function DogDetailInner() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const baseDog = dogs[id];

  // Re-key on id so all child useState resets cleanly when the URL changes
  return baseDog ? (
    <DogDetailBody key={id} initialDog={baseDog} />
  ) : (
    <NotFoundDog id={id} />
  );
}

function NotFoundDog({ id }: { id: string }) {
  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <AppHeader />
      <div className="flex-1 grid place-items-center px-4">
        <div className="max-w-md text-center py-12">
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-warning-fg mb-3">
            Hund ikke funnet
          </div>
          <h1 className="m-0 text-2xl font-semibold text-n-950 mb-3">
            Vi finner ingen hund med id «{id}».
          </h1>
          <p className="m-0 text-sm text-n-700 mb-6">
            Sjekk at lenken er riktig, eller gå tilbake til hund-registeret.
          </p>
          <Link
            href="/hunder"
            className="inline-flex items-center gap-1.5 bg-forest-700 text-white px-4 py-2.5 rounded-btn text-sm font-medium hover:bg-forest-900 transition-colors"
          >
            ← Til Hunder
          </Link>
        </div>
      </div>
    </div>
  );
}

function DogDetailBody({ initialDog }: { initialDog: Dog }) {
  const showToast = useToast();

  const [dog, setDog] = useState<Dog>(initialDog);
  const [activeTab, setActiveTab] = useState<TabKey>("profil");
  const [publicVisible, setPublicVisible] = useState(
    initialDog.publicVisible ?? true,
  );
  const [sharedToGenealogy, setSharedToGenealogy] = useState(
    initialDog.sharedToGenealogy ?? true,
  );
  const [statusOpen, setStatusOpen] = useState(false);

  const sex = dog.sex;
  const ageText = computeAgeText(dog.born, dog.deceased);
  const isMemorial = dog.status === "memorial";
  const isSparse =
    dog.titles.length === 0 &&
    Object.keys(dog.health).length === 0 &&
    dog.achievements.length === 0;

  function updateDog(patch: Partial<Dog>) {
    setDog((d) => ({ ...d, ...patch }));
  }

  function handleStatusSelect(next: DogStatus) {
    setStatusOpen(false);
    updateDog({ status: next });
    showToast(`Status oppdatert: ${statusLabelNb(next)}`);
  }

  // Photo count: sparse = 0; otherwise demo placeholder count
  const photoCount = isSparse ? 0 : 47;

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <AppHeader />

      {/* Desktop layout: detail + right pane */}
      <div className="max-w-3xl xl:max-w-[1180px] w-full mx-auto px-0 xl:px-6 xl:py-6 xl:flex xl:gap-6 xl:items-start flex-1">
        {/* Main detail surface */}
        <article className="w-full bg-bg-card md:rounded-card md:border md:border-n-200 md:my-6 xl:my-0 overflow-hidden md:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] flex-1 min-w-0">
          <DogHero
            status={dog.status}
            tone={dog.sex === "m" ? "sire" : "dam"}
            photoCount={photoCount}
            deceasedDate={dog.deceased}
            onPhotoClick={() => {
              if (isSparse) showToast("Last opp første bilde", "info");
              else showToast("→ Galleri (kommer senere)", "info");
            }}
            onStatusClick={() => setStatusOpen(true)}
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
              updateDog({ callName: next.trim() ? next.trim() : undefined })
            }
            onPublicToggle={() => setPublicVisible((v) => !v)}
          />

          <TabBar activeKey={activeTab} onChange={setActiveTab} />

          <section
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="px-4 md:px-6 py-6 min-h-[240px] flex flex-col gap-6"
          >
            {isSparse && <SparseBanner />}

            {activeTab === "profil" && (
              <ProfilTab
                dog={dog}
                publicVisible={publicVisible}
                sharedToGenealogy={sharedToGenealogy}
                onUpdate={updateDog}
                onPublicToggle={() => setPublicVisible((v) => !v)}
                onSharedToggle={() => setSharedToGenealogy((v) => !v)}
                onStatusClick={() => setStatusOpen(true)}
              />
            )}
            {activeTab === "helse" && <HelseTab dog={dog} />}
            {activeTab === "titler" && <TitlerTab dog={dog} />}
            {activeTab === "stamtavle" && <StamtavleTab dog={dog} />}
            {activeTab === "bilder" && <BilderTab dog={dog} />}
            {activeTab === "notater" && <NotaterTab dog={dog} />}
          </section>
        </article>

        {/* Desktop right pane */}
        <PublicPreviewPane
          dog={dog}
          publicVisible={publicVisible}
          sharedToGenealogy={sharedToGenealogy}
        />
      </div>

      {/* Camera FAB — hidden in memorial mode (read-only) */}
      {!isMemorial && (
        <CameraFab
          actions={[
            {
              id: "photo",
              label: `Ta bilde av ${dog.callName ?? dog.name}`,
              icon: "camera",
            },
            { id: "cert", label: "Skann helse-sertifikat", icon: "doc" },
            { id: "crit", label: "Skann utstillingskritikk", icon: "scan" },
            { id: "weight", label: "Logg vekt", icon: "scale" },
            { id: "note", label: "Skriv notat", icon: "edit" },
          ]}
        />
      )}

      {/* Status sheet */}
      <StatusSheet
        open={statusOpen}
        current={dog.status}
        onSelect={handleStatusSelect}
        onClose={() => setStatusOpen(false)}
      />
    </div>
  );
}

function fullName(d: { titles: string[]; name: string }) {
  return d.titles.length > 0 ? `${d.titles.join(" ")} ${d.name}` : d.name;
}

function statusLabelNb(s: DogStatus): string {
  switch (s) {
    case "active":
      return "Aktiv";
    case "retired":
      return "Pensjonert";
    case "sold":
      return "Solgt";
    case "memorial":
      return "Over regnbuebroen";
  }
}

function computeAgeText(bornISO: string, deceasedISO?: string): string {
  if (deceasedISO) {
    return `${bornISO.slice(0, 4)}–${deceasedISO.slice(0, 4)}`;
  }
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
