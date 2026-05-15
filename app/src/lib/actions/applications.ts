"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import {
  applications as appsTable,
  type ApplicationRow,
} from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Du må være logget inn");
  return user;
}

const labelFor: Record<ApplicationRow["status"], string> = {
  NY: "NY",
  I_SAMTALE: "I SAMTALE",
  GODKJENT: "GODKJENT",
  TILBUDT_VALP: "TILBUDT VALP",
  AVVIST: "AVVIST",
};

export async function setApplicationStatus(
  id: string,
  status: ApplicationRow["status"],
  litterId?: string,
) {
  await requireUser();
  const db = await getDb();
  await db
    .update(appsTable)
    .set({ status, statusLabel: labelFor[status] })
    .where(eq(appsTable.id, id))
    .run();
  if (litterId) revalidatePath(`/kull/${litterId}`);
}

export async function offerPuppy(
  applicationId: string,
  puppyId: string,
  litterId?: string,
) {
  await requireUser();
  const db = await getDb();
  await db
    .update(appsTable)
    .set({
      status: "TILBUDT_VALP",
      statusLabel: "TILBUDT VALP",
      assignedPuppyId: puppyId,
    })
    .where(eq(appsTable.id, applicationId))
    .run();
  if (litterId) revalidatePath(`/kull/${litterId}`);
}
