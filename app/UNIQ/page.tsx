"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "./uniq.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function HeroAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fgContentRef = useRef<HTMLDivElement>(null);
  const fgOverlayDarkRef = useRef<HTMLDivElement>(null);
  const fgOverlayRef = useRef<HTMLDivElement>(null);
  const bgCopyLeftRef = useRef<HTMLDivElement>(null);
  const bgCopyRightRef = useRef<HTMLDivElement>(null);
  const outroImgTopRef = useRef<HTMLDivElement>(null);
  const outroImgBottomRef = useRef<HTMLDivElement>(null);
  const outroHeaderRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const fgContent = fgContentRef.current;
      const fgOverlayDark = fgOverlayDarkRef.current;
      const fgOverlayAccent = fgOverlayRef.current;
      const bgCopyLeft = bgCopyLeftRef.current;
      const bgCopyRight = bgCopyRightRef.current;
      const outroImgTop = outroImgTopRef.current;
      const outroImgBottom = outroImgBottomRef.current;
      const outroHeader = outroHeaderRef.current;

      if (
        !heroRef.current ||
        !fgContent ||
        !fgOverlayDark ||
        !fgOverlayAccent ||
        !bgCopyLeft ||
        !bgCopyRight ||
        !outroImgTop ||
        !outroImgBottom ||
        !outroHeader
      ) {
        return;
      }

      // Lenis smooth scroll wired into ScrollTrigger's update loop
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // ASSUMPTION: exact SplitText config wasn't visible in the
      // screenshots — only `.lines` usage further down. "lines" type
      // + initial y:"100%" (hidden below) matches how it's animated in.
      // `mask: "lines"` wraps each line in its own overflow-hidden
      // container so the translated (hidden) line is actually clipped
      // instead of just sitting visible, shifted down — without this,
      // the text bleeds through and overlaps the Motion/Silence copy
      // underneath before the outro phase even starts.
      const outroHeaderSplit = SplitText.create(outroHeader, {
        type: "lines",
        mask: "lines",
      });
      gsap.set(outroHeaderSplit.lines, { y: "100%" });

      let areOutroLinesRevealed = false;

      const st = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const scrollProgress = self.progress;

          // Phase 1 (0 → 0.25): fg content slit opens, dark overlay fades in
          const phase1Progress = gsap.utils.clamp(0, 1, scrollProgress / 0.25);
          const slitLeftEdge = gsap.utils.interpolate(0, 48, phase1Progress);
          const slitRightEdge = gsap.utils.interpolate(100, 52, phase1Progress);

          gsap.set(fgContent, {
            clipPath: `polygon(${slitLeftEdge}% 0%, ${slitRightEdge}% 0%, ${slitRightEdge}% 100%, ${slitLeftEdge}% 100%)`,
          });

          const darkOverlayOpacity = gsap.utils.interpolate(0, 1, phase1Progress);
          gsap.set(fgOverlayDark, { opacity: darkOverlayOpacity });

          // Phase 2 (0.25 → 0.45): fg content rotates
          const phase2Progress = gsap.utils.clamp(
            0,
            1,
            (scrollProgress - 0.25) / 0.2
          );
          const fgRotation = gsap.utils.interpolate(0, 65, phase2Progress);
          gsap.set(fgContent, { rotate: fgRotation });

          // Phase 3 (0.45 → 0.65): fg content scales down, bg copy slides out
          const phase3Progress = gsap.utils.clamp(
            0,
            1,
            (scrollProgress - 0.45) / 0.2
          );
          const fgScale = gsap.utils.interpolate(1, 0, phase3Progress);
          gsap.set(fgContent, { scale: fgScale });

          const bgCopyLeftX = gsap.utils.interpolate(0, 100, phase3Progress);
          const bgCopyRightX = gsap.utils.interpolate(0, -100, phase3Progress);
          gsap.set(bgCopyLeft, { x: `${bgCopyLeftX}%` });
          gsap.set(bgCopyRight, { x: `${bgCopyRightX}%` });

          // Phase 3 overlay (0.45 → 0.5): accent overlay fades in
          const phase3OverlayProgress = gsap.utils.clamp(
            0,
            1,
            (scrollProgress - 0.45) / 0.05
          );
          const redOverlayOpacity = gsap.utils.interpolate(
            0,
            1,
            phase3OverlayProgress
          );
          gsap.set(fgOverlayAccent, { opacity: redOverlayOpacity });

          // Phase 4 (0.65 → 0.85): outro images reveal via clip-path
          const phase4Progress = gsap.utils.clamp(
            0,
            1,
            (scrollProgress - 0.65) / 0.2
          );

          const topImgBottomEdge = gsap.utils.interpolate(0, 100, phase4Progress);
          gsap.set(outroImgTop, {
            clipPath: `polygon(0% 0%, 100% 0%, 100% ${topImgBottomEdge}%, 0% ${topImgBottomEdge}%)`,
          });

          const bottomImgTopEdge = gsap.utils.interpolate(100, 0, phase4Progress);
          gsap.set(outroImgBottom, {
            clipPath: `polygon(0% ${bottomImgTopEdge}%, 100% ${bottomImgTopEdge}%, 100% 100%, 0% 100%)`,
          });

          // Phase 5 (0.9 →): outro header lines reveal / hide
          if (scrollProgress >= 0.9 && !areOutroLinesRevealed) {
            areOutroLinesRevealed = true;
            gsap.to(outroHeaderSplit.lines, {
              y: "0%",
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
            });
          } else if (scrollProgress < 0.9 && areOutroLinesRevealed) {
            areOutroLinesRevealed = false;
            gsap.to(outroHeaderSplit.lines, {
              y: "100%",
              duration: 0.25,
              stagger: -0.05,
              ease: "power3.out",
            });
          }
        },
      });

      return () => {
        st.kill();
        outroHeaderSplit.revert();
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div className="hero-animation-wrapper" ref={wrapperRef}>
      <section className="hero" ref={heroRef}>
        {/* Foreground layer (clipped, sits above bg) */}
        <div className="hero-fg-content" ref={fgContentRef}>
          <div className="hero-fg-img">
            <img src="/images2/img1.jpg" alt="" />
          </div>

          <div className="hero-fg-header">
            <h1>You Have To Go Down To Go High</h1>
          </div>

          <div className="hero-fg-overlay-dark" ref={fgOverlayDarkRef} />
          <div className="hero-fg-overlay" ref={fgOverlayRef} />
        </div>

        {/* Background layer (revealed as fg clip-path animates) */}
        <div className="hero-bg-content">
          <div className="hero-bg-content-col">
            <div className="hero-bg-content-copy" ref={bgCopyLeftRef}>
              <h3>Motion</h3>
              <p>
                Bodies drawn through engineered light and open dark. Every
                frame caught between the signal and the shadow that it
                quietly leaves behind.
              </p>
            </div>
          </div>

          <div className="hero-bg-content-col">
            <div className="hero-bg-content-copy" ref={bgCopyRightRef}>
              <h3>Silence</h3>
              <p>
                Stillness measured in reflected color and slow heat. Where
                the moving crowd dissolves and only the burning outline
                holds against the night.
              </p>
            </div>
          </div>
        </div>

        {/* Outro layer (two images clip-path split top/bottom) */}
        <div className="hero-outro-content">
          <div className="hero-outro-img" ref={outroImgTopRef}>
            <img src="/images2/img2.jpg" alt="" />
          </div>
          <div className="hero-outro-img" ref={outroImgBottomRef}>
            <img src="/images2/img3.jpg" alt="" />
          </div>

          <div className="hero-outro-header">
            <h3 className="hero-outro-line" ref={outroHeaderRef}>
              You become the shape that the light finally learns to find.
            </h3>
          </div>
        </div>
      </section>

      <section className="about">
        <h3>
          A studio built for image, motion, and the quiet glow that keeps
          burning after.
        </h3>
      </section>
    </div>
  );
}