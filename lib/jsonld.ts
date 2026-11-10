import { business, proof, SITE_URL } from "./site";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  telephone: "+1-240-412-7476",
  email: business.email,
  founder: { "@type": "Person", name: business.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    addressLocality: business.town,
    addressRegion: business.state,
    postalCode: business.zip,
    addressCountry: "US",
  },
  areaServed: { "@type": "AdministrativeArea", name: business.region },
  paymentAccepted: business.payments.join(", "),
  sameAs: [business.facebook],
  description:
    "Land clearing, grading, drainage, demolition and bulk stone, millings and topsoil delivery in Southern Maryland. Free estimates.",
  // Source: Thumbtack profile, 4.6 average from 7 reviews (verified business facts, Nov 2026).
  // Facebook recommendations are not used here because they carry no star values.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: proof.thumbtack.rating,
    reviewCount: proof.thumbtack.reviews,
    bestRating: "5",
  },
};
