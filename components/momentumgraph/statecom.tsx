"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ============================================================================
// 1. STANDALONE MICRO-COMPONENTS (Drop these anywhere in your app)
// ============================================================================

export function DataScrambler() {
    const [text, setText] = useState("0x0000");

    useEffect(() => {
        const chars = "0123456789ABCDEF";
        const scramble = setInterval(() => {
            const randomHex = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * 16)]).join("");
            setText(`0x${randomHex}`);
        }, 60);

        return () => clearInterval(scramble);
    }, []);

    return (
        <span className="font-mono text-[13px] font-medium tracking-wider text-[#5dcaa5]/80">
            {text}
        </span>
    );
}

export function ActivityBars() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const bars = gsap.utils.toArray<HTMLDivElement>(".mini-bar");
            gsap.to(bars, {
                scaleY: "random(0.2, 1)",
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                stagger: { amount: 0.3, from: "random" },
                ease: "none"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex items-end gap-[2px] h-2.5 w-4 opacity-80">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="mini-bar w-[3px] h-full bg-[#5dcaa5] rounded-sm origin-bottom" />
            ))}
        </div>
    );
}

export function ProcessingRing() {
    const ringRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        gsap.to(ringRef.current, { rotation: 360, duration: 8, repeat: -1, ease: "linear" });
    }, []);

    return (
        <svg ref={ringRef} width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-70">
            <circle cx="12" cy="12" r="10" stroke="#3E3E44" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="10" stroke="#5dcaa5" strokeWidth="2.5" strokeDasharray="16 32" strokeLinecap="round" />
        </svg>
    );
}


// ============================================================================
// 2. PURE SYSTEM STATE CARD (No computations baked in)
// ============================================================================

export default function SystemStateCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!cardRef.current || !svgRef.current) return;

        const ctx = gsap.context(() => {
            const blocks = gsap.utils.toArray<SVGGElement>(".iso-block");

            blocks.forEach((block, i) => {
                gsap.to(block, {
                    y: "-=6", duration: 2 + (i % 3) * 0.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.2,
                });
            });

            const card = cardRef.current;
            const handleMouseEnter = () => {
                gsap.to(blocks, { scale: 1.02, transformOrigin: "center center", duration: 0.4, ease: "back.out(1.5)" });
            };
            const handleMouseLeave = () => {
                gsap.to(blocks, { scale: 1, duration: 0.4, ease: "power2.out" });
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                card.removeEventListener("mouseenter", handleMouseEnter);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
        }, cardRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={cardRef}
            className="w-full bg-[#08090A] border border-dashed border-[#2E2E32] hover:border-[#4A4A52] hover:-translate-y-1 rounded-2xl p-6 md:p-8 flex flex-col gap-6 font-sans cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_rgba(93,202,165,0.15)] transition-all duration-300 box-border"
        >
            {/* Header */}
            <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                    <h3 className="m-0 text-[#e1f5ee] text-sm md:text-base font-semibold tracking-wider">CLUSTER STATE</h3>
                    <p className="m-0 mt-1 text-[#666] text-xs">NODE-GROUP ALPHA</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-[#1d9e75]/10 px-2.5 py-1 rounded-full border border-[#1d9e75]/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5dcaa5] shadow-[0_0_8px_#5dcaa5]" />
                        <span className="text-[10px] text-[#5dcaa5] font-semibold tracking-wide">OPTIMAL</span>
                    </div>
                </div>
            </div>

            {/* SVG Visual Area */}
            <div className="w-full flex justify-center items-center relative py-4 md:py-8">
                <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto max-w-[280px] overflow-visible"
                    viewBox="0 0 304 281"
                    fill="none"
                >
                    {/* Top Back Block */}
                    <g className="iso-block">
                        <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.5" d="M148.534 1.068a7.75 7.75 0 0 1 6.932 0l50.211 25.106a3.75 3.75 0 0 1 2.073 3.354v125.056c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.21-25.105a3.75 3.75 0 0 1-2.074-3.354V29.528a3.75 3.75 0 0 1 2.073-3.354z"></path>
                        <path stroke="#2E2E32" strokeLinecap="round" strokeWidth="0.5" d="m102 30.056 46.422 23.21a8 8 0 0 0 7.156 0L202 30.057"></path>
                    </g>

                    {/* Left Block */}
                    <g className="iso-block" filter="url(#filter1_d_3357_5865)" name="outer-left">
                        <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.5" d="M84.534 53.069a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v73.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.21-25.105a3.75 3.75 0 0 1-2.074-3.354V81.528a3.75 3.75 0 0 1 2.073-3.354z"></path>
                        <path stroke="#2E2E32" strokeLinecap="round" strokeWidth="0.5" d="m38 82.056 46.422 23.211a8 8 0 0 0 7.156 0L138 82.056"></path>
                    </g>

                    {/* Left Block Bottom Detail */}
                    <g className="iso-block" strokeWidth="0.5" filter="url(#filter0_d_3357_5865)">
                        <path fill="#08090A" stroke="#3E3E44" d="M84.534 139.068a7.76 7.76 0 0 1 6.932 0l50.211 25.106a3.75 3.75 0 0 1 2.073 3.353v19.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.21-25.105a3.75 3.75 0 0 1-2.074-3.354v-19.057a3.75 3.75 0 0 1 2.073-3.353z"></path>
                        <path stroke="#2E2E32" strokeLinecap="round" d="m38 168.056 46.422 23.211a8 8 0 0 0 7.156 0L138 168.056"></path>
                    </g>

                    {/* Right Block */}
                    <g className="iso-block" strokeWidth="0.5" filter="url(#filter2_d_3357_5865)">
                        <path fill="#08090A" stroke="#D0D6E0" d="M212.534 97.069a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v61.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.211-25.105a3.75 3.75 0 0 1-2.073-3.354v-61.057a3.75 3.75 0 0 1 2.073-3.353z"></path>
                        <path stroke="#2E2E32" strokeLinecap="round" d="m166 126.056 46.422 23.211a8 8 0 0 0 7.156 0L266 126.056"></path>
                    </g>

                    {/* Right Block Top Detail */}
                    <g className="iso-block" strokeWidth="0.5" filter="url(#filter3_d_3357_5865)" name="outer-right">
                        <path fill="#08090A" stroke="#3E3E44" d="M212.534 64.069a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v19.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.211-25.105a3.75 3.75 0 0 1-2.073-3.354V92.528a3.75 3.75 0 0 1 2.073-3.354z"></path>
                        <path stroke="#2E2E32" strokeLinecap="round" d="m166 93.056 46.422 23.211a8 8 0 0 0 7.156 0L266 93.056"></path>
                    </g>

                    {/* Bottom Front Block */}
                    <g className="iso-block" filter="url(#filter4_d_3357_5865)">
                        <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.5" d="M148.534 145.068a7.76 7.76 0 0 1 6.932 0l50.211 25.106a3.75 3.75 0 0 1 2.073 3.353v45.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.21-25.105a3.75 3.75 0 0 1-2.074-3.354v-45.057a3.75 3.75 0 0 1 2.073-3.353z"></path>
                        <path stroke="#2E2E32" strokeLinecap="round" strokeWidth="0.5" d="m102 174.056 46.422 23.211a8 8 0 0 0 7.156 0L202 174.056"></path>
                    </g>

                    <defs>
                        <filter id="filter0_d_3357_5865" width="176" height="144" x="0" y="105.056" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="16"></feGaussianBlur>
                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                            <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0"></feColorMatrix>
                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3357_5865"></feBlend>
                            <feBlend in="SourceGraphic" in2="effect1_dropShadow_3357_5865" result="shape"></feBlend>
                        </filter>
                        <filter id="filter1_d_3357_5865" width="176" height="198" x="0" y="19.056" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="16"></feGaussianBlur>
                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                            <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0"></feColorMatrix>
                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3357_5865"></feBlend>
                            <feBlend in="SourceGraphic" in2="effect1_dropShadow_3357_5865" result="shape"></feBlend>
                        </filter>
                        <filter id="filter2_d_3357_5865" width="176" height="210" x="128" y="39.056" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="16"></feGaussianBlur>
                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                            <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0"></feColorMatrix>
                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3357_5865"></feBlend>
                            <feBlend in="SourceGraphic" in2="effect1_dropShadow_3357_5865" result="shape"></feBlend>
                        </filter>
                        <filter id="filter3_d_3357_5865" width="176" height="144" x="128" y="30.056" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="16"></feGaussianBlur>
                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                            <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0"></feColorMatrix>
                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3357_5865"></feBlend>
                            <feBlend in="SourceGraphic" in2="effect1_dropShadow_3357_5865" result="shape"></feBlend>
                        </filter>
                        <filter id="filter4_d_3357_5865" width="176" height="170" x="64" y="111.056" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="16"></feGaussianBlur>
                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                            <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0"></feColorMatrix>
                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3357_5865"></feBlend>
                            <feBlend in="SourceGraphic" in2="effect1_dropShadow_3357_5865" result="shape"></feBlend>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Footer / Metrics - Restored to static text */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-4 border-t border-[#1a1a1c] pt-4">
                <div>
                    <p className="m-0 text-[#666] text-[10px] tracking-wider uppercase">UPTIME</p>
                    <p className="m-0 mt-1.5 text-[#e1f5ee] text-[13px] font-medium">99.98%</p>
                </div>
                <div>
                    <p className="m-0 text-[#666] text-[10px] tracking-wider uppercase">LOAD</p>
                    <p className="m-0 mt-1.5 text-[#e1f5ee] text-[13px] font-medium">24.1 TB/s</p>
                </div>
                <div>
                    <p className="m-0 text-[#666] text-[10px] tracking-wider uppercase">TEMP</p>
                    <p className="m-0 mt-1.5 text-[#e1f5ee] text-[13px] font-medium">42°C</p>
                </div>
                <div>
                    <p className="m-0 text-[#666] text-[10px] tracking-wider uppercase">MEM</p>
                    <p className="m-0 mt-1.5 text-[#e1f5ee] text-[13px] font-medium">1.2 TB</p>
                </div>
            </div>
        </div>
    );
}