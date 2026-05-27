"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LenisSmoothScroll from '@/components/SmoothScroll/lenis';

// Register ScrollTrigger so GSAP knows how to use it
gsap.registerPlugin(ScrollTrigger);

export default function DepthScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We use an array of refs to target each of the 9 sections dynamically
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Array of 9 dummy sections to map through
    const sectionsData = [
        { id: 1, color: "bg-blue-600", title: "Section 01" },
        { id: 2, color: "bg-purple-600", title: "Section 02" },
        { id: 3, color: "bg-pink-600", title: "Section 03" },
        { id: 4, color: "bg-rose-600", title: "Section 04" },
        { id: 5, color: "bg-orange-600", title: "Section 05" },
        { id: 6, color: "bg-amber-500", title: "Section 06" },
        { id: 7, color: "bg-green-600", title: "Section 07" },
        { id: 8, color: "bg-teal-600", title: "Section 08" },
        { id: 9, color: "bg-zinc-800", title: "The Core" },
    ];

    useEffect(() => {
        // gsap.context() is crucial in React to cleanly map and revert animations
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=10000", // The higher this number, the longer the user has to scroll
                    scrub: 1, // Smooth scrubbing tied to the scrollbar
                    pin: true, // Pins the container in place while animating
                }
            });

            // Animate each section sequentially
            sectionsRef.current.forEach((section, index) => {
                // We don't animate the very last section so it stays on screen at the end
                tl.to(section, {
                    scale: 15,
                    opacity: 0,
                    filter: "blur(30px)", // Blurs out as it hits the camera
                    ease: "power1.inOut"
                }, index);
            });

        }, containerRef);

        // Cleanup function prevents memory leaks and duplicate ScrollTriggers in Next.js
        return () => ctx.revert();
    }, []);

    return (
        // Spacer div to give us room to scroll before hitting the animation
        <main className="bg-zinc-900 overflow-x-hidden">
            <LenisSmoothScroll />
            <div className="h-screen flex items-center justify-center text-white text-2xl">
                Scroll down to dive in &darr;
            </div>

            {/* The Pinned Container */}
            <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">

                {sectionsData.map((section, index) => (
                    <div
                        key={section.id}
                        // Assign the element to our ref array
                        ref={(el) => {
                            sectionsRef.current[index] = el;
                        }}
                        // absolute positioning stacks them. z-index decreases so the first item is on top
                        className={`absolute flex items-center justify-center w-[60vw] h-[60vh] rounded-3xl shadow-2xl ${section.color}`}
                        style={{ zIndex: 10 - index }}
                    >
                        <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter">
                            {section.title}
                        </h2>
                    </div>
                ))}

            </div>

            {/* Spacer div so you can scroll away after the animation ends */}
            <div className="h-screen flex items-center justify-center text-white text-2xl">
                You made it to the other side.
            </div>
        </main>
    );
}