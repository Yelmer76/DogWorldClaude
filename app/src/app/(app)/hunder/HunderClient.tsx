"use client";

import Link from "next/link";
import { useState } from "react";
import type { DogRow } from "@/db/schema";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { TitleBadge, Tag } from "@/components/dogworld/Tag";
import { Button } from "@/components/ui/Button";

export function HunderClient({ initial }: { initial: DogRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "memorial">("all");

  const visible = initial
    .filter((d) => {
      if (filter === "active") return d.status === "active";
      if (filter === "memorial") return d.status === "memorial";
      return true;
    })
    .filter((d) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.callName?.toLowerCase().includes(q) ||
        (d.titles as string[]).some((t) => t.toLowerCase().includes(q))
      );
    });

  return (
    <div className="px-4 md:px-8 py-5 md:py-8 flex flex-col gap-5">
      {/* Desktop title + count + new-dog CTA */}
      <div className="hidden md:flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
            Registeret
          </div>
          <h1 className="m-0 text-[28px] font-semibold tracking-[-0.015em] text-n-950">
            Hunder
          </h1>
          <p className="m-0 mt-2 text-sm text-n-700 max-w-[60ch]">
            Alle hunder i kennelen — aktive avlsdyr, pensjonerte, og
            minner. Klikk en for å se detaljene.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm text-n-500 font-mono">
            {visible.length} av {initial.length}
          </span>
          <Link href="/hunder/nytt">
            <Button variant="primary" size="sm">
              <span aria-hidden className="text-base leading-none">＋</span>
              Ny hund
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-bg-card border border-n-200 rounded-card flex items-center gap-2 px-3 py-2.5">
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk navn, kallenavn, titler…"
          className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-n-500 min-w-0"
          aria-label="Søk hunder"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Tøm søk"
            className="text-n-500 hover:text-n-700 text-sm"
          >
            ×
          </button>
        )}
      </div>

      {/* Status filter chips */}
      <div className="flex gap-1 overflow-x-auto -mx-1 px-1">
        {(
          [
            { id: "all", label: "Alle" },
            { id: "active", label: "Aktive" },
            { id: "memorial", label: "Minne" },
          ] as const
        ).map((f) => {
          const active = filter === f.id;
          const count =
            f.id === "all"
              ? initial.length
              : f.id === "active"
                ? initial.filter((d) => d.status === "active").length
                : initial.filter((d) => d.status === "memorial").length;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors flex-shrink-0 " +
                (active
                  ? "bg-forest-700 text-white"
                  : "bg-bg-card border border-n-200 text-n-700 hover:border-n-300")
              }
            >
              {f.label}
              <span
                className={
                  "font-mono text-[10px] " +
                  (active ? "text-forest-50/80" : "text-n-500")
                }
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dog list */}
      <ul className="m-0 p-0 list-none flex flex-col gap-2">
        {visible.map((d) => (
          <li key={d.id}>
            <DogRowCard dog={d} />
          </li>
        ))}
        {visible.length === 0 && initial.length === 0 && (
          <li className="border border-dashed border-n-300 rounded-card p-8 text-center flex flex-col items-center gap-3">
            <p className="m-0 text-sm text-n-700 max-w-[40ch]">
              Ingen hunder ennå. Begynn med å legge til den første — det
              tar 30 sekunder.
            </p>
            <Link href="/hunder/nytt">
              <Button variant="primary" size="sm">
                <span aria-hidden className="text-base leading-none">＋</span>
                Legg til første hund
              </Button>
            </Link>
          </li>
        )}
        {visible.length === 0 && initial.length > 0 && (
          <li className="border border-dashed border-n-300 rounded-card p-6 text-center text-sm text-n-500 italic">
            Ingen hunder matcher søket.
          </li>
        )}
      </ul>

      <p className="text-[11px] text-n-500 px-1 font-mono">
        Lest fra lokal SQLite · Sprint 13
      </p>
    </div>
  );
}

function DogRowCard({ dog }: { dog: DogRow }) {
  const isMem = dog.status === "memorial";
  const titles = dog.titles as string[];
  return (
    <Link
      href={`/dog/${dog.id}`}
      className="group flex gap-3 bg-bg-card border border-n-200 rounded-card p-2 pr-4 hover:border-n-300 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-all items-center"
    >
      <div className="w-14 h-14 flex-shrink-0">
        <DogPhoto
          tone={dog.sex === "m" ? "sire" : "dam"}
          muted={isMem}
          label={(dog.callName ?? dog.name).split(" ")[0].toUpperCase()}
          className="w-full h-full !rounded-card"
          aspect="1 / 1"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-1 mb-0.5">
          {titles.slice(0, 2).map((t) => (
            <TitleBadge key={t}>{t}</TitleBadge>
          ))}
          {titles.length > 2 && (
            <span className="text-[10px] text-n-500 font-mono">
              +{titles.length - 2}
            </span>
          )}
        </div>
        <div className="text-sm font-semibold text-n-950 truncate">
          {dog.name}
        </div>
        <div className="text-xs text-n-500 font-mono mt-0.5">
          {dog.sex === "m" ? "♂" : "♀"} · f. {dog.born.slice(0, 4)}
          {dog.deceased && ` · † ${dog.deceased.slice(0, 4)}`}
        </div>
      </div>
      {isMem && (
        <Tag variant="info" dot>
          Minne
        </Tag>
      )}
      <span
        aria-hidden
        className="text-n-300 group-hover:text-n-500 group-hover:translate-x-0.5 transition-all"
      >
        →
      </span>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-n-500 flex-shrink-0"
      aria-hidden
    >
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="16" y2="16" />
    </svg>
  );
}
