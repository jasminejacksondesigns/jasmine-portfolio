import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function ContactSection() {
  const { contact } = site;

  const links = [
    { label: "Email", meta: contact.email, href: `mailto:${contact.email}` },
    { label: "Resume / CV", meta: "PDF, updated 2026", href: contact.resumeHref },
    { label: "LinkedIn", meta: "jasminejackson19", href: contact.linkedin },
    { label: "Instagram", meta: contact.instagram.handle, href: contact.instagram.href },
  ];

  return (
    <section
      id="contact"
      className="section-anchor relative z-10 bg-dark-bg text-dark-ink"
    >
      <div className="mx-auto grid max-w-[1368px] grid-cols-1 gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[420px_1fr] lg:grid-rows-[auto_auto]">
        <Reveal className="order-1 lg:col-start-1 lg:row-start-1">
          <p className="text-dark-muted text-xs font-medium tracking-widest uppercase">
            Get in touch
          </p>
          <h2 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
            Let&apos;s create something awesome together.
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="order-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group border-dark-border hover:border-dark-ink flex items-center justify-between gap-4 rounded-2xl border p-5 transition-colors"
            >
              <div>
                <p className="font-semibold">{link.label}</p>
                <p className="text-dark-muted mt-1 text-sm">{link.meta}</p>
              </div>
              <span
                aria-hidden
                className="border-dark-border text-dark-ink group-hover:border-dark-ink group-hover:bg-dark-ink group-hover:text-dark-bg flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 12L12 4M12 4H5M12 4V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal
          delay={0.05}
          className="text-dark-muted order-3 flex flex-col gap-4 text-sm lg:order-none lg:col-start-1 lg:row-start-2"
        >
          <p>San Francisco, CA</p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
