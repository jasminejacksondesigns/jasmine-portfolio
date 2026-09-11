import type { CaseStudy } from "@/content/case-studies";
import PlaceholderMockup from "./ui/PlaceholderMockup";
import QBAnimation from "./QBAnimation";

export default function CoverMedia({
  project,
  aspect,
  className = "",
}: {
  project: CaseStudy;
  aspect: string;
  className?: string;
}) {
  if (project.coverAnimation === "qb") {
    return (
      <div
        className={`${aspect} ${className} overflow-hidden rounded-2xl border border-border`}
      >
        <QBAnimation className="h-full w-full" />
      </div>
    );
  }

  return (
    <PlaceholderMockup
      caption={`${project.title} — placeholder`}
      aspect={aspect}
      className={className}
      videoSrc={project.coverVideo}
      imageSrc={project.coverImage}
    />
  );
}
