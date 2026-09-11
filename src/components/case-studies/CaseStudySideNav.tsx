"use client";

import { useEffect, useState } from "react";

export type CaseStudySection = { id: string; label: string };

export default function CaseStudySideNav({
  sections,
}: {
  sections: CaseStudySection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const overview = document.getElementById("overview");
    const hero = overview?.nextElementSibling;
    if (!(hero instanceof HTMLElement)) return;

    const update = () => {
      setPastHero(hero.getBoundingClientRect().bottom < 96);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      aria-label="Case study sections"
      aria-hidden={!pastHero}
      inert={!pastHero}
      className={`fixed top-28 left-0 z-40 hidden w-44 pl-3 xl:block ${
        pastHero
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-2 opacity-0"
      } transition-[opacity,transform] duration-300 ease-out`}
    >
      <ul className="space-y-0.5 text-sm">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block rounded-md px-2.5 py-1.5 transition-colors ${
                activeId === id
                  ? "bg-panel text-ink border border-border"
                  : "border border-transparent text-muted hover:text-ink"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
