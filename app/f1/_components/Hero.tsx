'use client';

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null)
    const heroBgRef = useRef<HTMLDivElement>(null)
    const heroContentRef = useRef<HTMLDivElement>(null)
    const heroRevealerRef = useRef<HTMLDivElement>(null)
    const heroImagesWrapperRef = useRef<HTMLDivElement>(null)
    const heroOutroRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const lenis = new Lenis()
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        const heroSection = heroRef.current
        const heroBackground = heroBgRef.current
        const heroContent = heroContentRef.current
        const heroRevealer = heroRevealerRef.current
        const heroImagesWrapper = heroImagesWrapperRef.current
        const heroOutroContent = heroOutroRef.current
        const heroImages = gsap.utils.toArray<HTMLElement>('.hero-img')

        // Clone outro content
        const heroOutroClone = heroOutroContent!.cloneNode(true) as HTMLElement
        heroOutroContent!.classList.add('hero-outro-left')
        heroOutroClone.classList.add('hero-outro-right')
        heroOutroContent!.parentNode!.appendChild(heroOutroClone)

        gsap.set('.hero-outro-left', {
            clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
        })
        gsap.set('.hero-outro-right', {
            clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
        })

        gsap.set(heroImagesWrapper, { scale: 1 })

        const heroScrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: () => `+=${window.innerHeight * 7}`,
                pin: true,
                pinSpacing: false,
                scrub: true,
                invalidateOnRefresh: true,
            },
        })

        heroScrollTimeline.to(heroBackground, { scale: 1, duration: 0.5 }, 0)

        heroScrollTimeline.to(
            heroRevealer,
            {
                clipPath: ' polygon(50% 0, 50% 0, 50% 100%, 50% 100%',
                duration: 0.2,
            },
            0,
        )

        heroScrollTimeline.to(
            heroRevealer,
            {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.3,
            },
            0.2,
        )

        const cascadeStart = 0.4
        const cascadeStagger = 0.04
        const cascadeDuration = 0.16

        heroImages.forEach((heroImage, index) => {
            heroScrollTimeline.to(
                heroImage,
                {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    scale: 1,
                    duration: cascadeDuration,
                },
                cascadeStart + index * cascadeStagger,
            )
        })

        heroScrollTimeline.to(
            '.hero-outro-content',
            { scale: 1, duration: cascadeDuration },
            cascadeStart + heroImages.length * cascadeStagger + cascadeStagger * 0.5,
        )

        heroScrollTimeline.set(
            [heroBackground, heroContent, heroRevealer, heroImagesWrapper],
            { autoAlpha: 0 },
            0.7,
        )

        heroScrollTimeline.set(heroSection, { backgroundColor: 'transparent' }, 0.7)

        heroScrollTimeline.to(
            '.hero-outro-left',
            { xPercent: -50, duration: 0.3 },
            0.7,
        )

        heroScrollTimeline.to(
            '.hero-outro-right',
            { xPercent: 50, duration: 0.3 },
            0.7,
        )

        return () => {
            lenis.destroy()
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-bg" ref={heroBgRef}>
                <img src="/f1Scroll/5.jpg" alt="" />
            </div>

            <div className="hero-content" ref={heroContentRef}>
                <h1>Speed. Precision. Dominance.</h1>
            </div>

            <div className="hero-revealer" ref={heroRevealerRef}></div>

            <div className="hero-images" ref={heroImagesWrapperRef}>
                <div className="hero-img"><img src="/f1Scroll/6.jpg" alt="" /></div>
                <div className="hero-img"><img src="/f1Scroll/3.jpg" alt="" /></div>
                <div className="hero-img"><img src="/f1Scroll/4.jpg" alt="" /></div>
            </div>

            <div className="hero-outro-content" ref={heroOutroRef}>
                <h1>Built for those who refuse to finish anywhere but first</h1>
            </div>
        </section>
    )
}