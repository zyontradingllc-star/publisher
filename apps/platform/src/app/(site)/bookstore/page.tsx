import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookStore - Coming Soon",
  description:
    "Something exciting is coming soon to the Authors Pilot BookStore. Stay tuned!",
};

export default function BookstorePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-coral sm:text-base">
        Best for Authors Pilot
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Something Exciting Is Coming Soon. Stay Tuned!
      </h1>
    </section>
  );
}
