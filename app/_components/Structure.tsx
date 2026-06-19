"use client";

import { useEffect, useRef } from "react";
import { Preloader } from "./Preloader";
import { Hero } from "./Hero";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, SplitText);

CustomEase.create("hop", "0.8, 0, 0.2, 1");
CustomEase.create("hop2", "0.9, 0, 0.1, 1");

export const Structure = () => {
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // --- SplitText ---
        const preloaderHeaderSplit = SplitText.create(".preloader-header h1", {
            type: "chars",
            charsClass: "char",
            mask: "chars",
        });

        const headerSplit = SplitText.create(".header h1", {
            type: "chars",
            charsClass: "char",
        });

        const footerSplit = SplitText.create(".hero-footer p", {
            type: "words",
            wordsClass: "word",
            mask: "words",
        });

        // --- Random initial rotations for images ---
        const preloaderImgInitRotations: number[] = [];
        document.querySelectorAll(".preloader-img").forEach(() => {
            preloaderImgInitRotations.push(gsap.utils.random(-15, 15));
        });

        gsap.set(".preloader-img", {
            rotate: (i: number) => preloaderImgInitRotations[i],
        });

        // --- Timeline ---
        const tl = gsap.timeline({ delay: 0.5 });

        // 1. Images scale in + clip-path reveal
        tl.to(".preloader-img", {
            scale: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
            stagger: 0.2,
        });

        // 2. Preloader header chars animate in
        tl.to(
            ".preloader-header h1 .char",
            {
                y: "0%",
                duration: 1,
                ease: "hop2",
                stagger: { each: 0.125, from: "random" },
            },
            "0.35"
        );

        // 3. Counter slide in (y: 0)
        tl.to(
            ".preloader-counter p",
            {
                y: "0%",
                duration: 1,
                ease: "hop2",
                onStart: () => {
                    const counterEl = document.querySelector(
                        ".preloader-counter p"
                    ) as HTMLElement;
                    const counter = { value: 0 };

                    gsap.to(counter, {
                        value: 100,
                        duration: 2,
                        delay: 0.5,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            counterEl.textContent = String(
                                Math.round(counter.value)
                            ).padStart(3, "0");
                        },
                    });
                },
            },
            "<"
        );

        // 4. Counter slide out
        tl.to(
            ".preloader-counter p",
            {
                y: "-100%",
                duration: 0.75,
                ease: "hop2",
            },
            3.25
        );

        // 5. Preloader header chars animate out
        tl.to(
            ".preloader-header h1 .char",
            {
                y: "-100%",
                duration: 0.75,
                ease: "hop2",
                stagger: { each: 0.125, from: "random" },
            },
            3.25
        );

        // 6. Images scale out + clip back
        tl.to(
            ".preloader-img",
            {
                scale: 0,
                clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
                duration: 1,
                ease: "hop2",
                stagger: -0.075,
            },
            3.5
        );

        // 7. Preloader clip-path exit (wipe up)
        tl.to(
            ".preloader",
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "hop2",
            },
            4.35
        );

        // 8. Hero header chars reveal
        tl.to(
            ".header h1 .char",
            {
                y: "0%",
                duration: 1,
                ease: "hop",
                stagger: { each: 0.075, from: "random" },
            },
            4.65
        );

        // 9. Hero footer words slide up
        tl.to(
            ".hero-footer p .word",
            {
                y: "0%",
                duration: 1,
                ease: "hop",
                stagger: 0.075,
            },
            4.75
        );
    }, []);

    return (
        <>
            <Preloader />
            <Hero />
        </>
    );
};