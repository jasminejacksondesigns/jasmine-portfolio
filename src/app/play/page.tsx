import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play, Jasmine Jackson",
  description: "A little game to play: Garden Run.",
};

export default function PlayPage() {
  return (
    <div className="flex h-[100dvh] flex-col bg-bg text-ink">
      <div className="relative min-h-0 w-full flex-1 px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8">
        <div className="h-full w-full overflow-hidden rounded-[24px] bg-panel">
          <iframe
            src="https://jasmine-garden-run.vercel.app/"
            title="Garden Run"
            className="h-full w-full border-0"
            allow="fullscreen; gamepad; autoplay"
          />
        </div>
      </div>
    </div>
  );
}
