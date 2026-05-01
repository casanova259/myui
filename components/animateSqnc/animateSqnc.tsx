"use client";

import React from "react";
import { useAnimate, motion } from "motion/react";

export const AnimationSequences = () => {
    const [scope, animate] = useAnimate();

    const startAnimating = async () => {
        // 1. Fade out text first
        await animate(".text", { opacity: 0 }, { duration: 0.2 });

        // 2. Shrink button to a circle
        await animate(
            ".button",
            { width: "3.75rem", borderRadius: "110px" },
            { duration: 0.4, ease: "easeInOut" }
        );

        // 3. Bounce the circle
        await animate(
            ".button",
            { scale: [1, 1.2, 0.8, 1], backgroundColor: "#22c55e" }, // green-500
            { duration: 0.6 }
        );
    };

    return (
        <div ref={scope} className="relative h-20 flex items-center justify-center">
            <motion.button
                className="h-15 button rounded-lg text-black font-medium cursor-pointer bg-white"
                style={{ width: "25rem" }}
                onClick={startAnimating}
            >
                <span className="text">Purchase now ($69)</span>
            </motion.button>


            <motion.svg fill="none" viewBox="0 0 24 24 " stroke="#FFFF"
            strokeWidth={3}
            className="check-icon h-8 w-8 absolute inset-0 m-auto z-50 pointer-events-none"
            style={{
                opacity:0
            }}
            >
                <motion.path
                initial={{
                    pathLength:0
                }}
                transition={{
                    duration:0.3,
                    type:"tween",
                    ease:"easeInOut"
                }}
                strokeLinecap="round" strokeLinejoin="round" d="M5 1314 4L19 7"/>
            </motion.svg>
        </div>
    );
};