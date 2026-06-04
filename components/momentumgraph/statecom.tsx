"use client";

import { motion, useInView, LayoutGroup } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ── Continuously scrambling text with Audio feedback ─────────────────────────
const CHARS = "!@#$%^&*():{};|,.<>/?01";
const PHRASES = [
    "STATE_PROCESSING",
    "VECTOR_FRAMEWORK",
    "GEOMETRY_MAPPED",
    "NODE_ALPHA_SYNC",
    "RENDER_PIPELINE",
];

function ScrambleText() {
    const [text, setText] = useState(PHRASES[0]);
    const phraseRef = useRef(0);
    const posRef = useRef(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize the audio file client-side
    useEffect(() => {
        audioRef.current = new Audio("sound3.m4a");
    }, []);

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

            // Play audio frame modification securely
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {
                    // Safe catch handler for strict browser autoplay restriction policies
                });
            }

            if (posRef.current > target.length * 1.8 + 8) {
                setTimeout(() => {
                    phraseRef.current = (phraseRef.current + 1) % PHRASES.length;
                    posRef.current = 0;
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
        <span className="font-mono text-[10px] tracking-[0.18em] text-white/30 whitespace-nowrap select-none">
            {text}
        </span>
    );
}

// ── Isometric SVGs ───────────────────────────────────────────────────────────
function LeftMain() {
    return (
        <svg viewBox="0 0 176 198" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.8"
                d="M84.534 5a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v73.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0L34.323 109.87a3.75 3.75 0 0 1-2.074-3.354V33.459a3.75 3.75 0 0 1 2.073-3.354z" />
            <path stroke="#2E2E32" strokeLinecap="round" strokeWidth="0.8" d="m38 33 46.422 23.211a8 8 0 0 0 7.156 0L138 33" />
        </svg>
    );
}

function RightMain() {
    return (
        <svg viewBox="0 0 176 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.8"
                d="M84.534 5a7.75 7.75 0 0 1 6.932 0l50.211 25.105a3.75 3.75 0 0 1 2.073 3.353v61.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0L34.323 97.87a3.75 3.75 0 0 1-2.073-3.354V33.459a3.75 3.75 0 0 1 2.073-3.353z" />
            <path stroke="#2E2E32" strokeLinecap="round" strokeWidth="0.8" d="m38 33 46.422 23.211a8 8 0 0 0 7.156 0L138 33" />
        </svg>
    );
}

function BottomFront() {
    return (
        <svg viewBox="0 0 176 136" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.8"
                d="M84.534 5a7.76 7.76 0 0 1 6.932 0l50.211 25.106a3.75 3.75 0 0 1 2.073 3.353v45.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0L34.323 81.87a3.75 3.75 0 0 1-2.074-3.354V33.459a3.75 3.75 0 0 1 2.073-3.353z" />
            <path stroke="#2E2E32" strokeLinecap="round" strokeWidth="0.8" d="m38 33 46.422 23.211a8 8 0 0 0 7.156 0L138 33" />
        </svg>
    );
}

const BLOCK_IDS = ["left-main", "right-main", "bottom-front"];
const BLOCK_SHAPES = [<LeftMain key="l" />, <RightMain key="r" />, <BottomFront key="b" />];

const SLOTS = [
    { bottom: "16%", left: "6%" },
    { bottom: "16%", left: "48%" },
    { bottom: "22%", left: "27%" },
];

export default function NodeGroupVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });
    const [slotAssignment, setSlotAssignment] = useState([0, 1, 2]);

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
        }, 1400);
        return () => clearInterval(id);
    }, [isInView]);

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full bg-[#08090A] overflow-hidden flex flex-col justify-between">

            {/* Top Meta Details Container */}
            <div className="relative w-full p-4 flex items-center justify-between z-10 pointer-events-none">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.25 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-[9px] tracking-[0.2em] text-white uppercase font-bold font-mono"
                >
                    Node-Group Alpha
                </motion.span>
            </div>

            {/* ── Fixed Anchored Base Structure (Updated Proportions to match Short Block) ── */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 z-1 pointer-events-none opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 281" fill="none" className="w-[85%] h-auto max-h-[75%] mt-[-10%]">
                    <motion.g
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* The extrusion height here has been changed from v125.056 to v45.057 to exactly mirror BottomFront layout look */}
                        <path fill="#08090A" stroke="#D0D6E0" strokeWidth="0.5"
                            d="M148.534 1.068a7.75 7.75 0 0 1 6.932 0l50.211 25.106a3.75 3.75 0 0 1 2.073 3.354v45.057c0 1.42-.803 2.718-2.073 3.354l-50.211 25.105a7.75 7.75 0 0 1-6.932 0l-50.21-25.105a3.75 3.75 0 0 1-2.074-3.354V29.528a3.75 3.75 0 0 1 2.073-3.354z" />
                        <path stroke="#2E2E32" strokeWidth="0.5" strokeLinecap="round" d="m102 30.056 46.422 23.21a8 8 0 0 0 7.156 0L202 30.057" />
                    </motion.g>
                </svg>
            </div>

            {/* ── Shuffling Interactive Layer ── */}
            <div className="absolute inset-0 w-full h-full z-10">
                <LayoutGroup>
                    {SLOTS.map((slot, slotIdx) => {
                        const blockIdx = slotAssignment[slotIdx];
                        return (
                            <motion.div
                                key={BLOCK_IDS[blockIdx]}
                                layoutId={BLOCK_IDS[blockIdx]}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 220, damping: 26 },
                                    opacity: { duration: 0.4 },
                                }}
                                style={slot}
                                className="absolute w-[44%] max-w-[160px] aspect-[176/198]"
                            >
                                {BLOCK_SHAPES[blockIdx]}
                            </motion.div>
                        );
                    })}
                </LayoutGroup>
            </div>

            {/* Bottom Live Text Status Banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="relative z-20 w-full h-10 border-t border-white/5 flex items-center px-4 gap-3 bg-black/40 backdrop-blur-sm"
            >
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0"
                />
                <ScrambleText />
            </motion.div>
        </div>
    );
}