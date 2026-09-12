import { site } from "@/content/site";
import Reveal from "./Reveal";
import ToolChips from "./ToolChips";

export default function ToolsIUse() {
  const { label, heading, items } = site.tools;

  return (
    <section className="z-20 bg-bg">
      <div className="mx-auto max-w-[1680px] border-t border-border px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <Reveal className="lg:w-[300px] lg:shrink-0">
            <p className="font-subheading text-xs font-normal tracking-[0.5px] text-muted uppercase">
              {label}
            </p>
            <p className="font-display mt-4 text-2xl leading-snug font-light text-ink sm:text-[26px]">
              {heading}
            </p>
          </Reveal>

          <div className="flex-1">
            <ToolChips items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
