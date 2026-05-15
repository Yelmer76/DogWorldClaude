"use client";

import { usePathname, useRouter } from "next/navigation";
import { pageTitle, activeNav, NAV_ITEMS } from "./navConfig";

/**
 * Mobile-only top header. Shows current page title in the center,
 * back-arrow on the left for any sub-route (anything that isn't a
 * top-level nav destination), and a placeholder slot on the right
 * for per-page actions (search / share / etc).
 *
 * On desktop the SideRail provides identity, so this header is
 * hidden — pages provide their own contextual headers.
 */
export function AppHeader({
  rightSlot,
}: {
  /** Per-page right-side action(s), e.g. share button */
  rightSlot?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const active = activeNav(pathname);
  const isTopLevel =
    !!active &&
    NAV_ITEMS.some((i) => i.href === pathname);
  const title = pageTitle(pathname);

  return (
    <header className="md:hidden bg-bg-card border-b border-n-100 sticky top-0 z-20 [box-shadow:0_1px_2px_rgba(26,26,26,0.02)]">
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 min-h-[48px]">
        {!isTopLevel ? (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Tilbake"
            className="w-9 h-9 rounded-md grid place-items-center text-n-700 hover:bg-n-50 -ml-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
        ) : (
          <span className="w-9" aria-hidden />
        )}
        <h1 className="m-0 text-base font-semibold tracking-[-0.005em] text-n-950 truncate text-center flex-1">
          {title}
        </h1>
        <div className="w-9 flex justify-end">{rightSlot}</div>
      </div>
    </header>
  );
}
