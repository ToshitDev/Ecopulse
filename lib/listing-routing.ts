import type { Listing, RecommendedAction } from "@/lib/types";

export function isMarketplaceAction(action: RecommendedAction) {
  return action === "reuse";
}

export function isMarketplaceListing(listing: Listing) {
  return isMarketplaceAction(listing.recommendedAction);
}

export function isRecoveryListing(listing: Listing) {
  return !isMarketplaceListing(listing);
}

export function getRecoveryStatusText(action: RecommendedAction, status: Listing["status"]) {
  if (status === "recycled") {
    return "Recycled";
  }

  if (status === "disposed") {
    return "Disposed";
  }

  if (status === "donated") {
    return "Donation routed";
  }

  switch (action) {
    case "recycle":
      return "Ready for recycling";
    case "dispose":
      return "Needs disposal";
    case "donate":
      return "Donation candidate";
    default:
      return "Needs action";
  }
}

export function getRecoveryActionLabel(action: RecommendedAction, status: Listing["status"]) {
  if (status !== "available") {
    return getRecoveryStatusText(action, status);
  }

  switch (action) {
    case "recycle":
      return "Mark as Recycled";
    case "dispose":
      return "Mark as Disposed";
    case "donate":
      return "Route to Donation";
    default:
      return "Complete Action";
  }
}

export function getRecoveryCompletionStatus(action: RecommendedAction): Listing["status"] {
  switch (action) {
    case "recycle":
      return "recycled";
    case "dispose":
      return "disposed";
    case "donate":
      return "donated";
    default:
      return "donated";
  }
}
