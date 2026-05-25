import Link from "next/link";
import { Badge, primaryButton, secondaryButton } from "../../components/app-shell";
import type { PaymentLink } from "@/lib/mock-payments";

export function PayCard({
  payment,
  paid,
}: {
  payment: PaymentLink;
  paid: boolean;
}) {
  const status = paid ? "paid" : "unpaid";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge tone={paid ? "success" : "warning"}>{status}</Badge>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Payment ID: {payment.id}
        </span>
      </div>

      <div className="rounded-lg bg-slate-950 p-5 text-white sm:p-6">
        <p className="text-sm text-slate-400">Amount due</p>
        <p className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
          {payment.amount} <span className="text-2xl text-slate-300">USDC</span>
        </p>
        <h1 className="mt-5 text-xl font-semibold tracking-normal text-white sm:text-2xl">
          {payment.title}
        </h1>
        <p className="mt-2 leading-7 text-slate-300">
          {payment.note}
        </p>
      </div>

      <div className="grid gap-3">
        {[
          ["Recipient", payment.recipient],
          ["Network", "Arc"],
          ["Asset", "USDC"],
          ["Status", status],
        ].map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-white/5 sm:grid-cols-[7rem_1fr] sm:items-center"
          >
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="break-all font-medium text-slate-950 dark:text-white sm:text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      {paid ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
            Mock payment completed
          </p>
          <code className="mt-2 block break-all text-sm text-emerald-900 dark:text-emerald-50">
            {payment.txHash}
          </code>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/pay/${payment.id}?paid=1`}
          className={`${primaryButton} ${paid ? "pointer-events-none opacity-70" : ""}`}
          aria-disabled={paid}
        >
          {paid ? "Paid with USDC" : "Pay with USDC"}
        </Link>
        <Link href={`/receipt/${payment.id}`} className={secondaryButton}>
          View receipt
        </Link>
      </div>
    </div>
  );
}
