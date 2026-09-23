"use client";

import { useEffect, useRef } from "react";
import BrowserChrome from "./BrowserChrome";

// A simple browser window (traffic lights + address bar) around a muted,
// looping video with no controls. Plays only while on screen.
export default function BrowserFrameVideo({
  src,
  label,
  url = "",
  aspect = 16 / 10,
  crop = 0,
  className = "",
}: {
  src: string;
  /** Accessible description of what the video shows. */
  label: string;
  /** Optional text shown in the address bar. */
  url?: string;
  /** Width / height of the video content. */
  aspect?: number;
  /** Zooms in slightly to trim the video's edges, as a fraction per side. */
  crop?: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <BrowserChrome url={url} className={className}>
      <div className="overflow-hidden" style={{ aspectRatio: aspect }}>
        <video
          ref={videoRef}
          src={src}
          aria-label={label}
          muted
          loop
          playsInline
          preload="metadata"
          className="block size-full bg-bg object-cover"
          style={crop ? { transform: `scale(${1 / (1 - 2 * crop)})` } : undefined}
        />
      </div>
    </BrowserChrome>
  );
}
