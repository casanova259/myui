"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

interface BarData {
  value: number;
}

interface MomentumChartProps {
  data?: BarData[];
  className?: string;
}

const DEFAULT_DATA: BarData[] = [
  { value: 20.529 }, { value: 34.049 }, { value: 54.331 },
  { value: 81.373 }, { value: 128.697 }, { value: 81.373 },
  { value: 54.331 }, { value: 34.049 }, { value: 20.529 },
  { value: 13.768 }, { value: 10.387 }, { value: 8.698 },
  { value: 7.852 }, { value: 7.853 }, { value: 7.853 },
];

const BAR_ORIGINS: readonly [number, number][] = [
  [137.044, 107.668], [128.594, 98.378], [120.144, 82.316],
  [111.694, 59.504], [103.244, 16.400], [94.794, 67.954],
  [86.344, 99.216], [77.894, 123.728], [69.444, 141.478],
  [60.994, 152.459], [52.544, 160.060], [44.094, 165.979],
  [35.634, 171.055], [27.184, 175.274], [18.734, 179.504],
];

const INNER_ORIGINS: readonly [number, number][] = [
  [137.689, 110.446], [129.239, 101.156], [120.789, 85.094],
  [112.339, 62.282], [103.889, 19.178], [95.439, 70.732],
  [86.989, 101.994], [78.539, 126.506], [70.089, 144.256],
  [61.639, 155.237], [53.189, 162.838], [44.739, 168.757],
  [36.279, 173.833], [27.829, 178.052], [19.379, 182.282],
];

const BAR_SPREAD = 115.686;
const SPREAD_ANGLE = 57.843;
const INNER_X_OFFSET = 113.061;
const INNER_Y_OFFSET = 56.531;

const PEAK_HEIGHT = 128.697;
const BASE_HEIGHT = 7.852;
const SIGMA = 2.8;

function gaussianHeight(distance: number): number {
  const t = Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
  return BASE_HEIGHT + (PEAK_HEIGHT - BASE_HEIGHT) * t;
}

function buildBarPath(ox: number, oy: number, h: number): string {
  return [
    `M${ox} ${oy}`,
    `a1.44 1.44 0 0 1 1.288 0`,
    `l${BAR_SPREAD} ${SPREAD_ANGLE}`,
    `a3.13 3.13 0 0 1 1.73 2.8`,
    `v${h}`,
    `a1.44 1.44 0 0 1-.796 1.288`,
    `l-1.69.845`,
    `a1.44 1.44 0 0 1-1.288 0`,
    `l-${BAR_SPREAD} -${SPREAD_ANGLE}`,
    `a3.13 3.13 0 0 1-1.73-2.8`,
    `v-${h}`,
    `c0-.545.308-1.044.796-1.288z`,
  ].join(" ");
}

function buildInnerPath(ix: number, iy: number, h: number): string {
  return [
    `M${ix} ${iy}`,
    `l${INNER_X_OFFSET} ${INNER_Y_OFFSET}`,
    `a3.38 3.38 0 0 1 1.868 3.023`,
    `v${h - 2.336}`,
  ].join(" ");
}

// ─── SINGLE BAR driven by a numeric spring MotionValue ───────────────────────

interface AnimatedBarProps {
  ox: number;
  oy: number;
  ix: number;
  iy: number;
  baseValue: number;
  heightMV: MotionValue<number>;   // smooth numeric spring
  maxHeight: number;
  isFocused: boolean;
  onMouseEnter: () => void;
}

function AnimatedBar({ ox, oy, ix, iy, baseValue, heightMV, maxHeight, isFocused, onMouseEnter }: AnimatedBarProps) {
  // Derive path strings directly from the live numeric value — no re-renders
  const outerD = useTransform(heightMV, (h) => {
    const deltaH = h - baseValue;
    return buildBarPath(ox, oy - deltaH, h);
  });

  const innerD = useTransform(heightMV, (h) => {
    const deltaH = h - baseValue;
    return buildInnerPath(ix, iy - deltaH, h);
  });

  return (
    <g>
      {/* Full-height invisible hitbox — never animates, always hittable */}
      <path
        d={buildBarPath(ox, oy - (maxHeight - baseValue), maxHeight)}
        fill="transparent"
        className="cursor-crosshair"
        onMouseEnter={onMouseEnter}
      />

      <motion.path
        fill="#08090A"
        stroke={isFocused ? "#FFFFFF" : "#62666D"}
        strokeWidth="0.5"
        d={outerD}
      />

      <motion.path
        fill="none"
        stroke={isFocused ? "#FFFFFF" : "#2E2E32"}
        strokeWidth="0.5"
        d={innerD}
      />
    </g>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const SPRING_CONFIG = { stiffness: 260, damping: 28, mass: 0.8 };

function BarController({
  index,
  bar,
  ox, oy, ix, iy,
  hoveredIndex,
  onMouseEnter,
}: {
  index: number;
  bar: BarData;
  ox: number; oy: number;
  ix: number; iy: number;
  hoveredIndex: number | null;
  onMouseEnter: () => void;
}) {
  const target =
    hoveredIndex === null
      ? bar.value
      : gaussianHeight(Math.abs(index - hoveredIndex));

  const heightSpring = useSpring(bar.value, SPRING_CONFIG);
  heightSpring.set(target);

  return (
    <AnimatedBar
      ox={ox} oy={oy}
      ix={ix} iy={iy}
      baseValue={bar.value}
      heightMV={heightSpring}
      maxHeight={PEAK_HEIGHT}
      isFocused={hoveredIndex === index}
      onMouseEnter={onMouseEnter}
    />
  );
}

export function MomentumChart({ data = DEFAULT_DATA, className }: MomentumChartProps) {
  const bars = data.slice(0, 15);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`relative w-full h-full min-h-[300px] bg-[#050505] flex items-center justify-center select-none rounded-xl overflow-hidden ${className ?? ""}`}>
      <span className="absolute top-4 left-4 font-mono text-[10px] text-white/30 tracking-widest z-10">
        FIG 0.4 // KINETIC_ISOLATION
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 272 267"
        overflow="visible"
        className="w-full h-full max-w-[400px] max-h-[400px]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {bars.map((bar, i) => {
          const [ox, oy] = BAR_ORIGINS[i];
          const [ix, iy] = INNER_ORIGINS[i];
          return (
            <BarController
              key={i}
              index={i}
              bar={bar}
              ox={ox} oy={oy}
              ix={ix} iy={iy}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => setHoveredIndex(i)}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default MomentumChart;