import Link from "next/link";
import { notFound } from "next/navigation";
import { getDogFull, listDogNotesByDog } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { DogDetailClient } from "./DogDetailClient";

/**
 * Dog Detail page — Sprint 16.
 *
 * Server component: loads the dog + notes from D1/SQLite, falls back
 * to the friendly "ikke funnet" UI if the id doesn't match. All
 * interactivity (inline-edit, status sheet, public toggles, note
 * composer) lives in DogDetailClient and goes through Server Actions.
 */
export default async function DogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dog = await getDogFull(id);
  if (!dog) {
    return <NotFoundDog id={id} />;
  }
  const notes = await listDogNotesByDog(id);
  return <DogDetailClient initial={dog} notes={notes} />;
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

// Force dynamic rendering — auth + db reads
export const dynamic = "force-dynamic";
