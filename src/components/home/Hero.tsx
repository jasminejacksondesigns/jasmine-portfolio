"use client";

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
    <section className="isolate flex flex-col items-start bg-bg pt-10 pb-12 text-left sm:pt-14 sm:pb-16">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-start gap-6 px-4 sm:gap-8 sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="aspect-[152/189] w-[110px] sm:w-[140px] lg:w-[152px]"
        >
          <GrowingFlowerMark className="h-full w-full" background={false} />
        </motion.div>

        <motion.p
          initial="hidden"
          animate="show"
          custom={0.1}
          variants={fadeUp}
          className="font-display max-w-4xl text-[clamp(1.5rem,2.75vw,2.5rem)] leading-[1.3] font-light tracking-tight text-ink"
        >
          I&rsquo;m Jasmine, a{" "}
          <span className="text-role-text">product designer</span> who roots
          ideas in real user needs and grows them into thoughtful, impactful
          experiences.
        </motion.p>
      </div>
    </section>
  );
}
