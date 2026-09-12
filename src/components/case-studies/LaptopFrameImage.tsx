const FRAME_W = 1200;
const FRAME_H = 665;

// Pixel box of the flat screen area inside the MacBook frame image,
// measured directly from the source PNG (267,110)-(958,540).
const SCREEN = { left: 267, top: 110, width: 691, height: 430 };

export default function LaptopFrameImage({
  frameSrc,
  imageSrc,
  alt,
  className = "",
}: {
  frameSrc: string;
  imageSrc: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt=""
        width={FRAME_W}
        height={FRAME_H}
        className="absolute inset-0 h-full w-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className="absolute object-cover"
        style={{
          left: `${(SCREEN.left / FRAME_W) * 100}%`,
          top: `${(SCREEN.top / FRAME_H) * 100}%`,
          width: `${(SCREEN.width / FRAME_W) * 100}%`,
          height: `${(SCREEN.height / FRAME_H) * 100}%`,
        }}
      />
    </div>
  );
}
