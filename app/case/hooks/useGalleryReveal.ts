"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "../lib/gsap";

interface UseGalleryRevealOptions {
  /** Selector (relative to the container) matched against gallery items. */
  selector?: string;
  stagger?: number;
  disabled?: boolean;
}

/**
 * Fades up a set of images/videos inside a container with a gentle stagger,
 * as used for the case study's project galleries.
 */
export function useGalleryReveal<T extends HTMLElement>({
  selector = "[data-gallery-item]",
  stagger = 0.1,
  disabled = false,
}: UseGalleryRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (disabled || !ref.current) return;
    ensureGsapPlugins();

    const items = ref.current.querySelectorAll<HTMLElement>(selector);
    if (!items.length) return;

    const tween = gsap.fromTo(
      items,
      { yPercent: 100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger,
      }
    );

    return () => {
      tween.kill();
    };
  }, [selector, stagger, disabled]);

  return ref;
}
