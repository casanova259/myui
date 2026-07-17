"use client";

import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { ensureGsapPlugins, Flip, gsap } from "../lib/gsap";

interface PreloaderProps {
  posterSrc: string;
  /** Ref to the real showreel element already sitting in the page (e.g. a video wrapper). */
  showreelTargetRef: RefObject<HTMLElement | null>;
  onComplete?: () => void;
}

/**
 * Counts 0 -> 100 in a "chunky" steps() progression, then morphs the poster
 * frame into the exact position/size of the real showreel element before
 * unmounting, so the handoff from preloader to page reads as one continuous
 * piece of motion rather than a cut.
 */
export function Preloader({ posterSrc, showreelTargetRef, onComplete }: PreloaderProps) {
  const [hidden, setHidden] = useState(false);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const progress = useRef({ value: 0 });

  useLayoutEffect(() => {
    ensureGsapPlugins();
    if (!counterRef.current || !frameRef.current || !backgroundRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        const background = backgroundRef.current;
        const target = showreelTargetRef.current;

        if (!background || !target) {
          setHidden(true);
          onComplete?.();
          return;
        }

        const state = Flip.getState(background);
        const targetBox = target.getBoundingClientRect();

        gsap.set(background, {
          position: "fixed",
          top: targetBox.top,
          left: targetBox.left,
          width: targetBox.width,
          height: targetBox.height,
        });

        Flip.from(state, {
          duration: 1,
          ease: "expo.inOut",
          absolute: true,
          simple: true,
          onComplete: () => {
            setHidden(true);
            onComplete?.();
          },
        });
      },
    });

    timeline.to(progress.current, {
      duration: 3,
      ease: "steps(14)",
      value: 100,
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(progress.current.value).toString();
        }
      },
    });

    timeline.fromTo(
      frameRef.current,
      { clipPath: "inset(2.5rem 2.5rem 2.5rem 2.5rem)" },
      { clipPath: "inset(100% 0rem 0rem 0rem)", duration: 1, ease: "expo.inOut" },
      "<"
    );

  return () => {
      timeline.kill();
    }
    // Runs once on mount; showreelTargetRef/onComplete are read at completion time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${posterSrc})` }}
      />
      <div ref={frameRef} className="absolute inset-0 flex items-center justify-center">
        <span ref={counterRef} className="font-mono text-6xl text-white">
          0
        </span>
      </div>
    </div>
  );
}
