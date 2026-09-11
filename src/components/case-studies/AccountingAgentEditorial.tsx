import Link from "next/link";
import Image from "next/image";
import LaptopScreenAnimation from "@/components/home/LaptopScreenAnimation";

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
    <p className="text-[13px] font-bold text-[#808080] sm:text-[15px]">
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[32px] font-bold leading-[1.15] text-black sm:text-[38px] lg:text-[44px]">
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

function Clip({
  src,
  caption,
  autoPlay,
}: {
  src: string;
  caption: string;
  autoPlay?: boolean;
}) {
  return (
    <figure className="w-full space-y-3">
      <video
        src={src}
        controls={!autoPlay}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        playsInline
        className="w-full rounded-2xl border border-black/10"
      />
      <Caption>{caption}</Caption>
    </figure>
  );
}

export default function AccountingAgentEditorial() {
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
          <Eyebrow>CASE STUDY — 04</Eyebrow>
          <h1 className="mt-6 text-[15vw] leading-[0.95] font-extrabold tracking-tight text-black sm:text-[6.5rem] lg:text-[108px]">
            Accounting
            <br />
            Agent
          </h1>
          <p className="mt-6 max-w-[900px] text-xl leading-[1.4] text-[#333] sm:text-2xl">
            Accountants and small business owners spend hours on back and
            forth transaction questions. I designed a unified AI-powered
            communication portal to eliminate that friction, from split-view
            grid to Magic Link email workflow.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex min-w-[200px] flex-col gap-2">
              <p className="text-xs font-bold text-[#8c8c8c]">ROLE</p>
              <p className="text-base text-black">Product Designer</p>
            </div>
            <div className="flex min-w-[220px] flex-col gap-2">
              <p className="text-xs font-bold text-[#8c8c8c]">TIMELINE</p>
              <p className="text-base text-black">6 months, 0→1</p>
            </div>
            <div className="flex min-w-[260px] flex-col gap-2">
              <p className="text-xs font-bold text-[#8c8c8c]">COMPANY</p>
              <p className="text-base text-black">Intuit</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center bg-[#c0e2df]">
          <div
            className="relative w-full max-w-[1100px]"
            style={{ aspectRatio: 1800 / 1073 }}
          >
            <LaptopScreenAnimation
              src="/work/mockups/cartoon-laptop.png"
              alt="Collab Agent running inside QuickBooks"
            />
          </div>
        </div>
      </section>

      {/* The Problem */}
      <Section bg="tint">
        <Heading>Helping Accountants Track Down Transaction Info</Heading>
        <Body>
          Accountants and small business owners (SMBs) spend significant time
          on &ldquo;context gathering,&rdquo; the back-and-forth required to
          categorize transactions that lack sufficient data. 55% of
          transactions fell into this gap, creating a cycle of emails,
          follow-ups, and manual lookups.
        </Body>
      </Section>

      {/* The Solution */}
      <Section>
        <Heading>The Solution</Heading>
        <Body>
          We launched a unified Collab Agent portal that bridges accountants
          and SMBs in a single, coherent experience for the first time.
        </Body>
        <Clip
          src="/accounting-agent/collab-solution-demo.mp4"
          caption="The Collab Agent chat experience"
          autoPlay
        />
      </Section>

      {/* Unifying two views */}
      <Section bg="tint">
        <Heading>Unifying Two Different Views</Heading>
        <Body>
          Initial designs created entirely different views for accountants
          and small business owners. The accountants could see both sides,
          and they wanted some of what the small business owners had — both
          a grid view and a chat view.
        </Body>
        <Body>
          I designed a split-view grid where accountants see all transactions
          with status indicators, while SMBs see only those requiring their
          input. Both had the ability to see in both a grid and a chat.
        </Body>
        <Shot
          src="/accounting-agent/collab-accountant-early.png"
          width={1575}
          height={1128}
          alt="Early accountant-side iteration of the request review grid"
        />
        <Caption>Early accountant-side iteration of the request review grid</Caption>
      </Section>

      {/* Email workflow */}
      <Section>
        <Heading>Developing an Email Workflow</Heading>
        <Body>
          The portal eliminated the place to find all transactions, but
          accountants still needed a way to send the portal to clients and
          also nudge them to check their portal.
        </Body>
        <Body>
          I designed a Magic Link system where SMBs receive an email with a
          contextual link that drops them directly into the relevant
          transaction thread.
        </Body>
        <Clip
          src="/accounting-agent/collab-email-workflow.mp4"
          caption="Magic Link email → transaction thread"
        />
      </Section>

      {/* Roles and permissions */}
      <Section bg="tint">
        <Heading>Creating Roles and Permissions Through UI</Heading>
        <Body>
          The portal would be accessed by multiple people in a firm, both on
          the accountant side and the small business side. They may all want
          to be notified when a change has been made in the portal. Due to
          technical constraint, the person could not develop their own
          profile, and we could not detect who was accessing the portal at a
          given time.
        </Body>
        <Body>
          I created a settings panel that required users to add an email so
          that they could get notified when new activity occurred in the
          portal.
        </Body>
        <Clip
          src="/accounting-agent/collab-settings.mp4"
          caption="Notification settings panel"
        />
      </Section>

      {/* Results */}
      <Section>
        <Heading>Results</Heading>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="text-6xl font-bold text-black sm:text-7xl">91%</p>
            <p className="text-base text-[#666]">Positive voice of customer</p>
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="text-6xl font-bold text-black sm:text-7xl">0→1</p>
            <p className="text-base text-[#666]">New product in 12 weeks</p>
          </div>
        </div>
      </Section>

      {/* Learnings */}
      <Section bg="tint">
        <Heading>Learnings</Heading>
        <Body>
          Leading a 0-to-1 initiative in a compressed timeframe required
          constant balance between the ideal design and technical
          feasibility. By maintaining a tight feedback loop with engineering
          and PMs, I learned to identify which ideal-state features were
          critical for the MVP and which could be phased, ensuring we shipped
          high quality without compromising long-term architecture.
        </Body>
      </Section>
    </div>
  );
}
