"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Equalizer from "./Equalizer";
import { songs, type Song } from "./music-data";

function formatTime(time: number) {
  const clamped = Math.max(0, time);
  return `${Math.floor(clamped / 60)}:${Math.floor(clamped % 60)
    .toString()
    .padStart(2, "0")}`;
}

interface DynamicMusicProps {
  song?: Song;
}

const DynamicMusic = ({ song = songs[0] }: DynamicMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  // Static demo progress — wire this up to your real player's currentTime.
  const progress = 0.32;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
      className="w-[300px] px-1 py-1"
    >
      <div className="grid grid-cols-[56px_1fr_auto] items-center gap-3">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-800 shrink-0">
          <img
            src={song.cover}
            alt={song.title}
            className="block w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden text-left">
          <p className="text-base font-medium leading-tight text-white truncate">
            {song.title}
          </p>
          <p className="text-sm leading-tight text-zinc-400 truncate">
            {song.artist}
          </p>
        </div>
        <Equalizer />
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-xs text-zinc-400 w-8 tabular-nums">
          {formatTime(song.duration * progress)}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-zinc-700 overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="text-xs text-zinc-400 w-8 text-right tabular-nums">
          -{formatTime(song.duration * (1 - progress))}
        </span>
      </div>

      <div className="flex items-center justify-center gap-8 mt-3">
        <button aria-label="Previous track" className="text-white/80 hover:text-white">
          <SkipBack size={22} fill="currentColor" />
        </button>
        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={() => setIsPlaying((p) => !p)}
          className="text-white hover:text-white/80"
        >
          {isPlaying ? (
            <Pause size={26} fill="currentColor" />
          ) : (
            <Play size={26} fill="currentColor" />
          )}
        </button>
        <button aria-label="Next track" className="text-white/80 hover:text-white">
          <SkipForward size={22} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
};

export default DynamicMusic;