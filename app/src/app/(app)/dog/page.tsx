import { redirect } from "next/navigation";

/**
 * /dog (no id) → land on Astor as the canonical demo dog.
 * Once auth + saved-state lands, this should redirect to the user's
 * own most-recently-viewed dog instead.
 */
export default function DogIndex() {
  redirect("/dog/astor");
}
