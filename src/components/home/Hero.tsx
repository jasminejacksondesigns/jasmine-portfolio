"use client";

import Link from "next/link";
import { motion } from "motion/react";
import GrowingFlowerMark from "./GrowingFlowerMark";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="isolate flex flex-col items-center bg-bg pt-32 pb-16 text-center sm:pt-40 sm:pb-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col items-center px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="aspect-[152/189] w-[110px] sm:w-[140px] lg:w-[152px]"
        >
          <GrowingFlowerMark className="h-full w-full" background={false} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          custom={0.1}
          variants={fadeUp}
          className="font-hero mt-8 max-w-4xl text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.35] font-light text-ink"
        >
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>jasmine jackson is an</span>
            <span className="rounded-full border border-ink px-4 py-0.5">
              interaction designer
            </span>
            <span>
              who roots ideas in real user needs and grows them into
              thoughtful, impactful experiences.
            </span>
          </p>
          <p className="mt-2">
            currently exploring personal projects like{" "}
            <Link
              href="/work/homing"
              className="underline decoration-1 underline-offset-2 hover:text-accent"
            >
              @Homing
            </Link>
            . previously{" "}
            <a
              href="https://www.intuit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-2 hover:text-accent"
            >
              @Intuit
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
