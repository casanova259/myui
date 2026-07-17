"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers the plugins this library needs, exactly once, and only in the
 * browser. Safe to call from every hook/component — if your app already
 * registers these elsewhere, this just becomes a no-op after the first call.
 */
export function ensureGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(SplitText, Flip, ScrollTrigger);
  registered = true;
}

export { gsap, SplitText, Flip, ScrollTrigger };
