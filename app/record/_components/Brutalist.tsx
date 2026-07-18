"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin safely for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dummy data mirroring the visual style of the reference
const CASES = [
  { id: 1, title: "Aerleum®", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200", tags: "We are / Archived" },
  { id: 2, title: "Merrell", src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200", tags: "Showreel" },
  { id: 3, title: "Ambrosia", src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1200", tags: "Digital Art" },
  { id: 4, title: "H. Blanck", src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200", tags: "Fine Art" },
  { id: 5, title: "Thin Air", src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200", tags: "Editorial" },
];

export default function BrutalistSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLElement>(".slider-image");
      if (!images.length) return;

      // The target expansion factor (e.g., scale up to 1.45x)
      const scaleExpanded = 1.45;

      // 1. Create the master timeline linked to the scroll progress of the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smoothly catches up with the scrollbar
        },
      });

      // 2. Build a coordinated sequence where each image scales up then down
      images.forEach((image, index) => {
        // Calculate a precise insertion point in the timeline sequence
        // This ensures the animation matches the item's appearance on screen
        const positionTime = index * 2; 

        // Animation A: Scale up to the spotlight size
        tl.to(
          image,
          {
            scaleX: scaleExpanded,
            scaleY: scaleExpanded,
            force3D: true,
            duration: 0.8,
            ease: "power1.inOut",
          },
          positionTime
        );

        // Animation B: Scale back down to baseline (1) after a slight holding delay
        tl.to(
          image,
          {
            scaleX: 1,
            scaleY: 1,
            force3D: true,
            duration: 1.2,
            ease: "power1.inOut",
          },
          `>+=0.2` // ">" targets the end of the previous scaleUp tween, "+=0.2" adds the delay hold
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-[#f4f4f2] text-black font-sans min-h-screen relative selection:bg-black selection:text-white">
      {/* Fixed UI Shell (Brutalist Typography Layout) */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start text-xs uppercase tracking-wider z-50 pointer-events-none mix-blend-difference text-white md:text-black md:mix-blend-normal">
        <div>Joffrey Spitzer</div>
        <nav className="pointer-events-auto">
          <a href="#about" className="hover:underline">About</a>
        </nav>
        <div className="text-right">
          Creative Developer<br />Strasbourg, France
        </div>
      </header>

      <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter">Cases</h1>
      </div>

      <div className="fixed bottom-6 right-6 text-xs uppercase tracking-wider text-right hidden md:block opacity-40">
        <ul className="space-y-1">
          {CASES.map((item) => (
            <li key={item.id} className="hover:opacity-100 transition-opacity cursor-pointer">
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      {/* 
        Scroll Track: 
        This wrapper dictates how long the scroll experience lasts.
        Adjust the `h-[...vh]` value to change how much scrolling it takes to cycle through items.
      */}
      <div ref={triggerRef} className="relative w-full h-[350vh] flex flex-col items-center">
        {/* Sticky viewport frame to keep the list centered while scrolling down */}
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
          
          {/* 
            The vertical feed container. 
            Large gaps prevent adjacent scaled-up elements from overlapping unappealingly.
          */}
          <div className="flex flex-col gap-32 md:gap-48 items-center w-full max-w-xl px-4 will-change-transform">
            {CASES.map((item) => (
              <div 
                key={item.id} 
                className="relative w-full aspect-[4/3] bg-neutral-200 overflow-visible"
              >
                {/* 
                  The layout boundary remains constant, but the inner container scales.
                  Using transforms (`scale`) bypasses expensive browser layout recalculations.
                */}
                <div className="slider-image w-full h-full relative origin-center will-change-transform shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-w-768px) 100vw, 600px"
                    className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                    priority={item.id <= 2}
                  />
                  {/* Subtle contextual labels */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase px-2 py-1 tracking-widest rounded-full opacity-0 md:opacity-100 transition-opacity">
                    {item.tags}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Buffer footer to ensure the final elements finish their cycles cleanly */}
      <footer className="h-[50vh] bg-[#f4f4f2]" />
    </div>
  );
}