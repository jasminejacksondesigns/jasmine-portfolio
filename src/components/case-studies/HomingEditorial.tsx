import Link from "next/link";
import Image from "next/image";
import PhoneScreenVideo from "@/components/home/PhoneScreenVideo";

const homingScreenVideo = {
  src: "/homing/homing.mp4",
  maskSrc: "/work/mockups/iphone-12-pro-screen-mask.png",
  frameSrc: "/work/mockups/iphone-12-pro-frame.png",
  quad: [
    [22.577 / 2548, 94.093 / 1552],
    [1990.054 / 2548, 440.778 / 1552],
    [1974.892 / 2548, 1476.22 / 1552],
    [46.701 / 2548, 1067.963 / 1552],
  ] as [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ],
};

function Section({
  bg,
  children,
}: {
  bg?: "white" | "tint";
  children: React.ReactNode;
}) {
  return (
    <section className={bg === "tint" ? "bg-[#fafafa]" : "bg-white"}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-start gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-subheading text-[13px] font-normal text-[#808080] sm:text-[15px]">
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[32px] font-light leading-[1.15] text-black sm:text-[38px] lg:text-[44px]">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[900px] text-lg leading-[1.5] text-black sm:text-xl lg:text-2xl">
      {children}
    </p>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] text-[#808080] sm:text-[15px]">{children}</p>;
}

function Shot({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={95}
      sizes="(max-width: 1024px) 100vw, 1120px"
      className="h-auto w-full rounded-2xl"
    />
  );
}

export default function HomingEditorial() {
  return (
    <div className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-8 sm:px-10">
        <Link href="/#work" className="text-[13px] text-[#808080] hover:text-black">
          ← Back to work
        </Link>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-start gap-8 pt-10 pb-0 sm:pt-14">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-10">
          <Eyebrow>CASE STUDY 03</Eyebrow>
          <h1 className="font-display mt-6 text-[15vw] leading-[0.95] font-light tracking-tight text-black sm:text-[6.5rem] lg:text-[108px]">
            Homing
          </h1>
          <p className="mt-6 max-w-[900px] text-xl leading-[1.4] text-[#333] sm:text-2xl">
            A make-a-thon project that turns travel moments into shareable
            magnets.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex min-w-[200px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">ROLE</p>
              <p className="text-base text-black">Co-design lead</p>
            </div>
            <div className="flex min-w-[220px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">TEAM</p>
              <p className="text-base text-black">1 design partner, agents only</p>
            </div>
            <div className="flex min-w-[260px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">COMPANY</p>
              <p className="text-base text-black">SF Make-a-thon</p>
            </div>
          </div>
          <a
            href="https://homing-phi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm text-black underline decoration-1 underline-offset-2 hover:text-[#555]"
          >
            Visit live site ↗
          </a>
        </div>

        <div className="mt-6 flex w-full justify-center bg-[#7fc7df] py-16 sm:py-20">
          <div
            className="relative w-full max-w-[300px]"
            style={{ aspectRatio: 2548 / 1552 }}
          >
            <PhoneScreenVideo {...homingScreenVideo} alt="Homing app screen" />
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <Section bg="tint">
        <Heading>The Challenge</Heading>
        <Body>
          Travel memories usually live as camera-roll photos, easy to take,
          hard to share in a way that feels physical and personal. At SF
          Make-a-thon, we wanted a tiny product that could turn a moment into
          something you could actually send home.
        </Body>
      </Section>

      {/* The Solution */}
      <Section>
        <Heading>The Solution</Heading>
        <Body>
          Homing lets you drop a photo, a view, a snack, a little treasure,
          and turns it into a fridge magnet you can send. Built as a partner
          project in a single make-a-thon sprint.
        </Body>
      </Section>

      {/* 01. Designing with agents only */}
      <Section bg="tint">
        <Heading>01. Designing with Agents Only</Heading>
        <Body>
          As co-design lead on a partner team, I pushed an AI-native
          workflow: every design move went through agents, no traditional
          Figma craft pass. The constraint forced sharper product decisions
          and a faster loop from idea to shippable UI.
        </Body>
        <Shot
          src="/homing/partnerpicturehackathon.jpg"
          width={3130}
          height={2075}
          alt="With my co-design partner at SF Make-a-thon"
        />
        <Caption>With my co-design partner at SF Make-a-thon</Caption>
      </Section>

      {/* 02. Shipping the slice */}
      <Section>
        <Heading>02. Shipping the Slice</Heading>
        <Body>
          We scoped to one clear job: upload or capture a photo, and get a
          magnet-ready keepsake flow. That focus kept the build tight enough
          to finish and demo the same day.
        </Body>
        <Shot
          src="/homing/hominghackathon.jpg"
          width={3600}
          height={2400}
          alt="The SF Make-a-thon cohort on demo night"
        />
        <Caption>The SF Make-a-thon cohort on demo night</Caption>
      </Section>

      {/* Impact */}
      <Section bg="tint">
        <Heading>Impact</Heading>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="font-display text-6xl font-light text-black sm:text-7xl">2.5 hrs</p>
            <p className="text-base text-[#666]">Idea to working product</p>
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="font-display text-6xl font-light text-black sm:text-7xl">100%</p>
            <p className="text-base text-[#666]">AI-native design, agents only</p>
          </div>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <Heading>Reflection</Heading>
        <Body>
          A short make-a-thon showcase, not a primary case, but a useful
          proof that agent-only design can still yield a clear product story
          when the job to be done stays tiny.
        </Body>
      </Section>
    </div>
  );
}
