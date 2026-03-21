import type { AnalysisResult } from "@/lib/types";

const profiles: Record<string, AnalysisResult> = {
  paperWaste: {
    title: "Crumpled paper waste",
    category: "paper",
    condition: "Used / crumpled",
    recommendedAction: "recycle",
    reuseValue: "Low",
    recycleValue: "High",
    reuseIdeas: [
      "Place it in a clean paper recycling stream",
      "Keep it dry and separate from food waste",
      "Only repurpose it if there is an immediate need for scrap paper",
    ],
    sustainabilityImpact: "Suitable for paper recycling, but low direct reuse value.",
    bountyPoints: 5,
    notes: "This looks like discarded paper waste rather than a reusable campus listing.",
  },
  foodWaste: {
    title: "Food waste / disposable trash",
    category: "food waste",
    condition: "Used / disposable",
    recommendedAction: "dispose",
    reuseValue: "Low",
    recycleValue: "Low",
    reuseIdeas: [
      "Sort compostable scraps if a compost stream is available",
      "Keep food-soiled disposables out of the reuse marketplace",
      "Discard in the correct waste stream right away",
    ],
    sustainabilityImpact: "Low direct reuse value and usually not suitable for marketplace posting.",
    bountyPoints: 2,
    notes: "This appears to be used food-related waste, not a reusable material listing.",
  },
  cardboard: {
    title: "Shipping boxes and cardboard",
    category: "cardboard",
    condition: "Clean and sturdy",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Medium",
    reuseIdeas: [
      "Protect tabletops during paint work",
      "Pack donation supplies",
      "Cut into divider panels for storage bins",
    ],
    sustainabilityImpact: "Likely avoids one full recycling pickup bag and extends the material one more use cycle.",
    bountyPoints: 20,
    notes: "Good candidate for quick campus reuse before recycling.",
  },
  acrylic: {
    title: "Acrylic or plastic sheet offcuts",
    category: "acrylic sheets",
    condition: "Minor cosmetic wear",
    recommendedAction: "repurpose",
    reuseValue: "Medium",
    recycleValue: "Low",
    reuseIdeas: [
      "Small sign holders",
      "Protective covers for displays",
      "Label plates for storage shelves",
    ],
    sustainabilityImpact: "Extends the life of sheet material already in circulation.",
    bountyPoints: 25,
    notes: "Still useful for display, protection, and small fabrication tasks.",
  },
  electronics: {
    title: "Electronics parts and wires",
    category: "electronics parts",
    condition: "Mixed but likely test-ready",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Low",
    reuseIdeas: [
      "Starter kits for student demos",
      "Repair bins for maker projects",
      "Sensor swap table stock",
    ],
    sustainabilityImpact: "Keeps useful parts out of e-waste while avoiding a small replacement order.",
    bountyPoints: 35,
    notes: "Best for prototyping, repair benches, and quick classroom experiments.",
  },
  containers: {
    title: "Reusable storage containers",
    category: "containers",
    condition: "Clean and stackable",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Medium",
    reuseIdeas: [
      "Parts sorting",
      "Workshop cleanup kits",
      "Event setup bins",
    ],
    sustainabilityImpact: "Replaces the need to buy fresh organizers for a small team workflow.",
    bountyPoints: 18,
    notes: "Simple, useful, and easy for another team to claim quickly.",
  },
  fabric: {
    title: "Fabric and soft material scraps",
    category: "fabric",
    condition: "Clean and cuttable",
    recommendedAction: "repurpose",
    reuseValue: "Medium",
    recycleValue: "Low",
    reuseIdeas: [
      "Protective wraps",
      "Sewing test pieces",
      "Table runners for pop-up events",
    ],
    sustainabilityImpact: "Diverts usable textile scraps from disposal and supports lightweight reuse.",
    bountyPoints: 22,
    notes: "Best for prototypes, padding, and small sewn accessories.",
  },
  event: {
    title: "Reusable event materials",
    category: "event leftovers",
    condition: "Still presentable",
    recommendedAction: "reuse",
    reuseValue: "High",
    recycleValue: "Low",
    reuseIdeas: [
      "Volunteer check-in supplies",
      "Pop-up booth setup",
      "Class event material packs",
    ],
    sustainabilityImpact: "Turns one-time event extras into reusable stock for the next community activity.",
    bountyPoints: 28,
    notes: "Only use this when the materials still look clean, usable, and event-ready.",
  },
};

function normalizeFilename(filename: string) {
  return filename.trim().replace(/\s+/g, " ").toLowerCase();
}

const demoFilenameProfiles: Record<string, AnalysisResult> = {
  [normalizeFilename("WhatsApp Image 2026-03-21 at 14.41.55.jpeg")]: {
    title: "Empty aluminum energy drink cans",
    category: "Metal",
    material: "Aluminum",
    condition: "Used",
    recommendedAction: "recycle",
    bestNextAction: "Sort for recycling",
    reuseValue: "Low",
    recycleValue: "High",
    bountyPoints: 20,
    sustainabilityImpact:
      "Aluminum is highly recyclable, and separating these cans helps recover valuable material while reducing landfill waste.",
    reuseIdeas: [],
    notes:
      "This upload is a recycling candidate, not a marketplace reuse listing.",
    cta: "Mark for Recycling",
  },
  [normalizeFilename("WhatsApp Image 2026-03-21 at 14.43.03.jpeg")]: {
    title: "Empty plastic water bottles",
    category: "Plastic",
    material: "PET plastic",
    condition: "Used",
    recommendedAction: "recycle",
    bestNextAction: "Recycle properly",
    reuseValue: "Low",
    recycleValue: "High",
    bountyPoints: 15,
    sustainabilityImpact:
      "Recycling clean plastic bottles helps recover usable material and reduces single-use plastic waste on campus.",
    reuseIdeas: [],
    notes:
      "This upload should go to recycling rather than the campus marketplace.",
    cta: "Mark for Recycling",
  },
  [normalizeFilename("WhatsApp Image 2026-03-21 at 16.01.30.jpeg")]: {
    title: "Food waste on disposable plates",
    category: "Mixed waste",
    material: "Food scraps and contaminated disposable material",
    condition: "Used / contaminated",
    recommendedAction: "dispose",
    bestNextAction: "Dispose properly",
    reuseValue: "None",
    recycleValue: "Low",
    bountyPoints: 5,
    sustainabilityImpact:
      "Food-contaminated disposable plates are not suitable for reuse and may not be recyclable, so proper disposal helps reduce contamination in recycling streams.",
    reuseIdeas: [],
    notes:
      "This upload is contaminated waste and should not be posted to the marketplace.",
    cta: "Dispose Properly",
  },
  [normalizeFilename("WhatsApp Image 2026-03-21 at 16.08.20.jpeg")]: {
    title: "Damaged computer keyboard",
    category: "Electronic waste",
    material: "Mixed electronics and plastic",
    condition: "Broken / nonfunctional",
    recommendedAction: "recycle",
    bestNextAction: "Send to e-waste recycling",
    reuseValue: "None",
    recycleValue: "Medium to High",
    bountyPoints: 25,
    sustainabilityImpact:
      "Electronic waste contains recoverable materials and should be handled through proper e-waste recycling instead of landfill disposal.",
    reuseIdeas: [],
    notes:
      "This upload belongs in e-waste recycling, not the reuse marketplace.",
    cta: "Send to E-Waste Recycling",
  },
  [normalizeFilename("WhatsApp Image 2026-03-21 at 16.23.54.jpeg")]: {
    title: "Used fabric couch",
    category: "Furniture",
    material: "Upholstered furniture",
    condition: "Worn but reusable",
    recommendedAction: "reuse",
    bestNextAction: "Post to marketplace",
    reuseValue: "High",
    recycleValue: "Low",
    bountyPoints: 30,
    sustainabilityImpact:
      "Reusing furniture prevents bulky waste from going to landfill and gives the item a second life through local pickup or donation.",
    reuseIdeas: [
      "Student apartment furniture",
      "Temporary dorm lounge seating",
      "Community reuse / local pickup",
    ],
    notes:
      "This upload is a clear marketplace reuse listing and should be posted for local pickup.",
    cta: "Post to Marketplace",
  },
};

const explicitKeywordRules: Array<{ id: keyof typeof profiles; keywords: string[] }> = [
  {
    id: "paperWaste",
    keywords: [
      "paper",
      "recycling",
      "recycle",
      "crumpled",
      "crumple",
      "worksheet",
      "printer-paper",
      "paper-bin",
    ],
  },
  {
    id: "foodWaste",
    keywords: [
      "food",
      "snack",
      "pizza",
      "plate",
      "plates",
      "utensil",
      "fork",
      "spoon",
      "napkin",
      "trash",
      "garbage",
      "leftover-food",
      "takeout",
      "cup-trash",
    ],
  },
  { id: "cardboard", keywords: ["box", "boxes", "shipping", "cardboard", "carton", "mailer", "package"] },
  { id: "acrylic", keywords: ["acrylic", "plexi", "plastic-sheet", "sheet-offcut", "polycarbonate"] },
  { id: "electronics", keywords: ["wire", "wires", "sensor", "arduino", "breadboard", "circuit", "electronic", "electronics", "cable", "pcb"] },
  { id: "containers", keywords: ["container", "containers", "jar", "tub", "tubs", "lid", "lids", "bottle", "bottles"] },
  { id: "fabric", keywords: ["fabric", "cloth", "canvas", "textile", "blanket", "tote", "soft-material"] },
  { id: "event", keywords: ["event", "sign", "signage", "booth", "backdrop", "poster-board", "foam-board", "lanyard"] },
];

const reusableFallbackOrder: Array<keyof typeof profiles> = [
  "cardboard",
  "acrylic",
  "electronics",
  "containers",
  "fabric",
];

function getStableHash(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) % 2147483647;
  }

  return hash;
}

export function getMockAnalysis(file: File, fallbackSeed = 0): AnalysisResult {
  const normalizedName = normalizeFilename(file.name);

  const demoMatch = demoFilenameProfiles[normalizedName];

  if (demoMatch) {
    return demoMatch;
  }

  const directMatch = explicitKeywordRules.find(({ keywords }) =>
    keywords.some((keyword) => normalizedName.includes(keyword)),
  );

  if (directMatch) {
    return profiles[directMatch.id];
  }

  const fallbackSignature = `${file.name}|${file.type}|${file.size}|${fallbackSeed}`;
  const fallbackHash = getStableHash(fallbackSignature);
  const fallbackId = reusableFallbackOrder[fallbackHash % reusableFallbackOrder.length];

  return profiles[fallbackId];
}
