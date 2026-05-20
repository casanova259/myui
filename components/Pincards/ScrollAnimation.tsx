"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
    useEffect(() => {
        const sections = document.querySelectorAll("[data-section]");

        sections.forEach((section, i) => {
            // pin each section
            ScrollTrigger.create({
                trigger: section,
                start: "start top",
                end: "+=100%",
                pin: true,
                scrub: 1,
                pinSpacing: false,
            });

            // incoming card rotates from 15deg to 0 as it enters
            if (i !== 0) {
                gsap.from(section, {
                    rotation: 15,           // starts tilted, straightens as it arrives
                    scale: 0.9,
                    transformOrigin: "bottom left",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",  // when top of section hits bottom of viewport
                        end: "top top",       // when it fully covers the screen
                        scrub: 1,
                    },
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return null;
}