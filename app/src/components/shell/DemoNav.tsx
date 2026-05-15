"use client";

/**
 * DemoNav — small floating "jump between screens" widget that appears
 * on every route. Lets you hop around the Sprint 3-9 preview without
 * going back to the landing page first.
 *
 * Bottom-left so it doesn't collide with the camera FAB (bottom-right).
 * Hidden on the landing route since the landing IS the index.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const screens: { href: string; label: string; emoji: string }[] = [
  { href: "/", label: "Forside · alle skjermer", emoji: "◳" },
  { href: "/today", label: "Today Dashboard", emoji: "◧" },
  { href: "/dog", label: "Hund-detalj (Astor)", emoji: "◐" },
  { href: "/pedigree", label: "Stamtavle-utforsker", emoji: "⛬" },
  { href: "/litter", label: "Kull C", emoji: "◔" },
  { href: "/kennel", label: "Offentlig kennelside", emoji: "◫" },
  { href: "/onboarding", label: "Onboarding", emoji: "◑" },
  { href: "/styleguide", label: "Designsystem", emoji: "◊" },
];

export function DemoNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on Escape, route change
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hide on landing page
  if (pathname === "/") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Bytt skjerm"
        aria-expanded={open}
        className="fixed bottom-5 left-5 z-30 w-10 h-10 rounded-full bg-n-950 text-white grid place-items-center shadow-[0_4px_12px_rgba(26,26,26,0.20)] hover:bg-forest-900 transition-colors focus-visible:outline-2 focus-visible:outline-forest-500 focus-visible:outline-offset-2"
      >
        <span aria-hidden className="font-mono text-sm">
          ◇
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Lukk"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-transparent"
          />
          <div
            role="menu"
            aria-label="Demo-skjermer"
            className="fixed bottom-16 left-5 z-40 w-[280px] bg-bg-card border border-n-200 rounded-card shadow-[0_8px_32px_rgba(26,26,26,0.12),0_2px_6px_rgba(26,26,26,0.05)] overflow-hidden animate-[dw-toast-in_140ms_ease-out]"
          >
            <div className="px-3 py-2 border-b border-n-100 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.08em] font-mono text-n-500">
                Demo-nav
              </span>
              <span className="text-[10px] font-mono text-n-300">
                {pathname}
              </span>
            </div>
            <ul className="m-0 p-1 list-none max-h-[60vh] overflow-y-auto">
              {screens.map((s) => {
                const active = s.href === pathname;
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      role="menuitem"
                      className={
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors " +
                        (active
                          ? "bg-forest-50 text-forest-700 font-medium"
                          : "text-n-950 hover:bg-n-50")
                      }
                    >
                      <span
                        aria-hidden
                        className={
                          "font-mono text-base " +
                          (active ? "text-forest-700" : "text-n-300")
                        }
                      >
                        {s.emoji}
                      </span>
                      <span className="flex-1 truncate">{s.label}</span>
                      <span className="text-[10px] font-mono text-n-500">
                        {s.href}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
