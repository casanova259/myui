"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MasterpieceContrast() {
  const [isMuseum, setIsMuseum] = useState(false);

  return (
    // 'absolute inset-0' forces it to completely fill your flex-1 container and capture all clicks
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-4 cursor-pointer select-none overflow-hidden group z-10"
      onClick={() => setIsMuseum(!isMuseum)}
    >
      {/* Dynamic Ambient Background Gallery Glow */}
      <motion.div
        animate={{ opacity: isMuseum ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 via-neutral-950 to-neutral-950 pointer-events-none"
      />

      {/* --- OUTER WRAPPER: Handles Museum Framing & Filters --- */}
      <motion.div
        animate={{
          scale: isMuseum ? 0.85 : 1, // Shrinks slightly to show off the frame inside your box
          filter: isMuseum
            ? "blur(0px) brightness(1.1) contrast(1.05) saturate(0.95)"
            : "blur(3px) brightness(0.5) contrast(1.4) saturate(1.2)",
          boxShadow: isMuseum
            ? "0px 15px 30px -10px rgba(0, 0, 0, 0.9), 0 0 0 8px #f5f5f5, 0 0 0 12px #171717, 0 0 0 14px #b45309"
            : "0px 0px 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-[180px] sm:max-w-[210px] aspect-[3/4] overflow-hidden rounded-sm origin-center z-10 will-change-transform"
      >

        {/* --- INNER WRAPPER: Dedicated exclusively to the raw chaos loop --- */}
        {/* Splitting this avoids Framer Motion getting stuck in infinite loop state states */}
        <motion.div
          animate={isMuseum ? { x: 0, y: 0, rotate: 0 } : {
            x: [-1, 1.5, -2, 1, -0.5, 1.5, -1],
            y: [1.5, -1, 2, -1.5, 1, -0.5, 1],
            rotate: [-0.5, 0.6, -0.4, 0.5, -0.3],
          }}
          transition={isMuseum ? { duration: 0.2, ease: "easeOut" } : {
            x: { repeat: Infinity, duration: 0.4, ease: "linear" },
            y: { repeat: Infinity, duration: 0.45, ease: "linear" },
            rotate: { repeat: Infinity, duration: 0.5, ease: "linear" },
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=600&auto=format&fit=crop"
            alt="Raw life moment"
            className="w-full h-full object-cover"
            draggable="false"
          />
        </motion.div>

        {/* Shutter Flash Trigger */}
        <motion.div
          animate={{ opacity: isMuseum ? [1, 0] : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
        />
      </motion.div>

      {/* --- MUSEUM PLAQUE OVERLAY --- */}
      <AnimatePresence>
        {isMuseum && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute bottom-3 left-3 right-3 bg-neutral-100/95 backdrop-blur-sm p-2.5 shadow-2xl border-l-2 border-amber-700 rounded flex flex-col z-20 pointer-events-none"
          >
            <div className="flex justify-between items-baseline gap-2">
              <h3 className="text-[11px] font-serif text-neutral-900 font-bold tracking-wide truncate max-w-[70%]">
                Untitled (Tuesday Transit)
              </h3>
              <p className="text-[9px] text-neutral-500 italic shrink-0">
                Anon., 2026
              </p>
            </div>
            <p className="text-[9px] text-neutral-600 mt-0.5 font-sans leading-tight border-t border-neutral-200/60 pt-1 hidden sm:block">
              Elevating the mundane, chaotic velocity of a modern commute into striking gallery stillness.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Interaction Label */}
      <motion.div
        animate={{ opacity: isMuseum ? 0 : 0.4 }}
        className="absolute bottom-3 text-neutral-400 text-[9px] tracking-[0.2em] uppercase font-sans group-hover:opacity-80 transition-opacity z-20"
      >
        Click to Curate
      </motion.div>
    </div>
  );
}