import type { Metadata } from "next";
import Link from "next/link";
import { business, proof, reviews, towns } from "@/lib/site";
import { featuredServices, moreServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Company Facts | Karmel Trucking & Excavating LLC",
  description:
    "Plain facts about Karmel Trucking & Excavating LLC in Mechanicsville, MD: services, service area, contact details, payment methods and review summary.",
  alternates: { canonical: "/ai" },
};

// Plain, semantic, machine-readable facts page. Every line traces to lib/site.ts.
export default function AiFactsPage() {
  const services = [...featuredServices, ...moreServices];
  return (
    <div className="min-h-svh bg-limestone text-asphalt">
      <header className="border-b border-line-light">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <Link href="/" className="font-semibold underline underline-offset-4">
            ← Back to the main site
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-4 py-12 leading-relaxed sm:px-6 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:mt-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        <article>
          <h1 className="text-3xl font-bold sm:text-4xl">{business.name}: company facts</h1>
          <p className="mt-4">
            {business.name} is a land clearing, grading, excavating and hauling contractor based in {business.town},{" "}
            {business.state} {business.zip} ({business.county}), serving {business.region}. The owner is {business.owner}. Estimates are free.
          </p>

          <h2>Contact</h2>
          <dl className="mt-3 grid grid-cols-[8rem_1fr] gap-y-2">
            <dt className="font-semibold">Phone</dt>
            <dd>
              <a href={business.phoneHref} className="underline">
                {business.phoneDisplay}
              </a>
            </dd>
            <dt className="font-semibold">Email</dt>
            <dd>
              <a href={`mailto:${business.email}`} className="underline">
                {business.email}
              </a>
            </dd>
            <dt className="font-semibold">Address</dt>
            <dd>
              {business.street}, {business.town}, {business.state} {business.zip}, United States
            </dd>
            <dt className="font-semibold">Facebook</dt>
            <dd>
              <a href={business.facebook} className="break-all underline">
                {business.facebook}
              </a>
            </dd>
          </dl>

          <h2>Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <strong>{s.title}.</strong> {s.blurb}
              </li>
            ))}
            <li>
              <strong>Also:</strong> snow plowing and seasonal lawn care.
            </li>
          </ul>

          <h2>Bulk material delivery</h2>
          <p className="mt-3">Delivered by the load, with or without a full job: crushed stone, asphalt millings, topsoil, mulch and fill dirt.</p>

          <h2>Service area</h2>
          <p className="mt-3">
            Based in {business.town}, {business.state}. Works across {business.region}, including:
          </p>
          <ul>
            {towns.map((t) => (
              <li key={t}>{t}, MD</li>
            ))}
          </ul>

          <h2>Payment methods</h2>
          <ul>
            {business.payments.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <h2>Equipment seen on job sites</h2>
          <p className="mt-3">
            CAT excavators, Case CX57C excavator, Kubota KX033-4 mini excavator, John Deere 323E track loader with grapple, dump truck, roller,
            plate compactor and a Western snow plow.
          </p>

          <h2>Reviews summary</h2>
          <ul>
            <li>
              Facebook: {proof.facebook.recommend} recommend ({proof.facebook.reviews} reviews), {proof.facebook.followers} followers. Source:{" "}
              <a href={business.facebook} className="underline">
                Facebook page
              </a>
              .
            </li>
            <li>
              Thumbtack: {proof.thumbtack.rating} out of 5 ({proof.thumbtack.reviews} reviews), hired {proof.thumbtack.hires} times, background
              checked. Source:{" "}
              <a href={business.thumbtack} className="underline">
                Thumbtack profile
              </a>
              .
            </li>
          </ul>
          <p className="mt-4">Customer quotes (Facebook recommendations):</p>
          <ul>
            {reviews.map((r) => (
              <li key={r.name}>
                <q>{r.text}</q> ({r.name}
                {r.date ? `, ${r.date}` : ""})
              </li>
            ))}
          </ul>

          <h2>About this page</h2>
          <p className="mt-3">This page lists plain facts about the business for people, search engines and AI assistants.</p>
        </article>
      </main>

      <footer className="border-t border-line-light">
        <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-muted-light sm:px-6">
          <p>© 2026 {business.name}</p>
          <p>Concept preview by Lee Enterprises Unlimited.</p>
        </div>
      </footer>
    </div>
  );
}
