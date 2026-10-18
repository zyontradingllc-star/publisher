export const BLOG_CATEGORIES = [
  "Book Writing",
  "Ghostwriting",
  "Publishing",
  "Self-Publishing",
  "Book Marketing",
  "Book Cover Design",
  "Editing & Formatting",
  "Audiobooks",
  "Amazon KDP",
  "Author Resources",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type ServiceLink = {
  href: string;
  label: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  featuredImage: string;
  featuredImageAlt: string;
  shortAnswer: string;
  sections: BlogSection[];
  faqs?: BlogFaq[];
  relatedSlugs: string[];
  serviceLinks: ServiceLink[];
  cta: {
    heading: string;
    text: string;
    href: string;
    label: string;
  };
};
