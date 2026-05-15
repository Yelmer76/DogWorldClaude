/**
 * Single source of truth for the app-shell navigation.
 * Both BottomTabBar (mobile) and SideRail (desktop) read from this.
 *
 * Order matches the design canon: Today (daily driver) → Hunder
 * (registry) → Kull (litters) → Kennel (front-stage preview) → Mer
 * (settings, ethics, karma, designsystem, log out).
 */

export type NavKey = "today" | "hunder" | "kull" | "kennel" | "mer";

export type NavItem = {
  key: NavKey;
  href: string;
  label: string;
  /** Routes that should also light up this tab when active */
  matchPrefixes?: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { key: "today", href: "/today", label: "Today" },
  {
    key: "hunder",
    href: "/hunder",
    label: "Hunder",
    matchPrefixes: ["/dog", "/pedigree"],
  },
  { key: "kull", href: "/litter", label: "Kull" },
  { key: "kennel", href: "/kennel", label: "Kennel" },
  { key: "mer", href: "/mer", label: "Mer" },
];

/** Pick the active nav key for a given pathname. */
export function activeNav(pathname: string): NavKey | null {
  for (const item of NAV_ITEMS) {
    if (pathname === item.href) return item.key;
    if (
      item.matchPrefixes?.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`),
      )
    )
      return item.key;
    if (pathname.startsWith(`${item.href}/`)) return item.key;
  }
  return null;
}

/** Display title for the mobile top header */
export function pageTitle(pathname: string): string {
  if (pathname === "/today") return "Today";
  if (pathname === "/hunder") return "Hunder";
  if (pathname.startsWith("/dog")) return "Hund";
  if (pathname.startsWith("/pedigree")) return "Stamtavle";
  if (pathname === "/litter") return "Kull C";
  if (pathname === "/kennel") return "Offentlig kennel";
  if (pathname === "/mer") return "Mer";
  if (pathname.startsWith("/mer/")) return "Mer";
  return "DogWorld(tmp)";
}
