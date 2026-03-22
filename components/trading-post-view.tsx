"use client";

import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { SectionHeading } from "@/components/section-heading";
import { isMarketplaceListing } from "@/lib/listing-routing";
import { useAppStore } from "@/lib/store";

export function TradingPostView() {
  const { captureActorName, captureListing, listings } = useAppStore();
  const marketplaceListings = listings.filter(isMarketplaceListing);
  const availableCount = marketplaceListings.filter((listing) => listing.status === "available").length;

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Marketplace"
        title="Useful materials ready to move across campus"
        description="A shared reuse feed for items that should be claimed before they become waste."
        action={
          <Link
            href="/upload"
            className="rounded-2xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#254734]"
          >
            Post an item
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--earth)]">Open listings</p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{availableCount}</p>
        </div>
        <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--earth)]">Claiming as</p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{captureActorName}</p>
        </div>
        <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--earth)]">Marketplace flow</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            Upload an item, post it here, then let someone claim it to update the impact board instantly.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {marketplaceListings.length > 0 ? (
          marketplaceListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              canCapture={listing.status === "available"}
              captureLabel={`Claim as ${captureActorName}`}
              onCapture={captureListing}
            />
          ))
        ) : (
          <section className="surface-card rounded-[1.9rem] p-6 md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Marketplace queue
            </p>
            <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
              No reuse items yet
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
              Reuse-ready uploads appear here. Recycling, disposal, and donation items now go to Recovery Board instead.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
