'use client'

import { useEffect, useRef } from 'react'
import { Bebas_Neue, Space_Mono } from 'next/font/google'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-mono',
})

export default function HUD() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hud-bracket', {
                opacity: 0,
                scale: 1.05,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    scrub:true
                },
            })

            gsap.from('.hud-scale-item', {
                opacity: 0,
                x: (i) => (i % 2 === 0 ? -20 : 20),
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    scrub:true
                },
            })

            gsap.from('.hud-center', {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    scrub:true
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const lapScales = ['1:18', '1:19', '1:20', '1:21', '1:22', '1:23', '1:24']
    const speedScales = [280, 290, 300, 305, 310, 315, 320]

    return (
        <section
            ref={sectionRef}
            className={`hud-section  ${spaceMono.variable}`}
        >
            {/* Top axis */}
            <div className="hud-top-axis">
                <span className="hud-axis-label">TELEMETRY — SECTOR 01</span>
                <div className="hud-tick-row">
                    {['055', '060', '065', '070', '075', '080'].map((t) => (
                        <span key={t} className={`hud-tick ${t === '070' ? 'active' : ''}`}>{t}</span>
                    ))}
                </div>
            </div>

            {/* Main grid */}
            <div className="hud-grid">

                {/* Left scale — lap times */}
                <div className="hud-scale left">
                    {lapScales.map((val, i) => (
                        <div key={i} className={`hud-scale-item ${val === '1:23' ? 'active' : ''}`}>
                            <span>{val}</span>
                            <div className="hud-scale-line" />
                        </div>
                    ))}
                </div>

                {/* Center — bracketed image */}
                <div className="hud-center">
                    {/* Corner brackets */}
                    <div className="hud-bracket top-left" />
                    <div className="hud-bracket top-right" />
                    <div className="hud-bracket bottom-left" />
                    <div className="hud-bracket bottom-right" />

                    {/* Crosshair top */}
                    {/* <div className="hud-crosshair top" />
                    <div className="hud-crosshair bottom" /> */}

                    {/* Image */}
                    <div className="hud-img-wrap">
                        <Image
                            src="/f1Scroll-optimized/4.jpg"
                            alt="Mercedes W15"
                            fill
                            quality={80}
                            style={{ objectFit: 'cover', filter: 'grayscale(100%) brightness(0.7)' }}
                        />
                    </div>

                    

                    {/* Fig label */}
                    {/* <span className="hud-fig">/ FIG. 01 — W15 CHASSIS</span> */}
                </div>

                {/* Right scale — speed */}
                <div className="hud-scale right">
                    {speedScales.map((val, i) => (
                        <div key={i} className={`hud-scale-item ${val === 310 ? 'active' : ''}`}>
                            <div className="hud-scale-line" />
                            <span>{val}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Vertical rotated text */}
            <div className="hud-vertical-left">AERODYNAMIC INTEGRATION — STAGE 01</div>
            <div className="hud-vertical-right">SILVERSTONE — 2025</div>

            {/* Speed readout */}
            <div className="hud-readout left">
                <span className="hud-readout-label">M 1:23.4</span>
                <div className="hud-readout-line" />
            </div>
            <div className="hud-readout right">
                <div className="hud-readout-line" />
                <span className="hud-readout-box">310 KM/H</span>
            </div>

        </section>
    )
}