/**
 * Sparkline — minimal inline chart for trend data.
 *
 * Used in the Today dashboard hero litter card (7-day weight average) and
 * in Dog Detail / Helse for the 7-month weight series.
 *
 * Renders a smoothed polyline + filled area + final-point dot inside an SVG
 * sized to its container. Pure presentational — no axes, no tooltips.
 */
import type { CSSProperties } from "react";

export type SparklineProps = {
  /** Numeric series (chronological, oldest first) */
  data: number[];
  /** Width in px (default 280) */
  width?: number;
  /** Height in px (default 64) */
  height?: number;
  /** Stroke color — defaults to forest-700 */
  stroke?: string;
  /** Fill area below the line — defaults to forest-50 */
  fill?: string;
  /** Show final-point dot (default true) */
  showLastPoint?: boolean;
  /** Optional className */
  className?: string;
  /** Accessible description */
  ariaLabel?: string;
};

export function Sparkline({
  data,
  width = 280,
  height = 64,
  stroke = "var(--color-forest-700)",
  fill = "var(--color-forest-50)",
  showLastPoint = true,
  className = "",
  ariaLabel,
}: SparklineProps) {
  if (data.length === 0) return null;
  const padX = 4;
  const padY = 6;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(1, max - min);

  const points = data.map((v, i) => {
    const x = padX + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);
    const y = padY + chartH - ((v - min) / range) * chartH;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${padX + chartW} ${padY + chartH} L ${padX} ${padY + chartH} Z`;

  const last = points[points.length - 1];

  const style: CSSProperties = { width, height };

  return (
    <svg
      role="img"
      aria-label={ariaLabel ?? "Trend-graf"}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <path d={areaPath} fill={fill} opacity={0.6} />
      <path
        d={linePath}
        stroke={stroke}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showLastPoint && (
        <circle cx={last.x} cy={last.y} r={3} fill={stroke} />
      )}
    </svg>
  );
}
