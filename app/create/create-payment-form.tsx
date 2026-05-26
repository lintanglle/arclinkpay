"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useConnection } from "wagmi";
import {
  Badge,
  fieldClass,
  primaryButton,
  secondaryButton,
} from "../components/app-shell";
import type { DataMode, PaymentLink } from "@/lib/payments/types";

export function CreatePaymentForm({ dataMode }: { dataMode: DataMode }) {
  const { address, isConnected } = useConnection();
  const [recipientInput, setRecipientInput] = useState("");
  const [recipientTouched, setRecipientTouched] = useState(false);
  const [generatedPayment, setGeneratedPayment] = useState<PaymentLink | null>(
    null,
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recipientAddress = recipientTouched ? recipientInput : address || "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/payment-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          amount: formData.get("amount"),
          recipientAddress,
          note: formData.get("note"),
          expiresAt: formData.get("expiresAt"),
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to create payment link.");
      }

      setGeneratedPayment(payload.payment);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to create payment link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
        <span className="text-slate-600 dark:text-slate-300">Data mode</span>
        <Badge tone={dataMode === "mock-fallback" ? "warning" : "success"}>
          {dataMode === "mock-fallback" ? "mock fallback" : "database ready"}
        </Badge>
        <span className="text-slate-500 dark:text-slate-400">
          {dataMode === "mock-fallback"
            ? "No Supabase credentials detected."
            : "Supabase env vars detected."}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Title
          </span>
          <input
            required
            name="title"
            placeholder="Arc grant milestone"
            className={fieldClass}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Amount in USDC
          </span>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            name="amount"
            placeholder="1250.00"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Recipient wallet address
        </span>
        <input
          required
          name="recipientAddress"
          value={recipientAddress}
          onChange={(event) => {
            setRecipientTouched(true);
            setRecipientInput(event.target.value);
          }}
          placeholder={
            isConnected
              ? "Connected wallet will be used by default"
              : "0x8f4a2b6c..."
          }
          className={`${fieldClass} font-mono text-sm placeholder:font-sans`}
        />
        {isConnected ? (
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Defaulted to your connected wallet. You can edit it before creating
            the link.
          </p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Note
        </span>
        <textarea
          name="note"
          rows={4}
          placeholder="Add payment context for the payer."
          className={`${fieldClass} resize-none`}
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Optional expiry date
        </span>
        <input type="date" name="expiresAt" className={fieldClass} />
      </label>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <button
          type="submit"
          className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Generate payment link"}
        </button>
        <Link href="/dashboard" className={secondaryButton}>
          Back to dashboard
        </Link>
      </div>

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
          {error}
        </div>
      ) : null}

      {generatedPayment ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
            Arc Testnet payment link generated
          </p>
          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <code className="break-all rounded-lg bg-white px-3 py-2 text-sm text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100">
              /pay/{generatedPayment.id}
            </code>
            <Link href={`/pay/${generatedPayment.id}`} className={primaryButton}>
              Open link
            </Link>
          </div>
        </div>
      ) : null}
    </form>
  );
}
