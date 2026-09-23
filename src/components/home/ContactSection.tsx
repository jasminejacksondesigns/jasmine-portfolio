import { site } from "@/content/site";
import FlowerMark from "@/components/FlowerMark";

export default function ContactSection() {
  const { contact } = site;

  const links = [
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Email", href: `mailto:${contact.email}` },
    { label: "GitHub", href: contact.github },
    { label: "Instagram", href: contact.instagram.href },
    { label: "Resume", href: contact.resumeHref },
  ];

  return (
    <section
      id="contact"
      className="section-anchor relative z-10 w-full border-t border-footer-border bg-gradient-to-b from-footer-from to-footer-to"
    >
      <div className="mx-auto flex max-w-[1680px] flex-col gap-10 px-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20">
        <div className="flex max-w-xl flex-col gap-4">
          <p className="font-subheading text-xs font-normal tracking-[0.5px] text-muted uppercase">
            Designed + coded by Jasmine
          </p>
          <p className="font-display text-2xl leading-snug font-light tracking-tight text-ink sm:text-[26px]">
            Let&apos;s bloom something awesome together.
          </p>
          <p className="text-sm font-light text-muted">
            San Francisco, CA
            <br />
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 sm:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-display text-sm font-light text-ink">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor-pointer
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="transition-transform duration-700 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <FlowerMark flower="daisy" className="size-10" />
        </div>
      </div>
    </section>
  );
}
