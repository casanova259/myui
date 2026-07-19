'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './pol.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>('.motion-paths *');

      if (!paths.length) {
        console.warn('No motion paths found — check .motion-paths selector');
        return;
      }

      const xTo = gsap.quickTo('.pov-pan', 'x', { duration: 1.3, ease: 'expo' });
      const yTo = gsap.quickTo('.pov-pan', 'y', { duration: 1.3, ease: 'expo' });

      gsap
        .timeline({
          scrollTrigger: {
            scroller: mainRef.current,
            trigger: '#s1',
            endTrigger: '#s6',
            start: '0 0',
            end: '100% 100%',
            scrub: 1,
          },
          onUpdate: () => {
            xTo(-(gsap.getProperty('.focal-point', 'x') as number));
            yTo(-(gsap.getProperty('.focal-point', 'y') as number));
          },
          defaults: { duration: 1, ease: 'none' },
        })
        .to('.focal-point', { motionPath: paths[0], immediateRender: true }, 0)
        .fromTo(
          '.pov-scale',
          { x: 500, y: 500, scale: 3.2, rotate: 20 },
          { rotate: -5, scale: 2.5, ease: 'sine.inOut' },
          0
        )
        .to('.focal-point', { motionPath: paths[1] }, 1)
        .to('.pov-scale', { rotate: 8, scale: 3.3, ease: 'sine.inOut' }, 1)

        .to('.focal-point', { motionPath: paths[2] }, 2)
        .to('.pov-scale', { rotate: -4, scale: 2.75, ease: 'sine.inOut' }, 2)

        .to('.focal-point', { motionPath: paths[3] }, 3)
        .to('.pov-scale', { rotate: 5, scale: 2, ease: 'sine.inOut' }, 3)

        .to('.focal-point', { motionPath: paths[4] }, 4)
        .to('.pov-scale', { rotate: -5, scale: 3, ease: 'sine.inOut' }, 4);

      gsap.set('.pov-pan', {
        x: -(gsap.getProperty('.focal-point', 'x') as number),
        y: -(gsap.getProperty('.focal-point', 'y') as number),
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="fixed-bg">
        <svg viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid slice">
          <g className="pov-scale">
            <g className="pov-pan">
              <image
                href="/polariod.png"
                width={1000}
              />
              <g className="motion-paths" fill="none">
                <path d="M196 434c66-49 230 44 322 18" />
                <path d="M518 452c22-1 228 65 303 56" />
                <path d="M821 508s-81 263-18 399" />
                <path d="M803 907s-238-64-317-47" />
                <path d="M486 860s-160 76-298 17" />
              </g>
              <circle className="focal-point" r={0} />
            </g>
          </g>
        </svg>
      </div>

      <main ref={mainRef as React.RefObject<HTMLElement>} className="main">
        <section id="s1" className="section" />
        <section id="s2" className="section" />
        <section id="s3" className="section" />
        <section id="s4" className="section" />
        <section id="s5" className="section" />
        <section id="s6" className="section" />
      </main>
    </div>
  );
}