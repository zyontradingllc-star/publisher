import Image from "next/image";

const logos = [
  { name: "Amazon", src: "/retailers/amazon.png" },
  { name: "Amazon Kindle", src: "/retailers/kindle.png" },
  { name: "Google Play Books", src: "/retailers/google-play-books.png" },
  { name: "Amazon India", src: "/retailers/amazon-in.png" },
  { name: "Flipkart", src: "/retailers/flipkart.png" },
  { name: "Apple iBooks", src: "/retailers/ibooks.png" },
  { name: "Barnes & Noble", src: "/retailers/barnes-noble.png" },
  { name: "Kobo", src: "/retailers/kobo.png" },
  { name: "Lulu", src: "/retailers/lulu.svg" },
];

export function LogoMarquee() {
  return (
    <section className="border-y border-sand/70 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-sans text-xs font-bold uppercase tracking-[0.22em] text-coral-deep">
          Your book, published everywhere
        </p>
      </div>

      <div className="marquee mt-6 sm:mt-8">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {logos.map((logo) => (
                <div
                  key={`${copy}-${logo.name}`}
                  className="relative mx-5 h-9 w-[130px] shrink-0 sm:mx-8 sm:h-11 sm:w-[150px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="150px"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
