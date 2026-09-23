import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Experience() {
  const { label, heading, items } = site.experience;

  return (
    <section className="z-20 bg-bg">
      <div className="mx-auto max-w-[1680px] border-t border-border px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <Reveal className="lg:w-[340px] lg:shrink-0">
            <p className="font-subheading text-xs font-normal tracking-[0.5px] text-muted uppercase">
              {label}
            </p>
            <p className="font-display mt-4 text-2xl leading-snug font-light text-ink sm:text-[26px]">
              {heading}
            </p>
          </Reveal>

          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {items.map((item, i) => (
              // Items pop in left to right within each row; each row triggers
              // on its own as it scrolls into view.
              <Reveal
                key={item.name}
                delay={0.08 * (i % 3)}
                y={20}
                scale={0.9}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div
                  className={`relative size-[50px] overflow-hidden ${
                    item.rounded ? "rounded-full" : "rounded-[8px]"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} logo`}
                    fill
                    sizes="50px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-display text-sm font-light text-ink">
                    {item.name}
                  </p>
                  <p className="font-subheading text-xs text-muted">{item.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
