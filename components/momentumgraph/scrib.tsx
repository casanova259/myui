"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface StrokePath {
    d: string;
    color: string;
    width: number;
}

const SKETCH_STROKES: StrokePath[] = [
    { d: "M 48 32 L 572 32 L 572 368 L 48 368 Z", color: "#555", width: 2 },
    { d: "M 68 72 Q 70 68 260 70 Q 262 74 260 78 Q 70 76 68 78 Z", color: "#222", width: 2.5 },
    { d: "M 68 96 Q 70 93 340 95 Q 342 99 340 101 Q 70 99 68 101 Z", color: "#555", width: 1.5 },
    { d: "M 68 120 L 340 120 L 340 340 L 68 340 Z", color: "#666", width: 1.8 },
    { d: "M 204 230 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0", color: "#888", width: 1.5 },
    { d: "M 100 230 Q 204 180 308 230 Q 204 280 100 230", color: "#c0392b", width: 1.5 },
    { d: "M 360 120 L 552 120 L 552 220 L 360 220 Z", color: "#666", width: 1.8 },
    { d: "M 376 148 L 536 148", color: "#888", width: 1.2 },
    { d: "M 376 166 L 500 166", color: "#888", width: 1.2 },
    { d: "M 376 184 L 520 184", color: "#888", width: 1.2 },
    { d: "M 376 202 L 480 202", color: "#888", width: 1.2 },
    { d: "M 360 236 L 552 236 L 552 340 L 360 340 Z", color: "#666", width: 1.8 },
    { d: "M 376 320 L 396 295 L 416 308 L 436 278 L 456 290 L 476 262 L 496 275 L 516 255 L 536 268", color: "#1a5276", width: 2 },
    { d: "M 310 175 L 290 190 L 296 183 M 290 190 L 298 188", color: "#e74c3c", width: 1.8 },
    { d: "M 68 66 Q 130 60 200 64 Q 202 72 200 78 Q 130 74 68 70 Z", color: "#f39c12", width: 1.2 },
];

type Phase = "idle" | "sketching" | "transforming" | "polished";

function getTotalLength(el: SVGPathElement | null): number {
    if (!el) return 300;
    try { return el.getTotalLength(); } catch { return 300; }
}

// FIX 1: removed unused `seed` variable
const STARS = Array.from({ length: 60 }, (_, i) => {
    const x = ((i * 97 + 13) % 520) + 40;
    const y = ((i * 61 + 7) % 340) + 30;
    const r = (i % 3 === 0) ? 1.2 : (i % 3 === 1) ? 0.8 : 0.5;
    const op = 0.3 + (i % 5) * 0.12;
    return { x, y, r, op };
});

const CONSTELLATION_LINES = [
    [0, 7], [7, 14], [14, 21], [21, 3],
    [10, 18], [18, 25], [25, 32],
    [5, 12], [12, 19],
];

export default function RawCanvas() {
    const sketchGroupRef = useRef<SVGGElement>(null);
    const polishedGroupRef = useRef<SVGGElement>(null);
    const strokeRefs = useRef<(SVGPathElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [phase, setPhase] = useState<Phase>("idle");
    // FIX 2: replaced useState(false) + cascading effect with a plain ref
    const mountedRef = useRef(false);

    const runAnimation = () => {
        if (tlRef.current) tlRef.current.kill();

        gsap.set(sketchGroupRef.current, { opacity: 0 });
        gsap.set(polishedGroupRef.current, { opacity: 0 });

        strokeRefs.current.forEach((el) => {
            if (!el) return;
            const len = getTotalLength(el);
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        });

        const polishedEl = polishedGroupRef.current;
        if (polishedEl) {
            Array.from(polishedEl.children).forEach((child) => {
                gsap.set(child, { opacity: 0, y: 6 });
            });
        }

        const tl = gsap.timeline({ onStart: () => setPhase("sketching") });
        tlRef.current = tl;

        tl.to(sketchGroupRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" });

        strokeRefs.current.forEach((el, i) => {
            if (!el) return;
            const len = getTotalLength(el);
            const dur = 0.2 + (len / 700) * 0.45;
            tl.to(el, { strokeDashoffset: 0, duration: dur, ease: "none" }, i === 0 ? "+=0.15" : "-=0.04");
        });

        tl.to({}, { duration: 0.7 });

        tl.addLabel("transform")
            .call(() => setPhase("transforming"))
            .to(sketchGroupRef.current, { opacity: 0, scale: 1.04, transformOrigin: "50% 50%", duration: 0.65, ease: "power2.inOut" }, "transform")
            .set(polishedGroupRef.current, { opacity: 1 }, "transform+=0.55");

        tl.addLabel("build", "transform+=0.58");
        if (polishedEl) {
            Array.from(polishedEl.children).forEach((child, i) => {
                tl.to(child, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, `build+=${i * 0.075}`);
            });
        }

        tl.call(() => setPhase("polished"));
    };

    // FIX 2 + FIX 3: no setState in effect body, no suppression comment needed
    useEffect(() => {
        if (mountedRef.current) return;
        mountedRef.current = true;
        const t = setTimeout(runAnimation, 500);
        return () => clearTimeout(t);
    }, []);

    const handleMetricHover = (e: React.MouseEvent<SVGGElement>, isEnter: boolean) => {
        if (phase !== "polished") return;
        gsap.to(e.currentTarget, {
            x: isEnter ? 6 : 0,
            opacity: isEnter ? 1 : 0.7,
            duration: 0.25,
            ease: "power2.out"
        });
    };

    const phaseLabel: Record<Phase, string> = {
        idle: "—",
        sketching: "sketching…",
        transforming: "materialising…",
        polished: "rendered",
    };

    return (
        <div style={{ background: "#f0ede8", borderRadius: 20, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", fontFamily: "system-ui, sans-serif" }}>
            <div style={{ width: "100%", maxWidth: 620, borderRadius: 14, overflow: "hidden", position: "relative", aspectRatio: "620/400" }}>
                <svg viewBox="0 0 620 400" width="100%" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
                    <rect width="620" height="400" fill="#faf9f6" />
                    {Array.from({ length: 11 }, (_, i) => (
                        <line key={i} x1={0} y1={36 + i * 36} x2={620} y2={36 + i * 36} stroke="#e8e4dc" strokeWidth={0.7} />
                    ))}
                    <line x1={44} y1={0} x2={44} y2={400} stroke="#d0e8f5" strokeWidth={1.2} />

                    <g ref={sketchGroupRef} style={{ opacity: 0 }}>
                        {SKETCH_STROKES.map((s, i) => (
                            <path
                                key={i}
                                ref={(el) => { strokeRefs.current[i] = el; }}
                                d={s.d}
                                fill="none"
                                stroke={s.color}
                                strokeWidth={s.width}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        ))}
                        <text x="68" y="116" fontSize={10} fill="#888" fontFamily="system-ui, sans-serif" opacity={0.7}>main viz</text>
                        <text x="360" y="116" fontSize={10} fill="#888" fontFamily="system-ui, sans-serif" opacity={0.7}>stats panel</text>
                        <text x="360" y="232" fontSize={10} fill="#888" fontFamily="system-ui, sans-serif" opacity={0.7}>chart</text>
                    </g>

                    <g ref={polishedGroupRef} style={{ opacity: 0 }}>
                        <rect id="space-bg" x={0} y={0} width={620} height={400} fill="#080c14" />
                        <g id="grid">
                            {Array.from({ length: 8 }, (_, i) => (
                                <line key={i} x1={0} y1={i * 57} x2={620} y2={i * 57} stroke="#ffffff" strokeWidth={0.15} strokeOpacity={0.08} />
                            ))}
                            {Array.from({ length: 11 }, (_, i) => (
                                <line key={i} x1={i * 62} y1={0} x2={i * 62} y2={400} stroke="#ffffff" strokeWidth={0.15} strokeOpacity={0.08} />
                            ))}
                        </g>
                        <g id="stars">
                            {STARS.map((s, i) => (
                                <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#ffffff" opacity={s.op} />
                            ))}
                        </g>
                        <g id="constellations">
                            {CONSTELLATION_LINES.map(([a, b], i) => (
                                <line key={i} x1={STARS[a].x} y1={STARS[a].y} x2={STARS[b].x} y2={STARS[b].y} stroke="#5dcaa5" strokeWidth={0.4} strokeOpacity={0.3} />
                            ))}
                        </g>
                        <g id="header">
                            <rect x={0} y={0} width={620} height={48} fill="#0d1420" />
                            <rect x={0} y={47} width={620} height={0.5} fill="#1d9e75" fillOpacity={0.4} />
                            <circle cx={22} cy={24} r={6} fill="#1d9e75" fillOpacity={0.9} />
                            <text x={36} y={28} fontSize={11} fontWeight={700} fill="#e1f5ee" fontFamily="system-ui, sans-serif" letterSpacing="0.12em">AETHER OS</text>
                            <text x={480} y={20} fontSize={9} fill="#5dcaa5" fontFamily="system-ui, sans-serif" opacity={0.8}>SECTOR 7-G</text>
                            <text x={480} y={34} fontSize={9} fill="#888" fontFamily="system-ui, sans-serif">2187.04.03 // 22:41 UTC</text>
                            <circle cx={596} cy={24} r={5} fill="none" stroke="#5dcaa5" strokeWidth={1} />
                            <circle cx={596} cy={24} r={2} fill="#5dcaa5" />
                        </g>
                        <g id="planet-panel">
                            <rect x={16} y={60} width={300} height={328} rx={8} fill="#0d1420" stroke="#1d9e75" strokeWidth={0.5} strokeOpacity={0.4} />
                            <ellipse cx={166} cy={228} rx={88} ry={88} fill="none" stroke="#1d9e75" strokeWidth={0.4} strokeOpacity={0.15} />
                            <ellipse cx={166} cy={228} rx={100} ry={100} fill="none" stroke="#1d9e75" strokeWidth={0.3} strokeOpacity={0.08} />
                            <circle cx={166} cy={228} r={72} fill="#0f1e30" stroke="#1d9e75" strokeWidth={0.6} strokeOpacity={0.5} />
                            <ellipse cx={166} cy={228} rx={72} ry={18} fill="none" stroke="#5dcaa5" strokeWidth={0.5} strokeOpacity={0.2} />
                            <ellipse cx={166} cy={210} rx={60} ry={12} fill="none" stroke="#5dcaa5" strokeWidth={0.3} strokeOpacity={0.15} />
                            <ellipse cx={166} cy={248} rx={65} ry={14} fill="none" stroke="#5dcaa5" strokeWidth={0.3} strokeOpacity={0.15} />
                            <ellipse cx={148} cy={218} rx={22} ry={14} fill="#1d9e75" fillOpacity={0.18} />
                            <ellipse cx={185} cy={238} rx={18} ry={10} fill="#1d9e75" fillOpacity={0.14} />
                            <ellipse cx={155} cy={248} rx={12} ry={8} fill="#0f6e56" fillOpacity={0.2} />
                            <ellipse cx={166} cy={228} rx={108} ry={28} fill="none" stroke="#5dcaa5" strokeWidth={0.8} strokeOpacity={0.35} strokeDasharray="4,3" />
                            <circle cx={274} cy={228} r={4} fill="#5dcaa5" fillOpacity={0.9} />
                            <circle cx={274} cy={228} r={7} fill="none" stroke="#5dcaa5" strokeWidth={0.5} strokeOpacity={0.4} />
                            <text x={28} y={80} fontSize={8} fill="#5dcaa5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em" opacity={0.8}>KEPLER-442b // LIVE FEED</text>
                            <text x={28} y={368} fontSize={9} fill="#5dcaa5" fontFamily="system-ui, sans-serif" opacity={0.7}>ATM</text>
                            <text x={28} y={380} fontSize={10} fontWeight={600} fill="#e1f5ee" fontFamily="system-ui, sans-serif">0.89 atm</text>
                            <text x={110} y={368} fontSize={9} fill="#5dcaa5" fontFamily="system-ui, sans-serif" opacity={0.7}>TEMP</text>
                            <text x={110} y={380} fontSize={10} fontWeight={600} fill="#e1f5ee" fontFamily="system-ui, sans-serif">-14°C</text>
                            <text x={192} y={368} fontSize={9} fill="#5dcaa5" fontFamily="system-ui, sans-serif" opacity={0.7}>GRAVITY</text>
                            <text x={192} y={380} fontSize={10} fontWeight={600} fill="#e1f5ee" fontFamily="system-ui, sans-serif">0.96g</text>
                            <text x={264} y={368} fontSize={9} fill="#5dcaa5" fontFamily="system-ui, sans-serif" opacity={0.7}>STATUS</text>
                            <circle cx={270} cy={375} r={4} fill="#1d9e75" fillOpacity={0.9} />
                        </g>
                        <g id="metrics-panel">
                            <rect x={324} y={60} width={280} height={156} rx={8} fill="#0d1420" stroke="#1d9e75" strokeWidth={0.5} strokeOpacity={0.4} />
                            <text x={340} y={80} fontSize={8} fill="#5dcaa5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em" opacity={0.8}>SIGNAL METRICS</text>
                            {[
                                { label: "DEEP SCAN", val: "97.4%", bar: 0.97 },
                                { label: "ION FLUX", val: "3.2 THz", bar: 0.62 },
                                { label: "DARK MASS", val: "0.441", bar: 0.44 },
                                { label: "ENTROPY", val: "12.8 eV", bar: 0.78 },
                            ].map((m, i) => (
                                <g
                                    key={i}
                                    onMouseEnter={(e) => handleMetricHover(e, true)}
                                    onMouseLeave={(e) => handleMetricHover(e, false)}
                                    style={{ cursor: phase === "polished" ? "pointer" : "default", opacity: 0.7 }}
                                >
                                    <rect x={330} y={92 + i * 26} width={260} height={20} fill="transparent" />
                                    <text x={340} y={104 + i * 26} fontSize={9} fill="#5dcaa5" fontFamily="system-ui, sans-serif" style={{ pointerEvents: "none" }}>{m.label}</text>
                                    <rect x={404} y={96 + i * 26} width={130} height={4} rx={2} fill="#ffffff" fillOpacity={0.06} style={{ pointerEvents: "none" }} />
                                    <rect x={404} y={96 + i * 26} width={130 * m.bar} height={4} rx={2} fill="#1d9e75" fillOpacity={0.75} style={{ pointerEvents: "none" }} />
                                    <text x={544} y={104 + i * 26} fontSize={9} fill="#e1f5ee" fontFamily="system-ui, sans-serif" textAnchor="end" style={{ pointerEvents: "none" }}>{m.val}</text>
                                </g>
                            ))}
                            <text x={340} y={202} fontSize={8} fill="#444f60" fontFamily="system-ui, sans-serif">last scanned 00:04:12 ago</text>
                        </g>
                        <g id="waveform-panel">
                            <rect x={324} y={228} width={280} height={160} rx={8} fill="#0d1420" stroke="#1d9e75" strokeWidth={0.5} strokeOpacity={0.4} />
                            <text x={340} y={248} fontSize={8} fill="#5dcaa5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em" opacity={0.8}>GRAVITATIONAL WAVE // CH-7</text>
                            <path
                                d="M 336 318 C 345 318 345 278 360 278 C 375 278 375 348 390 348 C 405 348 405 298 420 298 C 435 298 435 268 450 268 C 465 268 465 338 480 338 C 495 338 495 288 510 288 C 525 288 525 308 540 308 C 555 308 555 258 575 258 C 590 258 595 308 600 308"
                                fill="none" stroke="#5dcaa5" strokeWidth={1.2} strokeOpacity={0.85}
                            />
                            <line x1={336} y1={318} x2={600} y2={318} stroke="#ffffff" strokeWidth={0.3} strokeOpacity={0.15} />
                            {[336, 380, 424, 468, 512, 556, 600].map((x, i) => (
                                <text key={i} x={x} y={376} fontSize={7} fill="#444f60" fontFamily="system-ui, sans-serif" textAnchor="middle">{(i * 0.8).toFixed(1)}s</text>
                            ))}
                            <circle cx={590} cy={244} r={3} fill="#e24b4a" />
                            <text x={582} y={248} fontSize={7} fill="#e24b4a" fontFamily="system-ui, sans-serif" textAnchor="end">LIVE</text>
                        </g>
                        <g id="status-bar">
                            <rect x={0} y={388} width={620} height={12} fill="#0d1420" />
                            <rect x={0} y={388} width={620} height={0.4} fill="#1d9e75" fillOpacity={0.3} />
                            <circle cx={12} cy={394} r={2.5} fill="#1d9e75" />
                            <text x={22} y={397} fontSize={7} fill="#5dcaa5" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">AETHER OBSERVATORY NETWORK // NODE 7 // NOMINAL</text>
                            <text x={608} y={397} fontSize={7} fill="#444f60" fontFamily="system-ui, sans-serif" textAnchor="end">v4.1.2</text>
                        </g>
                    </g>
                </svg>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, color: "#999", minWidth: 110, textAlign: "right" }}>{phaseLabel[phase]}</span>
                <div style={{ display: "flex", gap: 8 }}>
                    {(["sketching", "transforming", "polished"] as Phase[]).map((p, i) => {
                        const order: Phase[] = ["sketching", "transforming", "polished"];
                        const isActive = phase === p;
                        const isPast = order.indexOf(phase) > i;
                        return (
                            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? "#111" : isPast ? "#888" : "#ddd", transition: "background 0.3s" }} />
                        );
                    })}
                </div>
                <button onClick={runAnimation} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 99, border: "0.5px solid #ccc", background: "transparent", cursor: "pointer", color: "#444", display: "flex", alignItems: "center", gap: 6 }}>
                    ↺ Replay
                </button>
            </div>
        </div>
    );
}