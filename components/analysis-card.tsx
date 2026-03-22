import { getNextStepMessage, getWhyThisDecision } from "@/lib/analysis-copy";
import type { AnalysisResult } from "@/lib/types";

export function AnalysisCard({ result }: { result: AnalysisResult }) {
  const actionLabel =
    result.recommendedAction === "recycle"
      ? "Recycle"
      : result.recommendedAction === "dispose"
        ? "Dispose"
      : result.recommendedAction === "donate"
          ? "Donate"
          : "Reuse";

  return (
    <section className="surface-card rounded-[1.75rem] p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          AI item review
        </span>
        <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--muted)]">
          {result.category}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            result.recommendedAction === "recycle" || result.recommendedAction === "dispose"
              ? "bg-[#efe4d5] text-[color:var(--earth)]"
              : "bg-[#e8f1e7] text-[color:var(--accent)]"
          }`}
        >
          Recommended: {actionLabel}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-b border-[color:var(--line)] pb-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h3 className="text-[1.9rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            {result.title}
          </h3>
          <p className="max-w-xl text-sm leading-6 text-[color:var(--foreground)]/85">
            {getWhyThisDecision(result)}
          </p>
          <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{result.notes}</p>
        </div>
        <div className="rounded-[1.35rem] bg-[color:var(--accent)] px-4 py-3 text-white md:min-w-36">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Impact value</p>
          <p className="mt-1 text-2xl font-semibold">{result.bountyPoints}</p>
          <p className="text-sm text-white/85">points</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[0.8fr_1.25fr]">
        <div className="grid gap-3">
          <div className="rounded-[1.35rem] bg-[#edf3ed] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Next step</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
              {getNextStepMessage(result)}
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-[#f3ede2] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Condition</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{result.condition}</p>
          </div>
          <div className="rounded-[1.35rem] bg-[#fcf9f3] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Material</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
              {result.material ?? "Mixed material"}
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-[#f4eee8] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Category</p>
            <p className="mt-2 text-sm font-semibold capitalize text-[color:var(--foreground)]">{result.category}</p>
          </div>
          <div className="rounded-[1.35rem] bg-[#fcf9f3] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Best next action</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
              {result.bestNextAction ?? actionLabel}
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-[1.35rem] bg-[#edf3ed] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Impact estimate</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">{result.sustainabilityImpact}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] bg-[#f3ede2] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">Reuse value</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{result.reuseValue}</p>
            </div>
            <div className="rounded-[1.35rem] bg-[#edf3ed] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">Recycle value</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{result.recycleValue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
          {result.recommendedAction === "reuse"
            ? "Suggested reuse"
            : "Suggested actions"}
        </p>
        {result.reuseIdeas.length > 0 ? (
          <ul className="grid gap-2.5 text-sm leading-6 text-[color:var(--muted)]">
            {result.reuseIdeas.map((idea) => (
              <li
                key={idea}
                className="flex items-start gap-3 rounded-[1.2rem] border border-[color:var(--line)] bg-[#fcfaf5] px-4 py-3"
              >
                <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-[color:var(--earth)]/70" />
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[#fcfaf5] px-4 py-3 text-sm leading-6 text-[color:var(--muted)]">
            No reuse suggestions for this item.
          </div>
        )}
      </div>
    </section>
  );
}
