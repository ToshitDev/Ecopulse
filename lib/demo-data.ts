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
    imageUrl: "/shipping-boxes.jpg",
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
    imageUrl: "/wood-offcuts.jpg",
    imageName: "wood-offcuts.jpg",
    postedBy: "Sofia Patel",
    location: "Fabrication lab",
    status: "available",
  },
  {
    id: "seed-3",
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
    imageUrl: "/sensor-bundle.jpg",
    imageName: "sensor-bundle.jpg",
    postedBy: "Reese Alvarez",
    location: "Robotics bench",
    status: "available",
  },
];

export const initialAppState: AppState = {
  listings: seededListings,
  leaderboard: seededLeaderboard,
};
