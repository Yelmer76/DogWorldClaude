"use client";

import Link from "next/link";
import { Sparkline } from "@/components/dogworld/Sparkline";
import { todayStats, todayNotifications } from "./todayData";

export function TodaySidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <section>
        <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3 px-1">
          Oversikt — siste 7 dager
        </h2>
        <ul className="m-0 p-0 list-none flex flex-col gap-2">
          {todayStats.map((s) => (
            <li
              key={s.id}
              className="bg-bg-card border border-n-200 rounded-card p-3 flex items-center gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.06em] font-medium text-n-500">
                  {s.label}
                </div>
                <div className="text-2xl font-semibold tracking-[-0.02em] text-n-950 mt-0.5">
                  {s.value}
                </div>
              </div>
              <Sparkline
                data={s.spark}
                width={88}
                height={28}
                showLastPoint={false}
                className="flex-shrink-0"
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3 px-1">
          <h2 className="text-xs uppercase tracking-[0.06em] font-medium text-n-500 m-0">
            Aktivitet
          </h2>
          <span className="text-[10px] text-n-500 font-mono">
            {todayNotifications.length}
          </span>
        </div>
        <ul className="m-0 p-0 list-none flex flex-col gap-2">
          {todayNotifications.map((n) => (
            <li
              key={n.id}
              className="bg-bg-card border border-n-200 rounded-card p-3"
            >
              <div className="text-[10px] font-mono text-n-500 mb-1">
                {n.t}
              </div>
              <div className="text-sm font-medium text-n-950">{n.title}</div>
              <div className="text-xs text-n-700 mt-0.5">{n.sub}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-forest-50 border border-forest-100 rounded-card p-4">
        <div className="text-[10px] uppercase tracking-[0.08em] font-mono text-forest-700 mb-1">
          Snarveier
        </div>
        <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
          <ShortcutLink href="/hunder">Hunder — registret</ShortcutLink>
          <ShortcutLink href="/dog/astor">Astor — hund-detaljer</ShortcutLink>
          <ShortcutLink href="/pedigree">Stamtavle-utforsker</ShortcutLink>
          <ShortcutLink href="/litter">Kull C — dagbok</ShortcutLink>
          <ShortcutLink href="/kennel">Offentlig kennelside</ShortcutLink>
        </ul>
      </section>
    </aside>
  );
}

function ShortcutLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-forest-700 hover:text-forest-900 inline-flex items-center gap-1 transition-colors"
      >
        {children}
        <span aria-hidden>→</span>
      </Link>
    </li>
  );
}
