export const CASE_STUDY_FLOW = [
  {
    slug: "intuit-intelligence-homepage",
    title: "Intuit Intelligence",
    company: "Intuit",
  },
  {
    slug: "homing",
    title: "Homing",
    company: "SF Make-a-thon",
  },
  {
    slug: "mobile-sales-modernization",
    title: "Mobile Sales Modernization",
    company: "Intuit",
  },
  {
    slug: "invoicing-automation",
    title: "Invoicing Automation",
    company: "Intuit",
  },
  {
    slug: "accounting-agent",
    title: "Accounting Agent",
    company: "Intuit",
  },
] as const;

export function nextCaseStudy(slug: string) {
  const index = CASE_STUDY_FLOW.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  return CASE_STUDY_FLOW[(index + 1) % CASE_STUDY_FLOW.length];
}
