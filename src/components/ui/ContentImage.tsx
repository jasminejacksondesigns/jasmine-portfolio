import Image from "next/image";

export default function ContentImage({
  src,
  caption,
  width,
  height,
}: {
  src: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card"
      >
        <Image
          src={src}
          alt={caption}
          width={width}
          height={height}
          className="h-auto w-full"
          quality={95}
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </a>
      <figcaption className="mt-2 text-sm text-muted">
        {caption} — click to view full size
      </figcaption>
    </figure>
  );
}
