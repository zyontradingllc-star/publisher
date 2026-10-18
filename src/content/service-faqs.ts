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
      question: "What is an author website?",
      answer:
        "A dedicated website where readers can discover your books, learn about you, and connect with your author brand.",
    },
    {
      question: "How much does an author website cost?",
      answer:
        "Author websites with Authors Pilot typically start from $250 to $1,500. A focused launch site for one book sits at the lower end. A fuller author brand site with extra pages, reviews, and list signup lands in the mid range. Custom builds for series or a growing catalog start higher. Final pricing depends on pages and features — and you review the website before you pay.",
    },
    {
      question: "Can you create a custom website for writers?",
      answer:
        "Yes. We design websites around your books, writing style, audience, and goals.",
    },
    {
      question: "Can I add more books later?",
      answer:
        "Yes. Your website can grow with your author career.",
    },
    {
      question: "Can my website help with Google?",
      answer:
        "Yes. We build your website with SEO fundamentals in mind to give your author brand a strong foundation for search visibility.",
    },
  ],
};
