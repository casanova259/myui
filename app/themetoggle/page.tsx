"use client";

import { useState } from "react";

import { ThemeToggle } from "./_components/ThemeToggle";
import { Options } from "./_components/Options";
import { AnimationStart, AnimationVariant } from "./_components/types";

export default function ThemeTogglePage() {
  const [variant, setVariant] = useState<AnimationVariant>("circle");
  const [start, setStart] = useState<AnimationStart>("center");
  const [blur, setBlur] = useState(false);
  const [gifUrl, setGifUrl] = useState(
    "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif"
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F4F3] text-black dark:bg-[#121212] dark:text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-medium">Theme Toggle Demo</h1>
        <ThemeToggle variant={variant} start={start} blur={blur} gifUrl={gifUrl} />
      </div>

      <Options
        variant={variant}
        start={start}
        blur={blur}
        setVariant={setVariant}
        setStart={setStart}
        setBlur={setBlur}
      />
    </div>
  );
}