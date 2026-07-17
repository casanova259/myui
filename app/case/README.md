# GSAP Case Study — Next.js rebuild

Rebuild of the case-study article's five animation pieces as reusable hooks +
components for a Next.js (App Router) component library.

## Assumptions

- `gsap`, `gsap/SplitText`, `gsap/Flip`, `gsap/ScrollTrigger` are already
  installed (SplitText and Flip are Club GSAP plugins).
- Path aliases below use relative imports (`../../lib/gsap`) so you can drop
  this folder straight into your library without touching `tsconfig.json`.
  Swap to `@/...` aliases if you prefer.
- Tailwind is available for the demo class names; none of the hooks
  themselves require it.

## Structure

```
lib/gsap.ts                     central plugin registration (idempotent)

hooks/
  useSplitReveal.ts              title (chars) / paragraph (lines) reveal
  useGalleryReveal.ts            fade-up stagger for image/video grids
  useFlipMorph.ts                generic Flip capture -> mutate -> animate
  useVerticalSlider.ts           scroll-scrubbed slider (list -> grid slider)

context/
  FlipTransitionContext.tsx      keeps Flip state alive across navigation

components/
  FlipLink.tsx                   Link that captures Flip state on click
  FlipTarget.tsx                 destination element that consumes it
  VerticalSlider.tsx             uses useVerticalSlider
  SliderGridToggle.tsx           uses useFlipMorph, list <-> grid
  Preloader.tsx                  steps() counter + Flip handoff to showreel

app/gsap-case-study/
  layout.tsx                     hosts <FlipTransitionProvider>
  page.tsx                       thin route -> CaseStudyShowcase
  CaseStudyShowcase.tsx           the actual page content
  about/page.tsx                 thin route -> AboutShowcase
  about/AboutShowcase.tsx         FlipTarget destination page
```

## Why the provider lives in `layout.tsx`

Next.js keeps a shared layout mounted while navigating between routes under
it. `FlipTransitionProvider`'s in-memory store relies on that: it holds the
captured Flip state from the "About" link on the home page until the About
page's `<FlipTarget>` mounts and consumes it. If the provider were mounted
per-page instead, every navigation would create a fresh store and the
captured state would never reach the destination — this mirrors the way the
original article's version (built with Swup, on a static multi-page site)
kept both DOMs alive briefly during the transition.

## Notes on fidelity to the article

- The vertical slider and slider/grid toggle port the article's GSAP code
  close to verbatim (same ease curves, same `steps(14)` preloader easing,
  same Flip options).
- `useFlipMorph` wraps its mutation in `flushSync` — a detail the article
  didn't need (vanilla JS DOM mutations are already synchronous) but that
  React requires so Flip doesn't capture/animate against a stale render.
- The preloader's handoff to the showreel is adapted rather than 1:1: the
  article toggles a CSS class on an element already sitting next to the
  video; here `Preloader` takes a `showreelTargetRef` pointing at that real
  element and morphs onto its measured bounding box, since Next.js
  components don't share a single global stylesheet toggle in the same way.
- Three.js "rock" animation and Lenis smooth-scroll wiring from the article
  aren't included — the article itself treats the former as a separate
  tutorial, and Lenis is a global scroll-behavior setup rather than a
  per-component concern (add it once in your root layout if wanted).

## Wiring an existing showreel video

```tsx
const showreelRef = useRef<HTMLDivElement>(null);

<Preloader posterSrc="/poster.jpg" showreelTargetRef={showreelRef} />
<div ref={showreelRef}>
  <video src="/showreel.mp4" autoPlay muted loop playsInline />
</div>
```
