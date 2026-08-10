"use client";

import { useEffect, useRef, useState } from "react";
import "./OrbitSlider.css";

export interface OrbitSliderProps {
  /** Image URLs to place around the orbit, in order. */
  images: string[];
  /** Optional caption shown for each slide (must line up with `images`). */
  titles?: string[];
  /** Distance (px) each panel sits from the orbit's center. */
  orbitRadius?: number;
  /** Max tilt (deg) the whole stage rotates toward the cursor. */
  maxTilt?: number;
  /** Lerp factor for both rotation and tilt smoothing (0–1, lower = smoother/slower). */
  smoothing?: number;
  className?: string;
}

export default function OrbitSlider({
  images,
  titles,
  orbitRadius = 400,
  maxTilt = 30,
  smoothing = 0.05,
  className,
}: OrbitSliderProps) {
  const sliderRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = images.length;
  const angleBetweenSlides = 360 / totalSlides;

  useEffect(() => {
    const slider = sliderRef.current;
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    const previewBox = previewBoxRef.current;
    const previewImage = previewImgRef.current;

    if (!slider || !stage || !orbit || !previewBox || !previewImage) return;
    if (totalSlides === 0) return;

    const lerp = (from: number, to: number, amount: number) =>
      from + (to - from) * amount;

    let targetRotation = 0;
    let currentRotation = 0;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    let shownIndex = 0;
    let rafId: number;

    const handleWheel = (e: WheelEvent) => {
      targetRotation -= e.deltaY * 0.2;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const distanceFromCenterX = e.clientX / window.innerWidth - 0.5;
      const distanceFromCenterY = e.clientY / window.innerHeight - 0.5;
      targetTiltY = distanceFromCenterX * maxTilt;
      targetTiltX = -distanceFromCenterY * maxTilt;
    };

    const handleMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseleave", handleMouseLeave);

    function showActiveSlide() {
      const steps = Math.round(-currentRotation / angleBetweenSlides);
      const activeIdx = ((steps % totalSlides) + totalSlides) % totalSlides;

      if (activeIdx !== shownIndex) {
        shownIndex = activeIdx;
        previewImage!.src = images[activeIdx];
        setActiveIndex(activeIdx);
      }
    }

    function updateTilt() {
      currentTiltX = lerp(currentTiltX, targetTiltX, smoothing);
      currentTiltY = lerp(currentTiltY, targetTiltY, smoothing);
      stage!.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
    }

    function animate() {
      currentRotation = lerp(currentRotation, targetRotation, smoothing);
      orbit!.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
      previewBox!.style.transform = `translate(-50%, -50%) rotateY(${-currentRotation}deg)`;
      showActiveSlide();
      updateTilt();
      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, totalSlides, angleBetweenSlides, maxTilt, smoothing]);

  return (
    <section
      ref={sliderRef}
      className={["slider", className].filter(Boolean).join(" ")}
    >
      <div className="stage" ref={stageRef}>
        <div className="orbit" ref={orbitRef}>
          {images.map((src, i) => (
            <div
              key={src + i}
              className="panel"
              style={{
                transform: `rotateY(${i * angleBetweenSlides}deg) translateZ(${orbitRadius}px)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </div>
          ))}

          <div className="preview" ref={previewBoxRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={previewImgRef}
              className="preview-img"
              src={images[0]}
              alt=""
            />
          </div>
        </div>
      </div>

      {titles && titles[activeIndex] && (
        <p className="title">{titles[activeIndex]}</p>
      )}
    </section>
  );
}