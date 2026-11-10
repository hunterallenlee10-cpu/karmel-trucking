// Verified business facts. Every fact on the site traces back to this file.
// Items marked CONFIRM are listed in CONFIRM.md.

export const SITE_URL = "https://karmel-trucking-concept.vercel.app";

export const business = {
  name: "Karmel Trucking & Excavating LLC",
  shortName: "Karmel Trucking & Excavating",
  owner: "James Karmel",
  ownerFirst: "James",
  phoneDisplay: "(240) 412-7476",
  phoneHref: "tel:+12404127476",
  smsHref: "sms:+12404127476",
  email: "karmeltruckingllc@gmail.com",
  street: "MD-5",
  town: "Mechanicsville",
  state: "MD",
  zip: "20659",
  county: "St. Mary's County",
  region: "Southern Maryland",
  facebook: "https://www.facebook.com/p/Karmel-Trucking-Excavating-LLC-100064619487292/",
  thumbtack: "https://www.thumbtack.com/md/mechanicsville/excavation/karmel-trucking-excavating-llc/service/426519719942086667",
  payments: ["Cash", "Check", "Credit card", "PayPal", "Venmo", "Zelle"],
  latestJob: "40 tons of double-ground millings, spread and rolled",
} as const;

export const proof = {
  facebook: { recommend: "100%", reviews: 7, followers: 378 },
  thumbtack: { rating: "4.6", reviews: 7, hires: 10 },
} as const;

export type Review = {
  name: string;
  date?: string;
  source: "Facebook" | "Thumbtack";
  text: string;
};

// Quoted verbatim from Facebook recommendations.
export const reviews: Review[] = [
  {
    name: "Erin T.",
    source: "Facebook",
    text: "Highly recommend. Quick responses, and quick delivery on end product! Only company out of 6 that noticed a problem w/ water drainage where I wanted to put my pool.. and went out of their way to fix it for me while doing a different job. HIGHLY recommend!",
  },
  {
    name: "Fran C.",
    date: "Jul 2023",
    source: "Facebook",
    text: "Highly recommend! James and his crew are professional, reliable and reasonably priced. Got the job done fast and right in line with estimate. Will definitely use again whenever needed!",
  },
  {
    name: "Amanda M.",
    date: "Apr 2021",
    source: "Facebook",
    text: "I was having serious erosion problems and James designed the perfect system to stop it. Him and his hardworking crew put in drainage pipes, leveled the land, set in railroad ties, and put down seed matting. He is truly amazing- and I've become a permanent customer!",
  },
  {
    name: "Kindra B.",
    date: "Dec 2021",
    source: "Facebook",
    text: "Cannot say enough about Karmel Trucking & Excavating! I needed some trenches dug for my gutters. They came out and did an excellent job. A few days later it rained and washed out one of the trenches. I text and they came out to fix it right away. If you need any excavating you won't be disappointed with Karmel.",
  },
  {
    name: "Daniel R.",
    date: "Feb 2022",
    source: "Facebook",
    text: "I don't know what right looks like when it comes to grading and excavating work, but James and his crew can give you a good idea. Can't ask for much more, the yard looks great. I'll be passing their information around.",
  },
  {
    name: "Barbara B.",
    date: "Aug 2022",
    source: "Facebook",
    text: "James and his staff very professional and educated on the best fit of my project.",
  },
  {
    name: "Beth G.",
    source: "Facebook",
    text: "Very prompt, and very happy with their work.",
  },
];

export const towns = [
  "Mechanicsville",
  "Leonardtown",
  "California",
  "Hollywood",
  "Charlotte Hall",
  "Hughesville",
  "Waldorf",
  "La Plata",
  "Prince Frederick",
]; // CONFIRM service radius and towns

export const estimateServices = [
  "Land Clearing",
  "Grading",
  "Drainage",
  "Driveway / Millings",
  "Excavation / Footings",
  "Demolition",
  "Pool Removal",
  "Pad for Shed / Pool",
  "Trenching",
  "Stump Grinding",
  "Perc Test",
  "Material Delivery",
] as const;

export type EstimateService = (typeof estimateServices)[number];

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Our Work" },
  { href: "/#materials", label: "Materials" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
];
