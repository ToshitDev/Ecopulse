import type { AppState, LeaderboardUser, Listing } from "@/lib/types";

export const POST_POINTS = 10;
export const CAPTURE_POINTS = 50;
export const VERIFIED_REUSE_POINTS = 50;
export const DEMO_POSTER_ID = "you";
export const DEMO_CAPTURE_USER_ID = "maya";
export const seededCampusImpact = {
  recycledItems: 9,
  wasteDivertedLbs: 86,
};

function makePlaceholder(title: string, tone: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="${tone}" />
      <rect x="60" y="60" width="1080" height="680" rx="40" fill="rgba(255,255,255,0.28)" />
      <text x="80" y="160" fill="#1f241f" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">
        EcoPulse
      </text>
      <text x="80" y="250" fill="#1f241f" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="700">
        ${title}
      </text>
      <text x="80" y="332" fill="#364035" font-family="Arial, Helvetica, sans-serif" font-size="28">
        Demo listing preview
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const seededLeaderboard: LeaderboardUser[] = [
  {
    id: "maya",
    name: "Maya Chen",
    points: 170,
    postedCount: 3,
    capturedCount: 2,
    reusedCount: 1,
    tagline: "Takes event leftovers before they hit the dumpster.",
  },
  {
    id: "jonah",
    name: "Jonah Brooks",
    points: 140,
    postedCount: 4,
    capturedCount: 1,
    reusedCount: 1,
    tagline: "Builds prototypes from workshop offcuts.",
  },
  {
    id: "sofia",
    name: "Sofia Patel",
    points: 120,
    postedCount: 2,
    capturedCount: 1,
    reusedCount: 1,
    tagline: "Keeps packaging and acrylic scraps in circulation.",
  },
  {
    id: "reese",
    name: "Reese Alvarez",
    points: 90,
    postedCount: 2,
    capturedCount: 1,
    reusedCount: 0,
    tagline: "Finds homes for storage containers and spare parts.",
  },
];

export const seededListings: Listing[] = [
  {
    id: "seed-1",
    title: "Double-wall shipping boxes",
    category: "cardboard",
    condition: "Clean and flattened",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Medium",
    reuseIdeas: [
      "Use for student move-out packing",
      "Turn into event signage backing",
      "Cut into protective bench covers",
    ],
    sustainabilityImpact: "Keeps about 12 pounds of cardboard in reuse instead of disposal.",
    bountyPoints: 20,
    notes: "Bundle of medium boxes from this week's supply shipment.",
    imageUrl: makePlaceholder("Double-wall shipping boxes", "#d9c1a5"),
    imageName: "shipping-boxes.jpg",
    postedBy: "Jonah Brooks",
    location: "Engineering studio",
    status: "available",
  },
  {
    id: "seed-2",
    title: "Birch plywood offcuts",
    category: "wood scraps",
    condition: "Good, mixed sizes",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Low",
    reuseIdeas: [
      "Laser-cut test pieces",
      "Shelf brackets for pop-up displays",
      "Prototype jigs for class projects",
    ],
    sustainabilityImpact: "Could replace a fresh quarter-sheet of plywood on the next build.",
    bountyPoints: 30,
    notes: "Mostly 8 to 18 inch strips from a furniture prototype run.",
    imageUrl: makePlaceholder("Birch plywood offcuts", "#cfb69b"),
    imageName: "wood-offcuts.jpg",
    postedBy: "Sofia Patel",
    location: "Fabrication lab",
    status: "available",
  },
  {
    id: "seed-3",
    title: "Clear acrylic sign leftovers",
    category: "acrylic sheets",
    condition: "Minor edge scuffs",
    recommendedAction: "repurpose",
    reuseValue: "Medium",
    recycleValue: "Low",
    reuseIdeas: [
      "Small menu holders",
      "Protective covers for electronics demos",
      "Score and snap into label plates",
    ],
    sustainabilityImpact: "Extends use of plastic sheet stock that would otherwise be trashed after one event.",
    bountyPoints: 25,
    notes: "Six clear pieces left from a campus showcase.",
    imageUrl: makePlaceholder("Clear acrylic sign leftovers", "#d3ddd9"),
    imageName: "acrylic-leftovers.jpg",
    postedBy: "Maya Chen",
    location: "Event storage closet",
    status: "available",
  },
  {
    id: "seed-4",
    title: "Assorted sensor and wire bundle",
    category: "electronics parts",
    condition: "Tested, mixed batch",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Low",
    reuseIdeas: [
      "Rapid Arduino prototyping",
      "Repair kits for class demos",
      "STEM workshop activity bins",
    ],
    sustainabilityImpact: "Saves a new order of small components and keeps e-waste out of the bin.",
    bountyPoints: 35,
    notes: "Includes jumper wires, breadboard sensors, and spare headers.",
    imageUrl: makePlaceholder("Assorted sensor and wire bundle", "#c9d4d2"),
    imageName: "sensor-bundle.jpg",
    postedBy: "Reese Alvarez",
    location: "Robotics bench",
    status: "available",
  },
  {
    id: "seed-5",
    title: "Stackable deli containers",
    category: "containers",
    condition: "Washed and nested",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Medium",
    reuseIdeas: [
      "Organize screws and small parts",
      "Portion paint or glue for workshops",
      "Sort giveaway materials by table",
    ],
    sustainabilityImpact: "Reuses food-service plastic instead of buying new organizers.",
    bountyPoints: 18,
    notes: "Twenty clear quart containers with matching lids.",
    imageUrl: makePlaceholder("Stackable deli containers", "#d5e0cf"),
    imageName: "containers.jpg",
    postedBy: "Jonah Brooks",
    location: "Community kitchen back shelf",
    status: "available",
  },
  {
    id: "seed-6",
    title: "Canvas banner scraps",
    category: "fabric",
    condition: "Clean, weather-resistant",
    recommendedAction: "repurpose",
    reuseValue: "Medium",
    recycleValue: "Low",
    reuseIdeas: [
      "Tool roll sleeves",
      "Durable tote panel tests",
      "Protective wraps for market displays",
    ],
    sustainabilityImpact: "Gives event material a second life before it becomes landfill waste.",
    bountyPoints: 22,
    notes: "Trimmed pieces from last month's volunteer fair backdrop.",
    imageUrl: makePlaceholder("Canvas banner scraps", "#d3c1b1"),
    imageName: "canvas-scraps.jpg",
    postedBy: "Maya Chen",
    location: "Print shop rack",
    status: "captured",
    capturedBy: "Sofia Patel",
  },
];

export const initialAppState: AppState = {
  listings: seededListings,
  leaderboard: seededLeaderboard,
};
