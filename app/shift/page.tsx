"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-fraunces",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
});

const tagline =
  "Fathom listens to the scattered version of your thinking and hands back the through-line — before you've finished the thought.";

const Page = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let flipTimer = 0;
    let textTimer = 0;
    let isActive = true;

    const first = firstRef.current;
    const second = secondRef.current;
    const box = boxRef.current;
    const text = textRef.current;
    const eyebrow = eyebrowRef.current;

    if (!first || !second || !box || !text || !eyebrow) {
      return;
    }

    const words = text.querySelectorAll("[data-word]");
    gsap.set(words, { opacity: 0, filter: "blur(8px)" });
    gsap.set(eyebrow, { opacity: 0, y: 6 });

    void import("gsap/Flip").then((flipModule) => {
      if (!isActive) {
        return;
      }
      const flipPlugin = flipModule.Flip ?? flipModule.default;
      gsap.registerPlugin(flipPlugin);

      flipTimer = window.setTimeout(() => {
        const state = flipPlugin.getState(box);
        second.appendChild(box);
        flipPlugin.from(state, {
          duration: 1,
          ease: "power4.inOut",
        });

        textTimer = window.setTimeout(() => {
          gsap.to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(words, {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.05,
            duration: 0.45,
            ease: "power2.out",
            delay: 0.15,
          });
        }, 880);
      }, 600);
    });

    return () => {
      isActive = false;
      window.clearTimeout(flipTimer);
      window.clearTimeout(textTimer);
    };
  }, []);

  return (
    <div
      className={`${fraunces.variable} ${plexMono.variable} flex h-screen w-screen items-center justify-center gap-4 bg-[#050608] p-4 sm:gap-10 md:gap-20`}
    >
      <div
        ref={firstRef}
        className="flex h-12 w-12 items-center justify-center absolute sm:h-20 sm:w-20 md:h-24 md:w-24"
      >
        <motion.div
          ref={boxRef}
          initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.5 }}
          className="h-10 w-10 rounded-full sm:h-16 sm:w-16 md:h-20 md:w-20"
          style={{
            background:
              "radial-gradient(45.33% 46.43% at 41.69% 50%, #0140FF 0%, rgba(1, 64, 255, 0) 100%), radial-gradient(28.41% 117.96% at 7.72% 28.75%, #A6FDFF 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(37.39% 69.19% at 107.79% 0%, #0075FF 0%, rgba(0, 66, 255, 0) 100%), radial-gradient(54.38% 89.75% at 83.46% 89.75%, #26F9FF 0%, rgba(0, 69, 255, 0.6) 100%), #0140FF",
          }}
        />
      </div>
      <div className="flex min-w-0 max-w-md flex-col gap-3 sm:gap-4 md:gap-5">
        <div
          ref={secondRef}
          className="flex h-12 w-12 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24"
        />
        <div
          ref={eyebrowRef}
          className="flex items-center gap-2 font-[family-name:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[#5B6B7A] sm:text-xs"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#26F9FF] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#26F9FF]" />
          </span>
          Fathom — AI thinking partner
        </div>
        <span
          ref={textRef}
          className="flex w-full flex-wrap gap-x-2 font-[family-name:var(--font-fraunces)] text-xl italic leading-snug text-[#EDEEF0] sm:text-2xl md:text-3xl"
        >
          {tagline.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} data-word>
              {word}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Page;