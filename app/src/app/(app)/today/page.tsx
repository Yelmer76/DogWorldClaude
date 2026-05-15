"use client";

import { ToastProvider } from "@/components/dogworld/ToastProvider";
import { CameraFab } from "@/components/dog-detail/CameraFab";
import { AppHeader } from "@/components/shell/AppHeader";
import { TodayHeader } from "@/components/today/TodayHeader";
import { TodaySidebar } from "@/components/today/TodaySidebar";
import { FeedCard } from "@/components/today/FeedCard";
import { todayFeed } from "@/components/today/todayData";

/**
 * Today Dashboard — Sprint 5.
 *
 * Daily-driver feed. What greets the breeder when they open DogWorld(tmp):
 * morning greeting + weather + karma, then a ranked feed of urgent /
 * scheduled / informational cards, with a sidebar for at-a-glance stats
 * and recent activity. Camera FAB always present for capture-first UX.
 */
export default function TodayPage() {
  return (
    <ToastProvider>
      <div className="flex-1 flex flex-col bg-bg-page">
        <AppHeader />
        <TodayHeader />

        <main className="flex-1">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="flex flex-col gap-3 min-w-0">
              <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 px-1 mb-1">
                I dag · prioritert feed
              </h2>
              {todayFeed.map((card) => (
                <FeedCard key={card.id} card={card} />
              ))}
            </section>

            <TodaySidebar />
          </div>
        </main>

        <CameraFab
          actions={[
            { id: "photo", label: "Ta bilde av en hund", icon: "camera" },
            { id: "pedigree", label: "Skann papirstamtavle", icon: "scan" },
            { id: "cert", label: "Skann helse-sertifikat", icon: "doc" },
            { id: "weight", label: "Logg vekt", icon: "scale" },
            { id: "note", label: "Skriv notat", icon: "edit" },
          ]}
        />
      </div>
    </ToastProvider>
  );
}
