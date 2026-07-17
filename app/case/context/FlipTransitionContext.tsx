"use client";

import { createContext, useCallback, useContext, useRef, ReactNode } from "react";
import { ensureGsapPlugins, Flip, gsap } from "../lib/gsap";

interface StoredFlipState {
  state: Flip.FlipState;
}

interface FlipTransitionContextValue {
  /** Call right before navigating away, on the element that should "become" the destination element. */
  captureBeforeNavigate: (id: string, element: HTMLElement, props?: string) => void;
  /** Call on mount of the destination element; animates it in if a matching capture exists. */
  consumeOnMount: (id: string, element: HTMLElement) => void;
}

const FlipTransitionContext = createContext<FlipTransitionContextValue | null>(null);

/**
 * In a static multi-page site (the original case study used Swup), the DOM
 * from page A is still around while page B animates in, so Flip can read
 * both directly. Next.js unmounts page A first, so this provider's job is
 * to hold the *captured* Flip state in memory across that gap, keyed by an
 * id both sides agree on (e.g. "about-link").
 */
export function FlipTransitionProvider({ children }: { children: ReactNode }) {
  const store = useRef<Map<string, StoredFlipState>>(new Map());

  const captureBeforeNavigate = useCallback(
    (id: string, element: HTMLElement, props = "fontSize,lineHeight,letterSpacing,color") => {
      ensureGsapPlugins();
      store.current.set(id, {
        state: Flip.getState(element, { props }),
      });
    },
    []
  );

  const consumeOnMount = useCallback((id: string, element: HTMLElement) => {
    const entry = store.current.get(id);
    if (!entry) return;
    ensureGsapPlugins();

    gsap.set(element, { opacity: 0 });
    Flip.from(entry.state, {
      targets: element,
      absolute: true,
      simple: true,
      duration: 0.9,
      ease: "expo.inOut",
      onStart: () => gsap.set(element, { opacity: 1 }),
    });

    store.current.delete(id);
  }, []);

  return (
    <FlipTransitionContext.Provider value={{ captureBeforeNavigate, consumeOnMount }}>
      {children}
    </FlipTransitionContext.Provider>
  );
}

export function useFlipTransition() {
  const ctx = useContext(FlipTransitionContext);
  if (!ctx) {
    throw new Error("useFlipTransition must be used within a <FlipTransitionProvider>");
  }
  return ctx;
}
