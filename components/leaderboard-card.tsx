import type { LeaderboardUser } from "@/lib/types";

export function LeaderboardCard({
  user,
  rank,
  highlight = false,
}: {
  user: LeaderboardUser;
  rank: number;
  highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-5 shadow-[0_16px_40px_rgba(63,44,24,0.06)] ${
        highlight
          ? "border-[color:var(--line-strong)] bg-[#f7efe0]"
          : "border-[color:var(--line)] bg-[rgba(251,248,241,0.94)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--earth)]">
            Rank {rank}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">{user.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{user.tagline}</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--accent)] px-4 py-3 text-right text-white">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Impact points</p>
          <p className="mt-2 text-2xl font-semibold">{user.points}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-2xl bg-[#f3ede2] p-3">
          <p className="font-semibold text-[color:var(--foreground)]">{user.postedCount}</p>
          <p className="mt-1 text-[color:var(--muted)]">Posted</p>
        </div>
        <div className="rounded-2xl bg-[#edf3ed] p-3">
          <p className="font-semibold text-[color:var(--foreground)]">{user.capturedCount}</p>
          <p className="mt-1 text-[color:var(--muted)]">Claimed</p>
        </div>
        <div className="rounded-2xl bg-[#f4eee8] p-3">
          <p className="font-semibold text-[color:var(--foreground)]">{user.recoveryCount}</p>
          <p className="mt-1 text-[color:var(--muted)]">Recovery actions</p>
        </div>
      </div>
    </article>
  );
}
