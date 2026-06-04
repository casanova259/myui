"use client";

import { useEffect, useRef } from "react";

// ── geometry ──────────────────────────────────────────────────────────────────

function makeBox(s: number) {
  const h = s / 2;
  const verts: number[][] = [
    [-h, -h, -h], [h, -h, -h], [h, h, -h], [-h, h, -h],
    [-h, -h,  h], [h, -h,  h], [h, h,  h], [-h, h,  h],
  ];
  const edges: number[][] = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
    [0,6],[1,7],[2,4],[3,5],
  ];
  const s2 = s * 0.55, h2 = s2 / 2;
  const verts2: number[][] = [
    [-h2,-h2,-h2],[h2,-h2,-h2],[h2,h2,-h2],[-h2,h2,-h2],
    [-h2,-h2, h2],[h2,-h2, h2],[h2,h2, h2],[-h2,h2, h2],
  ];
  const offset = verts.length;
  const edges2 = edges.map(([a, b]) => [a + offset, b + offset]);
  const connectors = Array.from({ length: 8 }, (_, i) => [i, i + offset]);
  return {
    verts: [...verts, ...verts2],
    edges: [...edges, ...edges2, ...connectors],
  };
}

// ── math helpers ──────────────────────────────────────────────────────────────

type Vec3 = [number, number, number];

const rotX = (v: Vec3, a: number): Vec3 => {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
};
const rotY = (v: Vec3, a: number): Vec3 => {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
};
const rotZ = (v: Vec3, a: number): Vec3 => {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
};

function edgeColor(lightDot: number, depth: number, alpha: number): string {
  const warmth = (lightDot + 1) / 2;
  const depthFade = (depth + 160) / 320;
  const r = Math.round(120 + warmth * 135);
  const g = Math.round(70  + warmth * 70);
  const b = Math.round(40  + (1 - warmth) * 60);
  const a = Math.min((0.08 + depthFade * 0.55 + warmth * 0.35) * alpha, 1);
  return `rgba(${r},${g},${b},${a})`;
}

function glowWidth(lightDot: number, depth: number): number {
  const warmth = (lightDot + 1) / 2;
  const df = (depth + 160) / 320;
  return 0.5 + warmth * 2.2 + df * 0.8;
}

// ── component ─────────────────────────────────────────────────────────────────

export default function CinematicWireframe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    rotX: 0.42, rotY: 0.28, rotZ: 0.08,
    velX: 0.0004, velY: 0.0007, velZ: 0.0001,
    swingX: 0, swingY: 0, swingVX: 0, swingVY: 0,
    lightAngle: 0,
    lastT: 0,
    raf: 0,
  });
  const hudRef = useRef<HTMLSpanElement>(null);
  const geo = useRef(makeBox(110));

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    const state = stateRef.current;
    const { verts, edges } = geo.current;

    const SPRING = 0.018, DAMP = 0.88, LIGHT_SPEED = 0.0006;

    function resize() {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function draw(ts: number) {
      const dt = Math.min(ts - state.lastT, 32);
      state.lastT = ts;
      const W = canvas.width, H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#150600";
      ctx.fillRect(0, 0, W, H);

      // physics
      state.velX += (0.0003 - state.velX) * 0.001;
      state.velY += (0.0008 - state.velY) * 0.001;
      state.rotX += state.velX * dt * 0.7;
      state.rotY += state.velY * dt;
      state.rotZ += state.velZ * dt * 0.3;

      state.swingVX += -SPRING * state.swingX;
      state.swingVY += -SPRING * state.swingY;
      state.swingVX *= DAMP; state.swingVY *= DAMP;
      state.swingX += state.swingVX; state.swingY += state.swingVY;

      // light sweep
      state.lightAngle += LIGHT_SPEED * dt;
      const la = state.lightAngle;
      const _ldx = Math.cos(la) * 0.8, _ldy = -0.4, _ldz = Math.sin(la) * 0.6;
      const lLen = Math.sqrt(_ldx ** 2 + _ldy ** 2 + _ldz ** 2);
      const ld: Vec3 = [_ldx / lLen, _ldy / lLen, _ldz / lLen];

      // project verts
      const cx = W / 2 + state.swingX, cy = H / 2 + state.swingY;
      const projected = verts.map((v) => {
        let r = rotX(v as Vec3, state.rotX);
        r = rotY(r, state.rotY);
        r = rotZ(r, state.rotZ);
        const fov = 340, z = r[2] + 340;
        return [cx + r[0] * fov / z, cy + r[1] * fov / z, r[2]];
      });

      // depth-sorted edges with light dot
      const edgesData = edges.map(([a, b]) => {
        const midZ = (projected[a][2] + projected[b][2]) / 2;
        const mv = verts[a].map((v, i) => (v + verts[b][i]) / 2) as Vec3;
        let rm = rotX(mv, state.rotX);
        rm = rotY(rm, state.rotY);
        rm = rotZ(rm, state.rotZ);
        const rLen = Math.sqrt(rm[0]**2+rm[1]**2+rm[2]**2) || 1;
        const dot = (rm[0]/rLen)*ld[0]+(rm[1]/rLen)*ld[1]+(rm[2]/rLen)*ld[2];
        return { a, b, midZ, dot };
      });
      edgesData.sort((x, y) => x.midZ - y.midZ);

      // draw edges
      for (const e of edgesData) {
        const pa = projected[e.a], pb = projected[e.b];
        const isInner = e.a >= 8;
        const alpha = isInner ? 0.55 : 1.0;
        const color = edgeColor(e.dot, e.midZ, alpha);
        const width = glowWidth(e.dot, e.midZ) * (isInner ? 0.6 : 1);

        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();

        if (e.dot > 0.3) {
          const warmth = (e.dot + 1) / 2;
          ctx.beginPath();
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
          ctx.strokeStyle = `rgba(240,120,30,${warmth * 0.22 * alpha})`;
          ctx.lineWidth = width * 3;
          ctx.stroke();
        }
      }

      // vertex dots
      for (let i = 0; i < 8; i++) {
        const p = projected[i];
        const depth = (p[2] + 160) / 320;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,${140 + depth * 60},${60 + depth * 40},${0.4 + depth * 0.5})`;
        ctx.fill();
      }

      // bloom
      const lx = W/2 + ld[0]*180, ly = H/2 + ld[1]*100;
      const bloom = ctx.createRadialGradient(lx, ly, 0, lx, ly, 90);
      bloom.addColorStop(0, "rgba(240,130,30,0.07)");
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);

      // vignette
      const vig = ctx.createRadialGradient(W/2, H/2, 60, W/2, H/2, W*0.72);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // HUD light meter
      if (hudRef.current) {
        const bars = Math.round(((Math.sin(la)+1)/2)*6);
        hudRef.current.textContent = "LIGHT " + "█".repeat(bars) + "░".repeat(6-bars);
      }

      state.raf = requestAnimationFrame(draw);
    }

    state.raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
    };
  }, []);

  const hudStyle: React.CSSProperties = {
    position: "absolute",
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    letterSpacing: ".16em",
    color: "rgba(200,100,40,0.5)",
    pointerEvents: "none",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        @keyframes scanLine {
          0%   { top: -2px; opacity: .07; }
          100% { top: 100%; opacity: .04; }
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: 340,
          background: "#150600",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent,rgba(220,110,30,.35),transparent)",
          animation: "scanLine 6s linear infinite",
          pointerEvents: "none",
        }} />

        {/* HUD labels */}
        <span style={{ ...hudStyle, top: 14, left: 16 }}>WIREFRAME // PHYSICS</span>
        <span style={{ ...hudStyle, top: 14, right: 16 }}>SIM ACTIVE</span>
        <span style={{ ...hudStyle, bottom: 14, left: 16 }}>PHASE 03 // ENVIRONMENT</span>
        <span ref={hudRef} style={{ ...hudStyle, bottom: 14, right: 16 }}>LIGHT ░░░░░░</span>
      </div>
    </>
  );
}