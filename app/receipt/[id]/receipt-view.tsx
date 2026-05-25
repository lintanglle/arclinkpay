"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell, Badge, Card, secondaryButton } from "../../components/app-shell";
import { formatDate, shortenAddress } from "@/lib/payments/format";
import type { DataMode, PaymentLink } from "@/lib/payments/types";

type PaymentPayload = {
  dataMode: DataMode;
  payment: PaymentLink | null;
};

export function ReceiptView({ id }: { id: string }) {
  const [payload, setPayload] = useState<PaymentPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadReceipt() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/payment-links/${id}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (isActive) {
          setPayload(data);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadReceipt();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl">
          <Card>
            <div className="h-96 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
          </Card>
        </div>
      </AppShell>
    );
  }

  if (!payload?.payment) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl">
          <Card>
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                Receipt unavailable
              </p>
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
                This receipt was not found
              </h1>
              <p className="mx-auto max-w-md leading-7 text-slate-600 dark:text-slate-300">
                Open the demo receipt or return to the dashboard to view the
                current payment links.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/receipt/demo-payment" className={secondaryButton}>
                  Open demo receipt
                </Link>
                <Link href="/dashboard" className={secondaryButton}>
                  Dashboard
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </AppShell>
    );
  }

  const payment = payload.payment;
  const rows = [
    ["Amount", `${payment.amount} ${payment.asset}`],
    ["Network", payment.network],
    ["Payer address", shortenAddress(payment.payerAddress)],
    ["Recipient address", shortenAddress(payment.recipientAddress)],
    ["Transaction hash", payment.txHash || "Not available yet"],
    ["Created", formatDate(payment.createdAt)],
    ["Paid", payment.paidAt ? formatDate(payment.paidAt) : "Not paid yet"],
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge tone={payment.status === "paid" ? "success" : "warning"}>
                {payment.status === "paid" ? "Paid receipt" : "Receipt pending"}
              </Badge>
              <h1 className="mt-4 text-2xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-3xl">
                {payment.title}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {payment.status === "paid"
                  ? "Simulated payment completed in USDC on Arc."
                  : "Payment has not been simulated yet."}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Status
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">
                {payment.status}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-white/5 sm:grid-cols-[10rem_1fr]"
              >
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
                <span className="break-all font-medium text-slate-950 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`/pay/${payment.id}`} className={secondaryButton}>
              Back to payment
            </Link>
            <Link href="/dashboard" className={secondaryButton}>
              Dashboard
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
