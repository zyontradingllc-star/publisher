import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { liveTools, type LiveToolSlug } from "@/content/live-tools";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ tool: string }>;
};

export function generateStaticParams() {
  return liveTools.map((tool) => ({ tool: tool.slug }));
}

function isTool(value: string): value is LiveToolSlug {
  return liveTools.some((tool) => tool.slug === value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  const match = liveTools.find((item) => item.slug === tool);
  if (!match) return {};
  return buildPageMetadata({
    title: `${match.name} | Authors Pilot`,
    description: match.summary,
    path: `/tools/${match.slug}`,
  });
}

export default async function ToolPage({ params }: Props) {
  const { tool } = await params;
  if (!isTool(tool)) notFound();
  return <ToolWorkspace slug={tool} />;
}
