import { ReactNode } from "react";
import { FlipTransitionProvider } from "./context/FlipTransitionContext";

/**
 * IMPORTANT: FlipTransitionProvider lives here, not inside the individual
 * page components. Next.js keeps a shared layout mounted across
 * client-side navigations between routes under it, which is what lets the
 * provider's in-memory store survive the trip from /gsap-case-study to
 * /gsap-case-study/about. If the provider were mounted per-page instead,
 * each navigation would create a fresh store and the captured Flip state
 * would never reach the destination page.
 */
export default function GsapCaseStudyLayout({ children }: { children: ReactNode }) {
  return <FlipTransitionProvider>{children}</FlipTransitionProvider>;
}
