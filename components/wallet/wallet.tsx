"use client";

import { motion } from "motion/react";
import { object } from "motion/react-client";
import { useState } from "react";

const CARDS = [
    {
        id: "razorpay",
        bg: "#7b6ff0",
        zIndex: 1,
        logo: "/Razor.png",
        logoHeight: "36px",
        logoWidth: "48px",
        amount: "$55,000",
        label: "Total Balance",
        objectfit:"contain",
        textColor: "#ffffff",
        labelColor: "rgba(255,255,255,0.6)",
        stacked: { y: 0, rotate: 0, x: 0 },
        fanned: { y: -160, rotate: -12, x: -20 },
    },
    {
        id: "paypal",
        bg: "#ffffff",
        zIndex: 2,
        logo: "/images.png",
        logoHeight: "36px",
        logoWidth: "72px",
        objectfit:"cover",
        // bigger since it's a raster PNG
        amount: "$50,000",
        label: "Total Balance",
        textColor: "#1a1a2e",
        labelColor: "rgba(26,26,46,0.5)",
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
            {/*
        Two-layer approach for border:
        - Outer ring: ONLY renders the border, overflow visible so cards escape
        - Inner tile: clips the tray SVG flush, no border
      */}
            <div
                className="relative overflow-visible cursor-pointer"
                style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "42px",
                    border: "2px solid #c8c8c8",  // border lives here, nothing covers it
                }}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {/* Inner tile — clips tray, carries bg */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                        background: "#060606",
                        borderRadius: "40px",  // 2px inset from outer border
                    }}
                >
                    {/* Tray SVG — safely clipped inside inner tile */}
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

                    {/* Wallet total — inside inner tile so it clips correctly */}
                    <p
                        className="absolute m-0 text-white font-semibold tracking-tight"
                        style={{
                            left: "8%",
                            bottom: "9%",
                            fontSize: "1.45rem",
                            zIndex: 4,
                            fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif',
                        }}
                    >
                        $ 150,000
                    </p>
                </div>

                {/* Cards — on the OUTER div so they escape overflow */}
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
                            transformOrigin: "bottom center",
                            overflow: "hidden",
                        }}
                        initial={{ y: 0, rotate: 0, x: 0 }}
                        animate={isOpen ? card.fanned : card.stacked}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 18,
                            mass: 1.2,   // heavier = slower, more cinematic
                            delay: i * 0.15,
                        }}
                    >
                        {/* Logo — top right */}
                        <img
                            src={card.logo}
                            alt={card.id}
                            style={{
                                position: "absolute",
                                top: "14px",
                                right: "14px",
                                height: card.logoHeight,
                                width: "auto",
                                objectFit: `${card.objectfit}`,
                                display: "block",
                                width: card.logoWidth
                            }}
                        />

                        {/* Amount + label — bottom left */}
                        <div style={{ position: "absolute", bottom: "14px", left: "16px" }}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    color: card.textColor,
                                    fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif',
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1,
                                }}
                            >
                                {card.amount}
                            </p>
                            <p
                                style={{
                                    margin: "4px 0 0",
                                    fontSize: "1 rem",
                                    fontWeight: 500,
                                    color: card.labelColor,
                                    fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif',
                                    letterSpacing: "0.01em",
                                }}
                            >
                                {card.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}