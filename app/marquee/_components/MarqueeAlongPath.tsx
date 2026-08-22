"use client";

import React, { useMemo, useRef } from "react";
import "./marquealongpath.css" 
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useSpring,
  useScroll,
  useVelocity,
} from "motion/react";

/**
 * Wraps a number between a min and max value
 */
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type MarqueeAlongPathProps = {
  children: React.ReactNode;
  path: string;
  baseVelocity: number;
  repeat?: number;
  zIndexBase?: number;
  showPath?: boolean;
};

type MarqueeItemProps = {
  baseOffset: ReturnType<typeof useMotionValue<number>>;
  path: string;
  itemIndex: number;
  totalItems: number;
  repeatIndex: number;
  zIndexBase: number;
  isHoveredRef: React.MutableRefObject<boolean>;
  children: React.ReactNode;
};

const MarqueeItem = ({
  baseOffset,
  path,
  itemIndex,
  totalItems,
  repeatIndex,
  zIndexBase,
  isHoveredRef,
  children,
}: MarqueeItemProps) => {
  const itemOffset = useTransform(baseOffset, (v: number) => {
    // Distribute items evenly along the path
    const position = (itemIndex * 100) / totalItems;
    const wrappedValue = wrap(0, 100, v + position);
    return `${wrappedValue}%`;
  });

  const zIndex = useTransform(itemOffset, (v) => {
    const progress = parseFloat(v.replace("%", ""));
    return Math.floor(zIndexBase + progress);
  });

  const opacity = useTransform(itemOffset, (v) => {
    const progress = parseFloat(v.replace("%", "")) / 100;
    // f(x) = (1 - |2x - 1|^10)^2
    // fades items in/out near the start/end of the path
    const x = 2 * progress - 1;
    return Math.pow(1 - Math.pow(Math.abs(x), 10), 2);
  });

  return (
    <motion.div
      className="marquee-item"
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        offsetRotate: "auto",
        zIndex,
        opacity,
      }}
      aria-hidden={repeatIndex > 0}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      {children}
    </motion.div>
  );
};

export default function MarqueeAlongPath({
  children,
  path,
  baseVelocity,
  repeat = 1,
  zIndexBase = 0,
  showPath = false,
}: MarqueeAlongPathProps) {
  const baseOffset = useMotionValue(0);

  const isHoveredRef = useRef(false);
  const directionFactor = useRef(1);

  // Slow down smoothly on hover
  const hoverFactorValue = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactorValue, {
    stiffness: 100,
    damping: 20,
  });

  // Scroll-driven velocity
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 20,
  });
  const scrollVelocityFactor = useTransform(
    smoothScrollVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  const items = useMemo(() => {
    const childrenArray = React.Children.toArray(children);

    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex;
        const key = `${childIndex}-${repeatIndex}`;
        return { child, childIndex, repeatIndex, itemIndex, key };
      })
    );
  }, [children, repeat]);

  useAnimationFrame((_, delta) => {
    if (isHoveredRef.current) {
      hoverFactorValue.set(0.3);
    } else {
      hoverFactorValue.set(1);
    }

    let moveBy =
      ((baseVelocity * delta) / 1000) *
      directionFactor.current *
      smoothHoverFactor.get();

    if (scrollVelocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (scrollVelocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * scrollVelocityFactor.get();

    baseOffset.set(baseOffset.get() + moveBy);
  });

  return (
    <div className="container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 588 187"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} stroke={showPath ? "black" : "none"} fill="none" />
      </svg>

      {items.map(({ child, repeatIndex, itemIndex, key }) => (
        <MarqueeItem
          key={key}
          baseOffset={baseOffset}
          path={path}
          itemIndex={itemIndex}
          totalItems={items.length}
          repeatIndex={repeatIndex}
          zIndexBase={zIndexBase}
          isHoveredRef={isHoveredRef}
        >
          {child}
        </MarqueeItem>
      ))}
    </div>
  );
}