export type ListingCategory = string;

export type RecommendedAction =
  | "reuse"
  | "donate"
  | "recycle"
  | "dispose";

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
  whyThisDecision?: string;
  nextStepMessage?: string;
  cta?: string;
}

export interface Listing extends AnalysisResult {
  id: string;
  imageUrl: string;
  imageName: string;
  postedBy: string;
  location: string;
  committedAt: string;
  updatedAt: string;
  status:
    | "available"
    | "captured"
    | "recycled"
    | "disposed"
    | "donated";
  capturedBy?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  postedCount: number;
  capturedCount: number;
  recoveryCount: number;
  tagline: string;
}

export interface AppState {
  listings: Listing[];
  leaderboard: LeaderboardUser[];
}
