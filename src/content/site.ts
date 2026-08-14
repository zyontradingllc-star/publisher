/**
 * Author Forges — complete website copy.
 */

export const brand = {
  name: "Author Forges",
  tagline: "Forge Your Story. Publish Your Legacy.",
  email: "hello@authorforges.com",
  phone: "(555) 014-2873",
};

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Library" },
  { href: "/contact", label: "Contact" },
];

export const home = {
  hero: {
    headline: "Your Idea Is a Book Waiting to Be Forged.",
    subhead:
      "From the first thought to the final published page, Author Forges helps turn ideas, knowledge, and stories into professionally written books, audiobooks, visual experiences, and published works.",
    supporting: [
      "Maybe you've been thinking about writing a book for years.",
      "Maybe you already have 50 pages sitting on your laptop.",
      "Maybe you have nothing but an idea and a voice note.",
      "Wherever you are in the journey, you don't have to figure out everything alone.",
      "We help shape the idea, write the story, refine the manuscript, design the book, create the audio experience, prepare it for publication, and help bring it to its audience.",
    ],
    primaryCta: { label: "Forge My Book", href: "/contact" },
    secondaryCta: { label: "Tell Us Your Idea", href: "/contact" },
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
      "That's where Author Forges comes in.",
      "We take what exists in your head, your notes, your recordings, your research, or your unfinished manuscript — and help forge it into something people can read, hear, watch, and remember.",
    ],
    cta: { label: "Start With the Idea", href: "/contact" },
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
      "Author Forges brings these possibilities together under one creative roof.",
    ],
    cta: { label: "Explore Services", href: "/services" },
  },
  ctaBanner: {
    title: "The Book You've Been Thinking About Deserves a Beginning.",
    description:
      "Bring us the idea. We'll help you forge the story. You don't need to have everything figured out.",
    cta: { label: "Forge My Story", href: "/contact" },
  },
};

export const services = {
  hero: {
    title: "One Story. More Ways to Experience It.",
    description:
      "Author Forges brings writing, editing, design, audio, animation, publishing, and author branding together under one creative roof.",
  },
  /** Local assets matched by service heading/slug from ebook images folder */
  images: {
    "ebook-writing": "/services/ebook-writing.png",
    ghostwriting: "/services/ghostwriting.jpg",
    "book-editing": "/services/book-editing.png",
    "book-formatting": "/services/book-formatting.jpg",
    "book-cover-design": "/services/book-cover-design.png",
    "audiobook-production": "/services/audiobook-production.png",
    "pdf-to-audio": "/services/pdf-to-audio.png",
    "audio-narration": "/services/audio-narration.png",
    "book-publishing": "/services/book-publishing.jpg",
  } as Record<string, string>,
  items: [
    {
      slug: "ebook-writing",
      title: "eBook Writing",
      heading: "You Bring the Knowledge. We Find the Words.",
      summary:
        "You don't need to be a professional writer to become an author. You might be an entrepreneur with years of experience, a coach with a method worth teaching, a professional with knowledge to share, or simply someone carrying a story that deserves to be heard.",
      body: [
        "Our eBook writing service turns those ideas into structured, engaging, reader-focused content.",
        "We develop the concept, organize the chapters, shape the narrative, and create a manuscript designed around your audience and purpose.",
      ],
      listTitle: "What We Can Help With",
      details: [
        "eBook concept development",
        "Book outlines",
        "Chapter writing",
        "Research-based content",
        "Non-fiction books",
        "Self-help books",
        "Business books",
        "Educational books",
        "Guides and digital books",
        "Manuscript development",
      ],
      cta: { label: "Turn My Idea Into a Book", href: "/contact" },
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
      cta: { label: "Tell Us Your Story", href: "/contact" },
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
      cta: { label: "Polish My Manuscript", href: "/contact" },
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
      cta: { label: "Prepare My Book for Publication", href: "/contact" },
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
      cta: { label: "Design My Book Cover", href: "/contact" },
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
      cta: { label: "Turn My Book Into an Audiobook", href: "/contact" },
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
      cta: { label: "Convert My PDF to Audio", href: "/contact" },
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
      cta: { label: "Create My Audio Experience", href: "/contact" },
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
      cta: { label: "Animate My Story", href: "/contact" },
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
      listTitle: "Publishing Support",
      details: [
        "eBook publishing preparation",
        "Print book preparation",
        "Digital formatting",
        "Kindle-ready files",
        "Publishing platform preparation",
        "Metadata assistance",
        "ISBN guidance",
        "Cover preparation",
        "Final file preparation",
      ],
      cta: { label: "Take My Book to Publication", href: "/contact" },
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
      cta: { label: "Build My Author Brand", href: "/contact" },
      imageAlt: "service-author-branding",
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
      cta: { label: "Promote My Book", href: "/contact" },
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
    cta: { label: "Start With What I Have", href: "/contact" },
  },
};

export const portfolio = {
  hero: {
    title: "Ideas We've Helped Take Shape.",
    description:
      "Every finished project started somewhere. A blank document. A rough draft. A collection of notes. A business idea. A story someone couldn't stop thinking about. Explore selected work across writing, design, audio, publishing, and digital storytelling.",
    cta: { label: "Explore Our Work", href: "/portfolio" },
  },
  genres: ["All", "Fiction", "Memoir", "Business", "Self-Help"] as const,
  items: [
    {
      id: "p1",
      title: "The Quiet Midpoint",
      genre: "Fiction" as const,
      blurb:
        "A literary novel forged from a personal outline into intimate, emotionally clear prose.",
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
        "An immigrant family story forged through interviews into a manuscript readers remember.",
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
    title: "About Author Forges",
    description:
      "We don't just finish books. We forge them — from a rough idea into a concept, a manuscript, a published work, and a lasting voice.",
  },
  story: {
    title: "We Don't Just Finish Books. We Forge Them.",
    paragraphs: [
      "The word forge represents craftsmanship. It means taking something with potential and shaping it with intention.",
      "That's exactly how we see the publishing process.",
      "A rough idea becomes a concept. A concept becomes a manuscript. A manuscript becomes a book. A book becomes a voice. And a voice can become a legacy.",
      "That's the Author Forges philosophy.",
    ],
    imageAlt: "about-team-authorforges-studio",
  },
  difference: {
    title: "You Don't Need Five Companies to Create One Book.",
    paragraphs: [
      "Writing with one company. Editing with another. Finding an audiobook producer somewhere else. Searching for a formatter. Then trying to figure out publishing on your own.",
      "The process can become fragmented quickly.",
      "Author Forges brings the major stages of the journey together so your project has continuity from beginning to end.",
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
    cta: { label: "Start With What I Have", href: "/contact" },
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

export const blog = {
  hero: {
    title: "The Author Forges Library",
    description:
      "The publishing world can feel complicated when you're experiencing it for the first time. Our resource library answers practical questions about writing, ghostwriting, editing, audiobooks, publishing, marketing, and building an author brand.",
  },
  posts: [
    {
      slug: "how-to-turn-an-idea-into-an-ebook",
      title: "How to Turn an Idea Into an eBook: A Step-by-Step Guide",
      excerpt:
        "From the first thought to a structured manuscript — a practical path for turning an idea into an eBook.",
      date: "2026-07-20",
      category: "Writing",
      imageAlt: "blog-turn-idea-into-ebook",
      related: ["/ebook-writing", "/ghostwriting"],
    },
    {
      slug: "how-much-does-it-cost-to-write-an-ebook",
      title: "How Much Does It Cost to Write an eBook?",
      excerpt:
        "What shapes the investment in eBook writing — scope, research, length, and the journey from idea to finished pages.",
      date: "2026-07-18",
      category: "Writing",
      imageAlt: "blog-ebook-writing-cost",
      related: ["/ebook-writing"],
    },
    {
      slug: "ghostwriting-vs-writing-your-own-book",
      title: "Ghostwriting vs. Writing Your Own Book: Which Is Right for You?",
      excerpt:
        "When collaboration makes sense, when writing solo fits better, and how to choose with clarity.",
      date: "2026-07-15",
      category: "Ghostwriting",
      imageAlt: "blog-ghostwriting-vs-writing",
      related: ["/ghostwriting", "/ebook-writing"],
    },
    {
      slug: "how-to-turn-a-pdf-into-an-audiobook",
      title: "How to Turn a PDF Into an Audiobook",
      excerpt:
        "Suitable documents, narration choices, and how written content becomes something people can listen to.",
      date: "2026-07-12",
      category: "Audio",
      imageAlt: "blog-pdf-to-audiobook",
      related: ["/pdf-to-audio", "/audiobook-production"],
    },
    {
      slug: "how-does-audiobook-production-work",
      title: "How Does Audiobook Production Actually Work?",
      excerpt:
        "Voice, pacing, sound, and the steps that turn a manuscript into an audiobook experience.",
      date: "2026-07-10",
      category: "Audio",
      imageAlt: "blog-audiobook-production",
      related: ["/audiobook-production"],
    },
    {
      slug: "how-to-prepare-a-manuscript-for-publishing",
      title: "How to Prepare a Manuscript for Publishing",
      excerpt:
        "Editing, formatting, files, and the details that move a manuscript closer to publication.",
      date: "2026-07-08",
      category: "Publishing",
      imageAlt: "blog-prepare-manuscript",
      related: ["/book-publishing", "/services#book-editing"],
    },
    {
      slug: "ebook-vs-audiobook-which-first",
      title: "eBook vs. Audiobook: Which Should You Create First?",
      excerpt:
        "How to decide whether the page or the voice should lead — and how one can support the other.",
      date: "2026-07-05",
      category: "Strategy",
      imageAlt: "blog-ebook-vs-audiobook",
      related: ["/ebook-writing", "/audiobook-production"],
    },
    {
      slug: "what-does-a-professional-ghostwriter-do",
      title: "What Does a Professional Ghostwriter Actually Do?",
      excerpt:
        "Concept, research, voice matching, and the craft behind books written under your name.",
      date: "2026-07-02",
      category: "Ghostwriting",
      imageAlt: "blog-what-ghostwriter-does",
      related: ["/ghostwriting"],
    },
    {
      slug: "how-long-does-it-take-to-write-a-book",
      title: "How Long Does It Take to Write a Book?",
      excerpt:
        "Timelines shaped by length, research, collaboration, and how refined the idea already is.",
      date: "2026-06-28",
      category: "Writing",
      imageAlt: "blog-how-long-to-write",
      related: ["/ebook-writing", "/how-it-works"],
    },
    {
      slug: "what-makes-a-good-book-cover",
      title: "What Makes a Good Book Cover?",
      excerpt:
        "Curiosity, genre cues, and the promise of the book — what readers notice before the first page.",
      date: "2026-06-25",
      category: "Design",
      imageAlt: "blog-good-book-cover",
      related: ["/services#book-cover-design"],
    },
    {
      slug: "how-to-publish-an-ebook-first-time",
      title: "How to Publish an eBook for the First Time",
      excerpt:
        "Platforms, files, metadata, and a calm path through first-time eBook publishing.",
      date: "2026-06-22",
      category: "Publishing",
      imageAlt: "blog-publish-ebook-first-time",
      related: ["/book-publishing"],
    },
    {
      slug: "before-hiring-a-ghostwriter",
      title: "What Authors Should Know Before Hiring a Ghostwriter",
      excerpt:
        "Voice, ownership, process, and the questions worth asking before the writing begins.",
      date: "2026-06-18",
      category: "Ghostwriting",
      imageAlt: "blog-before-hiring-ghostwriter",
      related: ["/ghostwriting", "/contact"],
    },
    {
      slug: "turn-one-book-into-multiple-digital-products",
      title: "How to Turn One Book Into Multiple Digital Products",
      excerpt:
        "eBooks, audio, animation, and branded content — extending one story across formats.",
      date: "2026-06-15",
      category: "Strategy",
      imageAlt: "blog-book-into-products",
      related: ["/book-animation", "/audiobook-production", "/book-marketing"],
    },
    {
      slug: "book-audiobook-and-animated-content",
      title: "Can a Book Become an Audiobook and Animated Content?",
      excerpt:
        "Yes — and here's how selected chapters and ideas can live as sound and motion.",
      date: "2026-06-12",
      category: "Experience",
      imageAlt: "blog-book-audio-animation",
      related: ["/audiobook-production", "/book-animation"],
    },
    {
      slug: "build-author-brand-around-first-book",
      title: "How to Build an Author Brand Around Your First Book",
      excerpt:
        "Your first book can introduce you. A clear author brand helps the journey continue.",
      date: "2026-06-08",
      category: "Branding",
      imageAlt: "blog-author-brand-first-book",
      related: ["/services#author-branding", "/book-marketing"],
    },
    {
      slug: "market-a-new-book-before-launch",
      title: "How to Market a New Book Before Launch",
      excerpt:
        "Promotional content, positioning, and early visibility so readers can discover the work.",
      date: "2026-06-05",
      category: "Marketing",
      imageAlt: "blog-market-before-launch",
      related: ["/book-marketing"],
    },
    {
      slug: "editing-vs-proofreading",
      title: "What Is the Difference Between Editing and Proofreading?",
      excerpt:
        "Structure, clarity, and polish — how each stage prepares a manuscript differently.",
      date: "2026-06-01",
      category: "Editing",
      imageAlt: "blog-editing-vs-proofreading",
      related: ["/services#book-editing"],
    },
    {
      slug: "convert-written-content-into-audio",
      title: "How to Convert Written Content Into Audio Content",
      excerpt:
        "From manuscript or PDF to narration — opening another way for your audience to listen.",
      date: "2026-05-28",
      category: "Audio",
      imageAlt: "blog-written-to-audio",
      related: ["/pdf-to-audio", "/audiobook-production"],
    },
    {
      slug: "what-to-include-in-a-book-publishing-plan",
      title: "What Should You Include in a Book Publishing Plan?",
      excerpt:
        "Format, files, platforms, cover, and audience — the pieces of a clear publishing plan.",
      date: "2026-05-22",
      category: "Publishing",
      imageAlt: "blog-publishing-plan",
      related: ["/book-publishing", "/how-it-works"],
    },
    {
      slug: "from-first-idea-to-published-book",
      title: "From First Idea to Published Book: The Complete Author Journey",
      excerpt:
        "Idea, blueprint, manuscript, refinement, design, voice, publication, and audience — the full path.",
      date: "2026-05-15",
      category: "Journey",
      imageAlt: "blog-complete-author-journey",
      related: ["/how-it-works", "/book-publishing", "/contact"],
    },
  ],
};

export const contact = {
  hero: {
    title: "Tell Us What You're Building.",
    description:
      "You don't need to write a perfect brief. Just tell us what you have, what you're trying to create, and where you want it to go. We'll take it from there.",
    reassurance: "No perfect brief required. Just start with the idea.",
  },
  form: {
    creating: [
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
    "The finished book matters. But so does the journey it took to get there. Here you'll find genuine experiences from authors and clients who trusted Author Forges with their ideas.",
};

export const testimonials: {
  quote: string;
  name: string;
  role: string;
}[] = [];

export const finalCta = {
  title: "You bring the idea.",
  subtitle: "We'll help forge what comes next.",
  paragraphs: [
    "This isn't about buying a service.",
    "It's about finding a partner for something you've been wanting to create.",
    "I have an idea → they understand it → they can build it → they handle the complicated parts → the book becomes real → I want to start.",
  ],
  primaryCta: { label: "Forge My Story", href: "/contact" },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
  closing: "Author Forges — Forge Your Story. Publish Your Legacy.",
};

export const brandMessages = {
  short:
    "Author Forges helps turn ideas into books, books into experiences, and experiences into lasting stories.",
  medium:
    "From eBook writing and ghostwriting to audiobook production, animation, and publishing, Author Forges helps creators take an idea from the first sentence to the final audience.",
  oneLine: "Forge Your Story. Publish Your Legacy.",
  voice: ["Human", "Confident", "Premium", "Story-driven", "Helpful"] as const,
  coreLanguage: [
    "Forge",
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
  "ebook-writing": [
    { href: "/services#book-editing", label: "Editing" },
    { href: "/services#book-formatting", label: "Formatting" },
    { href: "/services#book-cover-design", label: "Cover Design" },
    { href: "/book-publishing", label: "Publishing" },
    { href: "/audiobook-production", label: "Audiobook" },
  ],
  ghostwriting: [
    { href: "/ebook-writing", label: "eBook Writing" },
    { href: "/services#book-editing", label: "Editing" },
    { href: "/book-publishing", label: "Publishing" },
    { href: "/audiobook-production", label: "Audiobook" },
  ],
  "audiobook-production": [
    { href: "/ebook-writing", label: "eBook Writing" },
    { href: "/pdf-to-audio", label: "PDF to Audio" },
    { href: "/book-marketing", label: "Marketing" },
  ],
  "pdf-to-audio": [
    { href: "/audiobook-production", label: "Audiobook Production" },
    { href: "/ebook-writing", label: "eBook Writing" },
  ],
  "book-publishing": [
    { href: "/services#book-formatting", label: "Formatting" },
    { href: "/services#book-cover-design", label: "Cover Design" },
    { href: "/book-marketing", label: "Marketing" },
    { href: "/services#author-branding", label: "Author Branding" },
  ],
  "book-animation": [
    { href: "/book-marketing", label: "Marketing" },
    { href: "/services#author-branding", label: "Author Branding" },
    { href: "/ebook-writing", label: "eBook Writing" },
  ],
  "book-marketing": [
    { href: "/book-animation", label: "Animation" },
    { href: "/services#author-branding", label: "Author Branding" },
    { href: "/book-publishing", label: "Publishing" },
  ],
};

export const journeyChains = [
  {
    title: "Write → Refine → Publish",
    links: [
      { href: "/ebook-writing", label: "eBook Writing" },
      { href: "/services#book-editing", label: "Editing" },
      { href: "/services#book-formatting", label: "Formatting" },
      { href: "/services#book-cover-design", label: "Cover Design" },
      { href: "/book-publishing", label: "Publishing" },
    ],
  },
  {
    title: "Page → Voice",
    links: [
      { href: "/ebook-writing", label: "eBook" },
      { href: "/audiobook-production", label: "Audiobook" },
      { href: "/pdf-to-audio", label: "PDF to Audio" },
    ],
  },
  {
    title: "Story → Audience",
    links: [
      { href: "/ebook-writing", label: "Book" },
      { href: "/book-animation", label: "Animation" },
      { href: "/book-marketing", label: "Marketing" },
      { href: "/services#author-branding", label: "Author Branding" },
    ],
  },
];

export const footer = {
  tagline: "Forge Your Story. Publish Your Legacy.",
  blurb:
    "Author Forges helps turn ideas into books, books into experiences, and experiences into lasting stories.",
  medium:
    "From eBook writing and ghostwriting to audiobook production, animation, and publishing, Author Forges helps creators take an idea from the first sentence to the final audience.",
  cta: { label: "Have a Story to Tell?", link: "Start Your Journey →", href: "/contact" },
  columns: [
    {
      title: "Create",
      links: [
        { href: "/ebook-writing", label: "eBook Writing" },
        { href: "/ghostwriting", label: "Ghostwriting" },
        { href: "/services#book-editing", label: "Editing" },
        { href: "/services#book-formatting", label: "Book Formatting" },
        { href: "/services#book-cover-design", label: "Cover Design" },
      ],
    },
    {
      title: "Experience",
      links: [
        { href: "/audiobook-production", label: "Audiobook Production" },
        { href: "/pdf-to-audio", label: "PDF to Audio" },
        { href: "/book-animation", label: "Book Animation" },
      ],
    },
    {
      title: "Publish",
      links: [
        { href: "/book-publishing", label: "Book Publishing" },
        { href: "/services#author-branding", label: "Author Branding" },
        { href: "/book-marketing", label: "Book Marketing" },
      ],
    },
    {
      title: "Explore",
      links: [
        { href: "/portfolio", label: "Portfolio" },
        { href: "/about", label: "About" },
        { href: "/contact#faq", label: "FAQs" },
        { href: "/blog", label: "Library" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "X", href: "https://x.com", icon: "x" },
  ],
};

/** Dedicated SEO service landing pages (section 29). */
export const servicePages = {
  "ebook-writing": {
    slug: "ebook-writing",
    serviceSlug: "ebook-writing",
    seoTitle: "eBook Writing Services | Professional eBook Writers | Author Forges",
    metaDescription:
      "Professional eBook writing services from Author Forges. Custom eBook writers who turn your ideas into structured, reader-focused books.",
    h1: "Your Idea Deserves More Than a Blank Document.",
    keywords:
      "eBook writing services, professional eBook writers, custom eBook writing, book writing services",
  },
  ghostwriting: {
    slug: "ghostwriting",
    serviceSlug: "ghostwriting",
    seoTitle: "Professional Ghostwriting Services | Book Ghostwriters | Author Forges",
    metaDescription:
      "Professional ghostwriting services for books and nonfiction. Your story, your name, our words — crafted around your voice.",
    h1: "Your Story. Your Name. Our Words.",
    keywords:
      "ghostwriting services, book ghostwriting, professional ghostwriters, nonfiction ghostwriting",
  },
  "audiobook-production": {
    slug: "audiobook-production",
    serviceSlug: "audiobook-production",
    seoTitle: "Audiobook Production Services | Professional Book Narration",
    metaDescription:
      "Audiobook production and professional book narration. Turn your manuscript into an engaging listening experience.",
    h1: "Give Your Book a Voice.",
    keywords:
      "audiobook production, audiobook narration, eBook to audiobook, book narration services",
  },
  "pdf-to-audio": {
    slug: "pdf-to-audio",
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
    serviceSlug: "book-publishing",
    seoTitle: "Book Publishing Services | eBook & Print Publishing Support",
    metaDescription:
      "Book publishing services and self-publishing support. From finished manuscript to eBook, Kindle, and print preparation.",
    h1: "From Finished Manuscript to Published Book.",
    keywords:
      "book publishing services, self-publishing services, eBook publishing, Kindle publishing, publishing support",
  },
  "book-animation": {
    slug: "book-animation",
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
    serviceSlug: "book-marketing",
    seoTitle: "Book Marketing Services | Author & Book Promotion",
    metaDescription:
      "Book marketing and author promotion services. Help your published book get discovered by the right audience.",
    h1: "Publishing Gets You Out There. Marketing Helps People Find You.",
    keywords:
      "book marketing, book promotion, author marketing, book launch marketing",
  },
} as const;

export const homeSeo = {
  title:
    "Author Forges | eBook Writing, Ghostwriting, Audiobooks & Book Publishing",
  description:
    "Author Forges helps turn ideas into books, books into experiences, and experiences into lasting stories — with ghostwriting, editing, audiobooks, animation, and publishing.",
};
