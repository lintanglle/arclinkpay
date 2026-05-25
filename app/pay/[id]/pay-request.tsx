"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, secondaryButton } from "../../components/app-shell";
import type { DataMode, PaymentLink } from "@/lib/payments/types";
import { PayCard } from "./pay-card";

type PaymentPayload = {
  dataMode: DataMode;
  payment: PaymentLink | null;
};

export function PayRequest({ id }: { id: string }) {
  const [payload, setPayload] = useState<PaymentPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadPayment() {
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

    loadPayment();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <Card>
        <div className="h-80 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
      </Card>
    );
  }

  if (!payload?.payment) {
    return (
      <Card>
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
            Payment unavailable
          </p>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
            This payment link was not found
          </h1>
          <p className="mx-auto max-w-md leading-7 text-slate-600 dark:text-slate-300">
            Use the demo payment link or create a new request to preview the
            payer experience.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/pay/demo-payment" className={secondaryButton}>
              Open demo payment
            </Link>
            <Link href="/create" className={secondaryButton}>
              Create link
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <PayCard initialPayment={payload.payment} />
    </Card>
  );
}
