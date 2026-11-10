import manifest from "./image-manifest.json";

// Every photo is a real Karmel job photo from the Drive folder.
// `src` is a base path; lib/image-loader.ts picks the right webp width.

export type Category =
  | "Land Clearing"
  | "Grading & Pads"
  | "Drainage"
  | "Driveways"
  | "Pools"
  | "Demolition"
  | "Hardscape"
  | "Equipment";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: Category;
};

const AREA = "Southern Maryland";

const defs: Array<[string, string, Category, string]> = [
  ["01-hero-two-cat-excavators-land-clearing-site", "Two CAT excavators on a cleared land clearing site under blue sky", "Land Clearing", "Two CAT excavators on a freshly cleared site"],
  ["02-hero-alt-case-cx57c-excavator-cleared-lot", "Case CX57C excavator on a freshly cleared lot", "Equipment", "Case CX57C on a freshly cleared lot"],
  ["03-kubota-kx033-mini-excavator-backyard-dig", "Kubota KX033-4 mini excavator digging in a fenced backyard", "Grading & Pads", "Tight access: a Kubota mini excavator in a fenced backyard"],
  ["04-kubota-mini-excavator-wooded-lot-winter", "Mini excavator clearing a wooded lot in winter", "Land Clearing", "Clearing a wooded lot in winter"],
  ["05-deere-323e-track-loader-grapple-land-clearing", "John Deere 323E track loader with grapple clearing stumps beside silt fence", "Land Clearing", "Deere 323E with a grapple, pulling stumps"],
  ["06-dump-truck-stone-delivery-cleared-lot", "Dump truck loaded with stone on a cleared lot", "Driveways", "Stone delivery on a cleared lot"],
  ["07-millings-driveway-finished-house-wide", "Finished asphalt millings driveway sweeping up to a house", "Driveways", "Finished millings driveway, spread and rolled"],
  ["08-millings-driveway-finished-shed-view", "Finished millings driveway leading to a shed", "Driveways", "Same millings driveway, toward the shed"],
  ["09-driveway-roller-compaction-crew", "Crew member on a roller compacting a driveway", "Driveways", "Rolling the driveway tight"],
  ["10-driveway-asphalt-patch-garage", "Asphalt driveway patch at a garage", "Driveways", "Asphalt patch at the garage"],
  ["11-land-clearing-road-cut-through-woods", "Fresh dirt road cut through the woods", "Land Clearing", "A fresh road cut through the woods"],
  ["12-land-clearing-graded-drive-through-woods", "Graded dirt drive cut through the woods", "Land Clearing", "Graded drive through the woods"],
  ["13-cleared-graded-building-pad", "Cleared and graded building pad at the edge of the woods", "Grading & Pads", "Cleared and graded building pad"],
  ["14-graded-hillside-blue-sky", "Freshly graded hillside under blue sky", "Grading & Pads", "Freshly graded hillside"],
  ["15-pool-removal-BEFORE-inground-pool", "Old in-ground pool before removal", "Pools", "Before: the old in-ground pool"],
  ["16-pool-removal-DURING-excavation-fill", "In-ground pool being broken out and filled", "Pools", "During: breaking it out and filling"],
  ["17-pool-removal-AFTER-seeded-strawed-lawn", "Former pool area graded, seeded and strawed", "Pools", "After: seeded and strawed"],
  ["18-pool-removal-AFTER-graded-yard-house", "Graded yard toward the house after pool removal", "Pools", "After: graded yard back to the house"],
  ["19-mini-excavator-front-yard-dig", "Mini excavator digging in a residential front yard", "Drainage", "Mini excavator in a front yard"],
  ["20-yard-drainage-corrugated-pipe-trench", "Long corrugated drain pipe laid in a yard trench", "Drainage", "Yard drainage: corrugated pipe in the trench"],
  ["21-culvert-pipe-install-roadside", "Large culvert pipe going in at a roadside driveway entrance", "Drainage", "Culvert going in at a driveway entrance"],
  ["22-driveway-entrance-culvert-woods", "New driveway apron with culvert leading into the woods", "Driveways", "New driveway apron with culvert"],
  ["23-utility-trench-to-pole-barn", "Long utility trench running uphill to a pole barn", "Drainage", "Utility trench up to a pole barn"],
  ["24-drainage-catch-basin-trench", "Catch basin and drain line set in a trench", "Drainage", "Catch basin and drain line"],
  ["25-rip-rap-rock-drainage-swale-hillside", "Rip-rap rock drainage swale running down a wooded hillside", "Drainage", "Rip-rap swale to stop erosion"],
  ["26-demolition-house-teardown-debris", "House teardown debris pile on a demolition site", "Demolition", "House teardown"],
  ["27-shed-pad-timber-frame-fabric-excavator", "Timber-framed shed pad with fabric, excavator behind", "Grading & Pads", "Shed pad: timber frame and fabric"],
  ["28-timber-framed-gravel-pad-pea-gravel-path", "Finished timber-framed gravel pad with pea gravel border", "Grading & Pads", "Finished gravel pad with pea gravel border"],
  ["29-above-ground-pool-site-prep-stone-ring", "Above-ground pool on a leveled pad with a white stone ring", "Pools", "Pool pad, leveled with a stone ring"],
  ["30-above-ground-pool-sand-base-prep", "Sand base prepared inside an above-ground pool wall", "Pools", "Sand base inside the pool wall"],
  ["31-excavation-dig-site-bucket-view", "Deep excavation seen from the operator's seat", "Grading & Pads", "Deep dig from the operator's seat"],
  ["32-pond-water-feature-excavation", "Pond excavation beside a brick home", "Grading & Pads", "Pond excavation"],
  ["33-paver-patio-black-fence", "Finished paver patio beside a black fence", "Hardscape", "Paver patio"], // CONFIRM their work
  ["34-stone-retaining-wall-deck-border", "Block retaining wall along a deck", "Hardscape", "Block retaining wall along a deck"], // CONFIRM their work
  ["35-stone-fire-pit-lakeside-lawn", "Stone fire pit on a lakeside lawn", "Hardscape", "Stone fire pit by the water"], // CONFIRM their work
  ["36-snow-plow-truck-commercial-lot", "Ford truck with a Western snow plow in a commercial lot", "Equipment", "Snow plowing a commercial lot"],
  ["37-playground-rubber-surface-site-work", "Playground site work with rubber surface", "Grading & Pads", "Playground site work"],
];

const dims = manifest as Record<string, { width: number; height: number }>;

export const photos: Photo[] = defs.map(([id, alt, category, caption]) => ({
  id,
  src: `/images/${id}`,
  width: dims[id].width,
  height: dims[id].height,
  alt: `${alt}, ${AREA}`,
  caption,
  category,
}));

const byNum = new Map(photos.map((p) => [p.id.slice(0, 2), p]));

/** Look up a photo by its two-digit number, e.g. p("07"). */
export function p(num: string): Photo {
  const photo = byNum.get(num);
  if (!photo) throw new Error(`Unknown photo ${num}`);
  return photo;
}

export const galleryFilters = [
  "All",
  "Land Clearing",
  "Grading & Pads",
  "Drainage",
  "Driveways",
  "Pools",
  "Demolition",
  "Hardscape",
] as const;
