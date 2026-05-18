import { useRef, useState, useCallback } from "react";

const CHARS = "!@#$%^&*():{};|,.<>/?";
const SHUFFLE_TIME = 45;

export function useScramble(targetText: string) {
  const [text, setText] = useState(targetText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    const tickLimits = targetText
      .split("")
      .map(() => Math.floor(Math.random() * 10) + 3);
    let tick = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (tick > tickLimits[i]) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setText(scrambled);
      tick++;

      if (tickLimits.every((limit) => tick > limit)) {
        clearInterval(intervalRef.current!);
        setText(targetText);
      }
    }, SHUFFLE_TIME);
  }, [targetText]);

  const stopScramble = useCallback(() => {
    clearInterval(intervalRef.current!);
    setText(targetText);
  }, [targetText]);

  return { text, scramble, stopScramble };
}
