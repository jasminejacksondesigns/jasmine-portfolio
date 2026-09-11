import { notFound } from "next/navigation";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { visibleCaseStudies } from "@/content/case-studies";

const BESPOKE_SLUGS = [
  "invoicing-automation",
  "mobile-sales-modernization",
  "homing",
  "accounting-agent",
  "intuit-intelligence-homepage",
];

export function generateStaticParams() {
  // These slugs have their own bespoke routes (e.g. app/work/invoicing-automation)
  // that take routing precedence; excluded here to avoid a duplicate static path.
  return visibleCaseStudies
    .filter((project) => !BESPOKE_SLUGS.includes(project.slug))
    .map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = visibleCaseStudies.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyTemplate project={project} />;
}
