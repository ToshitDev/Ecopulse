import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    title: "Upload a photo",
    body: "Snap a leftover campus item before it gets tossed.",
  },
  {
    title: "AI picks the best next step",
    body: "EcoPulse identifies the item and recommends reuse, recycling, or recovery.",
  },
  {
    title: "Route it and track the outcome",
    body: "Reusable items go to Marketplace, recovery items go to the Recovery Board, and impact updates instantly.",
  },
];

export function LandingOverview() {
  return (
    <div className="space-y-12">
      <section className="surface-card grid gap-8 rounded-[2rem] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--earth)]">
            AI routing for campus materials
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] md:text-[4.2rem]">
              EcoPulse tells campuses the best next step for leftover materials.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Upload a photo and EcoPulse uses AI to decide whether the item should be reused,
              recycled, or recovered through donation, then routes it to the right campus workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-medium text-[color:var(--foreground)]">
            <span className="rounded-full bg-[#edf3ed] px-3 py-1.5">Reuse</span>
            <span className="rounded-full bg-[#f3ede2] px-3 py-1.5">Recycle</span>
            <span className="rounded-full bg-[#f4eee8] px-3 py-1.5">Donate or recover</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/upload"
              className="rounded-2xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3f6a54]"
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
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">
                Marketplace-ready
              </p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                Reuse stays easy
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Useful materials move to a campus exchange before they become waste.
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-[#edf3ed] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">
                Recovery-ready
              </p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                Non-reuse gets routed clearly
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Recycling, donation, and disposal actions stay out of the reuse feed.
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-[#f4eee8] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">
                Demo-ready
              </p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                Clear story, stable flow
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Judges can follow one simple loop from upload to routing to outcome.
              </p>
            </div>
          </div>
        </div>

        <div className="grain rounded-[1.75rem] border border-[color:var(--line)] bg-[#efe4d2] p-6">
          <div className="relative z-10 space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Core product loop
            </p>
            <div className="space-y-3">
              <div className="rounded-[1.25rem] bg-[rgba(255,255,255,0.45)] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">1</p>
                <p className="mt-2 font-semibold text-[color:var(--foreground)]">Upload photo</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                  A student or staff member submits a leftover item in seconds.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-[rgba(255,255,255,0.45)] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">2</p>
                <p className="mt-2 font-semibold text-[color:var(--foreground)]">AI identifies and routes</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                  EcoPulse decides whether the item belongs in reuse, recycling, or recovery.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-[rgba(255,255,255,0.45)] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">3</p>
                <p className="mt-2 font-semibold text-[color:var(--foreground)]">Send to the right board</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                  Marketplace handles reusable items while Recovery Board covers donation, recycling, and disposal paths.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-[rgba(47,93,70,0.1)] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">4</p>
                <p className="mt-2 font-semibold text-[color:var(--foreground)]">Track campus impact</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                  Each routed item supports a clear sustainability decision the campus can act on.
                </p>
              </div>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              The loop makes the MVP legible immediately: identify the material, route it correctly, and show the result.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="How It Works"
          title="A fast material-routing workflow for campus operations"
          description="The homepage now makes the core loop explicit: photo in, AI decision, correct routing, measurable impact."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="surface-card rounded-[1.75rem] p-6">
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
          title="Why this matters on campus"
          description="Judge-facing outcomes stay front and center: less landfill waste, better routing, and visible accountability."
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="surface-card rounded-[1.85rem] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Campus outcomes
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="group rounded-[1.45rem] border border-transparent bg-[#edf3ed] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(47,93,70,0.16)] hover:shadow-[0_18px_32px_rgba(47,93,70,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  Faster routing
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                  One clear next step
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  AI helps users choose the right next step without guessing.
                </p>
                <p className="mt-3 text-xs leading-5 text-[color:var(--muted)] transition duration-200 group-hover:text-[color:var(--foreground)]">
                  One upload becomes a clear route instead of an uncertain disposal decision.
                </p>
              </div>
              <div className="group rounded-[1.45rem] border border-transparent bg-[#f3ede2] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(140,90,57,0.18)] hover:shadow-[0_18px_32px_rgba(140,90,57,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">
                  Less landfill waste
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                  Recover before discard
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Reuse, donation, and recovery actions happen before disposal.
                </p>
                <p className="mt-3 text-xs leading-5 text-[color:var(--muted)] transition duration-200 group-hover:text-[color:var(--foreground)]">
                  The product encourages better routing before materials end up in the wrong bin.
                </p>
              </div>
              <div className="group rounded-[1.45rem] border border-transparent bg-[#f4eee8] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(140,90,57,0.18)] hover:shadow-[0_18px_32px_rgba(140,90,57,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">
                  Campus accountability
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                  Visible sustainability flow
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Sustainability outcomes are visible across Marketplace and Recovery flows.
                </p>
                <p className="mt-3 text-xs leading-5 text-[color:var(--muted)] transition duration-200 group-hover:text-[color:var(--foreground)]">
                  Judges can see the product path clearly without needing a heavy analytics layer.
                </p>
              </div>
              <div className="group rounded-[1.45rem] border border-transparent bg-[#fcf9f3] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--line)] hover:shadow-[0_18px_32px_rgba(63,44,24,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--earth)]">
                  Reuse before disposal
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                  Second life first
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Useful items are given a second life before becoming waste.
                </p>
                <p className="mt-3 text-xs leading-5 text-[color:var(--muted)] transition duration-200 group-hover:text-[color:var(--foreground)]">
                  The product prioritizes keeping materials in circulation whenever reuse is still possible.
                </p>
              </div>
            </div>
          </article>

          <article className="surface-card rounded-[1.85rem] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              Judge takeaway
            </p>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.35rem] bg-[#edf3ed] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Marketplace for reusable items
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Reuse-ready materials move to a clear campus exchange instead of being lost to disposal.
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-[#f3ede2] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Recovery Board for non-reuse items
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Recycling, donation, and disposal actions stay distinct from the reuse flow.
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-[#f4eee8] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Lightweight impact visibility
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  The story stays believable and demo-ready without depending on unstable live counters.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
