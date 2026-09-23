/* eslint-disable @next/next/no-img-element */

// Small static copy of one of the hero's sticker flowers. On hover it swells
// and turns a quarter turn with a springy ease, echoing the hero.
export default function FlowerMark({
  flower,
  className = "",
}: {
  flower: "daisy" | "striped";
  className?: string;
}) {
  const src =
    flower === "daisy"
      ? "/hero/sticker/daisy.svg"
      : "/hero/sticker/striped-flower.svg";

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={`transition-transform duration-700 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:rotate-90 motion-reduce:transition-none ${className}`}
    />
  );
}
