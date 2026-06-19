"use client";

import { useRef } from "react";

export const Hero = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const footerItemsRef = useRef<HTMLParagraphElement[]>([]);

    return (
        <section
            className="relative w-full overflow-hidden bg-[#111111] text-[#f5f5f5]"
            style={{ height: "100svh" }}
        >
            {/* Header */}
            <div
                ref={headerRef}
                className="header absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full h-max overflow-hidden"
            >
                <h1 className="uppercase leading-[0.85] text-[clamp(2.5rem,15vw,25rem)]">
                    MaK MaD
                </h1>
            </div>

            {/* Footer */}
            <div className="hero-footer absolute bottom-0 w-full p-8 flex justify-between items-end overflow-hidden">
                {["Developer", "Someone", "Craft"].map((text, i) => (
                    <p
                        key={i}
                        ref={(el) => { if (el) footerItemsRef.current[i] = el; }}
                        className="[will-change:transform] text-[clamp(1rem,1.5vw,2rem)] leading-[0.85]"
                    >
                        {text}
                    </p>
                ))}
            </div>
        </section>
    );
};