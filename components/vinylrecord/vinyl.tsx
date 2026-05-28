"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, AnimationPlaybackControls } from "motion/react";

export default function VinylPlayer() {
    const [hovered, setHovered] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const spinRef = useRef<AnimationPlaybackControls | null>(null);
    const rotation = useMotionValue(0);

    const vinylOut = hovered || playing;

    useEffect(() => {
        if (vinylOut) {
            const current = rotation.get();
            spinRef.current = animate(rotation, current + 36000, {
                duration: (36000 / 360) * 2.8,
                ease: "linear",
            });
        } else {
            if (spinRef.current) spinRef.current.stop();
            const current = rotation.get();
            animate(rotation, current, { duration: 0.8, ease: "easeOut" });
        }

        return () => {
            if (spinRef.current) spinRef.current.stop();
        };
    }, [vinylOut]); // eslint-disable-line react-hooks/exhaustive-deps

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play();
            setPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
        const d = audioRef.current?.duration;
        if (d && !isNaN(d)) setDuration(d);
    };

    const handleEnded = () => {
        setPlaying(false);
        setProgress(0);
        setCurrentTime(0);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    };

    const fmt = (s: number): string => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full gap-10">

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            >
                <source src="/track.mp3" type="audio/mpeg" />
            </audio>

            {/* ── Vinyl Stage ── */}
            <div
                className="relative flex items-center justify-center w-95 h-95 cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* VINYL RECORD */}
                <motion.div
                    className="absolute w-85 h-85 rounded-full z-1"
                    animate={{ x: vinylOut ? "55%" : "0%" }}
                    transition={{ delay: vinylOut ? 0.12 : 0, type: "spring", stiffness: 80, damping: 18 }}
                >
                    <motion.div className="w-full h-full" style={{ rotate: rotation }}>
                        <Image
                            src="/record.png"
                            alt="Vinyl record"
                            width={340}
                            height={340}
                            className="w-full h-full object-cover rounded-full"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* ALBUM COVER */}
                <motion.div
                    className="absolute w-90 h-90 z-2"
                    animate={{ x: vinylOut ? "-12%" : "0%" }}
                    transition={{ delay: vinylOut ? 0 : 0.08, type: "spring", stiffness: 90, damping: 20 }}
                >
                    <div
                        className="relative w-full h-full rounded-[64px] p-[1.5px]"
                        style={{ background: "linear-gradient(135deg, #E5C8C8 0%, #3B3B3B 100%)" }}
                    >
                        <div
                            className="relative w-full h-full overflow-hidden rounded-[63px] backdrop-blur-md"
                            style={{
                                background: "linear-gradient(238.44deg, rgba(255,255,255,0.76) 3.09%, rgba(135,135,135,0.76) 84.92%)",
                            }}
                        >
                            <Image
                                src="/cvr.jpg"
                                alt="Album cover"
                                fill
                                className="object-cover rounded-[63px]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Player UI ── */}
            <motion.div
                className="flex flex-col items-center gap-4 w-85"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Track info */}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-white font-semibold text-base tracking-wide">TBSM</p>
                    <p className="text-white/40 text-sm tracking-widest uppercase">11 K</p>
                </div>

                {/* Progress bar */}
                <div
                    className="w-full h-0.75 bg-white/10 rounded-full cursor-pointer relative"
                    onClick={handleSeek}
                >
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-white/70"
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                        style={{ left: `calc(${progress}% - 6px)` }}
                    />
                </div>

                {/* Time */}
                <div className="flex justify-between w-full text-white/30 text-xs font-mono">
                    <span>{fmt(currentTime)}</span>
                    <span>{fmt(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-8">
                    {/* Prev */}
                    <button
                        onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; }}
                        className="text-white/40 hover:text-white/70 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                        </svg>
                    </button>

                    {/* Play / Pause */}
                    <button
                        onClick={togglePlay}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white hover:bg-white/90 active:scale-95 transition-all duration-150"
                    >
                        {playing ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#111111">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#111111">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Next */}
                    <button
                        onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; }}
                        className="text-white/40 hover:text-white/70 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.5 2.64L8 14.14V9.86zM16 6h2v12h-2z" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}