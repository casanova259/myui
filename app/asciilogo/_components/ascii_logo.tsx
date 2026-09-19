"use client";

import { useEffect, useRef } from "react";
import { useDialKit } from "dialkit";
import styles from "./ascii_logo.module.css";

type AsciiLogoProps = {
    /** Path to the logo image (SVG/PNG with transparency works best). */
    src: string;
    alt?: string;
};

/**
 * Interactive ASCII-art hero: samples a logo image's alpha channel into a
 * character grid drawn on a <canvas>, then continuously "glitches" the lit
 * characters and pushes them away from the cursor with a spring-back
 * physics simulation.
 *
 * Every visual/behavioral knob is wired to DialKit (`useDialKit`) so it
 * shows up in the floating panel rendered by <DialRoot /> — see the
 * project README for where to mount that.
 */
export default function AsciiLogo({ src, alt = "" }: AsciiLogoProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const params = useDialKit(
        "ASCII Logo",
        {
            grid: {
                cellSize: [8, 3, 24],
                cellGap: [2, 0, 8],
            },
            appearance: {
                gridColor: "#171717",
                charColor: "#dadada",
                asciiChars: { type: "text", default: ".:+*#%@0369" },
                threshold: [0.5, 0, 1],
            },
            cursor: {
                cursorRadius: [5, 1, 20],
                pushForce: [30, 0, 100],
                spring: [0.025, 0.001, 0.2],
                damping: [0.5, 0.1, 0.95],
            },
            timing: {
                glitchSpeed: [50, 16, 300],
            },
        },
        { persist: true, id: "ascii-logo" },
    );

    // The animation loop and physics step read this ref every frame, so
    // dragging a slider updates the canvas immediately without needing to
    // tear down and restart the whole effect (which owns the canvas context,
    // event listeners, and the requestAnimationFrame loop).
    const paramsRef = useRef(params);
    paramsRef.current = params;

    // Imperative handle to re-run setup + sampling, set once by the main
    // effect below and invoked again whenever a grid-affecting or
    // sampling-affecting control changes (cell size/gap, threshold).
    const initRef = useRef<() => void>(() => { });
    const didMountRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const logoImg = imgRef.current;
        if (!canvas || !logoImg) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let CELL_SIZE = paramsRef.current.grid.cellSize;
        let CELL_GAP = paramsRef.current.grid.cellGap;
        let CELL_STEP = CELL_SIZE + CELL_GAP;

        const dpr = window.devicePixelRatio || 1;

        type Cell = {
            col: number;
            row: number;
            char: string;
            isLit: boolean;
            offsetX: number;
            offsetY: number;
            velX: number;
            velY: number;
        };

        let cols = 0;
        let rows = 0;
        let cells: Cell[] = [];

        function setupCanvas() {
            const base = paramsRef.current.grid;
            CELL_SIZE = window.innerWidth < 768 ? Math.max(2, Math.round(base.cellSize * 0.4)) : base.cellSize;
            CELL_GAP = window.innerWidth < 768 ? Math.max(1, Math.round(base.cellGap * 0.5)) : base.cellGap;
            CELL_STEP = CELL_SIZE + CELL_GAP;
            cols = Math.floor(window.innerWidth / CELL_STEP);
            rows = Math.floor(window.innerHeight / CELL_STEP);
            canvas!.width = window.innerWidth * dpr;
            canvas!.height = window.innerHeight * dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function drawGrid() {
            ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx!.fillStyle = paramsRef.current.appearance.gridColor;
            for (let row = 0; row < rows; row++)
                for (let col = 0; col < cols; col++)
                    ctx!.fillRect(col * CELL_STEP, row * CELL_STEP, CELL_SIZE, CELL_SIZE);
        }

        function sampleLogoIntoCells() {
            const { asciiChars, threshold } = paramsRef.current.appearance;
            const rect = logoImg!.getBoundingClientRect();
            const logoCols = Math.ceil(rect.width / CELL_STEP);
            const logoRows = Math.ceil(rect.height / CELL_STEP);
            const startCol = Math.floor(rect.left / CELL_STEP);
            const startRow = Math.floor(rect.top / CELL_STEP);

            const sampleCanvas = document.createElement("canvas");
            sampleCanvas.width = logoCols;
            sampleCanvas.height = logoRows;
            const sampleCtx = sampleCanvas.getContext("2d");
            if (!sampleCtx) return;
            // Transparent offscreen canvas: read alpha directly rather than
            // compositing onto a background color and inferring presence from
            // RGB brightness (which breaks for dark logos on transparent PNGs).
            sampleCtx.clearRect(0, 0, logoCols, logoRows);
            sampleCtx.drawImage(logoImg!, 0, 0, logoCols, logoRows);
            const { data } = sampleCtx.getImageData(0, 0, logoCols, logoRows);

            cells = [];
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const inLogo =
                        col >= startCol &&
                        col < startCol + logoCols &&
                        row >= startRow &&
                        row < startRow + logoRows;
                    let isLit = false;
                    let char = " ";
                    if (inLogo) {
                        const idx = ((row - startRow) * logoCols + (col - startCol)) * 4;
                        const alpha = data[idx + 3] / 255; // 0 = fully transparent, 1 = fully opaque
                        isLit = alpha > threshold;
                        char = isLit
                            ? asciiChars[
                            Math.min(asciiChars.length - 1, Math.floor(alpha * asciiChars.length))
                            ]
                            : " ";
                    }
                    cells.push({
                        col,
                        row,
                        char,
                        isLit,
                        offsetX: 0,
                        offsetY: 0,
                        velX: 0,
                        velY: 0,
                    });
                }
            }
        }

        function renderFrame() {
            const { gridColor, charColor } = paramsRef.current.appearance;
            ctx!.font = `${CELL_SIZE + 2}px monospace`;
            ctx!.textBaseline = "top";
            ctx!.textAlign = "center";
            ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

            ctx!.fillStyle = gridColor;
            for (const { col, row } of cells)
                ctx!.fillRect(col * CELL_STEP, row * CELL_STEP, CELL_SIZE, CELL_SIZE);

            ctx!.fillStyle = charColor;
            for (const { col, row, char, isLit, offsetX, offsetY } of cells) {
                if (!isLit) continue;
                const x = (col + Math.round(offsetX)) * CELL_STEP;
                const y = (row + Math.round(offsetY)) * CELL_STEP;
                ctx!.fillText(char, x + CELL_SIZE / 2, y);
            }
        }

        function init() {
            setupCanvas();
            sampleLogoIntoCells();
            renderFrame();
        }
        initRef.current = init;

        const mouse = { col: -999, row: -999, isMoving: false };
        let idleTimer: ReturnType<typeof setTimeout> | null = null;
        let rafId = 0;
        let lastGlitchTime = 0;

        function updatePhysics() {
            const { cursorRadius, pushForce, spring, damping } = paramsRef.current.cursor;
            for (const cell of cells) {
                if (!cell.isLit) continue;
                if (mouse.isMoving) {
                    const dx = cell.col + cell.offsetX - mouse.col;
                    const dy = cell.row + cell.offsetY - mouse.row;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < cursorRadius && dist > 0) {
                        const force = (1 - dist / cursorRadius) ** 2 * pushForce;
                        cell.velX += (dx / dist) * force;
                        cell.velY += (dy / dist) * force;
                    }
                }
                cell.velX += -cell.offsetX * spring;
                cell.velY += -cell.offsetY * spring;
                cell.velX *= damping;
                cell.velY *= damping;
                cell.offsetX += cell.velX;
                cell.offsetY += cell.velY;
                if (Math.abs(cell.offsetX) < 0.01 && Math.abs(cell.velX) < 0.01) {
                    cell.offsetX = cell.velX = 0;
                }
                if (Math.abs(cell.offsetY) < 0.01 && Math.abs(cell.velY) < 0.01) {
                    cell.offsetY = cell.velY = 0;
                }
            }
        }

        // Glitch/randomize is folded into the rAF loop (rather than a separate
        // setInterval) so its speed can change live via the slider without
        // needing to clear and recreate a timer.
        function animationLoop(time: number) {
            updatePhysics();
            const { asciiChars } = paramsRef.current.appearance;
            const { glitchSpeed } = paramsRef.current.timing;
            if (time - lastGlitchTime > glitchSpeed) {
                lastGlitchTime = time;
                for (const cell of cells)
                    if (cell.isLit) cell.char = asciiChars[Math.floor(Math.random() * asciiChars.length)];
            }
            renderFrame();
            rafId = requestAnimationFrame(animationLoop);
        }

        function handleResize() {
            init();
        }

        function handleMouseMove(e: MouseEvent) {
            mouse.col = e.clientX / CELL_STEP;
            mouse.row = e.clientY / CELL_STEP;
            mouse.isMoving = true;
            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                mouse.isMoving = false;
            }, 50);
        }

        function handleMouseLeave() {
            mouse.col = mouse.row = -999;
            mouse.isMoving = false;
        }

        // initial draw before the logo has necessarily loaded
        setupCanvas();
        drawGrid();

        if (logoImg.complete) {
            init();
        } else {
            logoImg.addEventListener("load", init);
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        rafId = requestAnimationFrame(animationLoop);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            logoImg.removeEventListener("load", init);
            if (idleTimer) clearTimeout(idleTimer);
            cancelAnimationFrame(rafId);
        };
        // Intentionally empty: this effect owns the canvas/context, event
        // listeners, and rAF loop for the component's lifetime. Live parameter
        // changes flow in through paramsRef instead of re-running this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Grid geometry and the alpha threshold change how many cells exist and
    // which ones are lit, so those need a real re-sample — everything else
    // (colors, physics, glitch speed) just reads paramsRef on the next frame.
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }
        initRef.current();
    }, [params.grid.cellSize, params.grid.cellGap, params.appearance.threshold]);

    return (
        <div className={styles.hero}>
            <canvas ref={canvasRef} id="grid" />
            <div className={styles.logo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={imgRef} id="source" src={src} alt={alt} crossOrigin="anonymous" />
            </div>
        </div>
    );
}