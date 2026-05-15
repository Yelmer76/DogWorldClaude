"use client";

import { litterStages, type LitterStageId } from "./litterExtras";

export function StageProgress({ current }: { current: LitterStageId }) {
  const idx = litterStages.findIndex((s) => s.id === current);
  return (
    <ol
      className="m-0 p-0 list-none flex gap-1 overflow-x-auto"
      aria-label="Kullets utvikling"
    >
      {litterStages.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li
            key={s.id}
            className="flex-1 min-w-[88px]"
            aria-current={active ? "step" : undefined}
          >
            <div
              className={
                "h-1 rounded-full mb-2 " +
                (active
                  ? "bg-forest-700"
                  : done
                    ? "bg-forest-500"
                    : "bg-n-100")
              }
            />
            <div
              className={
                "text-[10px] uppercase tracking-[0.06em] font-mono px-1 " +
                (active
                  ? "text-forest-700 font-semibold"
                  : done
                    ? "text-forest-500"
                    : "text-n-500")
              }
            >
              {s.label}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
