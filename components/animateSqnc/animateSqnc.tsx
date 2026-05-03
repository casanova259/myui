"use client";

import React, { useRef } from "react";
import { useAnimate, motion } from "motion/react";

export const AnimationSequences = () => {
    const [scope, animate] = useAnimate();
    const hasRun = useRef(false);

    const startAnimating = async () => {
        if (hasRun.current) return;
        hasRun.current = true;

        // 1. Fade out text
        await animate(".text", { opacity: 0 }, { duration: 0.2 });

        // 2. Shrink button to a circle
        await animate(
            ".button",
            { width: "3.75rem", borderRadius: "110px" },
            { duration: 0.4, ease: "easeInOut" }
        );

        // 3. Bounce + turn green
        await animate(
            ".button",
            { scale: [1, 1.2, 0.85, 1], backgroundColor: "#22c55e" },
            { duration: 0.5, ease: "easeInOut" }
        );

        // 4. Fade in the SVG check icon
        await animate(".check-icon", { opacity: 1 }, { duration: 0.1 });

        // 5. Draw the checkmark path
        await animate(
            ".tick-path",
            { pathLength: 1 },
            { duration: 0.35, ease: "easeInOut" }
        );
    };

    return (
        <div ref={scope} className="relative h-20 flex items-center justify-center">
            <motion.button
                className="button h-15 rounded-lg text-black font-medium cursor-pointer bg-white"
                style={{ width: "25rem" }}
                onClick={startAnimating}
            >
                <span className="text">Purchase now ($69)</span>
            </motion.button>

            <motion.svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                strokeWidth={3}
                className="check-icon h-8 w-8 absolute inset-0 m-auto z-50 pointer-events-none"
                style={{ opacity: 0 }}
            >
                <motion.path
                    className="tick-path"
                    initial={{ pathLength: 0 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13L9 17L19 7"  // ✅ fixed path
                />
            </motion.svg>
        </div>
    );
};