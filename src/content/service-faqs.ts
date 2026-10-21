import type { ServiceSeoSlug } from "@/lib/service-page-seo";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export const serviceFaqs: Record<ServiceSeoSlug, ServiceFaqItem[]> = {
  "book-cover-design": [
    {
      question: "What does a professional book cover design include?",
      answer:
        "A professional book cover design can include the front cover, typography, imagery, layout and files prepared according to the author's publishing format and platform requirements.",
    },
    {
      question: "Do you design Amazon KDP book covers?",
      answer:
        "Yes. Authors Pilot can create book covers prepared for publishing platforms and formats such as Amazon KDP.",
    },
    {
      question: "How much does book cover design cost?",
      answer:
        "Cover design pricing depends on genre, complexity, number of concepts and whether you need eBook, paperback, hardcover or full KDP-ready files. We provide a clear quote after a free consultation.",
    },
    {
      question: "Can I request revisions to my book cover?",
      answer:
        "Yes. Our cover design process includes revision rounds so you can refine concept, typography, imagery and layout before final files are delivered.",
    },
  ],
  "book-writing": [
    {
      question: "What is included in professional book writing services?",
      answer:
        "Book writing services can include story structure, chapter development, manuscript drafting, voice development, research support and revisions based on the scope of your project.",
    },
    {
      question: "Can you help if I only have an idea for my book?",
      answer:
        "Yes. Many authors come to us with notes, an outline or a rough concept. We help shape the idea into a structured manuscript with a clear direction and readable flow.",
    },
    {
      question: "Do you write fiction and nonfiction books?",
      answer:
        "Yes. Authors Pilot supports fiction and nonfiction projects, including memoir, business, self-help, educational and specialty-topic books.",
    },
    {
      question: "Will the manuscript sound like me?",
      answer:
        "That is the goal. We develop the manuscript around your voice, message and audience so the finished book feels authentic to you.",
    },
  ],
  "self-publishing": [
    {
      question: "What are self publishing services?",
      answer:
        "Self publishing services help independent authors move from manuscript to published book with support for writing, editing, formatting, cover design, publishing setup and launch guidance.",
    },
    {
      question: "Do I keep my rights when I self publish?",
      answer:
        "Yes. With self publishing, you retain ownership of your work and royalties. Authors Pilot helps you publish without taking ownership of your book.",
    },
    {
      question: "Can you help me publish on Amazon KDP?",
      answer:
        "Yes. We support authors preparing books for Amazon KDP and other major self publishing platforms with formatting, cover files and publishing guidance.",
    },
    {
      question: "Do I need a finished manuscript to start?",
      answer:
        "Not always. Some authors begin with an idea or partial draft, while others come with a completed manuscript ready for editing, design and publication.",
    },
  ],
  "book-editing": [
    {
      question: "What types of book editing do you offer?",
      answer:
        "We offer developmental editing, structural editing, copy editing and proofreading to improve clarity, consistency, grammar and overall readability.",
    },
    {
      question: "Will editing change my writing voice?",
      answer:
        "Good editing should protect your voice. We focus on strengthening clarity and flow while keeping the tone, intention and personality of your writing intact.",
    },
    {
      question: "Can you edit a rough first draft?",
      answer:
        "Yes. Whether your manuscript is a rough first draft or nearly finished, we can help refine structure, language and presentation for publication.",
    },
    {
      question: "How long does book editing take?",
      answer:
        "Editing timelines depend on manuscript length, editing level and revision scope. We outline timing clearly after reviewing your project.",
    },
  ],
  "book-formatting": [
    {
      question: "What is book formatting?",
      answer:
        "Book formatting prepares your manuscript for reading and publishing by organizing typography, spacing, chapter layout, headings and platform-specific file requirements.",
    },
    {
      question: "Do you format books for Kindle and print?",
      answer:
        "Yes. We prepare eBook and print layouts for platforms such as Kindle, Amazon KDP and other major publishing channels.",
    },
    {
      question: "Why does professional formatting matter?",
      answer:
        "Professional formatting creates a smoother reading experience and helps your book meet retailer and printer requirements, which reduces publishing delays and formatting issues.",
    },
    {
      question: "Can you format an already edited manuscript?",
      answer:
        "Yes. Once your manuscript is edited and ready, we can prepare clean files for digital and print publication.",
    },
  ],
  audiobook: [
    {
      question: "What is included in audiobook production?",
      answer:
        "Audiobook production can include voice selection, narration, audio editing, mastering and preparation of files for distribution on listening platforms.",
    },
    {
      question: "Can you turn my book into an audiobook?",
      answer:
        "Yes. Authors Pilot helps transform finished manuscripts into professional audiobooks designed for listeners on major audio platforms.",
    },
    {
      question: "Do you help with Audible and ACX-ready audiobooks?",
      answer:
        "Yes. We can support audiobook production with distribution-ready audio files prepared for platforms such as Audible and ACX where applicable.",
    },
    {
      question: "How do I choose the right narrator for my book?",
      answer:
        "We help you evaluate voice style, tone, pacing and genre fit so the narration supports your story and connects with your target audience.",
    },
  ],
  "amazon-kdp-publishing": [
    {
      question: "What is Amazon KDP publishing support?",
      answer:
        "Amazon KDP publishing support helps authors prepare manuscripts, covers, metadata and files for publishing eBooks and print editions through Kindle Direct Publishing.",
    },
    {
      question: "Can you help me publish my first book on KDP?",
      answer:
        "Yes. We guide first-time and experienced authors through formatting, cover preparation, metadata and the steps needed to publish on Amazon KDP.",
    },
    {
      question: "Do you prepare both Kindle and paperback files?",
      answer:
        "Yes. Depending on your project, we can help prepare digital and print-ready files for Amazon KDP publication.",
    },
    {
      question: "What do I need before publishing on Amazon KDP?",
      answer:
        "You typically need an edited manuscript, a professional cover, formatted interior files, book metadata and a publishing account. We help you organize each step.",
    },
  ],
  ghostwriting: [
    {
      question: "What is book ghostwriting?",
      answer:
        "Book ghostwriting is a collaborative process where a professional writer helps develop and write your book while your name remains on the cover and your voice stays at the center of the work.",
    },
    {
      question: "Will I still be the author if I use a ghostwriter?",
      answer:
        "Yes. In a standard ghostwriting arrangement, you remain the author and the book is published under your name.",
    },
    {
      question: "What types of books can be ghostwritten?",
      answer:
        "Ghostwriting is commonly used for memoir, business books, thought-leadership titles, self-help books and other nonfiction projects.",
    },
    {
      question: "How does the ghostwriting process work?",
      answer:
        "The process usually includes discovery, outlining, interviews or research, drafting, revisions and final manuscript delivery based on your goals and timeline.",
    },
  ],
  "author-website-design-usa": [
    {
      question: "What is an author website, and why do writers need one?",
      answer:
        "An author website is a professional online home where readers can discover your books, explore your biography, read reviews, and connect with you directly. Unlike Amazon or other retailer profiles, your own website gives you greater control over your author brand, book promotions, email subscribers, and purchase links.\n\nWhether you're a new writer or an established author, a dedicated website helps you build a long-term online presence beyond individual book launches.",
    },
    {
      question: "How much does a professional author website cost?",
      answer:
        "The cost of an author website depends on its design, features, and functionality. A simple author website may include your biography, book collection, contact form, and purchase links, while an advanced website can offer direct book sales, email subscriptions, blogs, and custom integrations.\n\nAuthors Pilot provides custom author website design services tailored to your books, genre, audience, and budget. Contact us for a personalized quote.",
    },
    {
      question:
        "Can Authors Pilot create a custom website for fiction and nonfiction writers?",
      answer:
        "Yes! Authors Pilot designs custom websites for fiction authors, nonfiction writers, self-published authors, and established writers.\n\nWhether you write romance, fantasy, mystery, children's books, business, memoirs, or educational content, we create websites that reflect your genre, personality, and target audience.\n\nYour website can include custom book pages, author biographies, reviews, media features, blogs, and links to your preferred bookstores.",
    },
    {
      question: "Can I add new books and update my author website later?",
      answer:
        "Absolutely! Your author website can grow alongside your writing career. You can add new book releases, update descriptions, display additional titles, share upcoming launches, and expand your author portfolio.\n\nDepending on your website setup, you can manage updates through a content management system or request ongoing website support.",
    },
    {
      question:
        "Can an SEO-friendly author website help readers find my books on Google?",
      answer:
        "Yes. A professionally developed, SEO-friendly author website can improve how search engines discover and understand your books and author information.\n\nAuthors Pilot builds websites with search-friendly page structures, mobile-responsive layouts, optimized metadata, descriptive book pages, and relevant structured data where appropriate.\n\nThese features help establish a strong technical SEO foundation for searches related to your author name, book titles, and genres. Google indexing, rankings, and organic traffic depend on several factors and cannot be guaranteed.",
    },
  ],
};
