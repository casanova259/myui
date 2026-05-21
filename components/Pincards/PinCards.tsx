"use client"; // Required if you are using Next.js App Router

import { useRef } from "react";

export default function SectionItoshiRin() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    };

    return (
        <section data-section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            <div className="absolute bg-[#8be8bd]/65 flex items-center justify-center h-full w-full">

                {/* watermark */}
                <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none flex items-center justify-center">
                    <span className="text-[40svh] leading-none font-black whitespace-nowrap text-black font-monster-beast">
                        RIN
                    </span>
                </div>

                {/* content */}
                <div className="relative z-10 flex flex-col md:flex-row gap-64 h-[80vh]">

                    <div className="flex flex-1 flex-col items-start justify-center gap-4 pb-6 md:pb-8 mt-8 ">
                        <span className="text-sm font-bold text-[#161616] uppercase tracking-widest font-monster-beast">
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
                            <span className=" text-xs font-bold tracking-widest text-black/80 uppercase font-monster-beast">
                                NO 1 Bluelock XI
                            </span>
                        </div>
                    </div>

                    {/* right col */}
                    <div className="order-1 flex flex-1 items-center justify-center pt-12 md:order-2 md:pt-0">
                        <div className="relative h-[50vh] w-[20vw] p-4 md:w-[25vw]">

                            {/* two decorative offset borders behind */}
                            <div className="absolute inset-0 z-0 rotate-3 border border-dashed border-black opacity-60" />
                            <div className="absolute inset-0 z-0 -rotate-2 border-[1.5px] border-black opacity-40" />

                            {/* main video box */}
                            <div
                                className="relative z-10 h-full w-full overflow-hidden border-2 border-white bg-[#7a8074] outline outline-black/90 cursor-pointer"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                /* Added an onClick to force user interaction if audio is blocked */
                                onClick={handleMouseEnter}
                            >
                                <video
                                    ref={videoRef}
                                    controls={false}
                                    src="/Videos/RIn.mp4"
                                    autoPlay
                                    muted // Must start muted for autoplay to work
                                    loop
                                    playsInline // Required for iOS autoplay
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
                                    LIMITLESS / BEAST
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const SectionShiedo = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    };
    return (
        <section data-section className="relative min-h-screen   w-full overflow-hidden">

            <div className="absolute inset-[-25%]  flex items-center justify-center bg-red-500">

                <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none  flex items-center justify-center">
                    <span className="text-[30svh] leading-none font-black whitespace-wrap text-black font-monster-beast">
                        BERSERK
                    </span>
                </div>


                {/* Content */}

                <div className="relative z-10 flex h-full w-full flex-col gap-4  md:flex-row md:p-12">

                    <div className="order-2 flex w-[30%] items-center justify-center ml-72 pt-12 md:order-1 md:pt-0 ">

                        <div className="relative h-[50vh] w-[20vw] p-4 md:w-[25vw]  ">
                            <div className="absolute inset-0 -bottom-6 -left-6 z-0 bg-linear-to-tr from-black via-[#000000] to-black" />
                            <div className="absolute inset-0 z-0 border border-neutral-700/60" />

                            <div className="absolute top-0 right-0 z-20 h-12 w-12 border-t-2 border-r-2 border-neutral-500" />


                            <div className="absolute bottom-0 left-0 z-20 h-12 w-12 border-b-2 border-l-2 border-neutral-500" />
                            <div className="relative z-10 h-full w-full overflow-hidden border border-neutral-600 bg-[#0a0a0a] shadow-2xl"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <video
                                    ref={videoRef}
                                    src="/Videos/SHEIDO.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    className=" absolute h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                            </div>
                            <div className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 bg-black px-4 py-0.5 whitespace-nowrap">
                                <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-white uppercase">
                                    BERSERK / CRAZY
                                </span>
                            </div>


                        </div>


                    </div>

                    <div className="order-1 flex flex-1/4 flex-col items-start justify-center gap-2 pb-8 md:order-2 md:pb-12">
                        <span className="text-sm font-bold text-neutral-100 uppercase tracking-widest font-monster-beast">
                            BERSERK
                        </span>
                        <h1 className="text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase text-white font-monster-beast">
                            SHIDOU<br />
                            <span className="text-[#F5E3DB]">RYUSEI</span>
                        </h1>
                        <p className="max-w-xl text-[1.25rem] leading-tight font-medium text-neutral-300 md:text-[1.65rem] font-monster-beast">
                            Hey genius, is a lifeform like me not enough of a reason for you to fight?
                        </p>
                    </div>
                </div>
            </div>


        </section>
    )
}
export const SectionIsagi = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    };

    return (
        <section data-section className="relative h-svh min-h-svh  w-full overflow-hidden flex items-center justify-center">

            <div className="absolute bg-[#649BE1] flex items-center justify-center h-full w-full">

                {/* watermark */}
                <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none flex items-center justify-center">
                    <span className="text-[40svh] leading-none font-black whitespace-nowrap text-black font-monster-beast">
                        ISAGI
                    </span>
                </div>

                {/* content */}
                <div className="relative z-10 flex flex-col md:flex-row gap-64 h-[80vh]">

                    {/* LEFT — text */}
                    <div className="flex flex-1 flex-col items-start justify-center gap-4 pb-6 md:pb-8 mt-8">
                        <span className="text-sm font-bold text-neutral-100 uppercase tracking-widest font-monster-beast">
                            BERSERK
                        </span>
                        <h1 className="mt-2 text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase text-white font-monster-beast">
                            ISAGI <br />
                            <span className="text-[#27303C]">YOICHI</span>
                        </h1>
                        <p className="max-w-xl text-[1.25rem] leading-tight font-medium text-neutral-900 md:text-[1.65rem] font-monster-beast">
                            So this is what it means to win. I don’t know what this feeling is… but I like it!”
                        </p>
                        <div className="mt-2 border border-black/30 bg-white px-3 py-1">
                            <span className="text-xs font-bold tracking-widest text-black/80 uppercase font-monster-beast">
                                STRIKER — BLUELOCK XI
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — video frame */}
                    <div className="order-1 flex flex-1 items-center justify-center pt-12 md:order-2 md:pt-0">
                        <div className="relative h-[50vh] w-[20vw] p-4 md:w-[25vw]">

                            {/* two decorative offset borders */}
                            <div className="absolute inset-0 z-0 rotate-3 border border-dashed border-black opacity-60" />
                            <div className="absolute inset-0 z-0 -rotate-2 border-[1.5px] border-black opacity-40" />

                            {/* main video box */}
                            <div
                                className="relative z-10 h-full w-full overflow-hidden border-2 border-white bg-[#7a8074] outline outline-black/90"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <video
                                    ref={videoRef}
                                    src="/Videos/ISHAGI.mp4"
                                    autoPlay muted loop playsInline
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
                                    METAVISION / DIRECT SHOT
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};
export const SectionBaro = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    };

    return (
        <section data-section className="relative h-svh min-h-svh  w-full overflow-hidden flex items-center justify-center">

            <div className="absolute bg-[#F6DC0E] flex items-center justify-center h-full w-full">

                {/* watermark */}
                <div className="absolute inset-0 z-0 opacity-[0.20] pointer-events-none flex items-center justify-center">
                    <span className="text-[40svh] leading-none font-black whitespace-nowrap text-red-500 font-monster-beast">
                        KING
                    </span>
                </div>

                {/* content */}
                <div className="relative z-10 flex flex-col md:flex-row gap-64 h-[80vh]">

                    {/* LEFT — text */}
                    <div className="flex flex-1 flex-col items-start justify-center gap-4 pb-6 md:pb-8 mt-8">
                        <span className="text-sm font-bold text-red-700 uppercase tracking-widest font-monster-beast">
                            KING
                        </span>
                        <h1 className="mt-2 text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase text-red-500 font-monster-beast">
                            Shoei  <br />
                            <span className="text-[#1d1717]">BARO</span>
                        </h1>
                        <p className="max-w-xl text-[1.25rem] leading-tight font-medium text-black md:text-[1.65rem] font-monster-beast">
                            While you stood in the light, I was the shadow you didn't see. Now it's time for the darkness to devour you!
                        </p>
                        <div className="mt-2 border border-black/30 bg-red-500 px-3 py-1">
                            <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase font-monster-beast">
                                KING — BLUELOCK XI
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — video frame */}
                    <div className="order-1 flex flex-1 items-center justify-center pt-12 md:order-2 md:pt-0">
                        <div className="relative h-[50vh] w-[20vw] p-4 md:w-[25vw]">

                            {/* two decorative offset borders */}
                            <div className="absolute inset-0 z-0 rotate-3 border border-dashed border-black opacity-60" />
                            <div className="absolute inset-0 z-0 -rotate-2 border-[1.5px] border-black opacity-100 bg-black" />

                            {/* main video box */}
                            <div
                                className="relative z-10 h-full w-full overflow-hidden border-2 border-white bg-[#7a8074] outline outline-black/90"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <video
                                    ref={videoRef}
                                    src="/Videos/BARO.mp4"
                                    autoPlay muted loop playsInline
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
                            <div className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 bg-red-500 px-4 py-0.5 whitespace-nowrap">
                                <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-white uppercase">
                                    KING
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};
export const SectionNagi = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    };
    return (
        <section data-section className="relative  h-screen  w-full overflow-hidden">

            <div className="absolute inset-[-25%]  flex items-center justify-center bg-[#E5DED4]">

                <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none  flex items-center justify-center">
                    <span className="text-[50svh] leading-none font-black whitespace-wrap text-black font-monster-beast">
                        NAGI
                    </span>
                </div>


                {/* Content */}

                <div className="relative z-10 flex h-full w-full items-center justify-center  ">

                    <div className=" flex w-[45vw] items-center justify-center pr-6 "

                    >


                        <div className="relative h-[50vh] w-[20vw] p-4 md:w-[25vw]  ">
                            <div className="absolute inset-0 -bottom-6 -left-6 z-0 bg-linear-to-tr from-black via-[#000000] to-black" />
                            <div className="absolute inset-0 z-0 border border-neutral-700/60" />

                            <div className="absolute top-0 right-0 z-20 h-12 w-12 border-t-2 border-r-2 border-neutral-500" />


                            <div className="absolute bottom-0 left-0 z-20 h-12 w-12 border-b-2 border-l-2 border-neutral-500" />
                            <div className="relative z-10 h-full w-full overflow-hidden border border-neutral-600 bg-[#0a0a0a] shadow-2xl"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <video
                                    ref={videoRef}
                                    src="/videos/Nagi.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    className=" absolute h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                            </div>

                            <div className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 bg-black px-4 py-0.5 whitespace-nowrap">
                                <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-white uppercase">
                                    No hassale
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className=" flex w-[60vw] flex-col items-start justify-center gap-2 pb-8  mr-8">
                        <span className="text-sm font-bold text-black uppercase tracking-widest font-monster-beast">
                            MR. HASSLEMAN
                        </span>
                        <h1 className="text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase text-[#184B84] text-wrap font-monster-beast">
                            Hassle <br />
                            <span className="text-[#3178AE]">Nagi</span>
                        </h1>
                        <p className="max-w-xl text-[1.25rem] leading-tight font-medium text-[#0F243D] md:text-[1.65rem] font-monster-beast">
                            You talk too much for someone who lost. I'm gonna beat you and make you my servant
                        </p>
                    </div>
                </div>
            </div>


        </section>
    )
}