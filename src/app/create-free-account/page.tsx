import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CreateFreeAccountClick } from "@/components/CreateFreeAccountClick";

export const metadata: Metadata = {
  title: "Create A Free Account | Authors Pilot",
  description:
    "Create a free Authors Pilot account with one click. No long form, no captcha.",
  robots: { index: true, follow: true },
};

export default function CreateFreeAccountPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-warm-wash px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-sand bg-white px-8 py-12 text-center shadow-soft">
        <Link href="/" className="inline-flex justify-center focus-visible:outline-none">
          <Image
            src="/logo-authors-pilot.webp"
            alt="Authors Pilot"
            width={220}
            height={64}
            className="mx-auto h-14 w-auto object-contain"
            priority
          />
        </Link>

        <h1 className="mt-8 font-display text-2xl font-bold text-ink sm:text-3xl">
          Create A Free Account
        </h1>
        <p className="mt-3 text-sm text-forest-muted">
          Free during launch. One click - no form fields, no captcha.
        </p>

        <CreateFreeAccountClick />

        <p className="mt-8 text-sm text-charcoal">
          Prefer to talk now?{" "}
          <Link
            href="/contact-author-website-design-agency"
            className="font-semibold text-coral underline-offset-2 hover:underline"
          >
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
}
