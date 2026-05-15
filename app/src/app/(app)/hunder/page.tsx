"use client";

import Link from "next/link";
import { useState } from "react";
import { dogs, type Dog } from "@/data/universe";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { TitleBadge, Tag } from "@/components/dogworld/Tag";
import { AppHeader } from "@/components/shell/AppHeader";

/**
 * Hunder list — Sprint 10 first cut. Lists every dog in the universe
 * with a search bar + status filter. Sprint 11 wires per-row clicks to
 * /dog/[id]; for now they all open the legacy /dog (Astor) page.
 */
export default function HunderPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "memorial">("all");

  const allDogs = Object.values(dogs);
  const visible = allDogs
    .filter((d) => !d.hidden)
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
        d.titles.some((t) => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name, "nb"));

  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-8 py-5 md:py-8 flex flex-col gap-5">
        {/* Desktop title + count */}
        <div className="hidden md:flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-forest-700 mb-2">
              Registeret
            </div>
            <h1 className="m-0 text-[28px] font-semibold tracking-[-0.015em] text-n-950">
              Hunder
            </h1>
          </div>
          <span className="text-sm text-n-500 font-mono">
            {visible.length} av {allDogs.filter((d) => !d.hidden).length}
          </span>
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
                ? allDogs.filter((d) => !d.hidden).length
                : f.id === "active"
                  ? allDogs.filter((d) => !d.hidden && d.status === "active")
                      .length
                  : allDogs.filter(
                      (d) => !d.hidden && d.status === "memorial",
                    ).length;
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
              <DogRow dog={d} />
            </li>
          ))}
          {visible.length === 0 && (
            <li className="border border-dashed border-n-300 rounded-card p-6 text-center text-sm text-n-500 italic">
              Ingen hunder matcher søket.
            </li>
          )}
        </ul>

      </div>
    </>
  );
}

function DogRow({ dog }: { dog: Dog }) {
  const isMem = dog.status === "memorial";
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
          {dog.titles.slice(0, 2).map((t) => (
            <TitleBadge key={t}>{t}</TitleBadge>
          ))}
          {dog.titles.length > 2 && (
            <span className="text-[10px] text-n-500 font-mono">
              +{dog.titles.length - 2}
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
