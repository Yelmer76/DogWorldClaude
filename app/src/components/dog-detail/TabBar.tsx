"use client";

import { useEffect, useRef, useState } from "react";

export type TabKey =
  | "profil"
  | "stamtavle"
  | "helse"
  | "titler"
  | "bilder"
  | "notater";

const tabs: { key: TabKey; label: string }[] = [
  { key: "profil", label: "Profil" },
  { key: "stamtavle", label: "Stamtavle" },
  { key: "helse", label: "Helse" },
  { key: "titler", label: "Titler" },
  { key: "bilder", label: "Bilder" },
  { key: "notater", label: "Notater" },
];

export type TabBarProps = {
  activeKey: TabKey;
  onChange: (key: TabKey) => void;
};

export function TabBar({ activeKey, onChange }: TabBarProps) {
  // Sticky styling — gain shadow when content scrolls under
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    if (ref.current) ref.current.before(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: [1] },
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        "sticky top-0 z-20 bg-bg-card transition-shadow " +
        (stuck
          ? "shadow-[0_2px_4px_rgba(26,26,26,0.05),0_4px_12px_rgba(26,26,26,0.05)]"
          : "border-b border-n-100")
      }
    >
      <nav
        className="flex gap-1 overflow-x-auto px-4 md:px-6"
        role="tablist"
        aria-label="Hund-detaljer"
      >
        {tabs.map((t) => {
          const active = t.key === activeKey;
          return (
            <button
              type="button"
              key={t.key}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.key}`}
              onClick={() => onChange(t.key)}
              className={
                "py-3 px-2 text-sm font-medium whitespace-nowrap relative transition-colors " +
                (active
                  ? "text-n-950"
                  : "text-n-500 hover:text-n-700")
              }
            >
              {t.label}
              {active && (
                <span
                  className="absolute left-2 right-2 bottom-0 h-0.5 bg-forest-700 rounded-t-[2px]"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
