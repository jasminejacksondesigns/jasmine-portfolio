import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play — Jasmine Jackson",
  description: "A little game to play: Garden Run.",
};

export default function PlayPage() {
  return (
    <main className="flex h-screen flex-col bg-bg text-ink">
      <div className="relative w-full flex-1 pt-24 sm:pt-28">
        <iframe
          src="https://jasmine-garden-run.vercel.app/"
          title="Garden Run"
          className="h-full w-full"
          allow="fullscreen; gamepad; autoplay"
        />
      </div>
    </main>
  );
}
