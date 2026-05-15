import { redirect } from "next/navigation";

/**
 * Root entry point — sends users straight into the app at /today.
 * The Sprint-history demo gallery lives at /start (linked from Mer).
 */
export default function Root() {
  redirect("/today");
}
