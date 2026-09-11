import React from "react";
import Image from "next/image";
import CaseStudySideNav, { type CaseStudySection } from "./CaseStudySideNav";

const SECTIONS: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "design-process", label: "Design Process" },
  { id: "process-artifacts", label: "Process Artifacts" },
  { id: "takeaways", label: "Takeaways" },
];

export default function HomingTemplatePreview() {
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
              Homing
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl font-normal leading-relaxed">
              A make-a-thon project that turns travel moments into shareable magnets.
            </p>
          </div>

          {/* Monospace Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border text-xs">
            <div>
              <span className="text-muted block mb-1">ROLE</span>
              <span className="text-ink">Co-design Lead</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TEAM</span>
              <span className="text-ink">1 design partner, agents only</span>
            </div>
            <div>
              <span className="text-muted block mb-1">COMPANY</span>
              <span className="text-ink">SF Make-a-thon</span>
            </div>
            <div>
              <span className="text-muted block mb-1">CORE OUTCOME</span>
              <span className="text-ink">2.5 Hours to Ship</span>
            </div>
          </div>

          <a
            href="https://homing-phi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-ink underline decoration-1 underline-offset-2 hover:text-ink"
          >
            Visit live site ↗
          </a>
        </header>

        {/* FLAGSHIP HERO MEDIA FRAME */}
        <section className="space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg">
              <video
                src="/homing/homing.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              />
          </div>
          <p className="text-xs text-muted text-center">
            Fig 1.0 — Drop a photo, and Homing turns it into a shareable fridge magnet.
          </p>
        </section>

        {/* OVERVIEW & PROBLEM / SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
          <div id="problem" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-muted">01 / The Challenge</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Travel memories usually live as camera-roll photos — easy to take, hard to share in a way that feels physical and personal. At SF Make-a-thon, we wanted a tiny product that could turn a moment into something you could actually send home.
            </p>
          </div>
          <div id="solution" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-ink">02 / The Solution</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Homing lets you drop a photo, a view, a snack, a little treasure, and turns it into a fridge magnet you can send — built as a partner project in a single make-a-thon sprint.
            </p>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">2.5 hrs</div>
            <div className="text-xs text-muted">Idea to Working Product</div>
            <p className="text-xs text-muted pt-1">From scoping the idea to a working, demo-ready product.</p>
          </div>
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">100%</div>
            <div className="text-xs text-muted">AI-Native Design</div>
            <p className="text-xs text-muted pt-1">Every design move went through agents, no traditional Figma craft pass.</p>
          </div>
        </section>

        {/* NATIVE TAILWIND FLOW DIAGRAM */}
        <section id="design-process" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-ink uppercase tracking-wider">Design Process</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Scope, Build, Ship — Same Day</h2>
          </div>

          <div className="p-6 rounded-xl border border-border bg-panel/40 space-y-6">
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">

              {/* Step 1 */}
              <div className="flex-1 p-4 rounded-lg bg-bg border border-border space-y-2">
                <span className="text-[10px] text-muted">SCOPE</span>
                <h3 className="font-medium text-sm text-ink">Shipping the Slice</h3>
                <p className="text-xs text-muted">Scoped to one clear job: upload or capture a photo, and get a magnet-ready keepsake flow.</p>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center text-muted md:rotate-0 rotate-90">
                →
              </div>

              {/* Step 2 (Highlighted) */}
              <div className="flex-1 p-4 rounded-lg bg-panel border border-border space-y-2 relative">
                <span className="text-[10px] text-ink">BUILD</span>
                <h3 className="font-medium text-sm text-ink">Designing With Agents Only</h3>
                <p className="text-xs text-ink/75">Every design move went through agents — the constraint forced sharper product decisions and a faster loop from idea to shippable UI.</p>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center text-muted md:rotate-0 rotate-90">
                →
              </div>

              {/* Step 3 */}
              <div className="flex-1 p-4 rounded-lg bg-bg border border-border space-y-2">
                <span className="text-[10px] text-muted">SHIP</span>
                <h3 className="font-medium text-sm text-ink">Demo Night</h3>
                <p className="text-xs text-muted">Presented the finished flow to the SF Make-a-thon cohort the same day it was scoped.</p>
              </div>

            </div>
          </div>
          <p className="text-xs text-muted text-center">
            Fig 2.0 — From scoping one clear job, through an agents-only build, to demo night the same day.
          </p>
        </section>

        {/* PROCESS ARTIFACTS GALLERY */}
        <section id="process-artifacts" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Process Artifacts</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">From the Make-a-thon Floor</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/homing/partnerpicturehackathon.jpg"
                  alt="With my co-design partner at SF Make-a-thon"
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted">With my co-design partner at SF Make-a-thon.</p>
            </div>
            <div className="space-y-2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/homing/hominghackathon.jpg"
                  alt="The SF Make-a-thon cohort on demo night"
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted">The SF Make-a-thon cohort on demo night.</p>
            </div>
          </div>
        </section>

        {/* RETROSPECTIVE */}
        <section id="takeaways" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">03 / Reflection</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Takeaways</h2>
          </div>

          <ul className="space-y-4 text-sm text-ink/80">
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">01</span>
              <span><strong className="text-ink">A short showcase, not a primary case:</strong> but useful proof that a tiny, well-scoped job produces a shippable product in a single sprint.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">02</span>
              <span><strong className="text-ink">Agent-only design can still tell a clear story:</strong> as long as the job to be done stays tiny.</span>
            </li>
          </ul>
        </section>

        </div>
      </div>
    </main>
  );
}
