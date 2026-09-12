"use client";

import { useEffect, useRef } from "react";

const FRAME_W = 2400;
const FRAME_H = 1800;

// Pixel box of the flat screen area inside the Studio Display frame image,
// measured directly from the source PNG (383,245)-(2019,1165).
const SCREEN = { left: 383, top: 245, width: 1636, height: 920 };

export default function DesktopFrameVideo({
  frameSrc,
  videoSrc,
  alt,
  className = "",
  objectPosition = "center",
}: {
  frameSrc: string;
  videoSrc: string;
  alt: string;
  className?: string;
  objectPosition?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt={alt}
        width={FRAME_W}
        height={FRAME_H}
        className="absolute inset-0 h-full w-full"
      />
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className="absolute object-cover"
        style={{
          left: `${(SCREEN.left / FRAME_W) * 100}%`,
          top: `${(SCREEN.top / FRAME_H) * 100}%`,
          width: `${(SCREEN.width / FRAME_W) * 100}%`,
          height: `${(SCREEN.height / FRAME_H) * 100}%`,
          objectPosition,
        }}
      />
    </div>
  );
}
