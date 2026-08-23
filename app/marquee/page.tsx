"use client";

import { useRef } from "react";
import MarqueeAlongPath from "./_components/MarqueeAlongPath";
import Card from "./_components/card";
import { artworks } from "./_components/artworks";
import "./_components/index.css"

const path =
  "M0 186.219C138.5 186.219 305.5 194.719 305.5 49.7188C305.5 -113.652 -75 186.219 484.5 186.219H587.5";

export default function Page() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="screen"
      ref={scrollContainerRef}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="inner" style={{ width: "100%" }}>
        <div className="content">
          <div>scroll down ↓</div>
        </div>

        <MarqueeAlongPath
          path={path}
          baseVelocity={5}
          repeat={5}
          scrollContainerRef={scrollContainerRef}
        >
          {artworks.map((artwork, i) => (
            <Card key={i} index={i} artwork={artwork} />
          ))}
        </MarqueeAlongPath>

        <div className="content">
          <div>scroll up ↑</div>
        </div>
      </div>
    </div>
  );
}