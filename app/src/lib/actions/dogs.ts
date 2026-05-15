/**
 * Server Actions for Dog mutations.
 *
 * All mutations are fire-and-forget from the UI's perspective —
 * caller does optimistic update locally, then awaits the action.
 * After write, revalidatePath ensures the next render hydrates fresh.
 */
"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { dogs as dogsTable, type DogRow } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Du må være logget inn");
  return user;
}

/** Coerce undefined → null since SQLite/Drizzle expects null for nullable cols. */
function nullableString(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length === 0 ? null : t;
}

export type DogPatch = Partial<{
  name: string;
  callName: string | null;
  sex: "m" | "f";
  born: string;
  color: string | null;
  microchip: string | null;
  personality: string | null;
  titles: string[];
  status: DogRow["status"];
  publicVisible: boolean;
  sharedToGenealogy: boolean;
  sireId: string | null;
  damId: string | null;
  deceased: string | null;
}>;

/**
 * Patch arbitrary fields on a dog. The whitelist below is the only
 * thing that lands on the row — anything else is ignored.
 */
export async function updateDog(id: string, patch: DogPatch) {
  await requireUser();
  const db = await getDb();

  const cleaned: Partial<DogRow> = {};
  if ("name" in patch && patch.name) cleaned.name = patch.name.trim();
  if ("callName" in patch) cleaned.callName = nullableString(patch.callName);
  if ("sex" in patch && patch.sex) cleaned.sex = patch.sex;
  if ("born" in patch && patch.born) cleaned.born = patch.born;
  if ("color" in patch) cleaned.color = nullableString(patch.color);
  if ("microchip" in patch) cleaned.microchip = nullableString(patch.microchip);
  if ("personality" in patch)
    cleaned.personality = nullableString(patch.personality);
  if ("titles" in patch && Array.isArray(patch.titles))
    cleaned.titles = patch.titles.filter((t) => t.trim().length > 0);
  if ("status" in patch && patch.status) cleaned.status = patch.status;
  if ("publicVisible" in patch && typeof patch.publicVisible === "boolean")
    cleaned.publicVisible = patch.publicVisible;
  if (
    "sharedToGenealogy" in patch &&
    typeof patch.sharedToGenealogy === "boolean"
  )
    cleaned.sharedToGenealogy = patch.sharedToGenealogy;
  if ("sireId" in patch) cleaned.sireId = nullableString(patch.sireId);
  if ("damId" in patch) cleaned.damId = nullableString(patch.damId);
  if ("deceased" in patch) cleaned.deceased = nullableString(patch.deceased);

  if (Object.keys(cleaned).length === 0) return;

  await db.update(dogsTable).set(cleaned).where(eq(dogsTable.id, id)).run();
  revalidatePath(`/dog/${id}`);
  revalidatePath("/hunder");
  revalidatePath("/kennel");
}

/**
 * Soft-delete by setting hidden=true so genealogy still works (but the
 * dog disappears from listings + public displays). Hard delete arrives
 * later when we have an "are you sure" + cascade-warning flow.
 */
export async function hideDog(id: string) {
  await requireUser();
  const db = await getDb();
  await db
    .update(dogsTable)
    .set({ hidden: true, publicVisible: false, sharedToGenealogy: false })
    .where(eq(dogsTable.id, id))
    .run();
  revalidatePath("/hunder");
  revalidatePath("/kennel");
}
