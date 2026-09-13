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

function Quote({ text, author }: { text: string; author?: string }) {
  return (
    <blockquote className="border-l-[3px] border-black py-1 pl-8">
      <p className="text-2xl text-black italic sm:text-[32px]">
        &ldquo;{text}&rdquo;
      </p>
      {author && <p className="mt-2 text-base text-[#808080]">{author}</p>}
    </blockquote>
  );
}

export default function MobileSalesModernizationEditorial() {
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
          <Eyebrow>CASE STUDY 02</Eyebrow>
          <h1 className="font-display mt-6 text-[13vw] leading-[0.95] font-light tracking-tight text-black sm:text-[5.2rem] lg:text-[88px]">
            Mobile Sales
            <br />
            Modernization
          </h1>
          <p className="mt-6 max-w-[900px] text-xl leading-[1.4] text-[#333] sm:text-2xl">
            Redesigning QuickBooks Mobile&rsquo;s Sales Receipt and Receive
            Payment so they feel like one consistent product, built on a new
            shared component library.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex min-w-[200px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">ROLE</p>
              <p className="text-base text-black">Product Designer</p>
            </div>
            <div className="flex min-w-[220px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">TOOLS</p>
              <p className="text-base text-black">Figma, Usertesting</p>
            </div>
            <div className="flex min-w-[260px] flex-col gap-2">
              <p className="font-subheading text-xs font-normal text-[#8c8c8c]">COMPANY</p>
              <p className="text-base text-black">QuickBooks Mobile</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center bg-[#aed3ab]">
          <video
            src="/mobile-sales-modernization/msm-hero-video.mp4"
            width={2880}
            height={2160}
            autoPlay
            muted
            playsInline
            className="block h-auto w-full max-w-[560px] sm:max-w-[640px]"
          />
        </div>
      </section>

      {/* The Problem */}
      <Section bg="tint">
        <Heading>The Problem</Heading>
        <Body>
          QuickBooks mobile sales forms were vastly different from one
          another in their current state. Consistency between each form
          would make the overall experience less confusing to adopt,
          potentially driving higher use of all of them.
        </Body>
        <div className="mt-2 flex max-w-[900px] flex-col gap-3 text-lg text-black sm:text-xl">
          <p>
            I am a small business using my mobile device to manage my
            accounts receivable.
          </p>
          <p>I&rsquo;m trying to create and edit my forms while on the go.</p>
          <p>But the mobile app is not easy to use.</p>
          <p>
            Because the design is not intuitive, every form looks different,
            and not all web features are available on mobile.
          </p>
          <p>
            Which makes me feel unconfident in the app, inclined to just use
            the QuickBooks website instead.
          </p>
        </div>
      </Section>

      {/* Sales Receipt: current state */}
      <Section>
        <Heading>Sales Receipt: Current State</Heading>
        <Body>
          To start, I audited the entire current landscape: what existed for
          other forms on mobile, what existed on web, and what the current
          Sales Receipt design looked like. The goal was feature parity with
          web and design alignment across the mobile sales forms.
        </Body>
        <Shot
          src="/mobile-sales-modernization/old-sales-receipt-design.png"
          width={1490}
          height={931}
          alt="The existing Sales Receipt design on mobile"
        />
        <Caption>Auditing the existing Sales Receipt flow on mobile</Caption>
      </Section>

      {/* Sales Receipt: flow to final */}
      <Section bg="tint">
        <Heading>Sales Receipt: Flow to Final</Heading>
        <Body>
          This is the typical path a user takes when creating a Sales
          Receipt. The existing framework, a main edit page that opens into
          a specific workflow per section, was already there, but I needed
          to determine exactly what went into each workflow, how much detail
          to show, and the hierarchy of every section.
        </Body>
        <Shot
          src="/mobile-sales-modernization/sales-receipt-flow-diagram.png"
          width={3983}
          height={868}
          alt="Sales Receipt flow diagram"
        />
        <Caption>Sales Receipt flow diagram</Caption>

        <Shot
          src="/mobile-sales-modernization/lowfi.png"
          width={2098}
          height={1319}
          alt="Early low-fidelity Sales Receipt wireframes"
        />
        <Caption>Early low-fidelity concepts</Caption>

        <Body>
          At mid-fidelity I started experimenting with components from our
          QBDS library, for example, moving payment-method selection from an
          open input field to a selectable list, cutting clicks and friction.
        </Body>
        <Shot
          src="/mobile-sales-modernization/msm-midfi-progression.png"
          width={4060}
          height={4564}
          alt="Mid-fidelity Sales Receipt progression"
        />
        <Caption>Mid-fidelity iterations on the payment method workflow</Caption>

        <Body>
          Because this was the first real use case for the new QBDS iOS
          mobile component library, I worked closely with the QBDS team to
          define components that didn&rsquo;t exist yet, which slowed the
          mid-fidelity stage, but shaped the library for features built after
          mine.
        </Body>
        <Shot
          src="/mobile-sales-modernization/msm-sales-receipt-final.png"
          width={5144}
          height={3356}
          alt="Final Sales Receipt design"
        />
        <Caption>Final Sales Receipt design</Caption>
      </Section>

      {/* Receive Payment: Hero Amount */}
      <Section>
        <Heading>Receive Payment: the &ldquo;Hero Amount&rdquo;</Heading>
        <Body>
          In the old form, users could create, edit, and save everything on
          one page. Moving to the new component system made the pattern more
          scalable, but added steps. &ldquo;Hero Amount&rdquo; was created to
          solve calculating a customer&rsquo;s total payment while still
          letting them select and edit invoices on the same page.
        </Body>
        <Shot
          src="/mobile-sales-modernization/msm-hero-amount-states-full.png"
          width={4728}
          height={3440}
          alt="Hero Amount component states across many variations"
        />
        <Caption>
          &ldquo;Hero Amount&rdquo; states, built through a working session
          with visual designers and engineers
        </Caption>
        <Shot
          src="/mobile-sales-modernization/hero-final.png"
          width={3360}
          height={2000}
          alt="Hero Amount, final design"
        />
        <Caption>&ldquo;Hero Amount,&rdquo; final design</Caption>
      </Section>

      {/* Receive Payment: edge cases */}
      <Section bg="tint">
        <Heading>Receive Payment: Edge Cases</Heading>
        <Body>
          The current state of the design surfaced a long tail of edge cases
          for Receive Payment, a $0 balance, a payment with no outstanding
          invoice, adding a credit instead. I worked with my partners to log
          each case and mock up a resolution for it.
        </Body>
        <Shot
          src="/mobile-sales-modernization/msm-receive-payment-edge-cases.png"
          width={1801}
          height={700}
          alt="Receive Payment edge case designs"
        />
        <Caption>Working through Receive Payment&rsquo;s edge cases</Caption>
        <Body>
          One thing I learned from this project is that cross-functional
          accountability and collaboration matter, spending time up front on
          requirements and the current experience is crucial to success down
          the road.
        </Body>
      </Section>

      {/* Validating with research */}
      <Section>
        <Heading>Validating with Research</Heading>
        <Body>
          I ran 10-12 interviews across iOS and Android, at least six
          participants using QuickBooks Mobile sales forms, and two using web
          sales forms but not mobile, to see whether the new forms felt
          consistent and easy to use, and where the flow broke down.
        </Body>
        <div className="w-full">
          <Clip
            src="/mobile-sales-modernization/msm-user-testing.mp4"
            caption="Watching a participant work through the study&rsquo;s tasks"
            frame="phone"
          />
        </div>
        <Shot
          src="/mobile-sales-modernization/research-synthesis.png"
          width={2468}
          height={2124}
          alt="Research synthesis from customer interviews"
        />
        <Caption>Grouping similar quotes into themes and learnings</Caption>
        <Quote
          text="What we have on the screen seems easier, I like that in the new version the fields are set apart in a bubble."
          author="Daniel"
        />
        <Quote
          text="It feels like they’re from the same product and I appreciate that. I know different teams work on different screens but I appreciate the consistency."
          author="Sandra"
        />
        <Body>
          Customers spontaneously identified the redesigned forms as part of
          the same product, and found the new invoice simple, clean, and
          organized. They also cared about unpaid and overdue invoices,
          directly shaping the roadmap: I added status filters and resurfaced
          overdue invoices at the top of the list.
        </Body>
      </Section>

      {/* Results */}
      <Section bg="tint">
        <Heading>Results</Heading>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="font-display text-5xl font-light text-black sm:text-6xl">
              6 wks → 2 days
            </p>
            <p className="text-base text-[#666]">
              Design-to-dev handoff timeline, down from the shared component
              library
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[#f2f2f2] p-10">
            <p className="font-display text-6xl font-light text-black sm:text-7xl">80%</p>
            <p className="text-base text-[#666]">
              Fewer regressions on high-traffic pages
            </p>
          </div>
        </div>
      </Section>

      {/* What I Learned */}
      <Section>
        <Heading>What I Learned</Heading>
        <div className="flex max-w-[900px] flex-col gap-4 text-xl text-black sm:text-2xl">
          <p>
            Scaling a design system takes a real understanding of each use
            case&rsquo;s complexity, not just applying one pattern everywhere.
          </p>
          <p>
            When a component didn&rsquo;t exist yet, I could build it with
            QBDS rather than wait for it, that unblocked the project and
            shaped the library for what came next.
          </p>
          <p>
            The work didn&rsquo;t stop at launch: I kept adding provocations
            from research, and later expanded the pattern to multi-currency
            to test how well it scaled.
          </p>
        </div>
      </Section>
    </div>
  );
}
