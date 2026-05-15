import { listDogs } from "@/db/queries";
import { AppHeader } from "@/components/shell/AppHeader";
import { HunderClient } from "./HunderClient";

/**
 * Hunder list — Sprint 13 server component. Loads every dog from the
 * SQLite db, filters out hidden ones, and hands them to a client child
 * for the interactive search + status filter.
 */
export default function HunderPage() {
  const all = listDogs();
  const visible = all
    .filter((d) => !d.hidden)
    .sort((a, b) => a.name.localeCompare(b.name, "nb"));

  return (
    <>
      <AppHeader />
      <HunderClient initial={visible} />
    </>
  );
}
