import type { ServiceSeoSlug } from "@/lib/service-page-seo";

export type ServiceAiContent = {
  h1: string;
  shortAnswer: string;
  whatWeOffer: {
    heading: string;
    items: string[];
  };
  whoWeHelp: {
    heading: string;
    items: string[];
  };
  process: {
    heading: string;
    steps: string[];
  };
  whyAuthorsPilot: {
    heading: string;
    proof: string[];
  };
  imageAlt: string;
};

export const serviceAiContent: Record<ServiceSeoSlug, ServiceAiContent> = {
  "book-cover-design": {
    h1: "Book Cover Design Services",
    shortAnswer:
      "Authors Pilot provides custom book cover design for authors publishing fiction, nonfiction, ebooks and print books.",
    whatWeOffer: {
      heading: "Genres We Design For",
      items: [
        "Fiction book covers",
        "Nonfiction book covers",
        "eBook cover design",
        "Paperback and hardcover covers",
        "Amazon KDP covers",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "First-time authors",
        "Self-published authors",
        "Fiction authors",
        "Nonfiction authors",
      ],
    },
    process: {
      heading: "Our Design Process",
      steps: [
        "Manuscript and genre review",
        "Creative direction",
        "Initial concepts",
        "Revisions",
        "Final publishing-ready files",
      ],
    },
    whyAuthorsPilot: {
      heading: "Portfolio / Examples",
      proof: [
        "Genre-aware cover concepts built for your target reader",
        "Files prepared for eBook, paperback, hardcover and Amazon KDP",
        "Collaborative revisions with clear creative direction",
        "Publishing support from a team that works with authors worldwide",
      ],
    },
    imageAlt: "Professional book cover design services",
  },
  "book-writing": {
    h1: "Book Writing Services for Authors",
    shortAnswer:
      "Authors Pilot helps authors turn ideas, notes and outlines into structured, readable manuscripts for fiction and nonfiction books.",
    whatWeOffer: {
      heading: "What We Offer",
      items: [
        "Book writing support",
        "Manuscript development",
        "Chapter structuring",
        "Voice and tone development",
        "Revision support",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "First-time authors",
        "Entrepreneurs and experts",
        "Memoir writers",
        "Fiction and nonfiction authors",
      ],
    },
    process: {
      heading: "Our Process",
      steps: [
        "Idea and goal discovery",
        "Outline and chapter planning",
        "Manuscript drafting",
        "Revisions and refinement",
        "Publication-ready manuscript delivery",
      ],
    },
    whyAuthorsPilot: {
      heading: "Why Authors Pilot",
      proof: [
        "Writing support built around your voice and audience",
        "Clear structure from first idea to finished draft",
        "Experience supporting self-published and independent authors",
        "One team for writing, editing, design and publishing",
      ],
    },
    imageAlt: "Professional book writing services",
  },
  "self-publishing": {
    h1: "Self-Publishing Services for Authors",
    shortAnswer:
      "Authors Pilot provides self publishing support for authors who want to publish independently with professional writing, editing, design and publishing guidance.",
    whatWeOffer: {
      heading: "Platforms We Publish To",
      items: [
        "Amazon KDP",
        "IngramSpark and print-on-demand",
        "Apple Books, Kobo, and wide retailers",
        "Library and distribution networks",
        "Author launch support",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "Independent authors",
        "First-time publishers",
        "Business and expert authors",
        "Authors publishing on Amazon KDP",
      ],
    },
    process: {
      heading: "Our Self-Publishing Process",
      steps: [
        "Project review and publishing goals",
        "Manuscript and production planning",
        "Design and formatting preparation",
        "Publishing setup guidance",
        "Launch and next-step support",
      ],
    },
    whyAuthorsPilot: {
      heading: "Why Choose Assisted Self-Publishing",
      proof: [
        "End-to-end support from manuscript to marketplace",
        "Authors keep rights and royalties",
        "Practical guidance for Amazon KDP and major platforms",
        "One partner for writing, editing, covers and publishing",
      ],
    },
    imageAlt: "Self publishing services for authors",
  },
  "book-editing": {
    h1: "Professional Book Editing Services",
    shortAnswer:
      "Authors Pilot provides book editing services that improve clarity, structure and readability while protecting the author's voice.",
    whatWeOffer: {
      heading: "Types of Editing We Offer",
      items: [
        "Developmental Editing",
        "Copyediting",
        "Proofreading",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "First-time authors",
        "Self-published authors",
        "Business and nonfiction writers",
        "Authors preparing for publication",
      ],
    },
    process: {
      heading: "Our Editing Process",
      steps: [
        "Manuscript review",
        "Editing scope and goals",
        "Editorial refinement",
        "Author review and revisions",
        "Publication-ready manuscript handoff",
      ],
    },
    whyAuthorsPilot: {
      heading: "Why Authors Pilot",
      proof: [
        "Editing focused on clarity without losing your voice",
        "Support for rough drafts and near-finished manuscripts",
        "Editorial process aligned with publishing goals",
        "Integrated path to formatting, design and publishing",
      ],
    },
    imageAlt: "Professional book editing services",
  },
  "book-formatting": {
    h1: "Book Formatting Services for Authors",
    shortAnswer:
      "Authors Pilot prepares manuscripts with professional eBook and print formatting for Kindle, Amazon KDP and major publishing platforms.",
    whatWeOffer: {
      heading: "Print & Ebook Formatting",
      items: [
        "eBook formatting",
        "Print book formatting",
        "Kindle formatting",
        "Amazon KDP file preparation",
        "Chapter and typography layout",
      ],
    },
    whoWeHelp: {
      heading: "Platforms We Format For",
      items: [
        "Amazon KDP and Kindle",
        "IngramSpark and print-on-demand",
        "Apple Books and Kobo",
        "Paperback and hardcover interiors",
      ],
    },
    process: {
      heading: "Our Formatting Process",
      steps: [
        "Manuscript and format review",
        "Layout and typography setup",
        "Platform-specific formatting",
        "Quality review",
        "Publishing-ready file delivery",
      ],
    },
    whyAuthorsPilot: {
      heading: "Why Authors Pilot",
      proof: [
        "Clean layouts built for professional reading experiences",
        "Formatting aligned with retailer and printer requirements",
        "Support for both digital and print editions",
        "Smooth handoff to cover design and publishing steps",
      ],
    },
    imageAlt: "Professional book formatting services",
  },
  audiobook: {
    h1: "Audiobook Publishing Services",
    shortAnswer:
      "Audiobook publishing is how a finished book reaches listeners on Audible, Apple Books, and other audio platforms - from rights and files to listing and distribution.",
    whatWeOffer: {
      heading: "What Is Audiobook Publishing?",
      items: [
        "Turning a finished manuscript or print book into a listenable edition",
        "Preparing rights, metadata, and retailer-ready audio files",
        "Listing your title on Audible, Amazon, Apple Books, and more",
        "Keeping print, eBook, and audio discoverable as one author brand",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "Self-published authors",
        "Fiction and nonfiction authors",
        "Authors expanding to audio",
        "Publishers building audio catalogs",
      ],
    },
    process: {
      heading: "How to Get Your Book Turned Into an Audiobook",
      steps: [
        "Review the manuscript and audio publishing goals",
        "Choose narration and a production path",
        "Record, edit, and master to platform specs",
        "Package files and metadata for retailers",
        "Publish and distribute to listening platforms",
      ],
    },
    whyAuthorsPilot: {
      heading: "Why Authors Pilot",
      proof: [
        "Publishing support for Audible, ACX and major audio platforms",
        "A clear path from finished book to listener-ready listing",
        "One partner for book, audio, and author brand",
        "Production details live on our audiobook production page",
      ],
    },
    imageAlt: "Audiobook publishing services for authors",
  },
  "amazon-kdp-publishing": {
    h1: "Amazon KDP Publishing Services",
    shortAnswer:
      "Authors Pilot helps authors prepare manuscripts, covers and files for publishing on Amazon Kindle Direct Publishing.",
    whatWeOffer: {
      heading: "KDP vs Other Platforms",
      items: [
        "Amazon KDP for Kindle and print-on-demand",
        "Kindle eBook preparation",
        "Paperback publishing support",
        "When to stay Amazon-only vs go wide",
        "Metadata and launch planning",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "First-time KDP authors",
        "Self-published authors",
        "Fiction and nonfiction authors",
        "Authors moving from manuscript to live book",
      ],
    },
    process: {
      heading: "How We Handle Your KDP Publishing",
      steps: [
        "Publishing goal review",
        "Formatting and cover preparation",
        "KDP file and metadata setup",
        "Pre-launch review",
        "Publication support",
      ],
    },
    whyAuthorsPilot: {
      heading: "Pricing & Process",
      proof: [
        "Practical KDP guidance for Kindle and print editions",
        "Support across writing, editing, formatting and cover design",
        "Authors retain full rights and royalties",
        "Clear steps for first-time and experienced publishers",
      ],
    },
    imageAlt: "Amazon KDP publishing services",
  },
  ghostwriting: {
    h1: "Ghostwriting Services for Authors",
    shortAnswer:
      "Authors Pilot provides ghostwriting services that help authors publish books under their own name with support for research, outlining, drafting and revision.",
    whatWeOffer: {
      heading: "Genres & Book Types We Cover",
      items: [
        "Book ghostwriting",
        "Nonfiction ghostwriting",
        "Memoir writing support",
        "Business and thought-leadership books",
        "Voice-matched manuscript development",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "Entrepreneurs and experts",
        "Memoir authors",
        "Busy professionals with a story to tell",
        "Authors who need writing support",
      ],
    },
    process: {
      heading: "How Our Ghostwriting Process Works",
      steps: [
        "Discovery and interviews",
        "Outline and chapter planning",
        "Ghostwritten drafting",
        "Author review and revisions",
        "Final manuscript delivery",
      ],
    },
    whyAuthorsPilot: {
      heading: "Confidentiality & Ownership",
      proof: [
        "Your name stays on the cover while we help build the manuscript",
        "Work-for-hire terms so you own the copyright after final payment",
        "Confidential interviews, drafts, and project files",
        "Publishing support available after the manuscript is complete",
      ],
    },
    imageAlt: "Professional ghostwriting services",
  },
  "author-website-design-usa": {
    h1: "Author Branding - Websites Built to Sell Your Books",
    shortAnswer:
      "Authors Pilot designs professional author websites for writers in the United States - including a free website mockup, book pages, and a clear path for readers to find and buy your work.",
    whatWeOffer: {
      heading: "What's Included in Your Author Website",
      items: [
        "Custom author website design",
        "Free author website mockup",
        "Book and series pages",
        "About, press, and contact pages",
        "Mobile-ready, launch-ready sites",
      ],
    },
    whoWeHelp: {
      heading: "Who We Help",
      items: [
        "USA fiction and nonfiction authors",
        "Self-published and hybrid authors",
        "First-time authors launching a book",
        "Established authors refreshing their brand",
      ],
    },
    process: {
      heading: "Our Website Design Process",
      steps: [
        "Share your books, brand, and goals",
        "Receive a free author website mockup",
        "Refine layout, pages, and messaging",
        "Build the live site",
        "Launch with book links and contact paths",
      ],
    },
    whyAuthorsPilot: {
      heading: "Pricing & Packages",
      proof: [
        "Built for authors, not generic business templates",
        "Free website mockup before you commit",
        "Designed to sell books and grow your mailing list",
        "USA-focused support from a publishing team",
      ],
    },
    imageAlt: "Author website design for writers in the USA",
  },
};
