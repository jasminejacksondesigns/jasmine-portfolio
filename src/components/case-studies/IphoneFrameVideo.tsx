"use client";

import { motion, useReducedMotion } from "motion/react";
import ScrollPlayVideo from "./ScrollPlayVideo";

export default function IphoneFrameVideo({
  src,
  className = "",
  aspectRatio = "970 / 2056",
  screenScale = 1.03,
}: {
  src: string;
  className?: string;
  aspectRatio?: string;
  screenScale?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="cs-figure w-full">
      <motion.div
        className={`relative mx-auto w-full max-w-[280px] ${className}`}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ type: "spring", visualDuration: 0.4, bounce: 0.18 }}
      >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[17%] -left-[3px] z-10 flex flex-col"
      >
        <div className="h-[18px] w-[3px] rounded-l-[1px] bg-[#2f2f32]" />
        <div className="mt-[14px] h-[34px] w-[3px] rounded-l-[1px] bg-[#2f2f32]" />
        <div className="mt-[6px] h-[34px] w-[3px] rounded-l-[1px] bg-[#2f2f32]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-[25%] -right-[3px] z-10 h-[58px] w-[3px] rounded-r-[1px] bg-[#2f2f32]"
      />

      <div className="rounded-[2.7rem] bg-[#111113] p-[9px] shadow-[0_22px_48px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] ring-1 ring-black/40 transition-shadow duration-500 hover:shadow-[0_28px_56px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div
          className="relative overflow-hidden rounded-[2.15rem] bg-black"
          style={{ aspectRatio }}
        >
          <ScrollPlayVideo
            src={src}
            loop
            controls={false}
            className="absolute inset-0 h-full w-full origin-center object-cover"
            style={{ transform: `scale(${screenScale})` }}
          />
        </div>
        </div>
      </motion.div>
    </div>
  );
}
