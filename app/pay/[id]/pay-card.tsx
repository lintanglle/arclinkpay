"use client";

import Link from "next/link";
import { useState } from "react";
import { useConnection } from "wagmi";
import { shortenAddress } from "@/lib/payments/format";
import {
  ARC_NETWORK_PLACEHOLDER,
  ARC_USDC_TOKEN_PLACEHOLDER,
  simulateArcUsdcPayment,
} from "@/lib/payments/payment-executor";
import type { PaymentLink } from "@/lib/payments/types";
import {
  Badge,
  primaryButton,
  secondaryButton,
  WalletRequiredPanel,
} from "../../components/app-shell";
import { WalletButton } from "../../components/wallet-button";

export function PayCard({ initialPayment }: { initialPayment: PaymentLink }) {
  const { address, isConnected } = useConnection();
  const [payment, setPayment] = useState(initialPayment);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");
  const paid = payment.status === "paid";

  async function handleSimulatedPayment() {
    if (!isConnected || !address) {
      setError("Connect a wallet before simulating payment.");
      return;
    }

    setError("");
    setIsPaying(true);

    try {
      const result = await simulateArcUsdcPayment({
        recipientAddress: payment.recipientAddress,
        amount: payment.amount,
        tokenAddress: ARC_USDC_TOKEN_PLACEHOLDER,
        chain: ARC_NETWORK_PLACEHOLDER,
      });

      const response = await fetch(`/api/payment-links/${payment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "paid",
          payerAddress: address,
          txHash: result.txHash,
          paidAt: new Date().toISOString(),
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to update payment status.");
      }

      setPayment(payload.payment);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to simulate payment.",
      );
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge tone={paid ? "success" : "warning"}>{payment.status}</Badge>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Payment ID: {payment.id}
        </span>
      </div>

      <div className="rounded-lg bg-slate-950 p-5 text-white sm:p-6">
        <p className="text-sm text-slate-400">Amount due</p>
        <p className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
          {payment.amount}{" "}
          <span className="text-2xl text-slate-300">{payment.asset}</span>
        </p>
        <h1 className="mt-5 text-xl font-semibold tracking-normal text-white sm:text-2xl">
          {payment.title}
        </h1>
        <p className="mt-2 leading-7 text-slate-300">
          {payment.note || "No note provided."}
        </p>
      </div>

      <div className="grid gap-3">
        {[
          ["Recipient", shortenAddress(payment.recipientAddress)],
          ["Network", payment.network],
          ["Asset", payment.asset],
          ["Payer", shortenAddress(payment.payerAddress)],
          ["Status", payment.status],
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

      {!isConnected ? (
        <WalletRequiredPanel>
          <WalletButton compact />
        </WalletRequiredPanel>
      ) : null}

      {paid && payment.txHash ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
            Simulated payment completed
          </p>
          <code className="mt-2 block break-all text-sm text-emerald-900 dark:text-emerald-50">
            {payment.txHash}
          </code>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSimulatedPayment}
          disabled={!isConnected || paid || isPaying}
          className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {paid
            ? "Payment simulated"
            : isPaying
              ? "Simulating..."
              : "Simulate USDC payment"}
        </button>
        <Link href={`/receipt/${payment.id}`} className={secondaryButton}>
          View receipt
        </Link>
      </div>
    </div>
  );
}
