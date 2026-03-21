export type ListingCategory =
  | "paper"
  | "food waste"
  | "cardboard"
  | "wood scraps"
  | "electronics parts"
  | "acrylic sheets"
  | "containers"
  | "fabric"
  | "event leftovers";

export type RecommendedAction = "reuse" | "donate" | "recycle" | "repurpose" | "dispose";

export interface AnalysisResult {
  title: string;
  category: ListingCategory;
  condition: string;
  recommendedAction: RecommendedAction;
  reuseValue: string;
  recycleValue: string;
  reuseIdeas: string[];
  sustainabilityImpact: string;
  bountyPoints: number;
  notes: string;
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
