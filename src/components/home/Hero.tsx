import StickerHero from "./StickerHero";

export default function Hero() {
  return (
    // Tall so there's room to scroll through the lockup (two screens of
    // scroll), plus a hold on the finished layout; the inner frame sticks
    // to the viewport so the flowers move in place instead of drifting.
    <section className="relative h-[300svh] bg-bg">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-x-clip px-4 py-10 sm:-mt-[var(--nav-h)] sm:h-[calc(100svh+var(--nav-h))] sm:py-0">
        <div className="mx-auto flex w-full max-w-[1680px] justify-center">
          <StickerHero />
        </div>
      </div>
    </section>
  );
}
