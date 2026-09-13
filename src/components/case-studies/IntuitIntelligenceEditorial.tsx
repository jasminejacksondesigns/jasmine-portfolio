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
      className="h-auto w-full rounded-2xl"
    />
  );
}

function Clip({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="w-full space-y-3">
      <video
        src={src}
        controls
        playsInline
        className="w-full rounded-2xl border border-black/10"
      />
      <Caption>{caption}</Caption>
    </figure>
  );
}

export default function IntuitIntelligenceEditorial() {
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
          <Eyebrow>CASE STUDY 05</Eyebrow>
          <h1 className="font-display mt-6 text-[12vw] leading-[0.95] font-light tracking-tight text-black sm:text-[4.6rem] lg:text-[78px]">
            Intuit Intelligence
            <br />
            Homepage
          </h1>
          <p className="mt-6 max-w-[900px] text-xl leading-[1.4] text-[#333] sm:text-2xl">
            Improving Intuit Intelligence&rsquo;s entry point to help
            customers understand the breadth and depth of what the tool can
            do, and designing insight prompts to include real data from the
            customer.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex min-w-[200px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">ROLE</p>
              <p className="text-base text-black">Lead Product Designer</p>
            </div>
            <div className="flex min-w-[220px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">TOOLS</p>
              <p className="text-base text-black">Figma, Cursor, Claude</p>
            </div>
            <div className="flex min-w-[260px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">COMPANY</p>
              <p className="text-base text-black">Intuit</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center bg-[#fafafa] py-16 sm:py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/intuit-intelligence-homepage/hero-media.svg"
            alt="Intuit Intelligence assisting a small business owner on the go"
            width={1280}
            height={760}
            className="h-auto w-full max-w-[720px] sm:max-w-[820px]"
          />
        </div>
      </section>

      {/* Problem */}
      <Section bg="tint">
        <Heading>Changing the Perception from Help Bot to Agent</Heading>
        <Body>
          Users frequently approached the Omni AI panel with &ldquo;tool
          blindness,&rdquo; treating it as a static, generic FAQ help bot
          rather than a proactive financial agent. This mindset, paired with
          a low confidence in natural language querying, resulted in a severe
          cold-start problem and &ldquo;one-and-done&rdquo; sessions where
          users struggled to differentiate Omni from standard chatbots.
        </Body>
      </Section>

      {/* Solution */}
      <Section>
        <Heading>The Solution</Heading>
        <Body>
          Highlight and emphasize a framework of insight prompts that tapped
          into real data from the users, showing ways that people can use
          Intuit Intelligence as a personal agent and not a help bot.
        </Body>
        <Shot
          src="/intuit-intelligence-homepage/ii-product-context.jpg"
          width={896}
          height={1299}
          alt="Intuit Intelligence in the real QuickBooks Online product"
        />
        <Caption>Intuit Intelligence in the real QuickBooks Online product</Caption>
      </Section>

      {/* Typeahead */}
      <Section bg="tint">
        <Heading>Trying Typeahead Animations</Heading>
        <Body>
          Initial designs focused on a &ldquo;zero state&rdquo; with typing
          animations, showing many options for things to ask Intuit
          Intelligence and a separate section highlighting insights that the
          agent had collected from customer data.
        </Body>
        <Clip
          src="/intuit-intelligence-homepage/ii-zerostate-exploration.mp4"
          caption="Full-screen zero-state exploration"
        />
        <Body>
          The type-ahead animation disappeared, so users felt like they could
          not actually use them or needed to re-watch the animation to find
          the prompt that interested them. They were also conflicted by
          insights that did not provide actionable prompts or answers
          connected to them.
        </Body>
        <Body>
          I also explored a dropdown-style zero state through a quick,
          AI-assisted &ldquo;vibe-coded&rdquo; prototype, a faster way to
          test an alternate interaction before committing design time to it.
        </Body>
        <Clip
          src="/intuit-intelligence-homepage/ii-vibecoded-exploration.mp4"
          caption="A vibe-coded exploration of a dropdown-style zero state"
        />
      </Section>

      {/* Latency */}
      <Section>
        <Heading>Animating to Cloak Latency Constraints</Heading>
        <Body>
          While building the designs, my engineering team ran into issues
          having the initial batch of insight prompts load, potentially
          leading to drop-off in customer engagement.
        </Body>
        <Body>
          I created a quick animation that cloaked the latency issues until
          we were able to adjust the technical solution. This included
          loading in a few other elements in the panel in an elegant way.
        </Body>
        <Clip
          src="/intuit-intelligence-homepage/ii-latency-animation.mp4"
          caption="Latency-cloaking loading animation"
        />
      </Section>

      {/* Breadth */}
      <Section bg="tint">
        <Heading>Improving the Design to Show Breadth</Heading>
        <Body>
          After our initial launch, I got feedback from customers that they
          still weren&rsquo;t fully confident in understanding the breadth of
          what Intuit Intelligence could do. So, we did an A/B test comparing
          the current design with a potential new design to see how customers
          felt.
        </Body>
        <Shot
          src="/intuit-intelligence-homepage/ii-breadth-exploration-grid.png"
          width={4748}
          height={4220}
          alt="Exploring the breadth of possible zero-state layouts"
        />
        <Caption>Exploring the breadth of possible zero-state layouts</Caption>
        <Body>
          In the end, customers loved having more options, and they wanted a
          combination of both designs. The result: clickable chips that
          showed the breadth of areas of prompts with different insight
          prompts under each area.
        </Body>
        <Shot
          src="/intuit-intelligence-homepage/ii-ab-test.png"
          width={1078}
          height={763}
          alt="A/B test: chips showing the breadth of prompt areas"
        />
        <Caption>A/B test: chips showing the breadth of prompt areas</Caption>
      </Section>

      {/* Final Design */}
      <Section>
        <Heading>The Final Design</Heading>
        <Body>
          The shipped experience pairs a clean, description-led zero state
          with quick-start prompts and file analysis, alongside a full
          split-screen view for deeper sessions inside QuickBooks Online.
        </Body>
        <Shot
          src="/intuit-intelligence-homepage/ii-final-zerostate.png"
          width={3792}
          height={2504}
          alt="The final zero-state: clear framing, quick-start prompts, and file analysis"
        />
        <Caption>
          The final zero-state: clear framing, quick-start prompts, and file
          analysis
        </Caption>
        <Clip
          src="/intuit-intelligence-homepage/ii-ga-final-design.mp4"
          caption="The final Intuit Intelligence panel, live in QuickBooks Online"
        />
      </Section>

      {/* Results */}
      <Section>
        <Heading>Results</Heading>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="font-display text-6xl font-light text-black sm:text-7xl">13%</p>
            <p className="text-base text-[#666]">Gain in adoption</p>
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="font-display text-6xl font-light text-black sm:text-7xl">5</p>
            <p className="text-base text-[#666]">Partner teams created prompts</p>
          </div>
        </div>
      </Section>

      {/* Learnings */}
      <Section bg="tint">
        <Heading>Learnings</Heading>
        <Body>
          The biggest unlock wasn&rsquo;t a visual change, it was tying
          prompts to real user data. &ldquo;You have 3 unpaid
          invoices&rdquo; is more compelling than any animation. When the
          interface demonstrates knowledge of your actual situation, trust
          follows.
        </Body>
      </Section>
    </div>
  );
}
