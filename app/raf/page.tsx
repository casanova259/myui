"use client";

import React, { useRef, useEffect } from 'react';
import { Inter } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LenisSmoothScroll from '@/components/SmoothScroll/lenis';
import RawCanvas from '@/components/momentumgraph/scrib';
import NodeGroupVisual from '@/components/momentumgraph/statecom';
import CinematicWireframe from '@/components/momentumgraph/cine';
import InteractiveBiometricScan from '@/components/momentumgraph/perserve';
import BlurToSharpBiometricScan from '@/components/momentumgraph/perserve';
import BulletproofScan from '@/components/momentumgraph/perserve';
import IdentityVault from '@/components/momentumgraph/perserve';
import LiquidGlassScan from '@/components/momentumgraph/perserve';
import { MomentumChart } from '@/components/momentumgraph/momentumgraph';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

gsap.registerPlugin(ScrollTrigger);

export default function TraceDepthScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Trace "Secret Sauce" Narrative Data
    const sectionsData = [
        {
            id: 1,
            // Lined paper aesthetic
            color: "bg-[#fdfbf7] text-zinc-900",
            step: "Phase 01 // Ingestion",
            title: "The Raw Canvas",
            description: "Upload your hand-drawn pencil illustrations directly on notebook paper. Trace instantly parses your red and yellow pen annotations, rough doodles, and directional arrows to understand your layout intent.",
            imagePlaceholder: "bg-[#f4f1ea] border-zinc-300",
            comp: <RawCanvas />
        },
        {
            id: 2,
            // Technical / Computational Dark Mode
            color: "bg-zinc-900 text-zinc-100",
            step: "Phase 02 // Structure",
            title: "State Processing",
            description: "The engine runs the visual input through advanced computational models. Using state machine logic, it maps the underlying geometry to create a mathematically precise vector framework before rendering.",
            imagePlaceholder: "bg-zinc-800 border-zinc-700"
            ,
            comp: <NodeGroupVisual />
        },
        {
            id: 3,
            // Golden Hour / Cinematic Warmth
            color: "bg-orange-950 text-orange-50",
            step: "Phase 03 // Environment",
            title: "Cinematic Simulation",
            description: "Real-world physics are applied to the wireframe. Trace simulates golden hour sunlight, dramatic cinematic lighting, warm color grading, and a shallow depth of field for absolute realism.",
            imagePlaceholder: "bg-orange-900/50 border-orange-800",
            comp: <CinematicWireframe />
        },
        {
            id: 4,
            // High-Fashion / Fine-Art Black
            color: "bg-black text-zinc-100",
            step: "The Core // Trace",
            title: "Perfect Preservation",
            description: "The final editorial asset emerges with sharp focus. The original identity—facial structure, eyes, nose, lips, skin tone, and expression—is preserved exactly, elevated to an ultra-realistic masterpiece.",
            imagePlaceholder: "bg-zinc-950 border-zinc-800",
            comp: <MomentumChart />
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 0.5,
                    pin: true,
                }
            });

            sectionsRef.current.forEach((section, index) => {
                if (index === sectionsRef.current.length - 1) return;

                tl.to(section, {
                    scale: 12,
                    // 1. Swap 'opacity' for 'autoAlpha'
                    // autoAlpha automatically toggles visibility: hidden when it hits 0
                    autoAlpha: 0,
                    // 2. Strip pointer events immediately as it starts zooming past the camera
                    pointerEvents: "none",
                    ease: "power1.inOut"
                }, index);
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className={`bg-black text-white overflow-x-hidden ${inter.className}`}>
            <LenisSmoothScroll />

            {/* Intro Header */}
            <div className="h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-xs font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-4">
                    Powered by Trace Studio
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    From Sketch to Studio.
                </h1>
                <p className="text-zinc-500 text-sm tracking-wide animate-pulse">
                    Scroll to see the engine at work &darr;
                </p>
            </div>

            {/* The 3D Pinned Viewport Container */}
            <div
                ref={containerRef}
                className="relative h-screen w-full flex items-center justify-center overflow-hidden"
                style={{ perspective: "1000px" }}
            >
                {sectionsData.map((section, index) => (
                    <div
                        key={section.id}
                        ref={(el) => { sectionsRef.current[index] = el; }}
                        className={`absolute flex flex-col md:flex-row items-center justify-between w-[85vw] h-[70vh] md:w-[65vw] md:h-[60vh] rounded-3xl p-8 md:p-12 ${section.color}`}
                        style={{
                            zIndex: 10 - index,
                            willChange: "transform, opacity",
                            // Added subtle drop shadow for better layer separation
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        {/* Left Side: Copy & Narrative */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center h-full pr-0 md:pr-12">
                            <span className="text-xs font-semibold tracking-[0.15em] opacity-60 mb-4 block uppercase">
                                {section.step}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
                                {section.title}
                            </h2>
                            <p className="text-base md:text-lg opacity-80 leading-relaxed max-w-md font-medium">
                                {section.description}
                            </p>
                        </div>

                        {/* Right Side: Massive Image Placeholder */}
                        <div className={`w-full md:w-1/2 h-48 md:h-full mt-8 md:mt-0 rounded-2xl border-2 border-dashed ${section.imagePlaceholder} flex flex-col items-center p-4 relative overflow-hidden`}>
                            <span className="text-sm font-semibold opacity-40 block mb-2 tracking-wide uppercase select-none">
                                {section.step}
                            </span>
                            {/* This container now captures the animation size dynamically */}
                            <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden rounded-xl">
                                {section.comp}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Outro Spacer */}
            <div className="h-screen flex items-center justify-center">
                <p className="text-zinc-500 text-sm tracking-widest uppercase">
                    Render Complete.
                </p>
            </div>
        </main>
    );
}