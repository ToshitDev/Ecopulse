"use client";

import Link from "next/link";
import { RecoveryCard } from "@/components/recovery-card";
import { SectionHeading } from "@/components/section-heading";
import { isRecoveryListing } from "@/lib/listing-routing";
import { useAppStore } from "@/lib/store";

export function RecoveryBoardView() {
  const { listings, resolveRecoveryListing } = useAppStore();
  const recoveryListings = listings.filter(isRecoveryListing);
  const openCount = recoveryListings.filter((listing) => listing.status === "available").length;

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Recovery Board"
        title="Items that need the right recovery path"
        description="A lightweight board for recycling, disposal, donation, and e-waste actions that should stay out of the marketplace."
        action={
          <Link
            href="/upload"
            className="rounded-2xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#254734]"
          >
            Analyze an item
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--earth)]">Open recovery items</p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{openCount}</p>
        </div>
        <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--earth)]">Board purpose</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            Keep non-reuse items out of Marketplace while still tracking the best next sustainability action.
          </p>
        </div>
        <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--earth)]">Flow</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            Upload an item, let EcoPulse classify it, then route recycling, disposal, donation, or e-waste recovery work here.
          </p>
        </div>
      </section>

      {recoveryListings.length > 0 ? (
        <div className="space-y-6">
          {recoveryListings.map((listing) => (
            <RecoveryCard
              key={listing.id}
              listing={listing}
              onResolve={resolveRecoveryListing}
            />
          ))}
        </div>
      ) : (
        <section className="surface-card rounded-[1.9rem] p-6 md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
            Recovery queue
          </p>
          <h3 className="mt-4 text-[1.9rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            No recovery items yet
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            Once EcoPulse identifies a non-marketplace item like recycling, disposal, donation, or e-waste recovery, it will appear here.
          </p>
        </section>
      )}
    </div>
  );
}
