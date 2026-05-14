/**
 * Navigation atoms: mobile top bar, mobile bottom tab bar, desktop side nav.
 * Per design handoff:
 *   - Bottom tabs are the spine — 5 fixed destinations
 *   - Active state uses sage green (forest-700), never navy
 *   - Navy is for actions, not navigation
 *   - 44px minimum hit target
 *   - Notifications dot — navy, only on Inbox / bell
 */
import type { ReactNode } from "react";
import { CountBadge } from "./Tag";

// ── Mobile top bar ──────────────────────────────────────────────────────────
export type MobileTopBarProps = {
  /** Left slot — typically a back button or menu button */
  left?: ReactNode;
  title: string;
  /** Right slot — single contextual action only */
  right?: ReactNode;
};

export function MobileTopBar({ left, title, right }: MobileTopBarProps) {
  return (
    <div className="bg-bg-card px-4 pt-3.5 pb-3 flex items-center justify-between border-b border-n-100">
      <div className="flex gap-2 items-center min-w-[44px] justify-start">{left}</div>
      <div className="text-lg font-semibold tracking-[-0.01em]">{title}</div>
      <div className="flex gap-2 items-center min-w-[44px] justify-end">{right}</div>
    </div>
  );
}

// ── Mobile tab bar ──────────────────────────────────────────────────────────
export type MobileTab = {
  key: string;
  label: string;
  icon: ReactNode;
  /** Optional notification dot indicator */
  notif?: boolean;
};

export type MobileTabBarProps = {
  tabs: MobileTab[];
  activeKey: string;
  onTabChange?: (key: string) => void;
};

export function MobileTabBar({
  tabs,
  activeKey,
  onTabChange,
}: MobileTabBarProps) {
  return (
    <nav
      className="bg-bg-card border-t border-n-100 grid pt-1.5 pb-2.5"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
    >
      {tabs.map((t) => {
        const active = t.key === activeKey;
        return (
          <button
            type="button"
            key={t.key}
            onClick={() => onTabChange?.(t.key)}
            className={
              "flex flex-col items-center gap-0.5 text-[10px] font-medium px-1 py-1.5 transition-colors " +
              (active ? "text-forest-700" : "text-n-500")
            }
            aria-current={active ? "page" : undefined}
          >
            <span className="w-[22px] h-[22px] grid place-items-center relative">
              {t.icon}
              {t.notif && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-ochre-600" />
              )}
            </span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

// ── Desktop side nav ────────────────────────────────────────────────────────
export type SideNavItem = {
  key: string;
  label: string;
  icon: ReactNode;
  count?: number | string;
  countMuted?: boolean;
};

export type SideNavGroup = {
  group: string;
  items: SideNavItem[];
};

export type DesktopSideNavProps = {
  brand?: ReactNode;
  /** Subtitle / kennel name shown next to brand */
  brandTag?: string;
  groups: SideNavGroup[];
  activeKey: string;
  onItemClick?: (key: string) => void;
  /** Footer slot — typically the user profile row */
  footer?: ReactNode;
};

export function DesktopSideNav({
  brand,
  brandTag,
  groups,
  activeKey,
  onItemClick,
  footer,
}: DesktopSideNavProps) {
  return (
    <aside className="bg-bg-card border-r border-n-100 p-4 flex flex-col gap-0.5 min-h-[360px]">
      {brand !== undefined && (
        <div className="flex items-center gap-2 px-2 py-1.5 mb-4 font-semibold">
          <div className="w-6 h-6 rounded-md bg-forest-700 text-white grid place-items-center text-xs font-bold">
            D
          </div>
          <div>{brand}</div>
          {brandTag && (
            <div className="ml-auto">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-tag text-[11px] bg-n-50 text-n-700 border border-n-200">
                {brandTag}
              </span>
            </div>
          )}
        </div>
      )}

      <nav className="flex flex-col flex-1 gap-0.5">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="text-[11px] text-n-500 font-medium uppercase tracking-[0.06em] px-2 pt-3 pb-1">
              {g.group}
            </p>
            {g.items.map((item) => {
              const active = item.key === activeKey;
              return (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => onItemClick?.(item.key)}
                  className={
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-btn text-sm transition-colors " +
                    (active
                      ? "bg-forest-50 text-forest-700 font-medium"
                      : "text-n-700 hover:bg-n-50 hover:text-n-950")
                  }
                  aria-current={active ? "page" : undefined}
                >
                  <span className="w-4 h-4 flex-shrink-0">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && (
                    <CountBadge value={item.count} muted={item.countMuted} />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {footer && (
        <div className="mt-auto pt-4 border-t border-n-100">{footer}</div>
      )}
    </aside>
  );
}
