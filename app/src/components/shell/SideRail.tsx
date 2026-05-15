"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, activeNav } from "./navConfig";
import { NavIcon } from "./NavIcon";

/**
 * Desktop side rail — fixed to left on md+.
 * Hidden on mobile where the BottomTabBar takes over.
 *
 * Width = 80px (icon-only). Tooltips on hover give labels.
 * Brand mark at top, primary nav, then logged-in user chip at the
 * bottom (initial + tooltip with full name).
 */
export type SideRailProps = {
  userInitial?: string;
  userName?: string;
};

export function SideRail({ userInitial = "?", userName }: SideRailProps) {
  const pathname = usePathname();
  const active = activeNav(pathname);

  return (
    <nav
      aria-label="Hovedmeny"
      className="hidden md:flex flex-col items-center w-[80px] flex-shrink-0 bg-bg-card border-r border-n-100 py-4 sticky top-0 h-screen"
    >
      <Link
        href="/today"
        aria-label="DogWorld(tmp) — Today"
        className="w-10 h-10 rounded-md bg-forest-700 text-white grid place-items-center font-mono font-semibold text-base mb-6 hover:bg-forest-900 transition-colors"
      >
        D
      </Link>

      <ul className="m-0 p-0 list-none flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={
                  "relative flex flex-col items-center gap-0.5 px-2 py-2 rounded-md transition-colors " +
                  (isActive
                    ? "text-forest-700 bg-forest-50"
                    : "text-n-500 hover:text-n-950 hover:bg-n-50")
                }
              >
                <NavIcon name={item.key} filled={isActive} />
                <span
                  className={
                    "text-[10px] tracking-tight " +
                    (isActive ? "font-medium" : "")
                  }
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-forest-700"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/mer"
        aria-label="Profil"
        className="w-10 h-10 rounded-full bg-n-100 text-n-700 grid place-items-center font-medium text-sm hover:bg-n-200 transition-colors"
        title={userName ?? "Profil"}
      >
        {userInitial}
      </Link>
    </nav>
  );
}
