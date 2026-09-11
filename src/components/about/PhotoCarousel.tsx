"use client";

import { useRef } from "react";
import Image from "next/image";

type Photo = { src: string; aspect: number };

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous photos" : "Next photos"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function PhotoCarousel({
  photos,
  alt,
}: {
  photos: Photo[];
  alt: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="relative h-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-panel sm:h-[420px]"
            style={{ aspectRatio: photo.aspect }}
          >
            <Image
              src={photo.src}
              alt={alt}
              fill
              sizes="420px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <ArrowButton direction="left" onClick={() => scrollByAmount(-1)} />
        <ArrowButton direction="right" onClick={() => scrollByAmount(1)} />
      </div>
    </div>
  );
}
