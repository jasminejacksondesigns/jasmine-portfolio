import Image from "next/image";
import TypingTitle from "@/components/about/TypingTitle";
import { site } from "@/content/site";
import Reveal from "@/components/home/Reveal";
import Experience from "@/components/home/Experience";
import ToolsIUse from "@/components/home/ToolsIUse";

const body = "text-sm leading-relaxed font-light text-ink/90 sm:text-base";
const link = "underline decoration-1 underline-offset-2 hover:text-accent";

// Pulled straight from the "outside of digital screens" paragraph.
const HOBBIES = ["DIY home decor", "Hiking", "Yoga", "Half marathons"];

export default function AboutPage() {
  const { about, contact } = site;
  // The headshot leads the page, so the photo strip shows everything else.
  const lifePhotos = about.photos.filter(
    (photo) => photo.src !== about.headshot,
  );

  return (
    <div className="mx-auto max-w-[1680px] px-4 pb-24 sm:px-6 sm:pb-32">
      {/* Intro, laid out like the reference: title and text on the left two
          thirds, a portrait on the right third that runs from the top of the
          title to the bottom of the text. */}
      <section className="grid grid-cols-1 gap-x-12 gap-y-8 pt-10 sm:pt-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-stretch lg:gap-x-16 lg:pt-14">
        <div>
          <TypingTitle
            text={about.heading}
            className="font-display text-[28px] font-light tracking-tight text-ink sm:text-[32px]"
          />

          {/* Two columns: background and approach on the left, recent work
              and how to reach me on the right. */}
          <Reveal
            delay={0.1}
            className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:mt-8 lg:grid-cols-2"
          >
            <div className="space-y-5">
              <p className={body}>{about.paragraphs[0]}</p>
              <p className={body}>{about.paragraphs[1]}</p>
            </div>
            <div className="space-y-5">
              <p className={body}>{about.paragraphs[2]}</p>
              <p className={body}>
                Want to chat about design or work together? Reach out at{" "}
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
                , connect with me on{" "}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  LinkedIn
                </a>
                , or view my{" "}
                <a
                  href={contact.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Resume
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>

        {/* On wider screens the photo matches the left column's height. */}
        <Reveal delay={0.2} className="md:h-full">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-panel md:aspect-auto md:h-full md:min-h-[260px]">
            <Image
              src={about.headshot}
              alt={site.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              quality={95}
              className="object-cover object-[50%_46%]"
              priority
            />
          </div>
        </Reveal>
      </section>

      {/* Life outside work: a photo strip beside a short note and hobbies. */}
      <section className="mt-16 border-t border-border pt-12 sm:mt-20 sm:pt-16">
        <h2 className="font-display text-[28px] font-light tracking-tight text-ink sm:text-[32px]">
          My 5-9 after my 9-5
        </h2>

        <div className="mt-6 grid grid-cols-1 items-start gap-x-10 gap-y-8 sm:mt-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <Reveal className="min-w-0">
            {/* Scrolls sideways; the strip bleeds past the page edge on
                small screens so it reads as swipeable. */}
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-0 sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden">
              {lifePhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className="relative h-[320px] shrink-0 snap-start overflow-hidden rounded-[18px] bg-panel sm:h-[420px]"
                  style={{
                    aspectRatio: i === 0 ? 1.15 : Math.min(photo.aspect, 0.72),
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={`${site.name}, life outside of product design (${i + 1} of ${lifePhotos.length})`}
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display text-xl font-light tracking-tight text-ink sm:text-2xl">
              Where you&rsquo;ll find me off the clock
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Hobbies">
              {HOBBIES.map((hobby) => (
                <li
                  key={hobby}
                  className="rounded-full border border-border px-4 py-1.5 text-sm text-ink"
                >
                  {hobby}
                </li>
              ))}
            </ul>
            <p className={`${body} mt-6`}>{about.paragraphs[3]}</p>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed sections carry their own padding, so cancel the page's. */}
      <div className="-mx-4 mt-16 sm:-mx-6 sm:mt-20">
        <Experience />
        <ToolsIUse />
      </div>
    </div>
  );
}
