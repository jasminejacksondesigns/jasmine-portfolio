import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "@/components/home/Reveal";
import PhotoCarousel from "@/components/about/PhotoCarousel";

export default function AboutPage() {
  const { about, contact } = site;

  return (
    <div className="mx-auto max-w-[1368px] px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_405px] lg:gap-16">
        <Reveal delay={0.05}>
          <h1 className="flex flex-wrap items-center gap-2 text-[28px] font-light tracking-tight text-ink sm:text-[32px]">
            {about.heading}
            <Image
              src="/about/garden/sprout-icon.svg"
              alt=""
              width={24}
              height={35}
              aria-hidden
            />
          </h1>

          <div className="mt-6 grid max-w-[900px] grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            <div className="space-y-4">
              {about.paragraphs.slice(0, 2).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed font-light text-ink/90 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              {about.paragraphs.slice(2).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed font-light text-ink/90 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
              <p className="text-sm leading-relaxed font-light text-ink/90 sm:text-base">
                Feel free to reach out if you&rsquo;d like to chat about design or explore working together:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="underline decoration-1 underline-offset-2 hover:text-accent"
                >
                  {contact.email}
                </a>
                ,{" "}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-1 underline-offset-2 hover:text-accent"
                >
                  LinkedIn
                </a>
                , or my{" "}
                <a
                  href={contact.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-1 underline-offset-2 hover:text-accent"
                >
                  resume
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mx-auto w-full max-w-[320px] sm:max-w-[405px] lg:mx-0">
          <div
            className="relative w-full overflow-hidden rounded-full bg-[#5c6942] p-4"
            style={{ aspectRatio: "405 / 390" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={about.headshot}
                alt={site.name}
                fill
                sizes="(min-width: 1024px) 405px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 sm:mt-20">
        <Reveal>
          <PhotoCarousel
            photos={about.photos}
            alt={`${site.name} — life outside of product design`}
          />
        </Reveal>
      </div>
    </div>
  );
}
