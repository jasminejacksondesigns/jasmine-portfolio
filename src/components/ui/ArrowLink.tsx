import Link from "next/link";

export default function ArrowLink({
  href,
  external = false,
  label,
}: {
  href: string;
  external?: boolean;
  label: string;
}) {
  const content = (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors group-hover:border-accent group-hover:text-accent">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 12L12 4M12 4H5M12 4V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className="group">
      {content}
    </Link>
  );
}
