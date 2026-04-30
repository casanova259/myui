import Link from "next/link";
import React, { useState } from "react"
import { motion } from "motion/react";

export const Navbar = () => {
    const navItems = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Contact",
            href: "/contact"
        },
        {
            title: "Login",
            href: "/login"
        },
    ];

    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="py-40">
            <nav className="max-w-xl mx-auto bg-gray-100 rounded-full px-2 py-1.5 flex items-center">
                {navItems.map((item, idx) => (
                    <Link
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        className="w-full relative text-center text-xs py-2 px-4 block"
                        href={item.href}
                        key={item.title}
                    >
                        <span className={`relative z-20 transition-colors duration-200 ${hovered === idx ? "text-white" : "text-neutral-500"
                            }`}>
                            {item.title}
                        </span>

                        {hovered === idx && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-black"
                                layoutId="hover"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    )
}