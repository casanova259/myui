"use client";

import { motion, useInView, LayoutGroup } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CHARS = "!@#$%^&*():{};|,.<>/?01";
const PHRASES = [
    "STATE_PROCESSING",
    "VECTOR_FRAMEWORK",
    "GEOMETRY_MAPPED",
    "NODE_ALPHA_SYNC",
    "RENDER_PIPELINE",
];

// const playSound = () => {
//     if (typeof window !== "undefined") {
//         const audio = new Audio("sound3.m4a");
//         audio.currentTime = 0;
//         audio.play().catch(() => {
//             // Safe catch handler for strict browser autoplay restriction policies
//         });
//     }
// };

function ScrambleText() {
    const [text, setText] = useState(PHRASES[0]);
    const phraseRef = useRef(0);
    const posRef = useRef(0);

    // useEffect(() => {
    //     if (posRef.current === 0) {
    //         playSound();
    //     }
    // }, [triggerToggle]);

    useEffect(() => {
        let raf: number;

        const tick = () => {
            const target = PHRASES[phraseRef.current];
            const pos = posRef.current;

            const scrambled = target
                .split("")
                .map((char, i) => {
                    if (char === "_") return "_";
                    if (pos > i * 1.8) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");

            setText(scrambled);
            posRef.current += 0.6;

            if (posRef.current > target.length * 1.8 + 8) {
                setTimeout(() => {
                    phraseRef.current = (phraseRef.current + 1) % PHRASES.length;
                    posRef.current = 0;
                    // playSound();
                    raf = requestAnimationFrame(tick);
                }, 900);
                return;
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <span className="font-mono text-[10px] tracking-[0.18em] text-white/30 whitespace-nowrap select-none text-left">
            {text}
        </span>
    );
}

function LeftMain() {
    return (
        <svg viewBox="0 0 176 198" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path fill="#08090A" stroke="#ffffff" strokeWidth="0.8"
                d="M84.534 5a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v73.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0L34.323 109.87a3.75 3.75 0 0 1-2.074-3.354V33.459a3.75 3.75 0 0 1 2.073-3.354z" />
            <path stroke="#ffffff" strokeLinecap="round" strokeWidth="0.8" d="m38 33 46.422 23.211a8 8 0 0 0 7.156 0L138 33" />
        </svg>
    );
}

function RightMain() {
    return (
        <svg viewBox="0 0 176 198" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path fill="#08090A" stroke="#ffffff" strokeWidth="0.8"
                d="M84.534 5a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v73.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0L34.323 109.87a3.75 3.75 0 0 1-2.074-3.354V33.459a3.75 3.75 0 0 1 2.073-3.354z" />
            <path stroke="#ffffff" strokeLinecap="round" strokeWidth="0.8" d="m38 33 46.422 23.211a8 8 0 0 0 7.156 0L138 33" />
        </svg>
    );
}

function BottomFront() {
    return (
        <svg viewBox="0 0 176 198" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path fill="#08090A" stroke="#ffffff" strokeWidth="0.8"
                d="M84.534 5a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v73.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0L34.323 109.87a3.75 3.75 0 0 1-2.074-3.354V33.459a3.75 3.75 0 0 1 2.073-3.354z" />
            <path stroke="#ffffff" strokeLinecap="round" strokeWidth="0.8" d="m38 33 46.422 23.211a8 8 0 0 0 7.156 0L138 33" />
        </svg>
    );
}

const BLOCK_IDS = ["left-main", "right-main", "bottom-front"];
const BLOCK_SHAPES = [<LeftMain key="l" />, <RightMain key="r" />, <BottomFront key="b" />];

// Balanced isometric coordinate mapping inside the layout area
const SLOTS = [
    { bottom: "10%", left: "4%" },
    { bottom: "10%", left: "50%" },
    { bottom: "20%", left: "27%" },
];

export default function NodeGroupVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10px" });
    const [slotAssignment, setSlotAssignment] = useState([0, 1, 2]);
    const [shuffleToggle, setShuffleToggle] = useState(false);

    useEffect(() => {
        if (!isInView) return;
        const id = setInterval(() => {
            setSlotAssignment(prev => {
                const next = [...prev];
                const a = Math.floor(Math.random() * 3);
                let b = Math.floor(Math.random() * 2);
                if (b >= a) b++;
                [next[a], next[b]] = [next[b], next[a]];
                return next;
            });
            setShuffleToggle(p => !p);
        }, 1400);
        return () => clearInterval(id);
    }, [isInView]);

    return (
        <div ref={ref} className="w-full h-full bg-[#08090A] flex flex-col justify-between relative select-none">

            {/* Top Subtle Identification Tag */}
            <div className="w-full px-4 pt-3 pb-1 flex items-center justify-between z-10 pointer-events-none">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.2 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-[8px] tracking-[0.2em] text-white uppercase font-bold font-mono"
                >
                    Node-Group Alpha
                </motion.span>
            </div>

            {/* Main Isometric Layout Area */}
            <div className="relative  w-full flex items-center justify-center px-4 ">
                <div className="relative w-full max-w-[280px] aspect-[304/281] flex items-center justify-center">

                    {/* Static Background Blueprint Grid Block */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 304 281"
                        fill="none"
                        className="absolute inset-0 w-full h-full z-0 block pointer-events-none"
                        style={{ opacity: 0.2 }}
                    >
                        <motion.g
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <path fill="#08090A" stroke="#ffffff" strokeWidth="0.5"
                                d="M148.534 1.068a7.75 7.75 0 0 1 6.932 0l50.211 25.106a3.75 3.75 0 0 1 2.073 3.354v125.056c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.21-25.105a3.75 3.75 0 0 1-2.074-3.354V29.528a3.75 3.75 0 0 1 2.073-3.354z" />
                            <path stroke="#ffffff" strokeLinecap="round" strokeWidth="0.5"
                                d="m102 30.056 46.422 23.21a8 8 0 0 0 7.156 0L202 30.057" />
                        </motion.g>
                    </svg>

                    {/* Shuffling Foreground Interactive Layer */}
                    <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                        <LayoutGroup>
                            {SLOTS.map((slot, slotIdx) => {
                                const blockIdx = slotAssignment[slotIdx];
                                return (
                                    <motion.div
                                        key={BLOCK_IDS[blockIdx]}
                                        layoutId={BLOCK_IDS[blockIdx]}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            layout: { type: "spring", stiffness: 220, damping: 26 },
                                            opacity: { duration: 0.3 },
                                        }}
                                        style={slot}
                                        className="absolute w-[46%] aspect-[176/198] pointer-events-auto"
                                    >
                                        {BLOCK_SHAPES[blockIdx]}
                                    </motion.div>
                                );
                            })}
                        </LayoutGroup>
                    </div>

                </div>
            </div>

            {/* Anchored Bottom Live Text Status Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="relative z-30 w-full h-9 border-t border-white/5 flex items-center justify-start px-4  bg-[#08090A]"
            >
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0"
                />
                <ScrambleText />
            </motion.div>
        </div>
    );
}