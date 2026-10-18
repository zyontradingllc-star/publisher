import { FadeIn } from "@/components/motion/FadeIn";
import { packageComparison } from "@/content/packages";

function CellMark({ included }: { included: boolean }) {
  if (!included) {
    return (
      <span className="font-sans text-sm font-semibold text-charcoal/35" aria-hidden>
        x
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#273E2B] text-white">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <path
          d="M5 10.5 8.2 13.5 15 6.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PackageCompareTable() {
  return (
    <section id="compare" className="scroll-mt-24 bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">
              Compare
            </span>
            <h2 className="mt-4 heading-section">
              What&apos;s Included in Every Package
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
              See exactly what&apos;s included at each tier so you can choose
              with confidence.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
            <thead>
              <tr className="border-b border-sand bg-ivory">
                <th className="px-4 py-4 text-left font-sans text-sm font-bold text-ink sm:px-6">
                  Feature
                </th>
                <th className="px-4 py-4 text-center font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#E08A2A] sm:px-6">
                  Standard
                  <span className="mt-1 block font-sans text-[10px] font-medium normal-case tracking-normal text-charcoal">
                    starter
                  </span>
                </th>
                <th className="px-4 py-4 text-center font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#E08A2A] sm:px-6">
                  Signature
                  <span className="mt-1 block font-sans text-[10px] font-medium normal-case tracking-normal text-charcoal">
                    most popular
                  </span>
                </th>
                <th className="px-4 py-4 text-center font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#E08A2A] sm:px-6">
                  Elite
                  <span className="mt-1 block font-sans text-[10px] font-medium normal-case tracking-normal text-charcoal">
                    all-inclusive
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {packageComparison.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-white" : "bg-ivory/40"}
                >
                  <td className="px-4 py-3.5 font-sans text-sm text-ink sm:px-6">
                    {row.feature}
                  </td>
                  <td className="px-4 py-3.5 text-center sm:px-6">
                    <CellMark included={row.standard} />
                  </td>
                  <td className="px-4 py-3.5 text-center sm:px-6">
                    <CellMark included={row.signature} />
                  </td>
                  <td className="px-4 py-3.5 text-center sm:px-6">
                    <CellMark included={row.elite} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        <FadeIn className="mt-6 text-center">
          <p className="font-sans text-sm text-charcoal">
            Need something bespoke? We build custom packages for every author
            and budget.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
