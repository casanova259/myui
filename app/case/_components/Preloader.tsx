"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
    // Setup Refs for GSAP targeting
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Create a master timeline for the preloader sequence
        const tl = gsap.timeline();

        // 1. Reveal Text: Slide "LOADING" and "0" up from hidden overflow
        tl.to([titleRef.current, counterRef.current], {
            y: "0%",
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
        });

        // 2. Chunky Counter: Animate a proxy object from 0 to 100
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 3,
            ease: "steps(14)", // Gives it that brutalist, stepped feel
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(counterObj.value).toString();
                }
            },
        });

        // 3. Clip-Path Reveal: Shrink the white background away to reveal black/video
        tl.to(bgRef.current, {
            clipPath: "inset(100% 0rem 0rem 0rem)",
            duration: 1,
            ease: "expo.inOut",
        });

        // 4. Cleanup: Hide the preloader completely once finished to allow interaction with the page below
        tl.set(containerRef.current, {
            display: "none"
        });

    }, { scope: containerRef }); // Scope ensures GSAP only selects elements within this component

    return (
        <div
            ref={containerRef}
            className="preloader fixed w-screen h-[100svh] left-0 top-0 z-40 bg-black text-black"
        >
            {/* Structural SVG from original HTML */}
            <img
                src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect width='1' height='1' fill='white'/></svg>"
                alt=""
                aria-hidden="true"
                width="1"
                height="1"
                className="fixed top-0 left-0 opacity-0 pointer-events-none"
            />

            {/* Video container placeholder for later */}
            <div className="preloader__video absolute -z-10 size-full sm:block hidden"></div>

            <div className="h-full">
                <div className="preloader__grid relative h-full">

                    {/* The white background that creates the framed effect and eventually clips away */}
                    <div
                        ref={bgRef}
                        className="preloader__background absolute top-0 left-0 size-full bg-white -z-10"
                        style={{
                            willChange: 'auto',
                            clipPath: 'inset(2.5rem 2.5rem 2.5rem 2.5rem)'
                        }}
                    ></div>

                    <div className="h-[100svh] flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-y-12 px-12 sm:px-48">

                        <div className="overflow-hidden">
                            <div
                                ref={titleRef}
                                className="preloader__progress__title text-lg font-medium uppercase translate-y-[105%]"
                            >
                                Loading
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            <div
                                ref={counterRef}
                                className="preloader__progress__percentage text-lg font-medium uppercase translate-y-[105%]"
                            >
                                0
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}