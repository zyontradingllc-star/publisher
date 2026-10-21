import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

const points = [
  "Reach us on live chat or email, whichever you prefer.",
  "No frustrating waiting times - on average, we reply within one business day.",
];

const chat = [
  { from: "them", text: "Hi! Can you turn my finished manuscript into an audiobook?" },
  { from: "us", text: "Absolutely - narration, mastering, and distribution are all included." },
  { from: "them", text: "How soon can we start?" },
] as const;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-coral"
    >
      <path
        d="M4 10.5 8 14.5 16 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M4 13h2.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M20 13h-2.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1z" />
      <path d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </svg>
  );
}

export function SupportPromo() {
  return (
    <FadeIn className="mt-12 sm:mt-14">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="heading-section">
            Book a Free Consultation
          </h2>
          <p className="mt-4 font-sans text-base font-semibold text-ink">
            We&rsquo;re here for you 24/7, ready to assist whenever you need.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckIcon />
                <span className="font-sans text-sm leading-relaxed text-charcoal">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="#contact-form" className="!gap-1.5 !px-5 !py-2 !text-xs">
              <HeadsetIcon />
              Get Support
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/10 sm:h-80 sm:w-80"
          />
          <div className="relative mx-auto w-full max-w-md rounded-soft border border-sand bg-cream p-5 shadow-soft sm:p-6">
            <div className="flex items-center gap-3 border-b border-sand pb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral font-sans text-xs font-bold text-white">
                AF
              </span>
              <div>
                <p className="font-sans text-sm font-semibold text-ink">
                  Authors Pilot Support
                </p>
                <p className="flex items-center gap-1.5 font-sans text-xs text-charcoal">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Online now
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {chat.map((line) => (
                <div
                  key={line.text}
                  className={
                    line.from === "us" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-sans text-sm leading-relaxed ${
                      line.from === "us"
                        ? "rounded-br-sm bg-coral text-white"
                        : "rounded-bl-sm bg-ivory text-ink"
                    }`}
                  >
                    {line.text}
                  </p>
                </div>
              ))}
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1 rounded-2xl rounded-br-sm bg-coral px-4 py-3">
                  <i className="typing-dot" />
                  <i className="typing-dot" />
                  <i className="typing-dot" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
