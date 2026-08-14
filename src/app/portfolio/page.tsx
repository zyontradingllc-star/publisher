import type { Metadata } from "next";
import { portfolio } from "@/content/site";
import { PageHero } from "@/components/ui/Section";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Portfolio",
  description: portfolio.hero.description,
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHero
        title={portfolio.hero.title}
        description={portfolio.hero.description}
      />
      <FadeIn className="mt-8 flex justify-center">
        <Button href="/contact">Start a Conversation</Button>
      </FadeIn>
      <FadeIn className="mt-12 sm:mt-14">
        <PortfolioGrid />
      </FadeIn>
    </div>
  );
}
