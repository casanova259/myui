"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BulletproofScan() {
  const [isScanning, setIsScanning] = useState(false);
  const imageUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop";

  // Auto-reset the scan after 3 seconds so the user can click it repeatedly
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => setIsScanning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  return (
    <div
      className="relative w-full h-full min-h-[250px] bg-[#0f172a] overflow-hidden rounded-xl cursor-pointer select-none flex flex-col justify-between"
      onClick={() => setIsScanning(true)}
    >
      {/* 1. THE BASE IMAGE (Starts Blurred & Grayscale) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={imageUrl}
          alt="Target"
          className={`w-full h-full object-cover transition-all duration-700 ${isScanning ? "blur-none grayscale-0 scale-100" : "blur-md grayscale opacity-50 scale-105"
            }`}
        />
        {/* Subtle Tech Overlay Lines */}
        <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none" />
      </div>

      {/* 2. THE SCANNER LINE */}
      {/* Moving this up and down using pure Y percentages (highly stable) */}
      <motion.div
        className="absolute left-0 right-0 h-[3px] bg-cyan-400 z-10 shadow-[0_0_15px_4px_rgba(34,211,238,0.6)] pointer-events-none"
        initial={{ top: "0%" }}
        animate={{ top: isScanning ? "100%" : "0%" }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        style={{ opacity: isScanning ? 1 : 0 }}
      />

      {/* 3. HUD INTERACTION TEXT */}
      <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono tracking-wider text-white/70">
        {isScanning ? "● SCANNING_COMPILING" : "○ READY_TO_TRACE"}
      </div>

      <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono text-cyan-400">
        {isScanning ? "RESOLVING FOCUS..." : "CLICK TO FOCUS"}
      </div>

      {/* Framing Scope Corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 pointer-events-none" />
    </div>
  );
}