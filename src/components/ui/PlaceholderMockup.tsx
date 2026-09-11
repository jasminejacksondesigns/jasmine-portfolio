import Image from "next/image";

export default function PlaceholderMockup({
  caption,
  aspect = "aspect-[16/10]",
  className = "",
  videoSrc,
  imageSrc,
}: {
  caption: string;
  aspect?: string;
  className?: string;
  videoSrc?: string;
  imageSrc?: string;
}) {
  const hasMedia = Boolean(videoSrc || imageSrc);

  return (
    <div
      className={`${aspect} ${className} flex flex-col overflow-hidden rounded-2xl border border-border bg-card`}
      role={hasMedia ? undefined : "img"}
      aria-label={hasMedia ? undefined : caption}
    >
      {videoSrc ? (
        <video
          className="min-h-0 flex-1 w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-label={caption}
        />
      ) : imageSrc ? (
        <div className="relative min-h-0 flex-1">
          <Image
            src={imageSrc}
            alt={caption}
            fill
            quality={90}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center bg-panel/60 px-6 text-center">
          <span className="text-sm text-muted">{caption}</span>
        </div>
      )}
    </div>
  );
}
