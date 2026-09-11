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
    <div className="pointer-events-none fixed inset-x-0 top-6 z-[80] flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-card/90 p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : link.href === "/about"
                ? pathname.startsWith("/about")
                : link.href === "/play"
                  ? pathname.startsWith("/play")
                  : false;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-panel font-medium text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <span className="sr-only">{site.name}</span>
    </div>
  );
}
