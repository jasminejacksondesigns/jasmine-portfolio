export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "image"; caption: string; src?: string; width?: number; height?: number }
  | { type: "video"; caption: string; src: string; frame?: "phone" }
  | {
      type: "imageFlow";
      caption: string;
      frames: { src: string; width: number; height: number; alt: string }[];
    }
  | { type: "quote"; text: string; author?: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "figma"; caption: string; embedUrl: string; linkUrl: string };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  company: string;
  role: string;
  date: string;
  tools: string[];
  featured?: boolean;
  hidden?: boolean;
  cardStats: { value: string; label: string }[];
  content: ContentBlock[];
  coverVideo?: string;
  coverImage?: string;
  coverAnimation?: "qb";
  liveUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "invoicing-automation",
    title: "Invoicing Automation",
    tagline:
      "A first-of-its-kind AI-powered feature that lets QuickBooks Mobile users photograph anything and automatically generate a transaction quickly.",
    company: "Intuit",
    role: "Lead Product Designer",
    date: "June – August 2024",
    tools: ["Figma", "Usertesting"],
    featured: true,
    coverImage: "/invoicing-automation/invoicing-hero.avif",
    cardStats: [
      { value: "73%", label: "Success rate, start to completion" },
      { value: "1st", label: "AI-native feature in QuickBooks Mobile" },
    ],
    content: [
      {
        type: "paragraph",
        text: "A first-of-its-kind AI-powered feature that lets QuickBooks Mobile users photograph anything and automatically generate a transaction quickly.",
      },
      { type: "subheading", text: "Reducing the manual workload." },
      {
        type: "paragraph",
        text: "QuickBooks Mobile users were spending significant time manually entering invoice data. Small business owners photographed invoices on their phones but had no way to digitize them automatically.",
      },
      { type: "subheading", text: "The Solution" },
      {
        type: "paragraph",
        text: "I created a feature that reads invoice photos and auto-creates transactions, reducing manual data entry to near zero.",
      },
      { type: "subheading", text: "Using previous design to develop the future" },
      {
        type: "paragraph",
        text: "As part of the process, I audited many areas of the current app and discovered that we have a similar feature that captured receipts. Rather than start from scratch, I utilized this design, and built onto it. The final design distilled the flow to three steps: photograph the invoice, AI extracts line items and totals in real time, then a smart confirmation screen surfaces only the fields that need review, skipping confirmation entirely when AI confidence exceeds the threshold.",
      },
      {
        type: "imageFlow",
        caption: "The existing receipt-capture design I audited and built onto",
        frames: [
          {
            src: "/invoicing-automation/invoicing-old-flow-1.png",
            width: 780,
            height: 1581,
            alt: "Invoices list",
          },
          {
            src: "/invoicing-automation/invoicing-old-flow-2.png",
            width: 780,
            height: 1581,
            alt: "New invoice draft",
          },
          {
            src: "/invoicing-automation/invoicing-old-flow-3.png",
            width: 780,
            height: 1581,
            alt: "Paid invoice status",
          },
        ],
      },
      {
        type: "video",
        caption: "The full capture → extract → confirm flow",
        src: "/invoicing-automation/invoicing-flow-demo-v2.mp4",
      },
      { type: "subheading", text: "Improving the entry point" },
      {
        type: "paragraph",
        text: "I did a user testing study on 8 participants to determine a few of the key new flows for image capture. First was the entry points, and second was the loading state.",
      },
      {
        type: "image",
        caption: "Task comparison from the usability study",
        src: "/invoicing-automation/invoicing-research-tasks.png",
        width: 1203,
        height: 1332,
      },
      {
        type: "paragraph",
        text: 'I found that customers had a hard time seeing the camera button as an entry point. I updated the design to include a button called "Autofill" to help make this more clear.',
      },
      {
        type: "image",
        caption: "Autofill entry point, image or voice",
        src: "/invoicing-automation/invoicing-autofill-sample.png",
        width: 2970,
        height: 1918,
      },
      { type: "subheading", text: "Voice Capture Enhancement" },
      {
        type: "paragraph",
        text: "During a sprint with our lead developer during our companies hackathon week, I created a updated design that included the ability to create an invoice via voice capture or through plain text.",
      },
      {
        type: "video",
        caption: "Voice and text capture",
        src: "/invoicing-automation/invoicing-voice-demo.mp4",
      },
      { type: "subheading", text: "Key Metrics" },
      {
        type: "stats",
        items: [
          { value: "73%", label: "Success rate of start to completion" },
          { value: "1st", label: "AI native feature in QuickBooks Mobile" },
        ],
      },
      { type: "subheading", text: "Learnings" },
      {
        type: "paragraph",
        text: "Scaling through pattern recognition: Innovation doesn't require abandoning what works. Auditing existing workflows and benchmarks let me simplify the known, focusing design energy on the unknown challenges of AI.",
      },
    ],
  },
  {
    slug: "intuit-intelligence-homepage",
    title: "Intuit Intelligence Homepage",
    tagline:
      "Improving Intuit Intelligence's entry point to help customers understand the breadth and depth of what the tool can do, and designing insight prompts to include real data from the customer.",
    company: "Intuit",
    role: "Lead Product Designer",
    date: "Feb – May 2026",
    tools: ["Figma", "Cursor", "Claude"],
    coverImage: "/intuit-intelligence-homepage/ii-hero.jpg",
    cardStats: [
      { value: "13%", label: "Gain in adoption" },
      { value: "5", label: "Partner teams created prompts" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Improving Intuit Intelligence's entry point to help customers understand the breadth and depth of what the tool can do, and designing insight prompts to include real data from the customer.",
      },
      { type: "subheading", text: "Changing the perception from help bot to agent." },
      {
        type: "paragraph",
        text: 'Users frequently approached the Omni AI panel with "tool blindness," treating it as a static, generic FAQ help bot rather than a proactive financial agent. This mindset, paired with a low confidence in natural language querying, resulted in a severe cold-start problem and "one-and-done" sessions where users struggled to differentiate Omni from standard chatbots.',
      },
      { type: "subheading", text: "The Solution" },
      {
        type: "paragraph",
        text: "Highlight and emphasize a framework of insight prompts that tapped into real data from the users, showing ways that people can use Intuit Intelligence as a personal agent and not a help bot.",
      },
      {
        type: "image",
        caption: "Intuit Intelligence in the real QuickBooks Online product",
        src: "/intuit-intelligence-homepage/ii-product-context.jpg",
        width: 896,
        height: 1299,
      },
      { type: "subheading", text: "Trying Typeahead Animations" },
      {
        type: "paragraph",
        text: 'Initial designs focused on a "zero state" with typing animations, showing many options for things to ask Intuit Intelligence and a separate section highlighting insights that the agent had collected from customer data.',
      },
      {
        type: "video",
        caption: "Full-screen zero-state exploration",
        src: "/intuit-intelligence-homepage/ii-zerostate-exploration.mp4",
      },
      {
        type: "paragraph",
        text: "The type ahead animation disappeared, so users felt like they could not actually use them or needed to re-watch the animation to find the prompt that interested them. They were also conflicted by insights that did not provide actionable prompts or answers connected to them.",
      },
      { type: "subheading", text: "Animating to cloak latency constraints" },
      {
        type: "paragraph",
        text: "While building the designs, my engineering team ran into issues having the initial batch of insight prompts load. Potentially leading to drop off in customer engagement.",
      },
      {
        type: "paragraph",
        text: "I created quick animation that cloaked the latency issues until we were able to adjust the technical solution. This included loading in a few other elements in the panel in an elegant way.",
      },
      {
        type: "video",
        caption: "Latency-cloaking loading animation",
        src: "/intuit-intelligence-homepage/ii-latency-animation.mp4",
      },
      { type: "subheading", text: "Improving the design to show breadth" },
      {
        type: "paragraph",
        text: "After our initial launch, I got feedback from customers that they still weren't fully confident in understanding the breadth of what Intuit Intelligence could do. So, we did an AB test comparing the current design with a potential new design to see how customers felt.",
      },
      {
        type: "paragraph",
        text: "In the end, customers loved having more options, and they wanted a combination of both designs. The result: clickable chips that showed the breadth of areas of prompts with different insight prompts under each area.",
      },
      {
        type: "image",
        caption: "A/B test: chips showing the breadth of prompt areas",
        src: "/intuit-intelligence-homepage/ii-ab-test.png",
        width: 1078,
        height: 763,
      },
      { type: "subheading", text: "The results" },
      {
        type: "stats",
        items: [
          { value: "13%", label: "Gains in adoption" },
          { value: "5", label: "Partner teams created prompts" },
        ],
      },
      { type: "subheading", text: "Learnings" },
      {
        type: "paragraph",
        text: 'The biggest unlock wasn\'t a visual change, it was tying prompts to real user data. "You have 3 unpaid invoices" is more compelling than any animation. When the interface demonstrates knowledge of your actual situation, trust follows.',
      },
    ],
  },
  {
    slug: "latency",
    hidden: true,
    title: "Latency",
    tagline:
      "Developing an improved design for Intuit Intelligence loading state that occurs between when the person asks a question and when the tool provides an answer.",
    company: "Intuit",
    role: "Lead Product Designer",
    date: "May 2026",
    tools: ["Figma", "Claude"],
    cardStats: [{ value: "~1s", label: "Average latency after redesign" }],
    content: [
      {
        type: "paragraph",
        text: "Developing an improved design for Intuit Intelligence loading state that occurs between when the person asks a question and when the tool provides an answer.",
      },
      { type: "subheading", text: "Redesigning the space between question and answer." },
      {
        type: "paragraph",
        text: "Customers got frustrated with the loading times of the response for their questions, and the current design did not help them feel like there was any progress being made on their request.",
      },
      { type: "subheading", text: "The Solution" },
      {
        type: "paragraph",
        text: "Help customers see that we are making progress, so they feel less worried that our system is failing to come up with an answer.",
      },
      { type: "subheading", text: 'The "More Data" Approach' },
      {
        type: "paragraph",
        text: "The Idea: We initially tried to add more information into the loading state as a whole. Engineers had access to loads of data (tables, large amounts of research, etc.).",
      },
      {
        type: "paragraph",
        text: "Why it failed: Through sharing with the design team and looking at multiple iterations, I realized that showing more data wasn't necessarily the core issue. It was being able to understand what steps were being taken and how much progress was being made in a clear concise manner.",
      },
      { type: "subheading", text: "Typing Animation or Full Sentences" },
      {
        type: "paragraph",
        text: "The Challenge: While waiting for the AI model's response to load, we faced a core interaction dilemma: Should we stream the text using a character-by-character typing animation, or display content in chunked, whole sections? I prototyped both approaches and ran a usability test with 8 participants to measure perceived latency and cognitive load.",
      },
      {
        type: "paragraph",
        text: "The Pivot: The test revealed a clear winner. Users found the typing animation highly distracting, with several mistaking the loading animation for an active part of the response to their question.",
      },
      {
        type: "paragraph",
        text: "The Solution: We opted to display whole sections of text at a time. This drastically reduced visual noise, made the loading state feel more intentional, and improved comprehension.",
      },
      { type: "image", caption: "Placeholder: typing animation vs. chunked-section comparison" },
      { type: "subheading", text: "Displaying hard coded text before data rolls in" },
      {
        type: "paragraph",
        text: "The Challenge: To combat an initial delay before we got meaningful data, engineering proposed displaying hardcoded placeholder text to make the system feel active. However, we had to define the layout framework for this simulated transition state.",
      },
      {
        type: "paragraph",
        text: "The Options Explored: I prototyped and presented two distinct layout patterns to cross-functional stakeholders and leadership:",
      },
      {
        type: "paragraph",
        text: "Option A (Bulleted Lists): Highly structured and easy to skim, but visually implied finalized, categorized, or actionable data.",
      },
      {
        type: "paragraph",
        text: "Option B (Paragraph Blocks): Felt conversational and continuous, mimicking a natural thinking or narrative flow.",
      },
      {
        type: "paragraph",
        text: "The Decision: After discussion using various pros and cons, we ultimately went with paragraphed text.",
      },
      { type: "image", caption: "Placeholder: Option A bulleted vs. Option B paragraph layout" },
      { type: "subheading", text: "The Numbers" },
      {
        type: "stats",
        items: [{ value: "~1s", label: "Average latency, down from prior baseline" }],
      },
      { type: "subheading", text: "What I learned" },
      {
        type: "paragraph",
        text: "I partnered with engineers to refine early, data-heavy demos. By advocating for the user, we focused on surfacing truly impact information rather than displaying all available data, resulting in a more focused experience.",
      },
    ],
  },
  {
    slug: "accounting-agent",
    title: "Accounting Agent",
    tagline:
      "Accountants and small business owners spend hours on back and forth transaction questions. I designed a unified AI-powered communication portal to eliminate that friction, from split-view grid to Magic Link email workflow.",
    company: "Intuit",
    role: "Product Designer",
    date: "6 months",
    tools: ["Figma", "Usertesting"],
    coverAnimation: "qb",
    cardStats: [
      { value: "91%", label: "Positive voice of customer" },
      { value: "0→1", label: "New product in 12 weeks" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Accountants and small business owners spend hours on back and forth transaction questions. I designed a unified AI-powered communication portal to eliminate that friction, from split-view grid to Magic Link email workflow.",
      },
      { type: "subheading", text: "Helping accountants track down transaction info." },
      {
        type: "paragraph",
        text: 'Accountants and Small Business Owners (SMBs) spend significant time on "context gathering", the back-and-forth required to categorize transactions that lack sufficient data. 55% of transactions fell into this gap, creating a cycle of emails, follow-ups, and manual lookups.',
      },
      { type: "subheading", text: "The Solution" },
      {
        type: "paragraph",
        text: "We launched a unified Collab Agent portal that bridges accountants and SMBs in a single, coherent experience for the first time.",
      },
      {
        type: "video",
        caption: "The Collab Agent chat experience",
        src: "/accounting-agent/collab-solution-demo.mp4",
      },
      { type: "subheading", text: "Unifying two different views" },
      {
        type: "paragraph",
        text: "Initial designs created entirely different views for accountants and small business owners. The accountants could see both sides, and they wanted some of what the small business owners had. Both a grid view, and a chat view.",
      },
      {
        type: "paragraph",
        text: "I designed a split-view grid where Accountants see all transactions with status indicators, while SMBs see only those requiring their input. Both had the ability to see in both a grid and a chat.",
      },
      {
        type: "image",
        caption: "Early accountant-side iteration of the request review grid",
        src: "/accounting-agent/collab-accountant-early.png",
        width: 1575,
        height: 1128,
      },
      { type: "subheading", text: "Developing an email workflow" },
      {
        type: "paragraph",
        text: "The portal eliminated the place to find all transactions, but accountants still needed a way to send the portal to clients and also nudge them to check their portal.",
      },
      {
        type: "paragraph",
        text: "I designed a Magic Link system where SMBs receive an email with a contextual link that drops them directly into the relevant transaction thread.",
      },
      {
        type: "video",
        caption: "Magic Link email → transaction thread",
        src: "/accounting-agent/collab-email-workflow.mp4",
      },
      { type: "subheading", text: "Creating roles and permissions through UI" },
      {
        type: "paragraph",
        text: "The portal would be accessed by multiple people in a firm, both on the accountant side and the small business side. They may all want to be notified when a change has been made in the portal. Due to technical constraint, the person could not develop their own profile, and we cannot detect who is accessing the portal at a given time.",
      },
      {
        type: "paragraph",
        text: "I created a settings panel that required users to add an email so that they could get notified when new activity occurred in the portal.",
      },
      {
        type: "video",
        caption: "Notification settings panel",
        src: "/accounting-agent/collab-settings.mp4",
      },
      { type: "subheading", text: "The results" },
      {
        type: "stats",
        items: [
          { value: "91%", label: "Positive voice of customer" },
          { value: "0→1", label: "New product in 12 weeks" },
        ],
      },
      { type: "subheading", text: "Learnings" },
      {
        type: "paragraph",
        text: "Leading a 0-to-1 initiative in a compressed timeframe required constant balance between the ideal design and technical feasibility. By maintaining a tight feedback loop with Engineering and PMs, I learned to identify which ideal-state features were critical for the MVP and which could be phased, ensuring we shipped high quality without compromising long-term architecture.",
      },
    ],
  },
  {
    slug: "mobile-sales-modernization",
    title: "Mobile Sales Modernization",
    tagline:
      "Redesigning QuickBooks Mobile's sales forms so Sales Receipt and Receive Payment feel like one consistent product and match the depth of the web experience.",
    company: "Intuit",
    role: "Product Designer",
    date: "",
    tools: ["Figma", "Usertesting"],
    coverImage: "/mobile-sales-modernization/hero-final.png",
    cardStats: [
      { value: "10–12", label: "Customers interviewed, iOS & Android" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Redesigning QuickBooks Mobile's sales forms so Sales Receipt and Receive Payment feel like one consistent product and match the depth of the web experience.",
      },
      { type: "subheading", text: "Making mobile sales forms feel like one product." },
      {
        type: "paragraph",
        text: "QuickBooks Mobile's sales forms, Invoicing, Estimate, Sales Receipt, and Receive Payment, looked and behaved differently from one another and lagged behind the web experience. Small business owners trying to create and edit forms on the go found the app unintuitive and missing features they relied on from web, which left them unconfident in mobile and inclined to fall back to the website instead.",
      },
      { type: "subheading", text: "The Solution" },
      {
        type: "paragraph",
        text: "Create consistency across all four sales forms and bring mobile to parity with web, using a new shared component library.",
      },
      { type: "subheading", text: "Redesigning Sales Receipt from the ground up" },
      {
        type: "paragraph",
        text: "I audited the current landscape, what existed across mobile forms, what existed on web, and where the gaps were, then rebuilt Sales Receipt's detail flow on the new QBDS iOS component library. For payment method selection, I moved from an open input field to a selectable list, cutting clicks and friction. Because this was the first real use case for the new mobile component library, I worked closely with the QBDS team to define components that didn't exist yet, which slowed the mid-fidelity stage but shaped the library for features built after mine.",
      },
      {
        type: "image",
        caption: "Auditing the existing Sales Receipt flow on mobile",
        src: "/mobile-sales-modernization/old-sales-receipt-design.png",
        width: 1490,
        height: 931,
      },
      {
        type: "image",
        caption: "Early low-fidelity Sales Receipt wireframes",
        src: "/mobile-sales-modernization/lowfi.png",
        width: 2320,
        height: 1669,
      },
      {
        type: "image",
        caption: "Sales Receipt flow diagram",
        src: "/mobile-sales-modernization/sales-receipt-flow-diagram.png",
        width: 3983,
        height: 868,
      },
      { type: "subheading", text: "Solving Receive Payment with a new component" },
      {
        type: "paragraph",
        text: 'The old Receive Payment form let users create, edit, and save everything on one page. Moving to the new component system made the pattern more scalable but added steps, so I designed "Hero Amount," a new component that calculates a customer\'s total payment while still letting them select and edit invoices on the same page. I built it through a joint working session with visual designers and engineers, gathering use cases from across QuickBooks Mobile and designing edit, view, active, and warning states.',
      },
      {
        type: "image",
        caption: "Receive Payment flow diagram",
        src: "/mobile-sales-modernization/receive-payment-flow-diagram.png",
        width: 3099,
        height: 409,
      },
      {
        type: "image",
        caption: "\"Hero Amount\" component states",
        src: "/mobile-sales-modernization/hero-state-components.png",
        width: 2000,
        height: 2240,
      },
      {
        type: "image",
        caption: "\"Hero Amount,\" final design",
        src: "/mobile-sales-modernization/hero-final.png",
        width: 3360,
        height: 2000,
      },
      { type: "subheading", text: "Validating with research" },
      {
        type: "paragraph",
        text: "I ran 10-12 interviews with QuickBooks Mobile and web users across iOS and Android to test whether the new forms felt consistent and easy to use. Customers noticed and appreciated the consistency across forms, and described the redesigned fields as simpler and easier to scan. The research also surfaced a bigger opportunity: customers cared most about unpaid and overdue invoices and wanted to filter by status instead of scrolling, feedback that led to adding status filters and resurfacing overdue invoices at the top of the list.",
      },
      {
        type: "image",
        caption: "Research synthesis from customer interviews",
        src: "/mobile-sales-modernization/research-synthesis.png",
        width: 2468,
        height: 2124,
      },
      {
        type: "figma",
        caption: "Research prototype",
        embedUrl:
          "https://embed.figma.com/proto/ThBBX0IeIJcpGJjJ0pO7aX/Sales-Modernization-Research--Copy-?node-id=52-24048&p=f&scaling=scale-down&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=52%3A24048&embed-host=share",
        linkUrl:
          "https://www.figma.com/proto/ThBBX0IeIJcpGJjJ0pO7aX/Sales-Modernization-Research--Copy-?node-id=52-24048&p=f&t=mldqhG9hHJDMmDX0-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=52%3A24048",
      },
      { type: "subheading", text: "The results" },
      {
        type: "stats",
        items: [
          { value: "10–12", label: "Customers interviewed across iOS and Android" },
        ],
      },
      {
        type: "paragraph",
        text: "Customers spontaneously identified the redesigned forms as part of the same product. Directly shaped the roadmap: unpaid/overdue filtering was added based on this research.",
      },
      {
        type: "quote",
        text: "It feels like they're from the same product and I appreciate that. I know different teams work on different screens but I appreciate the consistency.",
        author: "Sandra",
      },
      { type: "subheading", text: "Learnings" },
      {
        type: "paragraph",
        text: "Working directly with the mobile, QBDS, and Invoicing teams let me move quickly, when a component didn't exist yet, I could build it with QBDS rather than wait for it. This project also reinforced that scaling a design system takes a real understanding of each use case's complexity, not just applying one pattern everywhere.",
      },
      {
        type: "video",
        caption: "The final Sales Receipt flow",
        src: "/mobile-sales-modernization/msm-final-flow.mp4",
        frame: "phone",
      },
    ],
  },
  {
    slug: "homing",
    title: "Homing",
    tagline: "A make-a-thon project that turns travel moments into shareable magnets.",
    company: "SF Make-a-thon",
    role: "Co-design lead",
    date: "2026",
    tools: ["AI agents", "Cursor"],
    coverVideo: "/homing/homing.mp4",
    liveUrl: "https://homing-phi.vercel.app/",
    cardStats: [
      { value: "2.5 hrs", label: "Idea to working product" },
      { value: "100%", label: "AI-native design, agents only" },
    ],
    content: [
      { type: "paragraph", text: "A make-a-thon project that turns travel moments into shareable magnets." },
      { type: "subheading", text: "Challenge — Making a trip feel sendable" },
      {
        type: "paragraph",
        text: "Travel memories usually live as camera-roll photos, easy to take, hard to share in a way that feels physical and personal. At SF Make-a-thon, we wanted a tiny product that could turn a moment into something you could actually send home.",
      },
      { type: "subheading", text: "Solution" },
      {
        type: "paragraph",
        text: "Homing lets you drop a photo, a view, a snack, a little treasure, and turns it into a fridge magnet you can send. Built as a partner project in a single make-a-thon sprint.",
      },
      { type: "subheading", text: "Process" },
      { type: "subheading", text: "01 Designing with agents only" },
      {
        type: "paragraph",
        text: "As co-design lead on a partner team, I pushed an AI-native workflow: every design move went through agents, no traditional Figma craft pass. The constraint forced sharper product decisions and a faster loop from idea to shippable UI.",
      },
      {
        type: "image",
        caption: "With my co-design partner at SF Make-a-thon",
        src: "/homing/partnerpicturehackathon.jpg",
        width: 3130,
        height: 2075,
      },
      { type: "subheading", text: "02 Shipping the slice" },
      {
        type: "paragraph",
        text: "We scoped to one clear job: upload or capture a photo, and get a magnet-ready keepsake flow. That focus kept the build tight enough to finish and demo the same day.",
      },
      {
        type: "image",
        caption: "The SF Make-a-thon cohort on demo night",
        src: "/homing/hominghackathon.jpg",
        width: 3600,
        height: 2400,
      },
      { type: "subheading", text: "Impact" },
      {
        type: "stats",
        items: [
          { value: "2.5 hrs", label: "Idea to working product" },
          { value: "100%", label: "AI-native design, agents only" },
        ],
      },
      { type: "subheading", text: "Reflection" },
      {
        type: "paragraph",
        text: "A short make-a-thon showcase, not a primary case, but a useful proof that agent-only design can still yield a clear product story when the job to be done stays tiny.",
      },
    ],
  },
];

export const featuredCaseStudy = caseStudies.find((c) => c.featured)!;
export const visibleCaseStudies = caseStudies.filter((c) => !c.hidden);
