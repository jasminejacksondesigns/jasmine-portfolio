import React from "react";
import BrowserFrameVideo from "./BrowserFrameVideo";
import BrowserChrome from "./BrowserChrome";
import Image from "next/image";
import type { CaseStudySection } from "./CaseStudySideNav";
import CaseStudyShell, { CaseStudyBody } from "./CaseStudyShell";
import { CaseStudyLocked } from "./CaseStudyLock";
import ScrollPlayVideo from "./ScrollPlayVideo";
import LaptopFrameVideo from "./LaptopFrameVideo";
import DesktopFrameVideo from "./DesktopFrameVideo";

const SECTIONS: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "process-artifacts", label: "Process Artifacts" },
  { id: "iterations", label: "Iterations" },
  { id: "final-design", label: "Final Design" },
  { id: "takeaways", label: "Takeaways" },
];

export default function IntuitIntelligenceTemplatePreview() {
  return (
    <CaseStudyShell slug="intuit-intelligence-homepage" sections={SECTIONS} lockProcess>

        {/* FLAGSHIP HERO */}
        <section className="cs-hero">
          <video
            src="/intuit-intelligence-homepage/intuit-intelligence-hero-v2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-contain"
          />
        </section>

        <CaseStudyBody>
        <div className="flex flex-col gap-10 md:gap-12">
        <header id="overview" className="scroll-mt-32">
          <div className="space-y-4">
            <h1 className="font-display text-3xl md:text-5xl font-light tracking-tight text-ink leading-[1.15]">
              Intuit Intelligence
            </h1>
            <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
              Improving Intuit Intelligence&rsquo;s entry point to help customers understand the breadth and depth of what the tool can do, and designing insight prompts to include real data from the customer.
            </p>
          </div>
        </header>

          {/* Monospace Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border text-xs">
            <div>
              <span className="font-subheading text-muted block mb-1">ROLE</span>
              <span className="text-ink">Lead Product Designer</span>
            </div>
            <div>
              <span className="font-subheading text-muted block mb-1">TIMELINE</span>
              <span className="text-ink">4 months</span>
            </div>
            <div>
              <span className="font-subheading text-muted block mb-1">TOOLS / STACK</span>
              <span className="text-ink">Figma, Cursor, Claude</span>
            </div>
            <div>
              <span className="font-subheading text-muted block mb-1">CORE OUTCOME</span>
              <span className="text-ink">+13% Adoption</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW & PROBLEM / SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-border md:gap-12">
          <div id="problem" className="space-y-3 scroll-mt-32">
            <h2 className="font-subheading text-xs uppercase tracking-wider text-muted">The Problem</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Customers treated the Intuit Intelligence panel as a basic FAQ bot. They didn&rsquo;t realize it works as an active financial agent, one that can automate workflows, flag cash flow risks, and answer direct questions about live books. Among customers who actively used Intuit Intelligence, 39% had at least one workflow it could have automated. That gap in understanding kept customers from typing custom queries at all, and ~63% of customers in the first 30 days abandoned the panel after a single use, never discovering what it could do.
            </p>
          </div>
          <div id="solution" className="space-y-3 scroll-mt-32">
            <h2 className="font-subheading text-xs uppercase tracking-wider text-muted">The Solution</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Insight prompts built from each customer&rsquo;s real data, showing concrete ways to use Intuit Intelligence as a personal agent rather than a help bot.
            </p>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="cs-metric p-5 rounded-xl bg-panel border border-border space-y-1">
            <div className="font-display text-3xl font-light text-ink tracking-tight">13%</div>
            <div className="text-xs text-muted">Gain in Adoption</div>
            <p className="text-xs text-muted pt-1">Increase in adoption of Intuit Intelligence following the redesigned entry point.</p>
          </div>
          <div className="cs-metric p-5 rounded-xl bg-panel border border-border space-y-1">
            <div className="font-display text-3xl font-light text-ink tracking-tight">5</div>
            <div className="text-xs text-muted">Partner Teams</div>
            <p className="text-xs text-muted pt-1">Partner teams across QuickBooks Online that created insight prompts on the new framework.</p>
          </div>
        </section>

        {/* HERO MEDIA (animated) */}
        <section className="space-y-3">
          <div className="cs-figure overflow-hidden">
            <LaptopFrameVideo
              frameSrc="/intuit-intelligence-homepage/ii-macbook-frame.png"
              videoSrc="/intuit-intelligence-homepage/ii-final-design-hero.mp4"
              alt="Meet Intuit Intelligence, your business AI assistant, on a MacBook"
              objectPosition="center top"
            />
          </div>
        </section>

        <CaseStudyLocked>
        {/* PROCESS ARTIFACTS: V0 BETA */}
        <section id="process-artifacts" className="space-y-8 pt-10 border-t border-border scroll-mt-32">
          <div className="space-y-3">
            <span className="font-subheading text-xs text-muted uppercase tracking-wider">Process Artifacts</span>
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">V0: A quick mock-up</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              When I joined the project, the team had just released a V0 of the design: a classic search bar with a description and title describing the experience. It also included 4 basic prompts from top requested and selected prompts in the alpha research. After beta launch, I did another round of research that determined that engagement levels were lower due to a &ldquo;tool blindness&rdquo; problem: customers thought that this was more of a help bot rather than an intelligent chat, and they weren&rsquo;t sure which questions to ask, leading to drop off.
            </p>
          </div>

          <div className="space-y-3">
            <BrowserChrome className="cs-figure mx-auto max-w-2xl">
              <Image
                src="/intuit-intelligence-homepage/ii-v0-beta-desktop.png"
                alt="The current state design of the landing page"
                width={5760}
                height={3800}
                sizes="(min-width: 768px) 672px, 100vw"
                className="block h-auto w-full"
              />
            </BrowserChrome>
            <p className="text-xs text-muted text-center">The current state design of the landing page.</p>
          </div>
        </section>

        {/* ITERATIONS */}
        <section id="iterations" className="space-y-8 pt-10 border-t border-border scroll-mt-32">
          <div className="space-y-3">
            <span className="font-subheading text-xs text-muted uppercase tracking-wider">Iterations</span>
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">Type ahead animations left customers with more questions, but less answers</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              My first iteration was a type ahead animation that included the top questions from our beta. Feedback from our team and customers was that it was hard to go back through the animation and find the prompt I included. It was also supposed to help draw attention to the Intuit Intelligence panel, but customers were not drawn to it. I took this feedback and pivoted to new concepts that focused more on providing insights rather than drawing attention with animation.
            </p>
          </div>

          <div className="space-y-3">
            <div className="overflow-hidden">
              <ScrollPlayVideo
                src="/intuit-intelligence-homepage/typeahead-exploration.mp4"
                loop
                controls={false}
                className="mx-auto h-auto w-full max-w-[420px]"
              />
            </div>
            <p className="text-xs text-muted text-center">A type-ahead exploration of the Intuit Intelligence panel.</p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-display text-lg font-light text-ink tracking-tight">Creating &ldquo;Insight Prompts&rdquo; helped give customers a reason to be invested in the answers</h3>
            <p className="text-ink/80 leading-relaxed text-sm">
              I landed on the idea of &ldquo;Insight Prompts&rdquo;, generated insights that were based on real customer data that were paired with a top asked prompt. It got behind the &ldquo;why&rdquo; of the feature. Customers should care about this feature because it can detect important information about your books or actions needed to take, and provide an answer for how to take that action.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[2400/2134] max-w-2xl mx-auto cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-insight-prompts-iterations.png"
                alt="A grid of insight prompt card iterations explored for the Intuit Intelligence panel"
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Iterations on the insight prompt card design.</p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-display text-lg font-light text-ink tracking-tight">Creating the master component for teams to implement the design</h3>
            <p className="text-ink/80 leading-relaxed text-sm">
              Our team was the host of a new AI design system library along with creating new designs. When I complete designs, I add a new master component to the library for other designers and partner teams to use.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[2400/1524] max-w-3xl mx-auto cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-design-system-library-v2.png"
                alt="Master components for the zero state and first-time-use panel"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">The zero-state and FTU master components, added to the design system.</p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-display text-lg font-light text-ink tracking-tight">After initial release, I decided to push it further to show the breadth of questions that can be answered</h3>
            <p className="text-ink/80 leading-relaxed text-sm">
              After launch, customers said they still weren&rsquo;t fully confident in understanding the breadth of what Intuit Intelligence could do. I ran an A/B test comparing the live design against a new concept. In the end, customers loved having more options and wanted a combination of both: clickable chips that showed the breadth of prompt areas, with different insight prompts under each one.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[2200/1614] max-w-2xl mx-auto cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-competitive-analysis-v2.png"
                alt="Competitive analysis of other chats that have more interactive landing pages"
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">Competitive analysis of other chats that have more interactive landing pages.</p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[2400/1556] max-w-2xl mx-auto cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-ab-test-v2.png"
                alt="A/B test: chips showing the breadth of prompt areas"
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted text-center">A/B test: chips showing the breadth of prompt areas.</p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-ink/80 leading-relaxed text-sm">
              I tested the full interactions of the design using Figma Make.
            </p>
          </div>

          <div className="space-y-3">
            <BrowserFrameVideo
              src="/intuit-intelligence-homepage/vibecoded-exploration.mp4"
              label="Figma Make prototype of the chip and insight prompt designs"
              aspect={3004 / 1588}
              className="cs-figure"
            />
            <p className="text-xs text-muted">Figma Make of the chip and insight prompt designs.</p>
          </div>
        </section>

        {/* FINAL DESIGN */}
        <section id="final-design" className="space-y-8 pt-10 border-t border-border scroll-mt-32">
          <div className="space-y-3">
            <span className="font-subheading text-xs text-muted uppercase tracking-wider">The Final Design</span>
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">What Shipped</h2>
          </div>

          <div className="space-y-3">
            <div className="cs-figure overflow-hidden">
              <DesktopFrameVideo
                frameSrc="/intuit-intelligence-homepage/ii-final-design-hero.png"
                videoSrc="/intuit-intelligence-homepage/ii-final-design-hero.mp4"
                alt="The final Intuit Intelligence panel shown on a Mac Studio and Studio Display"
                objectPosition="center top"
              />
            </div>
            <p className="text-xs text-muted">The final Intuit Intelligence panel, live in QuickBooks Online.</p>
          </div>
        </section>

        {/* RETROSPECTIVE & LESSONS LEARNED */}
        <section id="takeaways" className="space-y-8 pt-10 border-t border-border scroll-mt-32">
          <div className="space-y-3">
            <span className="font-subheading text-xs text-muted uppercase tracking-wider">Retrospective</span>
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">Takeaways</h2>
          </div>

          <ul className="list-none space-y-4 pl-0 text-sm text-ink/80">
            <li>
              <strong className="text-ink">Data beats decoration:</strong> tying insight prompts to a customer&rsquo;s real data (&ldquo;You have 3 unpaid invoices&rdquo;) built more trust than any zero-state animation could.
            </li>
            <li>
              <strong className="text-ink">Cloak, don&rsquo;t stall:</strong> masking backend latency with a considered loading animation preserved engagement while engineering solved the real constraint.
            </li>
            <li>
              <strong className="text-ink">Prototype fast, decide faster:</strong> a quick, AI-assisted &ldquo;vibe-coded&rdquo; exploration let the team test an alternate interaction without spending design time on it, keeping momentum through the zero-state phase.
            </li>
          </ul>
        </section>
        </CaseStudyLocked>
        </CaseStudyBody>

    </CaseStudyShell>
  );
}
