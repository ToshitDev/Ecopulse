export type ListingCategory = string;

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
