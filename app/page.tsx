import Link from "next/link";
import {
  AppShell,
  Badge,
  Card,
  primaryButton,
  secondaryButton,
} from "./components/app-shell";

const features = [
  {
    title: "Create payment links",
    body: "Generate a clean Arc payment page for invoices, grants, bounties, or one-off requests.",
  },
  {
    title: "Get paid in USDC",
    body: "Keep settlement simple with one familiar stablecoin and recipient wallet details upfront.",
  },
  {
    title: "Track payment status",
    body: "See which links are paid, unpaid, and ready for follow-up from a lightweight dashboard.",
  },
  {
    title: "View onchain receipts",
    body: "Share receipt pages with transaction hashes, timestamps, parties, and payment metadata.",
  },
];

export default function Home() {
  return (
    <AppShell>
      <section className="grid items-center gap-8 py-2 sm:gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:py-8">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-100">
            Built for Arc and USDC
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-6xl">
              ArcLinkPay
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-snug text-slate-800 dark:text-slate-100 sm:text-2xl">
              USDC payments on Arc, as simple as sharing a link.
            </p>
            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
              Create a payment request, send the link, and give payers a clear
              checkout-style page with amount, asset, network, and receipt
              details. This MVP uses mock data so the core flow is demo-ready
              without wallet or blockchain integrations.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/create" className={primaryButton}>
              Create payment link
            </Link>
            <Link href="/dashboard" className={secondaryButton}>
              View dashboard
            </Link>
          </div>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 bg-slate-950 p-5 text-white dark:border-white/10 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-300">Payment request</p>
              <Badge tone="warning">unpaid</Badge>
            </div>
            <div className="mt-9">
              <p className="text-sm text-slate-400">Amount due</p>
              <p className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
                1,250.00 <span className="text-2xl text-slate-300">USDC</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Arc grant milestone payment, ready to share with a payer.
              </p>
            </div>
          </div>
          <div className="space-y-3 p-5 sm:p-6">
            {[
              ["Network", "Arc"],
              ["Recipient", "0x8f4a...91c2"],
              ["Link", "arclinkpay.app/pay/demo-payment"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-white/5 sm:grid-cols-[7rem_1fr] sm:items-center"
              >
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
                <span className="break-all font-medium text-slate-900 dark:text-white sm:text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:hover:border-white/20"
          >
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              {feature.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {feature.body}
            </p>
          </Card>
        ))}
      </section>
    </AppShell>
  );
}
