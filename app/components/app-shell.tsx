import Link from "next/link";
import { WalletButton } from "./wallet-button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/dashboard", label: "Dashboard" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-950 dark:bg-[#07080b] dark:text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,111,235,0.14),transparent_30rem),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.1),transparent_28rem)]" />
      <header className="relative border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#07162f] text-sm text-white shadow-sm ring-1 ring-cyan-300/30 dark:bg-[#07162f] dark:text-white">
              AL
            </span>
            <span className="text-base">ArcLinkPay</span>
          </Link>
          <nav className="flex w-full items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0 sm:dark:bg-transparent">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-3 py-2 font-medium transition hover:bg-white hover:text-slate-950 hover:shadow-sm active:scale-[0.99] dark:hover:bg-white/10 dark:hover:text-white sm:hover:bg-slate-900 sm:hover:text-white dark:sm:hover:bg-white dark:sm:hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <WalletButton compact />
        </div>
      </header>
      <main className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
        {children}
      </main>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning";
}) {
  const tones = {
    neutral:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-100 dark:ring-emerald-400/10",
    warning:
      "border-amber-200 bg-amber-50 text-amber-900 ring-1 ring-amber-100 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100 dark:ring-amber-400/10",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1f6feb] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#195fc9] hover:shadow-md hover:shadow-blue-900/20 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:ring-offset-2 dark:focus:ring-offset-slate-950";

export const secondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md active:translate-y-0 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/35 dark:hover:bg-white/10";

export const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:border-white/20";

export function WalletRequiredPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-400/20 dark:bg-blue-400/10">
      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
        Wallet connection required
      </p>
      <p className="mt-2 text-sm leading-6 text-blue-800 dark:text-blue-100/80">
        Connect an EVM wallet to pay with USDC on Arc Testnet.
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
