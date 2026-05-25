"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge, Card } from "../components/app-shell";
import { formatDate, shortenAddress } from "@/lib/payments/format";
import type { DataMode, PaymentLink } from "@/lib/payments/types";

type DashboardPayload = {
  dataMode: DataMode;
  payments: PaymentLink[];
};

export function DashboardLinks({
  initialData,
}: {
  initialData: DashboardPayload;
}) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadPayments() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/payment-links", {
          cache: "no-store",
        });
        const payload = await response.json();

        if (isActive && response.ok) {
          setData(payload);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadPayments();

    return () => {
      isActive = false;
    };
  }, []);

  const paidLinks = useMemo(
    () => data.payments.filter((payment) => payment.status === "paid"),
    [data.payments],
  );
  const unpaidLinks = useMemo(
    () => data.payments.filter((payment) => payment.status === "unpaid"),
    [data.payments],
  );
  const totalReceived = paidLinks.reduce(
    (total, payment) => total + Number(payment.amount.replace(",", "")),
    0,
  );
  const stats = [
    { label: "Total received", value: `${totalReceived.toLocaleString()} USDC` },
    { label: "Total links", value: data.payments.length.toString() },
    { label: "Paid links", value: paidLinks.length.toString() },
    { label: "Unpaid links", value: unpaidLinks.length.toString() },
  ];

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-600 dark:text-slate-300">Data mode</span>
        <Badge tone={data.dataMode === "mock-fallback" ? "warning" : "success"}>
          {data.dataMode === "mock-fallback" ? "mock fallback" : "database ready"}
        </Badge>
        {isLoading ? (
          <span className="text-slate-500 dark:text-slate-400">Refreshing...</span>
        ) : null}
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="min-h-32">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">
              {stat.value}
            </p>
          </Card>
        ))}
      </section>

      <Card className="mt-8 overflow-hidden p-0">
        <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-5 dark:border-white/10 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Recent links
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Payment requests loaded through the API foundation.
          </p>
        </div>
        {data.payments.length === 0 ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <p className="font-medium text-slate-950 dark:text-white">
              No payment links yet
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create a request to preview the dashboard.
            </p>
          </div>
        ) : (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Recipient</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {data.payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="bg-white transition hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-4 font-medium text-slate-950 dark:text-white">
                      <div>
                        <p>{payment.title}</p>
                        <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">
                          {payment.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                      {payment.amount} {payment.asset}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        tone={payment.status === "paid" ? "success" : "warning"}
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                      {shortenAddress(payment.recipientAddress)}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/pay/${payment.id}`}
                        className="rounded-lg px-3 py-2 font-semibold text-blue-700 transition hover:bg-blue-50 hover:text-blue-900 dark:text-blue-300 dark:hover:bg-blue-400/10 dark:hover:text-blue-100"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data.payments.length > 0 ? (
          <div className="divide-y divide-slate-200 md:hidden dark:divide-white/10">
            {data.payments.map((payment) => (
              <div key={payment.id} className="space-y-4 px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">
                      {payment.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                  <Badge tone={payment.status === "paid" ? "success" : "warning"}>
                    {payment.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {payment.amount}
                    </span>{" "}
                    {payment.asset}
                  </p>
                  <p className="font-mono text-xs">
                    Recipient: {shortenAddress(payment.recipientAddress)}
                  </p>
                </div>
                <Link
                  href={`/pay/${payment.id}`}
                  className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                >
                  Open
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </>
  );
}
