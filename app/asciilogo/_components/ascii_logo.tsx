"use client";

import { useEffect, useRef } from "react";
import styles from "./ascii_logo.module.css";

type AsciiLogoProps = {
    /** Path to the logo image (SVG/PNG with transparency works best). */
    src: string;
    alt?: string;
};

/**
 * Interactive ASCII-art hero: samples a logo image's brightness into a
 * character grid drawn on a <canvas>, then continuously "glitches" the
 * lit characters and pushes them away from the mouse with a spring-back
 * physics simulation.
 *
 * Direct port of a vanilla JS/CSS implementation (index.html + styles.css
 * + script.js) into a self-contained React/Next.js client component.
 */
export default function AsciiLogo({ src, alt = "" }: AsciiLogoProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const logoImg = imgRef.current;
        if (!canvas || !logoImg) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // ---- tunables (same defaults as the original script.js) ----
        let CELL_SIZE = 8;
        let CELL_GAP = 2;
        let CELL_STEP = CELL_SIZE + CELL_GAP;
        const GRID_COLOR = "#171717";
        const CHAR_COLOR = "#dadada";
        const ASCII_CHARS = ".:+*#%@0369";
        const THRESHOLD = 0.5;
        const PUSH_RADIUS = 5;
        const PUSH_FORCE = 30;
        const SPRING = 0.025;
        const DAMPING = 0.5;

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
            CELL_SIZE = window.innerWidth < 768 ? 3 : 8;
            CELL_GAP = window.innerWidth < 768 ? 1 : 2;
            CELL_STEP = CELL_SIZE + CELL_GAP;
            cols = Math.floor(window.innerWidth / CELL_STEP);
            rows = Math.floor(window.innerHeight / CELL_STEP);
            canvas!.width = window.innerWidth * dpr;
            canvas!.height = window.innerHeight * dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function drawGrid() {
            ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx!.fillStyle = GRID_COLOR;
            for (let row = 0; row < rows; row++)
                for (let col = 0; col < cols; col++)
                    ctx!.fillRect(col * CELL_STEP, row * CELL_STEP, CELL_SIZE, CELL_SIZE);
        }

        function sampleLogoIntoCells() {
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
            // Draw onto a transparent offscreen canvas (no black fill) so we can
            // read each pixel's alpha channel directly, rather than compositing
            // onto a background color and inferring presence from RGB brightness.
            // Brightness-based detection breaks for dark logos on transparent
            // PNGs (e.g. a black mark), since dark ink blended onto a black fill
            // reads as ~0 brightness everywhere and never crosses THRESHOLD.
            // Alpha tells us "is there ink here" regardless of the logo's color.
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
                        isLit = alpha > THRESHOLD;
                        char = isLit
                            ? ASCII_CHARS[
                            Math.min(
                                ASCII_CHARS.length - 1,
                                Math.floor(alpha * ASCII_CHARS.length),
                            )
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
            ctx!.font = `${CELL_SIZE + 2}px monospace`;
            ctx!.textBaseline = "top";
            ctx!.textAlign = "center";
            ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

            ctx!.fillStyle = GRID_COLOR;
            for (const { col, row } of cells)
                ctx!.fillRect(col * CELL_STEP, row * CELL_STEP, CELL_SIZE, CELL_SIZE);

            ctx!.fillStyle = CHAR_COLOR;
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

        const mouse = { col: -999, row: -999, isMoving: false };
        let idleTimer: ReturnType<typeof setTimeout> | null = null;
        let glitchInterval: ReturnType<typeof setInterval> | null = null;
        let rafId = 0;

        function updatePhysics() {
            for (const cell of cells) {
                if (!cell.isLit) continue;
                if (mouse.isMoving) {
                    const dx = cell.col + cell.offsetX - mouse.col;
                    const dy = cell.row + cell.offsetY - mouse.row;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < PUSH_RADIUS && dist > 0) {
                        const force = (1 - dist / PUSH_RADIUS) ** 2 * PUSH_FORCE;
                        cell.velX += (dx / dist) * force;
                        cell.velY += (dy / dist) * force;
                    }
                }
                cell.velX += -cell.offsetX * SPRING;
                cell.velY += -cell.offsetY * SPRING;
                cell.velX *= DAMPING;
                cell.velY *= DAMPING;
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

        function animationLoop() {
            updatePhysics();
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

        glitchInterval = setInterval(() => {
            for (const cell of cells)
                if (cell.isLit)
                    cell.char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
            renderFrame();
        }, 50);

        rafId = requestAnimationFrame(animationLoop);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            logoImg.removeEventListener("load", init);
            if (idleTimer) clearTimeout(idleTimer);
            if (glitchInterval) clearInterval(glitchInterval);
            cancelAnimationFrame(rafId);
        };
    }, []);

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