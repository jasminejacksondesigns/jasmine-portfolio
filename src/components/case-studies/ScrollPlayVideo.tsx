"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export default function ScrollPlayVideo({
  src,
  className = "",
  loop = false,
  controls = true,
  once = false,
  waitForScroll = false,
  style,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  controls?: boolean;
  once?: boolean;
  waitForScroll?: boolean;
  style?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);
  const hasScrolledRef = useRef(!waitForScroll);
  const intersectingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    hasScrolledRef.current = !waitForScroll;

    const tryPlay = () => {
      if (once && hasPlayedRef.current) return;
      if (waitForScroll && !hasScrolledRef.current) return;
      if (!intersectingRef.current) return;
      if (!loop && !once) video.currentTime = 0;
      video.play().catch(() => {});
    };

    const onPlaying = () => {
      if (once) hasPlayedRef.current = true;
    };

    const onScroll = () => {
      if (hasScrolledRef.current) return;
      hasScrolledRef.current = true;
      window.removeEventListener("scroll", onScroll);
      tryPlay();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          tryPlay();
        } else if (!once) {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    video.addEventListener("playing", onPlaying);
    observer.observe(video);
    if (waitForScroll) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      video.removeEventListener("playing", onPlaying);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [loop, once, waitForScroll]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop={loop}
      controls={controls}
      playsInline
      preload="auto"
      className={className}
      style={style}
    />
  );
}
