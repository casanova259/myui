"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, SplitText } from "../lib/gsap";

type SplitRevealMode = "title" | "paragraph";

interface UseSplitRevealOptions {
  /** "title" splits into chars (tight stagger, punchy), "paragraph" splits into lines (looser stagger). */
  mode?: SplitRevealMode;
  disabled?: boolean;
}

/**
 * Splits text and reveals it with a masked stagger animation, matching the
 * case study's two text treatments:
 *  - titles: char-by-char, yPercent + scale, tight stagger
 *  - paragraphs: line-by-line, yPercent only, looser stagger
 *
 * Uses SplitText's autoSplit so the animation is rebuilt automatically if
 * the layout reflows (resize, font load, etc).
 */
export function useSplitReveal<T extends HTMLElement>({
  mode = "paragraph",
  disabled = false,
}: UseSplitRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (disabled || !ref.current) return;
    ensureGsapPlugins();

    const element = ref.current;
    let split: SplitText;

    if (mode === "title") {
      split = new SplitText(element, {
        type: "words, chars",
        autoSplit: true,
        mask: "chars",
        charsClass: "char",
        onSplit: (self) =>
          gsap.from(self.chars, {
            duration: 1,
            yPercent: -120,
            scale: 1.2,
            stagger: 0.01,
            ease: "expo.out",
          }),
      });
    } else {
      split = new SplitText(element, {
        type: "lines, words",
        autoSplit: true,
        mask: "lines",
        linesClass: "line",
        onSplit: (self) =>
          gsap.from(self.lines, {
            duration: 0.9,
            yPercent: 105,
            stagger: 0.04,
            ease: "expo.out",
          }),
      });
    }

    return () => split.revert();
  }, [mode, disabled]);

  return ref;
}
