import React from "react";
import Image from "next/image";
import CaseStudySideNav, { type CaseStudySection } from "./CaseStudySideNav";
import ScrollPlayVideo from "./ScrollPlayVideo";

const SECTIONS: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "inspiration", label: "Inspiration" },
  { id: "current-state", label: "Current State" },
  { id: "hackathon", label: "Hackathon" },
  { id: "iterations", label: "Iterations" },
  { id: "voice-capabilities", label: "Voice Capabilities" },
  { id: "final-design", label: "Final Design" },
  { id: "takeaways", label: "Takeaways" },
];

export default function InvoicingAutomationTemplatePreview() {
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
              Invoicing Automation
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl font-normal leading-relaxed">
              Our team&rsquo;s goal was to design and build a working concept of a feature where a business owner can snap and send images using Intuit Intelligence to auto-generate invoices and estimates.
            </p>
          </div>

          {/* Monospace Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border text-xs">
            <div>
              <span className="text-muted block mb-1">ROLE</span>
              <span className="text-ink">Concept to Final Design</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TIMELINE</span>
              <span className="text-ink">3 months</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TEAM</span>
              <span className="text-ink">PM, Research, 3 Engineers</span>
            </div>
            <div>
              <span className="text-muted block mb-1">CORE OUTCOME</span>
              <span className="text-ink">73% Success Rate</span>
            </div>
          </div>
        </header>

        {/* FLAGSHIP HERO MEDIA FRAME */}
        <section className="space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg">
              <ScrollPlayVideo
                src="/invoicing-automation/invoicing-voice-demo.mp4"
                className="h-full w-full object-cover"
              />
          </div>
          <p className="text-xs text-muted text-center">
            Fig 1.0 — Speak the details, and Intuit Assist drafts a ready-to-review invoice.
          </p>
        </section>

        {/* OVERVIEW & PROBLEM / SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
          <div id="problem" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-muted">01 / The Problem</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              How might we help customers create invoices on the go so that they don&rsquo;t have to go home to complete their work?
            </p>
            <ul className="text-[11px] text-muted space-y-1 pt-2 border-l-2 border-border pl-3">
              <li>I am.. an SMB using QuickBooks Online to create and send invoices and estimates.</li>
              <li>I&rsquo;m trying to.. send invoices and estimates quickly and easily to get paid.</li>
              <li>But.. sending invoices, especially many at a time, is very time consuming.</li>
              <li>Because.. I have to enter a lot of information while the details of each job keep changing, on the go.</li>
              <li>Which makes me feel.. exhausted.</li>
            </ul>
          </div>
          <div id="solution" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-ink">02 / The Solution</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              A concept that captures screenshots, photos, or text message conversations and creates a prefilled invoice from them. Tap Autofill, choose a source, and Intuit Assist drafts the customer, line items, and totals — ready to review before sending.
            </p>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">73%</div>
            <div className="text-xs text-muted">Success Rate</div>
            <p className="text-xs text-muted pt-1">Success rate from start to completion across the capture-to-invoice flow.</p>
          </div>
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">1st</div>
            <div className="text-xs text-muted">AI-Native Feature</div>
            <p className="text-xs text-muted pt-1">The first AI-native feature shipped in QuickBooks Mobile.</p>
          </div>
        </section>

        {/* INSPIRATION & COMPETITIVE ANALYSIS */}
        <section id="inspiration" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Process Artifacts</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Inspiration and competitive analysis</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              I looked at several other apps for inspiration to determine what the state of invoicing is today. I noticed that most apps have a much simpler design with few pages, and there we&rsquo;re very few competitors using AI for invoice extraction.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[1280/604] rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-inspiration-competitive-analysis.png"
                alt="Competitor invoicing apps reviewed for inspiration"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Inspiration to develop a first draft of the design.</p>
          </div>
        </section>

        {/* CURRENT STATE */}
        <section id="current-state" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Process Artifacts</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">The current state of invoicing was tedious</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              Users had to go through multiple steps to create, add, and edit every section of the invoice, including customers, products and services. There was no way to make this process faster on the go.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[1280/452] rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-current-state-design.png"
                alt="The current invoicing design at the beginning of the project"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">The current invoicing design at the beginning of the project.</p>
          </div>
        </section>

        {/* HACKATHON: IDEAL STATE DESIGN */}
        <section id="hackathon" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Hackathon: Ideal State Design</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Imagining what an AI first mobile experience would look like</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              This project started off as an internal hackathon with several design partners paired together to work on top potential customer painpoints that could be resolved by emerging AI technology. The goal was the
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-ink tracking-tight max-w-3xl">Problem: customers needed to wait several seconds for the AI to generate the transaction</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              The first problem I tackled in the project was an ideal state design for the loading state. I created several iterations of the best way to highlight the parts of the source image that we&rsquo;re being extracted.
            </p>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
              <div className="relative aspect-[822/410] rounded-lg overflow-hidden">
                <Image
                  src="/invoicing-automation/ia-loading-state-iterations-1.png"
                  alt="Loading-state magnifying glass iteration, variant 1"
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[822/411] rounded-lg overflow-hidden">
                <Image
                  src="/invoicing-automation/ia-loading-state-iterations-2.png"
                  alt="Loading-state magnifying glass iteration, variant 2"
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-muted text-center">Iterations of the &ldquo;Magnifying glass&rdquo; effect and animation.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-ink tracking-tight max-w-3xl">Solution: Show them how we are making progress towards the extraction to increase confidence</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              I landed on a magnifying glass effect along with dots that specify the exact areas that are being extracted on the page. This highlighted the unique abilities AI had to see and transfer handwritten notes and almost illegible files, providing more confidence to the customer that the transaction would be autogenerated correctly.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[340/700] max-w-[280px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-hackathon-invoice-generation-screenshot.png"
                alt="Final hackathon invoice generation design"
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Final hackathon invoice generation design.</p>
          </div>

          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden">
              <ScrollPlayVideo
                src="/invoicing-automation/invoicing-hackathon-demo.mp4"
                controls
                className="mx-auto block max-h-[600px] w-auto max-w-full"
              />
            </div>
            <p className="text-xs text-muted text-center">The hackathon concept, in motion.</p>
          </div>
        </section>

        {/* ITERATIONS: ADAPTING FOR QUICKBOOKS MOBILE */}
        <section id="iterations" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Iterations</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Adapting designs to provide a solution in QuickBooks Mobile</h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-ink tracking-tight max-w-3xl">Problem: Ideal state designs from the hackathon needed to be embedded into the current system</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              After the hackathon, the team was brought on to create the final design that was going be in product. What originally was a practice in pushing what was possible changed to making it truly possible, which meant focusing more on how to incorporate the feature according to customer needs and current patterns.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[905/453] max-w-2xl mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-lofi-iteration-inproduct.png"
                alt="First lo-fidelity design iteration for the in-product feature"
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">First lo-fidelity design iteration.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-ink tracking-tight max-w-3xl">Solution: Use existing patterns to develop confidence and comfort for customers</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              I looked at other similar photo upload patterns in the app as a guide to develop the new solution. I also implemented elements from the web version of our feature that was recently released.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-ink tracking-tight max-w-3xl">Researching the entry point led to creation of a new AI section on the invoice</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              Research surfaced what it would take to earn trust in an AI-generated invoice: users needed to verify accuracy before trusting it, a strong first-time education moment mattered, and they expected to see the source photo alongside the generated invoice.
            </p>
          </div>

          <blockquote className="border-l-2 border-ink/20 pl-4">
            <p className="text-sm text-ink/80 italic">&ldquo;If it&rsquo;s hidden, it&rsquo;s forgotten.&rdquo; &mdash; QuickBooks mobile user</p>
            <p className="mt-2 text-xs text-muted">Discoverability of the entry point mattered as much as the AI itself.</p>
          </blockquote>

          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden">
              <ScrollPlayVideo
                src="/invoicing-automation/invoicing-entry-exploration.mp4"
                controls
                className="mx-auto block max-h-[600px] w-auto max-w-full"
              />
            </div>
            <p className="text-xs text-muted text-center">Exploring the entry point: camera capture and voice input side by side.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[622/670] max-w-md mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-entry-point-research-options.png"
                alt="Screens shown for the entry point research"
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Screens shown for the entry point research.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[593/597] max-w-md mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-two-final-directions.png"
                alt="The two final iterations of the design"
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">The two final iterations of the design, left follows web design patterns, right follows invoicing design patterns.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[323/700] max-w-[280px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-inproduct-final-design-preview.png"
                alt="Final design preview"
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Final Design.</p>
          </div>
        </section>

        {/* SCALING THE DESIGN: ADDING VOICE CAPABILITIES */}
        <section id="voice-capabilities" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Scaling the design</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Adding Voice Capabilities</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              After the initial release of the feature, our engineering team developed new technology that could confidentially generate an invoice or estimate through voice and natural language. This part of the feature was designed in a one week sprint.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[896/773] max-w-2xl mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-voice-iterations.png"
                alt="Iterations for extending the design to include voice"
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Iterations for extending the design to include voice. Options 3 and 4 were best for scalability to more auto-generation mediums in the future.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-[807/827] max-w-md mx-auto rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/ia-final-voice-sheet.png"
                alt="Final voice bottom sheet and selection"
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Final voice bottom sheet and selection.</p>
          </div>
        </section>

        {/* FINAL DESIGN */}
        <section id="final-design" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">04 / The Final Design</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">What Shipped</h2>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            Tap Autofill, choose image or voice, and Intuit Assist drafts the invoice — ready to review before sending. Voice and text capture extended the same pattern: a light green pulse shows the app is listening, and a bottom sheet lets people choose their source.
          </p>

          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden">
              <ScrollPlayVideo
                src="/invoicing-automation/invoicing-flow-demo-v2.mp4"
                controls
                className="mx-auto block max-h-[600px] w-auto max-w-full"
              />
            </div>
            <p className="text-xs text-muted text-center">Autofill → choose a source → review the draft.</p>
          </div>

          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/invoicing-automation/invoicing-autofill-sample.png"
                alt="Choosing image or voice, then speaking the invoice details"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain p-4"
              />
            </div>
            <p className="text-xs text-muted">Choosing a source, then speaking the details.</p>
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
              <span><strong className="text-ink">Simplify what&rsquo;s known:</strong> auditing the existing receipt-capture pattern let design energy go toward the unknown challenges of AI, not reinventing solved problems.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">02</span>
              <span><strong className="text-ink">The best design isn&rsquo;t the flashiest:</strong> the instinct after the hackathon was to carry over an elaborate motion design — what actually helped users was simpler and easier to use.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">03</span>
              <span><strong className="text-ink">Design for scale:</strong> voice, batch upload, and Siri Shortcuts followed the same pattern after launch.</span>
            </li>
          </ul>
        </section>

        </div>
      </div>
    </main>
  );
}
