"use client";

import SectionItoshiRin from "@/components/Pincards/PinCards";




// app/page.tsx
export default function Home() {
    return (
        <main className="w-full bg-[#0f0f0f]">
            <SectionItoshiRin />

            <footer className="relative flex h-[70svh] w-full items-center justify-center bg-[#0f0f0f] p-8 text-white">
                <h1 className="text-center text-[clamp(3rem,10vw,8rem)] leading-none font-black tracking-tighter uppercase font-monster-beast">
                    Curse <br />Dispelled
                </h1>
            </footer>
        </main>
    )
}

// components/SectionGojo.tsx
 function SectionGojo() {
    return (
        // OUTER — clips the rotated child
        <section className="relative h-svh min-h-svh w-full overflow-hidden">

            {/* INNER — rotated, oversized so edges bleed past the clip */}
            <div className="absolute inset-[-25%] rotate-[15deg] bg-[#8e9487] flex items-center justify-center">

                {/* watermark kanji — opacity 3% so barely visible */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60svh] leading-none font-black whitespace-nowrap text-black">
                        最強
                    </div>
                </div>

                {/* two-column content — counter-rotated to read straight */}
                <div className="relative z-10 flex h-[67vh] w-[67vw] flex-col gap-8 md:flex-row -rotate-[15deg]">

                    {/* LEFT — text stack */}
                    <div className="flex flex-1 flex-col items-start justify-end gap-6 pb-8 md:pb-12">
                        <div className="w-full">
                            <span className="text-sm font-bold tracking-[0.2em] text-neutral-600 uppercase">
                                CLASSIFICATION - SPECIAL GRADE
                            </span>
                            <h1 className="mt-2 text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase text-black">
                                The <br />
                                <span className="text-white">Strongest</span>
                            </h1>
                        </div>
                        <p className="max-w-xl text-[1.25rem] leading-tight font-medium text-neutral-900 md:text-[1.65rem]">
                            Throughout heaven and earth, he alone is the honored one.
                        </p>
                        <div className="mt-2 border border-black/30 bg-[#7a8074] px-3 py-1">
                            <span className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase">
                                SIX EYES ACTIVE / INFINITY (∞) RESOLUTION
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — decorative frame with video */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="relative aspect-[4/5] w-[60%]">

                            {/* two decorative borders behind the video */}
                            <div className="absolute inset-0 z-0 rotate-[3deg] border border-dashed border-black opacity-30" />
                            <div className="absolute inset-0 z-0 -rotate-[2deg] border-[1.5px] border-black opacity-40" />

                            {/* video — outline trick creates inset border */}
                            <div className="relative z-10 h-full w-full overflow-hidden border-2 border-white bg-[#7a8074] outline outline-4 outline-black/90">
                                <video
                                    src="/videos/gojo.mp4"
                                    autoPlay muted loop
                                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* corner brackets — top-left */}
                            <div className="absolute top-2 left-2 z-20 h-10 w-10 border-t-4 border-l-4 border-black" />
                            {/* corner brackets — bottom-right */}
                            <div className="absolute right-2 bottom-2 z-20 h-10 w-10 border-r-4 border-b-4 border-black" />

                            {/* bottom label */}
                            <div className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 bg-black px-4 py-0.5 whitespace-nowrap">
                                <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-white uppercase">
                                    LIMITLESS / BLUE / RED / PURPLE
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}