export const liveTools = [
  {
    slug: "blurb-writer",
    name: "AI Blurb Writer",
    summary: "Turn a rough synopsis into a retail-ready book description.",
  },
  {
    slug: "keyword-researcher",
    name: "Keyword Researcher",
    summary: "Find Amazon-style discovery keywords from your title and genre.",
  },
  {
    slug: "title-generator",
    name: "Title Generator",
    summary: "Stress-test alternate titles that still sound like your book.",
  },
  {
    slug: "royalty-calculator",
    name: "Royalty Calculator",
    summary: "Compare storefront fees against a zero-commission author site.",
  },
] as const;

export type LiveToolSlug = (typeof liveTools)[number]["slug"];
