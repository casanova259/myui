"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useRef, MouseEvent } from "react";
import { useFlipTransition } from "../context/FlipTransitionContext";

interface FlipLinkProps extends LinkProps {
  /** Shared id — must match the flipId used on the destination's <FlipTarget>. */
  flipId: string;
  children: ReactNode;
  className?: string;
}

/**
 * A Next.js Link that captures its own position/size/typography right
 * before navigating, so a matching <FlipTarget flipId="..."> on the
 * destination page can morph in from exactly where this link was.
 */
export function FlipLink({ flipId, children, className, href, ...rest }: FlipLinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const router = useRouter();
  const { captureBeforeNavigate } = useFlipTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (ref.current) captureBeforeNavigate(flipId, ref.current);
    router.push(href.toString());
  };

  return (
    <Link href={href} ref={ref} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
