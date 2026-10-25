type AeoAnswerProps = {
  question: string;
  answer: string;
  as?: "h2" | "h3";
};

/**
 * AEO block: question as heading, then a direct 40–50 word answer in the HTML
 * (not JS-loaded), so crawlers and answer engines can extract it.
 */
export function AeoAnswer({ question, answer, as = "h2" }: AeoAnswerProps) {
  const Heading = as;
  return (
    <section className="border-b border-sand py-8 last:border-b-0">
      <Heading className="font-display text-xl font-bold text-ink sm:text-2xl">
        {question}
      </Heading>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-charcoal">
        {answer}
      </p>
    </section>
  );
}
