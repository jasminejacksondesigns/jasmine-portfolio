import React from "react";
import Image from "next/image";
import type { CaseStudySection } from "./CaseStudySideNav";
import CaseStudyShell from "./CaseStudyShell";
import ScrollPlayVideo from "./ScrollPlayVideo";
import LaptopFrameVideo from "./LaptopFrameVideo";
import LaptopFrameImage from "./LaptopFrameImage";
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
    <CaseStudyShell slug="intuit-intelligence-homepage" sections={SECTIONS}>

        <div className="flex flex-col gap-10 md:gap-12">
        {/* HEADER & HERO */}
        <header id="overview" className="space-y-10 scroll-mt-32">
          {/* Title & One-Liner */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-6xl font-light tracking-tight text-ink leading-[1.1]">
              Intuit Intelligence
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed">
              Improving Intuit Intelligence&rsquo;s entry point to help customers understand the breadth and depth of what the tool can do, and designing insight prompts to include real data from the customer.
            </p>
          </div>

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
        </header>

        {/* FLAGSHIP HERO MEDIA FRAME */}
        <section className="cs-hero">
          <div className="cs-figure relative aspect-video overflow-hidden rounded-xl bg-bg">
              <video
                src="/intuit-intelligence-homepage/intuit-intelligence-hero-v2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
              />
          </div>
        </section>
        </div>

        {/* OVERVIEW & PROBLEM / SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-border md:gap-12">
          <div id="problem" className="space-y-3 scroll-mt-32">
            <h2 className="font-subheading text-xs uppercase tracking-wider text-muted">The Problem</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Users frequently approached the Omni AI panel with &ldquo;tool blindness,&rdquo; treating it as a static, generic FAQ help bot rather than a proactive financial agent. This mindset, paired with a low confidence in natural language querying, resulted in a severe cold-start problem and &ldquo;one-and-done&rdquo; sessions where users struggled to differentiate Omni from standard chatbots.
            </p>
          </div>
          <div id="solution" className="space-y-3 scroll-mt-32">
            <h2 className="font-subheading text-xs uppercase tracking-wider text-ink">The Solution</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Highlight and emphasize a framework of insight prompts that tapped into real data from the users, showing ways that people can use Intuit Intelligence as a personal agent and not a help bot.
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
          <div className="overflow-hidden rounded-xl">
            <LaptopFrameVideo
              frameSrc="/intuit-intelligence-homepage/ii-figma-make-prototype.png"
              videoSrc="/intuit-intelligence-homepage/ii-final-design-hero.mp4"
              alt="Meet Intuit Intelligence, your business AI assistant, on a MacBook"
              objectPosition="center top"
            />
          </div>
        </section>

        {/* PROCESS ARTIFACTS: V0 BETA */}
        <section id="process-artifacts" className="space-y-8 pt-10 border-t border-border scroll-mt-32">
          <div className="space-y-3">
            <span className="font-subheading text-xs text-muted uppercase tracking-wider">Process Artifacts</span>
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">The current design was a quick mockup for beta release</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              When I joined the project, we&rsquo;d release a V0 of the design, this as a classic search bar with a description and title describing the experience. It also included 4 basic prompts that we got from from top requested and selected prompts in our alpha research. After beta launch, we did another round of research that determined that engagement levels we&rsquo;re lower due to a &ldquo;tool blindness&rdquo; problem: customers thought that this was more of a help bot rather than an intelligent chat, and they weren&rsquo;t sure which questions to ask, leading to drop off.
            </p>
          </div>

          <div className="space-y-3">
            <div className="overflow-hidden rounded-xl">
              <LaptopFrameImage
                frameSrc="/intuit-intelligence-homepage/ii-figma-make-prototype.png"
                imageSrc="/intuit-intelligence-homepage/ii-v0-beta-desktop.png"
                alt="The current state design of the landing page"
              />
            </div>
            <p className="text-xs text-muted">The current state design of the landing page.</p>
          </div>
        </section>

        {/* ITERATIONS */}
        <section id="iterations" className="space-y-8 pt-10 border-t border-border scroll-mt-32">
          <div className="space-y-3">
            <span className="font-subheading text-xs text-muted uppercase tracking-wider">Iterations</span>
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">Type ahead animations left customers with more questions, but less answers</h2>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              My first iteration was a type ahead animation that included the top questions from our beta. Feedback from our team and customers was that it was hard to go back through the animation and find the prompt we included. It was also supposed to help draw attention to the Intuit Intelligence panel, but customers we&rsquo;re not drawn to it. I took this feedback and pivoted to new concepts that focused more on providing insights rather than drawing attention with animation.
            </p>
          </div>

          <div className="space-y-3">
            <div className="cs-figure overflow-hidden rounded-xl">
              <ScrollPlayVideo
                src="/intuit-intelligence-homepage/typeahead-exploration.mp4"
                loop
                controls={false}
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted text-center">A type-ahead exploration of the Intuit Intelligence panel.</p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-subheading text-lg font-light text-ink tracking-tight max-w-3xl">Creating &ldquo;Insight Prompts&rdquo; helped give customers a reason to be invested in the answers</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              We landed on the idea of &ldquo;Insight Prompts&rdquo;, generated insights that we&rsquo;re based on real customer data that we&rsquo;re paired with a top asked prompt. It got behind the &ldquo;why&rdquo; of the feature. Customers should care about this feature because it can detect important information about your books or actions needed to take, and provide an answer for how to take that action.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[2400/2134] cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-insight-prompts-iterations.png"
                alt="A grid of insight prompt card iterations explored for the Intuit Intelligence panel"
                fill
                sizes="(min-width: 768px) 848px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Iterations on the insight prompt card design.</p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-subheading text-lg font-light text-ink tracking-tight max-w-3xl">Creating the master component for teams to implement the design</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              Our team was the host of a new AI design system library along with creating new designs. When I complete designs, I add a new master component to the library for other designers and partner teams to use.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[2400/1524] cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-design-system-library-v2.png"
                alt="Master components for the zero state and first-time-use panel"
                fill
                sizes="(min-width: 768px) 848px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">The zero-state and FTU master components, added to the design system.</p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-subheading text-lg font-light text-ink tracking-tight max-w-3xl">After initial release, we decided to push it further to show the breadth of questions that can be answered</h3>
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              After launch, customers said they still weren&rsquo;t fully confident in understanding the breadth of what Intuit Intelligence could do. We ran an A/B test comparing the live design against a new concept. In the end, customers loved having more options and wanted a combination of both: clickable chips that showed the breadth of prompt areas, with different insight prompts under each one.
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
            <div className="relative aspect-[2400/1556] cs-figure overflow-hidden rounded-xl">
              <Image
                src="/intuit-intelligence-homepage/ii-ab-test-v2.png"
                alt="A/B test: chips showing the breadth of prompt areas"
                fill
                sizes="(min-width: 768px) 848px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">A/B test: chips showing the breadth of prompt areas.</p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              I tested the full interactions of the design using Figma Make.
            </p>
          </div>

          <div className="space-y-3">
            <div className="cs-figure overflow-hidden rounded-xl bg-panel">
              <ScrollPlayVideo
                src="/intuit-intelligence-homepage/vibecoded-exploration.mp4"
                loop
                controls={false}
                className="w-full h-auto"
              />
            </div>
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
            <div className="overflow-hidden rounded-xl">
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

    </CaseStudyShell>
  );
}
