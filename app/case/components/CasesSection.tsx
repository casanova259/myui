"use client";

import { useVerticalSlider } from "../hooks/useVerticalSlider";

interface Work {
  id: string;
  title: string;
  image: string;
}

interface CasesSectionProps {
  works: Work[];
  devName: string;
  role: string;
  location: string;
  aboutHref?: string;
}

/**
 * Full "Cases" listing section: pinned chrome (name badge, About link,
 * role/location) at the top, a big "Cases" heading pinned bottom-left,
 * the scroll-scrubbed image slider in the center, and a right-side list
 * of case titles that highlights whichever one is currently centered.
 */
export function CasesSection({ works, devName, role, location, aboutHref = "/about" }: CasesSectionProps) {
  const { containerRef, activeIndex } = useVerticalSlider<HTMLDivElement>();

  return (
    <section className="relative bg-neutral-50 text-neutral-900">
      <div className="sticky top-0 z-20 flex items-start justify-between p-8 text-sm">
        <div className="border border-neutral-900 px-3 py-1">{devName}</div>
        <a href={aboutHref} className="uppercase tracking-wide">
          About
        </a>
        <div className="text-right text-neutral-500">
          <p>{role}</p>
          <p>{location}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-12 px-8 pb-40">
        <div ref={containerRef} className="max-w-2xl">
          {works.map((work) => (
            <div key={work.id} data-slider-item className="relative mb-32 aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-slider-image
                src={work.image}
                alt={work.title}
                className="h-full w-full origin-center object-cover"
              />
            </div>
          ))}
        </div>

        <aside className="sticky top-1/2 hidden h-fit -translate-y-1/2 flex-col items-end gap-2 text-right text-sm md:flex">
          {works.map((work, index) => (
            <span
              key={work.id}
              className={index === activeIndex ? "font-semibold text-neutral-900" : "text-neutral-300"}
            >
              {work.title}
            </span>
          ))}
        </aside>
      </div>

      <h2 className="sticky bottom-8 left-8 z-10 text-[10vw] font-bold leading-none">Cases</h2>
    </section>
  );
}