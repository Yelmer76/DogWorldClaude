"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, activeNav } from "./navConfig";
import { NavIcon } from "./NavIcon";

/**
 * Mobile bottom tab bar — fixed to bottom on screens < md.
 * Hidden on md+ where the SideRail takes over.
 *
 * Safe-area inset bottom is respected for iOS notches.
 */
export function BottomTabBar() {
  const pathname = usePathname();
  const active = activeNav(pathname);

  return (
    <nav
      aria-label="Hovedmeny"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-bg-card border-t border-n-100 [box-shadow:0_-1px_2px_rgba(26,26,26,0.04)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="m-0 p-0 list-none grid grid-cols-5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "flex flex-col items-center gap-0.5 py-2 px-1 transition-colors " +
                  (isActive
                    ? "text-forest-700"
                    : "text-n-500 hover:text-n-700")
                }
              >
                <NavIcon name={item.key} filled={isActive} />
                <span
                  className={
                    "text-[11px] " +
                    (isActive ? "font-medium" : "")
                  }
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
