"use client";

import { useRef } from "react";

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const images = [
    "/images2/img1.jpg",
    "/images2/img2.jpg",
    "/images2/img3.jpg",
    "/images2/img4.jpg",
    "/images2/img5.jpg",
    "/images1/img6.jpg",
  ];

  return (
    <div
      ref={preloaderRef}
      className="preloader fixed top-0 left-0 w-full overflow-hidden z-[2] bg-[#0a0a0a] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] [will-change:clip-path]"
      style={{ height: "100svh" }}
    >
      {/* Images */}
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => { if (el) imagesRef.current[i] = el; }}
          className="preloader-img absolute top-1/2 left-1/2 w-[250px] h-[300px] origin-center [transform:translate(-50%,-50%)_scale(0)] [clip-path:polygon(20%_20%,80%_20%,80%_80%,20%_80%)] [will-change:transform,clip-path]"
        >
          <img
            src={src}
            alt={`preloader image ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Header + Counter */}
      <div className="preloader-header absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="uppercase leading-[0.85] text-[clamp(2rem,10vw,15rem)] text-[#f5f5f5]">
          MAK
        </h1>

        {/* Counter */}
        <div className="preloader-counter absolute top-[-1.5rem] left-[calc(100%+1.5rem)] overflow-hidden max-[1000px]:left-[calc(100%+0.5rem)]">
          <p
            ref={counterRef}
            className="text-[#f5f5f5] text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] translate-y-full"
          >
            000
          </p>
        </div>
      </div>
    </div>
  );
};