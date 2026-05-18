"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";

type NavItemProps = {
    label: string;
    image: string;
    onHover?: () => void;
    onLeave?: () => void;
    onClick?: () => void;
};

const NavItem = ({ label, image, onHover, onLeave, onClick }: NavItemProps) => {
    const displayLabel = label.toUpperCase();
    const { text, scramble, stopScramble } = useScramble(displayLabel);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
        onHover?.();

        if (!audioRef.current) {
            audioRef.current = new Audio("/sound3.m4a");
            audioRef.current.volume = 0.4;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play();

        scramble();
    };

    const handleMouseLeave = () => {
        setHovered(false);
        onLeave?.();

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        stopScramble();
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="group relative w-full text-left py-3 overflow-hidden rounded-sm"
        >
            {/* Per-item sliding image */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        key="bg"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 z-0"
                        style={{ backgroundColor: "#F00F1D" }}
                    >
                        {/* <img
                            src={image}
                            alt={label}
                            className="w-full h-full object-cover"
                        /> */}
                        {/* <div className="w-full h-full color#F00F1D"></div> */}
                        {/* <div className={`absolute inset-0  bg-#F00F1D`} /> */}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ghost */}
            <span className="invisible font-mono text-5xl font-black tracking-tight">
                {displayLabel}
            </span>

            {/* Scrambling text */}
            <span className="absolute inset-0 z-10 flex items-center font-mono text-5xl font-black tracking-tight text-neutral-300 transition-colors duration-200 group-hover:text-white px-3">
                {text}
            </span>
        </button>
    );
};

export default NavItem;