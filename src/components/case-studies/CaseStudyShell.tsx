"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CaseStudySideNav, { type CaseStudySection } from "./CaseStudySideNav";
import { nextCaseStudy } from "./caseStudyFlow";

export default function CaseStudyShell({
  slug,
  sections,
  children,
}: {
  slug: string;
  sections: CaseStudySection[];
  children: React.ReactNode;
}) {
  const next = nextCaseStudy(slug);

  return (
    <div className="bg-bg font-sans text-ink selection:bg-panel selection:text-ink">
      <CaseStudySideNav sections={sections} />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 sm:px-6 md:pt-40 md:pb-32">
        <div className="flex flex-col gap-16 md:gap-24">{children}</div>
        {next ? <CaseStudyNext next={next} /> : null}
      </div>
      <CaseStudyZoom />
    </div>
  );
}

function CaseStudyNext({
  next,
}: {
  next: { slug: string; title: string; company: string };
}) {
  return (
    <div className="mt-20 border-t border-border pt-10 md:mt-28 md:pt-14">
      <Link
        href={`/work/${next.slug}`}
        className="group flex items-end justify-between gap-6"
      >
        <span>
          <span className="font-subheading text-xs tracking-wider text-muted uppercase">
            Next
          </span>
          <span className="font-display mt-2 block text-2xl font-light tracking-tight text-ink md:text-3xl">
            {next.title}
          </span>
          <span className="mt-1 block text-sm text-muted">{next.company}</span>
        </span>
        <span
          aria-hidden
          className="font-display mb-1 text-2xl font-light text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
        >
          →
        </span>
      </Link>
    </div>
  );
}

function CaseStudyZoom() {
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);

  const close = useCallback(() => setShot(null), []);

  useEffect(() => {
    if (!shot) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [shot, close]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[aria-label='Close image']")) return;
      const figure = target.closest(".cs-figure");
      if (!figure) return;
      const img =
        target instanceof HTMLImageElement
          ? target
          : figure.querySelector("img");
      if (!(img instanceof HTMLImageElement)) return;
      event.preventDefault();
      setShot({
        src: img.currentSrc || img.src,
        alt: img.alt || "",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!shot) return null;

  return (
    <button
      type="button"
      aria-label="Close image"
      className="cs-zoom-backdrop fixed inset-0 z-[200] flex cursor-zoom-out items-center justify-center px-4 py-10 sm:px-10"
      onClick={close}
    >
      <img
        src={shot.src}
        alt={shot.alt}
        className="cs-zoom-image max-h-full max-w-full rounded-xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      />
    </button>
  );
}
