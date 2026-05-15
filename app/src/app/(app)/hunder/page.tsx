import Link from "next/link";
import { listDogs } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { HunderClient } from "./HunderClient";

/**
 * Hunder list — Sprint 13 server component. Loads every dog from the
 * SQLite db, filters out hidden ones, and hands them to a client child
 * for the interactive search + status filter.
 */
export default async function HunderPage() {
  const all = await listDogs();
  const visible = all
    .filter((d) => !d.hidden)
    .sort((a, b) => a.name.localeCompare(b.name, "nb"));

  return (
    <>
      <AppHeader
        rightSlot={
          <Link
            href="/hunder/nytt"
            aria-label="Legg til ny hund"
            className="w-9 h-9 rounded-md grid place-items-center text-forest-700 hover:bg-forest-50 -mr-1.5 text-2xl leading-none"
          >
            +
          </Link>
        }
      />
      <HunderClient initial={visible} />
    </>
  );
}
