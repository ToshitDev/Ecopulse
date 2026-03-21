/* eslint-disable @next/next/no-img-element */

"use client";

import type { Listing } from "@/lib/types";

export function ListingCard({
  listing,
  canCapture = false,
  captureLabel = "Capture",
  onCapture,
}: {
  listing: Listing;
  canCapture?: boolean;
  captureLabel?: string;
  onCapture?: (id: string) => void;
}) {
  return (
    <article className="surface-card overflow-hidden rounded-[1.9rem]">
      <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="soft-panel border-b border-[color:var(--line)] p-4 lg:border-b-0 lg:border-r">
          <div className="overflow-hidden rounded-[1.35rem] border border-[color:var(--line)] bg-white">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="h-56 w-full object-cover lg:h-full lg:max-h-[340px]"
            />
          </div>
          <div className="mt-3 rounded-[1.15rem] bg-white/65 px-3.5 py-3 text-sm text-[color:var(--muted)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--earth)]">
              Material snapshot
            </p>
            <p className="mt-1.5 leading-6">{listing.imageName}</p>
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
                  {listing.condition}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="max-w-2xl text-[1.75rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {listing.title}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{listing.notes}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:items-end">
              <div className="rounded-[1.25rem] bg-[color:var(--accent)] px-4 py-3 text-white md:min-w-40">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Impact value</p>
                <p className="mt-1 text-2xl font-semibold">{listing.bountyPoints}</p>
                <p className="text-sm text-white/85">points</p>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  listing.status === "available"
                    ? "bg-[#e8f1e7] text-[color:var(--accent)]"
                    : "bg-[#efe4d5] text-[color:var(--earth)]"
                }`}
              >
                {listing.status === "available" ? "Ready to claim" : `Claimed by ${listing.capturedBy}`}
              </span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
            <div className="grid gap-3 text-sm text-[color:var(--muted)]">
              <div className="rounded-[1.35rem] bg-[#f3ede2] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Posted by</p>
                <p className="mt-2 font-semibold text-[color:var(--foreground)]">{listing.postedBy}</p>
                <p className="mt-1">{listing.location}</p>
              </div>
              <div className="rounded-[1.35rem] bg-[#f4eee8] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Status</p>
                <p className="mt-2 font-semibold text-[color:var(--foreground)]">
                  {listing.status === "available" ? "Available for reuse" : "Claim completed"}
                </p>
              </div>
            </div>
            <div className="rounded-[1.35rem] bg-[#edf3ed] p-4 text-sm text-[color:var(--muted)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Impact estimate</p>
              <p className="mt-2 leading-6 text-[color:var(--foreground)]">{listing.sustainabilityImpact}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Reuse ideas
            </p>
            <ul className="grid gap-2.5 text-sm leading-6 text-[color:var(--muted)] md:grid-cols-2">
              {listing.reuseIdeas.map((idea) => (
                <li
                  key={idea}
                  className="flex items-start gap-3 rounded-[1.2rem] border border-[color:var(--line)] bg-[#fcfaf5] px-4 py-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-[color:var(--earth)]/70" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>

          {onCapture ? (
            <button
              type="button"
              disabled={!canCapture}
              onClick={() => onCapture(listing.id)}
              className={`w-full rounded-[1.2rem] px-4 py-3.5 text-sm font-semibold transition ${
                canCapture
                  ? "bg-[color:var(--accent)] text-white hover:bg-[#254734]"
                  : "cursor-not-allowed border border-[color:var(--line)] bg-[#f6f0e6] text-[color:var(--muted)]"
              }`}
            >
              {canCapture ? captureLabel : "Already claimed"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
