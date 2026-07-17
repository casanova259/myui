"use client";

import { useRef, useState } from "react";
import { useFlipMorph } from "../hooks/useFlipMorph";

interface Work {
  id: string;
  title: string;
  image: string;
}

interface SliderGridToggleProps {
  works: Work[];
}

/**
 * Toggles a works list between a vertical list and a grid, animating every
 * item from its old position/size to its new one with Flip. Grid placement
 * is expressed as per-index utility classes (rather than nested CSS) to
 * keep selector specificity flat and predictable.
 */
export function SliderGridToggle({ works }: SliderGridToggleProps) {
  const [isGrid, setIsGrid] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const morph = useFlipMorph();

  const toggleLayout = () => {
    if (!wrapperRef.current) return;
    const items = wrapperRef.current.querySelectorAll<HTMLElement>("[data-project-item]");
    morph(items, () => setIsGrid((value) => !value), { nested: true, scale: true });
  };

  const gridSpanClass = (index: number) => {
    if (!isGrid) return "";
    if (index === 0) return "col-span-2";
    if (index === 3) return "col-start-4";
    if (index === 5) return "col-start-1";
    if (index === 7) return "col-start-5";
    return "col-span-1";
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleLayout}
        className="mb-6 text-sm uppercase tracking-wide underline underline-offset-4"
      >
        {isGrid ? "View as list" : "View as grid"}
      </button>

      <div
        ref={wrapperRef}
        className={isGrid ? "grid grid-cols-6 gap-12" : "flex flex-col gap-6"}
      >
        {works.map((work, index) => (
          <div
            key={work.id}
            data-project-item
            className={`relative aspect-[4/5] overflow-hidden bg-neutral-200 ${gridSpanClass(index)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
