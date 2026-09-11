"use client";

import { useState } from "react";
import Image from "next/image";

type Frame = { src: string; width: number; height: number; alt: string };

export default function ImageFlowAnimation({
  frames,
  className = "",
}: {
  frames: Frame[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const { width, height } = frames[0];
  const isLast = active === frames.length - 1;

  const advance = () => {
    setActive((i) => (i + 1) % frames.length);
  };

  return (
    <div className={`mx-auto max-w-xs ${className}`}>
      <button
        type="button"
        onClick={advance}
        aria-label={isLast ? "Restart prototype" : "Tap to continue"}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
      >
        <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
          {frames.map((frame, i) => (
            <Image
              key={frame.src}
              src={frame.src}
              alt={frame.alt}
              fill
              className={`object-contain transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <span
            className={`absolute right-5 bottom-8 flex h-9 w-9 items-center justify-center rounded-full bg-accent/90 shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95 ${
              frames.length > 1 ? "animate-pulse" : "hidden"
            }`}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
          </span>
        </div>
      </button>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {frames.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-4 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-center text-xs text-muted">
        {isLast ? "Tap to restart" : "Tap the screen to continue"}
      </p>
    </div>
  );
}
