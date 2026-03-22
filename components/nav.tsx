"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/trading-post", label: "Marketplace" },
  { href: "/recovery-board", label: "Recovery Board" },
  { href: "/bounty-board", label: "Impact Board" },
];

export function Nav() {
  const pathname = usePathname();
  const { resetDemo } = useAppStore();

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[rgba(247,244,237,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
              EcoPulse
            </div>
            <span className="hidden text-sm text-[color:var(--muted)] sm:inline">
              AI-powered reuse before disposal becomes the default.
            </span>
          </Link>
          <button
            type="button"
            onClick={resetDemo}
            className="rounded-full border border-[color:var(--line)] px-3 py-2 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)] md:hidden"
          >
            Reset Demo
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[color:var(--accent)] text-white"
                    : "border border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--muted)] hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={resetDemo}
            className="hidden rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)] md:inline-flex"
          >
            Reset Demo
          </button>
        </div>
      </div>
    </header>
  );
}
