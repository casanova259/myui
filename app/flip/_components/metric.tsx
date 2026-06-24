"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PerformanceWidget() {
    const barsRef = useRef([]);

    useEffect(() => {
        // GSAP animation to make the segmented bars fill up on load
        gsap.fromTo(
            barsRef.current,
            { opacity: 0, scaleY: 0.2 },
            {
                opacity: 1,
                scaleY: 1,
                duration: 0.6,
                stagger: 0.04,
                ease: "power2.out",
                transformOrigin: "bottom"
            }
        );
    }, []);

    return (
        <div className="w-[600px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 font-sans text-white shadow-2xl">

            {/* Top Bar with Tags */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex gap-2">
                    <span className="border border-[#333] px-3 py-1 rounded-md text-xs text-gray-300">
                        front-end
                    </span>
                    <span className="border border-[#333] px-3 py-1 rounded-md text-xs text-gray-300">
                        animations
                    </span>
                    <span className="border border-[#333] px-3 py-1 rounded-md text-xs text-gray-300">
                        architecture
                    </span>
                </div>
                <div className="text-gray-400 tracking-widest leading-none pb-2 font-bold cursor-pointer hover:text-white transition-colors">
                    ...
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-medium tracking-tight mb-4">
                Lighthouse Metrics
            </h2>

            {/* Divider */}
            <hr className="border-[#2a2a2a] mb-6" />

            {/* Content */}
            <p className="text-[#a0a0a0] text-sm mb-4">
                Accessibility and best practices are fully optimized.
            </p>

            {/* Metrics Row */}
            <div className="flex items-end gap-4 mb-8">
                <span className="text-7xl font-light tracking-tighter leading-none">
                    95<span className="text-4xl">%</span>
                </span>
                <div className="flex items-center gap-2 mb-2">
                    <span className="border border-[#333] px-2 py-1 rounded text-xs text-gray-300 flex items-center gap-1">
                        ↗ 92%
                    </span>
                    <span className="text-[#a0a0a0] text-sm">
                        performance score
                    </span>
                </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex gap-1 h-14 items-end">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        ref={el => barsRef.current[i] = el}
                        // 28 segments filled (represents ~95%), 2 empty
                        className={`flex-1 rounded-sm h-full ${i < 28 ? 'bg-[#e0e0e0]' : 'bg-[#262626]'
                            }`}
                    ></div>
                ))}
            </div>

        </div>
    );
}