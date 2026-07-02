"use client";

import "./uniq.css";

export default function HeroAnimation() {
  return (
    <div className="hero-animation-wrapper">
      <section className="hero">
        {/* Foreground layer (clipped, sits above bg) */}
        <div className="hero-fg-content">
          <div className="hero-fg-img">
            <img src="/hero.jpg" alt="" />
          </div>

          <div className="hero-fg-header">
            <h1>Silhouettes against the burning dark</h1>
          </div>

          <div className="hero-fg-overlay-dark" />
          <div className="hero-fg-overlay" />
        </div>

        {/* Background layer (revealed as fg clip-path animates) */}
        <div className="hero-bg-content">
          <div className="hero-bg-content-col">
            <div className="hero-bg-content-copy">
              <h3>Motion</h3>
              <p>
                Bodies drawn through engineered light and open dark. Every
                frame caught between the signal and the shadow that it
                quietly leaves behind.
              </p>
            </div>
          </div>

          <div className="hero-bg-content-col">
            <div className="hero-bg-content-copy">
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
          <div className="hero-outro-img">
            <img src="/hero-outro-img-1.jpg" alt="" />
          </div>
          <div className="hero-outro-img">
            <img src="/hero-outro-img-2.jpg" alt="" />
          </div>

          <div className="hero-outro-header">
            {/* .line wrapper kept for later GSAP split-text/line animation */}
            <h3 className="hero-outro-line">
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