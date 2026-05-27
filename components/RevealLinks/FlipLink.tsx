"use client";

import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
    children: string;
    href: string;
}

export const FlipLink = ({ children, href }: FlipLinkProps) => {
    return (
        <motion.a
            initial="initial"
            whileHover="hovered"
            className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
            href={href}
        >
            {/* Top row — slides up on hover */}
            <div>
                {children.split("").map((l, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                    >
                        {l}
                    </motion.span>
                ))}
            </div>

            {/* Bottom row — slides in from below on hover */}
            <div className="absolute inset-0">
                {children.split("").map((l, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: "100%" },
                            hovered: { y: 0 },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        // style={{lineHeight:0.65}}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    );
};