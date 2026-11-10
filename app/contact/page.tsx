import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { EstimateForm } from "@/components/estimate/EstimateForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { StakeLabel } from "@/components/ui/StakeLabel";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Estimate & Contact | Karmel Trucking & Excavating, Mechanicsville, MD",
  description:
    "Request a free estimate for land clearing, grading, drainage, driveways or bulk material delivery in Southern Maryland. Call (240) 412-7476.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section aria-labelledby="contact-hero" className="contour bg-asphalt pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="wrap">
            <StakeLabel>Free estimate · Mechanicsville, MD</StakeLabel>
            <h1 id="contact-hero" className="font-display mt-6 max-w-4xl text-[clamp(2.6rem,8vw,6rem)]">
              Tell us about <span className="text-green">the job.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-limestone/80 sm:text-xl">
              Four quick steps. Or just call {business.ownerFirst}:{" "}
              <a href={business.phoneHref} className="tnum font-semibold text-limestone underline-offset-4 hover:underline">
                {business.phoneDisplay}
              </a>
            </p>
          </div>
        </section>

        <section aria-label="Estimate form and contact details" className="bg-asphalt pb-20 sm:pb-28">
          <div className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="rounded-[var(--radius)] border border-line-dark bg-card-dark lg:col-span-7">
              <EstimateForm titleId="contact-estimate-title" variant="inline" />
            </div>

            <div className="grid content-start gap-6 lg:col-span-5">
              <div className="rounded-[var(--radius)] bg-limestone p-6 text-asphalt sm:p-8">
                <h2 className="font-display text-2xl">{business.shortName}</h2>
                <ul className="mt-6 grid gap-4">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-green-ink" aria-hidden="true" />
                    <address className="not-italic">
                      {business.street}, {business.town}, {business.state} {business.zip}
                      <br />
                      <span className="text-muted-light">{business.county}, {business.region}</span>
                    </address>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-green-ink" aria-hidden="true" />
                    <a href={business.phoneHref} className="tnum font-semibold hover:underline">
                      {business.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-green-ink" aria-hidden="true" />
                    <a href={`mailto:${business.email}`} className="break-all hover:underline">
                      {business.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <FacebookIcon className="mt-0.5 size-5 shrink-0 text-green-ink" />
                    <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Facebook<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
                <p className="mt-6 border-t border-line-light pt-4 text-sm text-muted-light">
                  We accept cash, check, credit card, PayPal, Venmo or Zelle.
                </p>
              </div>
              <MapEmbed className="min-h-[320px] lg:min-h-[380px]" />
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
