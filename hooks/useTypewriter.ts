"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
}

interface UseTypewriterReturn {
  displayText: string;
  isComplete: boolean;
}

export function useTypewriter({
  text,
  speed = 100,
  delay = 0,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const startTyping = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayText(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTyping);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}
