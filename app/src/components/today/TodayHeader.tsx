"use client";

import { todayDate, todayKennel } from "./todayData";

export function TodayHeader() {
  return (
    <header className="bg-bg-card border-b border-n-100">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="m-0 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-n-950 leading-tight">
            {todayDate.greeting}
          </h1>
          <p className="m-0 mt-1 text-sm text-n-700 capitalize font-mono">
            {todayDate.dateLine}
            <span className="text-n-300 mx-2" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <WeatherGlyph kind={todayDate.weather.icon} />
              {todayDate.weather.temp}{" "}
              <span className="text-n-500">· {todayDate.weather.note}</span>
            </span>
          </p>
        </div>
        <KarmaPill />
      </div>
    </header>
  );
}

function KarmaPill() {
  const { karma } = todayKennel;
  return (
    <div className="bg-warm-600/10 text-warm-600 border border-warm-600/20 rounded-full px-3 py-1.5 inline-flex items-center gap-2 text-sm self-start md:self-auto">
      <span className="font-mono font-semibold">+{karma.deltaToday}</span>
      <span>karma · {karma.tier}-tier</span>
      <span className="text-warm-600/70 hidden sm:inline">
        ({karma.reason})
      </span>
    </div>
  );
}

function WeatherGlyph({ kind }: { kind: "rain" | "sun" | "cloud" }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 14,
    height: 14,
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "sun") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M17 7l1.4-1.4M5.6 18.4L7 17" />
      </svg>
    );
  }
  if (kind === "cloud") {
    return (
      <svg {...common}>
        <path d="M5 18a4 4 0 0 1 1.6-7.7A6 6 0 0 1 18 12a3.5 3.5 0 0 1 0 6z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M5 14a4 4 0 0 1 1.6-7.7A6 6 0 0 1 18 8a3.5 3.5 0 0 1 0 6H5z" />
      <path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2" />
    </svg>
  );
}
