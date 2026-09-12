import Link from "next/link";
import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import RequestMoreInfoAnimation from "./RequestMoreInfoAnimation";
import Reveal from "./Reveal";

function projectMeta(project: CaseStudy) {
  return project.company.toUpperCase();
}

const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)!;

const leftColumn = [
  { video: "/work/mockups/intuit-intelligence-hero.mp4", aspect: 2.05, fit: "cover" as const, project: bySlug("intuit-intelligence-homepage"), bg: "bg-[#eef2ea]" },
  {
    video: "/homing/homing.mp4",
    aspect: 2.03,
    fit: "cover" as const,
    project: bySlug("homing"),
    bg: "bg-[#8fc9e8]",
  },
  { src: "/work/mockups/realme-10-v2.png", aspect: 1.33, fit: "contain" as const, project: bySlug("mobile-sales-modernization"), bg: "bg-[#c7ecfc]" },
];

const rightColumn = [
  { src: "/work/mockups/iphone-14-v2.png", aspect: 2200 / 3246, fit: "contain" as const, project: bySlug("invoicing-automation"), bg: "bg-[#aed3ab]", padClass: "p-10 sm:p-16" },
  { aspect: 1.39, fit: "contain" as const, project: bySlug("accounting-agent"), requestMoreInfo: true, bg: "bg-[#cfe3f7]", padded: true },
];

function MockupTile({
  src,
  video,
  aspect,
  fit,
  project,
  delay,
  requestMoreInfo,
  bg,
  padded,
  padClass,
  className = "",
}: {
  src?: string;
  video?: string;
  aspect: number;
  fit: "cover" | "contain";
  project: CaseStudy;
  delay: number;
  requestMoreInfo?: boolean;
  bg: string;
  padded?: boolean;
  padClass?: string;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <Link href={`/work/${project.slug}`} className="group block w-full">
        <div className={`overflow-hidden rounded-2xl ${bg}`}>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: aspect }}
          >
            <div
              className={`absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03] ${padClass ?? (padded ? "p-6 sm:p-10" : "")}`}
            >
              <div className="relative h-full w-full">
                {video ? (
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                ) : requestMoreInfo ? (
                  <RequestMoreInfoAnimation className="h-full w-full" />
                ) : (
                  <Image
                    src={src!}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className={fit === "contain" ? "object-contain" : "object-cover"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="font-display text-base font-light text-ink transition-colors group-hover:text-accent">
            {project.title}
          </span>
          <span className="font-subheading text-xs font-normal tracking-wider text-muted uppercase">
            {projectMeta(project)}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function WorkPreview() {
  return (
    <section
      id="work"
      className="section-anchor section-curve z-40 bg-bg"
    >
      <div className="mx-auto max-w-[1680px] px-4 pb-24 sm:px-6 sm:pb-32">
        <h2 className="sr-only">Work</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-stretch">
          <div className="flex flex-col gap-6 lg:h-full">
            {leftColumn.map((tile, i) => (
              <MockupTile
                key={tile.project.slug}
                {...tile}
                delay={0.05 * i}
                className={i === leftColumn.length - 1 ? "lg:mt-auto" : ""}
              />
            ))}
          </div>
          <div className="flex flex-col gap-6 lg:h-full">
            {rightColumn.map((tile, i) => (
              <MockupTile
                key={tile.project.slug}
                {...tile}
                delay={0.05 * (i + 1)}
                className={i === rightColumn.length - 1 ? "lg:mt-auto" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
