import React from "react";
import Image from "next/image";
import CaseStudySideNav, { type CaseStudySection } from "./CaseStudySideNav";

const SECTIONS: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "process-artifacts", label: "Process Artifacts" },
  { id: "ai-guidance", label: "AI Guidance" },
  { id: "final-design", label: "Final Design" },
  { id: "takeaways", label: "Takeaways" },
];

export default function AccountingAgentTemplatePreview() {
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
              Accounting Agent
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl font-normal leading-relaxed">
              An AI-native way for accountants and small business owners to resolve missing transaction details, without the email back-and-forth.
            </p>
          </div>

          {/* Monospace Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border text-xs">
            <div>
              <span className="text-muted block mb-1">ROLE</span>
              <span className="text-ink">Product Designer</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TIMELINE</span>
              <span className="text-ink">6 Months</span>
            </div>
            <div>
              <span className="text-muted block mb-1">TOOLS / STACK</span>
              <span className="text-ink">Figma, Usertesting</span>
            </div>
            <div>
              <span className="text-muted block mb-1">CORE OUTCOME</span>
              <span className="text-ink">0→1 in 12 Weeks</span>
            </div>
          </div>
        </header>

        {/* FLAGSHIP HERO MEDIA FRAME */}
        <section className="space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg">
              <video
                src="/accounting-agent/collab-solution-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              />
          </div>
          <p className="text-xs text-muted text-center">
            Fig 1.0 — The Collab Agent chat experience, live inside QuickBooks.
          </p>
        </section>

        {/* OVERVIEW & PROBLEM / SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
          <div id="problem" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-muted">01 / The Problem</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              Accountants don&rsquo;t have enough context on a transaction, and it takes too long to get answers from clients. Small business owners get loose emails that pile up in their inbox, have to answer long messages, and often don&rsquo;t give enough detail — leading to even more back-and-forth.
            </p>
            <ul className="text-[11px] text-muted space-y-1 pt-2 border-l-2 border-border pl-3">
              <li>Accountant.. not enough info about a transaction, takes too long to get answers from clients.</li>
              <li>SMB.. loose emails pile up in the inbox, long messages to answer, often not enough detail given.</li>
            </ul>
          </div>
          <div id="solution" className="space-y-3 scroll-mt-28">
            <h2 className="text-xs uppercase tracking-wider text-ink">02 / The Solution</h2>
            <p className="text-ink/80 leading-relaxed text-sm">
              An accountant can ask for missing details right from the transaction grid — AI drafts the question, suggests smart reply options based on the category, and keeps a running thread per transaction so nothing gets lost in an inbox.
            </p>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">91%</div>
            <div className="text-xs text-muted">Positive Voice of Customer</div>
            <p className="text-xs text-muted pt-1">Positive feedback from accountants and SMBs using the launched portal.</p>
          </div>
          <div className="p-5 rounded-lg bg-panel border border-border space-y-1">
            <div className="text-3xl font-semibold text-ink tracking-tight">0→1</div>
            <div className="text-xs text-muted">New Product in 12 Weeks</div>
            <p className="text-xs text-muted pt-1">From first concept to a shipped, GA product in a compressed timeframe.</p>
          </div>
        </section>

        {/* PROCESS ARTIFACTS */}
        <section id="process-artifacts" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">Process Artifacts</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">What Beta Research Changed</h2>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            The first pass had no shared components and was built mobile-first, with completely separate experiences for accountants and their clients. It worked, but had no visual polish — and accountants specifically asked for a grid view so they could see and edit many transactions at once.
          </p>

          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/accounting-agent/aa-early-iteration.png"
                alt="Early accountant-side iteration of the request review grid"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain p-4"
              />
            </div>
            <p className="text-xs text-muted">Early accountant-side iteration of the request review grid.</p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
              Our UX researcher ran interviews with beta users, and we prioritized what we heard back into the design:
            </p>
            <ul className="space-y-2 text-sm text-ink/80">
              <li className="flex items-start gap-3">
                <span className="text-ink text-xs mt-0.5">—</span>
                <span>Let accountants follow up, even after the AI marks a conversation complete.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ink text-xs mt-0.5">—</span>
                <span>Clarify what happens when you click &ldquo;Add requests&rdquo; on the bank grid.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ink text-xs mt-0.5">—</span>
                <span>Swap the confusing &ldquo;+ +&rdquo; buttons for a single paperclip attachment icon.</span>
              </li>
            </ul>
            <blockquote className="border-l-2 border-ink/20 pl-4">
              <p className="text-sm text-ink/80 italic">&ldquo;Pills are too generic — they may be doing more harm than good.&rdquo;</p>
              <p className="mt-2 text-xs text-muted">Beta feedback on the category-suggestion UI</p>
            </blockquote>
          </div>
        </section>

        {/* AI GUIDANCE */}
        <section id="ai-guidance" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">03 / Building Trust in AI</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Specific Guidance, Not Generic Prompts</h2>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            Looking at how other tools handled similar transaction-and-messaging pairings informed the chart model — placing the transaction question side by side with the message thread, rather than as two disconnected views. The AI&rsquo;s guidance itself was written to be specific, not generic:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-panel border border-border">
              <p className="text-sm text-ink/80 italic">&ldquo;School expenses can be both — adding detail improves accuracy.&rdquo;</p>
            </div>
            <div className="p-4 rounded-lg bg-panel border border-border">
              <p className="text-sm text-ink/80 italic">&ldquo;Gas stations are typically gas or snacks — attribute gas to a project, and note who snacks were for.&rdquo;</p>
            </div>
            <div className="p-4 rounded-lg bg-panel border border-border">
              <p className="text-sm text-ink/80 italic">&ldquo;Meal deductions depend on purpose — name who attended and why.&rdquo;</p>
            </div>
          </div>

          <blockquote className="border-l-2 border-ink/20 pl-4">
            <p className="text-sm text-ink/80 italic">&ldquo;Can you send me the bank statement? Need to be very specific — include the 4-digit account number...&rdquo;</p>
            <p className="mt-2 text-xs text-muted">Today: answers scattered across email, disconnected from the transaction itself.</p>
          </blockquote>
        </section>

        {/* FINAL DESIGN */}
        <section id="final-design" className="space-y-6 pt-6 border-t border-border scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs text-muted uppercase tracking-wider">04 / The Final Design</span>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">What Shipped</h2>
          </div>

          <p className="text-ink/80 leading-relaxed text-sm max-w-3xl">
            A Magic Link system lets SMBs receive an email with a contextual link that drops them directly into the relevant transaction thread. Because multiple people in a firm might access the portal, a settings panel lets each person add their email to get notified when new activity happens.
          </p>

          <div className="space-y-2">
            <div className="relative aspect-[700/525] rounded-lg overflow-hidden">
              <Image
                src="/accounting-agent/aa-client-portal.png"
                alt="The Client Portal, showing requests for more information"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted">Client Portal.</p>
          </div>

          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden">
              <video
                src="/accounting-agent/aa-final-flow-prototype.mp4"
                controls
                playsInline
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted">Final Flow Prototype.</p>
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
              <span><strong className="text-ink">Specificity built trust, not automation:</strong> generic AI suggestions eroded trust fast — specific guidance was what built confidence.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">02</span>
              <span><strong className="text-ink">Email set the bar:</strong> the real competition wasn&rsquo;t another app, it was email — and it set the bar for how low-friction this needed to feel.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ink text-xs mt-0.5">03</span>
              <span><strong className="text-ink">Research doesn&rsquo;t stop at launch:</strong> beta feedback reshaped interactions the team thought were finished.</span>
            </li>
          </ul>
        </section>

        </div>
      </div>
    </main>
  );
}
