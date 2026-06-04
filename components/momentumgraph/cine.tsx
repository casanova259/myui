"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function CinematicIngestion() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse coordinates tracking relative to the center of the container
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics to prevent jerky movements
    const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // PARALLAX DEPTH MAPPINGS:
    // Foreground: Moves fast, highly blurred, gives upfront depth
    const fgX = useTransform(smoothX, [-0.5, 0.5], [-45, 45]);
    const fgY = useTransform(smoothY, [-0.5, 0.5], [-45, 45]);

    // Midground (Focal Plane): Sharp, contains the text, moves moderately
    const mgX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
    const mgY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

    // Background: Moves very little, mildly blurred, gives deep perspective
    const bgX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
    const bgY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Normalize coordinates between -0.5 and 0.5
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        // Snap back smoothly to dead center when mouse leaves
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full min-h-[400px] bg-[#311308] rounded-[24px] overflow-hidden flex items-center justify-center select-none border border-orange-950/20 shadow-inner"
        >
            {/* ================= LAYER 1: CINEMATIC AMBIENT LIGHT SOURCE ================= */}
            {/* Animated glowing backdrop replicating golden hour sunset rays */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,rgba(251,146,60,0.05)_40%,transparent_70%)] pointer-events-none"
            />

            {/* ================= LAYER 2: BACKGROUND (DEEP BLUR / BOKEH) ================= */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none filter blur-[8px] opacity-40"
            >
                {/* Floating background geometric particles */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-12 left-16 w-16 h-16 border border-orange-400/30 rounded-xl transform rotate-12"
                />
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-16 right-20 w-24 h-24 border border-amber-500/20 rounded-full"
                />
            </motion.div>

            {/* ================= LAYER 3: MIDGROUND (SHARP FOCAL PLANE) ================= */}
            <motion.div
                style={{ x: mgX, y: mgY }}
                className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            >
                {/* Animated Core Geometry (Wireframe + Shards combo) */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                    {/* Outer Shifting Wireframe Orb */}
                    <motion.div
                        animate={{ rotate: 360, scale: [0.98, 1.02, 0.98] }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 border border-amber-500/40 rounded-full border-dashed"
                    />

                    {/* Inner Structural Solid Shards */}
                    <motion.div
                        animate={{ rotate: -180 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute w-32 h-32 bg-gradient-to-tr from-amber-600/20 to-orange-400/10 border border-orange-500/30 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.1)] backdrop-blur-[2px]"
                    />

                    {/* Core Central Display Text */}
                    <motion.div
                        initial={{ letterSpacing: "0.1em" }}
                        whileHover={{ letterSpacing: "0.2em" }}
                        className="relative z-20 text-white font-mono tracking-[0.15em] font-bold text-sm bg-[#1e0a04]/90 px-5 py-2.5 rounded-md border border-orange-500/40 shadow-2xl backdrop-blur-md"
                    >
                        INGESTION
                    </motion.div>
                </div>
            </motion.div>

            {/* ================= LAYER 4: FOREGROUND (HEAVY BOKEH BLUR) ================= */}
            {/* These elements live right in front of the lens, moving quickly across the frame */}
            <motion.div
                style={{ x: fgX, y: fgY }}
                className="absolute inset-0 pointer-events-none z-20 filter blur-[28px]"
            >
                {/* Massive heavily blurred warm mass passing close bottom-left */}
                <motion.div
                    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-br from-orange-600/60 to-transparent rounded-full opacity-70 mix-blend-screen"
                />

                {/* Passing blurred mass top-right */}
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-bl from-amber-500/40 to-transparent rounded-full opacity-60 mix-blend-screen"
                />
            </motion.div>
        </div>
    );
}