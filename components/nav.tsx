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
      <div className="mx-auto hidden max-w-6xl space-y-3 px-5 py-4 lg:block lg:px-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
                EcoPulse
              </div>
            </Link>
          </div>

          <nav className="flex min-w-0 items-center justify-end gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-[color:var(--accent)] text-white"
                      : "border border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--muted)] hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="justify-self-end pl-2">
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center rounded-full border border-[color:var(--line)] bg-transparent px-4 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)]"
            >
              Reset Demo
            </button>
          </div>
        </div>

        <div className="border-t border-[color:var(--line)]/70 pt-3">
          <p className="max-w-xl text-sm text-[color:var(--muted)]">
            AI-powered reuse before disposal becomes the default.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--earth)]">
            EcoPulse
          </div>
        </Link>

        <button
          type="button"
          onClick={resetDemo}
          className="rounded-full border border-[color:var(--line)] px-3 py-2 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)]"
        >
          Reset
        </button>
      </div>

      <div className="border-t border-[color:var(--line)]/70 px-5 py-3 lg:hidden">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[color:var(--accent)] text-white"
                    : "border border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--muted)] hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
