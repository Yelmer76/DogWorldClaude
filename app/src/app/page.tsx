import { redirect } from "next/navigation";

/**
 * Root entry point — sends users straight into the app at /today.
 * Edge middleware will bounce to /login if there's no session.
 */
export default function Root() {
  redirect("/today");
}
