import type { AnalysisResult } from "@/lib/types";

function normalizePhrase(value: string | undefined, fallback: string) {
  return (value?.trim() || fallback).toLowerCase();
}

export function getWhyThisDecision(result: AnalysisResult) {
  if (result.whyThisDecision?.trim()) {
    return result.whyThisDecision;
  }

  const material = normalizePhrase(result.material, result.category);
  const condition = normalizePhrase(result.condition, "mixed condition");

  switch (result.recommendedAction) {
    case "recycle":
      return `Best for recycling because this looks like ${condition} ${material} with limited reuse value.`;
    case "dispose":
      return `Best for disposal because this appears ${condition} and not suitable for reuse.`;
    case "donate":
      return `Best for donation because this still looks usable but is better suited for community reuse.`;
    case "reuse":
    default:
      return `Best for marketplace because this item still looks functional and useful for someone else.`;
  }
}

export function getNextStepMessage(result: AnalysisResult) {
  if (result.nextStepMessage?.trim()) {
    return result.nextStepMessage;
  }

  switch (result.recommendedAction) {
    case "recycle":
      return "Recycle properly after emptying or rinsing if needed.";
    case "dispose":
      return "Dispose properly and avoid contaminating recycling streams.";
    case "donate":
      return "Route this item to donation or community reuse.";
    case "reuse":
    default:
      return "Post this to Marketplace for campus pickup.";
  }
}
