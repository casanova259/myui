"use client";

import { useRef } from "react";
import Image from "next/image";



export default function SectionItoshiRin() {

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) videoRef.current.muted = false;
    };

    const handleMouseLeave = () => {
        if (videoRef.current) videoRef.current.muted = true;
    };
    return (
        <section className="relative h-svh min-h-svh w-full overflow-hidden flex items-center justify-center">

            <div className="absolute  bg-[#8be8bd]/65    flex items-center justify-center h-full w-full">

                {/* watermark */}
                <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none flex items-center justify-center">
                    <span className="text-[40svh] leading-none font-black whitespace-nowrap text-black font-monster-beast">
                        RIN
                    </span>
                </div>

                {/* content */}
                <div className="relative z-10 flex flex-col md:flex-row gap-64 h-[80vh] ">

                    <div className="flex flex-1 flex-col items-start justify-center gap-4 pb-6 md:pb-8 mt-8 ">
                        <span className="text-sm font-bold text-neutral-50 uppercase tracking-widest font-monster-beast">
                            NO. 1 — BLUELOCK XI
                        </span>
                        <h1 className="mt-2 text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase text-white font-monster-beast">
                            Rin <br />
                            <span className="text-[#091413]">Itoshi</span>
                        </h1>
                        <p className="max-w-xl text-[1.25rem] leading-tight font-medium text-neutral-900 md:text-[1.65rem] font-monster-beast">
                            Friend or foe doesn't matter. You're all half-baked NPC's to me.
                        </p>
                        <div className="mt-2 border border-black/30 bg-white px-3 py-1">
                            <span className="font-mono text-xs font-bold tracking-widest text-black/80 uppercase font-monster-beast">
                                NO 1 Bluelock XI
                            </span>
                        </div>
                    </div>


                    {/* right col — image goes here later */}
                    <div className="order-1 flex flex-1 items-center justify-center pt-12 md:order-2 md:pt-0">
                        <div className="relative h-[50vh] w-[20vw] p-4 md:w-[25vw]  ">

                            {/* two decorative offset borders behind */}
                            <div className="absolute inset-0 z-0 rotate-[3deg] border border-dashed border-black opacity-30" />
                            <div className="absolute inset-0 z-0 -rotate-[2deg] border-[1.5px] border-black opacity-40" />

                            {/* main video box */}
                            <div className="relative z-10 h-full w-full overflow-hidden border-2 border-white bg-[#7a8074] outline outline-4 outline-black/90">
                                <video
                                ref={videoRef}
                                    src="/videos/Rin.mp4"
                                    autoPlay muted loop playsInline
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* corner brackets — top left */}
                            <div className="absolute top-2 left-2 z-20 h-10 w-10 border-t-4 border-l-4 border-black" />
                            <div className="absolute top-2 left-2 z-20 h-14 w-14 border-t border-l border-white/70" />

                            {/* corner brackets — bottom right */}
                            <div className="absolute right-2 bottom-2 z-20 h-10 w-10 border-r-4 border-b-4 border-black" />
                            <div className="absolute right-2 bottom-2 z-20 h-14 w-14 border-r border-b border-white/70" />

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
    );
}