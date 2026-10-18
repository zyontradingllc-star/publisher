export const royalPackages = [
  {
    id: "standard",
    eyebrow: "Starter",
    title: "Starter Package",
    description: "Everything you need to write, polish and prepare your book.",
    featured: false,
    cta: "Choose Standard",
    features: [
      "Professional Review & Insights",
      "Outline Discussion & Finalization",
      "Complete Manuscript Writing/Editing",
      "Creative Author Introduction",
      "Professional Formatting & Typesetting",
      "Unlimited Images/Photos",
      "Full Content Ownership",
      "Unlimited Revisions",
      "Team of 3 Experts",
      "2-3 Months Completion",
      "Personalized Online Portal",
      "24/7 Premium Support",
      "100% Money-Back Guarantee",
    ],
  },
  {
    id: "signature",
    eyebrow: "Most Popular",
    title: "Professional Package",
    description: "Full writing, design & publishing across every major platform.",
    featured: true,
    cta: "Choose Signature",
    features: [
      "Professional Review & Insights",
      "Outline Discussion & Finalization",
      "Complete Manuscript Writing/Editing",
      "Creative Author Introduction",
      "Professional Formatting & Typesetting",
      "Unlimited Images/Photos",
      "Conceptual Cover Design",
      "Publishing on Major Platforms",
      "eBook, Paperback, & Hardcover",
      "Premium Publishing Benefits",
      "Full Content Ownership",
      "Unlimited Revisions",
      "Team of 5 Experts",
      "2-3 Months Completion",
      "Personalized Online Portal",
      "24/7 Premium Support",
      "100% Money-Back Guarantee",
    ],
  },
  {
    id: "elite",
    eyebrow: "All-Inclusive",
    title: "Custom Package",
    description: "The complete best-seller engine, publishing plus marketing.",
    featured: false,
    cta: "Choose Elite",
    features: [
      "Professional Review & Insights",
      "Outline Discussion & Finalization",
      "Complete Manuscript Writing/Editing",
      "Creative Author Introduction",
      "Professional Formatting & Typesetting",
      "Unlimited Images/Photos",
      "Conceptual Cover Design",
      "Publishing on Major Platforms",
      "eBook, Paperback, & Hardcover",
      "Setting Up POD and Free Shipping Worldwide",
      "Full Content Ownership",
      "Strategic Marketing Plan",
      "Interactive Author Website",
      "Social Media Marketing",
      "Video Teasers & Trailers",
      "Book Launch Planning & Strategy",
      "Unlimited Revisions",
      "Team of 7 Experts",
      "Personalized Online Portal",
      "24/7 Premium Support",
      "100% Money-Back Guarantee",
    ],
  },
] as const;

export const packageComparison = [
  {
    feature: "Manuscript Writing & Editing",
    standard: true,
    signature: true,
    elite: true,
  },
  {
    feature: "Professional Formatting & Typesetting",
    standard: true,
    signature: true,
    elite: true,
  },
  {
    feature: "Unlimited Revisions & Full Ownership",
    standard: true,
    signature: true,
    elite: true,
  },
  {
    feature: "Conceptual Cover Design",
    standard: false,
    signature: true,
    elite: true,
  },
  {
    feature: "Publishing on Major Platforms",
    standard: false,
    signature: true,
    elite: true,
  },
  {
    feature: "eBook, Paperback & Hardcover",
    standard: false,
    signature: true,
    elite: true,
  },
  {
    feature: "POD & Free Worldwide Shipping",
    standard: false,
    signature: false,
    elite: true,
  },
  {
    feature: "Strategic Marketing Plan",
    standard: false,
    signature: false,
    elite: true,
  },
  {
    feature: "Interactive Author Website",
    standard: false,
    signature: false,
    elite: true,
  },
  {
    feature: "Social Media & Video Trailers",
    standard: false,
    signature: false,
    elite: true,
  },
  {
    feature: "Guaranteed Bestseller & ROI",
    standard: false,
    signature: false,
    elite: true,
  },
] as const;

export const packageTestimonials = [
  {
    quote: "They treated my life story with real care. The cover still makes me cry.",
    name: "Sofia Okafor",
    role: "Memoirist",
    photo: "/reviews/sofia.webp",
    rating: 5 as const,
  },
  {
    quote: "Three rounds of concepts, zero pressure, a cover that out-designs the big five.",
    name: "Kwame Nash",
    role: "Sci-Fi Author",
    photo: "/reviews/kwame.webp",
    rating: 5 as const,
  },
  {
    quote: "My pre-orders doubled the week I swapped to the Authors Pilot cover.",
    name: "Rachel Bishop",
    role: "Mystery Author",
    photo: "/reviews/rachel.webp",
    rating: 4.5 as const,
  },
  {
    quote: "Print files, eBook files, social mockups — all flawless and on time.",
    name: "Liam Frost",
    role: "Fantasy Author",
    photo: "/reviews/liam.webp",
    rating: 5 as const,
  },
  {
    quote: "The most painless publishing experience I've ever had. Truly author-first.",
    name: "Naomi Bloom",
    role: "Romance Author",
    photo: "/reviews/naomi.webp",
    rating: 4.5 as const,
  },
  {
    quote: "The marketing team got me onto three best-seller lists in 60 days.",
    name: "Theo Vale",
    role: "Thriller Author",
    photo: "/reviews/theo.webp",
    rating: 5 as const,
  },
] as const;

export const packageFaq = [
  {
    question: "What exactly does a publisher do for me?",
    answer:
      "Authors Pilot handles everything between your finished idea and a book readers can buy: cover design, editing, formatting, ISBN, distribution to Amazon and global retailers, and optional marketing. You stay the author and owner — we're the team that makes it real.",
  },
  {
    question: "Why does a book cover matter so much?",
    answer:
      "Readers judge a book by its cover in a second. A strong cover wins the click, the shelf glance, and the buy. We design for your genre so the book looks like it belongs — and still stands out.",
  },
  {
    question: "How much does it cost to publish with Authors Pilot?",
    answer:
      "Packages are scoped to the work your book actually needs. Standard, Signature, and Elite tiers cover writing through publishing and marketing. After a free consultation we'll recommend the right path — with no obligation until you're ready.",
  },
  {
    question: "Do I keep my rights and royalties?",
    answer:
      "Yes. You keep 100% of your rights and royalties. We don't take ownership of your work — you remain the author, and every cent of royalties stays yours.",
  },
  {
    question: "Can you help authors in the USA and worldwide?",
    answer:
      "Yes. Authors across the USA, UK, Europe, and beyond work with us. Dedicated account managers stay in your time zone, and your book gets the same standard wherever you write from.",
  },
  {
    question: "How fast is cover turnaround?",
    answer:
      "Cover concepts typically start in the first project phase once the brief and references are in. Exact dates depend on the package; we'll map the timeline clearly before work begins.",
  },
] as const;
