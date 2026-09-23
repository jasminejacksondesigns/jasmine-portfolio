"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BloomFlower, { FLOWER_CENTER } from "./BloomFlower";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Composition from Figma "Verdant studio splash" (1218 × 736 frame).
// Positions are expressed as percentages of that frame and type is sized in
// container-width units so the whole lockup scales as one piece.
const LINES = {
  left: ["JASM", "INE"],
  right: ["JACK", "SON"],
};

const PETAL_COUNT = 5;

// The flower's heart, as a CSS transform-origin on its 736 × 736 box.
const HEART_ORIGIN = `${(FLOWER_CENTER.x / 736) * 100}% ${(FLOWER_CENTER.y / 736) * 100}%`;

// Petals and streaks are drawn with their base at their group's origin, so
// tweening the SVG transform attribute grows them straight out from the heart
// without any transform-origin math.
const petalTransform = (r: number, sx: number, sy = sx) => ({
  transform: `rotate(${r}) scale(${sx} ${sy})`,
});

const heartTransform = (s: number) => ({
  transform: `translate(${FLOWER_CENTER.x} ${FLOWER_CENTER.y}) scale(${s}) translate(${-FLOWER_CENTER.x} ${-FLOWER_CENTER.y})`,
});

function NameBlock({
  lines,
  side,
}: {
  lines: string[];
  side: "left" | "right";
}) {
  return (
    <div
      aria-hidden
      data-name-block={side}
      className={`font-name pointer-events-none absolute top-[34.38%] z-10 text-[10.84cqw] leading-[0.84] font-bold text-ink ${
        side === "left" ? "left-0 text-left" : "right-[1.97%] text-right"
      }`}
    >
      {lines.map((line) => (
        // Padding + negative margin gives cap tops room inside the mask
        // without changing the tight 0.84 line spacing.
        <span
          key={line}
          className="-my-[0.08em] block overflow-hidden py-[0.08em]"
        >
          <span data-name-line={side} className="block">
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function BloomHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Lives in the layout, outside this component's scope.
      const nav = document.querySelector<HTMLElement>("[data-site-nav]");

      mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
        gsap.set(root.current, { autoAlpha: 1 });
        gsap.set(
          "[data-flower], [data-flower-scroll], [data-flower-hover], [data-flower-sway]",
          { transformOrigin: HEART_ORIGIN },
        );

        const tl = gsap.timeline({ delay: 0.15 });

        // The whole head rises and turns toward us as it grows.
        tl.fromTo(
          "[data-flower]",
          { scale: 0.5, rotation: -24, yPercent: 6 },
          { scale: 1, rotation: 0, yPercent: 0, duration: 2.6, ease: "power2.out" },
          0,
        );

        // A small bud swells first…
        tl.from(
          "[data-bud], [data-heart]",
          {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.7,
            ease: "back.out(2)",
            stagger: 0.12,
          },
          0,
        );

        // …then petals unfurl one after another, each stretching out from
        // its base and swinging open.
        for (let i = 0; i < PETAL_COUNT; i++) {
          tl.fromTo(
            `[data-petal="${i}"][data-layer="halo"], [data-petal="${i}"][data-layer="body"]`,
            { attr: petalTransform(-40, 0.25, 0.05), autoAlpha: 0 },
            {
              attr: petalTransform(0, 1),
              autoAlpha: 1,
              duration: 1.25,
              ease: "power3.out",
            },
            0.3 + i * 0.14,
          );
        }

        // The dark heart spreads out along the opened petals.
        tl.fromTo(
          '[data-layer="streak"]',
          { attr: petalTransform(0, 0.2), autoAlpha: 0 },
          {
            attr: petalTransform(0, 1),
            autoAlpha: 1,
            duration: 1.1,
            ease: "power2.out",
            stagger: 0.1,
          },
          0.75,
        );

        // Name rises into place as the bloom settles.
        tl.from(
          "[data-name-line]",
          {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: { each: 0.09, from: "start" },
          },
          1.9,
        );

        // Nav washes down last, once the name has landed.
        if (nav) {
          tl.fromTo(
            nav,
            { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 },
            {
              clipPath: "inset(0 0 0% 0)",
              autoAlpha: 1,
              duration: 1.6,
              ease: "power4.out",
            },
            2.6,
          );
        }

        // Idle life once it has bloomed: the head sways and each petal
        // breathes on its own rhythm so the motion never looks looped.
        const idle = gsap.timeline({ delay: tl.duration() + 0.15 });
        idle.to(
          "[data-flower-sway]",
          {
            rotation: 3,
            yPercent: -1.2,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          0,
        );
        for (let i = 0; i < PETAL_COUNT; i++) {
          idle.to(
            `[data-petal-idle="${i}"]`,
            {
              attr: petalTransform(i % 2 ? 2.5 : -2.5, 1.035, 1.05),
              duration: 2.2 + i * 0.35,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
            i * 0.3,
          );
        }

        // Grow on scroll: as the hero scrolls away the flower keeps opening
        // up and turning, and the name drifts apart around it.
        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top+=15%",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        scroll
          .to("[data-flower-scroll]", { scale: 1.45, rotation: 35, ease: "none" }, 0)
          .to('[data-name-block="left"]', { xPercent: -18, ease: "none" }, 0)
          .to('[data-name-block="right"]', { xPercent: 18, ease: "none" }, 0);

        // Don't spend frames on the idle loop while the hero is off screen.
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? idle.resume() : idle.pause()),
        });

        // Hover: petals flare open and the head turns, then springs back.
        const hit = root.current?.querySelector("[data-flower-hit]");
        if (!hit) return;

        // ctx.add keeps these handlers inside the GSAP context so their
        // tweens are scoped to the hero and reverted on unmount.
        const bloomOpen = ctx.add("bloomOpen", () => {
          gsap.to("[data-flower-hover]", {
            rotation: 12,
            scale: 1.04,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });
          for (let i = 0; i < PETAL_COUNT; i++) {
            gsap.to(`[data-petal-hover="${i}"]`, {
              attr: petalTransform(i % 2 ? 9 : -9, 1.12),
              duration: 0.6,
              delay: i * 0.04,
              ease: "back.out(2.2)",
              overwrite: "auto",
            });
          }
          gsap.to("[data-heart-hover]", {
            attr: heartTransform(1.18),
            duration: 0.6,
            ease: "back.out(2)",
            overwrite: "auto",
          });
        }) as () => void;

        const bloomRest = ctx.add("bloomRest", () => {
          gsap.to("[data-flower-hover]", {
            rotation: 0,
            scale: 1,
            duration: 1.4,
            ease: "elastic.out(1, 0.45)",
            overwrite: "auto",
          });
          gsap.to("[data-petal-hover]", {
            attr: petalTransform(0, 1),
            duration: 1.3,
            ease: "elastic.out(1, 0.4)",
            stagger: 0.04,
            overwrite: "auto",
          });
          gsap.to("[data-heart-hover]", {
            attr: heartTransform(1),
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
        }) as () => void;

        hit.addEventListener("pointerenter", bloomOpen);
        hit.addEventListener("pointerleave", bloomRest);
        return () => {
          hit.removeEventListener("pointerenter", bloomOpen);
          hit.removeEventListener("pointerleave", bloomRest);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current, { autoAlpha: 1 });
        if (nav) gsap.set(nav, { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div className="@container w-full max-w-[1218px]">
      <h1 className="sr-only">Jasmine Jackson</h1>
      <div
        ref={root}
        // Hidden until GSAP sets the start state, so the finished frame
        // never flashes before the bloom plays.
        style={{ visibility: "hidden" }}
        className="relative aspect-[1218/736] w-full"
      >
        {/* Nested so the intro, scroll growth, hover and idle sway each own
            a transform instead of overwriting one another. */}
        <div
          data-flower
          className="absolute top-0 left-[19.54%] h-full w-[60.43%]"
        >
          <div data-flower-scroll className="size-full">
            <div data-flower-hover className="size-full">
              <div data-flower-sway className="size-full">
                <BloomFlower className="size-full" />
              </div>
            </div>
          </div>
        </div>
        <NameBlock lines={LINES.left} side="left" />
        <NameBlock lines={LINES.right} side="right" />
      </div>
    </div>
  );
}
