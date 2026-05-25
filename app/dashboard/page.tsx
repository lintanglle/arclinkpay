import Link from "next/link";
import { AppShell, primaryButton } from "../components/app-shell";
import { DashboardLinks } from "./dashboard-links";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
            Payment links
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            Monitor Arc USDC requests and status through an API-backed
            foundation. Payments are still simulated in this milestone.
          </p>
        </div>
        <Link href="/create" className={primaryButton}>
          Create link
        </Link>
      </div>

      <DashboardLinks />
    </AppShell>
  );
}
