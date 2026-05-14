"use client";
import useMousePosition from "@/hooks/useMousePosition";
import { motion } from "motion/react";
import { useState } from "react";

export const Mask = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const size = isHovered ? 400 : 40;

    return (
        <main className="relative min-h-screen overflow-hidden">

            {/* Body — sits behind */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#070707]">
                <p className="text-center text-[#afa18f] text-6xl px-10 max-w-7xl ">
                    I am a <span className="text-red-500">selectively skilled engineer</span>{" "}
                    who loves to build some dope s**t and producing high quality and
                    amazing products
                </p>
            </div>

            {/* Mask layer — orange, reveals on hover */}
            <motion.div
                animate={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px`,
                    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    maskSize: `${size}px`,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
                style={{
                    maskImage: 'url("/Ellipse.svg")',
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: 'url("/Ellipse.svg")',
                    WebkitMaskRepeat: "no-repeat",
                }}
                className="absolute inset-0 flex items-center justify-center bg-[#ec4e39]"
            >
                <p
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="text-center text-black text-6xl px-10 max-w-7xl cursor-none"
                >
                    I'm an engineer who loves to Build and challenge myself with new ideas.
                    (yet) i'm making good stuff and building myself.
                </p>
            </motion.div>

        </main>
    );
};