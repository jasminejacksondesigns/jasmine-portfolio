import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import CoverMedia from "./CoverMedia";

export default function ProjectPreviewCard({
  project,
  className = "",
  mockupAspect = "aspect-[16/10]",
}: {
  project: CaseStudy;
  className?: string;
  mockupAspect?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`block h-full rounded-2xl border border-border bg-panel p-5 transition-colors hover:border-accent ${className}`}
    >
      <CoverMedia project={project} aspect={mockupAspect} />
    </Link>
  );
}
