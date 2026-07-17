"use client";

import { useCallback } from "react";
import { flushSync } from "react-dom";
import { ensureGsapPlugins, Flip } from "../lib/gsap";

/**
 * Generic Flip helper: capture the current layout of one or more targets,
 * run a mutation (a class toggle, a setState call, a DOM change), then
 * animate from the captured state to whatever the mutation produced.
 *
 * The mutation is wrapped in `flushSync` because Flip needs the DOM to have
 * already re-rendered with the *new* layout the instant `mutate()` returns —
 * a plain `setState` call wouldn't apply synchronously and Flip would end up
 * capturing/animating against stale positions.
 */
export function useFlipMorph() {
  const morph = useCallback(
    (
      targets: gsap.TweenTarget,
      mutate: () => void,
      options: Flip.FromToVars = {}
    ) => {
      ensureGsapPlugins();
      const state = Flip.getState(targets);

      flushSync(mutate);

      return Flip.from(state, {
        duration: 1,
        ease: "expo.inOut",
        absolute: true,
        simple: true,
        ...options,
      });
    },
    []
  );

  return morph;
}
