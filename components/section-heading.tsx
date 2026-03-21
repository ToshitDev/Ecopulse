import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-[color:var(--line)] pb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--earth)]">
          {eyebrow}
        </p>
        <div className="space-y-2.5">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] md:text-[2.6rem]">
            {title}
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-[color:var(--muted)]">{description}</p>
        </div>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
