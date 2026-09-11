"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Matter from "matter-js";

type ToolItem = {
  name: string;
  icon: string;
  bg: string;
  text: string;
};

export default function ToolChips({ items }: { items: ToolItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          className="absolute top-0 left-0 flex items-center gap-2 rounded-full px-[18px] py-3 opacity-0 will-change-transform"
          style={{ backgroundColor: item.bg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.icon} alt="" width={18} height={18} aria-hidden />
          <span
            className="text-xs font-bold tracking-wide whitespace-nowrap uppercase"
            style={{ color: item.text }}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
