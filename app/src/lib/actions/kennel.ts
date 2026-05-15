"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { kennels } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user || !user.kennelId) {
    throw new Error("Du må være logget inn med en kennel");
  }
  return user;
}

/**
 * Marks the ethics declaration as confirmed for the user's kennel.
 * Sets ethics_verified=true and ethics_confirmed_at=now. Per the
 * trust_identity_quality_decisions memory, this is a 2-month renewal
 * cycle that grants +50 karma.
 */
export async function confirmEthics() {
  const user = await requireUser();
  const db = await getDb();
  await db
    .update(kennels)
    .set({
      ethicsVerified: true,
      ethicsConfirmedAt: new Date().toISOString(),
    })
    .where(eq(kennels.id, user.kennelId!))
    .run();
  revalidatePath("/mer");
  revalidatePath("/mer/etikk");
  revalidatePath("/kennel");
}
