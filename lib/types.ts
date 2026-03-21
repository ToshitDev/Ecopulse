export type ListingCategory =
  | "paper"
  | "food waste"
  | "cardboard"
  | "wood scraps"
  | "electronics parts"
  | "acrylic sheets"
  | "containers"
  | "fabric"
  | "event leftovers"
  | "Metal"
  | "Plastic"
  | "Mixed waste"
  | "Electronic waste"
  | "Furniture";

export type RecommendedAction = "reuse" | "donate" | "recycle" | "repurpose" | "dispose";

export interface AnalysisResult {
  title: string;
  category: ListingCategory;
  material?: string;
  condition: string;
  recommendedAction: RecommendedAction;
  bestNextAction?: string;
  reuseValue: string;
  recycleValue: string;
  reuseIdeas: string[];
  sustainabilityImpact: string;
  bountyPoints: number;
  notes: string;
  cta?: string;
}

export interface Listing extends AnalysisResult {
  id: string;
  imageUrl: string;
  imageName: string;
  postedBy: string;
  location: string;
  status: "available" | "captured";
  capturedBy?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  postedCount: number;
  capturedCount: number;
  reusedCount: number;
  tagline: string;
}

export interface AppState {
  listings: Listing[];
  leaderboard: LeaderboardUser[];
}
