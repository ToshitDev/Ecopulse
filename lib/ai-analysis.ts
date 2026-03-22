import type { AnalysisResult, RecommendedAction } from "@/lib/types";

const AI_RECOMMENDED_ACTIONS = ["reuse", "recycle", "dispose", "donate"] as const;

export interface AIAnalysisResponse {
  title: string;
  category: string;
  material: string;
  condition: string;
  recommendedAction: (typeof AI_RECOMMENDED_ACTIONS)[number];
  bestNextAction: string;
  reuseValue: string;
  recycleValue: string;
  impactValue: number;
  impactEstimate: string;
  suggestedReuse: string[];
  cta: string;
}

export const GEMINI_ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    category: { type: "string" },
    material: { type: "string" },
    condition: { type: "string" },
    recommendedAction: {
      type: "string",
      enum: [...AI_RECOMMENDED_ACTIONS],
    },
    bestNextAction: { type: "string" },
    reuseValue: { type: "string" },
    recycleValue: { type: "string" },
    impactValue: { type: "integer" },
    impactEstimate: { type: "string" },
    suggestedReuse: {
      type: "array",
      items: { type: "string" },
    },
    cta: { type: "string" },
  },
  required: [
    "title",
    "category",
    "material",
    "condition",
    "recommendedAction",
    "bestNextAction",
    "reuseValue",
    "recycleValue",
    "impactValue",
    "impactEstimate",
    "suggestedReuse",
    "cta",
  ],
} as const;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseAIAnalysisResponse(input: unknown): AIAnalysisResponse | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const value = input as Record<string, unknown>;
  const recommendedAction = value.recommendedAction;
  const suggestedReuse = Array.isArray(value.suggestedReuse)
    ? value.suggestedReuse.filter(isNonEmptyString).slice(0, 5)
    : null;

  if (
    !isNonEmptyString(value.title) ||
    !isNonEmptyString(value.category) ||
    !isNonEmptyString(value.material) ||
    !isNonEmptyString(value.condition) ||
    !isNonEmptyString(recommendedAction) ||
    !AI_RECOMMENDED_ACTIONS.includes(
      recommendedAction as (typeof AI_RECOMMENDED_ACTIONS)[number],
    ) ||
    !isNonEmptyString(value.bestNextAction) ||
    !isNonEmptyString(value.reuseValue) ||
    !isNonEmptyString(value.recycleValue) ||
    typeof value.impactValue !== "number" ||
    !Number.isFinite(value.impactValue) ||
    !Number.isInteger(value.impactValue) ||
    !isNonEmptyString(value.impactEstimate) ||
    !suggestedReuse ||
    !isNonEmptyString(value.cta)
  ) {
    return null;
  }

  return {
    title: value.title.trim(),
    category: value.category.trim(),
    material: value.material.trim(),
    condition: value.condition.trim(),
    recommendedAction: recommendedAction as (typeof AI_RECOMMENDED_ACTIONS)[number],
    bestNextAction: value.bestNextAction.trim(),
    reuseValue: value.reuseValue.trim(),
    recycleValue: value.recycleValue.trim(),
    impactValue: value.impactValue,
    impactEstimate: value.impactEstimate.trim(),
    suggestedReuse,
    cta: value.cta.trim(),
  };
}

function buildNotes(action: RecommendedAction) {
  switch (action) {
    case "recycle":
      return "This item is better suited for recycling than marketplace posting.";
    case "dispose":
      return "This item appears contaminated or low-value for reuse and should stay out of the marketplace.";
    case "donate":
      return "This item is suitable for donation rather than disposal.";
    case "reuse":
    default:
      return "This item looks suitable for reuse through the EcoPulse marketplace.";
  }
}

export function toAnalysisResult(input: AIAnalysisResponse): AnalysisResult {
  return {
    title: input.title,
    category: input.category,
    material: input.material,
    condition: input.condition,
    recommendedAction: input.recommendedAction,
    bestNextAction: input.bestNextAction,
    reuseValue: input.reuseValue,
    recycleValue: input.recycleValue,
    reuseIdeas: input.suggestedReuse,
    sustainabilityImpact: input.impactEstimate,
    bountyPoints: input.impactValue,
    notes: buildNotes(input.recommendedAction),
    cta: input.cta,
  };
}
