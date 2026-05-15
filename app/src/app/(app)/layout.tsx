import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SideRail } from "@/components/shell/SideRail";
import { BottomTabBar } from "@/components/shell/BottomTabBar";

/**
 * App-shell layout for the routes that live inside the logged-in
 * product surface (Today, Hunder, Dog, Litter, Kennel, Pedigree, Mer).
 *
 * - Server-side fetch of the current user — passes name/initial to
 *   the SideRail's user chip
 * - Edge middleware already redirects when the session cookie is
 *   missing; this is the second-line check for invalid/expired
 *   sessions (cookie present but session row deleted/expired)
 * - Mobile: BottomTabBar fixed to bottom; Desktop: SideRail sticky-left
 *
 * Out-of-shell routes (/, /login, /onboarding, /styleguide, /start)
 * live at the root `app/` level and bypass this layout.
 */
export default async function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const initial = (user.name?.match(/\b\w/g) ?? [user.email[0]])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen w-full">
      <SideRail userInitial={initial} userName={user.name} />
      <div className="flex-1 min-w-0 flex flex-col pb-16 md:pb-0">
        {children}
      </div>
      <BottomTabBar />
    </div>
  );
}
