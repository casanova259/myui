"use client";



import { useRef, useState } from "react";
import { gsap, Flip } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

import { Notebook, SquareActivity, Zap } from "lucide-react";

const itemSizes: Record<string, number> = {
    notebook: 375,
    github: 200,
    figma: 150,
    motion: 150,
    gsap: 200,
    image6: 325,
};

const arrangements = {
    chaos: {
        header: { x: 50, y: 47.5, center: true },
        items: [
            { id: "notebook", x: -2.5, y: -2.5, rotation: -10 },
            { id: "github", x: 72.5, y: 5, rotation: 5 },
            { id: "figma", x: 20, y: 15, rotation: -8 },
            { id: "motion", x: 80, y: 60, rotation: 15 },
            { id: "gsap", x: 65, y: 75, rotation: -5 },
            { id: "image6", x: 5, y: 65, rotation: -35 },
        ],
    },
    cleanup: {
        header: { x: 70, y: 37.5, center: false },
        items: [
            { id: "notebook", x: 76.5, y: -5, rotation: 0 },
            { id: "github", x: 64.5, y: 6, rotation: 0 },
            { id: "figma", x: 0, y: 47.5, rotation: 0 },
            { id: "motion", x: 34.5, y: 59, rotation: 0 },
            { id: "gsap", x: 24.5, y: 33, rotation: 0 },
            { id: "image6", x: 9, y: -3.5, rotation: 0 },
        ],
    },
    notebook: {
        header: { x: 50, y: 47.5, center: true },
        items: [
            { id: "notebook", x: 45, y: 0.5, rotation: 20 },
            { id: "github", x: 65, y: 70, rotation: 25 },
            { id: "figma", x: 27.5, y: 15, rotation: 10 },
            { id: "motion", x: 30, y: 57.5, rotation: 10 },
            { id: "gsap", x: 25, y: 40, rotation: 10 },
            { id: "image6", x: 10, y: 10, rotation: -30 },
        ],
    },
} as const;

export default function Desk() {
    const deskRef = useRef<HTMLElement>(null);
    const [activeMode, setActiveMode] = useState<keyof typeof arrangements>("chaos");

    const setLayout = (mode: keyof typeof arrangements) => {
        const desk = deskRef.current;
        if (!desk) return;

        const header = desk.querySelector<HTMLElement>(".header");
        if (!header) return;

        const deskWidth = desk.offsetWidth;
        const deskHeight = desk.offsetHeight;
        const layout = arrangements[mode];
        const isMobile = deskWidth < 1000;

        const offsetX = isMobile
            ? header.offsetWidth / 2
            : layout.header.center
                ? header.offsetWidth / 2
                : 0;

        const offsetY = isMobile
            ? header.offsetHeight / 2
            : layout.header.center
                ? header.offsetHeight / 2
                : 0;

        const headerX = isMobile ? 50 : layout.header.x;
        const headerY = isMobile ? 47.5 : layout.header.y;

        gsap.set(header, {
            x: (headerX / 100) * deskWidth - offsetX,
            y: (headerY / 100) * deskHeight - offsetY,
            rotation: 0,
        });

        layout.items.forEach(({ id, x, y, rotation }) => {
            gsap.set(`#${id}`, {
                x: (x / 100) * deskWidth,
                y: (y / 100) * deskHeight,
                width: itemSizes[id],
                height: itemSizes[id],
                rotation,
            });
        });
    };

    useGSAP(
        () => {
            setLayout(activeMode);

            const handleResize = () => setLayout(activeMode);
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        },
        { scope: deskRef, dependencies: [activeMode] }
    );

    const switchMode = (mode: keyof typeof arrangements) => {
        if (mode === activeMode) return;

        const desk = deskRef.current;
        if (!desk) return;

        const header = desk.querySelector(".header");
        const items = gsap.utils.toArray<Element>(".item", desk);
        const flipTargets = [header, ...items].filter(Boolean);

        const state = Flip.getState(flipTargets);
        setLayout(mode);

        Flip.from(state, {
            duration: 1.25,
            ease: "power3.inOut",
            stagger: { amount: 0.1, from: "center" },
            absolute: true,
        });

        setActiveMode(mode);
    };

    return (
        <section className="desk" ref={deskRef} data-mode={activeMode}>
            <div className="header">
                <h1>Manik Sharma</h1>
                <p>
                    I make the web feel alive
                    <br />
                    Controlled chaos, shipped to prod
                </p>
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
                <img src="/images2/img6.jpg" alt="Image 6" />
            </div>

            <div className="modes">
                <button className={activeMode === "chaos" ? "active" : ""} onClick={() => switchMode("chaos")}>
                    <Zap />
                </button>
                <button className={activeMode === "cleanup" ? "active" : ""} onClick={() => switchMode("cleanup")}>
                    <SquareActivity />
                </button>
                <button className={activeMode === "notebook" ? "active" : ""} onClick={() => switchMode("notebook")}>
                    <Notebook />
                </button>
            </div>
        </section>
    );
}