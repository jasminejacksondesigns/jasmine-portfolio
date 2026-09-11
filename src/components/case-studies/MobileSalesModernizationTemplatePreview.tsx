import React from "react";
import Image from "next/image";
import CaseStudySideNav, { type CaseStudySection } from "./CaseStudySideNav";
import ScrollPlayVideo from "./ScrollPlayVideo";

const SECTIONS: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "design-process", label: "Design Process" },
  { id: "current-state", label: "Current State" },
  { id: "comparing-flows", label: "Comparing Flows" },
  { id: "iterations", label: "Iterations" },
  { id: "research", label: "Research" },
  { id: "design-system-contributions", label: "Design System Contributions" },
  { id: "final-design", label: "Final Design" },
  { id: "takeaways", label: "Takeaways" },
];

export default function MobileSalesModernizationTemplatePreview() {
  return (
    <main className="min-h-screen bg-bg text-ink font-sans selection:bg-panel selection:text-ink">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <CaseStudySideNav sections={SECTIONS} />
        <div className="space-y-20">

        {/* HEADER & HERO */}
        <header id="overview" className="space-y-8 scroll-mt-28">
          {/* Title & One-Liner */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-ink leading-[1.1]">
              Mobile Sales Modernization
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl font-normal leading-relaxed">
              Redesigning QuickBooks Mobile&rsquo;s Sales Receipt and Receive Payment so they feel like one consistent product, built on a new shared component library.
            </p>
          </div>

          {/* Monospace Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border text-xs">
            <div>
              <span className="text-muted block mb-1">ROLE</span>
              <span className="text-ink">Lead Product Designer</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TIMELINE</span>
              <span className="text-ink">4 months</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TOOLS / STACK</span>
              <span className="text-ink">Figma, Usertesting</span>
            </div>
            <div>
              <span className="text-muted block mb-1">CORE OUTCOME</span>
              <span className="text-ink">80% Fewer Regressions</span>
            </div>
          </div>
        </header>

        {/* FLAGSHIP HERO MEDIA FRAME */}
        <section className="space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg">
              <video
                src="/mobile-sales-modernization/msm-hero-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
          </div>
          <p className="text-xs text-muted text-center">
            Fig 1.0 — Sales Receipt and Receive Payment, redesigned on QuickBooks Mobile&rsquo;s new shared component library.
          </p>
        </section>

        {/* OVERVIEW & PROBLEM / SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
          <div id="problem" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-muted">01 / The Problem</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              QuickBooks mobile sales forms were vastly different from one another. A small business owner managing accounts receivable on the go found the app unintuitive, missing features available on web, and inconsistent form to form — leaving them unconfident in mobile and inclined to fall back to the website.
            </p>
            <ul className="text-[11px] text-muted space-y-1 pt-2 border-l-2 border-border pl-3">
              <li>I am.. a small business using my mobile device to manage accounts receivable.</li>
              <li>I&rsquo;m trying to.. create and edit forms while on the go.</li>
              <li>But.. the mobile app is not easy to use.</li>
              <li>Because.. every form looks different and not all web features exist on mobile.</li>
              <li>Which makes me feel.. unconfident, and inclined to just use the website.</li>
            </ul>
          </div>
          <div id="solution" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-ink">02 / The Solution</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Create consistency across the sales forms and bring mobile to parity with web, using a new shared component library — starting with Sales Receipt and Receive Payment as the first real use case.
            </p>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">6 wks → 2 days</div>
            <div className="text-xs text-muted">Design-to-Dev Handoff</div>
            <p className="text-xs text-muted pt-1">Handoff timeline collapsed once the shared component library was in place.</p>
          </div>
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">80%</div>
            <div className="text-xs text-muted">Fewer Regressions</div>
            <p className="text-xs text-muted pt-1">Fewer regressions on high-traffic pages after the shared library rollout.</p>
          </div>
        </section>

        {/* NATIVE TAILWIND FLOW DIAGRAM */}
        <section id="design-process" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-ink uppercase tracking-wider">Design Process</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">From Audit to Hero Amount</h2>
          </div>

          <div className="p-6 rounded-xl border border-border bg-panel/40 space-y-6">
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">

              {/* Step 1 */}
              <div className="flex-1 p-4 rounded-lg bg-bg border border-border space-y-2">
                <span className="text-[10px] text-muted">AUDIT</span>
                <h3 className="font-medium text-sm text-ink">Current-State Audit</h3>
                <p className="text-xs text-muted">Mapped every mobile form, the web equivalent, and where Sales Receipt fell short of parity.</p>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center text-muted md:rotate-0 rotate-90">
                →
              </div>

              {/* Step 2 */}
              <div className="flex-1 p-4 rounded-lg bg-bg border border-border space-y-2">
                <span className="text-[10px] text-muted">LOW-FI</span>
                <h3 className="font-medium text-sm text-ink">Wireframes & Flow</h3>
                <p className="text-xs text-muted">Defined what belonged in each workflow, how much detail to show, and section hierarchy.</p>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center text-muted md:rotate-0 rotate-90">
                →
              </div>

              {/* Step 3 (Highlighted) */}
              <div className="flex-1 p-4 rounded-lg bg-panel border border-border space-y-2 relative">
                <span className="text-[10px] text-ink">BUILD</span>
                <h3 className="font-medium text-sm text-ink">Building on QBDS, Live</h3>
                <p className="text-xs text-ink/75">First real use case for the new QBDS iOS library — defined missing components alongside the QBDS team as we went.</p>
              </div>

              {/* Arrow 3 */}
              <div className="flex items-center justify-center text-muted md:rotate-0 rotate-90">
                →
              </div>

              {/* Step 4 */}
              <div className="flex-1 p-4 rounded-lg bg-bg border border-border space-y-2">
                <span className="text-[10px] text-muted">SHIP</span>
                <h3 className="font-medium text-sm text-ink">Hero Amount & Final Forms</h3>
                <p className="text-xs text-muted">A new component solved Receive Payment&rsquo;s balance-and-invoice tension; both forms shipped on the shared library.</p>
              </div>

            </div>
          </div>
          <p className="text-xs text-muted text-center">
            Fig 2.0 — From auditing the current state, through low-fi flows and building live on the new QBDS library, to the Hero Amount component and final shipped forms.
          </p>
        </section>

        {/* KEY FLOWS: CURRENT STATE */}
        <section id="current-state" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Key Flows</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Current State</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              My scope of the sales modernization work included using the new components to redesign Sales Receipts and Receive Payment Forms. Both of these forms were in the &ldquo;classic&rdquo; experience, and required additional features in order to bring them to parity with what was in the web version.
            </p>
          </div>

          <div className="relative aspect-[4480/2690] rounded-lg overflow-hidden">
            <Image
              src="/mobile-sales-modernization/msm-classic-current-state.png"
              alt="Classic QuickBooks Mobile dashboard, paid Sales Receipt, and new Sales Receipt form"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-contain"
            />
          </div>
          <p className="text-xs text-muted">Here&rsquo;s an example of the current state of the Sales Receipt.</p>
        </section>

        {/* KEY FLOWS: COMPARING RECEIVE PAYMENT AND SALES RECEIPT */}
        <section id="comparing-flows" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Key Flows</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Comparing Receive Payment and Sales Receipt</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              My first step to the process was looking at the current sales receipt and receive payment flows to see where there are consistencies and where each may need their own individual sections and components.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[5120/1116] rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-flow-sales-receipt-diagram.png"
                alt="Current workflow for Sales Receipt"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Current workflow for Sales Receipt.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[5120/676] rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-flow-receive-payment-diagram.png"
                alt="Current workflow for Receive Payment"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Current workflow for Receive Payment.</p>
          </div>
        </section>

        {/* DESIGN DECISIONS: ITERATIONS */}
        <section id="iterations" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Design Decisions</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Iterations</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              I went through several rounds of design iterations to determine the final design.
            </p>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            This example zeros in on a flow that I redesigned for Sales Receipt details. Other flows that were designed were, adding/editing payments, adding payment methods, and editing the deposit location. The existing framework was there (a main edit page that opens up to a specific workflow when a section is clicked). But I needed to determine exactly what was going into that workflow, how many clicks and how much detail would exist, and what should go in each section on the main page, and the hierarchy of each section.
          </p>

          <div className="space-y-2">
            <div className="relative aspect-[4480/3223] rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-lofi-sales-receipt-wireframes.png"
                alt="Lo-fidelity designs for Sales Receipt"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Lo-fidelity designs for Sales Receipt.</p>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            At the mid-fidelity stage, I started to experiment with components in our QBDS library. I iterated on several ways that the interaction could be displayed.
          </p>
          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            An example is the payment method workflow. I decided in the conceptual stage that it would have a separate field to select the payment method, but I needed to determine how that payment method would be selected. I decided to go with the list of payment methods where a person could just select the payment method instead of an input field. That way there would be less clicks and less bottom sheets to go through to make a selection.
          </p>

          <div className="space-y-2">
            <div className="relative aspect-[4480/3149] rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-midfi-payment-method-flow.png"
                alt="Mid-fidelity payment method flow exploration"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            One crucial part of this project was that it was being used as a first use case for our new QBDS iOS mobile component library. As I was working, I was workshopping and discussing with the QBDS team on what components were needed in order to fit this use case. This resulted in a decent period of time where my designs were in mid-fidelity while waiting for components to be completed.
          </p>

          <div className="space-y-2">
            <div className="max-w-[280px] mx-auto rounded-[2.25rem] bg-ink p-2 shadow-sm">
              <div className="relative aspect-[650/1402] rounded-[1.5rem] overflow-hidden">
                <ScrollPlayVideo
                  src="/mobile-sales-modernization/msm-user-testing-device-mockup.mp4"
                  loop
                  controls={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="text-xs text-muted">Prototype used for mid-fidelity research to test early designs.</p>
          </div>
        </section>

        {/* DESIGN DECISIONS: RESEARCH */}
        <section id="research" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Design Decisions</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Research</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              Along with a redesign, I also gathered research to understand how the new components were being perceived by users.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-panel border border-border space-y-2">
            <h3 className="font-semibold text-ink">What information did I want to gather?</h3>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-4">
              <li>Understanding if users are able to complete the critical tasks, find the information they need quickly and intuitively with new transaction forms built</li>
              <li>How will users scan the new forms?</li>
              <li>How will users interact with the new forms when editing?</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg bg-panel border border-border space-y-2">
            <h3 className="font-semibold text-ink">Outcome</h3>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-4">
              <li>Consistency between designs for the forms was overall helpful for customers</li>
              <li>Customers saw that the forms were similar and pointed it out when asked to compare</li>
              <li>Majority of customers found the new invoice to be simple, clean, and organized.</li>
              <li>Customers cared a lot about the status of the invoice when looking at the list of sent invoices &amp; receive payments</li>
              <li>Seeing unpaid and overdue transactions of mind for customers</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <div className="relative aspect-[3904/3360] rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-research-synthesis-stickies.png"
                alt="Research synthesis sticky notes"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Research synthesis on final designs for Sales Receipt, Receive Payment, and Invoicing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <blockquote className="border-l-2 border-ink/20 pl-4">
              <p className="text-sm text-ink/80 italic">&ldquo;What we have on the screen seems easier, I like that in the new version the fields are set apart in a bubble.&rdquo;</p>
              <p className="mt-2 text-xs text-muted">— Daniel</p>
            </blockquote>
            <blockquote className="border-l-2 border-ink/20 pl-4">
              <p className="text-sm text-ink/80 italic">&ldquo;It feels like they&rsquo;re from the same product and I appreciate that. I know different teams work on different screens but I appreciate the consistency.&rdquo;</p>
              <p className="mt-2 text-xs text-muted">— Sandra</p>
            </blockquote>
          </div>
        </section>

        {/* DESIGN DECISIONS: DESIGN SYSTEM CONTRIBUTIONS */}
        <section id="design-system-contributions" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Design Decisions</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Design System Contributions</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              &ldquo;Hero Amount&rdquo; was created to solve the problem of calculating the total payment of a user for a Receive Payment, while also allowing them to select and edit invoices on the same page.
            </p>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            For the Receive Payment form, changing the design to the new ReThink components, while still providing the same ease of use was a bit more challenging. In the old form, users could create edit and save the form all in one page. Now, the interaction pattern was more scalable, but created more steps for the user. I needed to determine a way to create a pattern that balanced simplicity and functionality. In order to do this, it was decided that a new component needed to be designed.
          </p>

          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-hero-amount-states-full.png"
                alt="Hero Amount component states across many variations"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain p-4"
              />
            </div>
            <p className="text-xs text-muted">Mid fidelity design research.</p>
          </div>

          <div className="p-5 rounded-lg bg-panel border border-border space-y-2">
            <h3 className="font-semibold text-ink">To create this component</h3>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-4">
              <li>Created a brainstorming session partnered with visual designers and engineers to determine what was feasible</li>
              <li>Gathered multiple use cases for the component from across QBM</li>
              <li>Created several versions of the design to accommodate edit, view, active, and warning states of the design</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[1296/1860] max-w-sm mx-auto rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-hero-amount-final-states-comparison.png"
                alt="Hero Amount final states comparison"
                fill
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Research synthesis on final designs for Sales Receipt, Receive Payment, and Invoicing.</p>
          </div>
        </section>

        {/* FINAL DESIGN */}
        <section id="final-design" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">04 / The Final Design</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">What Shipped</h2>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            The shipped experience unified Sales Receipt and Receive Payment on the new shared component library, with &ldquo;Hero Amount&rdquo; solving Receive Payment&rsquo;s balance-and-invoice-editing tension in a single view.
          </p>

          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/msm-sales-receipt-final.png"
                alt="Final Sales Receipt design"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain p-4"
              />
            </div>
            <p className="text-xs text-muted">Final Sales Receipt design.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/mobile-sales-modernization/hero-final.png"
                alt="Hero Amount, final design"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain p-4"
              />
            </div>
            <p className="text-xs text-muted">&ldquo;Hero Amount,&rdquo; final design.</p>
          </div>

          <div className="space-y-2">
            <div className="max-w-[280px] mx-auto rounded-[2.25rem] bg-ink p-2 shadow-sm">
              <div className="relative aspect-[650/1402] rounded-[1.5rem] overflow-hidden">
                <ScrollPlayVideo
                  src="/mobile-sales-modernization/msm-final-flow.mp4"
                  loop
                  controls={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="text-xs text-muted">The final Sales Receipt flow.</p>
          </div>
        </section>

        {/* RETROSPECTIVE & LESSONS LEARNED */}
        <section id="takeaways" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">05 / Retrospective</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Takeaways</h2>
          </div>

          <ul className="space-y-4 text-sm text-ink/80">
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">01</span>
              <span><strong className="text-ink">Case by case, not one pattern everywhere:</strong> scaling a design system takes a real understanding of each use case&rsquo;s complexity.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">02</span>
              <span><strong className="text-ink">Build what&rsquo;s missing:</strong> when a component didn&rsquo;t exist yet, building it directly with QBDS unblocked the project and shaped the library for what came next.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">03</span>
              <span><strong className="text-ink">The work didn&rsquo;t stop at launch:</strong> research kept surfacing new provocations, later extending the pattern to multi-currency to test how well it scaled.</span>
            </li>
          </ul>
        </section>

        </div>
      </div>
    </main>
  );
}
