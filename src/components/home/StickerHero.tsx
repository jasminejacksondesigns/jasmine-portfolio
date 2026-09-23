"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Layout from Figma "Desktop - 3" (lockup frame 839 × 595). Every piece is
// placed in that frame's coordinates and converted to percentages of the
// stage; type is sized in container-width units so the lockup scales as one
// piece. The stage is the frame plus an even 28px margin, which also holds
// the larger intro flowers, so the animation stays centered start to finish.
const STAGE = { x: -28, y: -28, w: 895, h: 651 };

type Box = { cx: number; cy: number; w: number; h: number };

const place = ({ cx, cy, w, h }: Box): CSSProperties => ({
  left: `${((cx - w / 2 - STAGE.x) / STAGE.w) * 100}%`,
  top: `${((cy - h / 2 - STAGE.y) / STAGE.h) * 100}%`,
  width: `${(w / STAGE.w) * 100}%`,
  height: `${(h / STAGE.h) * 100}%`,
});

// Poster px → container-width units.
const cq = (px: number) => `${(px / STAGE.w) * 100}cqw`;

// Side-by-side pair in the middle of the frame (light daisy left, green
// flower right), matching the source: same vertical center, a modest
// overlap, not stacked. Scroll expands them into their seats; scrolling
// back up brings them together again.
const PAIR_CX = 419.5;
const PAIR_CY = 297.5;
const PAIR_DIST = 273;
const DAISY = { cx: 542, cy: 79.5, w: 152, h: 159 };
const DAISY_START = { cx: PAIR_CX + PAIR_DIST / 2, cy: PAIR_CY, w: 340 };
const STRIPED = { cx: 276.5, cy: 506.5, w: 177, h: 177 };
const STRIPED_START = { cx: PAIR_CX - PAIR_DIST / 2, cy: PAIR_CY, w: 340 };

const startPose = (end: Box, start: { cx: number; cy: number; w: number }) => ({
  xPercent: ((start.cx - end.cx) / end.w) * 100,
  yPercent: ((start.cy - end.cy) / end.h) * 100,
  scale: start.w / end.w,
});

const travel = (
  end: Box,
  start: { cx: number; cy: number; w: number },
  px: number,
) => ({
  x: (start.cx - end.cx) * px,
  y: (start.cy - end.cy) * px,
  xPercent: 0,
  yPercent: 0,
});

// Pill sizes are the unrotated shapes (48px padding around the text).
const OLIVE_PILL = { cx: 313.5, cy: 228.5, w: 616, h: 145 };
const BLUE_PILL = { cx: 558, cy: 391.5, w: 548, h: 182 };

const NAME_SIZE = 36;

const capsule = {
  borderRadius: `${cq(82)} ${cq(92)} ${cq(82)} ${cq(92)}`,
};

// Positioned box → intro layer → hover layer → statically rotated content,
// so the intro, the hover and the design's resting rotation each own their
// own transform and never overwrite one another.
function Piece({
  box,
  rotate = 0,
  pop,
  sticker = false,
  children,
}: {
  box: Box;
  rotate?: number;
  pop?: string;
  /** Reacts on hover once it has landed. */
  sticker?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={place(box)}>
      <div data-pop={pop} className="size-full">
        <div data-sticker={sticker || undefined} className="size-full">
          <div className="size-full" style={{ rotate: `${rotate}deg` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StickerHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Lives in the layout, outside this component's scope.
      const nav = document.querySelector<HTMLElement>("[data-site-nav]");

      mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
        gsap.set(root.current, { autoAlpha: 1 });

        const scale = (root.current?.offsetWidth || STAGE.w) / STAGE.w;
        const stripedTogether = startPose(STRIPED, STRIPED_START);
        const daisyTogether = startPose(DAISY, DAISY_START);
        const stripedMove = travel(STRIPED, STRIPED_START, scale);
        const daisyMove = travel(DAISY, DAISY_START, scale);

        const stripedEl = root.current?.querySelector<HTMLElement>(
          "[data-flower='striped']",
        );
        const daisyEl = root.current?.querySelector<HTMLElement>(
          "[data-flower='daisy']",
        );
        const stripedMoveEl = root.current?.querySelector<HTMLElement>(
          "[data-flower-move='striped']",
        );
        const daisyMoveEl = root.current?.querySelector<HTMLElement>(
          "[data-flower-move='daisy']",
        );
        if (!stripedEl || !daisyEl || !stripedMoveEl || !daisyMoveEl) return;

        // Rest pose is the source pair. Scale starts at the together size so
        // they never get stuck invisible; scroll then shrinks them into seats.
        gsap.set(stripedMoveEl, stripedMove);
        gsap.set(daisyMoveEl, daisyMove);
        gsap.set(stripedEl, {
          scale: stripedTogether.scale,
          rotation: 0,
          autoAlpha: 1,
        });
        gsap.set(daisyEl, {
          scale: daisyTogether.scale,
          rotation: 0,
          autoAlpha: 1,
        });

        // Scroll progress drives the lockup. The section is tall and its
        // inner frame is sticky, so the hero stays put while you scroll
        // through it. The animation finishes by FINISH_AT, then the finished
        // layout holds for the rest of the section before the work gallery
        // arrives. Progress is eased toward the scroll position rather than
        // snapped to it, so fast scrolls still read as a smooth motion.
        const FINISH_AT = 0.7;
        const section = root.current?.closest("section");
        const state = { p: 0 };

        // Homepage nav stays hidden until the visitor scrolls and the
        // flowers start opening apart, and hides again back at the top.
        const NAV_AT = 0.25;
        let navShown = false;
        const setNav = (show: boolean) => {
          if (!nav || show === navShown) return;
          // The work gallery hides the nav while it's pinned; leave that alone.
          if (document.documentElement.hasAttribute("data-work-gallery")) return;
          navShown = show;
          gsap.to(nav, {
            clipPath: show ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            autoAlpha: show ? 1 : 0,
            duration: show ? 1.2 : 0.4,
            ease: show ? "power4.out" : "power2.in",
            overwrite: "auto",
          });
        };
        if (nav) gsap.set(nav, { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 });

        const render = () => {
          const t = gsap.utils.clamp(0, 1, state.p / FINISH_AT);
          const move = gsap.parseEase("power2.inOut")(t);
          setNav(t >= NAV_AT);
          gsap.set(stripedMoveEl, {
            x: stripedMove.x * (1 - move),
            y: stripedMove.y * (1 - move),
          });
          gsap.set(daisyMoveEl, {
            x: daisyMove.x * (1 - move),
            y: daisyMove.y * (1 - move),
          });
          gsap.set(stripedEl, {
            scale: gsap.utils.interpolate(stripedTogether.scale, 1, move),
          });
          gsap.set(daisyEl, {
            scale: gsap.utils.interpolate(daisyTogether.scale, 1, move),
          });
          // Pills pop in over the second half of the flowers' move, one
          // after the other.
          gsap.utils.toArray<HTMLElement>("[data-pop]").forEach((el, i) => {
            const start = 0.45 + i * 0.15;
            const k = gsap.utils.clamp(0, 1, (t - start) / 0.3);
            gsap.set(el, {
              scale: gsap.parseEase("back.out(1.7)")(k),
              autoAlpha: gsap.utils.clamp(0, 1, k * 1.6),
            });
          });
        };

        const readScroll = () => {
          if (!section) return 0;
          const total = Math.max(section.offsetHeight - window.innerHeight, 1);
          return gsap.utils.clamp(
            0,
            1,
            -section.getBoundingClientRect().top / total,
          );
        };

        const applyScroll = () => {
          gsap.to(state, {
            p: readScroll(),
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
            onUpdate: render,
          });
        };

        state.p = readScroll();
        render();
        window.addEventListener("scroll", applyScroll, { passive: true });
        window.addEventListener("resize", applyScroll);

        // The flowers turn slowly and endlessly in opposite directions, on
        // their own wrapper so the spin never fights the scroll or hover.
        gsap.to("[data-flower-spin='striped']", {
          rotation: "+=360",
          duration: 48,
          ease: "none",
          repeat: -1,
        });
        gsap.to("[data-flower-spin='daisy']", {
          rotation: "-=360",
          duration: 36,
          ease: "none",
          repeat: -1,
        });

        // Hover: a sticker lifts, grows a touch and tilts, then springs back
        // when the pointer leaves. Only the painted shapes take the pointer,
        // so the transparent corners of each box don't trigger it.
        const stickers = gsap.utils.toArray<HTMLElement>("[data-sticker]");
        const cleanups = stickers.map((el, i) => {
          const tilt = i % 2 ? -3 : 3;
          const lift = ctx.add(`lift${i}`, () => {
            gsap.to(el, {
              scale: 1.06,
              rotation: tilt,
              y: -6,
              duration: 0.45,
              ease: "back.out(2.5)",
              overwrite: "auto",
            });
          }) as () => void;
          const settle = ctx.add(`settle${i}`, () => {
            gsap.to(el, {
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.9,
              ease: "elastic.out(1, 0.45)",
              overwrite: "auto",
            });
          }) as () => void;
          el.addEventListener("pointerenter", lift);
          el.addEventListener("pointerleave", settle);
          return () => {
            el.removeEventListener("pointerenter", lift);
            el.removeEventListener("pointerleave", settle);
          };
        });

        // Flower hover: swell only — no spin, so they never look like they
        // are drifting in place.
        const blooms = gsap.utils.toArray<HTMLElement>("[data-bloom]");
        blooms.forEach((el, i) => {
          const open = ctx.add(`bloomOpen${i}`, () => {
            gsap.to(el, {
              scale: 1.08,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }) as () => void;
          const close = ctx.add(`bloomClose${i}`, () => {
            gsap.to(el, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }) as () => void;
          el.addEventListener("pointerenter", open);
          el.addEventListener("pointerleave", close);
          cleanups.push(() => {
            el.removeEventListener("pointerenter", open);
            el.removeEventListener("pointerleave", close);
          });
        });

        return () => {
          window.removeEventListener("scroll", applyScroll);
          window.removeEventListener("resize", applyScroll);
          cleanups.forEach((cleanup) => cleanup());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current, { autoAlpha: 1 });
        if (nav) gsap.set(nav, { autoAlpha: 1 });
        const scale = (root.current?.offsetWidth || STAGE.w) / STAGE.w;
        gsap.set(
          "[data-flower-move='striped']",
          travel(STRIPED, STRIPED_START, scale),
        );
        gsap.set(
          "[data-flower-move='daisy']",
          travel(DAISY, DAISY_START, scale),
        );
        gsap.set("[data-flower='striped']", {
          scale: startPose(STRIPED, STRIPED_START).scale,
        });
        gsap.set("[data-flower='daisy']", {
          scale: startPose(DAISY, DAISY_START).scale,
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      className="w-full"
      // Largest size that fits the first screen while staying clear of the
      // nav above and an equal gap below, since the hero sits behind it.
      style={{
        maxWidth: `min(${STAGE.w}px, calc((100svh - 2 * var(--nav-h) - 2rem) * ${STAGE.w / STAGE.h}))`,
      }}
    >
      <h1 className="sr-only">
        I&rsquo;m Jasmine Jackson, designer and builder rooted in user needs,
        growing impactful experiences.
      </h1>
      <div
        ref={root}
        aria-hidden
        // Hidden until GSAP sets the start state, so the finished layout
        // never flashes before the intro plays.
        style={{
          visibility: "hidden",
          aspectRatio: `${STAGE.w} / ${STAGE.h}`,
        }}
        className="@container pointer-events-none relative w-full font-display"
      >
        <div data-exit className="absolute inset-0">
          {/* Stacking: pills, then the green flower, then the light daisy on
            top so the together pose matches the source. */}
          <Piece box={BLUE_PILL} rotate={5.21} pop="blue" sticker>
            <div
              className="pointer-events-auto flex size-full items-center justify-center bg-[#d5e3f6]"
              style={capsule}
            >
              <p
                className="font-body text-center leading-[1.18] font-semibold text-[#004a06]"
                style={{ fontSize: cq(24), width: cq(452) }}
              >
                designer and builder rooted in user needs, growing impactful
                experiences
              </p>
            </div>
          </Piece>

          <Piece box={OLIVE_PILL} rotate={-5.25} pop="olive" sticker>
            <div
              className="pointer-events-auto flex size-full items-center justify-center bg-[#8da617]"
              style={capsule}
            >
              <p
                className="font-heading text-center leading-[1.18] font-normal whitespace-nowrap text-[#fffdf8]"
                style={{ fontSize: cq(NAME_SIZE) }}
              >
                I&rsquo;m Jasmine Jackson
              </p>
            </div>
          </Piece>

          <div className="absolute" style={place(DAISY)}>
            <div data-flower-move="daisy" className="size-full">
              <div data-flower="daisy" className="size-full">
                <div data-flower-spin="daisy" className="size-full">
                  {/* Round hit area (the image ignores the pointer) so only the
                bloom, not its square box, reacts. */}
                  <div
                    data-bloom
                    className="pointer-events-auto size-full rounded-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero/sticker/daisy.svg"
                      alt=""
                      className="pointer-events-none size-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute" style={place(STRIPED)}>
            <div data-flower-move="striped" className="size-full">
              <div data-flower="striped" className="size-full">
                <div data-flower-spin="striped" className="size-full">
                  <div
                    data-bloom
                    className="pointer-events-auto size-full rounded-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero/sticker/striped-flower.svg"
                      alt=""
                      className="pointer-events-none size-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
