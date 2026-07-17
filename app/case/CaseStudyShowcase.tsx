"use client";

import { useRef } from "react";
import { FlipLink } from "./components/FlipLink";
import { Preloader } from "./components/Preloader";
import { VerticalSlider } from "./components/VerticalSlider";
import { SliderGridToggle } from "./components/SliderGridToggle";
import { useSplitReveal } from "./hooks/useSplitReveal";
import { useGalleryReveal } from "./hooks/useGalleryReveal";

const works = [
  { id: "01", title: "Aperture", image: "/uniq/img6.jpg" },
  { id: "02", title: "Northline", image: "/uniq/img7.jpg" },
  { id: "03", title: "Monolith", image: "/uniq/img8.jpg" },
  { id: "04", title: "Faint Signal", image: "/uniq/img9.jpg" },
];

/**
 * The actual page content, kept separate from app/gsap-case-study/page.tsx
 * so the route file stays a thin server-component wrapper.
 */
export function CaseStudyShowcase() {
  const titleRef = useSplitReveal<HTMLHeadingElement>({ mode: "title" });
  const paragraphRef = useSplitReveal<HTMLParagraphElement>({ mode: "paragraph" });
  const galleryRef = useGalleryReveal<HTMLDivElement>();
  const showreelRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Preloader posterSrc="/demo/poster.jpg" showreelTargetRef={showreelRef} />

      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-sm uppercase tracking-wide">Case Study</span>
        <FlipLink
          flipId="about-link"
          href="/gsap-case-study/about"
          className="text-sm uppercase tracking-wide"
        >
          About
        </FlipLink>
      </header>

      <section className="px-8 py-24">
        <h1 ref={titleRef} className="text-6xl font-medium tracking-tight">
          Restrained, precise, direct.
        </h1>
        <p ref={paragraphRef} className="mt-6 max-w-xl text-lg text-neutral-500">
          A minimal, brutalist-leaning portfolio originally built with Astro,
          GSAP, Three.js, Lenis and Swup — rebuilt here as a Next.js
          component set with the same interactions.
        </p>
      </section>

      <div ref={showreelRef} className="mx-8 aspect-video bg-neutral-900" />

      <section ref={galleryRef} className="grid grid-cols-2 gap-6 px-8 py-24">
        {works.map((work) => (
          <div key={work.id} data-gallery-item className="aspect-[4/5] bg-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
          </div>
        ))}
      </section>

      <section className="px-8 py-24">
        <VerticalSlider works={works} />
      </section>

      <section className="px-8 py-24">
        <SliderGridToggle works={works} />
      </section>
    </>
  );
}
