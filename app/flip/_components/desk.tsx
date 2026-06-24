"use client";


import { useEffect, useRef, useState } from "react";

import { Notebook, SquareActivity, Zap } from "lucide-react";

export default function Desk() {
    const deskRef = useRef<HTMLElement>(null);
    const [activeMode, setActiveMode] = useState("chaos");
    

    useEffect(() => {

        const desk = deskRef.current;
        if (!desk) return;

        const header = desk.querySelector(".header");
        const items = gsap.utils.toArray<Element>(".item", desk);
        const flipTargets = [header, ...items];

        const state = Flip.getState(flipTargets);
        desk.dataset.mode = activeMode;

        Flip.from(state, {
            duration: 0.8,
            ease: "expo.inOut",
            stagger: 0.05,
            absolute: true,
        });
    }, [activeMode]);

    return (
        <section className="desk" ref={deskRef} data-mode={activeMode}>
            <div className="header">
                <h1>Manik Sharma</h1>
                <p>I make the web feel alive<br />Controlled chaos, shipped to prod</p>
            </div>

            <div className="item" id="notebook">
                <img src="/img3/notebook.avif" alt="Notebook" />
            </div>
            <div className="item" id="github">
                <img src="/img3/github.jpeg" alt="GitHub" />
            </div>
            <div className="item" id="figma">
                <img src="/img3/figma.png" alt="Figma" />
            </div>
            <div className="item" id="motion">
                <img src="/img3/motion.png" alt="Motion" />
            </div>
            <div className="item" id="gsap">
                <img src="/img3/gsap.jpeg" alt="GSAP" />
            </div>
            <div className="item" id="image6">
                <img src="/img2/img6.jpg" alt="Image 6" />
            </div>

            <div className="modes">
                <button
                    className={activeMode === "chaos" ? "active" : ""}
                    onClick={() => setActiveMode("chaos")}
                >
                    <Zap />
                </button>
                <button
                    className={activeMode === "cleanup" ? "active" : ""}
                    onClick={() => setActiveMode("cleanup")}
                >
                    <SquareActivity />
                </button>
                <button
                    className={activeMode === "notebook" ? "active" : ""}
                    onClick={() => setActiveMode("notebook")}
                >
                    <Notebook />
                </button>
            </div>
        </section>
    );
}