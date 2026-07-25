"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { ScrollArea } from "./_components/ScrollArea";

const ITEMS = Array.from({ length: 11 }).map((_, i) => `00${i}`);

const ListItem = ({ label }: { label: string }) => (
  <div className="flex h-10 w-full items-center gap-2 rounded-lg bg-zinc-900/60 px-4 text-zinc-500 hover:bg-zinc-800/70">
    {label}
    <div className="h-px flex-1 bg-zinc-800" />
  </div>
);

/* ---------------------------------------------------------
   Normal scroll — plain scrollbar, no fade at all.
--------------------------------------------------------- */
const NormalScrollList = () => (
  <div className="rounded-xl border border-zinc-800">
    <ScrollArea className="w-62 h-72 rounded-xl">
      <div className="space-y-1 p-1">
        {ITEMS.map((label, index) => (
          <ListItem key={index} label={label} />
        ))}
      </div>
    </ScrollArea>
  </div>
);

/* ---------------------------------------------------------
   Fade scroll — driven by a manual scroll listener (instead of
   motion's useScroll on a container ref, which can miss
   its target if the ref isn't attached yet on first render).
   topOpacity ramps in over the first 8% of scroll, bottomOpacity
   ramps out over the last 8%.
--------------------------------------------------------- */
const FadeScrollList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topOpacity = useMotionValue(0);
  const bottomOpacity = useMotionValue(1);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;

    if (maxScroll <= 0) {
      topOpacity.set(0);
      bottomOpacity.set(0);
      return;
    }

    const progress = el.scrollTop / maxScroll;
    topOpacity.set(Math.min(progress / 0.08, 1));
    bottomOpacity.set(
      progress > 0.92 ? Math.max(1 - (progress - 0.92) / 0.08, 0) : 1
    );
  };

  // set correct initial values on mount (e.g. if content doesn't
  // overflow, or the list starts pre-scrolled)
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="relative rounded-xl border border-zinc-800">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-62 h-72 overflow-y-auto rounded-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="space-y-1 p-1">
          {ITEMS.map((label, index) => (
            <ListItem key={index} label={label} />
          ))}
        </div>
      </div>

      {/* top fade mask */}
      <motion.div
        style={{ opacity: topOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 h-10 rounded-t-xl bg-gradient-to-b from-zinc-950 to-transparent"
      />
      {/* bottom fade mask */}
      <motion.div
        style={{ opacity: bottomOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-xl bg-gradient-to-t from-zinc-950 to-transparent"
      />
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs uppercase tracking-wide text-zinc-500">
    {children}
  </span>
);

/* ---------------------------------------------------------
   Comparison route — side by side. Hardcoded dark palette
   (zinc-950/900/800/500), no CSS variables, no "dark" class,
   no theme setup required — it just is dark, always.
--------------------------------------------------------- */
const FadeScrollComparison = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-zinc-950 py-10 text-zinc-100">
      <div className="mx-auto grid w-fit content-start justify-items-center gap-6 text-center">
        <span className="relative max-w-[20ch] text-xs uppercase leading-tight text-zinc-500">
          normal scroll vs. fade scroll
        </span>
      </div>

      <div className="mx-auto grid w-fit grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
        <div className="grid justify-items-center gap-3">
          <Label>Normal scroll</Label>
          <NormalScrollList />
        </div>
        <div className="grid justify-items-center gap-3">
          <Label>Fade scroll</Label>
          <FadeScrollList />
        </div>
      </div>
    </div>
  );
};

export { FadeScrollComparison, NormalScrollList, FadeScrollList };
export default FadeScrollComparison;