"use server";

import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { getDb } from "@/db";
import { dogNotes } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Du må være logget inn");
  return user;
}

export async function listDogNotes(dogId: string) {
  await requireUser();
  const db = await getDb();
  return await db
    .select()
    .from(dogNotes)
    .where(eq(dogNotes.dogId, dogId))
    .orderBy(desc(dogNotes.createdAt))
    .all();
}

export async function addDogNote(dogId: string, body: string) {
  await requireUser();
  const trimmed = body.trim();
  if (!trimmed) throw new Error("Notatet kan ikke være tomt");
  const db = await getDb();
  await db
    .insert(dogNotes)
    .values({
      dogId,
      body: trimmed,
      createdAt: new Date().toISOString(),
    })
    .run();
  revalidatePath(`/dog/${dogId}`);
}

export async function deleteDogNote(noteId: number, dogId: string) {
  await requireUser();
  const db = await getDb();
  await db.delete(dogNotes).where(eq(dogNotes.id, noteId)).run();
  revalidatePath(`/dog/${dogId}`);
}
