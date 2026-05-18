"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "./navItem";

const NAV_LINKS = [
    { label: "Home", image: "/home.jpg" },
    { label: "Engine", image: "/engine.jpg" },
    { label: "General", image: "/general.jpg" },
    { label: "Story", image: "/story.jpg" },
    { label: "Media", image: "/media.jpg" },
];
const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [bgImage, setBgImage] = useState<string | null>(null);

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed top-8 left-8 z-50 flex flex-col gap-[5px]"
                >
                    <span className="block h-[1.5px] w-6 bg-neutral-400" />
                    <span className="block h-[1.5px] w-6 bg-neutral-400" />
                </button>
            )}

            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 left-0 z-50 flex h-screen w-[420px] flex-col overflow-hidden"
                    >
                        {/* Sidebar background image */}
                        <AnimatePresence mode="wait">
                            {bgImage && (
                                <motion.div
                                    key={bgImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 z-0"
                                >
                                    <img
                                        src={bgImage}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Heavy dark tint over bg */}
                                    <div className="absolute inset-0 bg-black/30" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Fallback solid bg when nothing hovered */}
                        <div className="absolute inset-0 z-[-1] bg-[#111]" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-neutral-800 px-8 py-7">
                            {/* <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                Menu
                            </span> */}
                            <button
                                onClick={() => setOpen(false)}
                                className="font-mono text-sm text-neutral-500 transition hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Nav links */}
                        <nav className="relative z-10 flex flex-col px-8 py-10 gap-1">
                            {NAV_LINKS.map((link) => (
                                <NavItem
                                    key={link.label}
                                    label={link.label}
                                    image={link.image}
                                    onHover={() => setBgImage(link.image)}
                                    onLeave={() => setBgImage(null)}
                                    onClick={() => setOpen(false)}
                                />
                            ))}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;