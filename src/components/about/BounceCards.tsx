"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./BounceCards.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Adapted from React Bits <BounceCards /> (TypeScript, useGSAP cleanup,
// plays when scrolled into view, respects reduced motion).
const DEFAULT_TRANSFORMS = [
  "rotate(10deg) translate(-170px)",
  "rotate(5deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(85px)",
  "rotate(2deg) translate(170px)",
];

const noRotation = (t: string) =>
  /rotate\([\s\S]*?\)/.test(t)
    ? t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)")
    : t === "none"
      ? "rotate(0deg)"
      : `${t} rotate(0deg)`;

const pushed = (t: string, offsetX: number) => {
  const re = /translate\(([-0-9.]+)px\)/;
  const m = t.match(re);
  if (m) return t.replace(re, `translate(${parseFloat(m[1]) + offsetX}px)`);
  return t === "none" ? `translate(${offsetX}px)` : `${t} translate(${offsetX}px)`;
};

export default function BounceCards({
  className = "",
  images = [],
  alt = "",
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = DEFAULT_TRANSFORMS,
  enableHover = false,
}: {
  className?: string;
  images?: string[];
  /** Shared alt text; each card appends its position. */
  alt?: string;
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".bounce-cards__card",
          { scale: 0 },
          {
            scale: 1,
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay,
            scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          },
        );
      });
    },
    { scope: root, dependencies: [animationStagger, easeType, animationDelay] },
  );

  const reduce = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Plain event handlers: they only touch the ref when fired, never during
  // render. Their short tweens finish on their own.
  const pushSiblings = (hovered: number) => {
    if (!enableHover || reduce() || !root.current) return;
    const q = gsap.utils.selector(root.current);
    images.forEach((_, i) => {
      const target = q(`.bounce-cards__card-${i}`);
      gsap.killTweensOf(target, "transform");
      const base = transformStyles[i] || "none";
      gsap.to(target, {
        transform: i === hovered ? noRotation(base) : pushed(base, i < hovered ? -160 : 160),
        duration: 0.4,
        ease: "back.out(1.4)",
        delay: i === hovered ? 0 : Math.abs(hovered - i) * 0.05,
        overwrite: "auto",
      });
    });
  };

  const resetSiblings = () => {
    if (!enableHover || reduce() || !root.current) return;
    const q = gsap.utils.selector(root.current);
    images.forEach((_, i) => {
      const target = q(`.bounce-cards__card-${i}`);
      gsap.killTweensOf(target, "transform");
      gsap.to(target, {
        transform: transformStyles[i] || "none",
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      ref={root}
      className={`bounce-cards ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className={`bounce-cards__card bounce-cards__card-${i}`}
          style={{ transform: transformStyles[i] ?? "none" }}
          onMouseEnter={() => pushSiblings(i)}
          onMouseLeave={resetSiblings}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bounce-cards__image"
            src={src}
            alt={alt ? `${alt} (${i + 1} of ${images.length})` : ""}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
