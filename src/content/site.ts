/**
 * Authors Pilot — complete website copy.
 */

export const brand = {
  name: "Authors Pilot",
  tagline: "Pilot Your Story. Self-Publishing Story System.",
  email: "hello@authorspilot.com",
  phone: "+1 (364) 421-2554",
  phoneAlt: "+1 (437) 889-4563",
};

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/authorspilot",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/authorspilot",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/authorspilot",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@authorspilot",
    icon: "youtube",
  },
] as const;

export const navLinks = [
  { href: "/book-publishing-author-website-design-agency", label: "Home" },
  { href: "/book-writing-services-for-authors", label: "Write" },
  { href: "/self-publishing-agency-services", label: "Prepare" },
  { href: "/book-publishing-services-for-authors", label: "Publish" },
  { href: "/audiobook-production-services-for-authors", label: "Audiobooks" },
  { href: "/book-marketing-services-for-authors", label: "Promote" },
  { href: "/author-website-design-agency-usa", label: "Website" },
  { href: "/contact-author-website-design-agency", label: "Contact" },
] as const;

/** Shared hero copy for main journey nav pages. */
export const journeyPageHero = {
  write: {
    eyebrow: "Write",
    h1: "Book Writing Services for Authors",
  },
  prepare: {
    eyebrow: "Prepare",
    h1: "Self-Publishing Agency Services"
  },
  publish: {
    eyebrow: "Publish",
    h1: "Book Publishing Services for Authors",
  },
  audiobooks: {
    eyebrow: "Audiobooks",
    h1: "Audiobook Production Services for Authors",
  },
  promote: {
    eyebrow: "Promote",
    h1: "Book Marketing Services for Authors",
  },
} as const;

export const ebookWritingBanner = {
  body: "A great book starts with more than an idea. From book writing services and ghostwriting services to manuscript development, Authors Pilot helps you turn your vision into a book readers want to keep reading—and prepare for self publishing.",
  closing: "Have an idea? Let's turn it into a book.",
  image: "/services/ebook-writing.webp",
  imageAlt: "Author working on a book manuscript",
} as const;

export const ebookWritingSections = [
  {
    id: "start-with-idea",
    eyebrow: "Start With Your Idea",
    heading: "Self-Publishing Starts With Strong Book Writing Services.",
    body: "Every great book starts with an idea—but turning that idea into a complete manuscript takes structure, planning, and the right writing approach. Authors Pilot provides book writing services and self-publishing services that help you develop your concept and create a clear direction for your book.",
    listTitle: "We help with:",
    items: [
      "Book Concept",
      "Story Development",
      "Research",
      "Book Outline",
      "Chapter Planning",
    ],
    pipeline: null as string | null,
  },
  {
    id: "turn-ideas-into-words",
    eyebrow: "Turn Ideas Into Words",
    heading: "Ghostwriting Services That Sound Like You.",
    body: "Whether you're writing fiction, nonfiction, memoir, business, or an inspirational book, our ghostwriting services and manuscript writing team help transform your ideas into engaging, well-structured content that sounds authentic to your voice—ideal for self published authors ready to grow.",
    listTitle: "Our services include:",
    items: [
      {
        tag: "Ghostwriting",
        title: "Professional Ghostwriting",
        description:
          "Hire a ghostwriter to turn your ideas into a complete book manuscript written in your voice—confidential, and fully yours.",
      },
      {
        tag: "Manuscript",
        title: "Manuscript Writing Services",
        description:
          "Get a structured, reader-focused manuscript written from outline to draft, ready for editing and professional publishing.",
      },
      {
        tag: "Chapters",
        title: "Chapter Development",
        description:
          "Develop strong chapters with clear structure, pacing, and narrative flow that keep readers turning the page.",
      },
      {
        tag: "Content",
        title: "Book Content Writing",
        description:
          "Write clear, engaging book content for business books, self-help, memoirs, and educational digital books.",
      },
      {
        tag: "Voice",
        title: "Author Voice Matching",
        description:
          "Capture your speaking style and expertise so every chapter sounds authentic and consistent with your author brand.",
      },
    ],
    pipeline: null as string | null,
  },
  {
    id: "draft-to-manuscript",
    eyebrow: "From Draft to Book-Ready Manuscript",
    heading: "Your First Draft Is Just the Beginning.",
    body: "We refine your manuscript so your story is clear, consistent, engaging, and ready for the next stage of publishing. From the first idea to the finished manuscript, Authors Pilot helps you move forward with confidence.",
    listTitle: "",
    items: [] as (
      | string
      | { tag: string; title: string; description: string }
    )[],
    pipeline: null as string | null,
    closingPrompt: "Ready for self-publishing services that start with a strong manuscript?",
  },
] as const;

export const ebookWritingCta = {
  label: "Start Writing",
  href: "/contact-author-website-design-agency",
} as const;

export const serviceMenu = [
  {
    heading: "Cover & Design",
    items: [
      {
        title: "Book Cover Design",
        blurb: "Our flagship, covers that sell",
        flagship: true,
        href: "/self-publishing-agency-services#book-cover-design",
      },
      {
        title: "eBook Cover Designing",
        blurb: "Scroll-stopping digital covers",
        flagship: true,
        href: "/self-publishing-agency-services#book-cover-design",
      },
      {
        title: "Book Illustration",
        blurb: "Custom art & character design",
        href: "/self-publishing-agency-services#book-cover-design",
      },
    ],
  },
  {
    heading: "Publishing",
    items: [
      {
        title: "Book Publishing",
        blurb: "From manuscript to market",
        href: "/book-publishing-services-for-authors",
      },
      {
        title: "Children Book Publishing",
        blurb: "Picture books that delight",
        href: "/book-publishing-services-for-authors",
      },
      {
        title: "eBook Writing & Publishing",
        blurb: "Ghostwritten & published",
        href: "/book-writing-services-for-authors",
      },
      {
        title: "Self Publishing",
        blurb: "Keep 100% of your rights",
        href: "/contact-author-website-design-agency",
      },
      {
        title: "Global Publishing",
        blurb: "Reach readers worldwide",
        href: "/contact-author-website-design-agency",
      },
    ],
  },
  {
    heading: "Marketing",
    items: [
      {
        title: "Book Marketing",
        blurb: "Launch to best-seller lists",
        href: "/book-marketing-services-for-authors",
      },
      {
        title: "Content Marketing",
        blurb: "Authority-building content",
        href: "/book-marketing-services-for-authors",
      },
      {
        title: "Social Media Marketing",
        blurb: "Grow a loyal readership",
        href: "/book-marketing-services-for-authors",
      },
      {
        title: "Digital Marketing",
        blurb: "Ads, funnels & SEO",
        href: "/book-marketing-services-for-authors",
      },
    ],
  },
  {
    heading: "Production & More",
    items: [
      {
        title: "Audiobook Production",
        blurb: "Narration to publishing",
        href: "/audiobook-production-services-for-authors",
      },
      {
        title: "Book Printing",
        blurb: "Premium print & binding",
        href: "/book-publishing-services-for-authors",
      },
      {
        title: "Author Website Development",
        blurb: "A home for your brand",
        href: "/contact-author-website-design-agency",
      },
      {
        title: "Book Editing & Proofreading",
        blurb: "Flawless every page",
        href: "/self-publishing-agency-services#book-editing",
      },
      {
        title: "Book Formatting",
        blurb: "Print & eBook ready",
        href: "/self-publishing-agency-services#book-formatting",
      },
    ],
  },
];

export const home = {
  hero: {
    headline:
      "Your Story Deserves A Premium Publishing Experience",
    subhead:
      "If you believe you have a story worth telling, one that people will love, Let's bring it to life. All we need is your story to convert into a Book the world can discover.",
    supporting: [
      "Maybe you've been thinking about writing a book for years.",
      "Maybe you already have 50 pages sitting on your laptop.",
      "Maybe you have nothing but an idea and a voice note.",
      "Wherever you are in the journey, you don't have to figure out everything alone.",
      "We help shape the idea, write the story, refine the manuscript, design the book, create the audio experience, prepare it for publication, and help bring it to its audience.",
    ],
    primaryCta: { label: "Free Author Website Mockup", href: "/contact-author-website-design-agency" },
    secondaryCta: { label: "Tell Us Your Idea", href: "/contact-author-website-design-agency" },
    imageAlt: "hero-illustration-book-forged",
  },
  trustBar: {
    label:
      "One idea. One creative partner. A complete journey from concept to publication.",
    items: [
      "eBook Writing",
      "Ghostwriting",
      "Editing",
      "Book Design",
      "Audiobooks",
      "PDF to Audio",
      "Animation",
      "Publishing",
      "Author Branding",
    ],
  },
  storyBehind: {
    title: "Every Great Book Starts Before the First Page.",
    paragraphs: [
      "Before there is a manuscript, there is a thought.",
      "A lesson someone wants to share.",
      "A business built from years of experience.",
      "A story that refuses to stay untold.",
      "A voice that knows it has something meaningful to say.",
      "But an idea alone doesn't become a book.",
      "It needs structure.",
      "It needs words.",
      "It needs editing, design, direction, and a path to the reader.",
      "That's where Authors Pilot comes in.",
      "We take what exists in your head, your notes, your recordings, your research, or your unfinished manuscript — and help shape it into something people can read, hear, watch, and remember.",
    ],
    cta: { label: "Start With the Idea", href: "/contact-author-website-design-agency" },
  },
  servicesIntro: {
    title: "One Story. More Ways to Experience It.",
    paragraphs: [
      "A book doesn't have to stop at the final page.",
      "Your manuscript can become an eBook.",
      "Your eBook can become an audiobook.",
      "Your story can become an animated experience.",
      "Your knowledge can become a published authority.",
      "And your book can become the foundation of a larger personal or business brand.",
      "Authors Pilot brings these possibilities together under one creative roof.",
    ],
    cta: { label: "Explore Services", href: "/self-publishing-agency-services" },
  },
  ctaBanner: {
    title: "The Book You've Been Thinking About Deserves a Beginning.",
    description:
      "Bring us the idea. We'll help you publish the story. You don't need to have everything figured out.",
    cta: { label: "Pilot My Story", href: "/contact-author-website-design-agency" },
  },
};

export const services = {
  hero: {
    title: "One Story. More Ways to Experience It.",
    description:
      "Authors Pilot brings writing, editing, design, audio, animation, publishing, and author branding together under one creative roof.",
  },
  /** Local assets matched by service heading/slug from ebook images folder */
  images: {
    "ebook-writing": "/services/ebook-writing.webp",
    ghostwriting: "/services/ghostwriting.webp",
    "book-editing": "/services/book-editing.webp",
    "book-formatting": "/services/book-formatting.webp",
    "book-cover-design": "/services/book-cover-design.webp",
    "audiobook-production": "/services/audiobook-books-banner.webp",
    "pdf-to-audio": "/services/pdf-to-audio.webp",
    "audio-narration": "/services/audio-narration.webp",
    "book-publishing": "/services/book-publishing-banner.webp",
    "author-website-design": "/author-insights.webp",
  } as Record<string, string>,
  items: [
    {
      slug: "ebook-writing",
      title: "eBook Writing",
      heading: "Before You Start Writing Your Book, Know This",
      summary:
        "A great book starts with more than an idea. Authors Pilot helps you structure your story, develop your voice, and create a manuscript readers want to keep reading.",
      body: [
        "A great book starts with more than an idea. From structuring your story and developing your voice to creating a clear, engaging manuscript, Authors Pilot helps you turn your vision into a book readers want to keep reading.",
        "Have an idea? Let's turn it into a book.",
      ],
      listTitle: "",
      details: [] as string[],
      cta: { label: "Turn My Idea Into a Book", href: "/contact-author-website-design-agency" },
      imageAlt: "service-ebook-writing",
    },
    {
      slug: "ghostwriting",
      title: "Ghostwriting",
      heading: "Your Name on the Cover. Your Voice in Every Chapter.",
      summary:
        'Some of the best books begin with someone saying: "I know exactly what I want to say. I just don\'t know how to write the whole thing."',
      body: [
        "That's where ghostwriting becomes powerful.",
        "You bring the ideas, experience, stories, opinions, and expertise.",
        "We help transform them into a polished manuscript written around your voice, your message, and your audience.",
        "You remain at the heart of the book.",
        "We help build the words around you.",
      ],
      listTitle: "Ghostwriting Includes",
      details: [
        "Concept development",
        "Research",
        "Book outlining",
        "Chapter development",
        "Manuscript writing",
        "Voice matching",
        "Editing and refinement",
        "Revision support",
      ],
      cta: { label: "Tell Us Your Story", href: "/contact-author-website-design-agency" },
      imageAlt: "service-ghostwriting",
    },
    {
      slug: "book-editing",
      title: "Book Editing",
      heading: "Your Message Is Strong. Let's Make Every Word Earn Its Place.",
      summary: "Great editing isn't about changing your personality.",
      body: [
        "It's about removing distractions so your message becomes clearer.",
        "We refine grammar, structure, flow, consistency, readability, and overall presentation while protecting the voice and intention behind your work.",
        "Whether you have a rough manuscript or an almost-finished book, we help move it closer to publication.",
      ],
      listTitle: "Editing Support",
      details: [
        "Developmental editing",
        "Structural editing",
        "Copy editing",
        "Proofreading",
        "Grammar and punctuation",
        "Clarity and readability",
        "Chapter consistency",
      ],
      cta: { label: "Polish My Manuscript", href: "/contact-author-website-design-agency" },
      imageAlt: "service-book-editing",
    },
    {
      slug: "book-formatting",
      title: "Book Formatting",
      heading: "A Professional Book Should Feel Professional on Every Page.",
      summary: "Readers may never compliment good formatting.",
      body: [
        "They simply keep reading.",
        "Clean typography, spacing, chapter structure, page flow, headings, and consistent design create a reading experience that feels effortless.",
        "We prepare your manuscript for digital and publishing platforms with professional formatting designed around the type of book you're creating.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Prepare My Book for Publication", href: "/contact-author-website-design-agency" },
      imageAlt: "service-book-formatting",
    },
    {
      slug: "book-cover-design",
      title: "Book Cover Design",
      heading: "Before They Read Your Book, They See Its Cover.",
      summary:
        "Your cover is the first introduction between your book and a potential reader.",
      body: [
        "It should create curiosity.",
        "It should communicate the genre.",
        "It should reflect the promise of the book.",
        "And above all, it should make someone want to know what's inside.",
        "We create professional book covers designed around your title, genre, audience, positioning, and publishing goals.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Design My Book Cover", href: "/contact-author-website-design-agency" },
      imageAlt: "service-book-cover-design",
    },
    {
      slug: "audiobook-production",
      title: "Audiobook Production",
      heading: "Your Story Shouldn't End on the Page.",
      summary: "Some people read books.",
      body: [
        "Others listen to them while driving, walking, working, exercising, or relaxing.",
        "Audiobook production gives your written work another life — one built around voice, pacing, emotion, clarity, and sound.",
        "We help transform your manuscript into an engaging audiobook experience with narration and professional audio production.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Turn My Book Into an Audiobook", href: "/contact-author-website-design-agency" },
      imageAlt: "service-audiobook-production",
    },
    {
      slug: "pdf-to-audio",
      title: "PDF to Audio",
      heading: "Have the PDF? Give It a Voice.",
      summary: "You may already have the content.",
      body: [
        "You may already have the finished PDF.",
        "Now imagine that same material being experienced through headphones instead of a screen.",
        "Our PDF-to-audio service helps transform suitable written content into a listenable format, opening another way for your audience to consume your work.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Convert My PDF to Audio", href: "/contact-author-website-design-agency" },
      imageAlt: "service-pdf-to-audio",
    },
    {
      slug: "audio-narration",
      title: "Audio Narration",
      heading: "The Right Voice Can Change the Entire Story.",
      summary: "Audiobooks aren't simply documents being read aloud.",
      body: [
        "Voice, pacing, pronunciation, pauses, emotion, and audio quality all shape the listener's experience.",
        "We help create narration that matches the personality and purpose of your book — whether your project calls for professional human narration or an appropriately produced AI-assisted voice experience.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Create My Audio Experience", href: "/contact-author-website-design-agency" },
      imageAlt: "service-audio-narration",
    },
    {
      slug: "book-animation",
      title: "Book Animation",
      heading: "What If Your Book Could Move?",
      summary: "A powerful idea doesn't always have to stay inside a book.",
      body: [
        "Selected chapters, concepts, stories, lessons, and educational material can be transformed into engaging animated content.",
        "Turn a chapter into a visual story.",
        "Turn a lesson into an explainer.",
        "Turn your book into content designed for today's visual audience.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Animate My Story", href: "/contact-author-website-design-agency" },
      imageAlt: "service-book-animation",
    },
    {
      slug: "book-publishing",
      title: "Book Publishing",
      heading: "Writing the Book Is Only the Beginning.",
      summary: "Finishing the manuscript is a major milestone.",
      body: [
        "But then comes the part many first-time authors don't expect:",
        "Formatting. File preparation. Metadata. Publishing requirements. Digital editions. Print considerations. Distribution.",
        "We help prepare your book for the publishing stage and guide you through the steps needed to move from finished manuscript toward a published work.",
      ],
      listTitle: "",
      details: [] as string[],
      cta: { label: "Take My Book to Publication", href: "/contact-author-website-design-agency" },
      imageAlt: "service-book-publishing",
    },
    {
      slug: "author-branding",
      title: "Author Branding",
      heading:
        "One Book Can Introduce You. Your Author Brand Can Keep You Going.",
      summary: "Your first book may be the beginning, not the destination.",
      body: [
        "Authors can build authority around their ideas, expertise, stories, and future work.",
        "We help create a consistent author identity that gives your books, content, and future projects a recognizable direction.",
        "Because the goal isn't simply to publish once.",
        "It's to build something that can grow.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Build My Author Brand", href: "/contact-author-website-design-agency" },
      imageAlt: "service-author-branding",
    },
    {
      slug: "author-website-design",
      title: "Author Website Design",
      heading: "Your Book Needs a Home Readers Can Find.",
      summary:
        "A professional author website helps USA readers, agents, and media take you seriously.",
      body: [
        "We design author websites that showcase your books, bio, press, and next release — with a clear path to buy.",
        "Start with a free author website mockup, then we build a site that matches your brand.",
      ],
      listTitle: "Website Design Includes",
      details: [
        "Custom author homepage",
        "Book and series pages",
        "About and press kit",
        "Contact and mailing list",
        "Mobile-ready design",
      ],
      cta: { label: "Free Author Website Mockup", href: "/contact-author-website-design-agency" },
      imageAlt: "Author website design for USA authors",
    },
    {
      slug: "book-marketing",
      title: "Book Marketing",
      heading: "A Published Book Still Needs to Be Discovered.",
      summary: "Publishing puts your book into the world.",
      body: [
        "Marketing helps people notice it.",
        "We help develop promotional content and marketing assets that give your book more opportunities to reach the right audience.",
        "From social content and promotional campaigns to landing-page content and author positioning, we help turn your book into something people can discover and talk about.",
      ],
      listTitle: "",
      details: [],
      cta: { label: "Promote My Book", href: "/contact-author-website-design-agency" },
      imageAlt: "service-book-marketing",
    },
  ],
};

export const howItWorks = {
  hero: {
    title: "From a Thought in Your Head to a Book in Someone's Hands.",
    description:
      "You don't have to know what comes next. That's part of what we're here for.",
  },
  steps: [
    {
      number: "01",
      title: "The Idea",
      description:
        "It starts with a conversation. Tell us what you want to write, who it's for, and why it matters.",
      imageAlt: "step-01-the-idea",
    },
    {
      number: "02",
      title: "The Blueprint",
      description:
        "Ideas need architecture. We shape the concept, audience, chapters, tone, structure, and direction.",
      imageAlt: "step-02-the-blueprint",
    },
    {
      number: "03",
      title: "The Manuscript",
      description:
        "The idea becomes words. Our writing and ghostwriting process turns your concept into a structured manuscript.",
      imageAlt: "step-03-the-manuscript",
    },
    {
      number: "04",
      title: "The Refinement",
      description:
        "Almost finished isn't finished. Editing, proofreading, restructuring, and refinement prepare the manuscript for the next stage.",
      imageAlt: "step-04-the-refinement",
    },
    {
      number: "05",
      title: "The Design",
      description:
        "Now it starts looking like a real book. Cover design and professional formatting create the visual identity of your work.",
      imageAlt: "step-05-the-design",
    },
    {
      number: "06",
      title: "The Voice",
      description:
        "The page becomes sound. Your book can become an audiobook or audio experience.",
      imageAlt: "step-06-the-voice",
    },
    {
      number: "07",
      title: "The Visual Story",
      description:
        "Your content can go beyond reading. Selected material can become animated and promotional visual content.",
      imageAlt: "step-07-the-visual-story",
    },
    {
      number: "08",
      title: "The Publication",
      description:
        "The book leaves your computer. We help prepare your project for publication and distribution.",
      imageAlt: "step-08-the-publication",
    },
    {
      number: "09",
      title: "The Audience",
      description:
        "Now your story has somewhere to go. Marketing and author-branding strategies help position your work in front of the right audience.",
      imageAlt: "step-09-the-audience",
    },
  ],
  closing: {
    title: "Your Job Is to Bring the Story. We'll Help Navigate the Rest.",
    description:
      "Bring what you have — an idea, a draft, a PDF, a voice recording, or a collection of notes. We'll help identify the next step.",
    cta: { label: "Start With What I Have", href: "/contact-author-website-design-agency" },
  },
};

export const portfolio = {
  hero: {
    title: "Ideas We've Helped Take Shape.",
    description:
      "Every finished project started somewhere. A blank document. A rough draft. A collection of notes. A business idea. A story someone couldn't stop thinking about. Explore selected work across writing, design, audio, publishing, and digital storytelling.",
    cta: { label: "Explore Our Work", href: "/contact-author-website-design-agency" },
  },
  genres: ["All", "Fiction", "Memoir", "Business", "Self-Help"] as const,
  items: [
    {
      id: "p1",
      title: "The Quiet Midpoint",
      genre: "Fiction" as const,
      blurb:
        "A literary novel shaped from a personal outline into intimate, emotionally clear prose.",
      imageAlt: "portfolio-fiction-quiet-midpoint",
    },
    {
      id: "p2",
      title: "Letters from the Porch",
      genre: "Memoir" as const,
      blurb:
        "A warm memoir shaped from notes and recordings into a conversational published voice.",
      imageAlt: "portfolio-memoir-letters-porch",
    },
    {
      id: "p3",
      title: "Lead Without the Armor",
      genre: "Business" as const,
      blurb:
        "A practical leadership ebook built from founder expertise into reader-focused chapters.",
      imageAlt: "portfolio-business-lead-without-armor",
    },
    {
      id: "p4",
      title: "Small Habits, Soft Landings",
      genre: "Self-Help" as const,
      blurb:
        "A gentle self-help guide developed from a coaching method into a publish-ready book.",
      imageAlt: "portfolio-selfhelp-small-habits",
    },
    {
      id: "p5",
      title: "Harbor Lights",
      genre: "Fiction" as const,
      blurb:
        "A coastal mystery paced for ebook readers who love character-driven suspense.",
      imageAlt: "portfolio-fiction-harbor-lights",
    },
    {
      id: "p6",
      title: "What We Carried Home",
      genre: "Memoir" as const,
      blurb:
        "An immigrant family story shaped through interviews into a manuscript readers remember.",
      imageAlt: "portfolio-memoir-what-we-carried",
    },
    {
      id: "p7",
      title: "Ship the Thing",
      genre: "Business" as const,
      blurb:
        "A founder-focused ebook on launching products with clarity and authority.",
      imageAlt: "portfolio-business-ship-the-thing",
    },
    {
      id: "p8",
      title: "Permission to Pause",
      genre: "Self-Help" as const,
      blurb:
        "A short restorative read on boundaries and rest — designed for busy readers.",
      imageAlt: "portfolio-selfhelp-permission-pause",
    },
  ],
};

export const about = {
  hero: {
    title: "About Authors Pilot",
    description:
      "Authors Pilot began with a simple belief: every author deserves a publishing experience worthy of the story they carry. Ten years and 500+ books later, that belief still leads everything we do.",
  },
  story: {
    title: "We Don't Just Finish Books. We Publish Them.",
    paragraphs: [
      "Publishing with intention means taking something with potential and shaping it with craft.",
      "That's exactly how we see the process.",
      "A rough idea becomes a concept. A concept becomes a manuscript. A manuscript becomes a book. A book becomes a voice. And a voice can become a legacy.",
      "That's the Authors Pilot philosophy.",
    ],
    imageAlt: "about-team-authorspilot-studio",
  },
  difference: {
    title: "You Don't Need Five Companies to Create One Book.",
    paragraphs: [
      "Writing with one company. Editing with another. Finding an audiobook producer somewhere else. Searching for a formatter. Then trying to figure out publishing on your own.",
      "The process can become fragmented quickly.",
      "Authors Pilot brings the major stages of the journey together so your project has continuity from beginning to end.",
    ],
    pillars: [
      "One Vision.",
      "One Creative Direction.",
      "One Publishing Journey.",
    ],
  },
  experience: {
    title: "Your Job Is to Bring the Story. We'll Help Navigate the Rest.",
    paragraphs: [
      "You don't need to understand publishing terminology before contacting us.",
      "You don't need a perfect manuscript.",
      "You don't need a complete business plan.",
      "And you certainly don't need to have every answer.",
      "Bring what you have. An idea. A draft. A PDF. A voice recording. A collection of notes. Or simply a story you know needs to be told.",
      "We'll help identify the next step.",
    ],
    cta: { label: "Start With What I Have", href: "/contact-author-website-design-agency" },
  },
  quality: {
    title: "The Details Are Part of the Story.",
    paragraphs: [
      "A book is more than its words.",
      "It's the way a chapter flows. The way a page feels. The way a cover creates curiosity. The way a narrator delivers a sentence. The way the final product represents its author.",
      "We pay attention to those details because professional presentation isn't decoration.",
      "It's part of the experience.",
    ],
  },
};

export const contact = {
  hero: {
    title: "Contact Our Author Website Design Agency",
    description:
      "You don't need to write a perfect brief. Just tell us what you have, what you're trying to create, and where you want it to go. We'll take it from there.",
    reassurance: "No perfect brief required. Just start with the idea.",
  },
  form: {
    creating: [
      "Free Website Mockup",
      "Free Book Cover Mockup",
      "eBook",
      "Book",
      "Ghostwritten Book",
      "Audiobook",
      "PDF to Audio",
      "Animated Book Content",
      "Publishing Project",
      "Author Brand",
      "Book Marketing",
      "Something Else",
    ],
    alreadyHave: [
      "Just an idea",
      "Notes",
      "Outline",
      "Partial manuscript",
      "Complete manuscript",
      "PDF",
      "Published book",
    ],
  },
  faq: {
    title: "Questions Authors Usually Ask Before They Begin.",
    items: [
      {
        question: "Do I need a finished manuscript?",
        answer:
          "No. You can start with an idea, outline, notes, research, recordings, or an unfinished manuscript.",
      },
      {
        question: "Can you write my entire book?",
        answer:
          "Yes. Depending on the project, we can assist with concept development, outlining, research, writing, editing, and final preparation.",
      },
      {
        question: "What is ghostwriting?",
        answer:
          "Ghostwriting is when a professional writer develops your book based on your ideas, knowledge, experiences, direction, and desired voice while the work is presented under your authorship according to your agreement.",
      },
      {
        question: "Can you turn my eBook into an audiobook?",
        answer:
          "Yes. We can help adapt suitable written content into an audiobook production.",
      },
      {
        question: "Can you convert a PDF into audio?",
        answer:
          "Yes. We offer PDF-to-audio conversion for suitable documents and content.",
      },
      {
        question: "Can you publish my book?",
        answer:
          "We can help prepare your book for publication and guide you through the publishing requirements and preparation process.",
      },
      {
        question: "Can you create an animated version of my book?",
        answer:
          "Selected stories, chapters, concepts, and educational material can be adapted into animated content.",
      },
      {
        question: "Do you edit books written by clients?",
        answer:
          "Yes. We can work with existing manuscripts and provide editing and proofreading support.",
      },
      {
        question: "Can you design my book cover?",
        answer:
          "Yes. Cover design can be developed around your genre, title, audience, and positioning.",
      },
      {
        question: "How do I get started?",
        answer:
          "Simply tell us what you're creating, what you already have, and what you want the finished project to become.",
      },
    ],
  },
};

/** Genuine client testimonials only — leave empty until real reviews are available. */
export const testimonialsSection = {
  title: "The Stories Behind the Stories.",
  description:
    "The finished book matters. But so does the journey it took to get there. Here you'll find genuine experiences from authors and clients who trusted Authors Pilot with their ideas.",
};

export const testimonials: {
  quote: string;
  name: string;
  role: string;
}[] = [];

export const finalCta = {
  title: "You bring the idea.",
  subtitle: "We'll help shape what comes next.",
  paragraphs: [
    "This isn't about buying a service.",
    "It's about finding a partner for something you've been wanting to create.",
    "I have an idea → they understand it → they can build it → they handle the complicated parts → the book becomes real → I want to start.",
  ],
  primaryCta: { label: "Pilot My Story", href: "/contact-author-website-design-agency" },
  secondaryCta: { label: "Start a Conversation", href: "/contact-author-website-design-agency" },
  closing: "Authors Pilot — Pilot Your Story. Self-Publishing Story System.",
};

export const brandMessages = {
  short:
    "Authors Pilot helps turn ideas into books, books into experiences, and experiences into lasting stories.",
  medium:
    "From eBook writing and ghostwriting to audiobook production, animation, and publishing, Authors Pilot helps creators take an idea from the first sentence to the final audience.",
  oneLine: "Pilot Your Story. Self-Publishing Story System.",
  voice: ["Human", "Confident", "Premium", "Story-driven", "Helpful"] as const,
  coreLanguage: [
    "Pilot",
    "Shape",
    "Craft",
    "Voice",
    "Story",
    "Ideas",
    "Journey",
    "Legacy",
    "Publish",
    "Create",
    "Transform",
  ] as const,
};

/** Internal SEO linking — related next steps for each dedicated service page. */
export const serviceRelatedLinks: Record<
  string,
  { href: string; label: string }[]
> = {
  "ebook-writing": [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
  ghostwriting: [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
  "audiobook-production": [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
  "pdf-to-audio": [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
  "book-publishing": [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
  "book-animation": [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
  "book-marketing": [{ href: "/contact-author-website-design-agency", label: "Contact Us" }],
};

export const journeyChains = [
  {
    title: "Write → Refine → Publish",
    links: [
      { href: "/book-writing-services-for-authors", label: "eBook Writing" },
      { href: "/self-publishing-agency-services#book-editing", label: "Editing" },
      { href: "/self-publishing-agency-services#book-formatting", label: "Formatting" },
      { href: "/self-publishing-agency-services#book-cover-design", label: "Cover Design" },
      { href: "/book-publishing-services-for-authors", label: "Publishing" },
    ],
  },
  {
    title: "Page → Voice",
    links: [
      { href: "/book-writing-services-for-authors", label: "eBook" },
      { href: "/audiobook-production-services-for-authors", label: "Audiobook" },
      { href: "/pdf-to-audio-conversion-service", label: "PDF to Audio" },
    ],
  },
  {
    title: "Story → Audience",
    links: [
      { href: "/book-writing-services-for-authors", label: "Book" },
      { href: "/book-animation-video-services", label: "Animation" },
      { href: "/book-marketing-services-for-authors", label: "Marketing" },
      { href: "/self-publishing-agency-services#author-branding", label: "Author Branding" },
    ],
  },
];

export const footer = {
  tagline: "Pilot Your Story. Self-Publishing Story System.",
  blurb:
    "A premium book & eBook cover design studio and full-service publisher. From manuscript to marketplace, we help authors publish with craft.",
  cta: {
    headline: "Ready to pilot your story?",
    subhead: "Join the authors who chose to publish with craft.",
    label: "Start Publishing",
    href: "/contact-author-website-design-agency",
  },
  columns: [
    {
      title: "Services",
      links: [
        { href: "/book-writing-services-for-authors", label: "Write" },
        { href: "/self-publishing-agency-services", label: "Prepare" },
        { href: "/book-publishing-services-for-authors", label: "Publish" },
        { href: "/audiobook-production-services-for-authors", label: "Audiobooks" },
        { href: "/book-marketing-services-for-authors", label: "Promote" },
        { href: "https://dezyonstudio.com/", label: "Author Website" },
        {
          href: "https://freeimagecompressor.live/#bg-remover",
          label: "Image Tool",
        },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about-authorspilot-publishing-agency", label: "About Us" },
        { href: "/author-publishing-website-price", label: "Packages" },
        { href: "/blog/author-publishing-blog-resources", label: "Blog" },
        { href: "https://app.authorspilot.com/", label: "Publishing Platform" },
        { href: "/contact-author-website-design-agency", label: "Contact Us" },
      ],
    },
  ],
};

export const bookMarketingSections = [
  {
    id: "author-brand",
    eyebrow: "Build Your Author Brand",
    heading: "Our Marketing Approach",
    body: "Create a professional author identity that makes you recognizable across Instagram, Facebook, TikTok, LinkedIn, and other platforms.",
    listTitle: "What we do:",
    items: [
      "Social Media Promotion",
      "Email & Launch Campaigns",
      "Reviews & Influencer Outreach",
    ],
  },
  {
    id: "book-content",
    eyebrow: "Turn Your Book Into Content",
    heading: "Why Marketing Matters for Self-Published Authors",
    body: "We transform your book, ideas, and expertise into engaging social content designed to attract readers and build your audience.",
    listTitle: "Content includes:",
    items: [
      "Book Promotion Posts",
      "Reels & Short Videos",
      "Quotes & Storytelling Posts",
      "Educational & Behind-the-Scenes Content",
      "Reader Engagement Content",
    ],
  },
  {
    id: "build-audience",
    eyebrow: "Build Your Audience",
    heading: "Don't Just Publish. Get Discovered.",
    body: "We create a consistent social media strategy to help your author brand reach the right readers and turn attention into a growing community.",
    listTitle: "Strategy includes:",
    items: [
      "Content Strategy",
      "Platform-Specific Planning",
      "Hashtag & Keyword Strategy",
      "Engagement Strategy",
      "Book Launch Campaigns",
    ],
  },
  {
    id: "author-brand-closing",
    eyebrow: "Become More Than a Published Author",
    heading: "Become a Recognizable Author Brand.",
    body: "Your book may introduce you to readers—but your brand keeps them connected. Authors Pilot helps you build a professional online presence that supports your current book and every book that comes next.",
    listTitle: "",
    items: [] as string[],
  },
] as const;

export const bookMarketingCta = {
  label: "Build Your Author Brand",
  href: "/contact-author-website-design-agency",
} as const;

export const audiobookProductionSections = [
  {
    id: "turn-into-audiobook",
    eyebrow: "Turn Your Book Into an Audiobook",
    heading: "How We Produce Your Audiobook",
    body: "Give your readers another way to experience your book. Authors Pilot helps transform your manuscript into a professionally produced audiobook—ready for today's audio-first audience.",
    listTitle: "We help with:",
    items: [
      "Audiobook Production",
      "Professional Narration",
      "Voice Selection",
      "Audio Editing & Mastering",
      "Audiobook Cover",
      "Publishing Preparation",
    ],
    pipeline: null as string | null,
  },
  {
    id: "publish-listeners",
    eyebrow: "Publish Where Listeners Are",
    heading: "Narration & Distribution Options",
    body: "Get your audiobook prepared for distribution across major audiobook marketplaces and listening platforms, helping your story reach readers wherever they prefer to listen.",
    listTitle: "Distribution support can include:",
    items: [
      "Audible",
      "Amazon",
      "Apple Books",
      "Spotify",
      "Audiobook Retailers",
      "Library & Distribution Networks",
    ],
    pipeline: null as string | null,
  },
  {
    id: "manuscript-to-listener",
    eyebrow: "From Manuscript to Listener",
    heading: "Pricing & Turnaround",
    body: "From choosing the right voice to preparing your final audio files and getting your audiobook distribution-ready, Authors Pilot simplifies the process for independent authors.",
    listTitle: "Our Process",
    items: [] as string[],
    pipeline:
      "MANUSCRIPT → NARRATION → PRODUCTION → MASTERING → PUBLISH → DISTRIBUTE",
  },
  {
    id: "let-story-be-heard",
    eyebrow: "Let Your Story Be Heard",
    heading: "Let Your Story Be Heard",
    body: "Whether you're publishing your first audiobook or expanding an existing book catalog, Authors Pilot helps you turn your written work into an audio experience designed for modern listeners.",
    listTitle: "",
    items: [] as string[],
    pipeline: null as string | null,
    closingPrompt: "Ready to turn your book into an audiobook?",
  },
] as const;

export const audiobookProductionCta = {
  label: "Start Your Audiobook",
  href: "/contact-author-website-design-agency",
} as const;

/** Dedicated SEO service landing pages (section 29). */
export const servicePages = {
  "ebook-writing": {
    slug: "ebook-writing",
    serviceSlug: "ebook-writing",
    seoTitle: "Self-Publishing & Book Writing Services | Authors Pilot",
    metaDescription:
      "Turn your book idea into a published book with Authors Pilot. Get professional book writing, ghostwriting, manuscript development, and self-publishing services.",
    h1: "Book Writing Services for Authors",
    keywords:
      "self publishing, self publishing services, book writing services, ghostwriting services, manuscript writing, book publishing, self published authors, book writers, author services",
    ogDescription:
      "From your first idea to a published book, Authors Pilot helps authors with writing, manuscript development, and self-publishing.",
    path: "/book-writing-services-for-authors",
    canonical: "https://authorspilot.com/book-writing-services-for-authors/",
  },
  ghostwriting: {
    slug: "ghostwriting",
    path: "/ghostwriting-services-for-authors",
    serviceSlug: "ghostwriting",
    seoTitle: "Ghostwriting Services for Authors | Authors Pilot",
    metaDescription:
      "Professional ghostwriting services for authors. Your story, your name — a ghostwriter crafts the manuscript around your voice.",
    h1: "Ghostwriting Services for Authors",
    keywords:
      "ghostwriting services, book ghostwriting, professional ghostwriters, nonfiction ghostwriting",
  },
  "audiobook-production": {
    slug: "audiobook-production",
    path: "/audiobook-production-services-for-authors",
    serviceSlug: "audiobook-production",
    seoTitle: "Audiobook Production Services for Authors | Authors Pilot",
    metaDescription:
      "Audiobook production services for authors: professional narration, studio production, and files ready for Audible, ACX, and major audio platforms.",
    h1: "Audiobook Production Services for Authors",
    keywords:
      "audiobook production, audiobook narration, eBook to audiobook, book narration services",
  },
  "pdf-to-audio": {
    slug: "pdf-to-audio",
    path: "/pdf-to-audio-conversion-service",
    serviceSlug: "pdf-to-audio",
    seoTitle: "PDF to Audio Conversion | Turn Your PDF Into an Audiobook",
    metaDescription:
      "PDF to audio conversion services. Transform suitable written documents into listenable audio experiences.",
    h1: "Your PDF Has a Story. Let's Give It a Voice.",
    keywords:
      "PDF to audio, PDF audiobook conversion, document to audio, book audio conversion",
  },
  "book-publishing": {
    slug: "book-publishing",
    path: "/book-publishing-services-for-authors",
    serviceSlug: "book-publishing",
    seoTitle: "Book Publishing Services for Authors | Authors Pilot",
    metaDescription:
      "Book publishing services for authors — eBook, Kindle, and print. We take a finished manuscript through files, metadata, and launch-ready distribution.",
    h1: "Book Publishing Services for Authors",
    keywords:
      "book publishing services, self-publishing services, eBook publishing, Kindle publishing, publishing support",
  },
  "book-animation": {
    slug: "book-animation",
    path: "/book-animation-video-services",
    serviceSlug: "book-animation",
    seoTitle: "Book Animation Services | Turn Stories Into Animated Content",
    metaDescription:
      "Book animation services that turn chapters, lessons, and stories into engaging animated visual content.",
    h1: "What If Your Book Could Move?",
    keywords:
      "book animation, animated book, book-to-video, animated storytelling",
  },
  "book-marketing": {
    slug: "book-marketing",
    path: "/book-marketing-services-for-authors",
    serviceSlug: "book-marketing",
    seoTitle: "Book Marketing Services for Authors | Authors Pilot",
    metaDescription:
      "Book marketing services for authors: launch plans, Amazon visibility, social content, and promotion that helps readers find your book.",
    h1: "Book Marketing Services for Authors",
    keywords:
      "book marketing, book promotion, author marketing, book launch marketing",
  },
} as const;

export const homeSeo = {
  title: "Book Publishing & Author Website Design Agency | Authors Pilot",
  description:
    "Authors Pilot is a book publishing and author website design agency. We help authors write, design, publish, and build a professional online home for their books.",
};
