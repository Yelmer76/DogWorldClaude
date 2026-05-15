"use client";

import { useOptimistic, useState, useTransition } from "react";
import type { DogFull } from "@/db/queries";
import type { DogNoteRow, DogRow } from "@/db/schema";
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
import { updateDog, type DogPatch } from "@/lib/actions/dogs";

export function DogDetailClient({
  initial,
  notes,
}: {
  initial: DogFull;
  notes: DogNoteRow[];
}) {
  return (
    <ToastProvider>
      <DogDetailBody initial={initial} notes={notes} />
    </ToastProvider>
  );
}

function DogDetailBody({
  initial,
  notes,
}: {
  initial: DogFull;
  notes: DogNoteRow[];
}) {
  const showToast = useToast();
  // useOptimistic gives instant UI updates while the server action
  // runs; reverts automatically on error.
  const [optimisticDog, applyOptimistic] = useOptimistic<DogFull, DogPatch>(
    initial,
    (current, patch) => {
      // Coerce null → undefined for fields DogFull types as `string | undefined`
      const next = { ...current } as DogFull;
      if ("name" in patch && patch.name !== undefined) next.name = patch.name;
      if ("callName" in patch) next.callName = patch.callName ?? undefined;
      if ("sex" in patch && patch.sex) next.sex = patch.sex;
      if ("born" in patch && patch.born) next.born = patch.born;
      if ("color" in patch) next.color = patch.color ?? undefined;
      if ("microchip" in patch) next.microchip = patch.microchip ?? undefined;
      if ("personality" in patch) next.personality = patch.personality ?? undefined;
      if ("titles" in patch && patch.titles) next.titles = patch.titles;
      if ("status" in patch && patch.status) next.status = patch.status;
      if ("publicVisible" in patch && typeof patch.publicVisible === "boolean")
        next.publicVisible = patch.publicVisible;
      if (
        "sharedToGenealogy" in patch &&
        typeof patch.sharedToGenealogy === "boolean"
      )
        next.sharedToGenealogy = patch.sharedToGenealogy;
      if ("deceased" in patch) next.deceased = patch.deceased ?? undefined;
      return next;
    },
  );
  const [activeTab, setActiveTab] = useState<TabKey>("profil");
  const [statusOpen, setStatusOpen] = useState(false);
  const [, startTransition] = useTransition();

  const dog = optimisticDog;
  const sex = dog.sex;
  const ageText = computeAgeText(dog.born, dog.deceased);
  const isMemorial = dog.status === "memorial";
  const isSparse =
    dog.titles.length === 0 &&
    Object.keys(dog.health).length === 0 &&
    dog.achievements.length === 0;
  const photoCount = isSparse ? 0 : 47;

  /**
   * Centralised mutation: applies optimistic update locally, fires
   * the server action, shows a success toast on completion. The
   * useOptimistic hook auto-reverts if the action throws.
   */
  function commit(patch: DogPatch, successToast?: string) {
    startTransition(async () => {
      applyOptimistic(patch);
      try {
        await updateDog(dog.id, patch);
        if (successToast) showToast(successToast);
      } catch (err) {
        showToast(
          err instanceof Error ? err.message : "Kunne ikke lagre",
          "error",
        );
      }
    });
  }

  function handleStatusSelect(next: DogRow["status"]) {
    setStatusOpen(false);
    commit({ status: next }, `Status: ${statusLabelNb(next)}`);
  }

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <AppHeader />

      <div className="max-w-3xl xl:max-w-[1180px] w-full mx-auto px-0 xl:px-6 xl:py-6 xl:flex xl:gap-6 xl:items-start flex-1">
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
            publicVisible={dog.publicVisible}
            onCallNameSave={(next) =>
              commit(
                { callName: next.trim() ? next.trim() : null },
                "Kallenavn lagret",
              )
            }
            onPublicToggle={() =>
              commit(
                { publicVisible: !dog.publicVisible },
                dog.publicVisible ? "Skjult fra publikum" : "Synlig på kennelens side",
              )
            }
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
                dog={dog as unknown as DogProfilAdapter}
                publicVisible={dog.publicVisible}
                sharedToGenealogy={dog.sharedToGenealogy}
                onUpdate={(patch) => commit(patch as DogPatch, "Lagret")}
                onPublicToggle={() =>
                  commit(
                    { publicVisible: !dog.publicVisible },
                    dog.publicVisible ? "Skjult fra publikum" : "Synlig på kennelens side",
                  )
                }
                onSharedToggle={() =>
                  commit(
                    { sharedToGenealogy: !dog.sharedToGenealogy },
                    dog.sharedToGenealogy
                      ? "Fjernet fra fellesstamtavlen"
                      : "Delt til fellesstamtavlen",
                  )
                }
                onStatusClick={() => setStatusOpen(true)}
              />
            )}
            {activeTab === "helse" && <HelseTab dog={dog as unknown as DogProfilAdapter} />}
            {activeTab === "titler" && <TitlerTab dog={dog as unknown as DogProfilAdapter} />}
            {activeTab === "stamtavle" && <StamtavleTab dog={dog as unknown as DogProfilAdapter} />}
            {activeTab === "bilder" && <BilderTab dog={dog as unknown as DogProfilAdapter} />}
            {activeTab === "notater" && (
              <NotaterTab
                dogId={dog.id}
                dogName={dog.callName ?? dog.name}
                notes={notes}
              />
            )}
          </section>
        </article>

        <PublicPreviewPane
          dog={dog as unknown as DogProfilAdapter}
          publicVisible={dog.publicVisible}
          sharedToGenealogy={dog.sharedToGenealogy}
        />
      </div>

      {!isMemorial && (
        <CameraFab
          subject={dog.callName ?? dog.name}
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

      <StatusSheet
        open={statusOpen}
        current={dog.status}
        onSelect={handleStatusSelect}
        onClose={() => setStatusOpen(false)}
      />
    </div>
  );
}

// The existing ProfilTab/HelseTab/etc were typed against the legacy
// universe.ts Dog type. DogFull is structurally compatible so we cast.
// Once the tabs migrate to consume DogFull directly, the cast goes.
type DogProfilAdapter = import("@/data/universe").Dog;

function fullName(d: { titles: string[]; name: string }) {
  return d.titles.length > 0 ? `${d.titles.join(" ")} ${d.name}` : d.name;
}

function statusLabelNb(s: DogRow["status"]): string {
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
