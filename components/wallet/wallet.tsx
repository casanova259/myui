"use client";

import { motion } from "motion/react"
import { useState } from "react";

const CARDS = [
    {
        id: "razorpay",
        bg: "#7b6ff0",
        zIndex: 1,
        stacked: { y: 0, rotate: 0, x: 0 },
        fanned: { y: -160, rotate: -12, x: -20 }
    },
    {
        id: "paypal",
        bg: "#ffffff",
        zIndex: 2,
        top: "19%",
        stacked: { y: 0, rotate: 0, x: 0 },
        fanned: { y: -80, rotate: 4, x: 10 },
    },
];

const TRAY_PATH =
    "M70.6316 27.879C78.2644 8.59214 96.4872 -1.85957 115.368 0.273484H684.387C684.496 0.273486 684.606 0.275919 684.716 0.277391C703.606 -1.86856 721.842 8.58347 729.478 27.879L796.597 197.469C806.353 222.118 795.116 251.863 771.5 263.905L757.596 270.996C733.979 283.039 706.925 272.819 697.17 248.17L669.14 177.349H130.971L102.945 248.169C93.1902 272.819 66.1371 283.039 42.5203 270.997L28.615 263.907C4.99845 251.865 -6.23851 222.12 3.51641 197.471L70.6316 27.879Z";

export default function WalletCard() {


    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-black">
            {/* Rectangle 34 — 320×320 black tile */}
            <div
                className="relative overflow-visible"
                style={{
                    width: "320px",
                    height: "320px",
                    background: "#060606",
                    borderRadius: "42px",
                    border: "2px solid #c8c8c8",
                }}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {/* Stacked cards */}
                {CARDS.map((card, i) => (
                    <motion.div
                        key={card.id}
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                            top: i === 0 ? "10%" : "19%",
                            width: "88%",
                            height: "46%",
                            background: card.bg,
                            borderRadius: "18px",
                            zIndex: card.zIndex,
                            transformOrigin: "bottom center"
                        }}

                        initial={{
                            y: 0,
                            rotate: 0
                        }}
                        animate={isOpen ? card.fanned : card.stacked}
                        transition={{
                            duration: 0.7,
                            delay: i * 0.12,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}




                    >
                    </motion.div>
                ))}

                {/* Tray SVG */}
                <svg
                    className="absolute left-0 bottom-0 z-[3]"
                    width="100%"
                    height="150"
                    viewBox="0 0 801 277"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="#060606" d={TRAY_PATH} />
                </svg>

                {/* Amount label */}
                <p
                    className="absolute z-[4] m-0 text-white font-semibold tracking-tight"
                    style={{
                        left: "8%",
                        bottom: "9%",
                        fontSize: "1.45rem",
                        fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif',
                    }}
                >
                    $ 150,000
                </p>
            </div>
        </div >
    );
}
