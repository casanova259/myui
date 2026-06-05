"use client";

import { motion, useAnimation } from "motion/react";
import { useState } from "react";

export default function BlackAndWhiteLiquidGlass() {
  const [isStabilized, setIsStabilized] = useState(false);
  const controls = useAnimation();

  const imageUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop";

  const handleInteraction = async () => {
    if (isStabilized) {
      setIsStabilized(false);
      await controls.start({
        scale: 70, // Return to the liquid warp state
        transition: { duration: 1.2, ease: "circOut" }
      });
    } else {
      setIsStabilized(true);

      // 1. Quick mechanical jolt
      await controls.start({
        scale: 95,
        transition: { duration: 0.15, ease: "easeInOut" }
      });

      // 2. Settle down to absolute flat glass clarity (scale 0)
      await controls.start({
        scale: 0,
        transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] } // Premium cinematic deceleration curve
      });
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-[350px] bg-black overflow-hidden font-mono select-none cursor-pointer group rounded-xl border border-white/10"
      onClick={handleInteraction}
    >
      {/* 1. STARK BLACK & WHITE LIQUID IMAGE LAYER */}
      <div className="absolute inset-0 w-full h-full p-3 bg-black">
        <div className="w-full h-full rounded-lg overflow-hidden relative bg-neutral-900">
          <img
            src={imageUrl}
            alt="Preserved Asset"
            className="w-full h-full object-cover select-none pointer-events-none grayscale contrast-[180%] brightness-[95%]"
            // Links the image to the SVG distortion engine below
            style={{ filter: "url(#bw-liquid-warp)" }}
          />

          {/* Stark framing shadow vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
        </div>
      </div>

      {/* 2. THE SVG DISTORTION ENGINE */}
      <svg className="absolute w-0 h-0 invisible">
        <defs>
          <filter id="bw-liquid-warp">
            {/* Generates the fluid, organic glass noise waves */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="4"
              result="noise"
            />
            {/* Displaces the image pixels. "motion" directly animates the scale attribute */}
            <motion.feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              xChannelSelector="R"
              yChannelSelector="G"
              initial={{ scale: 70 }} // Starts deeply warped/melted
              animate={controls}
            />
          </filter>
        </defs>
      </svg>

      {/* 3. MINIMALIST EDITORIAL HUD */}
      {/* Top Left Status */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[9px] tracking-[0.25em] text-white/40 uppercase">
        <span className={`w-1 h-1 rounded-full ${isStabilized ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/20 animate-pulse"}`} />
        <span>{isStabilized ? "State // Crystallized" : "State // Fluid_Matrix"}</span>
      </div>

      {/* Bottom Interface Bar */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center text-[9px] font-mono tracking-widest text-white/30 border-t border-white/5 pt-4">
        <span className="uppercase opacity-50">
          {isStabilized ? "Cohesion 100%" : "Cohesion 0% // Unstable"}
        </span>
        <span className="font-bold uppercase text-white/50 group-hover:text-white transition-colors duration-300">
          {isStabilized ? "[ Fracture ]" : "[ Stabilize ]"}
        </span>
      </div>

      {/* Subtle background layout crosshair grids */}
      <div className="absolute inset-6 border border-white/[0.02] pointer-events-none z-10" />
    </div>
  );
}