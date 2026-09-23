import type { ReactNode } from "react";

// Shared browser-window chrome (traffic lights + address bar) for case study
// screenshots and videos.
export default function BrowserChrome({
  url = "",
  className = "",
  children,
}: {
  /** Optional text shown in the address bar. */
  url?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-[0_18px_40px_-20px_rgba(20,25,15,0.25)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border bg-panel px-3 py-2">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div
          aria-hidden
          className="mx-auto h-5 w-full max-w-[60%] truncate rounded-md bg-bg px-2 text-center font-mono text-[10px] leading-5 text-muted"
        >
          {url}
        </div>
        <div aria-hidden className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}
