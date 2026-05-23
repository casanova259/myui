"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
    { month: "Jan", desktop: 62, mobile: 28 },
    { month: "Feb", desktop: 95, mobile: 55 },
    { month: "Mar", desktop: 74, mobile: 38 },
    { month: "Apr", desktop: 30, mobile: 52 },
    { month: "May", desktop: 68, mobile: 46 },
    { month: "Jun", desktop: 72, mobile: 42 },
];

const maxVal = Math.max(...data.flatMap((d) => [d.desktop, d.mobile]));
const getH = (val: number) => Math.round((val / maxVal) * 92);

function Bar({ targetH, delay, className }: { targetH: number; delay: number; className: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className={`flex-1 rounded-t-[3px] ${className}`}
            initial={{ height: 0 }}
            animate={{ height: hovered ? "0%" : `${targetH}%` }}
            transition={
                hovered
                    ? { duration: 0.18, ease: "easeIn" }
                    : { duration: 0.55, delay: hovered ? 0 : delay, ease: [0.34, 1.56, 0.64, 1] }
            }
            style={{ originY: 1 }}
            onHoverStart={() => {
                setHovered(true);
                setTimeout(() => setHovered(false), 180);
            }}
        />
    );
}

export default function BarChart() {
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-[#0F0F0F] px-5 pt-5 pb-4 select-none overflow-hidden">
            {/* Grid lines + bars area */}
            <div className="relative h-36 flex items-end gap-1.5">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none ">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-px bg-white/10" />
                    ))}
                </div>

                {/* Month groups */}
                {data.map((d, i) => (
                    <div
                        key={d.month}
                        className="relative flex-1 flex items-end gap-1 h-full cursor-pointer "
                        
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            {tooltipIndex === i && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-md border border-white/15 bg-[#2c2b2c] px-2.5 py-1 text-[11px] text-white pointer-events-none"
                                >
                                    <span className="text-white">Desktop {d.desktop}</span>
                                    <span className="text-white/40 mx-1">·</span>
                                    <span className="text-white/70">Mobile {d.mobile}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Bar targetH={getH(d.desktop)} delay={i * 0.09} className="bg-white" />
                        <Bar targetH={getH(d.mobile)} delay={i * 0.09 + 0.05} className="bg-white/40" />
                    </div>
                ))}
            </div>

            {/* Month labels */}
            <div className="flex gap-1.5 mt-1">
                {data.map((d) => (
                    <div key={d.month} className="flex-1 text-center text-[11px] text-white/40">
                        {d.month}
                    </div>
                ))}
            </div>
        </div>
    );
}