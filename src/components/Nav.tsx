"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Play", href: "/play" },
];

export default function Nav() {
  const pathname = usePathname();
  // On the homepage the nav waits for the hero intro; the hero reveals
  // it. Hidden from first render so it never flashes in before the intro.
  const waitForBloom = pathname === "/";

  return (
    <header
      data-site-nav
      data-wait-bloom={waitForBloom || undefined}
      className="font-nav sticky top-0 z-[100] w-full overflow-hidden border-b border-border bg-bg"
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
        <Link
          href="/"
          className="truncate text-xs font-medium tracking-[0.08em] text-ink uppercase sm:text-sm"
        >
          {site.name}
        </Link>

        <nav className="flex items-center gap-5 sm:gap-6">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
