"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Matter from "matter-js";

type ToolItem = {
  name: string;
  icon: string;
  bg: string;
  text: string;
  blurb: string;
};

type PopoverState = {
  index: number;
  top: number;
  left: number;
};

export default function ToolChips({ items }: { items: ToolItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popover, setPopover] = useState<PopoverState | null>(null);

  // Reduced motion: place chips at rest immediately, no simulation.
  useLayoutEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    const chips = chipRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!container || chips.length === 0) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    chips.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const x = (width / (chips.length + 1)) * (i + 1) - rect.width / 2;
      el.style.transform = `translate(${x}px, ${height - rect.height - 8}px)`;
      el.style.opacity = "1";
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    if (!container) return;

    let cleanupSimulation: (() => void) | undefined;

    const startSimulation = () => {
      const chips = chipRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (!container || chips.length === 0) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const measurements = chips.map((el) => {
        const rect = el.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });

      const { Engine, Runner, Bodies, Composite, Events } = Matter;

      const engine = Engine.create();
      engine.gravity.y = 1.1;

      const wallThickness = 80;
      const ground = Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width * 2,
        wallThickness,
        { isStatic: true },
      );
      const leftWall = Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true },
      );
      const rightWall = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true },
      );

      const placed: { x: number; w: number }[] = [];
      const dropOrder = chips.map((_, i) => i).sort(() => Math.random() - 0.5);

      const bodies = chips.map((_el, i) => {
        const { width: w, height: h } = measurements[i];
        let x = w / 2;
        for (let attempt = 0; attempt < 40; attempt++) {
          const candidate = w / 2 + Math.random() * Math.max(width - w, 0);
          const overlaps = placed.some(
            (p) => Math.abs(candidate - p.x) < (w + p.w) / 2 + 4,
          );
          x = candidate;
          if (!overlaps) break;
        }
        placed.push({ x, w });
        const startY = -60 - dropOrder[i] * 30;
        return Bodies.rectangle(x, startY, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.1,
          friction: 0.8,
          frictionAir: 0.03,
          angle: (Math.random() - 0.5) * 0.3,
        });
      });

      Composite.add(engine.world, [ground, leftWall, rightWall, ...bodies]);

      const runner = Runner.create();
      Runner.run(runner, engine);

      const syncPositions = () => {
        bodies.forEach((body, i) => {
          const el = chips[i];
          const { width: w, height: h } = measurements[i];
          el.style.opacity = "1";
          el.style.transform = `translate(${body.position.x - w / 2}px, ${
            body.position.y - h / 2
          }px) rotate(${body.angle}rad)`;
        });
      };

      Events.on(engine, "afterUpdate", syncPositions);

      cleanupSimulation = () => {
        Events.off(engine, "afterUpdate", syncPositions);
        Runner.stop(runner);
        Engine.clear(engine);
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startSimulation();
          observer.disconnect();
        }
      },
      { rootMargin: "-80px", threshold: 0.2 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cleanupSimulation?.();
    };
  }, []);

  // Click-outside and Escape to close the popover.
  useEffect(() => {
    if (!popover) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (chipRefs.current[popover.index]?.contains(target)) return;
      setPopover(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPopover(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popover]);

  const openChip = (index: number) => {
    const chip = chipRefs.current[index];
    if (!chip) return;

    const chipRect = chip.getBoundingClientRect();
    const popoverWidth = 240;
    const gap = 10;

    let left = chipRect.left + window.scrollX + chipRect.width / 2 - popoverWidth / 2;
    const minLeft = window.scrollX + 8;
    const maxLeft = window.scrollX + window.innerWidth - popoverWidth - 8;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // Anchored to the chip's top edge; the popover itself is translated
    // upward by its own height via CSS so it always opens above the chip,
    // regardless of the popover's rendered content height. Guard against a
    // chip sitting too close to the top of the page, where shifting a
    // (roughly estimated) full-height popover upward would run off-screen.
    const estimatedMaxPopoverHeight = 170;
    const top = Math.max(
      chipRect.top + window.scrollY - gap,
      window.scrollY + 8 + estimatedMaxPopoverHeight,
    );

    setPopover((prev) =>
      prev?.index === index ? null : { index, top, left },
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] w-full overflow-hidden sm:h-[280px]"
    >
      {items.map((item, i) => (
        <div
          key={item.name}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          role="button"
          tabIndex={0}
          onClick={() => openChip(i)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openChip(i);
            }
          }}
          className="absolute top-0 left-0 flex cursor-pointer items-center gap-2 rounded-full px-[18px] py-3 opacity-0 outline-none will-change-transform"
          style={{ backgroundColor: item.bg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.icon} alt="" width={18} height={18} aria-hidden />
          <span
            className="font-subheading text-xs font-normal tracking-wide whitespace-nowrap uppercase"
            style={{ color: item.text }}
          >
            {item.name}
          </span>
        </div>
      ))}

      {popover &&
        createPortal(
          <div
            ref={popoverRef}
            className="absolute z-[90] w-[240px] -translate-y-full rounded-2xl border border-border bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            style={{ top: popover.top, left: popover.left }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setPopover(null)}
              className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-panel hover:text-ink"
            >
              ×
            </button>
            <p className="font-subheading text-xs font-normal tracking-wide text-ink uppercase">
              {items[popover.index].name}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
              {items[popover.index].blurb}
            </p>
          </div>,
          document.body,
        )}
    </div>
  );
}
