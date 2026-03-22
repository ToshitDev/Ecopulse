"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CAPTURE_POINTS,
  DEMO_CAPTURE_USER_ID,
  DEMO_POSTER_ID,
  POST_POINTS,
  initialAppState,
} from "@/lib/demo-data";
import {
  getRecoveryCompletionStatus,
  isMarketplaceAction,
} from "@/lib/listing-routing";
import type { AnalysisResult, AppState, Listing } from "@/lib/types";

const STORAGE_KEY = "wastewanted-demo-state";

interface AppStoreValue extends AppState {
  isReady: boolean;
  captureActorName: string;
  postListing: (input: AnalysisResult & { imageUrl: string; imageName: string }) => void;
  captureListing: (listingId: string) => void;
  resolveRecoveryListing: (listingId: string) => void;
  resetDemo: () => void;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

function cloneInitialState(): AppState {
  return JSON.parse(JSON.stringify(initialAppState)) as AppState;
}

function ensurePoster(state: AppState) {
  const existingPoster = state.leaderboard.find((user) => user.id === DEMO_POSTER_ID);

  if (existingPoster) {
    return existingPoster;
  }

  const poster = {
    id: DEMO_POSTER_ID,
    name: "You",
    points: 0,
    postedCount: 0,
    capturedCount: 0,
    reusedCount: 0,
    tagline: "Posting useful leftovers before they get tossed.",
  };

  state.leaderboard = [...state.leaderboard, poster];
  return poster;
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialAppState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY);
      setState(rawState ? (JSON.parse(rawState) as AppState) : cloneInitialState());
    } catch {
      setState(cloneInitialState());
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isReady, state]);

  const value = useMemo<AppStoreValue>(() => {
    const captureActorName =
      state.leaderboard.find((user) => user.id === DEMO_CAPTURE_USER_ID)?.name ?? "Maya Chen";

    return {
      ...state,
      isReady,
      captureActorName,
      postListing: ({ imageUrl, imageName, ...analysis }) => {
        setState((current) => {
          const next = structuredClone(current);
          const poster = ensurePoster(next);

          const listing: Listing = {
            id: `listing-${Date.now()}`,
            imageUrl,
            imageName,
            postedBy: poster.name,
            location: "Recent upload",
            status: "available",
            ...analysis,
          };

          poster.points += POST_POINTS;
          poster.postedCount += 1;
          next.listings = [listing, ...next.listings];

          return next;
        });
      },
      captureListing: (listingId) => {
        setState((current) => {
          const listing = current.listings.find((entry) => entry.id === listingId);

          if (
            !listing ||
            listing.status === "captured" ||
            !isMarketplaceAction(listing.recommendedAction)
          ) {
            return current;
          }

          const next = structuredClone(current);
          const nextListing = next.listings.find((entry) => entry.id === listingId);
          const capturer = next.leaderboard.find((user) => user.id === DEMO_CAPTURE_USER_ID);

          if (!nextListing || !capturer) {
            return current;
          }

          nextListing.status = "captured";
          nextListing.capturedBy = capturer.name;
          capturer.points += CAPTURE_POINTS;
          capturer.capturedCount += 1;

          return next;
        });
      },
      resolveRecoveryListing: (listingId) => {
        setState((current) => {
          const listing = current.listings.find((entry) => entry.id === listingId);

          if (
            !listing ||
            listing.status !== "available" ||
            isMarketplaceAction(listing.recommendedAction)
          ) {
            return current;
          }

          const next = structuredClone(current);
          const nextListing = next.listings.find((entry) => entry.id === listingId);

          if (!nextListing) {
            return current;
          }

          nextListing.status = getRecoveryCompletionStatus(nextListing.recommendedAction);
          return next;
        });
      },
      resetDemo: () => {
        const resetState = cloneInitialState();
        setState(resetState);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
      },
    };
  }, [isReady, state]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);

  if (!context) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }

  return context;
}
