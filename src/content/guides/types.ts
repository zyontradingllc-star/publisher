export type GuideSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type DiyGuide = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  /** Free DIY educational vs free listing product page */
  intent: "diy" | "listing";
  shortAnswer: string;
  publishedAt: string;
  updatedAt: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Official retailer / platform docs (external) */
  officialLinks: { href: string; label: string }[];
  /** Other DIY guide slugs on this site */
  relatedGuideSlugs: string[];
  /** Existing blog slugs — merge intent, avoid duplicate thin pages */
  relatedBlogSlugs: string[];
  /** Primary free / DIY action */
  diyCta: {
    heading: string;
    text: string;
    href: string;
    label: string;
  };
  /**
   * Optional paid Authors Pilot services — always labeled separately.
   * Never present paid work as “free publishing.”
   */
  paidNote?: {
    heading: string;
    text: string;
    href: string;
    label: string;
  };
};
