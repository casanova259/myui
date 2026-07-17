"use client";

import { createElement, ReactNode, useEffect, useRef } from "react";
import { useFlipTransition } from "../context/FlipTransitionContext";

interface FlipTargetProps {
  /** Shared id — must match the flipId used on the originating <FlipLink>. */
  flipId: string;
  as?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Destination element for a FlipLink transition (typically the page's
 * <h1>). On mount, if a matching flipId was captured just before this page
 * was navigated to, it morphs into place from the link's previous
 * position and typography — otherwise it just renders normally.
 */
export function FlipTarget({ flipId, as = "h1", className, children }: FlipTargetProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { consumeOnMount } = useFlipTransition();

  useEffect(() => {
    if (ref.current) consumeOnMount(flipId, ref.current);
    // Intentionally run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipId]);

  return createElement(as, { ref, className }, children);
}
