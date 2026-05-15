"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { dogs, granheim, type Dog, type DogStatus } from "@/data/universe";
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
import {
  DevModeSwitcher,
  type DogViewMode,
} from "@/components/dog-detail/DevModeSwitcher";
import { ToastProvider, useToast } from "@/components/dogworld/ToastProvider";

/**
 * Dog Detail screen — Sprint 3.
 * Hardcoded to Astor av Granheim for v0.1; routing with [id] arrives in
 * Sprint 4 when the database is wired up. The DevModeSwitcher lets the
 * page demo the three state variants (default, sparse, memorial) until
 * routing is in place.
 */
export default function DogDetailPage() {
  return (
    <ToastProvider>
      <DogDetailInner />
    </ToastProvider>
  );
}

// ── Mode-derived dog fixtures ───────────────────────────────────────────────

function buildSparseAstor(base: Dog): Dog {
  return {
    ...base,
    titles: [],
    color: undefined,
    microchip: undefined,
    personality: undefined,
    health: {},
    achievements: [],
  };
}

function buildMemorialAstor(base: Dog): Dog {
  return {
    ...base,
    status: "memorial",
    deceased: "2032-08-08",
  };
}

function DogDetailInner() {
  const [mode, setMode] = useState<DogViewMode>("default");

  // Derive the per-mode dog whenever mode changes; the user's mutable copy
  // resets at the same time so each mode starts from a clean slate.
  const initialDog = useMemo(() => {
    const base = dogs.astor;
    if (mode === "sparse") return buildSparseAstor(base);
    if (mode === "memorial") return buildMemorialAstor(base);
    return base;
  }, [mode]);

  return <DogDetailScreen mode={mode} setMode={setMode} initialDog={initialDog} />;
}

function DogDetailScreen({
  mode,
  setMode,
  initialDog,
}: {
  mode: DogViewMode;
  setMode: (mode: DogViewMode) => void;
  initialDog: Dog;
}) {
  // Re-key on mode so all child useState values reset cleanly when switching.
  return (
    <DogDetailModeBody key={mode} mode={mode} setMode={setMode} initialDog={initialDog} />
  );
}

function DogDetailModeBody({
  mode,
  setMode,
  initialDog,
}: {
  mode: DogViewMode;
  setMode: (mode: DogViewMode) => void;
  initialDog: Dog;
}) {
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
  const isSparse = mode === "sparse";

  function updateDog(patch: Partial<Dog>) {
    setDog((d) => ({ ...d, ...patch }));
  }

  function handleStatusSelect(next: DogStatus) {
    setStatusOpen(false);
    updateDog({ status: next });
    showToast(`Status oppdatert: ${statusLabelNb(next)}`);
  }

  // Photo count: sparse = 0; default = 47; memorial = inherits previous count
  const photoCount = isSparse ? 0 : 47;

  return (
    <div className="min-h-screen flex flex-col bg-bg-page">
      {/* Top utility bar */}
      <div className="bg-bg-card border-b border-n-100">
        <div className="max-w-3xl xl:max-w-[1180px] mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
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

      {/* Dev-mode switcher (removes once Sprint 4 routes per dog) */}
      <DevModeSwitcher mode={mode} onChange={setMode} />

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
      {!isMemorial && <CameraFab />}

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
