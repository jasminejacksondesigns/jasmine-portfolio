"use client";

import { useEffect, useRef } from "react";

export default function ScrollPlayVideo({
  src,
  className = "",
  loop = false,
  controls = true,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  controls?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loop) video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [loop]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop={loop}
      controls={controls}
      playsInline
      className={className}
    />
  );
}
