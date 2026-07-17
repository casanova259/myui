"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../lib/gsap";

interface UseVerticalSliderOptions {
  /** Selector (relative to the container) for each row/item. */
  itemSelector?: string;
  /** Selector (relative to each item) for the image/media that scales. */
  imageSelector?: string;
  scaleExpanded?: number;
}

/**
 * Brutalist-style vertical slider: as the user scrolls through a list of
 * items, each item's image scales up while it's the active one, then
 * settles back down — one scrubbed ScrollTrigger timeline per item.
 *
 * Scales the image rather than animating width/height for performance, so
 * surrounding layout doesn't need to reflow every frame.
 */
export function useVerticalSlider<T extends HTMLElement>({
  itemSelector = "[data-slider-item]",
  imageSelector = "[data-slider-image]",
  scaleExpanded = 1.15,
}: UseVerticalSliderOptions = {}) {
  const containerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    ensureGsapPlugins();

    const items = containerRef.current.querySelectorAll<HTMLElement>(itemSelector);
    const triggers: ScrollTrigger[] = [];

    items.forEach((item) => {
      const image = item.querySelector<HTMLElement>(imageSelector);
      if (!image) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top-=6.5% center",
          end: "bottom center-=0.5%",
          scrub: true,
        },
      });

      timeline.to(image, {
        scaleX: scaleExpanded,
        scaleY: scaleExpanded,
        force3D: true,
        duration: 0.8,
        ease: "none",
      });

      timeline.to(image, {
        scaleX: 1,
        scaleY: 1,
        force3D: true,
        duration: 1.5,
        ease: "none",
        delay: 0.3,
      });

      if (timeline.scrollTrigger) triggers.push(timeline.scrollTrigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [itemSelector, imageSelector, scaleExpanded]);

  return containerRef;
}
