"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  PUBLIC_CASE_STUDY_SECTION_IDS,
  useCaseStudyLock,
} from "./CaseStudyLock";

export type CaseStudySection = { id: string; label: string };

const FOOTER_GAP = 24;

export default function CaseStudySideNav({
  sections,
}: {
  sections: CaseStudySection[];
}) {
  const navRef = useRef<HTMLElement>(null);
  const { unlocked } = useCaseStudyLock();
  const visibleSections = useMemo(
    () =>
      unlocked
        ? sections
        : sections.filter((section) =>
            PUBLIC_CASE_STUDY_SECTION_IDS.has(section.id),
          ),
    [sections, unlocked],
  );
  const [activeId, setActiveId] = useState(visibleSections[0]?.id);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const elements = visibleSections
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
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleSections]);

  useEffect(() => {
    const contact = document.getElementById("contact");

    const update = () => {
      const nav = navRef.current;
      const hitsFooter =
        nav != null &&
        contact != null &&
        contact.getBoundingClientRect().top <
          nav.getBoundingClientRect().bottom + FOOTER_GAP;
      setVisible(!hitsFooter);
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
    <motion.nav
      ref={navRef}
      layoutRoot
      aria-label="Case study sections"
      aria-hidden={!visible}
      inert={!visible}
      className={`w-full px-3 ${
        visible
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-2 opacity-0"
      } transition-[opacity,transform] duration-300 ease-out`}
    >
      <LayoutGroup id="case-study-nav">
        <Link
          href="/#work"
          className="mb-5 inline-flex items-center gap-1.5 px-2.5 text-sm tracking-wider text-muted uppercase transition-colors hover:text-ink"
        >
          <span aria-hidden>←</span>
          Back
        </Link>
        <ul className="space-y-0.5 text-sm">
          {visibleSections.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`relative block rounded-md px-2.5 py-1.5 transition-colors ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="cs-nav-pill"
                      className="absolute inset-0 bg-panel"
                      style={{ borderRadius: 8 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              visualDuration: 0.35,
                              bounce: 0.12,
                            }
                      }
                    />
                  ) : null}
                  <span className="relative">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </motion.nav>
  );
}
