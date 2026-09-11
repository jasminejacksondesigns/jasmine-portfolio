"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RequestMoreInfoAnimation from "./RequestMoreInfoAnimation";

const MOCKUP_W = 1800;
const MOCKUP_H = 1073;

/** Inner display of cartoon-laptop.png, inset from the bezel (includes the notch cutout). */
const SCREEN_POLYGON: [number, number][] = [
  [247, 150],
  [788, 150],
  [788, 206],
  [1068, 206],
  [1068, 150],
  [1550, 150],
  [1559, 154],
  [1567, 162],
  [1571, 178],
  [1571, 400],
  [1576, 700],
  [1576, 942],
  [224, 942],
  [224, 700],
  [231, 400],
  [231, 178],
  [235, 162],
  [241, 154],
];

const SCREEN_BOX = {
  left: 224 / MOCKUP_W,
  top: 150 / MOCKUP_H,
  width: (1576 - 224) / MOCKUP_W,
  height: (942 - 150) / MOCKUP_H,
};

function LaptopFrame({
  src,
  alt,
  onReady,
}: {
  src: string;
  alt: string;
  onReady: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.src = src;
    let cancelled = false;

    const paint = () => {
      if (cancelled) return;
      canvas.width = img.naturalWidth || MOCKUP_W;
      canvas.height = img.naturalHeight || MOCKUP_H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      const [first, ...rest] = SCREEN_POLYGON;
      ctx.moveTo(first[0], first[1]);
      for (const [x, y] of rest) ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      onReady();
    };

    if (img.complete && img.naturalWidth > 0) paint();
    else img.onload = paint;
    return () => {
      cancelled = true;
    };
  }, [src, onReady]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full [transform:translateZ(1px)]"
    />
  );
}

export default function LaptopScreenAnimation({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [frameReady, setFrameReady] = useState(false);
  const handleReady = useCallback(() => setFrameReady(true), []);

  return (
    <div className="absolute inset-0 isolate overflow-hidden">
      {frameReady ? (
        <div
          className="absolute overflow-hidden bg-white"
          style={{
            left: `${SCREEN_BOX.left * 100}%`,
            top: `${SCREEN_BOX.top * 100}%`,
            width: `${SCREEN_BOX.width * 100}%`,
            height: `${SCREEN_BOX.height * 100}%`,
          }}
        >
          <RequestMoreInfoAnimation className="h-full w-full" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="absolute inset-0 h-full w-full" />
      )}
      <LaptopFrame src={src} alt={alt} onReady={handleReady} />
    </div>
  );
}
