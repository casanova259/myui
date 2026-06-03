"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StrokePath {
    d: string;
    color: string;
    width: number;
}

// ─── Sketch strokes ───────────────────────────────────────────────────────────

const SKETCH_STROKES: StrokePath[] = [
    // outer card
    { d: "M 44 28 L 576 28 L 576 372 L 44 372 Z", color: "#666", width: 1.8 },
    // heading blob
    { d: "M 64 72 Q 66 68 280 70 Q 282 74 280 78 Q 66 76 64 78 Z", color: "#222", width: 2.8 },
    // heading line 2
    { d: "M 64 100 Q 66 96 320 98 Q 322 102 320 106 Q 66 104 64 106 Z", color: "#222", width: 2.8 },
    // body text line 1
    { d: "M 64 132 Q 66 129 360 131 Q 362 135 360 137 Q 66 135 64 137 Z", color: "#555", width: 1.4 },
    { d: "M 64 150 Q 66 147 340 149 Q 342 153 340 155 Q 66 153 64 155 Z", color: "#555", width: 1.4 },
    { d: "M 64 168 Q 66 165 350 167 Q 352 171 350 173 Q 66 171 64 173 Z", color: "#555", width: 1.4 },
    { d: "M 64 186 Q 66 183 300 185 Q 302 189 300 191 Q 66 189 64 191 Z", color: "#555", width: 1.4 },
    // right panel border (dashed)
    { d: "M 380 60 L 564 60 L 564 360 L 380 360 Z", color: "#666", width: 1.6 },
    // nodes inside panel (rough circles)
    { d: "M 430 130 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", color: "#888", width: 1.5 },
    { d: "M 514 130 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", color: "#888", width: 1.5 },
    { d: "M 472 210 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", color: "#888", width: 1.5 },
    { d: "M 430 290 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", color: "#888", width: 1.5 },
    { d: "M 514 290 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", color: "#888", width: 1.5 },
    // connecting lines between nodes
    { d: "M 448 130 L 496 130", color: "#c0392b", width: 1.4 },
    { d: "M 440 145 L 466 195", color: "#888", width: 1.4 },
    { d: "M 504 145 L 478 195", color: "#888", width: 1.4 },
    { d: "M 460 225 L 434 275", color: "#888", width: 1.4 },
    { d: "M 484 225 L 510 275", color: "#888", width: 1.4 },
    // red annotation arrow
    { d: "M 370 160 L 348 148 L 355 155 M 348 148 L 356 142", color: "#e74c3c", width: 1.8 },
    // yellow scribble under heading
    { d: "M 64 66 Q 140 60 220 64 Q 222 72 220 78 Q 140 74 64 70 Z", color: "#f39c12", width: 1.2 },
    // node labels
];

// ─── State machine nodes ──────────────────────────────────────────────────────

const NODES = [
    { id: "n0", cx: 430, cy: 130, label: "INIT", sublabel: "boot", color: "#6366f1" },
    { id: "n1", cx: 514, cy: 130, label: "PARSE", sublabel: "tokenise", color: "#8b5cf6" },
    { id: "n2", cx: 472, cy: 210, label: "MAP", sublabel: "geometry", color: "#0f6e56" },
    { id: "n3", cx: 430, cy: 295, label: "RENDER", sublabel: "vectors", color: "#0f6e56" },
    { id: "n4", cx: 514, cy: 295, label: "OUTPUT", sublabel: "emit", color: "#0891b2" },
];

const EDGES = [
    { from: 0, to: 1, label: "input" },
    { from: 0, to: 2, label: "" },
    { from: 1, to: 2, label: "" },
    { from: 2, to: 3, label: "mapped" },
    { from: 2, to: 4, label: "" },
    { from: 3, to: 4, label: "done" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTotalLength(el: SVGPathElement | SVGLineElement | null): number {
    if (!el) return 200;
    try { return (el as SVGPathElement).getTotalLength(); } catch { return 200; }
}

function edgePath(from: typeof NODES[0], to: typeof NODES[0]): string {
    const dx = to.cx - from.cx;
    const dy = to.cy - from.cy;
    const mx = from.cx + dx * 0.5;
    const my = from.cy + dy * 0.5 - 18;
    return `M ${from.cx} ${from.cy + 20} Q ${mx} ${my} ${to.cx} ${to.cy - 20}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

type Phase = "idle" | "sketching" | "transforming" | "polished";

export default function StateProcessing() {
    const sketchGroupRef = useRef<SVGGElement>(null);
    const polishedGroupRef = useRef<SVGGElement>(null);
    const strokeRefs = useRef<(SVGPathElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [phase, setPhase] = useState<Phase>("idle");
    const [ready, setReady] = useState(false);

    // node + edge refs for individual animation
    const nodeRefs = useRef<(SVGGElement | null)[]>([]);
    const edgeRefs = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => { setReady(true); }, []);

    const runAnimation = () => {
        if (tlRef.current) tlRef.current.kill();

        // ── reset sketch ──
        gsap.set(sketchGroupRef.current, { opacity: 0 });
        strokeRefs.current.forEach((el) => {
            if (!el) return;
            const len = getTotalLength(el);
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        });

        // ── reset polished ──
        gsap.set(polishedGroupRef.current, { opacity: 0 });
        const polishedEl = polishedGroupRef.current;
        if (polishedEl) {
            // static bg children
            ["bg", "grid", "left-content", "panel-border"].forEach((id) => {
                const el = polishedEl.querySelector(`#${id}`);
                if (el) gsap.set(el, { opacity: 0 });
            });
        }
        nodeRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }));
        edgeRefs.current.forEach((el) => {
            if (!el) return;
            const len = getTotalLength(el);
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });

        const tl = gsap.timeline({ onStart: () => setPhase("sketching") });
        tlRef.current = tl;

        // 1 ── sketch in
        tl.to(sketchGroupRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
        strokeRefs.current.forEach((el, i) => {
            if (!el) return;
            const len = getTotalLength(el);
            const dur = 0.18 + (len / 700) * 0.4;
            tl.to(el, { strokeDashoffset: 0, duration: dur, ease: "none" }, i === 0 ? "+=0.1" : "-=0.04");
        });

        // 2 ── hold
        tl.to({}, { duration: 0.65 });

        // 3 ── transform
        tl.addLabel("transform")
            .call(() => setPhase("transforming"))
            .to(sketchGroupRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "transform")
            .set(polishedGroupRef.current, { opacity: 1 }, "transform+=0.45");

        // 4 ── bg + left content
        tl.addLabel("build", "transform+=0.48");
        ["bg", "grid"].forEach((id, i) => {
            const el = polishedGroupRef.current?.querySelector(`#${id}`);
            if (el) tl.to(el, { opacity: 1, duration: 0.3 }, `build+=${i * 0.05}`);
        });
        const leftEl = polishedGroupRef.current?.querySelector("#left-content");
        if (leftEl) {
            tl.to(leftEl, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "build+=0.1");
            gsap.set(leftEl, { y: 10 });
        }
        const borderEl = polishedGroupRef.current?.querySelector("#panel-border");
        if (borderEl) tl.to(borderEl, { opacity: 1, duration: 0.3 }, "build+=0.15");

        // 5 ── nodes pop in one by one
        tl.addLabel("nodes", "build+=0.4");
        nodeRefs.current.forEach((el, i) => {
            if (!el) return;
            tl.to(el, { opacity: 1, scale: 1, duration: 0.38, ease: "back.out(1.6)" }, `nodes+=${i * 0.12}`);
        });

        // 6 ── edges draw in
        tl.addLabel("edges", "nodes+=0.55");
        edgeRefs.current.forEach((el, i) => {
            if (!el) return;
            const len = getTotalLength(el);
            tl.to(el, { strokeDashoffset: 0, opacity: 1, duration: 0.35, ease: "power2.inOut" }, `edges+=${i * 0.1}`);
        });

        tl.call(() => setPhase("polished"));
    };

    useEffect(() => {
        if (!ready) return;
        const t = setTimeout(runAnimation, 500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    const phaseLabel: Record<Phase, string> = {
        idle: "—",
        sketching: "sketching…",
        transforming: "structuring…",
        polished: "rendered",
    };

    return (
        <div style={{ background: "#111", borderRadius: 20, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", fontFamily: "system-ui, sans-serif" }}>

            <div style={{ width: "100%", maxWidth: 620, borderRadius: 14, overflow: "hidden", position: "relative", aspectRatio: "620/400" }}>
                <svg viewBox="0 0 620 400" width="100%" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">

                    {/* ── notebook paper ── */}
                    <rect width="620" height="400" fill="#faf9f6" />
                    {Array.from({ length: 11 }, (_, i) => (
                        <line key={i} x1={0} y1={36 + i * 36} x2={620} y2={36 + i * 36} stroke="#e8e4dc" strokeWidth={0.7} />
                    ))}
                    <line x1={44} y1={0} x2={44} y2={400} stroke="#d0e8f5" strokeWidth={1.2} />

                    {/* ── sketch layer ── */}
                    <g ref={sketchGroupRef} style={{ opacity: 0 }}>
                        {SKETCH_STROKES.map((s, i) => (
                            <path key={i} ref={(el) => { strokeRefs.current[i] = el; }} d={s.d}
                                fill="none" stroke={s.color} strokeWidth={s.width} strokeLinecap="round" strokeLinejoin="round" />
                        ))}
                        <text x="412" y="128" fontSize={9} fill="#888" fontFamily="system-ui,sans-serif" textAnchor="middle">A</text>
                        <text x="496" y="128" fontSize={9} fill="#888" fontFamily="system-ui,sans-serif" textAnchor="middle">B</text>
                        <text x="454" y="208" fontSize={9} fill="#888" fontFamily="system-ui,sans-serif" textAnchor="middle">C</text>
                        <text x="412" y="288" fontSize={9} fill="#888" fontFamily="system-ui,sans-serif" textAnchor="middle">D</text>
                        <text x="496" y="288" fontSize={9} fill="#888" fontFamily="system-ui,sans-serif" textAnchor="middle">E</text>
                        <text x="64" y="220" fontSize={9} fill="#888" fontFamily="system-ui,sans-serif">state diagram</text>
                    </g>

                    {/* ── polished layer ── */}
                    <g ref={polishedGroupRef} style={{ opacity: 0 }}>

                        {/* dark bg */}
                        <rect id="bg" x={0} y={0} width={620} height={400} fill="#0f1117" />

                        {/* subtle dot grid */}
                        <g id="grid">
                            {Array.from({ length: 15 }, (_, col) =>
                                Array.from({ length: 10 }, (_, row) => (
                                    <circle key={`${col}-${row}`} cx={col * 44 + 10} cy={row * 44 + 10} r={0.7} fill="#ffffff" fillOpacity={0.06} />
                                ))
                            )}
                        </g>

                        {/* left text content */}
                        <g id="left-content">
                            {/* phase tag */}
                            <text x={36} y={52} fontSize={9} fill="#6b7280" fontFamily="system-ui,sans-serif" letterSpacing="0.12em">PHASE 02 // STRUCTURE</text>
                            {/* big heading */}
                            <text x={36} y={100} fontSize={38} fontWeight={800} fill="#f9fafb" fontFamily="system-ui,sans-serif">State</text>
                            <text x={36} y={148} fontSize={38} fontWeight={800} fill="#f9fafb" fontFamily="system-ui,sans-serif">Processing</text>
                            {/* body */}
                            <text x={36} y={186} fontSize={12} fill="#9ca3af" fontFamily="system-ui,sans-serif">The engine runs the visual input through</text>
                            <text x={36} y={204} fontSize={12} fill="#9ca3af" fontFamily="system-ui,sans-serif">advanced computational models. Using</text>
                            <text x={36} y={222} fontSize={12} fill="#9ca3af" fontFamily="system-ui,sans-serif">state machine logic, it maps the</text>
                            <text x={36} y={240} fontSize={12} fill="#9ca3af" fontFamily="system-ui,sans-serif">underlying geometry to create a</text>
                            <text x={36} y={258} fontSize={12} fill="#9ca3af" fontFamily="system-ui,sans-serif">mathematically precise vector framework</text>
                            <text x={36} y={276} fontSize={12} fill="#9ca3af" fontFamily="system-ui,sans-serif">before rendering.</text>
                            {/* bottom stat chips */}
                            <rect x={36} y={310} width={72} height={22} rx={11} fill="#1f2937" />
                            <text x={72} y={325} fontSize={9} fill="#6b7280" fontFamily="system-ui,sans-serif" textAnchor="middle">5 states</text>
                            <rect x={116} y={310} width={72} height={22} rx={11} fill="#1f2937" />
                            <text x={152} y={325} fontSize={9} fill="#6b7280" fontFamily="system-ui,sans-serif" textAnchor="middle">6 transitions</text>
                            <rect x={196} y={310} width={72} height={22} rx={11} fill="#1f2937" />
                            <text x={232} y={325} fontSize={9} fill="#6b7280" fontFamily="system-ui,sans-serif" textAnchor="middle">deterministic</text>
                            {/* footer */}
                            <text x={36} y={370} fontSize={9} fill="#374151" fontFamily="system-ui,sans-serif">v2.4.1 // state-engine core</text>
                        </g>

                        {/* panel border */}
                        <rect id="panel-border" x={340} y={20} width={264} height={360} rx={12}
                            fill="#161b27" stroke="#1f2937" strokeWidth={1} />

                        {/* panel label */}
                        <g id="panel-border">
                            <text x={472} y={46} fontSize={8} fill="#374151" fontFamily="system-ui,sans-serif" textAnchor="middle" letterSpacing="0.1em">STATE MACHINE // LIVE</text>
                            {/* live dot */}
                            <circle cx={548} cy={42} r={3} fill="#10b981" />
                        </g>

                        {/* ── edges (drawn behind nodes) ── */}
                        {EDGES.map((e, i) => {
                            const from = NODES[e.from];
                            const to = NODES[e.to];
                            return (
                                <g key={i}>
                                    <path
                                        ref={(el) => { edgeRefs.current[i] = el; }}
                                        d={edgePath(from, to)}
                                        fill="none"
                                        stroke="#374151"
                                        strokeWidth={1.2}
                                        strokeLinecap="round"
                                    />
                                    {e.label && (
                                        <text
                                            x={(from.cx + to.cx) / 2 + 6}
                                            y={(from.cy + to.cy) / 2}
                                            fontSize={7}
                                            fill="#4b5563"
                                            fontFamily="system-ui,sans-serif"
                                            textAnchor="middle"
                                        >
                                            {e.label}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                        {/* ── nodes ── */}
                        {NODES.map((n, i) => (
                            <g key={n.id} ref={(el) => { nodeRefs.current[i] = el; }}>
                                {/* glow ring */}
                                <circle cx={n.cx} cy={n.cy} r={26} fill={n.color} fillOpacity={0.08} />
                                {/* outer ring */}
                                <circle cx={n.cx} cy={n.cy} r={21} fill="none" stroke={n.color} strokeWidth={0.8} strokeOpacity={0.5} />
                                {/* body */}
                                <circle cx={n.cx} cy={n.cy} r={18} fill="#161b27" stroke={n.color} strokeWidth={1.2} />
                                {/* label */}
                                <text cx={n.cx} x={n.cx} y={n.cy + 4} fontSize={8} fontWeight={700} fill="#f9fafb"
                                    fontFamily="system-ui,sans-serif" textAnchor="middle" letterSpacing="0.05em">
                                    {n.label}
                                </text>
                                {/* sublabel below node */}
                                <text x={n.cx} y={n.cy + 34} fontSize={7} fill="#4b5563"
                                    fontFamily="system-ui,sans-serif" textAnchor="middle">
                                    {n.sublabel}
                                </text>
                            </g>
                        ))}

                    </g>
                </svg>
            </div>

            {/* controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, color: "#666", minWidth: 110, textAlign: "right" }}>{phaseLabel[phase]}</span>
                <div style={{ display: "flex", gap: 8 }}>
                    {(["sketching", "transforming", "polished"] as Phase[]).map((p, i) => {
                        const order: Phase[] = ["sketching", "transforming", "polished"];
                        const isActive = phase === p;
                        const isPast = order.indexOf(phase) > i;
                        return (
                            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? "#f9fafb" : isPast ? "#6b7280" : "#333", transition: "background 0.3s" }} />
                        );
                    })}
                </div>
                <button onClick={runAnimation} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 99, border: "0.5px solid #333", background: "transparent", cursor: "pointer", color: "#9ca3af" }}>
                    ↺ replay
                </button>
            </div>
        </div>
    );
}