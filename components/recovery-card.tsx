/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import {
  getRecoveryActionLabel,
  getRecoveryStatusText,
} from "@/lib/listing-routing";
import type { Listing } from "@/lib/types";

function makeImageFallback(title: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#efe6d8" />
      <rect x="60" y="60" width="1080" height="680" rx="40" fill="rgba(255,255,255,0.45)" />
      <text x="80" y="160" fill="#1f241f" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">
        EcoPulse
      </text>
      <text x="80" y="250" fill="#1f241f" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700">
        ${title}
      </text>
      <text x="80" y="332" fill="#4f5a4c" font-family="Arial, Helvetica, sans-serif" font-size="28">
        Image preview unavailable
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function RecoveryCard({
  listing,
  onResolve,
}: {
  listing: Listing;
  onResolve: (id: string) => void;
}) {
  const [imageSrc, setImageSrc] = useState(listing.imageUrl);

  useEffect(() => {
    setImageSrc(listing.imageUrl);
  }, [listing.imageUrl]);

  const actionLabel = getRecoveryActionLabel(listing.recommendedAction, listing.status);
  const statusLabel = getRecoveryStatusText(listing.recommendedAction, listing.status);
  const isResolved = listing.status !== "available";

  return (
    <article className="surface-card overflow-hidden rounded-[1.9rem]">
      <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="soft-panel border-b border-[color:var(--line)] p-4 lg:border-b-0 lg:border-r">
          <div className="overflow-hidden rounded-[1.35rem] border border-[color:var(--line)] bg-white">
            <img
              src={imageSrc}
              alt={listing.title}
              className="h-56 w-full object-cover lg:h-full lg:max-h-[320px]"
              onError={() => setImageSrc(makeImageFallback(listing.title))}
            />
          </div>
          <div className="mt-3 rounded-[1.15rem] bg-white/65 px-3.5 py-3 text-sm text-[color:var(--muted)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--earth)]">
              Uploaded by
            </p>
            <p className="mt-1.5 leading-6">{listing.postedBy}</p>
            <p>{listing.location}</p>
          </div>
        </div>

        <div className="space-y-5 p-5 md:p-6">
          <div className="flex flex-col gap-4 border-b border-[color:var(--line)] pb-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {listing.category}
                </span>
                <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--muted)]">
                  {listing.recommendedAction}
                </span>
                <span className="rounded-full bg-[#efe4d5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--earth)]">
                  {statusLabel}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="max-w-2xl text-[1.75rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {listing.title}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                  {listing.notes}
                </p>
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-[color:var(--accent)] px-4 py-3 text-white md:min-w-40">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Impact value</p>
              <p className="mt-1 text-2xl font-semibold">{listing.bountyPoints}</p>
              <p className="text-sm text-white/85">points</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[0.85fr_1.15fr]">
            <div className="grid gap-3">
              <div className="rounded-[1.35rem] bg-[#f4eee8] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Best next step</p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
                  {listing.bestNextAction ?? actionLabel}
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-[#fcf9f3] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Status</p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{statusLabel}</p>
              </div>
            </div>
            <div className="rounded-[1.35rem] bg-[#edf3ed] p-4 text-sm text-[color:var(--muted)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Impact estimate</p>
              <p className="mt-2 leading-6 text-[color:var(--foreground)]">{listing.sustainabilityImpact}</p>
            </div>
          </div>

          <button
            type="button"
            disabled={isResolved}
            onClick={() => onResolve(listing.id)}
            className={`w-full rounded-[1.2rem] px-4 py-3.5 text-sm font-semibold transition ${
              !isResolved
                ? "bg-[color:var(--accent)] text-white hover:bg-[#254734]"
                : "cursor-not-allowed border border-[color:var(--line)] bg-[#f6f0e6] text-[color:var(--muted)]"
            }`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
