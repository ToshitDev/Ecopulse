"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { seededCampusImpact } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store";

const steps = [
  {
    title: "Upload a leftover item",
    body: "Take a quick photo of something useful before it becomes waste.",
  },
  {
    title: "Let AI sort the next best step",
    body: "EcoPulse identifies the item, classifies the material, and drafts a clear campus listing.",
  },
  {
    title: "Let someone claim it fast",
    body: "The marketplace helps useful items move before disposal, while the impact board updates live.",
  },
];

export function LandingOverview() {
  const { leaderboard, listings } = useAppStore();
  const openListings = listings.filter((listing) => listing.status === "available").length;
  const capturedListings = listings.length - openListings;
  const totalPoints = leaderboard.reduce((sum, user) => sum + user.points, 0);
  const reusedItems = listings.filter((listing) => listing.status === "captured").length;
  const recycledItems = seededCampusImpact.recycledItems;
  const wasteDiverted = seededCampusImpact.wasteDivertedLbs + reusedItems * 6;
  const materialCounts = listings.reduce<Record<string, number>>((counts, listing) => {
    counts[listing.category] = (counts[listing.category] ?? 0) + 1;
    return counts;
  }, {});
  const mostCommonMaterial =
    Object.entries(materialCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "mixed";

  return (
    <div className="space-y-12">
      <section className="surface-card grid gap-8 rounded-[2rem] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--earth)]">
            AI-powered campus sustainability
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] md:text-[4.2rem]">
              EcoPulse helps useful materials move before they become waste.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Upload an item, let AI identify it and suggest the next step, then post it to a
              shared campus marketplace where someone else can claim it before it gets trashed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/upload"
              className="rounded-2xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#254734]"
            >
              Start with an upload
            </Link>
            <Link
              href="/trading-post"
              className="rounded-2xl border border-[color:var(--line-strong)] bg-[#f7efe0] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--earth)]"
            >
              View Marketplace
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.6rem] bg-[#f3ede2] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Open listings</p>
              <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">{openListings}</p>
            </div>
            <div className="rounded-[1.6rem] bg-[#edf3ed] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Captured</p>
              <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">{capturedListings}</p>
            </div>
            <div className="rounded-[1.6rem] bg-[#f4eee8] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Impact points</p>
              <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">{totalPoints}</p>
            </div>
          </div>
        </div>

        <div className="grain rounded-[1.75rem] border border-[color:var(--line)] bg-[#efe4d2] p-6">
          <div className="relative z-10 space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Impact system
            </p>
            <div className="space-y-3 text-sm leading-7 text-[color:var(--foreground)]">
              <div className="rounded-[1.25rem] bg-[rgba(255,255,255,0.45)] p-4">
                <p className="font-semibold">Post item</p>
                <p>+10 impact points</p>
              </div>
              <div className="rounded-[1.25rem] bg-[rgba(255,255,255,0.45)] p-4">
                <p className="font-semibold">Claim item</p>
                <p>+50 impact points</p>
              </div>
              <div className="rounded-[1.25rem] bg-[rgba(255,255,255,0.45)] p-4">
                <p className="font-semibold">Verified reuse</p>
                <p>+50 later as a bonus action</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              A lightweight score keeps the sustainability story visible without adding heavy platform logic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="How It Works"
          title="A fast campus reuse flow that feels practical"
          description="This MVP keeps the story simple: AI reviews the item, the marketplace gets it in front of someone nearby, and the impact board shows what was saved."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="surface-card rounded-[1.75rem] p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Impact Alignment"
          title="Why EcoPulse matters on campus"
          description="A compact view of the outcomes sponsors and judges care about most: less waste, clearer accountability, and faster sustainable action."
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="surface-card rounded-[1.85rem] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Campus impact
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.45rem] bg-[#edf3ed] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Items reused</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">{reusedItems}</p>
              </div>
              <div className="rounded-[1.45rem] bg-[#f3ede2] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Items recycled</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">{recycledItems}</p>
              </div>
              <div className="rounded-[1.45rem] bg-[#f4eee8] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Waste diverted</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">{wasteDiverted} lb</p>
              </div>
              <div className="rounded-[1.45rem] bg-[#fcf9f3] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Most common material</p>
                <p className="mt-2 text-2xl font-semibold capitalize text-[color:var(--foreground)]">
                  {mostCommonMaterial}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[color:var(--muted)]">
              Mock campus metrics keep the sustainability story visible without adding real analytics or backend complexity.
            </p>
          </article>

          <article className="surface-card rounded-[1.85rem] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Why this aligns
            </p>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.35rem] bg-[#edf3ed] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Responsible consumption
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Reuse and recycling become easier than default disposal.
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-[#f3ede2] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Climate-conscious action
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Materials stay in circulation longer, reducing unnecessary replacement purchases.
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-[#f4eee8] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Campus accountability
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Lightweight data makes it easier to see what gets reused, recycled, or wasted.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
