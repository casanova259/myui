"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "./navItem";

const NAV_LINKS = ["Home", "Engine", "General", "Story", "Media"];

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Hamburger trigger — always visible */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed top-8 left-8 z-50 flex flex-col gap-[5px]"
                >
                    <span className="block h-[1.5px] w-6 bg-neutral-400" />
                    <span className="block h-[1.5px] w-6 bg-neutral-400" />
                </button>
            )}

            {/* Sidebar overlay */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 left-0 z-50 flex h-screen w-[420px] flex-col bg-[#111]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-neutral-800 px-8 py-7">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                Menu
                            </span>
                            <button
                                onClick={() => setOpen(false)}
                                className="font-mono text-sm text-neutral-500 transition hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Nav links */}
                        <nav className="flex flex-col px-8 py-10 gap-1">
                            {NAV_LINKS.map((link) => (
                                <NavItem
                                    key={link}
                                    label={link}
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