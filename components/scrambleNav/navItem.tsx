"use client";

import { useScramble } from "@/hooks/useScramble";

type NavItemProps = {
    label: string;
    onClick?: () => void;
};

const NavItem = ({ label, onClick }: NavItemProps) => {
    const displayLabel = label.toUpperCase();
    const { text, scramble, stopScramble } = useScramble(displayLabel);

    return (
        <button
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            onClick={onClick}
            className="group relative w-full text-left py-3"
        >
            {/* Ghost — holds width */}
            <span className="invisible font-mono text-5xl font-black tracking-tight">
                {displayLabel}
            </span>

            {/* Scrambling text */}
            <span className="absolute inset-0 flex items-center font-mono text-5xl font-black tracking-tight text-neutral-600 transition-colors duration-200 group-hover:text-white">
                {text}
            </span>
        </button>
    );
};

export default NavItem;