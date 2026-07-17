"use client";

import { FlipTarget }from "../components/FlipTarget";

export function AboutShowcase() {
  return (
    <div className="px-8 py-24">
      <FlipTarget flipId="about-link" as="h1" className="text-6xl font-medium tracking-tight">
        About
      </FlipTarget>
      <p className="mt-6 max-w-xl text-lg text-neutral-500">
        The About nav link morphs into this heading using the same Flip
        capture/consume pattern as the original Swup-based transition.
      </p>
    </div>
  );
}
