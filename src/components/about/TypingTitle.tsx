"use client";

import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */

const CHAR_MS = 65;
const START_DELAY_MS = 350;
// Each typed character rolls the flower this far, like a wheel.
const ROLL_PER_CHAR = 38;

// Types the title out letter by letter, with the striped flower rolling along
// as the cursor. Screen readers get the full text immediately.
export default function TypingTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred so the state update isn't synchronous inside the effect.
      const id = window.setTimeout(() => setSkip(true), 0);
      return () => window.clearTimeout(id);
    }
    let n = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= text.length) window.clearInterval(interval);
      }, CHAR_MS);
    }, START_DELAY_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text]);

  const shown = skip ? text.length : count;

  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative inline-block">
        {/* Invisible full line reserves the final size, so nothing below
            shifts while the title types. */}
        <span className="invisible inline-flex items-center gap-2">
          {text}
          <span className="inline-block size-[1em]" />
        </span>
        <span className="absolute inset-0 inline-flex items-center gap-2 whitespace-pre">
          {text.slice(0, shown)}
          <img
            src="/hero/sticker/striped-flower.svg"
            alt=""
            className="inline-block size-[1em] transition-transform duration-150 ease-out"
            style={{ rotate: `${shown * ROLL_PER_CHAR}deg` }}
          />
        </span>
      </span>
    </h1>
  );
}
