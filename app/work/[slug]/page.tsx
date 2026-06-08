import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import CaseStudy from "@/components/work/CaseStudy";

// Prerender all six project pages at build time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found — Sachin" };
  return {
    title: `${project.name} — Sachin`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Sachin`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
