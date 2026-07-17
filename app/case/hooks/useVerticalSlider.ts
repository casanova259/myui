"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../lib/gsap";

interface UseVerticalSliderOptions {
  itemSelector?: string;
  imageSelector?: string;
  scaleExpanded?: number;
}

/**
 * Brutalist-style vertical slider: one ScrollTrigger on the whole list
 * drives one shared timeline (the scale "spotlight" effect, per the
 * article). Separately, one lightweight ScrollTrigger per item tracks
 * which item is currently centered, so a side nav can highlight it —
 * this is what the reference layout's right-side case list is doing.
 */
export function useVerticalSlider<T extends HTMLElement>({
  itemSelector = "[data-slider-item]",
  imageSelector = "[data-slider-image]",
  scaleExpanded = 1.15,
}: UseVerticalSliderOptions = {}) {
  const containerRef = useRef<T | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    ensureGsapPlugins();

    const container = containerRef.current;
    const items = container.querySelectorAll<HTMLElement>(itemSelector);
    const activeTriggers: ScrollTrigger[] = [];

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top-=6.5% center",
        end: "bottom center-=0.5%",
        scrub: true,
      },
    });

    items.forEach((item, index) => {
      const image = item.querySelector<HTMLElement>(imageSelector);
      if (!image) return;

      timeline.to(
        image,
        { scaleX: scaleExpanded, scaleY: scaleExpanded, force3D: true, duration: 0.8, ease: "none" },
        index
      );
      timeline.to(
        image,
        { scaleX: 1, scaleY: 1, force3D: true, duration: 1.5, ease: "none", delay: 0.3 },
        ">"
      );

      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveIndex(index);
        },
      });
      activeTriggers.push(trigger);
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      activeTriggers.forEach((trigger) => trigger.kill());
    };
  }, [itemSelector, imageSelector, scaleExpanded]);

  return { containerRef, activeIndex };
}