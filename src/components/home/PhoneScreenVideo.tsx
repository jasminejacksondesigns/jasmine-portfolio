"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type PhoneScreenVideoProps = {
  src: string;
  maskSrc: string;
  frameSrc: string;
  /** Screen corners as fractions of the mockup: TL, TR, BR, BL. */
  quad: [[number, number], [number, number], [number, number], [number, number]];
  alt: string;
};

type Pt = { x: number; y: number };

function len(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function adj(m: number[]) {
  return [
    m[4] * m[8] - m[5] * m[7],
    m[2] * m[7] - m[1] * m[8],
    m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8],
    m[0] * m[8] - m[2] * m[6],
    m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6],
    m[1] * m[6] - m[0] * m[7],
    m[0] * m[4] - m[1] * m[3],
  ];
}

function multmm(a: number[], b: number[]) {
  const c = Array(9).fill(0);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cij = 0;
      for (let k = 0; k < 3; k++) cij += a[3 * i + k] * b[3 * k + j];
      c[3 * i + j] = cij;
    }
  }
  return c;
}

function multmv(m: number[], v: number[]) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function basisToPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

/** Map a rectangle (0,0)-(w,h) onto dest corners TL, TR, BR, BL. */
function matrix3dFromQuad(w: number, h: number, tl: Pt, tr: Pt, br: Pt, bl: Pt) {
  const s = basisToPoints(0, 0, w, 0, 0, h, w, h);
  const d = basisToPoints(tl.x, tl.y, tr.x, tr.y, bl.x, bl.y, br.x, br.y);
  const t = multmm(d, adj(s));
  for (let i = 0; i < 9; i++) t[i] /= t[8];
  return `matrix3d(${[
    t[0], t[3], 0, t[6],
    t[1], t[4], 0, t[7],
    0, 0, 1, 0,
    t[2], t[5], 0, t[8],
  ].join(",")})`;
}

export default function PhoneScreenVideo({
  src,
  maskSrc,
  frameSrc,
  quad,
  alt,
}: PhoneScreenVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transform, setTransform] = useState("none");
  const [flat, setFlat] = useState({ w: 320, h: 160 });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      const { width: W, height: H } = wrap.getBoundingClientRect();
      if (W < 2 || H < 2) return;
      const [tl, tr, br, bl] = quad.map(([x, y]) => ({ x: x * W, y: y * H }));
      const innerW = Math.max(2, len(tl, tr), len(bl, br));
      const innerH = Math.max(2, len(tl, bl), len(tr, br));
      setFlat((prev) =>
        Math.abs(prev.w - innerW) < 0.5 && Math.abs(prev.h - innerH) < 0.5
          ? prev
          : { w: innerW, h: innerH },
      );
      setTransform(matrix3dFromQuad(innerW, innerH, tl, tr, br, bl));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [quad]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = true;

    const paint = () => {
      if (!running) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.max(1, Math.round(flat.w * dpr));
      const nextH = Math.max(1, Math.round(flat.h * dpr));
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
      }
      if (visible && video.readyState >= 2 && video.videoWidth > 0) {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        const destAspect = canvas.width / canvas.height;
        let sx = 0;
        let sy = 0;
        let sw = vw;
        let sh = vh;
        if (vw / vh > destAspect) {
          sw = vh * destAspect;
          sx = (vw - sw) / 2;
        } else {
          sh = vw / destAspect;
          sy = (vh - sh) / 2;
        }
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(paint);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    video.play().catch(() => {});
    raf = requestAnimationFrame(paint);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [flat.h, flat.w]);

  return (
    <div ref={wrapRef} className="absolute inset-0 isolate overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none fixed top-0 left-[-200vw] h-px w-px"
      />
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `url(${maskSrc})`,
          maskImage: `url(${maskSrc})`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 origin-top-left"
          style={{
            width: flat.w,
            height: flat.h,
            transform,
          }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt={alt}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain [transform:translateZ(1px)]"
      />
    </div>
  );
}
