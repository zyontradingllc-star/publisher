import type { DiyGuide } from "./types";

/**
 * Pilot + Expand free DIY / listing guides only.
 * Do not add Phase 2 / backlog URLs until content is unique and live.
 */
export const diyGuides: DiyGuide[] = [
  {
    slug: "publish-book-for-free",
    title: "How to Publish a Book for Free",
    seoTitle: "How To Publish A Book For Free | Authors Pilot",
    metaDescription:
      "Learn how to publish a book for free on major platforms: what is truly free, what still costs money, and a step-by-step DIY path without paid packages.",
    primaryKeyword: "how to publish a book for free",
    intent: "diy",
    shortAnswer:
      "You can publish a book for free on platforms like Amazon KDP, Kobo Writing Life, Apple Books, and Lulu by uploading your own files. Account setup is usually free, but editing, design, ISBNs for wide print distribution, and print copies are not always free.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      {
        href: "https://kdp.amazon.com/en_US/help/topic/G200672390",
        label: "Amazon KDP Help - Getting Started",
      },
      {
        href: "https://www.kobo.com/us/en/p/writinglife",
        label: "Kobo Writing Life",
      },
    ],
    relatedGuideSlugs: [
      "free-self-publishing-platforms",
      "publish-on-amazon-kdp-for-free",
      "publish-ebook-for-free",
    ],
    relatedBlogSlugs: [
      "how-to-self-publish-a-book",
      "how-to-publish-a-book",
      "how-much-does-it-cost-to-publish-a-book",
    ],
    sections: [
      {
        id: "who-this-is-for",
        heading: "Who this free publishing path is for",
        level: 2,
        paragraphs: [
          "This guide is for authors who want a do-it-yourself route: you write or finish the manuscript, prepare files yourself (or with free tools), and upload directly to a retailer. It is not a paid package and it does not replace professional editing or design if your book needs that quality bar.",
          "If you already know you want a full publishing service, see our [self-publishing services](/self-publishing-services-for-authors/) separately - that is paid work, not free DIY publishing.",
        ],
      },
      {
        id: "truly-free-vs-costs",
        heading: "What is truly free vs what still costs money",
        level: 2,
        paragraphs: [
          "Most major self-publishing platforms do not charge an upfront fee to create an account or list an ebook. That is the “free” part people mean when they search how to publish a book for free.",
          "You may still pay for: developmental or copy editing, cover design, formatting help, a purchased ISBN, author copies, paid ads, and print-on-demand manufacturing (deducted from royalties). Free does not mean zero cost if you hire help or order print books.",
        ],
        bullets: [
          "Usually free: retailer account, ebook listing, platform-assigned identifiers (for example Amazon ASIN)",
          "Often not free: editing, custom cover art, wide-distribution ISBN, print copies, advertising",
        ],
      },
      {
        id: "step-by-step",
        heading: "Step-by-step: publish for free yourself",
        level: 2,
        paragraphs: [
          "Finish a readable manuscript. Use free spelling and grammar tools for a first pass, then decide honestly whether you need a paid editor before readers judge the book.",
          "Prepare a cover that meets retailer size rules and an interior file (EPUB for most ebook stores; print-ready PDF for paperbacks). Free tools can work for simple projects; complex layouts may need paid formatting.",
          "Create accounts on the platforms you choose - start with one store if you are new - then upload files, write metadata (title, description, categories, keywords), set a price, and submit for review.",
        ],
        bullets: [
          "Pick one primary store first (many authors start with [Amazon KDP for free](/publish-on-amazon-kdp-for-free/))",
          "Add a second channel later ([Kobo](/publish-on-kobo-for-free/), [Apple Books](/publish-on-apple-books-for-free/), or [Lulu](/publish-on-lulu-for-free/))",
          "Keep rights clear: you remain the publisher of record on DIY platforms",
        ],
      },
      {
        id: "after-you-publish",
        heading: "After you hit publish",
        level: 2,
        paragraphs: [
          "Retailer review can take hours to a few days. Then focus on discoverability: a clear description, honest categories, and free promotion ideas such as your email list and [ethical promotion tactics](/promote-your-book-for-free/).",
          "You can also [list your published book for free discovery on Authors Pilot](/free-book-listing/) once it is live elsewhere - listing is not the same as paid publishing production.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I really publish a book with no money at all?",
        answer:
          "Yes, if you do the writing, basic cover, and formatting yourself and upload to a free-to-list platform. You still need a computer, internet access, and time. Print copies and optional professional services cost money.",
      },
      {
        question: "Is free self-publishing the same as traditional publishing?",
        answer:
          "No. Traditional publishing pays advances and handles production through a publisher. Free DIY self-publishing means you upload and keep control of rights and royalties, while you also own the quality and marketing work.",
      },
      {
        question: "Should I publish everywhere on day one?",
        answer:
          "Not required. Many first-time authors publish on one store, learn the dashboard, then expand. Going wide too early can multiply file and metadata mistakes.",
      },
    ],
    diyCta: {
      heading: "Compare free platforms next",
      text: "See which free self-publishing platforms fit your ebook or print goals before you upload.",
      href: "/free-self-publishing-platforms/",
      label: "Free Self-Publishing Platforms",
    },
    paidNote: {
      heading: "Need production help instead?",
      text: "Authors Pilot offers paid editing, cover, formatting, and publishing support. That is separate from this free DIY guide.",
      href: "/self-publishing-services-for-authors/",
      label: "View Paid Services",
    },
  },
  {
    slug: "publish-on-amazon-kdp-for-free",
    title: "Publish on Amazon KDP for Free",
    seoTitle: "Publish On Amazon KDP For Free | Authors Pilot",
    metaDescription:
      "Publish on Amazon KDP for free: account setup, ebook vs paperback, file requirements, royalties, and what KDP does not cover for free.",
    primaryKeyword: "publish on amazon kdp for free",
    intent: "diy",
    shortAnswer:
      "Amazon KDP does not charge upfront fees to publish an ebook or paperback. You upload files, set pricing, and KDP takes a royalty share and print costs when books sell. Editing, design, and ads are separate costs you may choose.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      {
        href: "https://kdp.amazon.com/",
        label: "Amazon Kindle Direct Publishing",
      },
      {
        href: "https://kdp.amazon.com/en_US/help/topic/G200672390",
        label: "KDP Help Center",
      },
    ],
    relatedGuideSlugs: [
      "publish-book-for-free",
      "publish-ebook-for-free",
      "free-self-publishing-platforms",
    ],
    relatedBlogSlugs: ["how-to-publish-on-amazon-kdp", "how-to-self-publish-a-book"],
    sections: [
      {
        id: "is-kdp-free",
        heading: "Is Amazon KDP free to use?",
        level: 2,
        paragraphs: [
          "Creating a KDP account and publishing titles does not require an upfront listing fee. That is why authors search for publish on Amazon KDP for free.",
          "KDP earns money when your book sells: ebook royalty rates depend on list price and territory; paperbacks subtract printing cost before your royalty. Expanded distribution and ads have their own rules - read Amazon’s current help pages before you launch.",
        ],
      },
      {
        id: "ebook-vs-paperback",
        heading: "Ebook vs paperback on KDP",
        level: 2,
        paragraphs: [
          "Ebooks need a reflowable manuscript (often EPUB or a clean Word file KDP can convert) plus a cover image that meets KDP’s pixel guidelines.",
          "Paperbacks need a print-ready interior PDF at your trim size and a full wrap cover PDF. Free DIY is possible, but print specs are less forgiving than ebook uploads.",
        ],
        bullets: [
          "Start with ebook if you want the fastest free path",
          "Add paperback after your interior and cover match trim rules",
          "Use KDP’s free ISBN option for paperbacks if you do not need your own imprint ISBN",
        ],
      },
      {
        id: "kdp-steps",
        heading: "DIY steps to publish on KDP",
        level: 2,
        paragraphs: [
          "Sign in at KDP, complete tax and payment information so royalties can be paid, then create a new ebook or paperback title.",
          "Enter metadata carefully - title, subtitle, description, keywords, and categories drive search. Upload manuscript and cover, set territories and pricing, then submit for KDP review.",
          "For a deeper walkthrough that overlaps this topic, see our blog guide [How to Publish on Amazon KDP](/blog/how-to-publish-on-amazon-kdp/). This page focuses on the free-cost framing and realistic caveats.",
        ],
      },
      {
        id: "kdp-caveats",
        heading: "Common free-KDP mistakes",
        level: 2,
        paragraphs: [
          "Uploading an unedited manuscript can damage reviews. A free listing does not fix quality issues.",
          "Low-resolution covers, wrong trim sizes, and keyword stuffing can delay approval or hurt conversion. Follow Amazon’s current file guidelines rather than third-party rumors.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does KDP take my rights?",
        answer:
          "You grant Amazon a license to sell the book while you publish there. You keep copyright. Exclusive programs like KDP Select have extra terms - read them before enrolling.",
      },
      {
        question: "Do I need an ISBN for a Kindle ebook?",
        answer:
          "No. KDP assigns an ASIN for Kindle ebooks. Paperbacks can use a free KDP ISBN or your own purchased ISBN.",
      },
    ],
    diyCta: {
      heading: "Ready for another free channel?",
      text: "After KDP, many authors add Kobo or Apple Books without upfront listing fees.",
      href: "/publish-on-kobo-for-free/",
      label: "Publish on Kobo for Free",
    },
    paidNote: {
      heading: "Want help with KDP files?",
      text: "Our paid Amazon KDP publishing services cover formatting and setup if you prefer not to DIY.",
      href: "/amazon-kdp-publishing-services/",
      label: "KDP Publishing Services",
    },
  },
  {
    slug: "publish-on-kobo-for-free",
    title: "Publish on Kobo for Free",
    seoTitle: "Publish On Kobo For Free | Authors Pilot",
    metaDescription:
      "Publish on Kobo Writing Life for free: account setup, EPUB and cover tips, pricing, and how Kobo fits beside Amazon KDP.",
    primaryKeyword: "publish on kobo for free",
    intent: "diy",
    shortAnswer:
      "Kobo Writing Life lets authors publish ebooks without an upfront listing fee. You upload an EPUB and cover, set pricing and territories, then earn royalties when readers buy. File prep and optional editing are still your responsibility.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      {
        href: "https://www.kobo.com/us/en/p/writinglife",
        label: "Kobo Writing Life overview",
      },
    ],
    relatedGuideSlugs: [
      "publish-book-for-free",
      "publish-on-amazon-kdp-for-free",
      "free-self-publishing-platforms",
    ],
    relatedBlogSlugs: ["how-to-self-publish-a-book", "how-to-publish-on-amazon-kdp"],
    sections: [
      {
        id: "why-kobo",
        heading: "Why authors add Kobo",
        level: 2,
        paragraphs: [
          "Kobo reaches readers outside the Amazon-only bubble, especially in Canada and other international markets. Publishing on Kobo for free (no upfront fee) is a common second-channel step after KDP.",
          "If you enrolled in exclusive programs elsewhere, check those terms before going wide on Kobo.",
        ],
      },
      {
        id: "kobo-files",
        heading: "EPUB and cover requirements",
        level: 2,
        paragraphs: [
          "Kobo expects a valid EPUB for the manuscript and a high-quality cover image. Validate your EPUB before upload to avoid conversion errors.",
          "Keep typography simple for reflowable fiction and narrative nonfiction. Complex fixed-layout books need extra testing on Kobo devices and apps.",
        ],
        bullets: [
          "Use EPUB rather than a Word-only workflow when possible",
          "Match cover proportions to Kobo’s current guidelines",
          "Proof your sample on a Kobo app after approval",
        ],
      },
      {
        id: "kobo-steps",
        heading: "DIY publish steps on Kobo Writing Life",
        level: 2,
        paragraphs: [
          "Create a Writing Life account, complete payment details, then add a new ebook project with title metadata and description.",
          "Upload EPUB and cover, choose categories and territories, set a price, and submit. Review times vary - plan a soft launch, not a same-hour promo blast.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Kobo Writing Life free?",
        answer:
          "There is no upfront fee to publish through Writing Life. Kobo takes a royalty share on sales. Confirm current rates in your dashboard.",
      },
      {
        question: "Can I publish the same ebook on KDP and Kobo?",
        answer:
          "Yes if you are not locked into an exclusivity program. Keep metadata consistent and update both stores when you revise files.",
      },
    ],
    diyCta: {
      heading: "List your live book for discovery",
      text: "Once your Kobo (or other) edition is live, you can submit a free book listing on Authors Pilot.",
      href: "/free-book-listing/",
      label: "Free Book Listing",
    },
    paidNote: {
      heading: "Need formatting help?",
      text: "Paid book formatting services are available if EPUB prep is blocking your upload.",
      href: "/book-formatting-services-for-authors/",
      label: "Book Formatting Services",
    },
  },
  {
    slug: "free-book-listing",
    title: "Free Book Listing for Authors",
    seoTitle: "Free Book Listing For Authors | Authors Pilot",
    metaDescription:
      "List your already-published book for free on Authors Pilot. Discovery listing is not paid publishing - keep retailer links and control your sales.",
    primaryKeyword: "free book listing for authors",
    intent: "listing",
    shortAnswer:
      "A free book listing helps readers discover a book you already published elsewhere. Authors Pilot does not take a royalty cut on outbound sales - you keep selling on your site or retailers. Listing is not the same as paid ghostwriting or production services.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [],
    relatedGuideSlugs: [
      "promote-your-book-for-free",
      "publish-book-for-free",
      "book-listing-vs-book-publishing",
    ],
    relatedBlogSlugs: ["how-to-self-publish-a-book"],
    sections: [
      {
        id: "what-listing-means",
        heading: "What a free book listing is",
        level: 2,
        paragraphs: [
          "A listing is a discovery page: cover, blurb, author name, and links out to where readers can buy or read. It is built for visibility, not for Authors Pilot to checkout the sale.",
          "You should already have a finished, published (or publish-ready) edition on a retailer or your own site before you rely on listing traffic.",
        ],
      },
      {
        id: "listing-vs-publishing",
        heading: "Listing vs publishing",
        level: 2,
        paragraphs: [
          "Publishing means producing and distributing the book (files, metadata, retailer upload). Listing means showcasing a book that already exists.",
          "If you still need to publish DIY, start with [how to publish a book for free](/publish-book-for-free/). If you want paid production, use our service pages - those are optional and clearly paid.",
        ],
      },
      {
        id: "how-to-submit",
        heading: "How to submit your book",
        level: 2,
        paragraphs: [
          "Use the Authors Pilot publish flow to submit book details. Follow content guidelines, add accurate buy links, and keep your blurb honest.",
          "Launch terms can change during early access - read the on-screen policy before you submit.",
        ],
        bullets: [
          "Have your cover image and description ready",
          "Add working retailer or website links",
          "Do not promise rankings or sales you cannot control",
        ],
      },
    ],
    faqs: [
      {
        question: "Does free listing include editing or a cover?",
        answer:
          "No. Listing is discovery only. Editing, design, and formatting are separate paid services if you choose them.",
      },
      {
        question: "Do you take royalties from my retailer sales?",
        answer:
          "Authors Pilot is built so sales stay on your website or chosen retailers - we do not take a royalty cut on those checkouts.",
      },
    ],
    diyCta: {
      heading: "Submit your published book",
      text: "Start the free listing flow when your edition is ready for readers to find.",
      href: "/publish/",
      label: "Submit Your Book",
    },
    paidNote: {
      heading: "Still finishing the book?",
      text: "If you need paid writing, editing, or design before you can list, browse services separately from this free listing page.",
      href: "/self-publishing-agency-services/",
      label: "Browse Services",
    },
  },
  {
    slug: "promote-your-book-for-free",
    title: "How to Promote Your Book for Free",
    seoTitle: "How To Promote Your Book For Free | Authors Pilot",
    metaDescription:
      "Practical free book promotion ideas: profiles, ethical reviews, social posts, and listings - without paid ads or fake ranking promises.",
    primaryKeyword: "how to promote your book for free",
    intent: "diy",
    shortAnswer:
      "Free book promotion means using owned channels and ethical discovery: author profiles, retailer pages, email, social posts, reader communities, and free listings. It takes consistency. It does not guarantee bestsellers or replace optional paid ads.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [],
    relatedGuideSlugs: ["free-book-listing", "publish-book-for-free"],
    relatedBlogSlugs: ["how-to-self-publish-a-book"],
    sections: [
      {
        id: "free-channels",
        heading: "Free channels that actually help",
        level: 2,
        paragraphs: [
          "Start with assets you control: a clear retailer description, a simple author bio, and one link hub (site or Linktree-style page). Then add a [free book listing](/free-book-listing/) for extra discovery.",
          "Email your existing readers before chasing strangers. A small list beats scattered posts with no call to action.",
        ],
        bullets: [
          "Optimize your Amazon/Kobo/Apple book page copy",
          "Claim retailer author profiles where available",
          "Share a short excerpt legally (your copyright) on your own channels",
        ],
      },
      {
        id: "ethical-reviews",
        heading: "Reviews and social proof - keep it ethical",
        level: 2,
        paragraphs: [
          "Ask genuine readers for honest reviews. Do not buy fake reviews or trade reviews in ways that violate retailer rules.",
          "Advance reader copies can be free to send digitally, but shipping print ARCs costs money - plan accordingly.",
        ],
      },
      {
        id: "weekly-rhythm",
        heading: "A simple weekly free promo rhythm",
        level: 2,
        paragraphs: [
          "Pick two channels you can sustain. Example: one useful post teaching something related to your book’s topic, and one reminder with a direct buy link.",
          "Track clicks, not vanity metrics. If a channel never sends readers to your book page, drop it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I promote a book for free with zero audience?",
        answer:
          "Yes, but growth is slower. Focus on one niche community, improve your book page conversion, and build an email list from day one.",
      },
      {
        question: "Are free promotion websites safe?",
        answer:
          "Some directories are useful; others spammy. Prefer well-known retailer features and sites that do not demand unrealistic exclusivity or upfront “guaranteed bestseller” fees.",
      },
    ],
    diyCta: {
      heading: "Add a free discovery listing",
      text: "When your book is live, submit it for a free Authors Pilot listing.",
      href: "/free-book-listing/",
      label: "Free Book Listing",
    },
    paidNote: {
      heading: "Need a paid marketing push later?",
      text: "Authors Pilot offers paid book marketing services when you are ready for campaigns beyond DIY.",
      href: "/book-marketing-services-for-authors/",
      label: "Book Marketing Services",
    },
  },
  {
    slug: "publish-on-lulu-for-free",
    title: "Publish on Lulu for Free",
    seoTitle: "Publish On Lulu For Free | Authors Pilot",
    metaDescription:
      "Publish on Lulu for free setup: print-on-demand reality, file prep, distribution limits, and how Lulu compares to a pure free ebook path.",
    primaryKeyword: "publish on lulu for free",
    intent: "diy",
    shortAnswer:
      "Lulu lets you create a project without a traditional vanity-press contract. Uploading can be free, but print-on-demand means each copy has a manufacturing cost. Global retail distribution options may include fees or revenue shares - check Lulu’s current docs.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      { href: "https://www.lulu.com/", label: "Lulu" },
      {
        href: "https://www.lulu.com/create/print-books",
        label: "Lulu create print books",
      },
    ],
    relatedGuideSlugs: [
      "publish-book-for-free",
      "publish-on-amazon-kdp-for-free",
      "free-self-publishing-platforms",
    ],
    relatedBlogSlugs: ["how-to-self-publish-a-book", "how-to-format-a-book"],
    sections: [
      {
        id: "lulu-free-reality",
        heading: "What “free” means on Lulu",
        level: 2,
        paragraphs: [
          "Authors often mean no upfront publishing package. You can DIY files and publish without buying a Lulu marketing package.",
          "Printed books still cost money to manufacture. Your list price must cover print cost plus the royalty you want. Ebooks on Lulu follow different rules than print - verify in your project dashboard.",
        ],
      },
      {
        id: "lulu-files",
        heading: "Print-ready files",
        level: 2,
        paragraphs: [
          "Use Lulu’s templates for trim size, margins, and spine width. Export a print-ready PDF interior and cover.",
          "Order a proof copy before a big launch. Proofing is not free (you pay for the copy), but it prevents expensive mistakes.",
        ],
      },
      {
        id: "lulu-when",
        heading: "When Lulu fits your free DIY plan",
        level: 2,
        paragraphs: [
          "Choose Lulu when you want flexible print sizes, workbooks, or photo-heavy books that are awkward on standard KDP trims.",
          "For a simple novel ebook, [KDP](/publish-on-amazon-kdp-for-free/) or [Kobo](/publish-on-kobo-for-free/) may be a faster free path.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Lulu completely free?",
        answer:
          "Project setup can be free, but printing and some distribution paths cost money. Always read Lulu’s current pricing for your product type.",
      },
    ],
    diyCta: {
      heading: "Compare free platforms",
      text: "See how Lulu sits beside KDP, Kobo, and Apple Books.",
      href: "/free-self-publishing-platforms/",
      label: "Free Platforms Guide",
    },
    paidNote: {
      heading: "Need print formatting help?",
      text: "Paid formatting services can prepare print-ready PDFs if DIY templates are blocking you.",
      href: "/book-formatting-services-for-authors/",
      label: "Formatting Services",
    },
  },
  {
    slug: "publish-on-apple-books-for-free",
    title: "Publish on Apple Books for Free",
    seoTitle: "Publish On Apple Books For Free | Authors Pilot",
    metaDescription:
      "Publish on Apple Books for free setup via Apple Books for Authors: EPUB validation, metadata, and payment requirements explained.",
    primaryKeyword: "publish on apple books for free",
    intent: "diy",
    shortAnswer:
      "Apple Books for Authors does not charge an upfront fee to publish an ebook. You need a valid EPUB, cover art, metadata, and a way to receive payment. Apple’s cut applies when the book sells.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      {
        href: "https://authors.apple.com/",
        label: "Apple Books for Authors",
      },
    ],
    relatedGuideSlugs: [
      "publish-ebook-for-free",
      "publish-on-kobo-for-free",
      "free-self-publishing-platforms",
    ],
    relatedBlogSlugs: ["how-to-self-publish-a-book"],
    sections: [
      {
        id: "apple-setup",
        heading: "Account and payment setup",
        level: 2,
        paragraphs: [
          "Sign up through Apple Books for Authors and complete contracts and banking details. Without payment setup, your book cannot earn out.",
          "If Apple’s direct tools feel heavy, some authors use aggregators - those may take an extra fee share. This guide focuses on the free-to-list direct path.",
        ],
      },
      {
        id: "apple-epub",
        heading: "EPUB validation matters",
        level: 2,
        paragraphs: [
          "Apple is strict about valid EPUBs. Run your file through a validator and fix navigation, images, and accessibility basics before upload.",
          "Test your sample on Apple Books apps after approval. Reflow issues that pass one store can still look wrong on Apple.",
        ],
      },
      {
        id: "apple-metadata",
        heading: "Metadata and categories",
        level: 2,
        paragraphs: [
          "Write a clear description, choose accurate categories, and keep your author name consistent across stores so your bibliography stays clean.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Apple Books publishing free?",
        answer:
          "There is no upfront listing fee for standard ebook publishing through Apple Books for Authors. Royalties and tax forms still apply.",
      },
    ],
    diyCta: {
      heading: "Publish your ebook DIY",
      text: "See the broader free ebook publishing checklist before you upload.",
      href: "/publish-ebook-for-free/",
      label: "Publish Ebook for Free",
    },
    paidNote: {
      heading: "Need an EPUB prepared?",
      text: "Paid formatting can deliver a validated EPUB for Apple and other stores.",
      href: "/book-formatting-services-for-authors/",
      label: "Get Formatting Help",
    },
  },
  {
    slug: "publish-ebook-for-free",
    title: "Publish an Ebook for Free",
    seoTitle: "Publish Ebook For Free | Authors Pilot",
    metaDescription:
      "Publish an ebook for free: file formats, store options, pricing basics, and a DIY checklist without paid publishing packages.",
    primaryKeyword: "publish ebook for free",
    intent: "diy",
    shortAnswer:
      "To publish an ebook for free, prepare an EPUB (or store-accepted manuscript), a cover image, and metadata, then upload to stores that do not charge listing fees. You still invest time - and optional paid editing or design if you want higher quality.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      {
        href: "https://kdp.amazon.com/",
        label: "Amazon KDP",
      },
      {
        href: "https://authors.apple.com/",
        label: "Apple Books for Authors",
      },
    ],
    relatedGuideSlugs: [
      "publish-book-for-free",
      "publish-on-amazon-kdp-for-free",
      "publish-on-apple-books-for-free",
      "free-self-publishing-platforms",
    ],
    relatedBlogSlugs: ["how-to-format-a-book", "how-to-self-publish-a-book"],
    sections: [
      {
        id: "ebook-files",
        heading: "Files you need",
        level: 2,
        paragraphs: [
          "Most stores prefer EPUB for wide distribution. Amazon can accept certain Word docs or EPUB uploads - follow current KDP help for accepted formats.",
          "Covers should be high resolution, readable at thumbnail size, and free of stock-photo license problems.",
        ],
      },
      {
        id: "ebook-stores",
        heading: "Where to publish the ebook",
        level: 2,
        paragraphs: [
          "Common free-to-list options include [Amazon KDP](/publish-on-amazon-kdp-for-free/), [Kobo](/publish-on-kobo-for-free/), and [Apple Books](/publish-on-apple-books-for-free/). You can start with one store or go wide.",
          "Exclusivity programs can raise royalties in exchange for limits - read terms before you enroll.",
        ],
      },
      {
        id: "ebook-checklist",
        heading: "Free ebook launch checklist",
        level: 2,
        paragraphs: [
          "Proof the manuscript, export EPUB, validate, upload, price thoughtfully for your genre, and prepare a simple promo post for launch day.",
        ],
        bullets: [
          "Final proofread pass",
          "Validated EPUB + cover",
          "Description and keywords written",
          "Payment/tax info completed on each store",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I publish an ebook for free without ISBN?",
        answer:
          "Often yes for Amazon Kindle (ASIN). Other stores may allow publishing without your own ISBN or provide options - check each platform.",
      },
    ],
    diyCta: {
      heading: "Pick a free store path",
      text: "Compare platforms, then upload your EPUB where it fits best.",
      href: "/free-self-publishing-platforms/",
      label: "Compare Free Platforms",
    },
    paidNote: {
      heading: "Want a polished ebook?",
      text: "Paid editing and formatting are optional upgrades - not required to list an ebook for free.",
      href: "/professional-book-editing-services/",
      label: "Editing Services",
    },
  },
  {
    slug: "free-self-publishing-platforms",
    title: "Free Self-Publishing Platforms",
    seoTitle: "Free Self Publishing Platforms | Authors Pilot",
    metaDescription:
      "Compare free self-publishing platforms: Amazon KDP, Kobo, Apple Books, Lulu, and what “free” includes for ebook and print authors.",
    primaryKeyword: "free self publishing platforms",
    intent: "diy",
    shortAnswer:
      "Leading free self-publishing platforms let you upload without an upfront listing fee. Amazon KDP, Kobo Writing Life, Apple Books, and Lulu are common starting points. Print costs, ads, and professional services are separate.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      { href: "https://kdp.amazon.com/", label: "Amazon KDP" },
      {
        href: "https://www.kobo.com/us/en/p/writinglife",
        label: "Kobo Writing Life",
      },
      { href: "https://authors.apple.com/", label: "Apple Books for Authors" },
      { href: "https://www.lulu.com/", label: "Lulu" },
    ],
    relatedGuideSlugs: [
      "publish-book-for-free",
      "free-book-publishing-websites",
      "publish-ebook-for-free",
    ],
    relatedBlogSlugs: [
      "how-to-self-publish-a-book",
      "self-publishing-vs-traditional-publishing",
    ],
    sections: [
      {
        id: "platform-comparison",
        heading: "Quick comparison",
        level: 2,
        paragraphs: [
          "Amazon KDP: largest ebook marketplace; strong paperback POD; optional exclusivity via KDP Select.",
          "Kobo Writing Life: strong international ebook reach; straightforward EPUB workflow.",
          "Apple Books: premium device ecosystem; strict EPUB validation.",
          "Lulu: flexible print products; watch manufacturing and distribution pricing.",
        ],
      },
      {
        id: "how-to-choose",
        heading: "How to choose your first platform",
        level: 2,
        paragraphs: [
          "If your readers already buy on Amazon, start with [KDP](/publish-on-amazon-kdp-for-free/). If you want non-Amazon reach next, add [Kobo](/publish-on-kobo-for-free/) or [Apple](/publish-on-apple-books-for-free/).",
          "Avoid signing every exclusivity checkbox on day one unless you understand the trade-off.",
        ],
      },
      {
        id: "not-vanity",
        heading: "Free platforms vs paid vanity packages",
        level: 2,
        paragraphs: [
          "Free self-publishing platforms are retailer tools. They are different from expensive packages that sell “publishing” without clear deliverables.",
          "Authors Pilot paid services are optional production help - never required to use KDP, Kobo, Apple, or Lulu yourself.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which free self-publishing platform is best?",
        answer:
          "There is no single best store. Match the platform to where your readers shop, your file type (ebook vs print), and whether you need exclusivity flexibility.",
      },
    ],
    diyCta: {
      heading: "Start with a free publish walkthrough",
      text: "Follow the general free publishing steps, then open the platform-specific guide you chose.",
      href: "/publish-book-for-free/",
      label: "Publish a Book for Free",
    },
    paidNote: {
      heading: "Prefer a done-with-you path?",
      text: "Explore paid self-publishing services only if you want a team on production - not required for DIY platforms.",
      href: "/self-publishing-services-for-authors/",
      label: "Self-Publishing Services",
    },
  },
  {
    slug: "free-book-publishing-websites",
    title: "Free Book Publishing Websites",
    seoTitle: "Free Book Publishing Websites | Authors Pilot",
    metaDescription:
      "Free book publishing websites explained: retailer dashboards vs directories vs listing sites, and how to avoid thin duplicate “publishing” pages.",
    primaryKeyword: "free book publishing websites",
    intent: "diy",
    shortAnswer:
      "Free book publishing websites usually means retailer portals (KDP, Kobo, Apple, Lulu) where you upload without an upfront fee. Directory or listing sites help discovery but do not replace uploading your ebook or print files to a store.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [
      { href: "https://kdp.amazon.com/", label: "Amazon KDP" },
      { href: "https://authors.apple.com/", label: "Apple Books for Authors" },
    ],
    relatedGuideSlugs: [
      "free-self-publishing-platforms",
      "publish-book-for-free",
      "free-book-listing",
    ],
    relatedBlogSlugs: ["how-to-publish-a-book", "how-to-self-publish-a-book"],
    sections: [
      {
        id: "types-of-sites",
        heading: "Three kinds of “publishing websites”",
        level: 2,
        paragraphs: [
          "Retailer publishers: you upload files and sell (KDP, Kobo, Apple, Lulu). These are the real free publishing websites for DIY authors.",
          "Aggregators: one dashboard to many stores - sometimes free to start, with a fee share.",
          "Listing and directory sites: discovery only - including [Authors Pilot free book listing](/free-book-listing/).",
        ],
      },
      {
        id: "how-to-evaluate",
        heading: "How to evaluate a free publishing website",
        level: 2,
        paragraphs: [
          "Ask: Do I keep my rights? Is there an upfront fee? Where do sales checkout? Are royalties transparent? Is support documentation official and current?",
          "Be cautious of sites that only collect manuscripts without a clear retailer path, or that blur free DIY with expensive upsells.",
        ],
      },
      {
        id: "recommended-path",
        heading: "A practical free path",
        level: 2,
        paragraphs: [
          "Use a [free self-publishing platform](/free-self-publishing-platforms/) to publish, then promote with [free tactics](/promote-your-book-for-free/) and optional discovery listings.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are free book publishing websites safe?",
        answer:
          "Major retailers are established. Unknown sites that demand large upfront fees or exclusive rights without clear distribution should be researched carefully.",
      },
    ],
    diyCta: {
      heading: "See free platforms side by side",
      text: "Compare the main free-to-list retailer dashboards before you create accounts.",
      href: "/free-self-publishing-platforms/",
      label: "Free Self-Publishing Platforms",
    },
    paidNote: {
      heading: "Optional paid production",
      text: "If a website upsells editing or design, compare those offers to transparent service pages - including ours - before you pay.",
      href: "/self-publishing-agency-services/",
      label: "Authors Pilot Services",
    },
  },
  {
    slug: "book-listing-vs-book-publishing",
    title: "Book Listing vs Book Publishing",
    seoTitle: "Book Listing Vs Book Publishing | Authors Pilot",
    metaDescription:
      "Clear difference between a free book listing and book publishing: discovery pages vs producing and distributing your book.",
    primaryKeyword: "book listing vs book publishing",
    intent: "listing",
    shortAnswer:
      "Publishing produces and distributes the book. A listing showcases a book that already exists so readers can find buy links. Authors Pilot free listing is discovery - not a substitute for uploading to KDP, Kobo, Apple, or another publisher of record.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    officialLinks: [],
    relatedGuideSlugs: [
      "free-book-listing",
      "publish-book-for-free",
      "promote-your-book-for-free",
    ],
    relatedBlogSlugs: ["how-to-publish-a-book", "how-to-self-publish-a-book"],
    sections: [
      {
        id: "definitions",
        heading: "Plain definitions",
        level: 2,
        paragraphs: [
          "Book publishing: editing decisions, files, identifiers, retailer upload, and ongoing edition updates.",
          "Book listing: a public page with metadata and outbound links for discovery and promotion.",
        ],
      },
      {
        id: "when-each",
        heading: "When you need each",
        level: 2,
        paragraphs: [
          "Need publishing if the book is not for sale anywhere yet - start with [publish a book for free](/publish-book-for-free/).",
          "Need listing if the book is already live and you want more discovery - use [free book listing](/free-book-listing/).",
        ],
      },
      {
        id: "avoid-confusion",
        heading: "Avoid mixed marketing claims",
        level: 2,
        paragraphs: [
          "Do not treat a directory submission as “I’ve been published by a house.” DIY retailer publishing still makes you the publisher of record.",
          "Paid Authors Pilot services help with production; free listing helps with visibility after (or alongside) that work.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can listing replace KDP?",
        answer:
          "No. Readers still need a place to buy or read the book. Listing points to those places.",
      },
    ],
    diyCta: {
      heading: "Choose your next step",
      text: "Publish first if you lack a live edition. List when buy links exist.",
      href: "/free-book-listing/",
      label: "Free Book Listing",
    },
  },
];

export const diyGuideSlugs = diyGuides.map((g) => g.slug);

export function getDiyGuide(slug: string): DiyGuide | undefined {
  return diyGuides.find((g) => g.slug === slug);
}

export function getAllDiyGuides(): DiyGuide[] {
  return diyGuides;
}
