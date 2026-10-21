import type { BreadcrumbItem } from "@/components/seo/Breadcrumbs";

type SeoPage = {
  path: string;
  serviceSlug: string;
  pageTitle: string;
  pageDescription: string;
  schemaName: string;
  serviceType: string;
  h1: string;
  keywords: string;
  breadcrumbs: BreadcrumbItem[];
  relatedLinks: { href: string; label: string }[];
};

export const seoPages = {
  "book-writing": {
    path: "/book-writing-services-for-authors",
    serviceSlug: "ebook-writing",
    pageTitle: "Book Writing Services for Authors | Authors Pilot",
    pageDescription:
      "Book writing services for authors. Turn an idea, outline, or draft into a finished manuscript with structure, voice, and professional writing support.",
    schemaName: "Book Writing Services",
    serviceType: "Book Writing",
    h1: "Book Writing Services for Authors",
    keywords:
      "book writing services, manuscript writing, professional book writers, author writing services, fiction writing services",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Book Writing" },
    ],
    relatedLinks: [
      { href: "/ghostwriting-services-for-authors", label: "Ghostwriting" },
      { href: "/professional-book-editing-services", label: "Book Editing" },
      { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
    ],
  },
  "self-publishing": {
    path: "/self-publishing-services-for-authors",
    serviceSlug: "ebook-writing",
    pageTitle: "Self-Publishing Services for Authors | Authors Pilot",
    pageDescription:
      "Self-publishing services for authors: editing, cover design, formatting, and Amazon KDP support so you publish independently and keep your rights.",
    schemaName: "Self Publishing Services",
    serviceType: "Self Publishing",
    h1: "Self-Publishing Services for Authors",
    keywords:
      "self publishing services, independent author publishing, self published authors, publish your own book",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Self Publishing" },
    ],
    relatedLinks: [
      { href: "/book-writing-services-for-authors", label: "Book Writing" },
      { href: "/amazon-kdp-publishing-services", label: "Amazon KDP Publishing" },
      { href: "/book-formatting-services-for-authors", label: "Book Formatting" },
    ],
  },
  "book-cover-design": {
    path: "/book-cover-design-services",
    serviceSlug: "book-cover-design",
    pageTitle: "Book Cover Design Services | Authors Pilot",
    pageDescription:
      "Book cover design services for fiction, nonfiction, ebooks, and print. Custom covers built to win the click on Amazon and in bookstores.",
    schemaName: "Book Cover Design Services",
    serviceType: "Book Cover Design",
    h1: "Book Cover Design Services",
    keywords:
      "book cover design, ebook cover design, Kindle cover design, professional book covers, custom book covers",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Book Cover Design" },
    ],
    relatedLinks: [
      { href: "/book-formatting-services-for-authors", label: "Book Formatting" },
      { href: "/amazon-kdp-publishing-services", label: "Amazon KDP" },
      { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
    ],
  },
  "book-editing": {
    path: "/professional-book-editing-services",
    serviceSlug: "book-editing",
    pageTitle: "Professional Book Editing Services | Authors Pilot",
    pageDescription:
      "Professional book editing services: developmental editing, copy editing, and proofreading that refine your manuscript while protecting your voice.",
    schemaName: "Book Editing Services",
    serviceType: "Book Editing",
    h1: "Professional Book Editing Services",
    keywords:
      "book editing services, developmental editing, copy editing, proofreading services, manuscript editing",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Book Editing" },
    ],
    relatedLinks: [
      { href: "/book-writing-services-for-authors", label: "Book Writing" },
      { href: "/book-formatting-services-for-authors", label: "Book Formatting" },
      { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
    ],
  },
  "book-formatting": {
    path: "/book-formatting-services-for-authors",
    serviceSlug: "book-formatting",
    pageTitle: "Book Formatting Services for Authors | Authors Pilot",
    pageDescription:
      "Book formatting services for authors - clean eBook and print interiors for Kindle, Amazon KDP, and major publishing platforms.",
    schemaName: "Book Formatting Services",
    serviceType: "Book Formatting",
    h1: "Book Formatting Services for Authors",
    keywords:
      "book formatting services, ebook formatting, Kindle formatting, print book formatting, manuscript formatting",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Book Formatting" },
    ],
    relatedLinks: [
      { href: "/book-cover-design-services", label: "Cover Design" },
      { href: "/amazon-kdp-publishing-services", label: "Amazon KDP" },
      { href: "/professional-book-editing-services", label: "Book Editing" },
    ],
  },
  audiobook: {
    path: "/audiobook-publishing-services",
    serviceSlug: "audiobook-production",
    pageTitle: "Audiobook Publishing Services | Authors Pilot",
    pageDescription:
      "Audiobook publishing services for authors. Learn how to get your book turned into an audiobook and listed on Audible, Apple Books, and other listening platforms.",
    schemaName: "Audiobook Publishing Services",
    serviceType: "Audiobook Publishing",
    h1: "Audiobook Publishing Services",
    keywords:
      "audiobook publishing, publish an audiobook, turn a book into an audiobook, Audible publishing, ACX audiobook",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Audiobook Publishing" },
    ],
    relatedLinks: [
      { href: "/audiobook-production-services-for-authors", label: "Audiobook Production" },
      { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
      { href: "/amazon-kdp-publishing-services", label: "Amazon KDP" },
    ],
  },
  "amazon-kdp-publishing": {
    path: "/amazon-kdp-publishing-services",
    serviceSlug: "book-publishing",
    pageTitle: "Amazon KDP Publishing Services | Authors Pilot",
    pageDescription:
      "Amazon KDP publishing services for Kindle and paperback. We handle files, metadata, and listing setup so your book goes live the right way.",
    schemaName: "Amazon KDP Publishing Services",
    serviceType: "Amazon KDP Publishing",
    h1: "Amazon KDP Publishing Services",
    keywords:
      "Amazon KDP publishing, Kindle publishing services, KDP publishing, self publish on Amazon, Kindle Direct Publishing",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Amazon KDP Publishing" },
    ],
    relatedLinks: [
      { href: "/book-formatting-services-for-authors", label: "Book Formatting" },
      { href: "/book-cover-design-services", label: "Cover Design" },
      { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
    ],
  },
  ghostwriting: {
    path: "/ghostwriting-services-for-authors",
    serviceSlug: "ghostwriting",
    pageTitle: "Ghostwriting Services for Authors | Authors Pilot",
    pageDescription:
      "Ghostwriting services for authors. We write the book in your voice - you keep the byline, rights, and royalties.",
    schemaName: "Ghostwriting Services",
    serviceType: "Ghostwriting",
    h1: "Ghostwriting Services for Authors",
    keywords:
      "ghostwriting services, book ghostwriting, professional ghostwriters, nonfiction ghostwriting",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Ghostwriting" },
    ],
    relatedLinks: [
      { href: "/book-writing-services-for-authors", label: "Book Writing" },
      { href: "/professional-book-editing-services", label: "Book Editing" },
      { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
    ],
  },
  "author-website-design-usa": {
    path: "/author-website-design-agency-usa",
    serviceSlug: "author-website-design",
    pageTitle: "Author Website Design Agency USA | Authors Pilot",
    pageDescription:
      "Author website design agency in the USA. Custom author sites built around your books, with a free mockup you can review before you pay.",
    schemaName: "Author Website Design Services",
    serviceType: "Author Website Design",
    h1: "Author Branding - Websites Built to Sell Your Books",
    keywords:
      "author website design agency USA, author website designer, author website mockup, writer website design",
    breadcrumbs: [
      { label: "Home", href: "/book-publishing-author-website-design-agency" },
      { label: "Author Website Design USA" },
    ],
    relatedLinks: [
      { href: "/book-marketing-services-for-authors", label: "Book Marketing" },
      { href: "/book-cover-design-services", label: "Cover Design" },
      { href: "/contact-author-website-design-agency", label: "Free Website Mockup" },
    ],
  },
} as const satisfies Record<string, SeoPage>;

export const seoPagePaths = Object.values(seoPages).map((page) => page.path);
