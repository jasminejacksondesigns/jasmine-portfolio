import Link from "next/link";
import Image from "next/image";

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
  priority,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={95}
      sizes="(max-width: 1024px) 100vw, 1120px"
      className="h-auto w-full"
    />
  );
}

function Clip({
  src,
  caption,
  frame,
}: {
  src: string;
  caption: string;
  frame?: "phone";
}) {
  return (
    <figure className="w-full space-y-3">
      <video
        src={src}
        controls
        playsInline
        muted
        loop
        className={
          frame === "phone"
            ? "mx-auto block max-h-[720px] w-auto max-w-full rounded-[2rem] border border-black/10"
            : "w-full border border-black/10"
        }
      />
      <Caption>{caption}</Caption>
    </figure>
  );
}

export default function InvoiceAutomationEditorial() {
  return (
    <div className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-8 sm:px-10">
        <Link href="/#work" className="text-[13px] text-[#808080] hover:text-black">
          ← Back to work
        </Link>
      </div>

      {/* 01 — Hero */}
      <section className="flex flex-col items-start gap-8 pt-10 pb-0 sm:pt-14">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-10">
          <Eyebrow>CASE STUDY — 01</Eyebrow>
          <h1 className="mt-6 text-[15vw] leading-[0.95] font-extrabold tracking-tight text-black sm:text-[6.5rem] lg:text-[108px]">
            Invoice
            <br />
            Automation
          </h1>
          <p className="mt-6 max-w-[900px] text-xl leading-[1.4] text-[#333] sm:text-2xl">
            Snap and send images using Intuit Intelligence to auto-generate
            invoices and estimates.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex min-w-[200px] flex-col gap-2">
              <p className="text-xs font-bold text-[#8c8c8c]">ROLE</p>
              <p className="text-base text-black">Concept to final design</p>
            </div>
            <div className="flex min-w-[220px] flex-col gap-2">
              <p className="text-xs font-bold text-[#8c8c8c]">TEAM</p>
              <p className="text-base text-black">PM, Design Partner, 3 Engineers</p>
            </div>
            <div className="flex min-w-[260px] flex-col gap-2">
              <p className="text-xs font-bold text-[#8c8c8c]">COMPANY</p>
              <p className="text-base text-black">QuickBooks — AI Acceleration Team</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center bg-[#aed3ab]">
          <video
            src="/invoicing-automation/invoicing-hero-video.mp4"
            width={2880}
            height={2160}
            autoPlay
            muted
            playsInline
            className="block h-auto w-full max-w-[560px] sm:max-w-[640px]"
          />
        </div>
      </section>

      {/* 02 — The Brief */}
      <Section bg="tint">
        <Heading>The Brief</Heading>
        <Body>
          Business owners needed a faster way to turn a photo, a text, or a
          voice memo into a ready-to-send invoice — without the manual,
          field-by-field entry that made mobile invoicing feel like a chore.
        </Body>
        <div className="mx-auto w-full max-w-[380px]">
          <Shot
            src="/invoicing-automation/invoicing-old-flow-1.png"
            width={780}
            height={1581}
            alt="The existing manual invoice list, one field at a time"
          />
        </div>
        <Caption>Today: manual entry, one field at a time</Caption>
      </Section>

      {/* 03 — Week One: The Hackathon */}
      <Section>
        <Heading>Week One — The Hackathon</Heading>
        <Body>
          I partnered with a PM for a one-week hackathon, starting from the
          existing mobile invoicing flow before pushing into a bolder, more
          ambitious direction — capturing photos, screenshots, and text
          threads to auto-generate a full invoice.
        </Body>
        <Shot
          src="/invoicing-automation/invoicing-hackathon-title.png"
          width={2200}
          height={1422}
          alt="Early hackathon concept: draft an invoice from a photo"
        />
        <Caption>Early concept: draft an invoice from a photo</Caption>

        <blockquote className="border-l-[3px] border-black py-1 pl-8">
          <p className="text-2xl text-black italic sm:text-[32px]">
            &ldquo;If it&rsquo;s hidden, it&rsquo;s forgotten.&rdquo;
          </p>
          <p className="mt-2 text-base text-[#808080]">
            Discoverability of the entry point mattered as much as the AI
            itself.
          </p>
        </blockquote>

        <div className="flex flex-col gap-3 text-lg text-black sm:text-xl">
          <p>— Users need to verify AI accuracy before trusting it.</p>
          <p>— First-time trust needs strong, clear education.</p>
          <p>— Show the source photo next to the generated invoice.</p>
          <p>— Don&rsquo;t collect more than what&rsquo;s in the photo.</p>
        </div>

        <div className="w-full">
          <Clip
            src="/invoicing-automation/invoicing-hackathon-demo.mp4"
            caption="Final hackathon design, ready to present"
          />
        </div>
      </Section>

      {/* 04 — From Hackathon to Product */}
      <Section bg="tint">
        <Heading>From Hackathon to Product</Heading>
        <Body>
          Moving into implementation, I explored entry points — a floating
          action button, a button on the invoice itself, or a new flow
          entirely — while planning for partial suggestions and multiple
          images.
        </Body>
        <Shot
          src="/invoicing-automation/invoicing-entry-exploration.png"
          width={2412}
          height={1862}
          alt="Exploring where the entry point should live: image capture and text command"
        />
        <Caption>Considering where this feature should live</Caption>

        <Body>
          I tested with 7 users to see where the flow broke down, then
          refined two directions in crit.
        </Body>
        <Shot
          src="/invoicing-automation/invoicing-research-tasks.png"
          width={1203}
          height={1332}
          alt="Task comparison from the usability study, two directions tested"
        />
        <Caption>Two directions tested in research</Caption>
      </Section>

      {/* 07 — Expanding to Voice & Text */}
      <Section>
        <Heading>Expanding to Voice &amp; Text</Heading>
        <div className="flex flex-col gap-3 text-lg text-black sm:text-xl">
          <p>— Added a mode to edit auto-populated text or add templates.</p>
          <p>— A light green pulse shows the app is listening.</p>
          <p>— Choose image or voice from a bottom sheet.</p>
        </div>
        <Shot
          src="/invoicing-automation/invoicing-autofill-sample.png"
          width={2970}
          height={1918}
          alt="Choosing image or voice, then speaking the invoice details"
        />
        <Caption>Choosing a source, then speaking the details</Caption>
        <div className="w-full">
          <Clip
            src="/invoicing-automation/invoicing-voice-demo.mp4"
            caption="Voice and text capture, live in product"
          />
        </div>
      </Section>

      {/* 05 — The Final Design */}
      <Section bg="tint">
        <Heading>The Final Design</Heading>
        <Body>
          Tap Autofill, choose image or voice, and Intuit Assist drafts the
          invoice — customer, line items, and totals — ready to review before
          sending.
        </Body>
        <div className="w-full">
          <Clip
            src="/invoicing-automation/invoicing-flow-demo-v2.mp4"
            caption="Autofill → choose a source → review the draft"
            frame="phone"
          />
        </div>
      </Section>

      {/* 06 — Results */}
      <Section>
        <Heading>Results</Heading>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="text-6xl font-bold text-black sm:text-7xl">73%</p>
            <p className="text-base text-[#666]">Success rate, start to finish</p>
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="text-6xl font-bold text-black sm:text-7xl">1st</p>
            <p className="text-base text-[#666]">
              AI-native feature in QuickBooks Mobile
            </p>
          </div>
        </div>
      </Section>

      {/* 08 — What I Learned */}
      <Section bg="tint">
        <Heading>What I Learned</Heading>
        <div className="flex max-w-[900px] flex-col gap-4 text-xl text-black sm:text-2xl">
          <p>Simplify what&rsquo;s known so you can focus on what&rsquo;s new.</p>
          <p>
            The best design is the one that&rsquo;s easiest to use — not the
            flashiest.
          </p>
          <p>
            Build for scale — voice, batch upload, and Siri Shortcuts came
            next.
          </p>
        </div>
      </Section>
    </div>
  );
}
