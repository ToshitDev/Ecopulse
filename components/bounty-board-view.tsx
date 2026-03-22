"use client";

import { LeaderboardCard } from "@/components/leaderboard-card";
import { SectionHeading } from "@/components/section-heading";
import { RECOVERY_POINTS, VERIFIED_REUSE_POINTS } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store";

export function BountyBoardView() {
  const { leaderboard, listings } = useAppStore();
  const rankedUsers = [...leaderboard].sort((left, right) => right.points - left.points);
  const capturedCount = listings.filter((listing) => listing.status === "captured").length;
  const totalPoints = leaderboard.reduce((sum, user) => sum + user.points, 0);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Impact Board"
        title="Tracking committed EcoPulse actions"
        description="A lightweight demo scorecard that shows posts, claims, and recovery actions in one place."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface-card rounded-[1.65rem] p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Active users</p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{leaderboard.length}</p>
        </div>
        <div className="surface-card rounded-[1.65rem] p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Items claimed</p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{capturedCount}</p>
        </div>
        <div className="surface-card rounded-[1.65rem] p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Future bonus</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            Verified reuse adds {VERIFIED_REUSE_POINTS} points next. The demo board updates on
            posting, reuse claims, and recovery completion.
          </p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="surface-card rounded-[1.75rem] p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Total impact points</p>
          <p className="mt-3 text-4xl font-semibold text-[color:var(--foreground)]">{totalPoints}</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            A simple demo scorecard for judges to see that confirmed actions are being recorded.
          </p>
        </article>
        <article className="surface-card rounded-[1.75rem] p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Point system</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--muted)]">
            <p>Post item: +10</p>
            <p>Claim item: +50</p>
            <p>Resolve recovery action: +{RECOVERY_POINTS}</p>
            <p>Verified reuse: +50 future bonus</p>
          </div>
        </article>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {rankedUsers.map((user, index) => (
          <LeaderboardCard
            key={user.id}
            user={user}
            rank={index + 1}
            highlight={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
