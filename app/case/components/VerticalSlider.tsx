"use client";

import { useVerticalSlider } from "../hooks/useVerticalSlider";

interface Work {
  id: string;
  title: string;
  image: string;
}

interface VerticalSliderProps {
  works: Work[];
}

export function VerticalSlider({ works }: VerticalSliderProps) {
  const containerRef = useVerticalSlider<HTMLDivElement>();

  return (
    <div ref={containerRef} className="flex flex-col">
      {works.map((work) => (
        <div key={work.id} data-slider-item className="flex items-center gap-8 py-12">
          <span className="w-8 shrink-0 text-sm text-neutral-400">{work.id}</span>
          <div
            data-slider-image
            className="aspect-video w-full origin-center overflow-hidden bg-neutral-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
          </div>
          <span className="w-40 shrink-0 text-sm text-neutral-500">{work.title}</span>
        </div>
      ))}
    </div>
  );
}
