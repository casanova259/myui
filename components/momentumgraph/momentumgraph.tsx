"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BarData {
    value: number;
}

interface MomentumChartProps {
    data?: BarData[];
    className?: string;
}

/** Heights (in SVG units) for each bar segment.
 *  Maps 1:1 to the original artwork's y-offsets. */
const DEFAULT_DATA: BarData[] = [
    { value: 20.529 }, // bar 1  (shortest, front)
    { value: 34.049 },
    { value: 54.331 },
    { value: 81.373 },
    { value: 128.697 }, // bar 5  (tallest)
    { value: 81.373 },
    { value: 54.331 },
    { value: 34.049 },
    { value: 20.529 },
    { value: 13.768 },
    { value: 10.387 },
    { value: 8.698 },
    { value: 7.852 },
    { value: 7.853 },
    { value: 7.853 }, // bar 15 (shortest, back)
];

/** Each bar's (x, y) start position for the label vertex */
const BAR_ORIGINS = [
    [137.044, 107.668], [128.594, 98.378],
    [120.144, 82.316], [111.694, 59.504],
    [103.244, 16.400], [94.794, 67.954],
    [86.344, 99.216], [77.894, 123.728],
    [69.444, 141.478], [60.994, 152.459],
    [52.544, 160.060], [44.094, 165.979],
    [35.634, 171.055], [27.184, 175.274],
    [18.734, 179.504],
] as const;

/** Inner edge path for each bar (the highlight line) */
const INNER_ORIGINS = [
    [137.689, 110.446], [129.239, 101.156],
    [120.789, 85.094], [112.339, 62.282],
    [103.889, 19.178], [95.439, 70.732],
    [86.989, 101.994], [78.539, 126.506],
    [70.089, 144.256], [61.639, 155.237],
    [53.189, 162.838], [44.739, 168.757],
    [36.279, 173.833], [27.829, 178.052],
    [19.379, 182.282],
] as const;

const BAR_SPREAD = 115.686;
const SPREAD_ANGLE = 57.843;
const INNER_X_OFFSET = 113.061;
const INNER_Y_OFFSET = 56.531;

export function MomentumChart({
    data = DEFAULT_DATA,
    className,
}: MomentumChartProps) {
    const bars = data.slice(0, 15);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="272"
            height="267"
            fill="none"
            viewBox="0 0 272 267"
            overflow="visible"
            className={cn("momentum-chart", className)}
        >
            {bars.map((bar, i) => {
                const [ox, oy] = BAR_ORIGINS[i];
                const [ix, iy] = INNER_ORIGINS[i];
                const h = bar.value;

                return (
                    <g key={i} strokeWidth="0.5">
                        {/* Bar body */}
                        <path
                            fill="#08090A"
                            stroke="#62666D"
                            d={buildBarPath(ox, oy, h)}
                        />
                        {/* Inner highlight edge */}
                        <path
                            stroke="#2E2E32"
                            strokeLinecap="round"
                            d={buildInnerPath(ix, iy, h)}
                        />
                    </g>
                );
            })}
        </svg>
    );
}

// ─── helpers ────────────────────────────────────────────────────────────────

function buildBarPath(ox: number, oy: number, h: number): string {
    // Parallelogram bar: left-vertex → spread right → drop h → come back
    const rx = ox + BAR_SPREAD;
    const ry = oy + SPREAD_ANGLE;

    return [
        // top-left vertex with arrow-head label
        `M${ox} ${oy}`,
        `a1.44 1.44 0 0 1 1.288 0`,
        // spread to top-right
        `l${BAR_SPREAD} ${SPREAD_ANGLE}`,
        `a3.13 3.13 0 0 1 1.73 2.8`,
        // drop down h units
        `v${h}`,
        `a1.44 1.44 0 0 1-.796 1.288`,
        `l-1.69.845`,
        `a1.44 1.44 0 0 1-1.288 0`,
        // spread back left
        `l-${BAR_SPREAD} -${SPREAD_ANGLE}`,
        `a3.13 3.13 0 0 1-1.73-2.8`,
        // rise back up
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