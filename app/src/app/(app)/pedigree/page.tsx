"use client";

import { useEffect } from "react";
import { dogs } from "@/data/universe";
import { ToastProvider, useToast } from "@/components/dogworld/ToastProvider";
import { AppHeader } from "@/components/shell/AppHeader";
import { usePedigreeNav } from "@/components/pedigree/usePedigreeNav";
import { Breadcrumb } from "@/components/pedigree/Breadcrumb";
import { PedigreeNodeCard } from "@/components/pedigree/PedigreeNodeCard";
import { FocalCard } from "@/components/pedigree/FocalCard";
import { DogCarousel } from "@/components/pedigree/DogCarousel";
import {
  PedigreeLeftRail,
  PedigreeRightRail,
} from "@/components/pedigree/PedigreeRails";

/**
 * Pedigree Explorer — Sprint 4.
 *
 * Focal navigation. One dog centered, parents above, grandparents one row
 * higher; offspring + siblings reachable below. Tap any card to re-center.
 * Up = back in time, down = forward, sideways = same litter.
 *
 * Hardcoded entrypoint = Astor; real per-dog routing arrives later.
 */
export default function PedigreePage() {
  return (
    <ToastProvider>
      <PedigreeInner />
    </ToastProvider>
  );
}

function PedigreeInner() {
  const showToast = useToast();
  const nav = usePedigreeNav("astor");
  const focal = dogs[nav.focalId];

  const sire = focal?.sireId ? dogs[focal.sireId] : null;
  const dam = focal?.damId ? dogs[focal.damId] : null;
  const paternalSire = sire?.sireId ? dogs[sire.sireId] : null;
  const paternalDam = sire?.damId ? dogs[sire.damId] : null;
  const maternalSire = dam?.sireId ? dogs[dam.sireId] : null;
  const maternalDam = dam?.damId ? dogs[dam.damId] : null;

  // Keyboard navigation (desktop + accessibility)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (sire) nav.goTo(sire.id, "up");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (dam) nav.goTo(dam.id, "up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const first = focal?.offspringIds[0];
        if (first) nav.goTo(first, "down");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const first = focal?.siblingIds[0];
        if (first) nav.goTo(first, "lateral");
      } else if (e.key === "Escape") {
        nav.goBack();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav, focal, sire, dam]);

  if (!focal) {
    return (
      <div className="min-h-screen grid place-items-center text-n-500">
        Fant ingen hund med id {nav.focalId}.
      </div>
    );
  }

  function handleNodeTap(id: string, dir: "up" | "down" | "lateral") {
    if (id === "__unknown__") {
      showToast("→ Legg til ukjent ane (kommer senere)", "info");
      return;
    }
    const target = dogs[id];
    if (target?.hidden) {
      showToast("Denne hunden er skjult etter eierens valg", "warning");
      return;
    }
    nav.goTo(id, dir);
  }

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <AppHeader
        rightSlot={
          <button
            type="button"
            onClick={() => showToast("→ Del stamtavlen (kommer senere)", "info")}
            aria-label="Del stamtavlen"
            className="w-9 h-9 rounded-md grid place-items-center text-n-700 hover:bg-n-50 -mr-1.5"
          >
            <ShareIcon />
          </button>
        }
      />

      {/* Desktop title row */}
      <div className="hidden md:block bg-bg-card border-b border-n-100">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="m-0 text-base font-semibold text-n-950">
            Stamtavle-utforsker
          </h1>
          <button
            type="button"
            onClick={() => showToast("→ Del stamtavlen (kommer senere)", "info")}
            className="text-sm text-forest-700 hover:text-forest-900 inline-flex items-center gap-1.5"
          >
            <ShareIcon />
            Del
          </button>
        </div>
      </div>

      {/* Breadcrumb row */}
      <div className="bg-bg-page border-b border-n-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-2">
          <Breadcrumb history={nav.history} onJump={nav.goToBreadcrumb} />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto w-full flex-1 px-4 md:px-6 py-6 flex gap-6 items-start">
        <PedigreeLeftRail
          history={nav.history}
          onJump={nav.goToBreadcrumb}
          onReset={nav.reset}
        />

        {/* Center: tree */}
        <main
          key={nav.focalId + nav.direction}
          className="flex-1 min-w-0 flex flex-col gap-6 animate-[dw-toast-in_220ms_ease-out]"
        >
          <GenerationLabel>Gen 2 · Besteforeldre</GenerationLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <PedigreeNodeCard
              dog={paternalSire}
              size="md"
              onTap={(id) => handleNodeTap(id, "up")}
            />
            <PedigreeNodeCard
              dog={paternalDam}
              size="md"
              onTap={(id) => handleNodeTap(id, "up")}
            />
            <PedigreeNodeCard
              dog={maternalSire}
              size="md"
              onTap={(id) => handleNodeTap(id, "up")}
            />
            <PedigreeNodeCard
              dog={maternalDam}
              size="md"
              onTap={(id) => handleNodeTap(id, "up")}
            />
          </div>

          <GenConnector />

          <GenerationLabel>Gen 1 · Foreldre</GenerationLabel>
          <div className="grid grid-cols-2 gap-3">
            <PedigreeNodeCard
              dog={sire}
              size="lg"
              onTap={(id) => handleNodeTap(id, "up")}
            />
            <PedigreeNodeCard
              dog={dam}
              size="lg"
              onTap={(id) => handleNodeTap(id, "up")}
            />
          </div>

          <GenConnector />

          <GenerationLabel highlight>Focal</GenerationLabel>
          <FocalCard dog={focal} />

          {/* Below focal */}
          <div className="grid md:grid-cols-2 gap-6 mt-2">
            <DogCarousel
              ids={focal.offspringIds}
              label="Avkom"
              countLabel={
                focal.offspringIds.length === 0
                  ? "0"
                  : `${focal.offspringIds.length} reg.`
              }
              emptyText="Ingen registrerte avkom."
              onTap={(id) => handleNodeTap(id, "down")}
            />
            <DogCarousel
              ids={focal.siblingIds}
              label="Samme kull — søsken"
              emptyText="Ingen kullsøsken registrert."
              onTap={(id) => handleNodeTap(id, "lateral")}
            />
          </div>
        </main>

        <PedigreeRightRail dog={focal} />
      </div>
    </div>
  );
}

function GenerationLabel({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "text-[10px] uppercase tracking-[0.08em] font-mono px-1 " +
        (highlight ? "text-forest-700 font-semibold" : "text-n-500")
      }
    >
      {children}
    </div>
  );
}

function GenConnector() {
  return (
    <div className="flex justify-center -my-3" aria-hidden>
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-n-300"
      >
        <line x1="12" y1="4" x2="12" y2="20" />
        <polyline points="7 15 12 20 17 15" />
      </svg>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="8.2" y1="10.8" x2="15.8" y2="7.2" />
      <line x1="8.2" y1="13.2" x2="15.8" y2="16.8" />
    </svg>
  );
}
