import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Contact</h1>
      <div className="mt-8 space-y-4 text-charcoal leading-relaxed">
        <p>
          For questions about author accounts, listing review, or reported content, email our team.
          Include your account email and book title when relevant so we can help faster.
        </p>
        <p>
          <strong className="text-ink">Email:</strong>{" "}
          <a href="mailto:support@authorspilot.com" className="font-semibold text-coral hover:underline">
            support@authorspilot.com
          </a>
        </p>
        <p className="text-sm text-forest-muted">
          Response times vary. Urgent copyright concerns should include links to the listing and a
          brief description of the issue.
        </p>
        <p className="text-sm text-forest-muted">
          For author website design inquiries, visit the{" "}
          <a
            href="https://authorspilot.com/author-website-design-agency-usa/"
            className="font-semibold text-coral hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            website design page
          </a>{" "}
          on our marketing site.
        </p>
      </div>
    </article>
  );
}
