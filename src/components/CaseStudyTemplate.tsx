import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import Panel from "./ui/Panel";
import Card from "./ui/Card";
import PlaceholderMockup from "./ui/PlaceholderMockup";
import ContentImage from "./ui/ContentImage";
import CoverMedia from "./CoverMedia";
import ImageFlowAnimation from "./ImageFlowAnimation";

export default function CaseStudyTemplate({ project }: { project: CaseStudy }) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 pt-24 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
      <Link href="/#work" className="text-muted hover:text-ink text-sm">
        ← Back to work
      </Link>

      <Panel className="p-8 sm:p-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs tracking-wide text-muted uppercase">Company</dt>
            <dd className="mt-0.5">{project.company}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted uppercase">Role</dt>
            <dd className="mt-0.5">{project.role}</dd>
          </div>
          {project.date && (
            <div>
              <dt className="text-xs tracking-wide text-muted uppercase">Date</dt>
              <dd className="mt-0.5">{project.date}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs tracking-wide text-muted uppercase">Tools</dt>
            <dd className="mt-0.5">{project.tools.join(", ")}</dd>
          </div>
        </dl>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent underline decoration-2 underline-offset-4 hover:text-ink"
          >
            Visit live site ↗
          </a>
        )}
      </Panel>

      {(project.coverVideo || project.coverImage || project.coverAnimation) && (
        <CoverMedia project={project} aspect="aspect-video" />
      )}

      <Card className="space-y-8 p-8 sm:p-12">
        {project.content.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={i} className="text-ink/80 text-base leading-relaxed sm:text-lg">
                  {block.text}
                </p>
              );
            case "subheading":
              return (
                <h2 key={i} className="pt-2 text-2xl font-semibold tracking-tight">
                  {block.text}
                </h2>
              );
            case "image":
              return block.src && block.width && block.height ? (
                <ContentImage
                  key={i}
                  src={block.src}
                  caption={block.caption}
                  width={block.width}
                  height={block.height}
                />
              ) : (
                <PlaceholderMockup key={i} caption={block.caption} />
              );
            case "imageFlow":
              return (
                <figure key={i}>
                  <ImageFlowAnimation frames={block.frames} />
                  <figcaption className="mt-2 text-center text-sm text-muted">
                    {block.caption}
                  </figcaption>
                </figure>
              );
            case "video":
              return block.frame === "phone" ? (
                <figure key={i}>
                  <video
                    className="mx-auto block max-w-xs rounded-[2rem]"
                    src={block.src}
                    controls
                    playsInline
                    muted
                    loop
                  />
                  <figcaption className="mt-2 text-center text-sm text-muted">
                    {block.caption}
                  </figcaption>
                </figure>
              ) : (
                <figure key={i}>
                  <video
                    className="w-full rounded-2xl border border-border"
                    src={block.src}
                    controls
                    playsInline
                  />
                  <figcaption className="mt-2 text-sm text-muted">
                    {block.caption}
                  </figcaption>
                </figure>
              );
            case "figma":
              return (
                <figure key={i}>
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <iframe
                      style={{ border: "none" }}
                      width="100%"
                      height="450"
                      src={block.embedUrl}
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="mt-2 flex items-center justify-between text-sm text-muted">
                    <span>{block.caption}</span>
                    <a
                      href={block.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline decoration-2 underline-offset-4 hover:text-ink"
                    >
                      Open in Figma ↗
                    </a>
                  </figcaption>
                </figure>
              );
            case "quote":
              return (
                <blockquote
                  key={i}
                  className="border-l-2 border-accent pl-4 text-lg text-ink/80 italic"
                >
                  &ldquo;{block.text}&rdquo;
                  {block.author && (
                    <footer className="mt-2 text-sm text-muted not-italic">
                      — {block.author}
                    </footer>
                  )}
                </blockquote>
              );
            case "stats":
              return (
                <div key={i} className="flex flex-wrap gap-8 rounded-2xl bg-panel p-6">
                  {block.items.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-semibold text-accent">{stat.value}</p>
                      <p className="text-sm text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}
      </Card>
    </div>
  );
}
