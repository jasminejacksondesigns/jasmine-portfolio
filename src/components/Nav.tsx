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

  return (
    <header className="w-full border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <Link
          href="/"
          className="font-subheading truncate text-base font-medium tracking-[0.08em] text-ink uppercase sm:text-lg"
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
                className={`text-sm transition-colors ${
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
