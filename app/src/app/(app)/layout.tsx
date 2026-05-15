import { SideRail } from "@/components/shell/SideRail";
import { BottomTabBar } from "@/components/shell/BottomTabBar";

/**
 * App-shell layout for the routes that live inside the logged-in
 * product surface (Today, Hunder, Dog, Litter, Kennel, Pedigree, Mer).
 *
 * - Mobile: BottomTabBar fixed to bottom, content scrolls under
 *   (extra bottom padding so content isn't hidden by the bar)
 * - Desktop (md+): SideRail sticky on the left, content fills the rest
 *
 * Out-of-shell routes (/, /onboarding, /styleguide) live at the root
 * `app/` level and bypass this layout.
 */
export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <SideRail />
      <div className="flex-1 min-w-0 flex flex-col pb-16 md:pb-0">
        {children}
      </div>
      <BottomTabBar />
    </div>
  );
}
