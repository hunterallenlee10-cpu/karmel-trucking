import { Plus } from "lucide-react";
import { business } from "@/lib/site";
import { StakeLabel } from "@/components/ui/StakeLabel";

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: "Are estimates free?", a: "Yes. Free estimates, always." },
  {
    q: "What areas do you serve?",
    a: (
      <>
        Mechanicsville and Southern Maryland. Not sure about your spot? Call {business.ownerFirst} at{" "}
        <a href={business.phoneHref} className="tnum font-semibold text-limestone underline underline-offset-4">
          {business.phoneDisplay}
        </a>
        .
      </>
    ),
  },
  // CONFIRM wording
  { q: "Do you haul away the trees, stumps and debris?", a: "Yes. Clearing includes hauling off brush and root balls." },
  {
    q: "Can you deliver stone, millings, topsoil, mulch or fill dirt without a full job?",
    a: "Yes. Bulk delivery is a core service. Use the calculator above to ballpark how much you need.",
  },
  { q: "Do you do perc testing?", a: "Yes." },
  {
    q: "My yard floods or water sits by the house. Can you fix it?",
    a: "Yes. Drainage pipe, culverts, swales and regrading so water runs away from the house.",
  },
  { q: "How do I pay?", a: "Cash, check, credit card, PayPal, Venmo or Zelle." },
  // CONFIRM before showing to anyone
  { q: "Are you licensed and insured?", a: "Yes." },
];

/** Native details/summary accordion: keyboard and screen reader friendly with no JS. */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="contour bg-asphalt py-20 sm:py-28 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <StakeLabel num="08">FAQ</StakeLabel>
          <h2 id="faq-title" className="font-display mt-5 text-[clamp(2.2rem,5vw,3.75rem)]">
            Straight answers
          </h2>
          <p className="mt-5 max-w-sm text-lg text-limestone/75">
            Anything else, just call.{" "}
            <a href={business.phoneHref} className="tnum font-semibold text-limestone hover:text-green">
              {business.phoneDisplay}
            </a>
          </p>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-line-dark">
            {FAQS.map((f, i) => (
              <li key={f.q} className="border-b border-line-dark">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start gap-5 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="stake tnum mt-1.5 w-6 shrink-0 text-green">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-lg font-semibold sm:text-xl">{f.q}</span>
                    <Plus className="mt-1 size-5 shrink-0 text-limestone/70 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="-mt-2 pr-10 pb-6 pl-11 text-[1.05rem] leading-relaxed text-limestone/80">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
