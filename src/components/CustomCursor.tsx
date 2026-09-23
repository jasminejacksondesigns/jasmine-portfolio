"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function isPointerTarget(node: EventTarget | null) {
  if (!(node instanceof Element)) return false;
  return Boolean(node.closest("a, button, [data-cursor-pointer], summary, label"));
}

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = dot.current;
      if (!el) return;

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!fine.matches || motion.matches) return;

      document.documentElement.setAttribute("data-custom-cursor", "");
      gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

      const xTo = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3.out" });
      let shown = false;

      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        if (!shown) {
          shown = true;
          gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
        }
      };

      const onOver = (event: PointerEvent) => {
        gsap.to(el, {
          width: isPointerTarget(event.target) ? 28 : 16,
          height: isPointerTarget(event.target) ? 28 : 16,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });

      return () => {
        document.documentElement.removeAttribute("data-custom-cursor");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
      };
    },
    { scope: dot },
  );

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[99999] size-4 rounded-full bg-ink opacity-0 shadow-[0_0_0_1px_var(--color-bg),0_0_8px_rgba(0,0,0,0.28)]"
    />
  );
}
