import { useRef, useState, useCallback } from "react";

const CHARS = "!@#$%^&*():{};|,.<>/?";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

export function useScramble(targetText: string) {
  const [text, setText] = useState(targetText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (pos / CYCLES_PER_LETTER > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= targetText.length * CYCLES_PER_LETTER) {
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
