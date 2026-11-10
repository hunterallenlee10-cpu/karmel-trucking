import type { EstimateService } from "./site";
import { p, type Photo } from "./photos";

export type Service = {
  id: string;
  title: string;
  blurb: string;
  reasons: [string, string, string];
  photo?: Photo;
  icon: "trees" | "droplets" | "route" | "shovel" | "hammer" | "waves" | "grid" | "spline" | "axe" | "flask" | "truck";
  prefill: EstimateService[];
};

// Copy stays inside what their Facebook, Thumbtack and reviews say they do. No prices.
export const featuredServices: Service[] = [
  {
    id: "land-clearing",
    title: "Land Clearing",
    blurb: "Lots, drives and building sites cleared down to dirt.",
    reasons: [
      "Trees, root balls and brush pulled and hauled off.",
      "Track loader with a grapple, so stumps come out whole.",
      "Silt fence up where the site needs it.",
    ],
    photo: p("05"),
    icon: "trees",
    prefill: ["Land Clearing"],
  },
  {
    id: "grading-drainage",
    title: "Grading & Drainage",
    blurb: "Level ground, the right slope, and water that goes where it should.",
    reasons: [
      "Yards and pads graded to slope away from the house.",
      "Drain pipe, culverts, catch basins and rip-rap swales.",
      "Erosion fixes built to hold up after the next big rain.",
    ],
    photo: p("20"),
    icon: "droplets",
    prefill: ["Grading", "Drainage"],
  },
  {
    id: "driveways-millings",
    title: "Driveways & Millings",
    blurb: "Millings or stone, spread and rolled tight.",
    reasons: [
      "Double-ground asphalt millings, spread and rolled.",
      "New entrances with culvert pipe set under the apron.",
      "Patches and repairs at the garage or the road.",
    ],
    photo: p("07"),
    icon: "route",
    prefill: ["Driveway / Millings"],
  },
];

export const moreServices: Service[] = [
  {
    id: "excavation-footings",
    title: "Excavation & Footings",
    blurb: "Footings, ponds and deep digs for new construction.",
    reasons: ["Footings dug for new construction.", "Ponds and water features dug out.", "Mini excavators for tight backyards."],
    photo: p("31"),
    icon: "shovel",
    prefill: ["Excavation / Footings"],
  },
  {
    id: "demolition",
    title: "Demolition",
    blurb: "Houses, decks and sheds torn down and hauled off.",
    reasons: ["Structures torn down safely.", "Debris loaded and hauled off.", "Site graded clean when it's done."],
    photo: p("26"),
    icon: "hammer",
    prefill: ["Demolition"],
  },
  {
    id: "pool-removal",
    title: "Pool Removal & Fill",
    blurb: "In-ground pools broken out, filled and seeded.",
    reasons: ["Pool broken out and filled.", "Graded back level with the yard.", "Seed and straw down to finish."],
    photo: p("18"),
    icon: "waves",
    prefill: ["Pool Removal"],
  },
  {
    id: "pads",
    title: "Pads for Sheds & Pools",
    blurb: "Level, framed pads that stay put.",
    reasons: ["Timber frame, fabric and gravel.", "Leveled pads for above-ground pools.", "Drainage checked before the pad goes in."],
    photo: p("27"),
    icon: "grid",
    prefill: ["Pad for Shed / Pool"],
  },
  {
    id: "trenching",
    title: "Trenching",
    blurb: "Trenches for drain lines, gutters and utilities.",
    reasons: ["Gutter and drain line trenches.", "Long runs out to barns and outbuildings.", "Back-filled and cleaned up."],
    photo: p("23"),
    icon: "spline",
    prefill: ["Trenching"],
  },
  {
    id: "stump-grinding",
    title: "Stump Grinding",
    blurb: "Stumps gone so you can mow, build or plant.",
    reasons: ["One stump or a whole lot.", "Pairs with clearing and grading.", "Ask about it with your free estimate."],
    photo: p("04"), // CONFIRM: no dedicated stump grinding photo yet
    icon: "axe",
    prefill: ["Stump Grinding"],
  },
  {
    id: "perc-testing",
    title: "Perc Testing",
    blurb: "Perc tests for new building lots.",
    reasons: ["Part of getting a new lot ready to build.", "Pairs with clearing and a building pad.", "Ask James what your lot needs."],
    icon: "flask",
    prefill: ["Perc Test"],
  },
  {
    id: "material-delivery",
    title: "Bulk Material Delivery",
    blurb: "Stone, millings, topsoil, mulch and fill dirt by the load.",
    reasons: ["Delivery without booking a full job.", "Dumped where you want it.", "Not sure how much? Use the calculator."],
    photo: p("06"),
    icon: "truck",
    prefill: ["Material Delivery"],
  },
];
